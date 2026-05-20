import { useEffect, useRef, useState } from 'react'

// LOTS247 / UDrive — Landing page implemented from Figma node 443:10198.
// Self-contained: single file, Tailwind v4, DM Sans (via index.css).

export function UDrivePage() {
  return (
    <div className="bg-white text-stone-900 font-sans antialiased">
      <Header />
      <Hero />
      <Stats />
      <Clientele />
      <RoadReality />
      <HowItWorks />
      <WhatYouGet />
      <DashboardPreview />
      <Pricing />
      <UseCases />
      <Testimonials />
      <Faq />
      <Footer />
    </div>
  )
}

/* ─────────────────────────── shared ─────────────────────────── */

function Wordmark({ tone = 'dark', variant = 'mark' }: { tone?: 'dark' | 'light'; variant?: 'mark' | 'full' }) {
  if (variant === 'full') {
    return (
      <a href="#" className="inline-flex items-center -ml-3">
        <img
          src="/lots247-logo-full-white.webp"
          alt="LOTS247 — India's first roadside legal assistance platform, by Lawyered"
          className="h-24 w-auto"
        />
      </a>
    )
  }
  const src = tone === 'light' ? '/lots247-logo-white.png' : '/lots247-logo-dark.png'
  return (
    <a href="#" className="inline-flex items-center">
      <img src={src} alt="LOTS247" className="h-9 w-auto" />
    </a>
  )
}

function CtaButton({
  children, className = '', variant = 'solid',
}: { children: React.ReactNode; className?: string; variant?: 'solid' | 'invert' | 'outline' }) {
  const styles =
    variant === 'solid'
      ? 'bg-emerald-500 text-white hover:bg-emerald-600'
      : variant === 'invert'
        ? 'bg-white text-stone-950 hover:bg-stone-100'
        : 'border border-stone-700 text-white hover:border-stone-500'
  return (
    <button className={`relative inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-medium transition-colors ${styles} ${className}`}>
      {children}
    </button>
  )
}

function ArrowRight({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

function SectionKicker(_props: {
  label: string
  align?: 'center' | 'left'
  tone?: 'emerald' | 'amber' | 'stone'
  surface?: 'light' | 'dark'
}) {
  return null
}

/** Editorial serif heading used across sections. */
function DisplayHeading({
  children,
  align = 'center',
  surface = 'light',
  size = 'lg',
  className = '',
}: {
  children: React.ReactNode
  align?: 'center' | 'left'
  surface?: 'light' | 'dark'
  size?: 'md' | 'lg' | 'xl'
  className?: string
}) {
  const sizeCls = {
    md: 'text-[1.875rem] sm:text-[2.25rem] lg:text-[2.625rem]',
    lg: 'text-[2.25rem] sm:text-[2.75rem] lg:text-[3.5rem]',
    xl: 'text-[2.75rem] sm:text-[3.5rem] lg:text-[4.25rem]',
  }[size]
  const color = surface === 'dark' ? 'text-white' : 'text-stone-900'
  return (
    <h2
      className={[
        'font-serif-display font-medium text-balance leading-[1.02] tracking-[-0.02em]',
        sizeCls,
        color,
        align === 'center' ? 'text-center mx-auto max-w-[26ch]' : 'text-left max-w-[26ch]',
        className,
      ].join(' ')}
      style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
    >
      {children}
    </h2>
  )
}

/* ─────────────────────────── 01 HEADER ─────────────────────────── */

function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-40 h-[72px] transition-[background,backdrop-filter,border-color,box-shadow] duration-300',
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-stone-200/70 shadow-[0_4px_18px_-12px_rgba(0,0,0,0.18)]'
          : 'bg-transparent border-b border-transparent',
      ].join(' ')}
    >
      <div className="mx-auto max-w-[1280px] px-8 lg:px-16 h-full flex items-center justify-between">
        <Wordmark tone="dark" />
        <nav className="hidden md:flex items-center gap-1 text-[13px] font-medium text-stone-700">
          <a href="#pricing" className="px-4 py-2 rounded-full hover:bg-stone-900/5 hover:text-stone-900 transition-colors">Pricing</a>
          <a href="#features" className="px-4 py-2 rounded-full hover:bg-stone-900/5 hover:text-stone-900 transition-colors">Features</a>
          <a href="#faq" className="px-4 py-2 rounded-full hover:bg-stone-900/5 hover:text-stone-900 transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center gap-2.5">
          <LangSwitch />
          <button className="group inline-flex items-center gap-2 rounded-full bg-stone-900 hover:bg-stone-800 transition-colors px-4 py-2 text-[13px] font-semibold text-white">
            <span>Create My Dashboard</span>
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="w-3 h-3 text-white" />
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}

