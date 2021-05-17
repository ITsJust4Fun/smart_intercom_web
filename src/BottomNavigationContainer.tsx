import React from 'react';
import Box from '@material-ui/core/Box';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

export default function BottomNavigationContainer(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box style={{paddingBottom: 50}}>
                    {children}
                </Box>
            )}
        </div>
    );
}