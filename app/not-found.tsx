import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="text-5xl mb-4 text-neutral-300 dark:text-neutral-700">◌</div>
      <h1 className="font-serif text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">Model not found</h1>
      <p className="text-sm text-neutral-400 mb-6">This page does not exist.</p>
      <Link href="/" className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-5 py-2 rounded-full text-sm font-medium hover:opacity-85 transition-opacity">
        Back to all models
      </Link>
    </div>
  )
}
