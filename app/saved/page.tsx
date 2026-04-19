'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import ModelCard from '@/components/ModelCard'
import { MODELS } from '@/lib/models'
import { useProgress } from '@/lib/useProgress'

export default function SavedPage() {
  const { favorites, readList, toggleFav, toggleRead, hydrated } = useProgress()
  const saved = MODELS.filter(m => favorites.has(m.id))

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 pb-20">
        <div className="mb-8">
          <p className="text-[11px] font-semibold tracking-widest uppercase text-neutral-400 mb-2">Your collection</p>
          <h1 className="font-serif text-3xl font-semibold text-neutral-900 dark:text-neutral-100">Saved models</h1>
        </div>

        {!hydrated ? (
          <div className="text-center py-20 text-neutral-400 text-sm">Loading…</div>
        ) : saved.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-4xl mb-4 text-neutral-300 dark:text-neutral-700">♡</div>
            <h3 className="font-serif text-lg font-semibold text-neutral-500 dark:text-neutral-400 mb-2">Nothing saved yet</h3>
            <p className="text-sm text-neutral-400 mb-6">Tap the heart on any model card to save it here.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-5 py-2 rounded-full text-sm font-medium hover:opacity-85 transition-opacity">
              Browse models →
            </Link>
          </div>
        ) : (
          <>
            <p className="text-[11px] font-semibold tracking-widest uppercase text-neutral-400 mb-4">
              {saved.length} saved model{saved.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {saved.map((model, i) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  isFaved={true}
                  isRead={readList.has(model.id)}
                  onToggleFav={toggleFav}
                  onToggleRead={toggleRead}
                  animDelay={i * 40}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
