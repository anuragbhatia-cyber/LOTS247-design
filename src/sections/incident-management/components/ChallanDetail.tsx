import { useState, useRef } from 'react'
import {
  ArrowLeft,
  CreditCard,
  Scale,
  ArrowUpRight,
  Download,
  RotateCcw,
  AlertTriangle,
  Clock,
  CheckCircle2,
  XCircle,
  Pause,
  FileText,
  MapPin,
  Truck,
  User,
  Calendar,
  Hash,
  Send,
  Info,
  MessageSquare,
  Activity,
  Zap,
  FileBarChart,
  Paperclip,
  Upload,
  Eye,
  X,
  FilePlus,
} from 'lucide-react'
import type {
  ChallanDetailProps,
  ChallanStatus,
  ChallanActivity,
  Comment,
} from '@/../product/sections/incident-management/types'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Back button
    backToChallans: 'Back to Challans',

    // Status labels
    statusSubmitted: 'Submitted',
    statusInProgress: 'In Progress',
    statusResolved: 'Resolved',
    statusOnHold: 'On Hold',
    statusNotSettled: 'Not Settled',

    // Tabs
    tabOverview: 'Overview',
    tabDocuments: 'Documents',
    tabDocumentsShort: 'Docs',
    tabComments: 'Follow-up',
    tabCommentsShort: 'Follow-up',
    tabReport: 'Reports',
    noReportYet: 'No report generated yet',

    // SLA
    slaTitle: '45-Day SLA',
    slaCompleted: 'Completed',
    slaBreached: 'Breached',
    slaOverdue: 'overdue',
    slaRemaining: 'remaining',
    slaCreated: 'Created',
    slaDeadline: 'Deadline',
    slaBreachedMessage: 'SLA has been breached. You are eligible to request a refund.',

    // Section card titles
    challanDetails: 'Challan Details',
    timeline: 'Timeline',
    comments: 'Follow-up',

    // Detail row labels
    vehicle: 'Vehicle',
    driver: 'Driver',
    issueDate: 'Issue Date',
    location: 'Location',
    violation: 'Offence',
    paymentRef: 'Payment Ref',

    // Actions
    actions: 'Actions',
    payNow: 'Pay Now',
    dispute: 'Dispute',
    escalateToCase: 'Escalate to Case',
    downloadReceipt: 'Download Receipt',
    requestRefund: 'Request Refund',
    resolvedNoActions: 'This challan has been resolved. No actions available.',
    notSettledContact: 'This challan could not be settled. Please contact support for next steps.',

    // Created label in header
    created: 'Created',

    // Timeline
    noActivityYet: 'No activity yet',

    // Comments
    noCommentsYet: 'No follow-ups yet. Start the conversation below.',
    support: 'Support',
    typeMessage: 'Type a message...',
    enterToSend: 'Press Enter to send, Shift+Enter for new line',
  },
  hi: {
    // Back button
    backToChallans: 'चालानों पर वापस',

    // Status labels
    statusSubmitted: 'जमा किया गया',
    statusInProgress: 'प्रगति में',
    statusResolved: 'हल किया गया',
    statusOnHold: 'रोक पर',
    statusNotSettled: 'निपटारा नहीं',

    // Tabs
    tabOverview: 'अवलोकन',
    tabDocuments: 'दस्तावेज़',
    tabDocumentsShort: 'दस्तावेज़',
    tabComments: 'फॉलो-अप',
    tabCommentsShort: 'फॉलो-अप',
    tabReport: 'रिपोर्ट',
    noReportYet: 'अभी कोई रिपोर्ट नहीं बनी',

    // SLA
    slaTitle: '45-दिन SLA',
    slaCompleted: 'पूर्ण',
    slaBreached: 'उल्लंघन',
    slaOverdue: 'अतिदेय',
    slaRemaining: 'शेष',
    slaCreated: 'बनाया गया',
    slaDeadline: 'समय सीमा',
    slaBreachedMessage: 'SLA का उल्लंघन हो गया है। आप रिफंड का अनुरोध करने के पात्र हैं।',

    // Section card titles
    challanDetails: 'चालान विवरण',
    timeline: 'समयरेखा',
    comments: 'फॉलो-अप',

    // Detail row labels
    vehicle: 'वाहन',
    driver: 'ड्राइवर',
    issueDate: 'जारी करने की तारीख',
    location: 'स्थान',
    violation: 'उल्लंघन',
    paymentRef: 'भुगतान संदर्भ',

    // Actions
    actions: 'कार्रवाई',
    payNow: 'अभी भुगतान करें',
    dispute: 'विवाद करें',
    escalateToCase: 'केस में बढ़ाएँ',
    downloadReceipt: 'रसीद डाउनलोड करें',
    requestRefund: 'रिफंड का अनुरोध करें',
    resolvedNoActions: 'इस चालान का समाधान हो गया है। कोई कार्रवाई उपलब्ध नहीं।',
    notSettledContact: 'इस चालान का निपटारा नहीं हो सका। अगले कदमों के लिए कृपया सहायता से संपर्क करें।',

    // Created label in header
    created: 'बनाया गया',

    // Timeline
    noActivityYet: 'अभी कोई गतिविधि नहीं',

    // Comments
    noCommentsYet: 'अभी कोई फॉलो-अप नहीं। नीचे बातचीत शुरू करें।',
    support: 'सहायता',
    typeMessage: 'संदेश लिखें...',
    enterToSend: 'भेजने के लिए Enter दबाएँ, नई लाइन के लिए Shift+Enter',
  },
}

