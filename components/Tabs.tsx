"use client"

import { cn } from '@/lib/utils'

export interface TabItem<T = string> {
  label: string
  value: T
}

interface TabsProps<T = string> {
  tabs: TabItem<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
}

export default function Tabs<T = string>({
  tabs,
  value,
  onChange,
  className,
}: TabsProps<T>) {
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
