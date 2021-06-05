export interface PieChartData {
    name: string
    value: number
}

export function createPieChartData(
    name: string,
    value: number
): PieChartData {
    return { name, value }
}
