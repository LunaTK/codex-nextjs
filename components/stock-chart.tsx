'use client'

import React from 'react'
import { Chart, CandlestickSeries } from 'lightweight-charts-react-wrapper'
import type { UTCTimestamp } from 'lightweight-charts'

export interface HistoryItem {
  timestamp: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

interface StockChartProps {
  data: HistoryItem[]
}

export default function StockChart({ data }: StockChartProps) {
  const seriesData = React.useMemo(
    () =>
      data.map(item => ({
        time: (Math.floor(new Date(item.timestamp).getTime() / 1000)) as UTCTimestamp,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
      })),
    [data]
  )

  return (
    <Chart autoSize height={300}>
      <CandlestickSeries data={seriesData} />
    </Chart>
  )
}
