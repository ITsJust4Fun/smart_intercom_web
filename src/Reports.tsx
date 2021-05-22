import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            margin: 0,
            width: "100%",
        },
        paper: {
            height: 250,
            width: 350,
        },
    }),
);

export default function Reports() {
    const classes = useStyles();

    return (
        <Grid container className={classes.root} justify="center" spacing={3}>
            {[0, 1, 2, 3, 4, 5].map((value) => (
                <Grid key={value} item>
                    <Paper className={classes.paper} />
                </Grid>
            ))}
        </Grid>
    );
}
