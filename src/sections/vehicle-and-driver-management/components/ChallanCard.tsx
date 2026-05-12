import { Check, Copy, ArrowRight } from 'lucide-react'

export interface ChallanCardData {
  id: string
  challanNumber: string
  violationType: string
  amount: number
  issueDate: string
  location: string
  status: 'pending' | 'submitted' | 'resolved'
  challanType: 'court' | 'online'
}

interface ChallanCardProps {
  challan: ChallanCardData
  selected?: boolean
  onToggleSelect?: (id: string) => void
  onViewDetails?: (id: string) => void
  onCopyNumber?: (number: string) => void
  /** Localized labels — defaults are English */
  labels?: {
    online?: string
    court?: string
    pendingSince?: (text: string) => string
    paid?: string
    viewDetails?: string
  }
}

const formatAmount = (amt: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amt)

const formatDate = (iso: string) => {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

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

export function ChallanCard({
  challan,
  selected = false,
  onToggleSelect,
  onViewDetails,
  onCopyNumber,
  labels = {},
}: ChallanCardProps) {
  const isPending = challan.status === 'pending'
  const isCourt = challan.challanType === 'court'

  const onlineLabel = labels.online ?? 'ONLINE CHALLAN'
  const courtLabel = labels.court ?? 'COURT CHALLAN'
  const paidLabel = labels.paid ?? 'Paid'
  const viewLabel = labels.viewDetails ?? 'View Details'
  const pendingLabelFn = labels.pendingSince ?? ((t: string) => `Pending since ${t}`)

  const typePillClass = isCourt
    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 ring-1 ring-amber-200 dark:ring-amber-800'
    : 'bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 ring-1 ring-sky-200 dark:ring-sky-800'

  return (
    <div
      className={`bg-white dark:bg-stone-900 border rounded-2xl p-5 sm:p-6 flex flex-col gap-3 transition-colors ${
        selected
          ? 'border-emerald-500 dark:border-emerald-600 ring-1 ring-emerald-500/30 dark:ring-emerald-600/40'
          : 'border-stone-200 dark:border-stone-800'
      }`}
    >
      {/* Row 1: challan number + copy | select checkbox */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className="font-mono text-sm text-stone-600 dark:text-stone-400 truncate"
            title={`#${challan.challanNumber}`}
          >
            #{challan.challanNumber}
          </span>
          <button
            onClick={() => onCopyNumber?.(challan.challanNumber)}
            className="p-1 rounded text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex-shrink-0"
            aria-label="Copy challan number"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
        {onToggleSelect && (
          <button
            onClick={() => onToggleSelect(challan.id)}
            role="checkbox"
            aria-checked={selected}
            aria-label={selected ? 'Deselect challan' : 'Select challan'}
            className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
              selected
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'border-2 border-stone-300 dark:border-stone-700 hover:border-emerald-500 dark:hover:border-emerald-600'
            }`}
          >
            {selected && <Check className="w-3 h-3" strokeWidth={3} />}
          </button>
        )}
      </div>

      {/* Row 2: amount | type pill */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-50 tabular-nums">
          {formatAmount(challan.amount)}
        </span>
        <span
          className={`text-[9px] sm:text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full whitespace-nowrap ${typePillClass}`}
        >
          {isCourt ? courtLabel : onlineLabel}
        </span>
      </div>

      {/* Row 3: violation description */}
      <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 line-clamp-2 leading-snug">
        {challan.violationType}
      </p>

      {/* Row 4: date · location */}
      <p className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 truncate">
        {formatDate(challan.issueDate)} · {challan.location}
      </p>

      {/* Divider */}
      <div className="border-t border-stone-200 dark:border-stone-800 mt-1" />

      {/* Row 5: pending-since / paid | view details */}
      <div className="flex items-center justify-between gap-3">
        {isPending ? (
          <span className="text-sm font-medium text-red-600 dark:text-red-400">
            {pendingLabelFn(pendingSinceLabel(challan.issueDate))}
          </span>
        ) : (
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
            {paidLabel}
          </span>
        )}
        <button
          onClick={() => onViewDetails?.(challan.id)}
          className="inline-flex items-center gap-1 text-sm font-medium text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 hover:underline transition-colors"
        >
          {viewLabel}
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
