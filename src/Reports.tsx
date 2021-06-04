import React from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
import WarningIcon from '@material-ui/icons/Warning'
import ErrorIcon from '@material-ui/icons/Error'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { CardActions, CardHeader, IconButton } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            margin: 0,
            width: "100%",
        },
        card: {
            maxWidth: 345,
        },
        warning: {
            color: '#d4cf4e',
        },
        error: {
            color: '#e34949',
        },
        ok: {
            color: '#42c945',
        },
    }),
)

export default function Reports() {
    const classes = useStyles()
    const iconsAva = [<CheckCircleIcon className={classes.ok} />, <WarningIcon className={classes.warning} />, <ErrorIcon className={classes.error} />]

    return (
        <Grid container className={classes.root} justify="center" spacing={3}>
            {[0, 1, 2, 3, 4, 5].map((value) => (
                <Grid key={value} item>
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                iconsAva[value % 3]
                            }
                            title="Telegram plugin"
                            subheader="September 14, 2016"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                This impressive paella is a perfect party dish and a fun meal to cook together with your
                                guests. Add 1 cup of frozen peas along with the mussels, if you like.
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="Delete">
                                <DeleteForeverIcon />
                            </IconButton>
                            <IconButton aria-label="Viewed">
                                <VisibilityIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}
