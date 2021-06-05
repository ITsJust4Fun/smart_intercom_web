import React from 'react'

import { makeStyles, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import LabeledPieChart from './LabeledPieChart'
import { createPieChartData, PieChartData } from './PieChartData'

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1,
            margin: 0,
            width: "100%",
        },
        paper: {
            height: 350,
            width: 350,
        },
    }),
)

export default function Dashboard() {
    const classes = useStyles()

    const data: PieChartData[] = [
        createPieChartData('Group A', 400),
        createPieChartData('Свободно', 300),
        createPieChartData('Group C', 300),
        createPieChartData('Group D', 200)
    ]

    return (
        <Grid container className={classes.root} justify="center" spacing={3}>
            {[0, 1, 2, 3, 4, 5].map((value) => (
                <Grid key={value} item>
                    <Paper className={classes.paper}>
                        <LabeledPieChart
                            data={data}
                            startIndex={0}
                            colors={[
                                "#0088FE",
                                "#00C49F",
                                "#FFBB28",
                                "#FF8042"
                            ]}
                            postfix={' mb'}
                            width={350}
                            height={350}
                            innerRadius={40}
                            outerRadius={60}
                        />
                    </Paper>
                </Grid>
            ))}
        </Grid>
    )
}