// ---------------------------------------------------------------------------
// Status config
// ---------------------------------------------------------------------------

const STATUS_STYLE: Record<
  ChallanStatus,
  { labelKey: string; bg: string; text: string; border: string; icon: typeof Clock }
> = {
  submitted: {
    labelKey: 'statusSubmitted',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
    icon: FileText,
  },
  inProgress: {
    labelKey: 'statusInProgress',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800',
    icon: Clock,
  },
  resolved: {
    labelKey: 'statusResolved',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
    icon: CheckCircle2,
  },
  onHold: {
    labelKey: 'statusOnHold',
    bg: 'bg-stone-100 dark:bg-stone-800/60',
    text: 'text-stone-600 dark:text-stone-300',
    border: 'border-stone-300 dark:border-stone-700',
    icon: Pause,
  },
  notSettled: {
    labelKey: 'statusNotSettled',
    bg: 'bg-red-50 dark:bg-red-950/40',
    text: 'text-red-700 dark:text-red-300',
    border: 'border-red-200 dark:border-red-800',
    icon: XCircle,
  },
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

function formatDate(dateStr: string, lang: Language): string {
  const locale = lang === 'hi' ? 'hi-IN' : 'en-IN'
  return new Date(dateStr).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatDateTime(dateStr: string, lang: Language): string {
  const locale = lang === 'hi' ? 'hi-IN' : 'en-IN'
  return new Date(dateStr).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getSlaData(
  slaDeadline: string,
  createdAt: string,
  status: ChallanStatus,
  t: Record<string, string>,
) {
  if (status === 'resolved') {
    return { percent: 100, label: t.slaCompleted, color: 'emerald', breached: false, daysLeft: 0 }
  }

  const now = new Date()
  const deadline = new Date(slaDeadline)
  const created = new Date(createdAt)

  const totalMs = deadline.getTime() - created.getTime()
  const elapsedMs = now.getTime() - created.getTime()
  const percent = Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100))
  const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  if (daysLeft < 0) {
    return { percent: 100, label: `${Math.abs(daysLeft)} days overdue`, color: 'red', breached: true, daysLeft }
  }
  if (percent >= 80) {
    return { percent, label: `${daysLeft} days remaining`, color: 'amber', breached: false, daysLeft }
  }
  return { percent, label: `${daysLeft} days remaining`, color: 'emerald', breached: false, daysLeft }
}

// ---------------------------------------------------------------------------
// Shared: Card wrapper with optional header
// ---------------------------------------------------------------------------

function SectionCard({
  title,
  icon: Icon,
  count,
  action,
  children,
}: {
  title?: string
  icon?: typeof Activity
  count?: number
  action?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
      {title && (
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="w-4 h-4 text-stone-400 dark:text-stone-500" />}
            <h3 className="text-sm font-semibold text-stone-700 dark:text-stone-300">
              {title}
            </h3>
            {count !== undefined && count > 0 && (
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400">
                {count}
              </span>
            )}
          </div>
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Shared: Detail row
// ---------------------------------------------------------------------------

function DetailRow({
  icon: Icon,
  label,
  value,
  subValue,
}: {
  icon: typeof Truck
  label: string
  value: string
  subValue?: string
}) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <div className="w-8 h-8 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-stone-500 dark:text-stone-400" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-medium text-stone-900 dark:text-stone-100">
          {value}
        </p>
        {subValue && (
          <p className="text-xs text-stone-500 dark:text-stone-400">
            {subValue}
          </p>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Timeline helpers
// ---------------------------------------------------------------------------

function formatTimeOnly(dateStr: string, lang: Language): string {
  const locale = lang === 'hi' ? 'hi-IN' : 'en-IN'
  return new Date(dateStr).toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function groupActivitiesByDate(activities: ChallanActivity[], lang: Language) {
  const groups: Record<string, ChallanActivity[]> = {}
  const locale = lang === 'hi' ? 'hi-IN' : 'en-IN'
  const sorted = [...activities].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
  for (const activity of sorted) {
    const dateKey = new Date(activity.timestamp).toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
    if (!groups[dateKey]) groups[dateKey] = []
    groups[dateKey].push(activity)
  }
  return groups
}

function getActivityIcon(actionType: string) {
  switch (actionType) {
    case 'statusChange':
      return {
        icon: Info,
        bg: 'bg-blue-50 dark:bg-blue-950/40',
        color: 'text-blue-600 dark:text-blue-400',
      }
    case 'paymentAttempt':
      return {
        icon: CreditCard,
        bg: 'bg-emerald-50 dark:bg-emerald-950/40',
        color: 'text-emerald-600 dark:text-emerald-400',
      }
    case 'lawyerAssigned':
      return {
        icon: User,
        bg: 'bg-purple-50 dark:bg-purple-950/40',
        color: 'text-purple-600 dark:text-purple-400',
      }
    case 'note':
      return {
        icon: FileText,
        bg: 'bg-amber-50 dark:bg-amber-950/40',
        color: 'text-amber-600 dark:text-amber-400',
      }
    default:
      return {
        icon: Activity,
        bg: 'bg-stone-100 dark:bg-stone-800',
        color: 'text-stone-500 dark:text-stone-400',
      }
  }
}

// ---------------------------------------------------------------------------
// Timeline
// ---------------------------------------------------------------------------

const CHALLAN_ACTIVITY_HEADING: Record<string, string> = {
  statusChange: 'Status Update',
  paymentAttempt: 'Payment Received',
  lawyerAssigned: 'Lawyer Assigned',
  note: 'Note',
}

function Timeline({ activities, t, lang }: { activities: ChallanActivity[]; t: Record<string, string>; lang: Language }) {
  const sorted = [...activities].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  if (sorted.length === 0) {
    return (
      <div className="py-10 text-center">
        <Activity className="w-7 h-7 mx-auto mb-2.5 text-stone-300 dark:text-stone-600" />
        <p className="text-sm text-stone-500 dark:text-stone-400">{t.noActivityYet}</p>
      </div>
    )
  }

  return (
    <div>
      {sorted.map((activity, index) => (
        <div key={activity.id} className="flex gap-4">
          {/* Dot + connecting line */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-emerald-500 dark:bg-emerald-400 mt-1.5 flex-shrink-0" />
            {index < sorted.length - 1 && (
              <div className="flex-1 w-px bg-stone-200 dark:bg-stone-700 my-1" />
            )}
          </div>
          {/* Content */}
          <div className="pb-5 min-w-0">
            <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 leading-snug">
              {CHALLAN_ACTIVITY_HEADING[activity.actionType] ?? 'Update'}
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
              {activity.notes}
            </p>
            <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
              {formatDate(activity.timestamp, lang)}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Tab types
// ---------------------------------------------------------------------------

type TabId = 'overview' | 'documents' | 'comments' | 'report'

// ---------------------------------------------------------------------------
// SLA Progress
// ---------------------------------------------------------------------------

function SlaProgress({
  slaDeadline,
  createdAt,
  status,
  t,
  lang,
}: {
  slaDeadline: string
  createdAt: string
  status: ChallanStatus
  t: Record<string, string>
  lang: Language
}) {
  const sla = getSlaData(slaDeadline, createdAt, status, t)

  const barColor =
    sla.color === 'red'
      ? 'bg-red-500'
      : sla.color === 'amber'
      ? 'bg-amber-500'
      : 'bg-emerald-500'

  const trackColor =
    sla.color === 'red'
      ? 'bg-red-100 dark:bg-red-950/40'
      : sla.color === 'amber'
      ? 'bg-amber-100 dark:bg-amber-950/40'
      : 'bg-emerald-100 dark:bg-emerald-950/40'

  const textColor =
    sla.color === 'red'
      ? 'text-red-600 dark:text-red-400'
      : sla.color === 'amber'
      ? 'text-amber-600 dark:text-amber-400'
      : 'text-emerald-600 dark:text-emerald-400'

  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2">
          <Clock className={`w-4 h-4 ${textColor}`} />
          <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
            {t.slaTitle}
          </span>
        </div>
        <span className={`text-sm font-semibold ${textColor}`}>{sla.label}</span>
      </div>

      <div className={`h-2 rounded-full ${trackColor} overflow-hidden`}>
        <div
          className={`h-full rounded-full ${barColor} transition-all duration-500`}
          style={{ width: `${sla.percent}%` }}
        />
      </div>

      <div className="flex items-center justify-between mt-1.5">
        <span className="text-[11px] text-stone-500 dark:text-stone-400">
          {t.slaCreated} {formatDate(createdAt, lang)}
        </span>
        <span className="text-[11px] text-stone-500 dark:text-stone-400">
          {t.slaDeadline} {formatDate(slaDeadline, lang)}
        </span>
      </div>

      {sla.breached && (
        <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
          <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-xs text-red-700 dark:text-red-300">
            {t.slaBreachedMessage}
          </p>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

function Actions({
  challan,
  sla,
  t,
  onPay,
  onDispute,
  onEscalateToCase,
  onDownloadReceipt,
  onRequestRefund,
}: {
  challan: ChallanDetailProps['challan']
  sla: ReturnType<typeof getSlaData>
  t: Record<string, string>
  onPay?: () => void
  onDispute?: () => void
  onEscalateToCase?: () => void
  onDownloadReceipt?: () => void
  onRequestRefund?: () => void
}) {
  const isActive = challan.status === 'submitted' || challan.status === 'inProgress'

  const hasActions =
    isActive ||
    (challan.status === 'resolved' && challan.paymentReference) ||
    (sla.breached && challan.status !== 'resolved')

  if (!hasActions) {
    const msg =
      challan.status === 'resolved'
        ? t.resolvedNoActions
        : t.notSettledContact
    return (
      <p className="text-sm text-stone-500 dark:text-stone-400 py-1">{msg}</p>
    )
  }

  return (
    <div className="flex flex-wrap gap-2.5">
      {isActive && (
        <button
          onClick={onPay}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
        >
          <CreditCard className="w-4 h-4" />
          {t.payNow}
        </button>
      )}
      {isActive && (
        <button
          onClick={onDispute}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-sm font-semibold transition-colors"
        >
          <Scale className="w-4 h-4" />
          {t.dispute}
        </button>
      )}
      {isActive && (
        <button
          onClick={onEscalateToCase}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-sm font-semibold transition-colors"
        >
          <ArrowUpRight className="w-4 h-4" />
          {t.escalateToCase}
        </button>
      )}
      {challan.status === 'resolved' && challan.paymentReference && (
        <button
          onClick={onDownloadReceipt}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-sm font-semibold transition-colors"
        >
          <Download className="w-4 h-4" />
          {t.downloadReceipt}
        </button>
      )}
      {sla.breached && challan.status !== 'resolved' && (
        <button
          onClick={onRequestRefund}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-950/60 text-red-700 dark:text-red-300 text-sm font-semibold transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          {t.requestRefund}
        </button>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Overview Tab
// ---------------------------------------------------------------------------

function OverviewTab({
  challan,
  vehicle,
  driver,
  sla,
  t,
  lang,
  onPay,
  onDispute,
  onEscalateToCase,
  onDownloadReceipt,
  onRequestRefund,
}: {
  challan: ChallanDetailProps['challan']
  vehicle: ChallanDetailProps['vehicle']
  driver: ChallanDetailProps['driver']
  sla: ReturnType<typeof getSlaData>
  t: Record<string, string>
  lang: Language
  onPay?: () => void
  onDispute?: () => void
  onEscalateToCase?: () => void
  onDownloadReceipt?: () => void
  onRequestRefund?: () => void
}) {
  return (
    <div className="space-y-6">
      {/* Amount */}
      <div>
        <span className="text-3xl font-bold text-stone-900 dark:text-stone-50 tabular-nums tracking-tight">
          {formatCurrency(challan.amount)}
        </span>
      </div>

      {/* Detail fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-0 pt-2 border-t border-stone-200 dark:border-stone-800">
        <DetailRow
          icon={Truck}
          label={t.vehicle}
          value={vehicle.registrationNumber}
          subValue={`${vehicle.type} · ${vehicle.model}`}
        />
        {driver && (
          <DetailRow
            icon={User}
            label={t.driver}
            value={driver.name}
            subValue={driver.licenseNumber}
          />
        )}
        <DetailRow
          icon={Calendar}
          label={t.issueDate}
          value={formatDate(challan.issueDate, lang)}
        />
        <DetailRow
          icon={MapPin}
          label={t.location}
          value={challan.location}
        />
        <DetailRow
          icon={Hash}
          label={t.violation}
          value={challan.violationType}
        />
        {challan.paymentReference && (
          <DetailRow
            icon={CreditCard}
            label={t.paymentRef}
            value={challan.paymentReference}
          />
        )}
      </div>

    </div>
  )
}

// ---------------------------------------------------------------------------
// Comments Tab
// ---------------------------------------------------------------------------

function CommentsTab({
  comments,
  t,
  lang,
  onAddComment,
}: {
  comments: Comment[]
  t: Record<string, string>
  lang: Language
  onAddComment?: (message: string) => void
}) {
  const [newMessage, setNewMessage] = useState('')

  const handleSubmit = () => {
    if (newMessage.trim() && onAddComment) {
      onAddComment(newMessage.trim())
      setNewMessage('')
    }
  }

  return (
    <div>
      {comments.length === 0 ? (
        <div className="py-10 text-center">
          <MessageSquare className="w-7 h-7 mx-auto mb-2.5 text-stone-300 dark:text-stone-600" />
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {t.noCommentsYet}
          </p>
        </div>
      ) : (
        <div className="space-y-0.5 mb-4">
          {comments.map((comment) => {
            const isUser = comment.authorType === 'user'
            return (
              <div
                key={comment.id}
                className="px-3.5 py-3 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${
                      isUser
                        ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300'
                        : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
                    }`}
                  >
                    {isUser ? 'Y' : 'S'}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                        {comment.authorName}
                      </span>
                      {!isUser && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                          {t.support}
                        </span>
                      )}
                      <span className="text-[11px] text-stone-500 dark:text-stone-400">
                        {formatDateTime(comment.createdAt, lang)}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                      {comment.message}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
        <div className="flex items-end gap-2.5">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit()
              }
            }}
            placeholder={t.typeMessage}
            rows={2}
            className="flex-1 px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 resize-none transition-colors"
          />
          <button
            onClick={handleSubmit}
            disabled={!newMessage.trim()}
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-200 dark:disabled:bg-stone-700 disabled:cursor-not-allowed text-white disabled:text-stone-400 dark:disabled:text-stone-500 transition-colors flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[11px] text-stone-500 dark:text-stone-400 mt-1.5">
          {t.enterToSend}
        </p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Documents Section
// ---------------------------------------------------------------------------

const SAMPLE_DOCS = [
  { id: 'd1', name: 'Challan Notice.pdf', size: '124 KB', color: 'text-red-500 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/30' },
  { id: 'd2', name: 'Vehicle Registration.pdf', size: '89 KB', color: 'text-red-500 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/30' },
  { id: 'd3', name: 'Driver License Copy.jpg', size: '312 KB', color: 'text-blue-500 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/30' },
]

function UploadDocumentModal({ onClose }: { onClose: () => void }) {
  const [dragOver, setDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files?.[0]
    if (file) setSelectedFile(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setSelectedFile(file)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <FilePlus className="w-4 h-4 text-stone-500 dark:text-stone-400" />
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">Upload Document</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`flex flex-col items-center justify-center gap-3 px-6 py-10 rounded-xl border-2 border-dashed cursor-pointer transition-colors ${
              dragOver
                ? 'border-emerald-400 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30'
                : selectedFile
                ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/20'
                : 'border-stone-300 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-800/30'
            }`}
          >
            {selectedFile ? (
              <>
                <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{selectedFile.name}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    {(selectedFile.size / 1024).toFixed(0)} KB
                  </p>
                </div>
                <p className="text-xs text-stone-500 dark:text-stone-400">Click to change file</p>
              </>
            ) : (
              <>
                <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                  <Upload className="w-5 h-5 text-stone-400 dark:text-stone-500" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                    Drop file here or <span className="text-emerald-600 dark:text-emerald-400">browse</span>
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    PDF, JPG, PNG up to 10 MB
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 px-5 py-4 border-t border-stone-200 dark:border-stone-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-sm font-medium text-stone-700 dark:text-stone-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            disabled={!selectedFile}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-200 dark:disabled:bg-stone-700 disabled:cursor-not-allowed text-white disabled:text-stone-400 dark:disabled:text-stone-500 text-sm font-semibold transition-colors"
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  )
}

function DocumentsSection() {
  const [showUpload, setShowUpload] = useState(false)

  return (
    <>
      <SectionCard
        title="Documents"
        icon={Paperclip}
        count={SAMPLE_DOCS.length}
        action={
          <button
            onClick={() => setShowUpload(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-sm font-medium text-stone-700 dark:text-stone-300 transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            Upload
          </button>
        }
      >
        <div className="space-y-1.5">
          {SAMPLE_DOCS.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors group"
            >
              <div className={`w-9 h-9 rounded-lg ${doc.bg} flex items-center justify-center flex-shrink-0`}>
                <FileText className={`w-4 h-4 ${doc.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate">
                  {doc.name}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">{doc.size}</p>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                <button className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700">
                  <Eye className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-700">
                  <Download className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </SectionCard>

      {showUpload && <UploadDocumentModal onClose={() => setShowUpload(false)} />}
    </>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function ChallanDetail({
  challan,
  vehicle,
  driver,
  comments,
  activities,
  onPay,
  onDispute,
  onEscalateToCase,
  onDownloadReceipt,
  onRequestRefund,
  onAddComment,
  onBack,
}: ChallanDetailProps) {
  const initialTab = (() => {
    const params = new URLSearchParams(window.location.search)
    const t2 = params.get('tab')
    if (t2 === 'comments' || t2 === 'documents' || t2 === 'report' || t2 === 'overview') return t2 as TabId
    return 'overview' as TabId
  })()
  const [activeTab, setActiveTab] = useState<TabId>(initialTab)
  const { language } = useLanguage()
  const t = translations[language]

  const statusStyle = STATUS_STYLE[challan.status]
  const StatusIcon = statusStyle.icon
  const statusLabel = t[statusStyle.labelKey]
  const sla = getSlaData(challan.slaDeadline, challan.createdAt, challan.status, t)

  const tabs: { id: TabId; label: string; shortLabel: string; icon: typeof Activity }[] = [
    { id: 'overview', label: t.tabOverview, shortLabel: t.tabOverview, icon: Info },
    { id: 'comments', label: t.tabComments, shortLabel: t.tabCommentsShort, icon: MessageSquare },
    { id: 'report', label: t.tabReport, shortLabel: t.tabReport, icon: FileBarChart },
    { id: 'documents', label: t.tabDocuments, shortLabel: t.tabDocumentsShort, icon: Paperclip },
  ]

  const tabCounts: Record<TabId, number> = {
    overview: 0,
    documents: SAMPLE_DOCS.length,
    comments: comments.length,
    report: 0,
  }

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
      <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-10">

        {/* Hero Header Card */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden mb-6">
          <div className="p-5 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              {/* Left: Challan Info */}
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-5">
                  {/* Back Arrow */}
                  <button
                    onClick={onBack}
                    className="mt-1 p-2 -ml-1 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex-shrink-0"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  {/* Challan Icon */}
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${statusStyle.bg}`}>
                    <StatusIcon className={`w-4 h-4 ${statusStyle.text}`} />
                  </div>

                  {/* ID + Badges */}
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 font-mono tracking-tight">
                        {challan.displayId}
                      </h1>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusLabel}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                      {challan.location} · {t.created} {formatDate(challan.createdAt, language)}
                    </p>
                  </div>
                </div>

              </div>

              {/* Right: Amount */}
              <div className="flex-shrink-0 lg:text-right">
                <p className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-50 tabular-nums tracking-tight">
                  {formatCurrency(challan.amount)}
                </p>
                <p className={`text-sm font-medium mt-1 ${sla.color === 'red' ? 'text-red-600 dark:text-red-400' : sla.color === 'amber' ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                  {sla.label}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-stone-200/40 dark:bg-stone-900 rounded-lg w-fit mb-6 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            const count = tabCounts[tab.id]

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 min-h-11 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-50 shadow-sm'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
                {count > 0 && (
                  <span className={`text-xs tabular-nums px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                      : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* ================================================================= */}
        {/* Tab Content */}
        {/* ================================================================= */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-5 mt-5 items-start">
            <div className="space-y-5">
              <SectionCard title={t.challanDetails} icon={Info}>
                <OverviewTab
                  challan={challan}
                  vehicle={vehicle}
                  driver={driver}
                  sla={sla}
                  t={t}
                  lang={language}
                  onPay={onPay}
                  onDispute={onDispute}
                  onEscalateToCase={onEscalateToCase}
                  onDownloadReceipt={onDownloadReceipt}
                  onRequestRefund={onRequestRefund}
                />
              </SectionCard>
            </div>
            <SectionCard title={t.timeline} icon={Activity} count={activities.length}>
              <Timeline activities={activities} t={t} lang={language} />
            </SectionCard>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="mt-5">
            <DocumentsSection />
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="mt-5">
            <SectionCard title={t.comments} icon={MessageSquare} count={comments.length}>
              <CommentsTab
                comments={comments}
                t={t}
                lang={language}
                onAddComment={onAddComment}
              />
            </SectionCard>
          </div>
        )}

        {activeTab === 'report' && (
          <div className="mt-5">
            <SectionCard title={t.tabReport} icon={FileBarChart}>
              <div className="py-10 text-center">
                <FileBarChart className="w-7 h-7 mx-auto mb-2.5 text-stone-300 dark:text-stone-600" />
                <p className="text-sm text-stone-500 dark:text-stone-400">{t.noReportYet}</p>
              </div>
            </SectionCard>
          </div>
        )}

      </div>
    </div>
  )
}
