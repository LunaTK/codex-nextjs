"use client"

import { useState, useMemo, startTransition, Suspense, use } from 'react'
import DateSelect from '@/components/date-select'
import Tabs, { TabItem } from '@/components/Tabs'
import ChartView from '@/components/chart-view'

interface HistorySearchProps {
  symbolInput: string
}

interface HistoryItem {
  timestamp: string
  open: number
  high: number
  low: number
  close: number
  volume: number
}

interface HistoryError {
  error: string
}

export default function HistorySearch({ symbolInput }: HistorySearchProps) {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const today = new Date()

  const [from, setFrom] = useState(yesterday.toISOString().slice(0, 16))
  const [to, setTo] = useState(today.toISOString().slice(0, 16))
  const [unit, setUnit] = useState('1hour')
  const [historyParams, setHistoryParams] = useState<
    { symbol: string; from: string; to: string; unit: string } | null
  >(null)

  const historyPromise = useMemo<
    Promise<HistoryItem[] | HistoryError> | null
  >(() => {
    if (!historyParams) return null
    const params = new URLSearchParams(historyParams).toString()
    return fetch(`/api/stocks/history?${params}`)
      .then(async res => {
        const json: { data: HistoryItem[] } & Partial<HistoryError> =
          await res.json()
        if (!res.ok) return { error: json.error || 'Failed to fetch' }
        return json.data
      })
      .catch((e: Error): HistoryError => ({ error: e.message }))
  }, [historyParams])

  const searchHistory = () => {
    if (!symbolInput.trim()) return
    startTransition(() => {
      setHistoryParams({ symbol: symbolInput.trim(), from, to, unit })
    })
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold">History</h2>
      <DateSelect
        from={from}
        to={to}
        unit={unit}
        setFrom={setFrom}
        setTo={setTo}
        setUnit={setUnit}
      />
      <button className="border px-4 rounded mt-2" onClick={searchHistory}>
        Search History
      </button>
      {historyPromise && (
        <Suspense fallback={<p>Loading...</p>}>
          <HistoryResult promise={historyPromise} />
        </Suspense>
      )}
    </div>
  )
}

function HistoryResult({ promise }: { promise: Promise<HistoryItem[] | HistoryError> }) {
  const result = use(promise)
  const [view, setView] = useState<'raw' | 'chart'>('raw')

  if ('error' in result) {
    return <p className="text-red-600">{result.error}</p>
  }

  const history = result

  const tabs: TabItem[] = [
    { label: 'Raw', value: 'raw' },
    { label: 'Chart', value: 'chart' },
  ]

  return (
    <div className="mt-4 space-y-4">
      <Tabs tabs={tabs} value={view} onChange={(v) => setView(v as 'raw' | 'chart')} />
      {view === 'raw' ? (
        <ul className="border p-4 rounded space-y-1 text-sm font-mono overflow-x-auto">
          {history.map((item, idx) => (
            <li key={idx}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      ) : (
        <ChartView data={history} />
      )}
    </div>
  )
}

