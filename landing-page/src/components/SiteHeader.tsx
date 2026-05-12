import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/lib/i18n'
import { cn } from '@/lib/utils'

const PHONE_TEL = '+919999999999'
const PHONE_WA = 'https://wa.me/919999999999'
const LANG_STORAGE_KEY = 'lots247-lang'

export function SiteHeader() {
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [nudgeLang, setNudgeLang] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const didAutoDetect = useRef(false)
  const langRef = useRef<HTMLDivElement | null>(null)

  // Auto-detect hi from navigator.language on first visit (no stored pref)
  useEffect(() => {
    if (didAutoDetect.current) return
    didAutoDetect.current = true
    try {
      const stored = window.localStorage.getItem(LANG_STORAGE_KEY)
      if (!stored) {
        const nav = (navigator.language || '').toLowerCase()
        if (nav.startsWith('hi') && lang !== 'hi') setLang('hi')
      }
    } catch {
      /* localStorage may be unavailable */
    }
    // Pulse the toggle for ~2.4s on first paint
    setNudgeLang(true)
    const t1 = window.setTimeout(() => setNudgeLang(false), 2600)
    return () => window.clearTimeout(t1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Scroll listener: track scrolled state for header background
  useEffect(() => {
    const compute = () => {
      setScrolled(window.scrollY > 8)
    }
    compute()
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        compute()
        frame = 0
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', compute)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', compute)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [mobileOpen])

  // Close language dropdown on outside click or Escape
  useEffect(() => {
    if (!langOpen) return
    const onClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLangOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [langOpen])

  const scrollToId = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMobileOpen(false)
  }

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300',
          scrolled
            ? 'bg-black shadow-sm shadow-black/30'
            : 'bg-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <a
              href="#hero"
              className="flex items-center gap-2 shrink-0"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('hero')
              }}
            >
              <img
                src="/lots247-logo-white.png"
                alt="LOTS247"
                className="h-9 lg:h-10 w-auto"
              />
            </a>

            {/* Center nav — Home + Pricing + FAQ */}
            <nav className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToId('hero')}
                className="text-sm font-medium text-stone-100 hover:text-white transition-colors cursor-pointer"
              >
                {t.navHome}
              </button>
              <button
                onClick={() => scrollToId('pricing')}
                className="text-sm font-medium text-stone-100 hover:text-white transition-colors cursor-pointer"
              >
                {t.navPricing}
              </button>
              <button
                onClick={() => scrollToId('faq')}
                className="text-sm font-medium text-stone-100 hover:text-white transition-colors cursor-pointer"
              >
                {t.navFAQ}
              </button>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Language dropdown */}
              <div ref={langRef} className="relative">
                <button
                  type="button"
                  onClick={() => setLangOpen((v) => !v)}
                  aria-haspopup="listbox"
                  aria-expanded={langOpen}
                  aria-label="Select language"
                  className={cn(
                    'inline-flex items-center gap-1.5 h-8 px-3 rounded-full text-[11px] font-semibold border transition-colors cursor-pointer bg-white/10 border-white/25 text-white hover:bg-white/20 backdrop-blur-sm',
                    nudgeLang && 'animate-lang-nudge',
                  )}
                >
                  <span>{lang === 'en' ? 'EN' : 'हिं'}</span>
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn('transition-transform duration-200', langOpen && 'rotate-180')}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {langOpen && (
                  <ul
                    role="listbox"
                    className="absolute right-0 top-full mt-2 w-32 rounded-xl bg-white border border-stone-200 shadow-lg shadow-stone-300/40 overflow-hidden py-1 z-50 animate-fade-in"
                  >
                    <li>
                      <button
                        role="option"
                        aria-selected={lang === 'en'}
                        onClick={() => {
                          setLang('en')
                          setLangOpen(false)
                        }}
                        className={cn(
                          'w-full text-left px-3 py-2 text-sm font-medium transition-colors flex items-center justify-between',
                          lang === 'en'
                            ? 'bg-stone-100 text-stone-900'
                            : 'text-stone-700 hover:bg-stone-50',
                        )}
                      >
                        <span>English</span>
                        {lang === 'en' && <CheckIcon />}
                      </button>
                    </li>
                    <li>
                      <button
                        role="option"
                        aria-selected={lang === 'hi'}
                        onClick={() => {
                          setLang('hi')
                          setLangOpen(false)
                        }}
                        className={cn(
                          'w-full text-left px-3 py-2 text-sm font-medium transition-colors flex items-center justify-between',
                          lang === 'hi'
                            ? 'bg-stone-100 text-stone-900'
                            : 'text-stone-700 hover:bg-stone-50',
                        )}
                      >
                        <span>हिंदी</span>
                        {lang === 'hi' && <CheckIcon />}
                      </button>
                    </li>
                  </ul>
                )}
              </div>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors text-white hover:bg-white/15"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </header>

      {/* Mobile fullscreen drawer — language top, nav middle, CTA pinned bottom */}
      <div
        className={cn(
          'md:hidden fixed inset-0 z-[60] bg-white transition-all duration-300',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="flex flex-col h-full">
          {/* Drawer header */}
          <div className="flex items-center justify-between h-14 px-4 border-b border-stone-200 shrink-0">
            <img src="/lots247-logo.png" alt="LOTS247" className="h-8 w-auto" />
            <button
              onClick={() => setMobileOpen(false)}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Close menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Scrollable body */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
            {/* Big language toggle */}
            <div>
              <div className="text-xs uppercase tracking-wider text-stone-500 font-mono mb-2">
                {t.navMenuLanguageLabel}
              </div>
              <div className="inline-flex items-center rounded-full bg-stone-100 border border-stone-200 p-1 w-full max-w-xs">
                <button
                  onClick={() => setLang('en')}
                  className={cn(
                    'flex-1 px-4 h-10 text-sm font-semibold rounded-full transition-all cursor-pointer',
                    lang === 'en' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500',
                  )}
                >
                  English
                </button>
                <button
                  onClick={() => setLang('hi')}
                  className={cn(
                    'flex-1 px-4 h-10 text-sm font-semibold rounded-full transition-all cursor-pointer',
                    lang === 'hi' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500',
                  )}
                >
                  हिंदी
                </button>
              </div>
            </div>

            {/* Nav links */}
            <nav className="space-y-1">
              <DrawerLink onClick={() => scrollToId('pricing')} label={t.navPricing} />
              <DrawerLink onClick={() => scrollToId('faq')} label={t.navFAQ} />
              <DrawerLink onClick={() => scrollToId('what-you-get')} label={t.navFeatures} />
            </nav>

            {/* Call affordance inside drawer */}
            <a
              href={`tel:${PHONE_TEL}`}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-emerald-200 bg-emerald-50 text-emerald-800"
            >
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-emerald-500 text-white">
                <PhoneIcon />
              </span>
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{t.navCallLabel}</span>
                <span className="text-xs text-emerald-700/80">{PHONE_TEL}</span>
              </div>
            </a>
          </div>

          {/* Pinned CTA */}
          <div className="border-t border-stone-200 px-5 py-4 shrink-0 bg-white">
            <button
              onClick={() => scrollToId('hero')}
              className="inline-flex w-full items-center justify-center gap-2 px-4 py-3 rounded-full text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-400 transition-colors group cursor-pointer shadow-md shadow-emerald-500/30"
            >
              <span>{t.navPrimaryCTA}</span>
              <span className="transition-transform duration-200 group-hover:translate-x-0.5">
                <ArrowIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

function DrawerLink({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between w-full px-4 py-3 rounded-2xl text-base font-medium text-stone-800 hover:bg-stone-50 transition-colors"
    >
      <span>{label}</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-400">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  )
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
