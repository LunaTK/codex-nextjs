"use client";

import React from "react";
import dynamic from "next/dynamic";
import type { UTCTimestamp } from "lightweight-charts";

const Chart = dynamic(
  () => import("lightweight-charts-react-wrapper").then((m) => m.Chart),
  { ssr: false },
);
const CandlestickSeries = dynamic(
  () =>
    import("lightweight-charts-react-wrapper").then((m) => m.CandlestickSeries),
  { ssr: false },
);

export interface HistoryItem {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface StockChartProps {
  data: HistoryItem[];
}

export default function StockChart({ data }: StockChartProps) {
  const seriesData = React.useMemo(
    () =>
      data.map((item) => ({
        time: Math.floor(
          new Date(item.timestamp).getTime() / 1000,
        ) as UTCTimestamp,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
      })),
    [data],
  );

  return (
    <Chart autoSize height={300}>
      <CandlestickSeries data={seriesData} reactive />
    </Chart>
  );
}
