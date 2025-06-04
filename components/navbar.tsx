'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Breadcrumb, BreadcrumbItem } from '@/components/ui/breadcrumb'

function buildBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const crumbs: BreadcrumbItem[] = [{ href: '/', label: 'Home' }]
  segments.forEach((seg, idx) => {
    const href = '/' + segments.slice(0, idx + 1).join('/')
    crumbs.push({ href, label: seg.charAt(0).toUpperCase() + seg.slice(1) })
  })
  return crumbs
}

export default function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const items = buildBreadcrumbs(pathname)
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="container mx-auto flex items-center gap-4 p-4">
        <button
          aria-label="Toggle Menu"
          className="md:hidden"
          onClick={() => setOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
        <Breadcrumb items={items} />
      </div>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="relative h-full w-64 bg-background p-6 shadow">
            <button
              className="absolute right-4 top-4"
              onClick={() => setOpen(false)}
              aria-label="Close Menu"
            >
              <X className="h-5 w-5" />
            </button>
            <nav className="mt-8 flex flex-col gap-4 text-sm">
              <Link href="/" onClick={() => setOpen(false)}>
                Home
              </Link>
              <Link href="/stocks" onClick={() => setOpen(false)}>
                Stocks
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
