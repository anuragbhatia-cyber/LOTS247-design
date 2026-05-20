import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'lots247.tourSeen'

export function useTour(autoStart: boolean = false) {
  const [isOpen, setIsOpen] = useState(false)
  const [stepIndex, setStepIndex] = useState(0)

  useEffect(() => {
    if (!autoStart) return
    if (typeof window === 'undefined') return
    const seen = window.localStorage.getItem(STORAGE_KEY)
    if (seen === 'true') return
    // Defer one tick so target elements have mounted
    const id = window.setTimeout(() => {
      setIsOpen(true)
      setStepIndex(0)
    }, 400)
    return () => window.clearTimeout(id)
  }, [autoStart])

  const start = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(STORAGE_KEY)
    }
    setStepIndex(0)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, 'true')
    }
    setIsOpen(false)
  }, [])

  const next = useCallback((totalSteps: number) => {
    setStepIndex((i) => {
      if (i >= totalSteps - 1) {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(STORAGE_KEY, 'true')
        }
        setIsOpen(false)
        return 0
      }
      return i + 1
    })
  }, [])

  const back = useCallback(() => {
    setStepIndex((i) => Math.max(0, i - 1))
  }, [])

  return { isOpen, stepIndex, start, close, next, back }
}
