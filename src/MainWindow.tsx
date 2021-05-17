import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Badge from "@material-ui/core/Badge";
import DashboardIcon from '@material-ui/icons/Dashboard';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import SettingsIcon from '@material-ui/icons/Settings';
import AssignmentIcon from '@material-ui/icons/Assignment';

import BottomNavigationContainer from "./BottomNavigationContainer";
import Dashboard from "./Dashboard";

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
    VideoTab,
    SettingsTab,
    AssignmentTab,
}

export default function MainWindow() {
    const classes = useStyles();
    const [value, setValue] = React.useState(Tabs.DashboardTab);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const dashboardIconTab = <DashboardIcon/>;
    const videoIconTab = <VideoLibraryIcon/>;
    const settingsIconTab = <SettingsIcon/>;
    const assignmentIconTab = (
        <Badge badgeContent={4} color="secondary">
            <AssignmentIcon/>
        </Badge>
    );

    return (
        <div className={classes.root}>
            <BottomNavigationContainer value={value} index={Tabs.DashboardTab}>
                <Dashboard/>
            </BottomNavigationContainer>
            <BottomNavigationContainer value={value} index={Tabs.VideoTab}>
                Video
            </BottomNavigationContainer>
            <BottomNavigationContainer value={value} index={Tabs.SettingsTab}>
                Settings
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
                <BottomNavigationAction label="Videos" icon={videoIconTab}/>
                <BottomNavigationAction label="Settings" icon={settingsIconTab}/>
                <BottomNavigationAction label="Reports" icon={assignmentIconTab}/>
            </BottomNavigation>
        </div>
    );
}
