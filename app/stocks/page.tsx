'use client'

import { useState } from 'react'
import DateSelect from '@/components/date-select'

export default function StockSearchPage() {
  const [symbol, setSymbol] = useState('')
  const [data, setData] = useState<any | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const today = new Date()

  const [from, setFrom] = useState(yesterday.toISOString().slice(0, 16))
  const [to, setTo] = useState(today.toISOString().slice(0, 16))
  const [unit, setUnit] = useState('1hour')
  const [history, setHistory] = useState<any[] | null>(null)
  const [historyError, setHistoryError] = useState('')
  const [historyLoading, setHistoryLoading] = useState(false)

  const fetchPrice = async () => {
    if (!symbol) return
    setLoading(true)
    setError('')
    setData(null)
    try {
      const res = await fetch(`/api/stocks?symbol=${symbol}`)
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to fetch')
      setData(json)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const fetchHistory = async () => {
    if (!symbol) return
    setHistoryLoading(true)
    setHistoryError('')
    setHistory(null)
    try {
      const params = new URLSearchParams({
        symbol,
        from,
        to,
        unit,
      })
      const res = await fetch(`/api/stocks/history?${params.toString()}`)
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Failed to fetch')
      setHistory(json.data)
    } catch (e: any) {
      setHistoryError(e.message)
    } finally {
      setHistoryLoading(false)
    }
  }

  return (
    <div className="p-8 flex flex-col gap-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Stock Price Lookup</h1>
      <div className="flex gap-2">
        <input
          className="border px-2 py-1 flex-1 rounded"
          value={symbol}
          onChange={e => setSymbol(e.target.value)}
          placeholder="Enter symbol e.g. AAPL"
        />
        <button
          className="border px-4 rounded disabled:opacity-50"
          onClick={fetchPrice}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>
      {error && <p className="text-red-600">{error}</p>}
      {data && (
        <div className="border p-4 rounded">
          <p><strong>{data.ticker}</strong></p>
          <p>Price: {data.close}</p>
          <p>Date: {data.date} {data.time}</p>
        </div>
      )}

      <h2 className="text-xl font-bold mt-6">History</h2>
      <DateSelect
        from={from}
        to={to}
        unit={unit}
        setFrom={setFrom}
        setTo={setTo}
        setUnit={setUnit}
      />
      <button
        className="border px-4 rounded disabled:opacity-50 mt-2"
        onClick={fetchHistory}
        disabled={historyLoading}
      >
        {historyLoading ? 'Loading...' : 'Search History'}
      </button>
      {historyError && <p className="text-red-600">{historyError}</p>}
      {history && (
        <ul className="border p-4 rounded space-y-1 text-sm font-mono overflow-x-auto">
          {history.map((item, idx) => (
            <li key={idx}>{JSON.stringify(item)}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
