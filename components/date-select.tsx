import React from 'react'

interface DateSelectProps {
  from: string
  to: string
  unit: string
  setFrom: (v: string) => void
  setTo: (v: string) => void
  setUnit: (v: string) => void
}

export default function DateSelect({ from, to, unit, setFrom, setTo, setUnit }: DateSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <label className="flex flex-col flex-1">
          <span className="text-sm">From</span>
          <input
            type="datetime-local"
            value={from}
            onChange={e => setFrom(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </label>
        <label className="flex flex-col flex-1">
          <span className="text-sm">To</span>
          <input
            type="datetime-local"
            value={to}
            onChange={e => setTo(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </label>
      </div>
      <label className="flex flex-col w-32">
        <span className="text-sm">Interval</span>
        <select
          value={unit}
          onChange={e => setUnit(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="5min">5 min</option>
          <option value="1hour">1 hour</option>
          <option value="day">1 day</option>
        </select>
      </label>
    </div>
  )
}
