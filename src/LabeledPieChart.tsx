import React, { useCallback, useState } from "react"
import { PieChart, Pie, Sector, Cell, Legend } from "recharts"

import { PieChartData } from './PieChartData'
import Typography from '@material-ui/core/Typography'
import { createStyles, makeStyles, useTheme } from '@material-ui/core/styles'

const useStyles = makeStyles(() =>
    createStyles({
        title: {
            paddingTop: '1px',
        },
        chart: {
            position: 'absolute',
            top: 0,
            left: 0,
        },
        container: {
            position: 'relative',
        },
        pieChart: {
            margin: 'auto'
        }
    }),
)

interface LabeledPieChartProps {
    title: string
    data: PieChartData[]
    startIndex: number
    colors: string[]
    postfix: string
    width: number
    height: number
    innerRadius: number
    outerRadius: number
}

function isInt(n: number): boolean {
    return n % 1 === 0;
}

export default function LabeledPieChart(props: LabeledPieChartProps) {
    const {
        title,
        data,
        startIndex,
        colors,
        postfix,
        width,
        height,
        innerRadius,
        outerRadius
    } = props

    const theme = useTheme()

    let chartData: any[] = []
    for (const [index, row] of data.entries()) {
        chartData.push({ name: row.name, value: row.value, index: index})
    }

    const classes = useStyles()

    const renderActiveShape = (props: any) => {
        const RADIAN = Math.PI / 180
        const {
            cx,
            cy,
            midAngle,
            innerRadius,
            outerRadius,
            startAngle,
            endAngle,
            fill,
            payload,
            percent,
            value
        } = props
        const sin = Math.sin(-RADIAN * midAngle)
        const cos = Math.cos(-RADIAN * midAngle)
        const sx = cx + (outerRadius + 10) * cos
        const sy = cy + (outerRadius + 10) * sin
        const mx = cx + (outerRadius + 30) * cos
        const my = cy + (outerRadius + 30) * sin
        const ex = mx + (cos >= 0 ? 1 : -1) * 22
        const ey = my
        const textAnchor = cos >= 0 ? "start" : "end"

        return (
            <g>
                <text x={cx} y={cy} dy={0} textAnchor="middle" fill={fill}>
                    {payload.name}
                </text>
                <text x={cx} y={cy} dy={20} textAnchor="middle" fill={fill}>
                    {`${(percent * 100).toFixed(0)}%`}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                    stroke={theme.palette.background.paper}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                    stroke={theme.palette.background.paper}
                />
                <path
                    d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                    stroke={fill}
                    fill="none"
                />
                <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
                <text
                    x={ex + (cos >= 0 ? 1 : -1) * 12}
                    y={ey}
                    textAnchor={textAnchor}
                    fill={theme.palette.text.primary}
                >
                    {isInt(value)
                        ? `${value}${postfix}`
                        : `${value.toFixed(1)}${postfix}`}
                </text>
            </g>
        )
    }

    const [activeIndex, setActiveIndex] = useState(startIndex)
    const onPieEnter = useCallback(
        (_, index) => {
            setActiveIndex(index)
        },
        [setActiveIndex]
    )

    return (
        <div className={classes.container}>
            <Typography variant='h6' align={'center'}>{title}</Typography>
            <div className={classes.chart}>
                <PieChart width={width} height={height}>
                    <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={chartData}
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        dataKey="value"
                        onMouseEnter={onPieEnter}
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`} fill={colors[index % colors.length]}
                                stroke={theme.palette.background.paper}
                            />
                        ))}
                    </Pie>
                    <Legend onMouseEnter={(o: any) => {onPieEnter(undefined, o.payload.index)}} />
                </PieChart>
            </div>
        </div>
    )
}