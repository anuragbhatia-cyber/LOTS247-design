import { useEffect } from 'react'

export function ThemeToggle() {
  // Force light mode only
  useEffect(() => {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }, [])

  return null
}
