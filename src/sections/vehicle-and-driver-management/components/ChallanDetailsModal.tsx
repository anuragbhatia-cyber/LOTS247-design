import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'
import type { ChallanCardData } from './ChallanCard'

const translations: Record<Language, {
  title: string
  close: string
  violation: string
  date: string
  location: string
  status: string
  pendingSince: string
  paid: string
  onlineChallan: string
  courtChallan: string
  shareWhatsApp: string
}> = {
  en: {
    title: 'Challan Details',
    close: 'Close',
    violation: 'Violation',
    date: 'Date',
    location: 'Location',
    status: 'Status',
    pendingSince: 'Pending since',
    paid: 'Paid',
    onlineChallan: 'ONLINE CHALLAN',
    courtChallan: 'COURT CHALLAN',
    shareWhatsApp: 'Share on WhatsApp',
  },
  hi: {
    title: 'चालान विवरण',
    close: 'बंद करें',
    violation: 'उल्लंघन',
    date: 'दिनांक',
    location: 'स्थान',
    status: 'स्थिति',
    pendingSince: 'लंबित से',
    paid: 'भुगतान किया',
    onlineChallan: 'ऑनलाइन चालान',
    courtChallan: 'अदालत चालान',
    shareWhatsApp: 'व्हाट्सएप पर साझा करें',
  },
}

const formatAmount = (amt: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amt)

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

const pendingSinceLabel = (issueDate: string): string => {
  const issued = new Date(issueDate).getTime()
  const now = Date.now()
  const months = Math.max(0, Math.round((now - issued) / (1000 * 60 * 60 * 24 * 30.44)))
  if (months <= 0) {
    const days = Math.max(1, Math.round((now - issued) / (1000 * 60 * 60 * 24)))
    return `${days} ${days === 1 ? 'day' : 'days'}`
  }
  if (months < 12) return `${months} ${months === 1 ? 'month' : 'months'}`
  const years = Math.floor(months / 12)
  const remMonths = months % 12
  if (remMonths === 0) return `${years} ${years === 1 ? 'year' : 'years'}`
  return `${years}y ${remMonths}m`
}

export interface ChallanDetailsModalProps {
  isOpen: boolean
  challan: ChallanCardData | null
  onClose: () => void
}

export function ChallanDetailsModal({ isOpen, challan, onClose }: ChallanDetailsModalProps) {
  const { language } = useLanguage()
  const t = translations[language]

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    // Tell the embedding shell (if any) to dim its chrome behind our modal.
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

  if (!isOpen || !challan) return null

  const isPending = challan.status === 'pending'
  const isCourt = challan.challanType === 'court'

  const handleShare = () => {
    const lines = [
      `Challan #${challan.challanNumber}`,
      `Violation: ${challan.violationType}`,
      `Amount: ${formatAmount(challan.amount)}`,
      `Date: ${formatDate(challan.issueDate)}`,
      `Location: ${challan.location}`,
      isPending
        ? `Status: ${t.pendingSince} ${pendingSinceLabel(challan.issueDate)}`
        : `Status: ${t.paid}`,
    ]
    const url = `https://wa.me/?text=${encodeURIComponent(lines.join('\n'))}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

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
        <div className="flex items-center justify-between px-6 py-4">
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

        {/* Ticket body with scalloped top edge */}
        <div className="px-4 pb-5">
          <div className="relative rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 overflow-hidden">
            {/* Zigzag top edge — outer-bg-colored sawtooth bites into the ticket */}
            <svg
              aria-hidden="true"
              viewBox="0 0 200 8"
              preserveAspectRatio="none"
              className="absolute top-0 inset-x-0 w-full h-2.5 pointer-events-none"
            >
              <path
                d="M0,0 H200 V4 L196,8 L192,4 L188,8 L184,4 L180,8 L176,4 L172,8 L168,4 L164,8 L160,4 L156,8 L152,4 L148,8 L144,4 L140,8 L136,4 L132,8 L128,4 L124,8 L120,4 L116,8 L112,4 L108,8 L104,4 L100,8 L96,4 L92,8 L88,4 L84,8 L80,4 L76,8 L72,4 L68,8 L64,4 L60,8 L56,4 L52,8 L48,4 L44,8 L40,4 L36,8 L32,4 L28,8 L24,4 L20,8 L16,4 L12,8 L8,4 L4,8 L0,4 Z"
                className="fill-white dark:fill-stone-900"
              />
            </svg>

            <div className="px-5 sm:px-6 pt-7 pb-6">
              {/* Challan number */}
              <div className="font-mono text-sm sm:text-base font-bold text-stone-900 dark:text-stone-50 break-all">
                #{challan.challanNumber}
              </div>

              {/* Amount + type pill */}
              <div className="mt-3 flex items-center justify-between gap-3">
                <span className="text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-50 tabular-nums">
                  {formatAmount(challan.amount)}
                </span>
                <span
                  className={`text-[10px] sm:text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full whitespace-nowrap ${
                    isCourt
                      ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 ring-1 ring-amber-200 dark:ring-amber-800'
                      : 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 ring-1 ring-sky-200 dark:ring-sky-800'
                  }`}
                >
                  {isCourt ? t.courtChallan : t.onlineChallan}
                </span>
              </div>

              <div className="mt-5 h-px bg-stone-200 dark:bg-stone-800" />

              <Field label={t.violation} value={challan.violationType} />
              <Field label={t.date} value={formatDate(challan.issueDate)} />
              <Field label={t.location} value={challan.location} />

              <div className="mt-5">
                <div className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                  {t.status}
                </div>
                <div
                  className={`mt-1 text-base font-semibold ${
                    isPending
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-emerald-700 dark:text-emerald-400'
                  }`}
                >
                  {isPending
                    ? `${t.pendingSince} ${pendingSinceLabel(challan.issueDate)}`
                    : t.paid}
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="mt-4 w-full inline-flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm sm:text-base font-semibold transition-colors shadow-md shadow-emerald-500/30"
          >
            <WhatsAppIcon className="w-5 h-5" />
            {t.shareWhatsApp}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-5">
      <div className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">{label}</div>
      <div className="mt-1 text-base text-stone-900 dark:text-stone-100">{value}</div>
    </div>
  )
}

function WhatsAppIcon({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z" />
    </svg>
  )
}
