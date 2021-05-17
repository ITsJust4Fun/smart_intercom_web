import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

enum Editors {
    Switch,
    TextField,
    NumberField,
}

interface Data {
    name: string;
    type: Editors;
    value: any,
    minValue?: number,
    maxValue?: number,
}

function createData(
    name: string,
    type: Editors,
    value: any,
    minValue?: number,
    maxValue?: number,
): Data {
    return { name, type, value, minValue, maxValue };
}

const rows = [
    createData("Dark Mode", Editors.Switch, false),
    createData("Test text input", Editors.TextField, "test"),
    createData("Test number input", Editors.NumberField, 5, 0, 100),
];

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
            minWidth: 400,
        },
    }),
);

export default function InterfaceSettings() {
    const classes = useStyles();
    let changedProps: Data[] = [];
    const [values, setValues] = React.useState(rows);

    const handleChangeProp = (row: Data, value: any) => {
        const indexChangedRow = changedProps.map(function(e) { return e.name; }).indexOf(row.name);
        const indexValuesRow = values.map(function(e) { return e.name; }).indexOf(row.name);
        const defaultValueArray = rows.filter(defaultRow => defaultRow.name === row.name);
        let defaultValue = null;

        console.log(indexValuesRow);

        if (defaultValueArray.length) {
            defaultValue = defaultValueArray[0].value;
        }

        if (indexChangedRow === -1) {
            const changedRow = createData(row.name, row.type, value);
            changedProps.push(changedRow);
        } else if (indexChangedRow > -1 && defaultValue !== row.value) {
            changedProps[indexChangedRow].value = row.value;
        } else {
            changedProps.splice(indexChangedRow, 1);
        }

        let newValues = [...values];

        if (indexValuesRow !== -1) {
            newValues[indexValuesRow].value = value;
        }

        setValues(newValues);
    };

    return (
        <div className={classes.root}>
            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    aria-label="enhanced table"
                >
                    <TableBody>
                        {values.map((row, index) => {
                            let valueEditor = null;

                            switch (row.type) {
                                case Editors.Switch:
                                    valueEditor = <Switch checked={row.value}
                                                          onChange={(event) =>
                                                              handleChangeProp(row, event.target.checked)}
                                    />
                                    break;
                                case Editors.TextField:
                                    valueEditor = <TextField
                                        defaultValue={row.value}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="filled"
                                        onChange={(event) =>
                                            handleChangeProp(row, event.target.value)}
                                    />
                                    break;
                                case Editors.NumberField:
                                    valueEditor = <TextField
                                        type="number"
                                        defaultValue={row.value}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        variant="filled"
                                        onChange={(event) =>
                                            handleChangeProp(row, event.target.value)}
                                    />
                                    break;
                            }

                            return (
                                <TableRow
                                    tabIndex={-1}
                                    key={row.name}
                                >
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell align="right">{valueEditor}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
