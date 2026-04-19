'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'

const EXAMPLE_PROMPTS = [
  'Why do people keep checking their phone even when there are no new notifications?',
  'My startup has loyal customers but we are not growing. How should I think about this?',
  'I regret selling my house before the price went up. How can I think about this more clearly?',
  'I keep procrastinating even though I know I should start the project. Why?',
]

function AIExplainInner() {
  const searchParams = useSearchParams()
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const model = searchParams.get('model')
    if (model) setInput(`Explain the ${model} mental model and how I can apply it in a real situation.`)
  }, [searchParams])

  async function runAI() {
    if (!input.trim() || loading) return
    setLoading(true)
    setResult('')
    setError('')
    try {
      const res = await fetch('/api/ai-explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ situation: input.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')
      setResult(data.reply)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 pb-20">
      <div className="mb-8">
        <p className="text-[11px] font-semibold tracking-widest uppercase text-neutral-400 mb-2">AI-Powered Analysis</p>
        <h1 className="font-serif text-3xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Explain with mental models</h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md">
          Describe any situation, decision, or behavior. Claude will analyze it through the lens of relevant mental models.
        </p>
      </div>

      <div className="mb-4">
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) runAI() }}
          rows={4}
          placeholder="e.g. I keep procrastinating even though I know I should start the project. Why?"
          className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 outline-none focus:border-neutral-500 resize-none transition-colors"
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-[11px] text-neutral-400">Cmd+Enter to submit</span>
          <button
            onClick={runAI}
            disabled={loading || !input.trim()}
            className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-5 py-2 rounded-full text-sm font-medium hover:opacity-85 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
          >
            {loading ? 'Analyzing...' : 'Analyze with models'}
          </button>
        </div>
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-neutral-400 text-sm py-4">
          <span>Analyzing through mental models</span>
          <span className="flex gap-1">
            {[0, 1, 2].map(i => (
              <span key={i} className="dot-bounce inline-block w-1.5 h-1.5 rounded-full bg-neutral-400" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-xl p-4 text-sm text-red-700 dark:text-red-400 mt-4">
          {error}
        </div>
      )}

      {result && !loading && (
        <div className="bg-white dark:bg-neutral-900 border border-stone-200 dark:border-neutral-800 rounded-2xl p-6 shadow-sm mt-2 animate-fade-in-up">
          <div className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300" dangerouslySetInnerHTML={{ __html: result }} />
        </div>
      )}

      <div className="mt-10 pt-8 border-t border-stone-200 dark:border-neutral-800">
        <p className="text-[11px] font-semibold tracking-widest uppercase text-neutral-400 mb-4">Try these examples</p>
        <div className="flex flex-col gap-2">
          {EXAMPLE_PROMPTS.map(prompt => (
            <button key={prompt} onClick={() => setInput(prompt)}
              className="text-left text-sm px-4 py-3 rounded-xl border border-stone-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 hover:bg-stone-50 dark:hover:bg-neutral-800 hover:text-neutral-700 transition-all">
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function AIExplainPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Suspense fallback={<div className="text-center py-20 text-neutral-400 text-sm">Loading...</div>}>
        <AIExplainInner />
      </Suspense>
    </div>
  )
}
