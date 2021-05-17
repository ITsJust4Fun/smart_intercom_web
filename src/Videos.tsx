import React from 'react';
import ReactPlayer from 'react-player';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            margin: 0,
            width: "100%",
        },
        card: {
            maxWidth: 360,
        },
    }),
);

export default function Videos() {
    const classes = useStyles();

    return (
        <Grid container className={classes.root} justify="center" spacing={3}>
            {[0, 1, 2, 3].map((value) => (
                <Grid key={value} item>
                    <Card className={classes.card}>
                        <CardActionArea>
                            <ReactPlayer allowFullScreen height="203px" width="360px" justify="center" url='https://www.youtube.com/watch?v=ZikhME7ZL0o' playing />
                        </CardActionArea>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="span">
                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}