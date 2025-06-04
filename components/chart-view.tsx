"use client"

import { useEffect, useRef } from "react"
import type { IChartApi, UTCTimestamp, LineData } from "lightweight-charts"
import { createChart, LineSeries } from "lightweight-charts"

export interface StockHistoryItem {
  timestamp: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export default function ChartView({ data }: { data: StockHistoryItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    if (chartRef.current) {
      chartRef.current.remove()
    }

    const chart = createChart(containerRef.current, {
      height: 256,
      width: containerRef.current.clientWidth,
    })

    const series = chart.addSeries(LineSeries, {
      lineWidth: 2,
      color: "hsl(var(--chart-1))",
    })

    const lineData: LineData[] = data.map(item => ({
      time: Math.floor(new Date(item.timestamp).getTime() / 1000) as UTCTimestamp,
      value: item.close,
    }))

    series.setData(lineData)

    const handleResize = () => {
      chart.applyOptions({ width: containerRef.current!.clientWidth })
    }
    window.addEventListener("resize", handleResize)
    chartRef.current = chart
    handleResize()
    return () => {
      window.removeEventListener("resize", handleResize)
      chart.remove()
    }
  }, [data])

  if (data.length === 0) {
    return <p>No data</p>
  }

  return <div ref={containerRef} className="w-full h-64" />
}
