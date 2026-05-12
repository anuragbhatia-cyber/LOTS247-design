import type { ReactNode } from 'react'
import { useLang } from '@/lib/i18n'

/* ---------------------------------------------------------------- */
/* Inline icons — keep tiny, monoline. Stroke-based for crisp dark.  */
/* ---------------------------------------------------------------- */

function IconLinkedIn() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M4.98 3.5a2.5 2.5 0 11.02 5 2.5 2.5 0 01-.02-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3-.02-2.96-1.8-2.96-1.8 0-2.08 1.4-2.08 2.86V21h-4V9z"
      />
    </svg>
  )
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M18.244 2H21l-6.52 7.45L22 22h-6.59l-5.16-6.74L4.3 22H1.54l6.97-7.97L1.5 2h6.75l4.66 6.16L18.24 2zm-1.16 18h1.83L7.02 4H5.05l12.03 16z"
      />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconYouTube() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
      <path
        fill="currentColor"
        d="M23 12s0-3.6-.46-5.32a2.78 2.78 0 00-1.96-1.96C18.86 4.26 12 4.26 12 4.26s-6.86 0-8.58.46A2.78 2.78 0 001.46 6.68C1 8.4 1 12 1 12s0 3.6.46 5.32c.26.96 1 1.7 1.96 1.96 1.72.46 8.58.46 8.58.46s6.86 0 8.58-.46a2.78 2.78 0 001.96-1.96C23 15.6 23 12 23 12zM9.75 15.27V8.73L15.5 12l-5.75 3.27z"
      />
    </svg>
  )
}

/* ---------------------------------------------------------------- */
/* Footer                                                           */
/* ---------------------------------------------------------------- */

export function Footer() {
  const { t } = useLang()

  const socials: { label: string; href: string; icon: ReactNode }[] = [
    { label: 'LinkedIn',  href: '#', icon: <IconLinkedIn /> },
    { label: 'X',         href: '#', icon: <IconX /> },
    { label: 'Instagram', href: '#', icon: <IconInstagram /> },
    { label: 'YouTube',   href: '#', icon: <IconYouTube /> },
  ]

  return (
    <footer className="bg-stone-900 text-stone-300 pt-12 pb-8 lg:pt-14 lg:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 gap-x-8 lg:gap-x-10">
          {/* Brand */}
          <div className="lg:col-span-5">
            <img src="/lots247-logo-white.png" alt="LOTS247" className="h-10 w-auto" />

            <p className="mt-5 text-sm text-stone-400 leading-relaxed max-w-sm">
              {t.footerTagline}
            </p>

            <p className="mt-5 text-sm font-semibold text-emerald-400">
              {t.corePromise}
            </p>

            {/* Socials */}
            <div className="mt-6 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-stone-700 bg-stone-800/60 text-stone-400 hover:text-emerald-400 hover:border-emerald-500/60 transition-colors"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns — Product, Support */}
          <div className="lg:col-span-7 lg:col-start-6 grid grid-cols-2 gap-x-6 sm:gap-x-8 lg:gap-x-10">
            {/* Product */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.18em] font-bold text-stone-500">
                {t.footerProductCol}
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {t.footerProductLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-stone-300 hover:text-emerald-400 transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-[10px] uppercase tracking-[0.18em] font-bold text-stone-500">
                {t.footerSupportCol}
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a
                    href="https://wa.me/919800000000"
                    className="text-stone-300 hover:text-emerald-400 transition-colors"
                  >
                    +91 98xxx xxxxx
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@lots247.in"
                    className="text-stone-300 hover:text-emerald-400 transition-colors"
                  >
                    support@lots247.in
                  </a>
                </li>
                <li>
                  <a href="#" className="text-stone-300 hover:text-emerald-400 transition-colors">
                    {t.footerTerms}
                  </a>
                </li>
                <li>
                  <a href="#" className="text-stone-300 hover:text-emerald-400 transition-colors">
                    {t.footerPrivacy}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-10 pt-6 border-t border-stone-800 text-center">
          <p className="text-xs text-stone-500">{t.footerCopyright}</p>
        </div>
      </div>
    </footer>
  )
}
