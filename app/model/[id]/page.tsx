'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import ModelDiagram from '@/components/ModelDiagram'
import { MODELS, CAT_COLORS } from '@/lib/models'
import { useProgress } from '@/lib/useProgress'
import { useEffect } from 'react'

interface Props {
  params: Promise<{ id: string }>
}

const sectionLabel = (letter: string, bg: string, text: string, label: string, labelColor: string) => (
  <div className="flex items-center gap-2 mb-3">
    <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${bg} ${text}`}>{letter}</span>
    <span className={`text-[11px] font-semibold tracking-widest uppercase ${labelColor}`}>{label}</span>
  </div>
)

export default function ModelPage({ params }: Props) {
  const { id } = use(params)
  const model = MODELS.find(m => m.id === id)
  if (!model) notFound()

  const { favorites, readList, toggleFav, toggleRead, markRead, hydrated } = useProgress()
  const isFaved = hydrated && favorites.has(model.id)
  const isRead = hydrated && readList.has(model.id)
  const colors = CAT_COLORS[model.cat]

  // auto-mark as read on open
  useEffect(() => { markRead(model.id) }, [model.id, markRead])

  const exampleBorder: Record<string, string> = {
    business: 'border-l-green-500',
    life: 'border-l-purple-400',
    decision: 'border-l-red-400',
  }
  const exampleTag: Record<string, string> = {
    business: 'text-green-700 dark:text-green-400',
    life: 'text-purple-700 dark:text-purple-400',
    decision: 'text-red-700 dark:text-red-400',
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-20">

        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300 mb-8 transition-colors">
          ← Back to models
        </Link>

        {/* Header */}
        <div className="mb-10 pb-8 border-b border-stone-200 dark:border-neutral-800">
          <div className={`inline-block text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-4 ${colors.bg} ${colors.text}`}>
            {model.cat}
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold leading-tight mb-3 text-neutral-900 dark:text-neutral-100">
            {model.name}
          </h1>
          <p className="text-base text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xl">
            {model.tagline}
          </p>
          <div className="flex items-center gap-2 mt-5 flex-wrap">
            <button
              onClick={() => toggleRead(model.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                isRead
                  ? 'border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400'
                  : 'border-stone-200 dark:border-neutral-700 bg-stone-50 dark:bg-neutral-900 text-neutral-500 hover:bg-stone-100 dark:hover:bg-neutral-800'
              }`}
            >
              {isRead ? '✓ Marked as read' : '○ Mark as read'}
            </button>
            <button
              onClick={() => toggleFav(model.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                isFaved
                  ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400'
                  : 'border-stone-200 dark:border-neutral-700 bg-stone-50 dark:bg-neutral-900 text-neutral-500 hover:bg-stone-100 dark:hover:bg-neutral-800'
              }`}
            >
              {isFaved ? '♥ Saved' : '♡ Save model'}
            </button>
            <Link
              href={`/ai-explain?model=${encodeURIComponent(model.name)}`}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium border border-stone-200 dark:border-neutral-700 bg-stone-50 dark:bg-neutral-900 text-neutral-500 hover:bg-stone-100 dark:hover:bg-neutral-800 transition-all"
            >
              Ask AI about this ↗
            </Link>
          </div>
        </div>

        {/* Sections */}
        <div className="flex flex-col gap-5">

          {/* WHAT */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-stone-200 dark:border-neutral-800 p-6 shadow-sm">
            {sectionLabel('W', 'bg-purple-100 dark:bg-purple-950', 'text-purple-700 dark:text-purple-300', 'What it is', 'text-purple-700 dark:text-purple-400')}
            <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{model.what}</p>
          </div>

          {/* WHY */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-stone-200 dark:border-neutral-800 p-6 shadow-sm">
            {sectionLabel('W', 'bg-amber-100 dark:bg-amber-950', 'text-amber-700 dark:text-amber-300', 'Why it happens', 'text-amber-700 dark:text-amber-400')}
            <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{model.why}</p>
          </div>

          {/* HOW */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-stone-200 dark:border-neutral-800 p-6 shadow-sm">
            {sectionLabel('H', 'bg-green-100 dark:bg-green-950', 'text-green-700 dark:text-green-300', 'How it plays out', 'text-green-700 dark:text-green-400')}
            <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{model.how}</p>
          </div>

          {/* EXAMPLES */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-stone-200 dark:border-neutral-800 p-6 shadow-sm">
            {sectionLabel('E', 'bg-stone-100 dark:bg-neutral-800', 'text-stone-600 dark:text-neutral-400', 'Real-world examples', 'text-neutral-500 dark:text-neutral-400')}
            <div className="flex flex-col gap-3">
              {model.examples.map((ex, i) => (
                <div key={i} className={`pl-4 border-l-2 ${exampleBorder[ex.type] ?? 'border-l-stone-300'}`}>
                  <div className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${exampleTag[ex.type] ?? 'text-neutral-400'}`}>
                    {ex.tag}
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">{ex.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* APPLICATION */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-stone-200 dark:border-neutral-800 p-6 shadow-sm">
            {sectionLabel('A', 'bg-green-100 dark:bg-green-950', 'text-green-700 dark:text-green-300', 'How to apply it', 'text-green-700 dark:text-green-400')}
            <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{model.application}</p>
          </div>

          {/* FAILURE */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-stone-200 dark:border-neutral-800 p-6 shadow-sm">
            {sectionLabel('!', 'bg-red-100 dark:bg-red-950', 'text-red-700 dark:text-red-300', 'When it fails', 'text-red-600 dark:text-red-400')}
            <div className="bg-red-50 dark:bg-red-950/60 rounded-xl p-4">
              <p className="text-sm leading-relaxed text-red-800 dark:text-red-300">{model.failure}</p>
            </div>
          </div>

          {/* VISUAL */}
          <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-stone-200 dark:border-neutral-800 p-6 shadow-sm">
            {sectionLabel('◈', 'bg-stone-100 dark:bg-neutral-800', 'text-stone-500 dark:text-neutral-400', 'Visual overview', 'text-neutral-500 dark:text-neutral-400')}
            <div className="bg-stone-50 dark:bg-neutral-800/50 rounded-xl p-4 overflow-x-auto">
              <ModelDiagram model={model} />
            </div>
          </div>

        </div>

        {/* Nav to other models */}
        <div className="mt-10 pt-8 border-t border-stone-200 dark:border-neutral-800">
          <p className="text-[11px] font-semibold tracking-widest uppercase text-neutral-400 mb-4">More models</p>
          <div className="flex gap-2 flex-wrap">
            {MODELS.filter(m => m.id !== model.id).slice(0, 5).map(m => (
              <Link
                key={m.id}
                href={`/model/${m.id}`}
                className="text-xs px-3 py-1.5 border border-stone-200 dark:border-neutral-700 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-stone-100 dark:hover:bg-neutral-800 transition-colors"
              >
                {m.name}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
