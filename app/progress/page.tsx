'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { MODELS, CATEGORIES, CAT_COLORS } from '@/lib/models'
import { useProgress } from '@/lib/useProgress'

export default function ProgressPage() {
  const { readList, favorites, toggleRead, hydrated } = useProgress()

  const total = MODELS.length
  const done = readList.size
  const pct = Math.round((done / total) * 100)

  const unread = MODELS.filter(m => !readList.has(m.id))
  const readModels = MODELS.filter(m => readList.has(m.id))

  if (!hydrated) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center text-neutral-400 text-sm">Loading…</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 pb-20">

        <div className="mb-8">
          <p className="text-[11px] font-semibold tracking-widest uppercase text-neutral-400 mb-2">Your learning journey</p>
          <h1 className="font-serif text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-1">Progress tracker</h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Track which mental models you have read and understood.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { num: done, label: 'Models read' },
            { num: total - done, label: 'Left to read' },
            { num: `${pct}%`, label: 'Complete' },
            { num: favorites.size, label: 'Saved models' },
          ].map(s => (
            <div key={s.label} className="bg-stone-100 dark:bg-neutral-900 rounded-xl p-4 text-center">
              <div className="font-serif text-2xl font-semibold text-neutral-900 dark:text-neutral-100">{s.num}</div>
              <div className="text-[11px] text-neutral-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Overall bar */}
        <div className="bg-white dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 rounded-2xl p-5 mb-6 shadow-sm">
          <div className="flex justify-between text-xs text-neutral-500 mb-2">
            <span>Overall progress</span>
            <span>{done}/{total}</span>
          </div>
          <div className="h-2.5 bg-stone-100 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-green-600 dark:bg-green-500 rounded-full progress-bar-fill" style={{ width: `${pct}%` }} />
          </div>
          {done === total && (
            <p className="text-xs text-green-700 dark:text-green-400 font-medium mt-3 text-center">
              ✓ You have read all {total} mental models. Excellent work.
            </p>
          )}
        </div>

        {/* By category */}
        <div className="bg-white dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 rounded-2xl p-5 mb-8 shadow-sm">
          <p className="text-xs font-semibold text-neutral-500 mb-4">By category</p>
          <div className="flex flex-col gap-4">
            {CATEGORIES.map(cat => {
              const catModels = MODELS.filter(m => m.cat === cat)
              const catDone = catModels.filter(m => readList.has(m.id)).length
              const cpct = Math.round((catDone / catModels.length) * 100)
              const colors = CAT_COLORS[cat]
              return (
                <div key={cat}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text}`}>{cat}</span>
                    <span className="text-[11px] text-neutral-400">{catDone}/{catModels.length}</span>
                  </div>
                  <div className="h-1.5 bg-stone-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full rounded-full progress-bar-fill" style={{ width: `${cpct}%`, background: catDone === catModels.length ? '#16a34a' : '#9CA3AF' }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Model list */}
        {unread.length > 0 && (
          <div className="mb-6">
            <p className="text-xs font-semibold text-neutral-500 mb-3">Up next — {unread.length} remaining</p>
            <div className="bg-white dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 rounded-2xl shadow-sm divide-y divide-stone-100 dark:divide-neutral-800">
              {unread.map(m => {
                const colors = CAT_COLORS[m.cat]
                return (
                  <div key={m.id} className="flex items-center gap-3 px-4 py-3 hover:bg-stone-50 dark:hover:bg-neutral-800/50 transition-colors">
                    <span className="w-2.5 h-2.5 rounded-full bg-stone-300 dark:bg-neutral-600 shrink-0" />
                    <Link href={`/model/${m.id}`} className="flex-1 text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors">{m.name}</Link>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} hidden sm:inline`}>{m.cat}</span>
                    <button
                      onClick={() => toggleRead(m.id)}
                      className="text-[11px] text-neutral-400 hover:text-green-600 dark:hover:text-green-400 transition-colors ml-2"
                    >
                      Mark read
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {readModels.length > 0 && (
          <div>
            <p className="text-xs font-semibold text-neutral-500 mb-3">Completed — {readModels.length}</p>
            <div className="bg-white dark:bg-neutral-900 border border-green-200 dark:border-green-900 rounded-2xl shadow-sm divide-y divide-stone-100 dark:divide-neutral-800">
              {readModels.map(m => {
                const colors = CAT_COLORS[m.cat]
                return (
                  <div key={m.id} className="flex items-center gap-3 px-4 py-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
                    <Link href={`/model/${m.id}`} className="flex-1 text-sm text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors">{m.name}</Link>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} hidden sm:inline`}>{m.cat}</span>
                    <span className="text-[11px] text-green-600 dark:text-green-400 font-medium ml-2">✓ Read</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
