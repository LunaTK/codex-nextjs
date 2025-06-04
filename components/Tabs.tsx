"use client"

import { cn } from "@/lib/utils"
import React from "react"

export interface TabItem {
  label: string
  value: string
}

interface TabsProps {
  tabs: TabItem[]
  value: string
  onChange: (value: string) => void
  className?: string
}

export default function Tabs({ tabs, value, onChange, className }: TabsProps) {
  return (
    <div className={cn("flex border-b", className)}>
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "px-4 py-2 text-sm -mb-px border-b-2",
            tab.value === value
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
          )}
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
