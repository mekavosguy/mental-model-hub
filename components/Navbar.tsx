'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useProgress } from '@/lib/useProgress'
import { MODELS } from '@/lib/models'

export default function Navbar() {
  const pathname = usePathname()
  const { favorites, readList } = useProgress()
  const pct = Math.round((readList.size / MODELS.length) * 100)

  const navLinks = [
    { href: '/', label: 'Explore' },
    { href: '/progress', label: readList.size > 0 ? `Progress (${pct}%)` : 'Progress' },
    { href: '/ai-explain', label: 'AI Explain' },
    { href: '/saved', label: favorites.size > 0 ? `Saved (${favorites.size})` : 'Saved' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-stone-50/90 dark:bg-neutral-950/90 backdrop-blur border-b border-stone-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="font-serif text-base font-semibold text-neutral-900 dark:text-neutral-100 flex items-center gap-2 shrink-0">
          <span className="text-lg">◈</span>
          <span className="hidden sm:inline">Mental Model Hub</span>
          <span className="sm:hidden">MM Hub</span>
        </Link>
        <div className="flex items-center gap-1 flex-wrap justify-end">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                pathname === link.href
                  ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:border-neutral-100'
                  : 'text-neutral-500 dark:text-neutral-400 border-stone-200 dark:border-neutral-800 hover:bg-stone-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
