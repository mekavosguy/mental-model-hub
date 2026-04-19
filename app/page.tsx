'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import ModelCard from '@/components/ModelCard'
import ProgressBanner from '@/components/ProgressBanner'
import { MODELS, CATEGORIES, Category } from '@/lib/models'
import { useProgress } from '@/lib/useProgress'
import Link from 'next/link'

export default function HomePage() {
  const [search, setSearch] = useState('')
  const [activeCat, setActiveCat] = useState<Category | 'all'>('all')
  const { favorites, readList, toggleFav, toggleRead, hydrated } = useProgress()

  const filtered = MODELS.filter(m => {
    const matchCat = activeCat === 'all' || m.cat === activeCat
    const q = search.toLowerCase()
    const matchSearch = !q || m.name.toLowerCase().includes(q) || m.cat.toLowerCase().includes(q) || m.tagline.toLowerCase().includes(q) || m.what.toLowerCase().includes(q)
    return matchCat && matchSearch
  })

  const catBtnClass = (cat: Category | 'all') => {
    const base = 'px-4 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer'
    if (cat === activeCat) return `${base} bg-neutral-900 text-white border-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:border-neutral-100`
    return `${base} text-neutral-500 dark:text-neutral-400 border-stone-200 dark:border-neutral-700 hover:bg-stone-100 dark:hover:bg-neutral-800`
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-10 text-center">
        <div className="inline-flex items-center gap-2 bg-stone-100 dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-widest uppercase text-neutral-400 mb-6">
          ◈ {MODELS.length} mental models
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-semibold leading-tight mb-4 text-neutral-900 dark:text-neutral-100">
          Think clearly.<br />
          <em className="text-neutral-400 dark:text-neutral-500">Decide better.</em>
        </h1>
        <p className="text-neutral-500 dark:text-neutral-400 text-base max-w-md mx-auto mb-8 leading-relaxed">
          Mental models explain what is happening, why it happens, and how it plays out — so you can reason more effectively.
        </p>
        <div className="relative max-w-lg mx-auto">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">⌕</span>
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setActiveCat('all') }}
            placeholder="Search models, e.g. 'confirmation bias'…"
            className="w-full pl-10 pr-4 py-3 rounded-full border border-stone-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 outline-none focus:border-neutral-500 shadow-sm transition-colors"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        {hydrated && <ProgressBanner readList={readList} />}
        <div className="flex gap-2 flex-wrap mb-6">
          <button className={catBtnClass('all')} onClick={() => { setActiveCat('all'); setSearch('') }}>All models</button>
          {CATEGORIES.map(cat => (
            <button key={cat} className={catBtnClass(cat)} onClick={() => { setActiveCat(cat); setSearch('') }}>{cat}</button>
          ))}
        </div>
        <p className="text-[11px] font-semibold tracking-widest uppercase text-neutral-400 dark:text-neutral-600 mb-4">
          {search ? `${filtered.length} result${filtered.length !== 1 ? 's' : ''}` : activeCat === 'all' ? 'All models' : `${activeCat} models`}
        </p>
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-neutral-400">
            <div className="text-3xl mb-3">◌</div>
            <p className="text-sm">No models found. Try a different search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((model, i) => (
              <ModelCard
                key={model.id}
                model={model}
                isFaved={hydrated && favorites.has(model.id)}
                isRead={hydrated && readList.has(model.id)}
                onToggleFav={toggleFav}
                onToggleRead={toggleRead}
                animDelay={i * 40}
              />
            ))}
          </div>
        )}
        <div className="mt-16 bg-stone-100 dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 rounded-2xl p-8 text-center">
          <h2 className="font-serif text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-100">Explain any situation with mental models</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-5 max-w-sm mx-auto">Describe a decision, behavior, or problem — Claude will analyze it through the lens of relevant models.</p>
          <Link href="/ai-explain" className="inline-flex items-center gap-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-85 transition-opacity">
            Try AI Explain ↗
          </Link>
        </div>
      </div>
    </div>
  )
}