function LangSwitch() {
  const langs = ['English', 'Hindi']
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('English')
  return (
    <div className="relative hidden sm:block">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        className="inline-flex items-center gap-2 rounded-full bg-[#f8f5f2] px-3.5 py-1.5 text-[11px] font-semibold text-stone-900 hover:bg-stone-200 transition-colors"
      >
        <span>{active}</span>
        <svg viewBox="0 0 24 24" className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 min-w-[140px] rounded-lg bg-white border border-stone-200 shadow-lg py-1 z-30">
          {langs.map(l => (
            <button
              key={l}
              type="button"
              onMouseDown={() => { setActive(l); setOpen(false) }}
              className={`w-full text-left px-3 py-2 text-[12px] ${active === l ? 'text-emerald-600 font-semibold' : 'text-stone-700 hover:bg-stone-50'}`}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────── 02 HERO ─────────────────────────── */

function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--color-cream)] pt-[72px]">
      {/* Hairline grid — operational dispatch feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #1c1917 1px, transparent 1px), linear-gradient(to bottom, #1c1917 1px, transparent 1px)',
          backgroundSize: '88px 88px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black, transparent 80%)',
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-8 lg:px-16 pt-10 lg:pt-14 pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-12 items-end gap-10 lg:gap-12">
          {/* Left copy + form */}
          <div className="lg:col-span-6 max-w-[640px]">
            <h1
              className="animate-fade-up font-serif-display font-medium text-stone-900 text-balance
                         text-[2.25rem] sm:text-[2.75rem] lg:text-[3.5rem] xl:text-[4rem]
                         leading-[1.02] tracking-[-0.025em]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 25' }}
            >
              Get Legal support for your commercial vehicle
            </h1>

            <p className="animate-fade-up mt-6 lg:mt-8 text-[15px] lg:text-[17px] leading-[1.65] text-stone-700 max-w-[520px]" style={{ animationDelay: '120ms' }}>
              Get 24×7 on-call legal support, challan assistance and a vehicle-wise dashboard. Stay ready before a roadside issue becomes a business stoppage.
            </p>

            <div className="animate-fade-up mt-8 max-w-[460px]" style={{ animationDelay: '220ms' }}>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2.5 pointer-events-none">
                  <span className="font-mono text-[13px] font-semibold text-stone-600">+91</span>
                  <span className="h-4 w-px bg-stone-300" />
                </div>
                <input
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="Enter your mobile number"
                  aria-label="Mobile number"
                  className="w-full rounded-2xl border border-stone-300 bg-white pl-[74px] pr-4 py-[18px] text-[15px] placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow shadow-[0_1px_0_rgba(0,0,0,0.02)]"
                />
              </div>
              <button className="mt-3 group relative w-full inline-flex items-center justify-center rounded-2xl bg-stone-900 px-8 py-[18px] text-[15px] font-semibold text-white hover:bg-stone-800 transition-colors shadow-[0_8px_24px_-12px_rgba(0,0,0,0.35)]">
                <span>Create My Dashboard</span>
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500 text-white transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
              <p className="mt-4 font-mono-label text-[10px] text-stone-500">
                By continuing, you agree to our <a href="#" className="text-emerald-700 underline underline-offset-4 decoration-emerald-600/40 hover:decoration-emerald-700">Terms &amp; conditions</a>
              </p>
            </div>
          </div>

          {/* Right illustration */}
          <div className="lg:col-span-6 relative animate-fade-up" style={{ animationDelay: '340ms' }}>
            <img
              src="/hero-truck.png"
              alt="Decorated commercial truck — driver on call with a lawyer"
              className="w-full max-w-[720px] mx-auto lg:mx-0 lg:ml-auto select-none pointer-events-none mix-blend-darken"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 03 STATS ─────────────────────────── */

function Stats() {
  const stats = [
    { v: '75,000+', l: 'lawyers' },
    { v: '98%', l: 'pin codes' },
    { v: '24×7', l: 'on call' },
    { v: '2 hr', l: 'on ground' },
  ]
  return (
    <section className="bg-white border-y border-stone-200/70">
      <div className="mx-auto max-w-[1280px] px-8 lg:px-16">
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className={[
                'py-10 lg:py-14 px-6 lg:px-8 flex flex-col items-start',
                i === 1 || i === 3 ? 'border-l border-stone-200' : '',
                i >= 2 ? 'border-t sm:border-t-0 border-stone-200' : '',
                i > 0 ? 'sm:border-l border-stone-200' : '',
              ].join(' ')}
            >
              <div
                className="font-serif-display font-medium text-emerald-700 num-tabular
                           text-[2rem] sm:text-[2.5rem] lg:text-[3.25rem]
                           leading-[1] tracking-[-0.02em]"
                style={{ fontVariationSettings: '"opsz" 120, "SOFT" 25' }}
              >
                {s.v}
              </div>
              <div className="mt-4 font-mono-label text-[14px] sm:text-[16px] text-stone-500">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 03b CLIENTELE ─────────────────────────── */

function Clientele() {
  const clients = [
    'Tata Motors',
    'Mahindra',
    'Ashok Leyland',
    'BharatBenz',
    'Eicher',
    'VECV',
    'Force Motors',
    'SML Isuzu',
    'Delhivery',
    'BlackBuck',
    'Rivigo',
    'Porter',
  ]
  return (
    <section className="bg-white border-b border-stone-200/70">
      <div className="mx-auto max-w-[1280px] px-8 lg:px-16 py-10 lg:py-14">
        <p className="font-mono-label text-[10.5px] text-stone-500 text-center">
          Trusted by fleets &amp; logistics teams across India
        </p>
        <div
          className="relative mt-8 overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          }}
        >
          <div className="flex w-max animate-marquee gap-12 lg:gap-16 pr-12 lg:pr-16">
            {[...clients, ...clients].map((name, i) => (
              <span
                key={i}
                className="shrink-0 font-serif-display text-[1.5rem] sm:text-[1.75rem] lg:text-[2rem] font-medium text-stone-400 hover:text-stone-700 transition-colors tracking-tight whitespace-nowrap"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 04 ROAD REALITY ─────────────────────────── */

function RoadReality() {
  const cards = [
    {
      img: '/issue-police.png',
      alt: 'Driver speaking with a police officer at a checkpoint',
      title: 'Police Checking',
      body: 'Vehicle stopped, papers questioned, driver unsure what to say next.',
    },
    {
      img: '/issue-challan.png',
      alt: 'Driver overwhelmed by pending challan papers',
      title: 'Challan Pressure',
      body: 'Pending challans piling up. Renewals and permits getting blocked.',
    },
    {
      img: '/issue-business-delay.png',
      alt: 'Stressed business owner facing a delayed delivery schedule',
      title: 'Business Delay',
      body: 'One stuck trip cascades into missed deliveries and unhappy clients.',
    },
  ]
  return (
    <section className="relative bg-[var(--color-cream-deep)] py-20 lg:py-28 overflow-hidden">
      {/* warning-territory dot pattern — subtle, hazard-tone */}
      <div className="absolute inset-0 bg-hazard-dots opacity-50 pointer-events-none" />

      <div className="relative mx-auto max-w-[1280px] px-8 lg:px-16">
        <div className="max-w-[920px]">
          <SectionKicker label="The reality" tone="amber" align="left" />
          <DisplayHeading align="left" size="lg" className="mt-5">
            One roadside issue can stop your full day's business
          </DisplayHeading>
        </div>

        <div className="mt-14 lg:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((c, i) => (
            <article
              key={i}
              className="group relative rounded-2xl bg-white border border-stone-200/80 overflow-hidden"
            >
              <div className="overflow-hidden aspect-[1536/1024] bg-stone-100">
                <img
                  src={c.img}
                  alt={c.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  draggable={false}
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="font-serif-display text-[1.5rem] sm:text-[1.75rem] font-medium text-orange-700 leading-[1.05] tracking-tight">{c.title}</h3>
                <p className="mt-3 text-[13px] leading-[1.6] text-stone-600">{c.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 05 WHAT YOU GET ─────────────────────────── */

function WhatYouGet() {
  const small = [
    { title: 'Vehicle Dashboard', body: 'Vehicle, driver, challan and support details — all in one place.' },
    { title: 'Wallet Credits', body: 'Use available credits for eligible services right from the dashboard.' },
    { title: 'Challan Assistance', body: 'Check, pay, contest and close challans with guided support.' },
    { title: 'On-Ground Lawyer', body: 'If physical support is needed, a lawyer is arranged on actual basis.' },
  ]
  return (
    <section id="features" className="bg-[var(--color-cream)] py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-8 lg:px-16">
        <div className="max-w-[820px] mx-auto text-center">
          <SectionKicker label="What you get" />
          <DisplayHeading className="mt-5" size="lg">
            Everything your vehicle needs to stay legally ready
          </DisplayHeading>
        </div>

        <div className="mt-16 lg:mt-20 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Big "Included" feature card — ink dark for emphasis */}
          <article className="lg:col-span-6 relative overflow-hidden rounded-[24px] bg-white text-stone-900 border border-stone-200 min-h-[400px] sm:min-h-[420px] transition-all duration-300 hover:-translate-y-0.5">
            {/* soft emerald halo */}
            <div className="pointer-events-none absolute -left-24 -top-24 w-[420px] h-[420px] rounded-full bg-emerald-500/15 blur-3xl" />
            <img
              src="/lawyer-on-call.png"
              alt="Lawyer at desk on a phone call with legal books and laptop"
              className="absolute bottom-0 right-0 w-[58%] max-w-[380px] select-none pointer-events-none z-0"
              draggable={false}
              loading="lazy"
              style={{
                maskImage:
                  'linear-gradient(to bottom, transparent 0%, black 28%, black 100%), linear-gradient(to right, transparent 0%, black 28%, black 100%)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, transparent 0%, black 28%, black 100%), linear-gradient(to right, transparent 0%, black 28%, black 100%)',
                maskComposite: 'intersect',
                WebkitMaskComposite: 'source-in',
              }}
            />
            <div className="relative z-10 p-10 sm:p-12">
              <div className="inline-flex items-center gap-2.5">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="font-mono-label text-[10.5px] text-emerald-600">Included</span>
              </div>
              <h3 className="mt-8 font-serif-display text-[2rem] sm:text-[2.5rem] lg:text-[3rem] font-medium leading-[1.02] tracking-[-0.02em] text-stone-900">
                24×7 On-Call Legal Support
              </h3>
              <p className="mt-6 text-[14px] sm:text-[15px] leading-[1.65] text-stone-600 max-w-[360px]">
                Talk to legal support the moment your vehicle faces a roadside issue.
              </p>
            </div>
          </article>

          {/* 4 small editorial cards in 2x2 */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {small.map((c, i) => (
              <div
                key={i}
                className="group relative rounded-[20px] border border-stone-300/70 bg-white p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-400 hover:shadow-[0_12px_28px_-12px_rgba(0,0,0,0.10)]"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono-label text-[9.5px] text-stone-400 num-tabular">{String(i + 1).padStart(2, '0')}</span>
                  <span aria-hidden="true" className="h-px w-6 bg-stone-300 group-hover:bg-emerald-500 transition-colors" />
                </div>
                <h4 className="mt-5 font-serif-display text-[1.25rem] sm:text-[1.375rem] font-medium tracking-tight text-stone-900 leading-[1.1]">{c.title}</h4>
                <p className="mt-2 text-[12.5px] leading-[1.6] text-stone-600">{c.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <button className="group relative inline-flex items-center gap-3 rounded-full bg-stone-900 hover:bg-stone-800 transition-colors px-8 py-4 text-[14px] font-semibold text-white">
            <span>Create My Dashboard</span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 transition-transform group-hover:translate-x-0.5">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 06 HOW IT WORKS ─────────────────────────── */

function HowItWorks() {
  const steps = [
    { title: 'Enter vehicle details', body: 'Add your vehicle number and mobile number above the fold.' },
    { title: 'Verify with OTP', body: 'Quick mobile OTP — no documents required upfront.' },
    { title: 'Create your dashboard', body: 'Your vehicle is registered and the dashboard is ready to use.' },
    { title: 'Activate UDrive', body: 'Unlock 24×7 legal support, challan assistance and wallet credits.' },
  ]
  const total = steps.length
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (paused) return
    intervalRef.current = window.setInterval(() => {
      setActive(prev => (prev + 1) % total)
    }, 3200)
    return () => { if (intervalRef.current !== null) window.clearInterval(intervalRef.current) }
  }, [paused, total])

  const progress = total > 1 ? active / (total - 1) : 0

  return (
    <section className="bg-white py-20 lg:py-28 border-y border-stone-200/60">
      <div className="mx-auto max-w-[1280px] px-8 lg:px-16">
        <div className="text-center max-w-[1100px] mx-auto">
          <SectionKicker label="How it works" />
          <DisplayHeading className="mt-5" size="lg">
            Start in 4 simple steps
          </DisplayHeading>
          <p className="mt-5 text-[15px] text-stone-600 leading-relaxed whitespace-nowrap">
            From vehicle entry to active legal cover in under two minutes — no documents required upfront.
          </p>
        </div>

        <div
          className="mt-12 lg:mt-20"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
        >
          {/* MOBILE: stacked cards with inline image (always visible) */}
          <div className="lg:hidden space-y-5">
            {steps.map((step, i) => (
              <article
                key={i}
                className="relative rounded-2xl bg-white ring-1 ring-stone-200 shadow-[0_18px_40px_-22px_rgba(0,0,0,0.18)] p-5"
              >
                <header className="flex items-center gap-3">
                  <span className="shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-full bg-emerald-500 text-white text-[12px] font-bold font-mono">
                    0{i + 1}
                  </span>
                  <h3 className="text-[16px] font-bold leading-tight tracking-tight text-stone-900">
                    {step.title}
                  </h3>
                </header>
                <p className="mt-3 text-[14px] leading-relaxed text-stone-600">
                  {step.body}
                </p>
                <div className="relative mt-5 mx-auto w-full max-w-[280px] rounded-[20px] bg-gradient-to-br from-emerald-50 via-white to-stone-50 border border-stone-200/80 px-2 py-1 overflow-hidden">
                  <div className="pointer-events-none absolute -bottom-12 left-1/2 -translate-x-1/2 h-32 w-[85%] rounded-full bg-emerald-500/20 blur-3xl" />
                  <div className="pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full bg-emerald-200/40 blur-3xl" />
                  <div className="relative">
                    <HowPhoneScreen step={i} />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* DESKTOP: vertical stepper + sticky phone */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_minmax(0,380px)] gap-14 items-start">
            <div className="relative">
              <div className="absolute left-[39.5px] top-8 bottom-8 w-px bg-stone-200 z-0" aria-hidden="true" />
              <div
                className="absolute left-[39.5px] top-8 w-px bg-emerald-500 z-0 transition-[height] duration-700 ease-out"
                style={{ height: `calc((100% - 64px) * ${progress})` }}
                aria-hidden="true"
              />

              <ol className="space-y-2 max-w-[560px]">
                {steps.map((step, i) => {
                  const isActive = i === active
                  const isPast = i < active
                  return (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() => setActive(i)}
                        className={[
                          'group relative z-10 w-full text-left flex items-start gap-5 rounded-2xl px-3 py-4 transition-all duration-300',
                          isActive
                            ? 'bg-white ring-1 ring-stone-200 shadow-[0_18px_40px_-22px_rgba(0,0,0,0.18)]'
                            : 'hover:bg-white/60',
                        ].join(' ')}
                        aria-current={isActive ? 'step' : undefined}
                      >
                        <span
                          className={[
                            'relative shrink-0 inline-flex items-center justify-center w-14 h-14 rounded-full text-sm font-bold transition-all duration-300',
                            isActive
                              ? 'bg-stone-900 text-white shadow-[0_8px_16px_-6px_rgba(0,0,0,0.35)] scale-105'
                              : isPast
                                ? 'bg-emerald-500 text-white'
                                : 'bg-white text-stone-500 ring-1 ring-stone-300',
                          ].join(' ')}
                        >
                          {isPast ? (
                            <CheckIcon className="w-5 h-5" />
                          ) : (
                            <span className="font-mono">0{i + 1}</span>
                          )}
                        </span>

                        <span className="flex-1 min-w-0 pt-1">
                          <span className={[
                            'block text-[18px] font-bold leading-tight tracking-tight',
                            isActive ? 'text-stone-900' : isPast ? 'text-stone-500' : 'text-stone-800',
                          ].join(' ')}>
                            {step.title}
                          </span>
                          <span className={[
                            'mt-2 block text-[14px] leading-relaxed transition-colors',
                            isActive ? 'text-stone-600' : isPast ? 'text-stone-400' : 'text-stone-500',
                          ].join(' ')}>
                            {step.body}
                          </span>
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ol>
            </div>

            <div className="sticky top-24">
              <div className="relative rounded-[24px] bg-gradient-to-br from-emerald-50 via-white to-stone-50 border border-stone-200/80 px-2 py-1 overflow-hidden">
                <div className="pointer-events-none absolute -bottom-16 left-1/2 -translate-x-1/2 h-40 w-[85%] rounded-full bg-emerald-500/25 blur-3xl" />
                <div className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-emerald-200/40 blur-3xl" />

                <div className="relative mx-auto w-full max-w-[320px]">
                  <HowPhoneScreen step={active} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HowPhoneScreen({ step }: { step: number }) {
  const sources = ['/device-step-1.png', '/device-step-2.png', '/device-step-3.png', '/device-step-3.png']
  const alts = ['Enter vehicle details', 'Verify with OTP', 'Dashboard ready', 'UDrive activated']
  const idx = Math.min(step, sources.length - 1)
  return (
    <img
      key={step}
      src={sources[idx]}
      alt={alts[idx]}
      className="block w-full h-auto animate-fade-in"
      style={{
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 2%, black 98%, transparent 100%), linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 2%, black 98%, transparent 100%), linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)',
        maskComposite: 'intersect',
        WebkitMaskComposite: 'source-in',
      }}
    />
  )
}

/* ─────────────────────────── 07 DASHBOARD PREVIEW ─────────────────────────── */

function DashboardPreview() {
  const lockedFeatures = ['Call legal support', 'Resolve open challan', 'Activate wallet credits']
  return (
    <section className="relative bg-[var(--color-ink)] text-white py-24 lg:py-32 overflow-hidden">
      {/* atmospheric depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(700px 380px at 20% 20%, rgba(0,184,118,0.10), transparent 60%), radial-gradient(700px 500px at 90% 80%, rgba(255,255,255,0.04), transparent 60%)',
        }}
      />
      <div className="relative mx-auto max-w-[1280px] px-8 lg:px-16">
        <div className="text-center max-w-[680px] mx-auto">
          <SectionKicker label="The dashboard" surface="dark" />
          <h2
            className="font-serif-display mt-5 font-medium text-balance text-white text-[2.25rem] sm:text-[2.75rem] lg:text-[3.5rem] leading-[1.02] tracking-[-0.02em]"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
          >
            Your vehicle dashboard, built for daily business movement
          </h2>
        </div>
        <div className="relative mt-16">
          <div className="absolute -inset-x-5 top-10 rounded-[32px] bg-emerald-500/8" />
          <div className="relative overflow-hidden rounded-3xl shadow-[0_24px_80px_-20px_rgba(0,0,0,0.25)] bg-stone-950 min-h-[640px] lg:min-h-[760px]">
            <img
              src="/dashboard-preview.png"
              alt="LOTS247 vehicle dashboard"
              className="absolute inset-0 w-full h-full object-cover object-left-top block"
            />

            {/* Locked overlay — covers right ~58% on desktop, full on mobile */}
            <div className="absolute inset-y-0 right-0 left-0 lg:left-[42%] backdrop-blur-md bg-white/55 flex items-center justify-center pointer-events-none">
              <div
                className="absolute inset-0 hidden lg:block"
                style={{
                  background:
                    'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 8%, rgba(255,255,255,0.7) 100%)',
                }}
              />
              <div className="relative text-center px-6 w-full max-w-md pointer-events-auto">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-stone-950 text-white shadow-2xl">
                  <LockIcon className="w-6 h-6" />
                </div>

                <div className="mt-6 space-y-2">
                  {lockedFeatures.map((f) => (
                    <div
                      key={f}
                      className="flex items-center justify-between gap-3 rounded-xl bg-white/85 border border-stone-200 px-4 py-2.5 text-[13px] text-stone-800 shadow-sm"
                    >
                      <span className="truncate">{f}</span>
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-600 uppercase tracking-[0.12em] flex-shrink-0">
                        <LockIcon className="w-3 h-3" />
                        Locked
                      </span>
                    </div>
                  ))}
                </div>

                <p className="mt-5 text-[14px] font-bold text-stone-900">
                  Unlock after activation
                </p>

                <button className="mt-4 group relative w-full inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3.5 text-[14px] font-medium text-white hover:bg-emerald-600 transition-colors">
                  <span>Create My Dashboard</span>
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function LockIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

/* ─────────────────────────── 08 PRICING ─────────────────────────── */

function Pricing() {
  const includes = [
    '24×7 on-call legal support', 'Vehicle-wise dashboard access',
    'Challan check, pay & contest', 'Driver & incident records',
    'On-ground lawyer (actual basis)', 'WhatsApp updates',
  ]
  return (
    <section id="pricing" className="relative bg-[var(--color-cream)] py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-8 lg:px-16">
        <div className="text-center">
          <SectionKicker label="Pricing" />
          <DisplayHeading className="mt-5" size="lg">
            Activate your vehicle and get wallet credits
          </DisplayHeading>
        </div>

        <div className="mt-16 grid lg:grid-cols-12 gap-6 items-start">
          {/* Dark pricing card */}
          <div className="lg:col-span-5 relative overflow-hidden rounded-3xl bg-[var(--color-ink)] p-8 lg:p-10 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)]">
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '26px 26px' }} />
            <div className="absolute -right-16 -bottom-16 w-[420px] h-[420px] rounded-full bg-emerald-500/15 blur-3xl" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <span className="font-mono-label text-[10.5px] text-emerald-300">UDrive Vehicle Plan</span>
                <span aria-hidden="true" className="h-px w-10 bg-emerald-500/40" />
              </div>
              <div className="mt-6 flex items-baseline gap-3">
                <span
                  className="font-serif-display text-[5rem] lg:text-[6.5rem] font-medium tracking-[-0.03em] text-white leading-[0.9] num-tabular"
                  style={{ fontVariationSettings: '"opsz" 144, "SOFT" 25' }}
                >
                  ₹999
                </span>
                <span className="font-mono-label text-[10px] text-stone-400">per vehicle / year</span>
              </div>
              <div className="mt-3 text-[12px] text-stone-400">Works out to ~₹83 / month</div>

              <div className="my-8 h-px bg-stone-800" />

              <div className="font-mono-label text-[10px] text-stone-400">WHAT'S INCLUDED</div>
              <ul className="mt-5 grid grid-cols-2 gap-y-3 gap-x-4">
                {includes.map((it) => (
                  <li key={it} className="flex items-start gap-2.5">
                    <span className="mt-0.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded bg-emerald-500 text-white">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-2.5 h-2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <span className="text-[12px] text-stone-200 leading-snug">{it}</span>
                  </li>
                ))}
              </ul>

              <button className="mt-8 group relative w-full inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-3.5 text-[14px] font-medium text-white hover:bg-emerald-600 transition-colors">
                <span>Create My Dashboard</span>
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20">
                  <ArrowRight className="w-3.5 h-3.5 text-white" />
                </span>
              </button>
            </div>
          </div>

          {/* Right panels */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl border border-stone-200 bg-white p-7 shadow-[0_6px_20px_-12px_rgba(0,0,0,0.04)]">
              <div className="inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-50 animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                <span className="font-mono-label text-[10.5px] text-emerald-700">Wallet Recharge Included</span>
              </div>
              <h3
                className="mt-5 font-serif-display text-[1.875rem] lg:text-[2.25rem] font-medium tracking-[-0.02em] leading-[1.05] text-stone-900 num-tabular"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
              >
                You pay ₹999, you get ₹1,499 wallet benefit back.
              </h3>
            </div>

            <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-[0_6px_20px_-12px_rgba(0,0,0,0.04)]">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-bold tracking-[0.18em] text-stone-500">WHAT IT WOULD COST OTHERWISE</div>
                <div className="text-[10px] font-bold tracking-[0.14em] text-stone-400">PER YEAR</div>
              </div>

              <ul className="mt-5 space-y-3.5">
                {[
                  { l: 'One private lawyer consult', v: '₹3,000' },
                  { l: 'RTO challan resolution', v: '₹1,500' },
                ].map((r, i) => (
                  <li key={i} className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-red-200 bg-red-50 text-red-500">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="w-2.5 h-2.5"><line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" /></svg>
                      </span>
                      <span className="text-[13px] text-stone-700">{r.l}</span>
                    </div>
                    <span className="text-[14px] font-semibold text-stone-400 line-through tabular-nums">{r.v}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex items-center justify-between border-t border-dashed border-stone-200 pt-4">
                <span className="text-[11px] font-medium text-stone-500">Typical yearly cost</span>
                <span className="text-[14px] font-bold text-stone-700 tabular-nums">₹4,500+</span>
              </div>

              <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50/70 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-2.5 h-2.5"><polyline points="20 6 9 17 4 12" /></svg>
                    </span>
                    <div className="text-[13px] font-semibold text-stone-900">UDrive — full year, per vehicle</div>
                  </div>
                  <span className="text-[18px] font-bold text-emerald-700 tabular-nums leading-none">₹999</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="h-px flex-1 bg-stone-200" />
                <span className="text-[11px] font-bold tracking-wider text-emerald-700 uppercase">You save ₹3,500+ a year</span>
                <span className="h-px flex-1 bg-stone-200" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 09 USE CASES ─────────────────────────── */

function UseCases() {
  const cases = [
    { num: '01', time: '11:42 PM · Highway',     title: 'Police checking on highway',     body: 'Quick call to a lawyer who guides the driver through the conversation.', outcome: 'Truck moves in ~15 min' },
    { num: '02', time: 'Renewal day · Office',   title: 'Pending challan blocking permit', body: 'Guided resolution — online, Lok Adalat or court — whatever fits.',        outcome: 'Permit unblocked' },
    { num: '03', time: 'Saturday · Local road',  title: 'Minor accident or dispute',       body: 'On-ground lawyer arranged when needed. Driver is not alone.',             outcome: 'Driver not alone' },
    { num: '04', time: 'Monday morning · RTO',   title: 'Document confusion at RTO',       body: 'Support to figure out what is required and where to file it.',           outcome: 'No more guesswork' },
  ]
  return (
    <section className="relative bg-white py-24 lg:py-32 overflow-hidden">
      {/* faint hairline grid — operational dispatch feel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #1c1917 1px, transparent 1px), linear-gradient(to bottom, #1c1917 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent 80%)',
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-8 lg:px-16">
        {/* heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-3 font-mono-label text-[10.5px] text-stone-500">
            <span className="h-px w-6 bg-stone-300" />
            Real moments
            <span className="h-px w-6 bg-stone-300" />
          </div>
          <DisplayHeading className="mt-5" size="lg">
            Built for the moments that stop your day.
          </DisplayHeading>
          <p className="mt-5 text-[14px] sm:text-[15px] leading-[1.7] text-stone-600 mx-auto max-w-md">
            Four scenes from the road — and how UDrive steps in before they become a stoppage.
          </p>
        </div>

        {/* cards */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cases.map((c, i) => (
            <article
              key={i}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-stone-50 transition-all duration-300 hover:bg-stone-100/80 hover:-translate-y-0.5"
            >
              {/* header strip — number + time chip */}
              <div className="px-5 pt-5 pb-3 flex items-baseline justify-between">
                <span className="font-mono-label text-[10.5px] text-stone-400 tabular-nums">
                  {c.num} <span className="text-stone-300">/ 04</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-[10.5px] tracking-[0.04em] text-stone-500">
                  <span className="h-1 w-1 rounded-full bg-emerald-500" />
                  {c.time}
                </span>
              </div>

              {/* problem zone */}
              <div className="px-5 pb-6 flex-1">
                <h3
                  className="font-serif-display text-[1.25rem] sm:text-[1.3rem] font-medium leading-[1.15] tracking-[-0.01em] text-stone-900"
                  style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
                >
                  {c.title}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.6] text-stone-600">
                  {c.body}
                </p>
              </div>

              {/* resolution strip — visually distinct, white bg, emerald accent */}
              <div className="relative bg-white border-t border-stone-200/80 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_2px_8px_-2px_rgba(16,185,129,0.55)]">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5">
                      <polyline points="4 12 10 18 20 6" />
                    </svg>
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="font-mono-label text-[9px] text-stone-400">Outcome</span>
                    <span className="text-[12.5px] font-semibold text-stone-900 tracking-tight">{c.outcome}</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-stone-300 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-emerald-600" />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <CtaButton><span>Create My Dashboard</span><ArrowRight className="w-4 h-4" /></CtaButton>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 10 TESTIMONIALS ─────────────────────────── */

function Testimonials() {
  const testis = [
    { quote: 'My driver was stopped near Sonipat at 11 PM. One call and the lawyer guided him through the whole thing. The truck moved by midnight.', name: 'Rakesh Yadav', img: '/rakesh.jpg', role: 'Owner, transport business · Sonipat, NH-44', meta: '8 trucks · 14 months on UDrive · 9 lawyer calls' },
    { quote: "I used to lose two days every month chasing challans. Now I just open the dashboard, pay or contest, and it's done.", name: 'Suman Patel', img: '/suman.jpg', role: 'Proprietor, tempo fleet · Ahmedabad', meta: '12 tempos · 8 months on UDrive · 22 challans cleared' },
    { quote: 'For my size of business, hiring a lawyer was never possible. UDrive gives me that comfort at a price I can actually pay.', name: 'Mohammed Aslam', img: '/aslam.jpg', role: 'Cab operator · Hyderabad', meta: '1 cab · 6 months on UDrive · 3 lawyer calls' },
  ]
  const mini = [
    'Saved me 4 hours at the RTO last week. — Vikram, Jaipur',
    'Driver felt confident because lawyer was on call. — Nitin, Pune',
    'Challan was contested and reduced. — Arif, Lucknow',
    'For ₹999 a year, this is a no-brainer. — Priya, Bengaluru',
  ]
  return (
    <section className="bg-[var(--color-cream)] py-24 lg:py-32">
      <div className="mx-auto max-w-[1280px] px-8 lg:px-16">
        <div className="text-center">
          <SectionKicker label="Voices from the road" />
          <DisplayHeading className="mt-5" size="lg">
            Built for businesses that cannot afford vehicle stoppage
          </DisplayHeading>
        </div>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testis.map((t, i) => (
            <div key={i} className="rounded-2xl border border-emerald-500 bg-white p-7 flex flex-col min-h-[300px] transition-colors duration-300 hover:border-emerald-600">
              <span
                aria-hidden="true"
                className="font-serif-display text-[72px] leading-[0.6] text-emerald-500 select-none"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
              >&ldquo;</span>
              <p className="mt-3 font-serif-display text-[17px] leading-[1.45] text-stone-800 italic" style={{ fontVariationSettings: '"opsz" 36, "SOFT" 50' }}>{t.quote}</p>
              <div className="mt-auto pt-5 border-t border-stone-200">
                <div className="mt-3 flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="h-10 w-10 rounded-full object-cover border border-stone-200" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[13px] font-bold text-stone-900">{t.name}</span>
                      <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500 text-white">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="w-2 h-2"><polyline points="20 6 9 17 4 12" /></svg>
                      </span>
                    </div>
                    <div className="text-[11px] text-stone-500">{t.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-14">
          <div className="mb-5 flex items-center gap-3">
            <span className="font-mono-label text-[10.5px] text-stone-500">More voices from the road</span>
            <span aria-hidden="true" className="h-px flex-1 bg-stone-300" />
          </div>
          <div
            className="relative overflow-hidden"
            style={{
              maskImage:
                'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
            }}
          >
            <div className="flex w-max animate-marquee gap-3 pr-3">
              {[...mini, ...mini].map((q, i) => (
                <div key={i} className="shrink-0 w-[320px] sm:w-[360px] rounded-xl border border-stone-300/70 bg-white px-4 py-4">
                  <span className="font-serif-display text-[13px] leading-[1.5] text-stone-800 italic" style={{ fontVariationSettings: '"opsz" 24, "SOFT" 60' }}>{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 11 FAQ ─────────────────────────── */

function Faq() {
  const items = [
    { q: 'What is UDrive by LOTS247?', a: 'UDrive is a self-serve legal and challan support plan for commercial vehicle owners.' },
    { q: 'Who is this plan for?', a: 'Small fleet owners, commercial vehicle owners, transport operators and SMEs using vehicles for business.' },
    { q: 'Does UDrive work outside cities?', a: 'Yes. The network covers 98% of India\'s pin codes — highways, semi-urban routes and remote checkpoints included.' },
    { q: 'Is the price per vehicle?', a: 'Yes. The subscription is planned vehicle-wise. Each vehicle needs to be activated separately.' },
    { q: 'Is on-ground lawyer support included?', a: 'On-ground lawyer support is available when required and is charged on actual basis.' },
    { q: 'How do I cancel my subscription?', a: 'Cancel anytime from your dashboard or by writing to support. There\'s no lock-in.' },
    { q: 'What happens after I enter my vehicle number?', a: 'Your dashboard is created after OTP verification. You can activate the plan to unlock support features.' },
  ]
  const [open, setOpen] = useState<number>(0)
  return (
    <section id="faq" className="bg-white py-24 lg:py-32 border-y border-stone-200/70">
      <div className="mx-auto max-w-[1280px] px-8 lg:px-16">
        <div className="text-center">
          <SectionKicker label="FAQ" />
          <DisplayHeading className="mt-5" size="lg">
            Quick answers before you activate
          </DisplayHeading>
        </div>
        <div className="mt-16 grid lg:grid-cols-12 gap-6 items-start">
          {/* Dark support card — ink surface */}
          <div className="lg:col-span-4 relative overflow-hidden rounded-3xl bg-[var(--color-ink)] p-8 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.4)] lg:sticky lg:top-24">
            <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
            <div className="absolute -left-20 bottom-0 w-[360px] h-[280px] rounded-full bg-emerald-500/15 blur-3xl" />
            <div className="relative">
              <SectionKicker label="Still have questions?" surface="dark" align="left" />
              <h3
                className="mt-5 font-serif-display text-[2rem] lg:text-[2.25rem] font-medium tracking-[-0.02em] text-white leading-[1]"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 40' }}
              >
                Talk to a human.
              </h3>
              <p className="mt-4 text-[13px] leading-[1.65] text-stone-400">
                Our support team handles your queries directly — no bots, no forms. Most owners get a reply in under 10 minutes.
              </p>
              <button className="mt-7 w-full inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-3.5 text-[13px] font-semibold text-white hover:bg-emerald-400 transition-colors">
                WhatsApp us
              </button>
              <button className="mt-3 w-full inline-flex items-center justify-center rounded-full border border-stone-700 px-5 py-3.5 text-[13px] font-medium text-white hover:border-stone-500 hover:bg-white/5 transition-colors">
                Call us
              </button>
              <p className="mt-6 text-center font-mono-label text-[10px] text-stone-500">Mon–Sat · 9 AM to 9 PM IST</p>
            </div>
          </div>

          {/* Accordion — editorial list with hairline dividers */}
          <div className="lg:col-span-8 divide-y divide-stone-200 border-y border-stone-200">
            {items.map((it, i) => {
              const isOpen = open === i
              return (
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  key={i}
                  className={`relative w-full text-left transition-colors px-1 sm:px-2 py-6 ${
                    isOpen ? 'bg-transparent' : 'hover:bg-stone-50/60'
                  }`}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-baseline gap-4 sm:gap-6 flex-1 min-w-0">
                      <span className="font-mono-label text-[10.5px] text-stone-400 num-tabular shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`font-serif-display text-[1.125rem] sm:text-[1.25rem] leading-[1.3] tracking-tight ${isOpen ? 'text-stone-900' : 'text-stone-800'}`}
                        style={{ fontVariationSettings: '"opsz" 96, "SOFT" 40' }}
                      >
                        {it.q}
                      </span>
                    </div>
                    <span
                      aria-hidden="true"
                      className={`shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen ? 'bg-stone-900 border-stone-900 text-white rotate-45' : 'bg-white border-stone-300 text-stone-500'
                      }`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </span>
                  </div>
                  <div
                    className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-[13.5px] leading-[1.65] text-stone-600 pl-0 sm:pl-12">{it.a}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────── 12 FOOTER ─────────────────────────── */

function Footer() {
  return (
    <footer className="bg-black pt-20 pb-12 border-t border-stone-900">
      <div className="mx-auto max-w-[1280px] px-8 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="col-span-2 lg:col-span-5">
            <Wordmark variant="full" />
            <p className="mt-5 text-[13px] leading-[1.65] text-stone-400 max-w-sm">
              LOTS247 keeps legal, challan and roadside support ready for your commercial vehicle, so one issue does not stop your business movement.
            </p>
            <address className="mt-6 not-italic text-[11px] leading-[1.65] text-stone-500 max-w-sm">
              <span className="block font-semibold text-stone-200">Sproutech Solutions Private Limited</span>
              India Accelerator Coworking, Lower Ground Floor, LG-007-02,<br />
              MGF Metropolis Mall, MG Road, Gurugram, Haryana, 122002
            </address>
          </div>
          <div className="col-span-1 lg:col-span-3 lg:col-start-7">
            <h5 className="font-mono-label text-[10px] text-stone-500">Product</h5>
            <ul className="mt-5 space-y-3 text-[13px] text-stone-300">
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
              <li><a href="#features" className="hover:text-emerald-400 transition-colors">How it works</a></li>
              <li><a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div className="col-span-1 lg:col-span-3">
            <h5 className="font-mono-label text-[10px] text-stone-500">Support</h5>
            <ul className="mt-5 space-y-3 text-[13px] text-stone-300">
              <li><a className="hover:text-emerald-400 transition-colors" href="#">About</a></li>
              <li><a className="hover:text-emerald-400 transition-colors" href="#">Terms &amp; Conditions</a></li>
              <li><a className="hover:text-emerald-400 transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="hover:text-emerald-400 transition-colors" href="#">Contact us</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-stone-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono-label text-[10px] text-stone-500 order-2 sm:order-1">© 2026 LOTS247. All rights reserved.</p>
          <div className="flex items-center gap-2.5 order-1 sm:order-2">
            <a href="#" aria-label="LinkedIn" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 border border-stone-800 text-stone-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.37 4.28 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zm1.78 13.02H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>
            </a>
            <a href="#" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 border border-stone-800 text-stone-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg>
            </a>
            <a href="#" aria-label="YouTube" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-stone-900 border border-stone-800 text-stone-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────── icons ─────────────────────────── */

function PhoneIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  )
}
function HeadsetIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 38v-6a22 22 0 0 1 44 0v6" />
      <rect x="6" y="36" width="12" height="18" rx="3" fill="currentColor" />
      <rect x="46" y="36" width="12" height="18" rx="3" fill="currentColor" />
      <path d="M52 52v4a6 6 0 0 1-6 6h-6" />
    </svg>
  )
}
function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="8" rx="2" opacity="0.5" />
      <rect x="3" y="13" width="8" height="8" rx="2" opacity="0.5" />
      <rect x="13" y="13" width="8" height="8" rx="2" />
    </svg>
  )
}
function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2H5a2 2 0 0 1-2-2 2 2 0 0 1 2-2h13" />
      <circle cx="16" cy="14" r="1.5" fill="currentColor" />
    </svg>
  )
}
function DocCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <polyline points="9 15 11 17 15 13" />
    </svg>
  )
}
function CheckIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 12 10 18 20 6" />
    </svg>
  )
}
function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
function ShieldPolice() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}
function DocAlert() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="12" y1="12" x2="12" y2="16" />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
    </svg>
  )
}
function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  )
}
function FileSearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
      <circle cx="17" cy="9" r="4" />
      <line x1="20" y1="12" x2="22" y2="14" />
    </svg>
  )
}
