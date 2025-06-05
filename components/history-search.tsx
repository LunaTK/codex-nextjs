"use client"

import { useState, useMemo, startTransition, Suspense, use } from 'react'
import DateSelect from '@/components/date-select'
import ChartView from '@/components/chart-view'
import { Button } from '@/components/ui/button'

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
      <Button className="mt-2" onClick={searchHistory}>
        Search History
      </Button>
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
  if ('error' in result) {
    return <p className="text-red-600">{result.error}</p>
  }
  const history = result
  return <ChartView data={history} />
}

