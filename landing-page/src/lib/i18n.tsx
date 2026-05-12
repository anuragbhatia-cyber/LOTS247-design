import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { copy, type Lang, type Copy } from './copy'

interface LangContextValue {
  lang: Lang
  setLang: (lang: Lang) => void
  t: Copy
}

const LangContext = createContext<LangContextValue | null>(null)

const STORAGE_KEY = 'lots247-lang'

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en'
    const stored = window.localStorage.getItem(STORAGE_KEY)
    return stored === 'hi' ? 'hi' : 'en'
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang === 'hi' ? 'hi' : 'en'
  }, [lang])

  const value: LangContextValue = {
    lang,
    setLang: setLangState,
    t: copy[lang],
  }

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
