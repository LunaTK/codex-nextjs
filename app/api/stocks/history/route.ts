import { NextRequest } from 'next/server'

const API_KEY = process.env.ALPHAVANTAGE_API_KEY || 'demo'

function parseDate(value: string | null) {
  if (!value) return null
  const date = new Date(value)
  return isNaN(date.getTime()) ? null : date
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const symbol = searchParams.get('symbol')
  const from = parseDate(searchParams.get('from'))
  const to = parseDate(searchParams.get('to'))
  const unit = searchParams.get('unit') || 'day'

  if (!symbol) {
    return Response.json({ error: 'Missing symbol parameter' }, { status: 400 })
  }
  if (!from || !to) {
    return Response.json({ error: 'from and to parameters are required and must be valid dates' }, { status: 400 })
  }
  if (from > to) {
    return Response.json({ error: 'from must be before to' }, { status: 400 })
  }

  let url: string
  if (unit === '5min' || unit === '1hour') {
    const interval = unit === '5min' ? '5min' : '60min'
    url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&outputsize=full&apikey=${API_KEY}`
  } else if (unit === 'day') {
    url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=full&apikey=${API_KEY}`
  } else {
    return Response.json({ error: 'Invalid unit parameter' }, { status: 400 })
  }

  try {
    const res = await fetch(url)
    if (!res.ok) {
      return Response.json({ error: 'Failed to fetch data' }, { status: 500 })
    }
    const data = await res.json()

    const seriesKey = unit === 'day' ? 'Time Series (Daily)' : unit === '5min' ? 'Time Series (5min)' : 'Time Series (60min)'
    const series = data[seriesKey]
    if (!series) {
      return Response.json({ error: 'Unexpected response from data provider' }, { status: 500 })
    }

    const typedSeries = series as Record<string, Record<string, string>>
    const results = Object.entries(typedSeries)
      .map(([timestamp, values]) => ({
        timestamp,
        open: parseFloat(values['1. open']),
        high: parseFloat(values['2. high']),
        low: parseFloat(values['3. low']),
        close: parseFloat(values['4. close']),
        volume: parseInt(values['5. volume'], 10)
      }))
      .filter(r => {
        const t = new Date(r.timestamp)
        return t >= from && t <= to
      })
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())

    return Response.json({ symbol, unit, data: results })
  } catch (e: unknown) {
    return Response.json({ error: 'Unexpected error' }, { status: 500 })
  }
}
