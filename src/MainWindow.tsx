import React, {useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next'
import Cookies from 'universal-cookie'

import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Badge from '@material-ui/core/Badge'
import DashboardIcon from '@material-ui/icons/Dashboard'
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary'
import SettingsIcon from '@material-ui/icons/Settings'
import AssignmentIcon from '@material-ui/icons/Assignment'
import {
    lightBlue,
    deepPurple,
    red,
    green,
} from '@material-ui/core/colors'

import BottomNavigationContainer from './BottomNavigationContainer'
import Dashboard from './Dashboard'
import Videos from './Videos'
import Settings from './Settings'
import Reports from './Reports'
import SignIn from './SignIn'
import './i18n/config'
import { useAuth } from './auth/AuthContext'
import {gql, useLazyQuery} from '@apollo/client'

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    bottomNavigation: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
    },
})

enum Tabs {
    DashboardTab,
    VideosTab,
    SettingsTab,
    AssignmentTab,
}

const REPORTS_COUNT_QUERY = gql`
query ReportsCount {
  unviewedReportsCount
}
`

export default function MainWindow() {
    const classes = useStyles()
    const [value, setValue] = React.useState(Tabs.DashboardTab)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
    }

    const cookies = new Cookies()
    let darkModeCookies = cookies.get('darkMode')
    let languageCookies = cookies.get('language')

    let darkModeState = false

    if (darkModeCookies === 'true') {
        darkModeState = true
    }

    if (languageCookies === undefined) {
        languageCookies = 'en'
    }

    const [darkState, setDarkState] = React.useState(darkModeState)
    const { t, i18n } = useTranslation(['main'])

    const palletType = darkState ? 'dark' : 'light'
    const mainPrimaryColor = darkState ? deepPurple[200] : lightBlue[700]
    const mainSecondaryColor = darkState ? green[200] : green[400]

    const [isAuth, setAuthState] = useAuth()

    const setLanguage = (language: string) => {
        i18n.changeLanguage(language)
    }

    useEffect(() => {
        i18n.changeLanguage(languageCookies)
    }, [i18n, languageCookies])

    const [onUpdateReportsCount, { data }] = useLazyQuery(REPORTS_COUNT_QUERY)
    const [unviewedCount, setUnviewedCount] = useState<number | undefined>(undefined)

    useEffect(() => {
        if (isAuth) {
            onUpdateReportsCount()
        }
        if (data && data.unviewedReportsCount) {
            setUnviewedCount(data.unviewedReportsCount)
        }
    }, [isAuth, data, onUpdateReportsCount])

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: palletType,
                    primary: {
                        main: mainPrimaryColor
                    },
                    secondary: {
                        main: mainSecondaryColor
                    }
                },
            }),
        [palletType, mainPrimaryColor, mainSecondaryColor],
    )

    const badgeTheme = createMuiTheme({
        palette: {
            type: palletType,
            primary: {
                main: red[500],
            },
        },
    })

    const dashboardIconTab = <DashboardIcon/>
    const videosIconTab = <VideoLibraryIcon/>
    const settingsIconTab = <SettingsIcon/>
    const assignmentIconTab = (
        <ThemeProvider theme={badgeTheme}>
            <Badge badgeContent={unviewedCount} color='primary'>
                <AssignmentIcon/>
            </Badge>
        </ThemeProvider>
    )

    if (!isAuth) {
        return (
            <ThemeProvider theme={theme}>
                <SignIn setAuthState={setAuthState} />
            </ThemeProvider>
        )
    }

    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <BottomNavigationContainer value={value} index={Tabs.DashboardTab}>
                    <Dashboard />
                </BottomNavigationContainer>
                <BottomNavigationContainer value={value} index={Tabs.VideosTab}>
                    <Videos />
                </BottomNavigationContainer>
                <BottomNavigationContainer value={value} index={Tabs.SettingsTab}>
                    <Settings darkMode={darkState}
                              setDarkMode={setDarkState}
                              language={i18n.language}
                              setLanguage={setLanguage}
                    />
                </BottomNavigationContainer>
                <BottomNavigationContainer value={value} index={Tabs.AssignmentTab}>
                    <Reports
                        setUnviewedCount={setUnviewedCount}
                    />
                </BottomNavigationContainer>
                <BottomNavigation
                    value={value}
                    onChange={handleChange}
                    showLabels
                    className={classes.bottomNavigation}
                >
                    <BottomNavigationAction label={t('main:dashboard')} icon={dashboardIconTab}/>
                    <BottomNavigationAction label={t('main:videos')} icon={videosIconTab}/>
                    <BottomNavigationAction label={t('main:settings')} icon={settingsIconTab}/>
                    <BottomNavigationAction label={t('main:reports')} icon={assignmentIconTab}/>
                </BottomNavigation>
            </div>
        </ThemeProvider>
    )
}
