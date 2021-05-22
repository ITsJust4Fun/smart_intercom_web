import React from 'react';

import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Badge from "@material-ui/core/Badge";
import DashboardIcon from '@material-ui/icons/Dashboard';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import SettingsIcon from '@material-ui/icons/Settings';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {
    lightBlue,
    deepPurple,
    red,
    green,
} from "@material-ui/core/colors";

import BottomNavigationContainer from "./BottomNavigationContainer";
import Dashboard from "./Dashboard";
import Videos from "./Videos";
import Settings from "./Settings";
import Reports from "./Reports";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    bottomNavigation: {
        width: "100%",
        position: "fixed",
        bottom: 0,
    },
});

enum Tabs {
    DashboardTab,
    VideosTab,
    SettingsTab,
    AssignmentTab,
}

export default function MainWindow() {
    const classes = useStyles();
    const [value, setValue] = React.useState(Tabs.DashboardTab);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const [darkState, setDarkState] = React.useState(false);
    const palletType = darkState ? "dark" : "light";
    const mainPrimaryColor = darkState ? deepPurple[200] : lightBlue[700];
    const mainSecondaryColor = darkState ? green[200] : green[400];

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
    );

    const badgeTheme = createMuiTheme({
        palette: {
            type: palletType,
            primary: {
                main: red[500],
            },
        },
    });

    const dashboardIconTab = <DashboardIcon/>;
    const videosIconTab = <VideoLibraryIcon/>;
    const settingsIconTab = <SettingsIcon/>;
    const assignmentIconTab = (
        <ThemeProvider theme={badgeTheme}>
            <Badge badgeContent={5} color="primary">
                <AssignmentIcon/>
            </Badge>
        </ThemeProvider>
    );

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
                    <Settings darkMode={darkState} setDarkMode={setDarkState} />
                </BottomNavigationContainer>
                <BottomNavigationContainer value={value} index={Tabs.AssignmentTab}>
                    <Reports />
                </BottomNavigationContainer>
                <BottomNavigation
                    value={value}
                    onChange={handleChange}
                    showLabels
                    className={classes.bottomNavigation}
                >
                    <BottomNavigationAction label="Dashboard" icon={dashboardIconTab}/>
                    <BottomNavigationAction label="Videos" icon={videosIconTab}/>
                    <BottomNavigationAction label="Settings" icon={settingsIconTab}/>
                    <BottomNavigationAction label="Reports" icon={assignmentIconTab}/>
                </BottomNavigation>
            </div>
        </ThemeProvider>
    );
}
