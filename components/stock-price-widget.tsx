import { useEffect, useState } from 'react'

interface PriceData {
  ticker: string
  close: number
}

export default function StockPriceWidget({ symbol }: { symbol: string }) {
  const [data, setData] = useState<PriceData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setData(null)
    setError(null)
    fetch(`/api/stocks?symbol=${symbol}`)
      .then(res => res.json())
      .then((json: any) => {
        if (json.error) throw new Error(json.error)
        setData(json as PriceData)
      })
      .catch(e => setError(e.message))
  }, [symbol])

  if (error) return <p role="alert">{error}</p>
  if (!data) return <p>Loading...</p>
  return <p>{data.ticker}: {data.close}</p>
}
