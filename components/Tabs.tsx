"use client"

import { cn } from '@/lib/utils'

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
    <div className={cn('flex gap-2', className)}>
      {tabs.map(tab => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            'px-3 py-1 rounded border text-sm',
            tab.value === value
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
