import React from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import SettingsTable from "./SettingsTable";
import { createData, Data, Editors } from './Data'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: "1024px",
            overflowY: "hidden",
            overflowX: "hidden",
            margin: "auto",
            padding: "5px",
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

interface SettingsProps {
    darkMode: boolean;
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Settings(props: SettingsProps) {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState<string | false>(false);

    const { darkMode, setDarkMode } = props;

    const interfaceSettings = [
        createData("Dark Mode", Editors.Switch, darkMode),
        createData("Test text input", Editors.TextField, "test"),
        createData("Test number input", Editors.NumberField, 5, 0, 100),
    ];

    const defaultInterfaceSettings: Data[] = [];
    interfaceSettings.forEach(val => defaultInterfaceSettings.push(Object.assign({}, val)));

    const handleExpandChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleInterfaceChange = (values: Data[]) => {
        for (let data of values) {
            if (data.name === "Dark Mode") {
                setDarkMode(data.value);
            }
        }
    };

    return (
        <div className={classes.root}>
            <SettingsTable rows={interfaceSettings}
                           defaultRows={defaultInterfaceSettings}
                           handleTableChanged={handleInterfaceChange}
            />
            <Accordion expanded={expanded === 'panel2'} onChange={handleExpandChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2bh-content"
                    id="panel2bh-header"
                >
                    <Typography className={classes.heading}>Users</Typography>
                    <Typography className={classes.secondaryHeading}>
                        You are currently not an owner
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
                        diam eros in elit. Pellentesque convallis laoreet laoreet.
                    </Typography>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button size="small">Cancel</Button>
                    <Button size="small" color="primary">
                        Save
                    </Button>
                </AccordionActions>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleExpandChange('panel3')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography className={classes.heading}>Advanced settings</Typography>
                    <Typography className={classes.secondaryHeading}>
                        Filtering has been entirely disabled for whole web server
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                        vitae egestas augue. Duis vel est augue.
                    </Typography>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button size="small">Cancel</Button>
                    <Button size="small" color="primary">
                        Save
                    </Button>
                </AccordionActions>
            </Accordion>
            <Accordion expanded={expanded === 'panel4'} onChange={handleExpandChange('panel4')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4bh-content"
                    id="panel4bh-header"
                >
                    <Typography className={classes.heading}>Personal data</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
                        vitae egestas augue. Duis vel est augue.
                    </Typography>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button size="small">Cancel</Button>
                    <Button size="small" color="primary">
                        Save
                    </Button>
                </AccordionActions>
            </Accordion>
        </div>
    );
}
