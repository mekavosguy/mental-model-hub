'use client'

import { useState, useEffect, useCallback } from 'react'

function useLocalSet(key: string) {
  const [set, setSet] = useState<Set<string>>(new Set())
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key)
      if (stored) setSet(new Set(JSON.parse(stored)))
    } catch {}
    setHydrated(true)
  }, [key])

  const toggle = useCallback((id: string) => {
    setSet(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      try { localStorage.setItem(key, JSON.stringify([...next])) } catch {}
      return next
    })
  }, [key])

  const add = useCallback((id: string) => {
    setSet(prev => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      try { localStorage.setItem(key, JSON.stringify([...next])) } catch {}
      return next
    })
  }, [key])

  return { set, toggle, add, hydrated }
}

export function useProgress() {
  const favs = useLocalSet('mmh-favs')
  const read = useLocalSet('mmh-read')

  return {
    favorites: favs.set,
    readList: read.set,
    toggleFav: favs.toggle,
    toggleRead: read.toggle,
    markRead: read.add,
    hydrated: favs.hydrated && read.hydrated,
  }
}
