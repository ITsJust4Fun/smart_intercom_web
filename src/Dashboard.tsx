import React from 'react'

import { makeStyles, createStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import LabeledPieChart from './LabeledPieChart'
import { createPieChartData, PieChartData } from './PieChartData'
import {gql, useQuery} from '@apollo/client'
import {TFunction, withTranslation} from 'react-i18next'
import { i18n } from 'i18next'

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

interface HardwareStatistics {
    cpuUsage: number
    freeRAM: number
    usedRAM: number
    totalRAM: number
    freeHDD: number
    usedHDD: number
    totalHDD: number
}

interface HardwareStatisticsData {
    hardwareStatistics: HardwareStatistics
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

const HARDWARE_STATISTICS = gql`
query HardwareStatistics {
  hardwareStatistics {
    cpuUsage
    freeRAM
    usedRAM
    totalRAM
    freeHDD
    usedHDD
    totalHDD
  }
}
`

function MegabyteToGigabyte(megabytes: number, forceGB: boolean = false): [number, boolean] {
    if (megabytes >= 1024 || forceGB) {
        return [megabytes / 1024, true]
    }

    megabytes = Math.round(megabytes)
    return [megabytes, false]
}

interface DashboardProps {
    t: TFunction<string[]>
    i18n: i18n
}

function Dashboard(props: DashboardProps) {
    const { t } = props

    const classes = useStyles()
    const resultReport = useQuery<ReportStatisticsData>(REPORT_STATISTICS)
    const resultHardware = useQuery<HardwareStatisticsData>(HARDWARE_STATISTICS, {
        pollInterval: 3000
    })

    let reportData: PieChartData[] = []
    let cpuData: PieChartData[] = []
    let hddData: PieChartData[] = []
    let ramData: PieChartData[] = []
    let hddPostfix = ' MB'
    let ramPostfix = ' MB'

    if (resultReport.data) {
        reportData.push(createPieChartData(t('dashboard:normal'), resultReport.data.reportStatistics.normal))
        reportData.push(createPieChartData(t('dashboard:warnings'), resultReport.data.reportStatistics.warnings))
        reportData.push(createPieChartData(t('dashboard:errors'), resultReport.data.reportStatistics.errors))
    }

    if (resultHardware.data) {
        cpuData.push(createPieChartData(t('dashboard:used'), Math.round(resultHardware.data.hardwareStatistics.cpuUsage)))
        const cpuFree = 100 - resultHardware.data.hardwareStatistics.cpuUsage
        cpuData.push(createPieChartData(t('dashboard:free'), Math.round(cpuFree)))

        let [usedHDD, isGBUsedHDD] = MegabyteToGigabyte(resultHardware.data.hardwareStatistics.usedHDD)
        let [freeHDD, isGBFreeHDD] = MegabyteToGigabyte(resultHardware.data.hardwareStatistics.freeHDD, isGBUsedHDD)

        if (isGBFreeHDD) {
            hddPostfix = ' ' + t('dashboard:gb')
        }

        hddData.push(createPieChartData(t('dashboard:used'), usedHDD))
        hddData.push(createPieChartData(t('dashboard:free'), freeHDD))

        let [usedRAM, isGBUsedRAM] = MegabyteToGigabyte(resultHardware.data.hardwareStatistics.usedRAM)
        let [freeRAM, isGBFreeRAM] = MegabyteToGigabyte(resultHardware.data.hardwareStatistics.freeRAM, isGBUsedRAM)

        if (isGBFreeRAM) {
            ramPostfix = ' ' + t('dashboard:gb')
        }

        ramData.push(createPieChartData(t('dashboard:used'), usedRAM))
        ramData.push(createPieChartData(t('dashboard:free'), freeRAM))
    }

    return (
        <Grid container className={classes.root} justify='center' spacing={3}>
            <Grid key={'ReportStatistics'} item>
                <Paper className={classes.paper}>
                    <LabeledPieChart
                        title={t('dashboard:reports')}
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
            <Grid key={'CPUStatistics'} item>
                <Paper className={classes.paper}>
                    <LabeledPieChart
                        title={t('dashboard:cpu')}
                        data={cpuData}
                        startIndex={0}
                        colors={[
                            '#e34949',
                            '#42c945',
                        ]}
                        postfix={'%'}
                        width={350}
                        height={350}
                        innerRadius={40}
                        outerRadius={60}
                    />
                </Paper>
            </Grid>
            <Grid key={'RAMStatistics'} item>
                <Paper className={classes.paper}>
                    <LabeledPieChart
                        title={t('dashboard:ram')}
                        data={ramData}
                        startIndex={0}
                        colors={[
                            '#e34949',
                            '#42c945',
                        ]}
                        postfix={ramPostfix}
                        width={350}
                        height={350}
                        innerRadius={40}
                        outerRadius={60}
                    />
                </Paper>
            </Grid>
            <Grid key={'HDDStatistics'} item>
                <Paper className={classes.paper}>
                    <LabeledPieChart
                        title={t('dashboard:storage')}
                        data={hddData}
                        startIndex={0}
                        colors={[
                            '#e34949',
                            '#42c945',
                        ]}
                        postfix={hddPostfix}
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

export default withTranslation('dashboard')(Dashboard)
