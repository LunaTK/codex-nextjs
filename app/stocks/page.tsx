'use client'

import { useState } from 'react'

export default function StockSearchPage() {
  const [symbol, setSymbol] = useState('')
  const [data, setData] = useState<any | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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
    </div>
  )
}
