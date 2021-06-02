import React from 'react';
import { TFunction, withTranslation } from 'react-i18next';
import { i18n } from 'i18next';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionActions from "@material-ui/core/AccordionActions";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";

import { createData, Data, Editors } from './Data'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 350,
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    }),
);

interface SettingsTableProps {
    t: TFunction<string[]>;
    i18n: i18n;
    title: string;
    description: string;
    rows: Data[];
    defaultRows: Data[];
    rowsTitles: Record<string, string>;
    handleTableChanged: (values: Data[]) => void;
}

let changedProps: Data[] = [];

function SettingsTable(props: SettingsTableProps) {
    const { t, title, description, rows, defaultRows, rowsTitles, handleTableChanged } = props;

    const classes = useStyles();
    const [values, setValues] = React.useState(rows);
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChangeProp = (row: Data, value: any) => {
        const indexChangedRow = changedProps.map(function(e) { return e.name; }).indexOf(row.name);
        const indexValuesRow = values.map(function(e) { return e.name; }).indexOf(row.name);
        const defaultValueArray = defaultRows.filter(defaultRow => defaultRow.name === row.name);
        let defaultValue = null;

        if (defaultValueArray.length) {
            defaultValue = defaultValueArray[0].value;
        }

        if (indexChangedRow === -1) {
            const changedRow = createData(row.name, row.type, value);
            changedProps.push(changedRow);
        } else if (indexChangedRow > -1 && (defaultValue !== value)) {
            changedProps[indexChangedRow].value = value;
        } else {
            changedProps.splice(indexChangedRow, 1);
        }

        let newValues = [...values];

        if (indexValuesRow !== -1) {
            newValues[indexValuesRow].value = value;
        }

        setValues(newValues);
    };

    const handleExpandChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleSave = () => {
        handleTableChanged(changedProps);
    };

    const SettingsTable =
        <div className={classes.root}>
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby={title}
                    aria-label={title}
                >
                    <TableBody>
                        {values.map((row) => {
                            let valueEditor = null

                            switch (row.type) {
                                case Editors.Switch:
                                    valueEditor =
                                        <Switch checked={row.value}
                                                          onChange={(event) =>
                                                              handleChangeProp(row, event.target.checked)}
                                        />
                                    break
                                case Editors.TextField:
                                    valueEditor =
                                        <TextField
                                            defaultValue={row.value}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="filled"
                                            onChange={(event) =>
                                                handleChangeProp(row, event.target.value)}
                                        />
                                    break
                                case Editors.NumberField:
                                    valueEditor =
                                        <TextField
                                            type="number"
                                            defaultValue={row.value}
                                            InputProps={{ inputProps: { min: row.minValue, max: row.maxValue } }}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            variant="filled"
                                            onChange={(event) =>
                                                handleChangeProp(row, event.target.value)}
                                        />
                                    break
                                case Editors.OptionsField:
                                    if (row.options) {
                                        const options: Record<string, string> = row.options;
                                        valueEditor =
                                            <Select
                                                native
                                                value={row.value}
                                                onChange={(event) =>
                                                    handleChangeProp(row, event.target.value)}
                                            >
                                                {
                                                    Object.keys(options).map((optionKey) => {
                                                        return (
                                                            <option key={optionKey}
                                                                    value={optionKey}
                                                            >
                                                                {options[optionKey]}
                                                            </option>);
                                                    })
                                                }
                                            </Select>
                                    }
                                    break
                                case Editors.Button:
                                    if (row.buttonHandler) {
                                        valueEditor =
                                            <Button variant="contained" color="primary" onClick={row.buttonHandler}>
                                                {rowsTitles[row.name]}
                                            </Button>
                                    }
                                    break
                            }

                            return (
                                <TableRow
                                    hover
                                    tabIndex={-1}
                                    key={row.name}
                                >
                                    <TableCell>{rowsTitles[row.name]}</TableCell>
                                    <TableCell align="right">{valueEditor}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>;

    return(
        <Accordion expanded={expanded === title} onChange={handleExpandChange(title)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`${title}-bh-content`}
                id={`${title}-bh-header`}
            >
                <Typography className={classes.heading}>{t(`settings:${title}`)}</Typography>
                <Typography className={classes.secondaryHeading}>{t(`settings:${description}`)}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {SettingsTable}
            </AccordionDetails>
            <AccordionActions>
                <Button size="small">{t("settings:cancel")}</Button>
                <Button size="small" color="primary" onClick={handleSave}>
                    {t("settings:save")}
                </Button>
            </AccordionActions>
        </Accordion>
    );
}

export default withTranslation("settings")(SettingsTable);
