import React from 'react';

import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Badge from "@material-ui/core/Badge";
import DashboardIcon from '@material-ui/icons/Dashboard';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import SettingsIcon from '@material-ui/icons/Settings';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {
    orange,
    lightBlue,
    deepPurple,
    deepOrange
} from "@material-ui/core/colors";

import BottomNavigationContainer from "./BottomNavigationContainer";
import Dashboard from "./Dashboard";
import Videos from "./Videos";
import Settings from "./Settings";

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
    const mainPrimaryColor = darkState ? orange[500] : lightBlue[500];
    const mainSecondaryColor = darkState ? deepOrange[900] : deepPurple[500];
    const darkTheme = createMuiTheme({
        palette: {
            type: palletType,
            primary: {
                main: mainPrimaryColor
            },
            secondary: {
                main: mainSecondaryColor
            }
        }
    });

    const dashboardIconTab = <DashboardIcon/>;
    const videosIconTab = <VideoLibraryIcon/>;
    const settingsIconTab = <SettingsIcon/>;
    const assignmentIconTab = (
        <Badge badgeContent={4} color="secondary">
            <AssignmentIcon/>
        </Badge>
    );

    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.root}>
                <BottomNavigationContainer value={value} index={Tabs.DashboardTab}>
                    <Dashboard />
                </BottomNavigationContainer>
                <BottomNavigationContainer value={value} index={Tabs.VideosTab}>
                    <Videos />
                </BottomNavigationContainer>
                <BottomNavigationContainer value={value} index={Tabs.SettingsTab}>
                    <Settings defaultDarkMode={darkState} setDarkMode={setDarkState} />
                </BottomNavigationContainer>
                <BottomNavigationContainer value={value} index={Tabs.AssignmentTab}>
                    Assignment
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
