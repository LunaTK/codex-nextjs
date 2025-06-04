import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get('symbol');
  if (!symbol) {
    return Response.json({ error: 'Missing symbol parameter' }, { status: 400 });
  }

  const url = `https://stooq.pl/q/l/?s=${symbol.toLowerCase()}.us`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return Response.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
    const csv = await res.text();
    const [line] = csv.trim().split('\n');
    const [ticker, date, time, open, high, low, close, volume] = line.split(',');
    return Response.json({
      ticker,
      date,
      time,
      open: parseFloat(open),
      high: parseFloat(high),
      low: parseFloat(low),
      close: parseFloat(close),
      volume: parseInt(volume, 10)
    });
  } catch (e: any) {
    return Response.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
