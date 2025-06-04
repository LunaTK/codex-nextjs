"use client"

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend)

export interface HistoryItem {
  timestamp: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export default function ChartView({ data }: { data: HistoryItem[] }) {
  const chartData = {
    labels: data.map(item => item.timestamp),
    datasets: [
      {
        label: 'Close',
        data: data.map(item => item.close),
        borderColor: 'rgb(75, 192, 192)',
        fill: false,
        tension: 0.1,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <div className="w-full h-64">
      <Line data={chartData} options={options} />
    </div>
  )
}

