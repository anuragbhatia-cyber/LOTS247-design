import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X, ShieldCheck, Download, User } from 'lucide-react'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'
import type { Driver } from '@/../product/sections/vehicle-and-driver-management/types'

const translations: Record<Language, {
  title: string
  close: string
  active: string
  policyNumber: string
  sumInsured: string
  premium: string
  perYear: string
  validFrom: string
  validTill: string
  insuredPerson: string
  nominee: string
  driverPhone: string
  licenseNumber: string
  downloadPolicy: string
  noPolicy: string
}> = {
  en: {
    title: 'Insurance Details',
    close: 'Close',
    active: 'Active',
    policyNumber: 'Policy Number',
    sumInsured: 'Sum Insured',
    premium: 'Premium',
    perYear: '/ year',
    validFrom: 'Valid From',
    validTill: 'Valid Till',
    insuredPerson: 'Insured Person',
    nominee: 'Nominee',
    driverPhone: 'Phone',
    licenseNumber: 'License No.',
    downloadPolicy: 'Download Policy',
    noPolicy: 'No policy details available',
  },
  hi: {
    title: 'बीमा विवरण',
    close: 'बंद करें',
    active: 'सक्रिय',
    policyNumber: 'पॉलिसी नंबर',
    sumInsured: 'बीमा राशि',
    premium: 'प्रीमियम',
    perYear: '/ वर्ष',
    validFrom: 'से वैध',
    validTill: 'तक वैध',
    insuredPerson: 'बीमित व्यक्ति',
    nominee: 'नामांकित व्यक्ति',
    driverPhone: 'फ़ोन',
    licenseNumber: 'लाइसेंस नं.',
    downloadPolicy: 'पॉलिसी डाउनलोड करें',
    noPolicy: 'कोई पॉलिसी विवरण उपलब्ध नहीं',
  },
}

const formatCurrency = (amount: number, language: Language) =>
  new Intl.NumberFormat(language === 'hi' ? 'hi-IN' : 'en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)

const formatDate = (iso: string, language: Language) =>
  new Date(iso).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

export interface DriverInsuranceModalProps {
  isOpen: boolean
  driver: Driver | null
  onClose: () => void
}

export function DriverInsuranceModal({ isOpen, driver, onClose }: DriverInsuranceModalProps) {
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'showOverlay' }, '*')
    }
    return () => {
      window.removeEventListener('keydown', onKey)
      if (window.parent !== window) {
        window.parent.postMessage({ type: 'hideOverlay' }, '*')
      }
    }
  }, [isOpen, onClose])

  if (!isOpen || !driver) return null

  const policy = driver.insurancePolicy

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.title}
        className="relative w-full max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl my-auto overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-50">
            {t.title}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 inline-flex items-center justify-center rounded-full border border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            aria-label={t.close}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!policy ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-stone-500 dark:text-stone-400">{t.noPolicy}</p>
          </div>
        ) : (
          <div className="px-4 sm:px-5 py-5">
            {/* Insurance Card */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white shadow-lg shadow-emerald-900/20">
              {/* Decorative circles */}
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
              <div className="absolute -bottom-16 -left-10 w-44 h-44 rounded-full bg-white/5 pointer-events-none" />

              <div className="relative px-5 sm:px-6 py-4">
                {/* Top: insurer + active badge */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur-sm flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-white leading-tight">
                      {policy.insurer}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-white/15 backdrop-blur-sm text-white ring-1 ring-white/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-300" />
                    {t.active}
                  </span>
                </div>

                {/* Policy number */}
                <div className="mt-3">
                  <p className="text-[10px] uppercase tracking-wider text-emerald-100/70 font-medium">
                    {t.policyNumber}
                  </p>
                  <p className="mt-0.5 font-mono text-sm font-bold text-white break-all">
                    {policy.policyNumber}
                  </p>
                </div>

                {/* Sum Insured */}
                <div className="mt-3">
                  <p className="text-[10px] uppercase tracking-wider text-emerald-100/70 font-medium">
                    {t.sumInsured}
                  </p>
                  <p className="mt-0.5 text-2xl font-bold text-white tabular-nums">
                    {formatCurrency(policy.sumInsured, language)}
                  </p>
                </div>

                {/* Divider with dashed line */}
                <div className="mt-3 border-t border-dashed border-white/25" />

                {/* Validity */}
                <div className="mt-3 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-emerald-100/70 font-medium">
                      {t.validFrom}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-white">
                      {formatDate(policy.startDate, language)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-emerald-100/70 font-medium">
                      {t.validTill}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-white">
                      {formatDate(policy.endDate, language)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Insured & Nominee details */}
            <div className="mt-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/40 divide-y divide-stone-200 dark:divide-stone-800">
              <div className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center">
                    <User className="w-4 h-4 text-stone-500 dark:text-stone-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-medium">
                      {t.insuredPerson}
                    </p>
                    <p className="text-sm font-semibold text-stone-900 dark:text-stone-50 mt-0.5 truncate">
                      {driver.name}
                    </p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-medium">
                      {t.driverPhone}
                    </p>
                    <p className="text-xs font-mono text-stone-700 dark:text-stone-300 mt-0.5">
                      {driver.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-medium">
                      {t.licenseNumber}
                    </p>
                    <p className="text-xs font-mono text-stone-700 dark:text-stone-300 mt-0.5 truncate">
                      {driver.licenseNumber}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <p className="text-[10px] uppercase tracking-wider text-stone-500 dark:text-stone-400 font-medium">
                  {t.nominee}
                </p>
                <div className="mt-1 flex items-baseline justify-between gap-3">
                  <p className="text-sm font-semibold text-stone-900 dark:text-stone-50 truncate">
                    {policy.nominee}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {policy.nomineeRelation}
                  </p>
                </div>
              </div>
            </div>

            {/* Download button */}
            <button
              type="button"
              className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-800 text-sm font-semibold transition-colors"
            >
              <Download className="w-4 h-4" />
              {t.downloadPolicy}
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
