"use client";

import { useState, startTransition, Suspense, use } from "react";
import HistorySearch from "@/components/history-search";
import { StockPrice } from "@/utils/types";

interface PriceError {
  error: string;
}

export default function StockSearchPage() {
  const [symbolInput, setSymbolInput] = useState("");
  const [pricePromise, setPricePromise] = useState<Promise<
    StockPrice | PriceError
  > | null>(null);

  const searchPrice = () => {
    const symbol = symbolInput.trim();
    if (!symbol) return;
    startTransition(() => {
      const promise = fetch(`/api/stocks?symbol=${symbol}`)
        .then(async (res) => {
          const json: StockPrice | PriceError = await res.json();
          if (!res.ok)
            return { error: (json as PriceError).error || "Failed to fetch" };
          return json as StockPrice;
        })
        .catch((e: Error): PriceError => ({ error: e.message }));
      setPricePromise(promise);
    });
  };

  return (
    <div className="p-8 flex flex-col gap-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold">Stock Price Lookup</h1>
      <div className="flex gap-2">
        <input
          className="border px-2 py-1 flex-1 rounded"
          value={symbolInput}
          onChange={(e) => setSymbolInput(e.target.value)}
          placeholder="Enter symbol e.g. AAPL"
        />
        <button className="border px-4 rounded" onClick={searchPrice}>
          Search
        </button>
      </div>
      {pricePromise && (
        <Suspense fallback={<p>Loading...</p>}>
          <PriceResult promise={pricePromise} />
        </Suspense>
      )}

      <HistorySearch symbolInput={symbolInput} />
    </div>
  );
}

function PriceResult({
  promise,
}: {
  promise: Promise<StockPrice | PriceError>;
}) {
  const result = use(promise);
  if ("error" in result) {
    return <p className="text-red-600">{result.error}</p>;
  }
  const data = result;
  return (
    <div className="border p-4 rounded">
      <p>
        <strong>{data.ticker}</strong>
      </p>
      <p>Price: {data.close}</p>
      <p>
        Date: {data.date} {data.time}
      </p>
    </div>
  );
}
