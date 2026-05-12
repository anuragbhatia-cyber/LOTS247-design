import { useEffect, useState } from 'react'

export interface OtpExpiryState {
  remainingMs: number
  isExpired: boolean
  /** Pre-formatted "M:SS" string; empty if no timer */
  display: string
  /** True in the last 30 seconds before expiry — for warning color */
  isLowTime: boolean
}

/**
 * Tick once a second so the visible timer stays current.
 * Uses a wall-clock timestamp (not interval count) so a backgrounded tab catches
 * up correctly when refocused — the next render computes from real elapsed time.
 */
export function useOtpExpiry(expiresAt: number | null): OtpExpiryState {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (!expiresAt) return
    setNow(Date.now())
    const interval = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [expiresAt])

  if (!expiresAt) {
    return { remainingMs: 0, isExpired: false, display: '', isLowTime: false }
  }

  const remainingMs = Math.max(0, expiresAt - now)
  const totalSeconds = Math.floor(remainingMs / 1000)
  const mins = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  return {
    remainingMs,
    isExpired: remainingMs === 0,
    display: `${mins}:${secs.toString().padStart(2, '0')}`,
    isLowTime: remainingMs > 0 && remainingMs <= 30_000,
  }
}
