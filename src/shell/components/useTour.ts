import { useCallback, useEffect, useState } from 'react'

const STORAGE_PREFIX = 'lots247.tourSeen.'
// Legacy single-tour key. Kept so first-load home tour stays "seen" for existing users.
const LEGACY_KEY = 'lots247.tourSeen'

function storageKey(tourId: string) {
  return `${STORAGE_PREFIX}${tourId}`
}

export function useTour(tourId: string, autoStart: boolean = false) {
  const [isOpen, setIsOpen] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    if (!autoStart) return
    if (typeof window === 'undefined') return
    // Home tour respects the legacy key as well, so existing users aren't re-toured.
    const legacy = tourId === 'home' && window.localStorage.getItem(LEGACY_KEY) === 'true'
    const seen = window.localStorage.getItem(storageKey(tourId))
    if (seen === 'true' || legacy) return
    // Defer one tick so target elements have mounted
    const id = window.setTimeout(() => {
      setIsOpen(true)
      setStepIndex(0)
    }, 400)
    return () => window.clearTimeout(id)
  }, [autoStart, tourId])

  const start = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(storageKey(tourId))
    }
    setStepIndex(0)
    setIsOpen(true)
  }, [tourId])

  const close = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(storageKey(tourId), 'true')
    }
    setIsOpen(false)
  }, [tourId])

  const next = useCallback((totalSteps: number) => {
    setStepIndex((i) => {
      if (i >= totalSteps - 1) {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(storageKey(tourId), 'true')
        }
        setIsOpen(false)
        return 0
      }
      return i + 1
    })
  }, [tourId])

  const back = useCallback(() => {
    setStepIndex((i) => Math.max(0, i - 1))
  }, [])

  return { isOpen, stepIndex, start, close, next, back }
}

/** Clears all per-module tour "seen" flags so every module's tour will replay on next visit. */
export function clearAllToursSeen() {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(LEGACY_KEY)
    const toRemove: string[] = []
    for (let i = 0; i < window.localStorage.length; i += 1) {
      const key = window.localStorage.key(i)
      if (key && key.startsWith(STORAGE_PREFIX)) toRemove.push(key)
    }
    toRemove.forEach((k) => window.localStorage.removeItem(k))
  } catch {
    // ignore
  }
}
