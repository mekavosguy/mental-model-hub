'use client'

import Link from 'next/link'
import { MentalModel, CAT_COLORS } from '@/lib/models'

interface Props {
  model: MentalModel
  isFaved: boolean
  isRead: boolean
  onToggleFav: (id: string) => void
  onToggleRead: (id: string) => void
  animDelay?: number
}

export default function ModelCard({ model, isFaved, isRead, onToggleFav, onToggleRead, animDelay = 0 }: Props) {
  const colors = CAT_COLORS[model.cat]

  return (
    <div
      className={`animate-fade-in-up bg-white dark:bg-neutral-900 rounded-2xl border transition-all hover:-translate-y-0.5 hover:shadow-lg relative overflow-hidden ${
        isRead
          ? 'border-green-300 dark:border-green-700 border-[1.5px]'
          : 'border-stone-200 dark:border-neutral-800 shadow-sm'
      }`}
      style={{ animationDelay: `${animDelay}ms` }}
    >
      {model.featured && (
        <div className="absolute top-3 right-3 text-[10px] font-medium bg-stone-100 dark:bg-neutral-800 text-stone-400 dark:text-neutral-500 px-2 py-0.5 rounded-full">
          Featured
        </div>
      )}

      <Link href={`/model/${model.id}`} className="block p-5 pb-0">
        <div className={`inline-block text-[10px] font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full mb-3 ${colors.bg} ${colors.text}`}>
          {model.cat}
        </div>
        <h3 className="font-serif text-base font-semibold text-neutral-900 dark:text-neutral-100 mb-2 leading-snug pr-8">
          {model.name}
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
          {model.what}
        </p>
      </Link>

      <div className="flex items-center justify-between px-5 py-3 mt-3 border-t border-stone-100 dark:border-neutral-800">
        {isRead ? (
          <span className="text-[11px] font-semibold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950 px-2 py-0.5 rounded-full">
            ✓ Read
          </span>
        ) : (
          <Link href={`/model/${model.id}`} className="text-[11px] text-stone-400 dark:text-neutral-600 font-medium hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors">
            Read model →
          </Link>
        )}
        <div className="flex items-center gap-1.5">
          <button
            onClick={(e) => { e.preventDefault(); onToggleRead(model.id) }}
            title={isRead ? 'Mark as unread' : 'Mark as read'}
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
              isRead
                ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                : 'bg-stone-100 dark:bg-neutral-800 text-stone-400 dark:text-neutral-500 hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-700 dark:hover:text-green-300'
            }`}
          >
            {isRead ? '✓' : '○'}
          </button>
          <button
            onClick={(e) => { e.preventDefault(); onToggleFav(model.id) }}
            title={isFaved ? 'Unsave' : 'Save model'}
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs transition-all ${
              isFaved
                ? 'bg-red-100 dark:bg-red-900/40 text-red-500 dark:text-red-400'
                : 'bg-stone-100 dark:bg-neutral-800 text-stone-400 dark:text-neutral-500 hover:bg-red-100 dark:hover:bg-red-900/40 hover:text-red-500'
            }`}
          >
            {isFaved ? '♥' : '♡'}
          </button>
        </div>
      </div>
    </div>
  )
}
