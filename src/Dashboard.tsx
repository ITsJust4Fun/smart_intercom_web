import React from 'react'

import { makeStyles, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import LabeledPieChart from './LabeledPieChart'
import { createPieChartData, PieChartData } from './PieChartData'
import {gql, useQuery} from '@apollo/client'

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

interface ReportStatistics {
    normal: number
    warnings: number
    errors: number
}

interface ReportStatisticsData {
    reportStatistics: ReportStatistics
}

const REPORT_STATISTICS = gql`
query ReportStatistics {
  reportStatistics {
    normal
    warnings
    errors
  }
}
`

export default function Dashboard() {
    const classes = useStyles()
    const {loading, error, data} = useQuery<ReportStatisticsData>(REPORT_STATISTICS)

    const reportData: PieChartData[] = []

    if (data) {
        reportData.push(createPieChartData('Normal', data.reportStatistics.normal))
        reportData.push(createPieChartData('Warnings', data.reportStatistics.warnings))
        reportData.push(createPieChartData('Errors', data.reportStatistics.errors))
    }

    return (
        <Grid container className={classes.root} justify='center' spacing={3}>
            <Grid key={'ReportStatistics'} item>
                <Paper className={classes.paper}>
                    <LabeledPieChart
                        title={'Reports'}
                        data={reportData}
                        startIndex={0}
                        colors={[
                            '#42c945',
                            '#d4cf4e',
                            '#e34949',
                        ]}
                        postfix={''}
                        width={350}
                        height={350}
                        innerRadius={40}
                        outerRadius={60}
                    />
                </Paper>
            </Grid>
        </Grid>
    )
}
