import React from 'react'
import { TFunction, withTranslation } from 'react-i18next'
import { i18n } from 'i18next'
import Cookies from 'universal-cookie'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionActions from '@material-ui/core/AccordionActions'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'

import SettingsTable from "./SettingsTable"
import { createButton, createData, createNumberFieldData, createOptionsFieldData, Data, Editors } from './Data'
import { languages } from "./i18n/config"
import { useAuth } from './auth/AuthContext'
import { gql, useLazyQuery } from '@apollo/client'

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
    t: TFunction<string[]>
    i18n: i18n
    darkMode: boolean
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
    language: string
    setLanguage: (language: string) => void
}

const LOGOUT = gql`
  query logout {
    logout
  }
`

function Settings(props: SettingsProps) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const { t, darkMode, setDarkMode, language, setLanguage } = props;

    const setAuthState = useAuth()[1]

    const [onLogHandler] = useLazyQuery(LOGOUT, {
        onCompleted: (data) => {
            if (!data || !data['logout']) {
                return
            }

            localStorage.setItem('token', '')
            setAuthState(false)
        },
        onError: (error) => {
            localStorage.setItem('token', '')
            setAuthState(false)
        },
    })

    const logout = () => {
        onLogHandler()
    }

    const interfaceSettings = [
        createData("darkMode", Editors.Switch, darkMode),
        createOptionsFieldData("language", language, languages),
        createData("testTextInput", Editors.TextField, "test"),
        createNumberFieldData("testNumberInput", 5, 0, 100),
        createButton("logout", logout)
    ];

    const titles: Record<string, string> = {
        "darkMode": t("settings:darkMode"),
        "language": t("settings:language"),
        "testTextInput": "Test text input",
        "testNumberInput": "Test number input",
        "logout": t("settings:logout")
    };

    const defaultInterfaceSettings: Data[] = [];
    interfaceSettings.forEach(val => defaultInterfaceSettings.push(Object.assign({}, val)));

    const handleExpandChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    const handleInterfaceChange = (values: Data[]) => {
        const cookies = new Cookies()

        for (let data of values) {
            cookies.set(data.name, data.value, { path: '/' })

            if (data.name === 'darkMode') {
                setDarkMode(data.value)
            } else if (data.name === 'language') {
                setLanguage(data.value)
            }
        }
    };

    return (
        <div className={classes.root}>
            <SettingsTable title='interfaceSettings'
                           description='setupWebApp'
                           rows={interfaceSettings}
                           defaultRows={defaultInterfaceSettings}
                           rowsTitles={titles}
                           handleTableChanged={handleInterfaceChange}
            />
            <Accordion expanded={expanded === 'panel2'} onChange={handleExpandChange('panel2')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel2bh-content'
                    id='panel2bh-header'
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
    )
}

export default withTranslation("settings")(Settings)
