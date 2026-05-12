import { useState } from 'react'
import { useLang } from '@/lib/i18n'
import { SectionHeading } from '@/components/SectionHeading'
import { cn } from '@/lib/utils'

type FeedbackVote = 'up' | 'down'

export function FAQ() {
  const { t } = useLang()
  const [openIdx, setOpenIdx] = useState<number | null>(0)
  const [votes, setVotes] = useState<Record<number, FeedbackVote>>({})

  const categoryLabel = (key: string) => {
    if (key === 'about') return t.faqCategoryAbout
    if (key === 'plan') return t.faqCategoryPlan
    return t.faqCategoryHow
  }

  // Compute the index of the first FAQ in each category for label rendering
  const firstInCategory = new Map<string, number>()
  t.faqs.forEach((faq, i) => {
    if (!firstInCategory.has(faq.category)) firstInCategory.set(faq.category, i)
  })

  return (
    <section id="faq" className="bg-white py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* LEFT: heading + support card */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <SectionHeading
                eyebrow={t.faqEyebrow}
                title={t.faqHeadline}
                align="left"
              />

              {/* Support card — dark, visually distinct */}
              <div className="mt-10 rounded-2xl bg-stone-900 text-white p-7 sm:p-8 relative overflow-hidden">
                {/* Subtle emerald beacon dot */}
                <div className="absolute top-7 right-7 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] font-bold text-emerald-400">
                  <span className="relative inline-flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 animate-soft-pulse" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  Live
                </div>

                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30">
                  {/* WhatsApp-style chat icon */}
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </div>

                <div className="mt-5 text-[11px] uppercase tracking-[0.2em] font-bold text-emerald-400">
                  {t.faqSupportEyebrow}
                </div>
                <h3 className="mt-2 text-2xl sm:text-[1.7rem] font-bold tracking-tight leading-tight">
                  {t.faqSupportHeadline}
                </h3>
                <p className="mt-3 text-sm text-stone-300 leading-relaxed">
                  {t.faqSupportSub}
                </p>

                {/* CTAs */}
                <div className="mt-6 flex flex-col sm:flex-row gap-2.5">
                  <a
                    href="https://wa.me/919800000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 hover:bg-emerald-400 transition-colors text-stone-900 font-semibold text-sm px-5 py-3"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                    </svg>
                    {t.faqSupportWhatsapp}
                  </a>
                  <a
                    href="tel:+919800000000"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-white/5 hover:bg-white/10 ring-1 ring-white/15 transition-colors text-white font-semibold text-sm px-5 py-3"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    {t.faqSupportCall}
                  </a>
                </div>

                <div className="mt-5 pt-5 border-t border-white/10 flex items-center gap-2 text-xs text-stone-400 font-mono">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  {t.faqSupportHours}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: accordion */}
          <div className="lg:col-span-7">
            <div className="space-y-2.5">
              {t.faqs.map((faq, i) => {
                const open = openIdx === i
                const isFirstInCat = firstInCategory.get(faq.category) === i
                const number = String(i + 1).padStart(2, '0')
                const vote = votes[i]

                return (
                  <div key={i}>
                    {/* Category label */}
                    {isFirstInCat && (
                      <div
                        className={cn(
                          'flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] font-bold text-stone-500 font-mono',
                          i === 0 ? 'mb-3' : 'mt-8 mb-3',
                        )}
                      >
                        <span className="h-px w-6 bg-stone-300" />
                        {categoryLabel(faq.category)}
                      </div>
                    )}

                    <div
                      className={cn(
                        'rounded-2xl border transition-all duration-200 overflow-hidden relative',
                        open
                          ? 'bg-stone-50 border-stone-300 shadow-sm'
                          : 'bg-white border-stone-200 hover:border-stone-300',
                      )}
                    >
                      {/* Emerald left rule when open */}
                      <span
                        className={cn(
                          'absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 transition-opacity duration-200',
                          open ? 'opacity-100' : 'opacity-0',
                        )}
                        aria-hidden="true"
                      />

                      <button
                        onClick={() => setOpenIdx(open ? null : i)}
                        className="w-full flex items-start justify-between gap-4 px-5 sm:px-6 py-5 text-left cursor-pointer"
                        aria-expanded={open}
                        aria-controls={`faq-panel-${i}`}
                        id={`faq-trigger-${i}`}
                      >
                        <div className="flex items-start gap-4 min-w-0">
                          <span className={cn(
                            'shrink-0 text-xs font-mono font-semibold pt-0.5 transition-colors',
                            open ? 'text-emerald-600' : 'text-stone-400',
                          )}>
                            {number}
                          </span>
                          <span className="text-base font-semibold text-stone-900 leading-snug">
                            {faq.q}
                          </span>
                        </div>
                        <span
                          className={cn(
                            'shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full border transition-all duration-200',
                            open
                              ? 'bg-stone-900 border-stone-900 text-white rotate-45'
                              : 'border-stone-300 text-stone-600',
                          )}
                          aria-hidden="true"
                        >
                          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </span>
                      </button>

                      <div
                        id={`faq-panel-${i}`}
                        role="region"
                        aria-labelledby={`faq-trigger-${i}`}
                        className={cn(
                          'grid transition-[grid-template-rows] duration-300 ease-out',
                          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                        )}
                      >
                        <div className="overflow-hidden">
                          <div className="px-5 sm:px-6 pb-5 pl-12 sm:pl-14">
                            <p className="text-sm text-stone-600 leading-relaxed">
                              {faq.a}
                            </p>

                            {/* Was this helpful? */}
                            <div className="mt-5 pt-4 border-t border-stone-200 flex items-center gap-3 flex-wrap">
                              <span className="text-[11px] uppercase tracking-[0.18em] font-bold text-stone-500 font-mono">
                                {t.faqHelpfulLabel}
                              </span>
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setVotes((v) => ({ ...v, [i]: 'up' }))
                                    // eslint-disable-next-line no-console
                                    console.log('FAQ helpful vote', { idx: i, vote: 'up' })
                                  }}
                                  aria-label="Helpful"
                                  aria-pressed={vote === 'up'}
                                  className={cn(
                                    'inline-flex items-center justify-center w-7 h-7 rounded-full border transition-colors cursor-pointer',
                                    vote === 'up'
                                      ? 'bg-emerald-500 border-emerald-500 text-white'
                                      : 'border-stone-300 text-stone-500 hover:border-stone-400 hover:text-stone-700',
                                  )}
                                >
                                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M7 10v12" />
                                    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H7V10l4.34-8.34A1.5 1.5 0 0 1 14 3l1 2.88z" />
                                  </svg>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setVotes((v) => ({ ...v, [i]: 'down' }))
                                    // eslint-disable-next-line no-console
                                    console.log('FAQ helpful vote', { idx: i, vote: 'down' })
                                  }}
                                  aria-label="Not helpful"
                                  aria-pressed={vote === 'down'}
                                  className={cn(
                                    'inline-flex items-center justify-center w-7 h-7 rounded-full border transition-colors cursor-pointer',
                                    vote === 'down'
                                      ? 'bg-stone-900 border-stone-900 text-white'
                                      : 'border-stone-300 text-stone-500 hover:border-stone-400 hover:text-stone-700',
                                  )}
                                >
                                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 14V2" />
                                    <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H17v12l-4.34 8.34A1.5 1.5 0 0 1 10 21l-1-2.88z" />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
