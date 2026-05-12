import { useEffect, useRef, useState, type ReactElement } from 'react'
import { createPortal } from 'react-dom'
import {
  X,
  BadgeCheck,
  Scale,
  Gift,
  Info,
  Check,
  Download,
} from 'lucide-react'
import confetti from 'canvas-confetti'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'
import type { ChallanCardData } from './ChallanCard'

const ONLINE_FEE_PER_CHALLAN = 200
const COURT_FEE_PER_CHALLAN = 2000
const PLEDGE_REWARD = 1000

const translations: Record<Language, {
  title: string
  close: string
  payClose: string
  payCloseSub: string
  recommended: string
  instantBenefit: string
  days45: string
  contestWait: string
  contestWaitSub: string
  refundApplicable: string
  days60: string
  pledge: string
  pledgeSub: string
  pledgeReward: string
  pledgeApplied: string
  selectedForSettlement: (n: number) => string
  onlineChallan: string
  courtChallan: string
  convenienceFee: string
  pledgeRewardLine: string
  grandTotal: string
  proceedToPay: string
  rewardApplied: string
  paymentSuccessful: string
  paymentBody: string
  transactionId: string
  date: string
  status: string
  confirmed: string
  downloadReceipt: string
}> = {
  en: {
    title: 'Choose how to settle',
    close: 'Close',
    payClose: 'Pay & Close',
    payCloseSub: 'Instant payment via government portal',
    recommended: 'Recommended',
    instantBenefit: 'Instant Benefit',
    days45: '45 Days Resolution',
    contestWait: 'Contest & Wait',
    contestWaitSub: 'Legal representation to reduce fines',
    refundApplicable: 'Refund Applicable',
    days60: '60 Days Resolution',
    pledge: 'I pledge to follow traffic rules 🤝',
    pledgeSub: 'Take the pledge and earn rewards on your total amount',
    pledgeReward: 'reward for you!',
    pledgeApplied: 'Applied to your payment',
    selectedForSettlement: (n: number) =>
      `${n} ${n === 1 ? 'Challan' : 'Challans'} selected for settlement`,
    onlineChallan: 'Online Challan',
    courtChallan: 'Court Challan',
    convenienceFee: 'Convenience Fee',
    pledgeRewardLine: 'Pledge reward',
    grandTotal: 'Grand Total',
    proceedToPay: 'Proceed To Pay',
    rewardApplied: '₹1,000 reward applied!',
    paymentSuccessful: 'Payment Successful! 🎉',
    paymentBody: 'Your challan payment of {amount} has been processed successfully.',
    transactionId: 'Transaction ID',
    date: 'Date',
    status: 'Status',
    confirmed: 'Confirmed',
    downloadReceipt: 'Download Receipt',
  },
  hi: {
    title: 'निपटान का तरीका चुनें',
    close: 'बंद करें',
    payClose: 'भुगतान करें और बंद करें',
    payCloseSub: 'सरकारी पोर्टल के माध्यम से तत्काल भुगतान',
    recommended: 'अनुशंसित',
    instantBenefit: 'तत्काल लाभ',
    days45: '45 दिन में निपटान',
    contestWait: 'विरोध करें और प्रतीक्षा करें',
    contestWaitSub: 'जुर्माना कम करने के लिए कानूनी प्रतिनिधित्व',
    refundApplicable: 'धन-वापसी लागू',
    days60: '60 दिन में निपटान',
    pledge: 'मैं यातायात नियमों का पालन करने का संकल्प लेता हूँ 🤝',
    pledgeSub: 'संकल्प लें और अपनी कुल राशि पर पुरस्कार पाएं',
    pledgeReward: 'का पुरस्कार आपके लिए!',
    pledgeApplied: 'आपके भुगतान पर लागू',
    selectedForSettlement: (n: number) => `${n} चालान निपटान के लिए चुने गए`,
    onlineChallan: 'ऑनलाइन चालान',
    courtChallan: 'अदालत चालान',
    convenienceFee: 'सुविधा शुल्क',
    pledgeRewardLine: 'संकल्प पुरस्कार',
    grandTotal: 'कुल राशि',
    proceedToPay: 'भुगतान के लिए आगे बढ़ें',
    rewardApplied: '₹1,000 का पुरस्कार लागू!',
    paymentSuccessful: 'भुगतान सफल! 🎉',
    paymentBody: 'आपका चालान भुगतान {amount} सफलतापूर्वक संसाधित हो गया है।',
    transactionId: 'लेन-देन आईडी',
    date: 'दिनांक',
    status: 'स्थिति',
    confirmed: 'पुष्टि',
    downloadReceipt: 'रसीद डाउनलोड करें',
  },
}

