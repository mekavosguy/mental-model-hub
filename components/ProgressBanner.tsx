'use client'

import { MODELS, CATEGORIES, CAT_COLORS } from '@/lib/models'

interface Props {
  readList: Set<string>
}

export default function ProgressBanner({ readList }: Props) {
  if (readList.size === 0) return null

  const total = MODELS.length
  const done = readList.size
  const pct = Math.round((done / total) * 100)

  return (
    <div className="bg-white dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 rounded-2xl p-4 mb-6 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">Your progress</span>
        <span className="text-xs text-neutral-400 dark:text-neutral-500">{done} of {total} models read</span>
      </div>
      <div className="h-2 bg-stone-100 dark:bg-neutral-800 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-green-600 dark:bg-green-500 rounded-full progress-bar-fill"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="flex flex-wrap gap-3">
        {CATEGORIES.map(cat => {
          const catModels = MODELS.filter(m => m.cat === cat)
          const catDone = catModels.filter(m => readList.has(m.id)).length
          const colors = CAT_COLORS[cat]
          return (
            <span key={cat} className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>
              {cat}: {catDone}/{catModels.length}
            </span>
          )
        })}
      </div>
    </div>
  )
}
