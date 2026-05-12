import { useEffect, useRef, useState, type ReactElement } from 'react'
import { useLang } from '@/lib/i18n'
import { SectionHeading } from '@/components/SectionHeading'

export function WhatYouGet() {
  const { t } = useLang()
  // First card is the marquee feature, rendered as a large bento tile.
  // The remaining 5 cards fill smaller tiles around it.
  const [feature, ...rest] = t.getCards
  const restIcons = [GridIcon, WalletIcon, FileIcon, BriefcaseIcon]

  return (
    <section id="what-you-get" className="bg-stone-50 pt-10 lg:pt-12 pb-20 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t.getEyebrow}
          title={t.getHeadline}
        />

        {/* Bento grid: on lg, 4 cols × 2 rows. Feature spans 2 cols × 2 rows;
            4 small tiles fill the right 2 cols across both rows. Mobile: stacks. */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-5">
          <Reveal className="sm:col-span-2 lg:col-span-2 lg:row-span-2" delay={0}>
            <FeatureCard title={feature.title} body={feature.body} tag={feature.tag} micro={feature.micro} />
          </Reveal>

          {rest.map((card, i) => {
            const Icon = restIcons[i] ?? GridIcon
            const pos =
              i === 0 ? 'lg:col-start-3 lg:row-start-1' :
              i === 1 ? 'lg:col-start-4 lg:row-start-1' :
              i === 2 ? 'lg:col-start-3 lg:row-start-2' :
              'lg:col-start-4 lg:row-start-2'
            return (
              <Reveal key={i} className={pos} delay={120 + i * 80}>
                <SmallCard
                  Icon={Icon}
                  title={card.title}
                  body={card.body}
                  tag={card.tag}
                  micro={card.micro}
                />
              </Reveal>
            )
          })}
        </div>

        <div className="mt-14 flex items-center justify-center">
          <a
            href="#hero"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold bg-emerald-500 text-white hover:bg-emerald-400 transition-all shadow-md hover:shadow-lg shadow-emerald-500/30 group"
          >
            {t.getCTA}
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-white/20 text-white group-hover:translate-x-0.5 transition-transform">
              <ArrowIcon className="w-3 h-3" />
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

/* -------------------- Card variants -------------------- */

function FeatureCard({
  title,
  body,
  tag,
  micro,
}: {
  title: string
  body: string
  tag?: string
  micro?: string
}) {
  return (
    <div className="group relative h-full overflow-hidden rounded-3xl bg-stone-900 text-white p-7 sm:p-9 border border-stone-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-stone-900/20">
      {/* Soft emerald glow / texture */}
      <div className="pointer-events-none absolute inset-0 bg-noise opacity-60" />
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/15 blur-3xl" />

      <div className="relative flex flex-col h-full">
        <div className="flex items-start justify-between gap-4">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
            <PhoneIcon className="w-7 h-7" />
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-blink" />
            {tag ?? 'Marquee'}
          </span>
        </div>

        <h3 className="mt-6 text-2xl sm:text-3xl font-bold leading-tight max-w-md">
          {title}
        </h3>
        <p className="mt-3 text-stone-300 text-sm sm:text-base leading-relaxed max-w-md">
          {body}
        </p>

        {/* In-product visual: faux call screen */}
        <div className="mt-7 relative rounded-2xl bg-stone-800/70 backdrop-blur-sm border border-stone-700/80 p-4 sm:p-5 max-w-md">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="/suman.jpg"
                alt="Adv. P. Sharma"
                className="w-11 h-11 rounded-full object-cover border border-emerald-500/40"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-stone-800 animate-soft-pulse" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-white truncate">Adv. P. Sharma</div>
              <div className="font-mono text-[11px] text-stone-400 mt-0.5">
                Connecting in <span className="text-emerald-300">~12 sec</span>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1 h-3 bg-emerald-400 rounded-full animate-soft-pulse" style={{ animationDelay: '0ms' }} />
              <span className="w-1 h-5 bg-emerald-400 rounded-full animate-soft-pulse" style={{ animationDelay: '150ms' }} />
              <span className="w-1 h-4 bg-emerald-400 rounded-full animate-soft-pulse" style={{ animationDelay: '300ms' }} />
              <span className="w-1 h-6 bg-emerald-400 rounded-full animate-soft-pulse" style={{ animationDelay: '450ms' }} />
              <span className="w-1 h-3 bg-emerald-400 rounded-full animate-soft-pulse" style={{ animationDelay: '600ms' }} />
            </div>
          </div>
          {/* phone -> arc -> lawyer mini diagram */}
          <div className="mt-4 flex items-center gap-3 text-[11px] font-mono text-stone-400">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-stone-500" />
              Driver
            </span>
            <svg viewBox="0 0 80 14" className="flex-1 h-3" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
              <path d="M2 10 Q 40 -6 78 10" className="text-emerald-400/70" />
              <circle cx="78" cy="10" r="1.5" className="fill-emerald-400 stroke-none" />
            </svg>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Lawyer
            </span>
          </div>
        </div>

        {micro && (
          <div className="mt-auto pt-6 flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-stone-400">
            <span className="w-6 h-px bg-stone-600" />
            {micro}
          </div>
        )}
      </div>
    </div>
  )
}

function SmallCard({
  Icon,
  title,
  body,
  tag,
  micro,
}: {
  Icon: (props: { className?: string }) => ReactElement
  title: string
  body: string
  tag?: string
  micro?: string
}) {
  const tagTone =
    tag === 'Add-on'
      ? 'bg-stone-200 text-stone-700'
      : 'bg-emerald-100 text-emerald-700'

  return (
    <div className="relative h-full rounded-2xl bg-white p-6 border border-stone-200">
      {tag && tag !== 'Actual basis' && (
        <span className={`absolute top-4 right-4 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${tagTone}`}>
          {tag}
        </span>
      )}
      <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-stone-100 text-emerald-600">
        <Icon className="w-[18px] h-[18px]" />
      </div>
      <h3 className="mt-4 text-base font-bold text-stone-900 leading-tight">
        {title}
      </h3>
      <p className="mt-1.5 text-sm text-stone-600 leading-relaxed">{body}</p>
    </div>
  )
}

/* -------------------- Reveal (IntersectionObserver fade-up) -------------------- */

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true)
            obs.disconnect()
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${className} ${visible ? 'animate-fade-up' : 'opacity-0'}`}
      style={visible ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}

/* -------------------- Icons -------------------- */

function PhoneIcon({ className = '' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>)
}
function GridIcon({ className = '' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>)
}
function WalletIcon({ className = '' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" /><path d="M3 5v14a2 2 0 0 0 2 2h16v-5" /><path d="M18 12a2 2 0 0 0 0 4h4v-4Z" /></svg>)
}
function FileIcon({ className = '' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="9" y1="13" x2="15" y2="13" /><line x1="9" y1="17" x2="13" y2="17" /></svg>)
}
function BriefcaseIcon({ className = '' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>)
}
function ArrowIcon({ className = '' }: { className?: string }) {
  return (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>)
}