const formatAmount = (n: number) => `₹${new Intl.NumberFormat('en-IN').format(n)}`

const formatDate = (d: Date) =>
  d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })

export interface ChallanSettlementModalProps {
  isOpen: boolean
  selectedChallans: ChallanCardData[]
  onClose: () => void
}

export function ChallanSettlementModal({
  isOpen,
  selectedChallans,
  onClose,
}: ChallanSettlementModalProps) {
  const { language } = useLanguage()
  const t = translations[language]
  const [option, setOption] = useState<'payClose' | 'contestWait'>('payClose')
  const [pledged, setPledged] = useState(true)
  const [toast, setToast] = useState<string | null>(null)
  const toastTimerRef = useRef<number | null>(null)
  const [view, setView] = useState<'settle' | 'success'>('settle')
  const [paidAt, setPaidAt] = useState<Date | null>(null)
  const [txnId, setTxnId] = useState('')
  const [paidAmount, setPaidAmount] = useState(0)

  const fireRewardCelebration = () => {
    confetti({
      particleCount: 90,
      spread: 80,
      startVelocity: 38,
      origin: { y: 0.55 },
      colors: ['#f59e0b', '#fbbf24', '#fcd34d', '#10b981', '#34d399'],
      zIndex: 9999,
    })
    setToast(t.rewardApplied)
    if (toastTimerRef.current !== null) window.clearTimeout(toastTimerRef.current)
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2500)
  }

  useEffect(
    () => () => {
      if (toastTimerRef.current !== null) window.clearTimeout(toastTimerRef.current)
    },
    [],
  )

  const handleClose = () => {
    setView('settle')
    setOption('payClose')
    setPledged(true)
    setPaidAt(null)
    setTxnId('')
    setPaidAmount(0)
    onClose()
  }

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  if (!isOpen) return null

  const onlineChallans = selectedChallans.filter((c) => c.challanType === 'online')
  const courtChallans = selectedChallans.filter((c) => c.challanType === 'court')
  const onlineTotal = onlineChallans.reduce((s, c) => s + c.amount, 0)
  const courtTotal = courtChallans.reduce((s, c) => s + c.amount, 0)
  const onlineFee = onlineChallans.length * ONLINE_FEE_PER_CHALLAN
  const courtFee = courtChallans.length * COURT_FEE_PER_CHALLAN
  const subtotal = onlineTotal + courtTotal + onlineFee + courtFee
  const grandTotal = pledged ? Math.max(0, subtotal - PLEDGE_REWARD) : subtotal

  const handleProceed = () => {
    setPaidAmount(grandTotal)
    setPaidAt(new Date())
    setTxnId('TXN' + Math.floor(Math.random() * 9e15 + 1e15).toString())
    setView('success')
    confetti({
      particleCount: 160,
      spread: 100,
      startVelocity: 45,
      origin: { y: 0.35 },
      colors: ['#10b981', '#34d399', '#6ee7b7', '#f59e0b', '#fbbf24', '#fcd34d'],
      zIndex: 9999,
    })
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center overflow-y-auto p-4 sm:p-6">
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70" onClick={handleClose} />

      {/* Toast — sits above the modal */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[110] pointer-events-none"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-sm font-semibold shadow-2xl">
            <Gift className="w-4 h-4 text-amber-300 dark:text-amber-600" />
            {toast}
          </div>
        </div>
      )}

      <div
        role="dialog"
        aria-modal="true"
        aria-label={view === 'success' ? t.paymentSuccessful : t.title}
        className={`relative w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl my-auto max-h-[calc(100vh-3rem)] flex flex-col ${
          view === 'success' ? 'max-w-md' : 'max-w-5xl'
        }`}
      >
        {/* Header — full bar in settle, floating X in success */}
        {view === 'settle' ? (
          <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 rounded-t-2xl">
            <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-50">
              {t.title}
            </h2>
            <button
              onClick={handleClose}
              className="w-8 h-8 inline-flex items-center justify-center rounded-full border border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label={t.close}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 z-10 w-7 h-7 inline-flex items-center justify-center rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 shadow-md transition-colors"
            aria-label={t.close}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}

        {view === 'success' ? (
          <div className="flex-1 overflow-y-auto">
            <SuccessView
              t={t}
              amount={paidAmount}
              txnId={txnId}
              paidAt={paidAt!}
              onClose={handleClose}
            />
          </div>
        ) : (
        <div className="grid lg:grid-cols-5 gap-4 p-4 sm:p-5 flex-1 overflow-y-auto">
          {/* Left column — options */}
          <div className="lg:col-span-3 space-y-4">
            <OptionCard
              Icon={BadgeCheck}
              iconBg="bg-emerald-50 dark:bg-emerald-950/40"
              iconColor="text-emerald-600 dark:text-emerald-400"
              title={t.payClose}
              subtitle={t.payCloseSub}
              tags={[
                { label: t.instantBenefit, tone: 'amber' },
                { label: t.days45, tone: 'blue' },
              ]}
              badge={t.recommended}
              selected={option === 'payClose'}
              onSelect={() => setOption('payClose')}
            />
            <OptionCard
              Icon={Scale}
              iconBg="bg-stone-100 dark:bg-stone-800"
              iconColor="text-stone-600 dark:text-stone-400"
              title={t.contestWait}
              subtitle={t.contestWaitSub}
              tags={[
                { label: t.refundApplicable, tone: 'neutral' },
                { label: t.days60, tone: 'neutral' },
              ]}
              selected={option === 'contestWait'}
              onSelect={() => setOption('contestWait')}
            />

            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pledged}
                  onChange={(e) => {
                    const next = e.target.checked
                    setPledged(next)
                    if (next) fireRewardCelebration()
                  }}
                  className="mt-1 w-5 h-5 rounded border-stone-300 dark:border-stone-700 text-emerald-600 focus:ring-emerald-500/30 cursor-pointer"
                />
                <div>
                  <p className="text-sm font-bold text-stone-900 dark:text-stone-50">
                    {t.pledge}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    {t.pledgeSub}
                  </p>
                </div>
              </label>
              {pledged && (
                <div className="mt-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 px-4 py-3 flex items-center gap-3">
                  <Gift className="w-5 h-5 text-amber-700 dark:text-amber-300 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-bold text-amber-700 dark:text-amber-300">
                      {formatAmount(PLEDGE_REWARD)} {t.pledgeReward}
                    </p>
                    <p className="text-xs text-amber-700/80 dark:text-amber-400/80">
                      {t.pledgeApplied}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right column — summary */}
          <div className="lg:col-span-2 h-full">
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 sm:p-6 h-full flex flex-col">
              <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-50">
                {t.selectedForSettlement(selectedChallans.length)}
              </h3>

              <div className="mt-5 h-px bg-stone-200 dark:bg-stone-800" />

              <div className="mt-5 space-y-3">
                {onlineChallans.length > 0 && (
                  <>
                    <Row
                      bold
                      label={`${t.onlineChallan} (${onlineChallans.length})`}
                      value={formatAmount(onlineTotal)}
                    />
                    <Row
                      muted
                      label={
                        <>
                          {t.convenienceFee}{' '}
                          <span className="text-stone-400 dark:text-stone-500">
                            ({onlineChallans.length} × {ONLINE_FEE_PER_CHALLAN})
                          </span>
                          <Info className="inline w-3.5 h-3.5 ml-1 text-stone-400" />
                        </>
                      }
                      value={formatAmount(onlineFee)}
                    />
                  </>
                )}
                {courtChallans.length > 0 && (
                  <>
                    <Row
                      bold
                      label={`${t.courtChallan} (${courtChallans.length})`}
                      value={formatAmount(courtTotal)}
                    />
                    <Row
                      muted
                      label={
                        <>
                          {t.convenienceFee}{' '}
                          <span className="text-stone-400 dark:text-stone-500">
                            ({courtChallans.length} × {COURT_FEE_PER_CHALLAN})
                          </span>
                          <Info className="inline w-3.5 h-3.5 ml-1 text-stone-400" />
                        </>
                      }
                      value={formatAmount(courtFee)}
                    />
                  </>
                )}
                {pledged && (
                  <Row
                    label={
                      <span className="text-amber-700 dark:text-amber-300 font-medium">
                        {t.pledgeRewardLine}
                      </span>
                    }
                    value={
                      <span className="text-amber-700 dark:text-amber-300">
                        −{formatAmount(PLEDGE_REWARD)}
                      </span>
                    }
                  />
                )}
              </div>

              <div className="mt-auto pt-5">
                <div className="h-px bg-stone-200 dark:bg-stone-800" />
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-lg font-bold text-stone-900 dark:text-stone-50">
                    {t.grandTotal}
                  </span>
                  <span className="text-lg font-bold text-stone-900 dark:text-stone-50 tabular-nums">
                    {formatAmount(grandTotal)}
                  </span>
                </div>

                <button
                  onClick={handleProceed}
                  className="mt-5 w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm sm:text-base font-semibold transition-colors shadow-md shadow-emerald-600/30"
                >
                  {t.proceedToPay} →
                </button>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>,
    document.body,
  )
}

function SuccessView({
  t,
  amount,
  txnId,
  paidAt,
  onClose,
}: {
  t: (typeof translations)['en']
  amount: number
  txnId: string
  paidAt: Date
  onClose: () => void
}) {
  const splitAmount = (template: string, amt: number) =>
    template.split('{amount}').map((part, i, arr) => (
      <span key={i}>
        {part}
        {i < arr.length - 1 && (
          <span className="font-bold text-stone-900 dark:text-stone-50">
            {formatAmount(amt)}
          </span>
        )}
      </span>
    ))

  return (
    <div className="p-5 sm:p-6 w-full">
      {/* Success card */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-5 shadow-sm flex flex-col">
        <div className="flex flex-col items-center text-center">
          <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/40">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="mt-3 text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-50">
            {t.paymentSuccessful}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            {splitAmount(t.paymentBody, amount)}
          </p>
        </div>

        {/* Transaction details */}
        <div className="mt-4 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 divide-y divide-stone-200 dark:divide-stone-800">
          <DetailRow
            label={t.transactionId}
            value={<span className="font-mono text-xs">{txnId}</span>}
          />
          <DetailRow label={t.date} value={formatDate(paidAt)} />
          <DetailRow
            label={t.status}
            value={
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                {t.confirmed}
              </span>
            }
          />
        </div>

        {/* Action */}
        <button
          onClick={() => console.log('Download receipt:', txnId)}
          className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors shadow-sm shadow-emerald-600/30"
        >
          <Download className="w-4 h-4" />
          {t.downloadReceipt}
        </button>
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-3.5 py-2.5 text-xs sm:text-sm">
      <span className="text-stone-500 dark:text-stone-400">{label}</span>
      <span className="text-stone-900 dark:text-stone-50">{value}</span>
    </div>
  )
}

function Row({
  label,
  value,
  bold = false,
  muted = false,
}: {
  label: React.ReactNode
  value: React.ReactNode
  bold?: boolean
  muted?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span
        className={`text-sm ${
          bold
            ? 'font-bold text-stone-900 dark:text-stone-50'
            : muted
            ? 'text-stone-500 dark:text-stone-400'
            : 'text-stone-900 dark:text-stone-50'
        }`}
      >
        {label}
      </span>
      <span
        className={`text-sm tabular-nums ${
          bold
            ? 'font-bold text-stone-900 dark:text-stone-50'
            : muted
            ? 'text-stone-500 dark:text-stone-400'
            : 'text-stone-900 dark:text-stone-50'
        }`}
      >
        {value}
      </span>
    </div>
  )
}

function OptionCard({
  Icon,
  iconBg,
  iconColor,
  title,
  subtitle,
  tags,
  badge,
  selected,
  onSelect,
}: {
  Icon: (props: { className?: string }) => ReactElement
  iconBg: string
  iconColor: string
  title: string
  subtitle: string
  tags: { label: string; tone: 'amber' | 'blue' | 'neutral' }[]
  badge?: string
  selected: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left bg-white dark:bg-stone-900 border rounded-2xl p-5 flex items-start gap-4 transition-colors ${
        selected
          ? 'border-emerald-500 dark:border-emerald-600 ring-1 ring-emerald-500/30'
          : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
      }`}
    >
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBg} ${iconColor}`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-base font-bold text-stone-900 dark:text-stone-50">
            {title}
          </span>
          <Info className="w-3.5 h-3.5 text-stone-400" />
          {badge && (
            <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full">
              <BadgeCheck className="w-3 h-3" />
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{subtitle}</p>
        <div className="mt-3 flex items-center gap-2 flex-wrap">
          {tags.map((tag, i) => (
            <Tag key={i} label={tag.label} tone={tag.tone} />
          ))}
        </div>
      </div>
      <div className="flex-shrink-0">
        <div
          className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
            selected
              ? 'bg-emerald-600 text-white'
              : 'border-2 border-stone-300 dark:border-stone-700'
          }`}
        >
          {selected && <Check className="w-3.5 h-3.5" strokeWidth={3} />}
        </div>
      </div>
    </button>
  )
}

function Tag({ label, tone }: { label: string; tone: 'amber' | 'blue' | 'neutral' }) {
  const cls =
    tone === 'amber'
      ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/30 dark:text-amber-300'
      : tone === 'blue'
      ? 'bg-sky-50 text-sky-700 dark:bg-sky-950/30 dark:text-sky-300'
      : 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300'
  return (
    <span
      className={`inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-full ${cls}`}
    >
      {label}
    </span>
  )
}
