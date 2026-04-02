import { createContext, useContext, useState, type ReactNode } from 'react'

export type Language = 'en' | 'hi'

function getInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    const lang = params.get('lang')
    if (lang === 'hi') return 'hi'
  }
  return 'en'
}

interface LanguageContextValue {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (ctx) return ctx
  // Fallback for components rendered outside a LanguageProvider (e.g. in iframes)
  // Read from URL param — language switching reloads the iframe with the new param
  return { language: getInitialLanguage(), setLanguage: () => {} }
}
