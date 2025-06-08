"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateSelectProps {
  from: string;
  to: string;
  unit: string;
  setFrom: (v: string) => void;
  setTo: (v: string) => void;
  setUnit: (v: string) => void;
}

export default function DateSelect({
  from,
  to,
  unit,
  setFrom,
  setTo,
  setUnit,
}: DateSelectProps) {
  const [openFrom, setOpenFrom] = React.useState(false)
  const [openTo, setOpenTo] = React.useState(false)

  const fromDate = from ? new Date(from) : undefined
  const toDate = to ? new Date(to) : undefined

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="flex flex-1 flex-col gap-1">
          <Label htmlFor="from" className="px-1 text-sm">
            From
          </Label>
          <Popover open={openFrom} onOpenChange={setOpenFrom}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="from"
                className="justify-between font-normal"
              >
                {fromDate ? fromDate.toLocaleDateString() : "Select date"}
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                selected={fromDate}
                captionLayout="dropdown"
                onSelect={(date) => {
                  if (date) {
                    const d = new Date(date)
                    d.setUTCHours(0, 0, 0, 0)
                    setFrom(d.toISOString())
                  }
                  setOpenFrom(false)
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-1 flex-col gap-1">
          <Label htmlFor="to" className="px-1 text-sm">
            To
          </Label>
          <Popover open={openTo} onOpenChange={setOpenTo}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="to"
                className="justify-between font-normal"
              >
                {toDate ? toDate.toLocaleDateString() : "Select date"}
                <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
              <Calendar
                mode="single"
                selected={toDate}
                captionLayout="dropdown"
                onSelect={(date) => {
                  if (date) {
                    const d = new Date(date)
                    d.setUTCHours(23, 59, 59, 999)
                    setTo(d.toISOString())
                  }
                  setOpenTo(false)
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <label className="flex w-32 flex-col">
        <span className="text-sm">Interval</span>
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="border px-2 py-1 rounded"
        >
          <option value="5min">5 min</option>
          <option value="1hour">1 hour</option>
          <option value="day">1 day</option>
        </select>
      </label>
    </div>
  );
}
