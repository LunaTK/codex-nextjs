import ChartView from '@/components/chart-view'
import type { StockPrice } from '@/utils/types'

const mockPrices: StockPrice[] = [
  {
    ticker: 'ACME',
    date: '2024-01-01',
    time: '09:00:00',
    open: 1,
    high: 1.2,
    low: 0.8,
    close: 1.1,
    volume: 500,
  },
  {
    ticker: 'ACME',
    date: '2024-01-02',
    time: '09:00:00',
    open: 1.1,
    high: 1.3,
    low: 1.0,
    close: 1.25,
    volume: 700,
  },
  {
    ticker: 'ACME',
    date: '2024-01-03',
    time: '09:00:00',
    open: 1.25,
    high: 1.4,
    low: 1.1,
    close: 1.3,
    volume: 650,
  },
  {
    ticker: 'ACME',
    date: '2024-01-04',
    time: '09:00:00',
    open: 1.3,
    high: 1.45,
    low: 1.2,
    close: 1.4,
    volume: 800,
  },
  {
    ticker: 'ACME',
    date: '2024-01-05',
    time: '09:00:00',
    open: 1.4,
    high: 1.6,
    low: 1.3,
    close: 1.55,
    volume: 750,
  },
]

const historyData = mockPrices.map(p => ({
  timestamp: `${p.date} ${p.time}`,
  open: p.open,
  high: p.high,
  low: p.low,
  close: p.close,
  volume: p.volume,
}))

export default function ShowcasePage() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold">Chart Showcase</h1>
      <ChartView data={historyData} />
    </div>
  )
}
