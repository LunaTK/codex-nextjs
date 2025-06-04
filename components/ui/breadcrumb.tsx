import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface BreadcrumbItem {
  href: string
  label: string
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  if (!items?.length) return null
  return (
    <nav aria-label="breadcrumb" className="text-sm flex items-center">
      {items.map((item, idx) => (
        <span key={item.href} className="inline-flex items-center">
          <Link
            href={item.href}
            className={cn(
              "transition-colors hover:text-primary",
              idx === items.length - 1 && "font-medium text-foreground"
            )}
          >
            {item.label}
          </Link>
          {idx < items.length - 1 && <span className="px-2">/</span>}
        </span>
      ))}
    </nav>
  )
}
