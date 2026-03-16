import { useState } from 'react'
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
} from 'lucide-react'
import type {
  ChallanDetailProps,
  ChallanStatus,
  ChallanActivity,
  Comment,
} from '@/../product/sections/incident-management/types'

// ---------------------------------------------------------------------------
// Status config
// ---------------------------------------------------------------------------

const STATUS_CONFIG: Record<
  ChallanStatus,
  { label: string; bg: string; text: string; border: string; icon: typeof Clock }
> = {
  submitted: {
    label: 'Submitted',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
    icon: FileText,
  },
  inProgress: {
    label: 'In Progress',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800',
    icon: Clock,
  },
  resolved: {
    label: 'Resolved',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
    icon: CheckCircle2,
  },
  onHold: {
    label: 'On Hold',
    bg: 'bg-stone-100 dark:bg-stone-800/60',
    text: 'text-stone-600 dark:text-stone-300',
    border: 'border-stone-300 dark:border-stone-700',
    icon: Pause,
  },
  notSettled: {
    label: 'Not Settled',
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

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getSlaData(slaDeadline: string, createdAt: string, status: ChallanStatus) {
  if (status === 'resolved') {
    return { percent: 100, label: 'Completed', color: 'emerald', breached: false, daysLeft: 0 }
  }

  const now = new Date()
  const deadline = new Date(slaDeadline)
  const created = new Date(createdAt)

  const totalMs = deadline.getTime() - created.getTime()
  const elapsedMs = now.getTime() - created.getTime()
  const percent = Math.min(100, Math.max(0, (elapsedMs / totalMs) * 100))
  const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

  if (daysLeft < 0) {
    return { percent: 100, label: `Breached (${Math.abs(daysLeft)}d overdue)`, color: 'red', breached: true, daysLeft }
  }
  if (percent >= 80) {
    return { percent, label: `${daysLeft}d remaining`, color: 'amber', breached: false, daysLeft }
  }
  return { percent, label: `${daysLeft}d remaining`, color: 'emerald', breached: false, daysLeft }
}

// ---------------------------------------------------------------------------
// Shared: Card wrapper with optional header
// ---------------------------------------------------------------------------

function SectionCard({
  title,
  icon: Icon,
  count,
  children,
}: {
  title?: string
  icon?: typeof Activity
  count?: number
  children: React.ReactNode
}) {
  return (
    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
      {title && (
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-100 dark:border-stone-800">
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
        <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wider">
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

function formatTimeOnly(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function groupActivitiesByDate(activities: ChallanActivity[]) {
  const groups: Record<string, ChallanActivity[]> = {}
  const sorted = [...activities].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )
  for (const activity of sorted) {
    const dateKey = new Date(activity.timestamp).toLocaleDateString('en-IN', {
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

function Timeline({ activities }: { activities: ChallanActivity[] }) {
  const groups = groupActivitiesByDate(activities)

  if (activities.length === 0) {
    return (
      <div className="py-10 text-center">
        <Activity className="w-7 h-7 mx-auto mb-2.5 text-stone-300 dark:text-stone-600" />
        <p className="text-sm text-stone-500 dark:text-stone-400">No activity yet</p>
      </div>
    )
  }

  return (
    <div>
      {Object.entries(groups).map(([dateLabel, items]) => (
        <div key={dateLabel} className="mb-5 last:mb-0">
          <div className="flex items-center gap-3 mb-2.5">
            <span className="text-[11px] font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider whitespace-nowrap">
              {dateLabel}
            </span>
            <div className="flex-1 h-px bg-stone-100 dark:bg-stone-800" />
          </div>

          <div className="space-y-0.5">
            {items.map((activity) => {
              const iconConfig = getActivityIcon(activity.actionType)
              const Icon = iconConfig.icon

              return (
                <div
                  key={activity.id}
                  className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800/30 transition-colors"
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${iconConfig.bg}`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${iconConfig.color}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] text-stone-700 dark:text-stone-300 leading-relaxed">
                      {activity.notes}
                    </p>
                    <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-0.5">
                      {formatTimeOnly(activity.timestamp)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Tab types
// ---------------------------------------------------------------------------

type TabId = 'overview' | 'comments'

const TABS: { id: TabId; label: string; shortLabel: string; icon: typeof Activity }[] = [
  { id: 'overview', label: 'Overview', shortLabel: 'Overview', icon: Info },
  { id: 'comments', label: 'Comments', shortLabel: 'Chat', icon: MessageSquare },
]

// ---------------------------------------------------------------------------
// SLA Progress
// ---------------------------------------------------------------------------

function SlaProgress({
  slaDeadline,
  createdAt,
  status,
}: {
  slaDeadline: string
  createdAt: string
  status: ChallanStatus
}) {
  const sla = getSlaData(slaDeadline, createdAt, status)

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
            45-Day SLA
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
        <span className="text-[11px] text-stone-400 dark:text-stone-500">
          Created {formatDate(createdAt)}
        </span>
        <span className="text-[11px] text-stone-400 dark:text-stone-500">
          Deadline {formatDate(slaDeadline)}
        </span>
      </div>

      {sla.breached && (
        <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
          <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
          <p className="text-xs text-red-700 dark:text-red-300">
            SLA has been breached. You are eligible to request a refund.
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
  onPay,
  onDispute,
  onEscalateToCase,
  onDownloadReceipt,
  onRequestRefund,
}: {
  challan: ChallanDetailProps['challan']
  sla: ReturnType<typeof getSlaData>
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
        ? 'This challan has been resolved. No actions available.'
        : 'This challan could not be settled. Please contact support for next steps.'
    return (
      <p className="text-sm text-stone-400 dark:text-stone-500 py-1">{msg}</p>
    )
  }

  return (
    <div className="flex flex-wrap gap-2.5">
      {isActive && (
        <button
          onClick={onPay}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-colors"
        >
          <CreditCard className="w-4 h-4" />
          Pay Now
        </button>
      )}
      {isActive && (
        <button
          onClick={onDispute}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-sm font-semibold transition-colors"
        >
          <Scale className="w-4 h-4" />
          Dispute
        </button>
      )}
      {isActive && (
        <button
          onClick={onEscalateToCase}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-sm font-semibold transition-colors"
        >
          <ArrowUpRight className="w-4 h-4" />
          Escalate to Case
        </button>
      )}
      {challan.status === 'resolved' && challan.paymentReference && (
        <button
          onClick={onDownloadReceipt}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-sm font-semibold transition-colors"
        >
          <Download className="w-4 h-4" />
          Download Receipt
        </button>
      )}
      {sla.breached && challan.status !== 'resolved' && (
        <button
          onClick={onRequestRefund}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-950/60 text-red-700 dark:text-red-300 text-sm font-semibold transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Request Refund
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
  onPay?: () => void
  onDispute?: () => void
  onEscalateToCase?: () => void
  onDownloadReceipt?: () => void
  onRequestRefund?: () => void
}) {
  return (
    <div className="space-y-5">
      {/* Amount + Violation */}
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-stone-900 dark:text-stone-50 tabular-nums tracking-tight">
            {formatCurrency(challan.amount)}
          </span>
          <span className="text-sm text-stone-400 dark:text-stone-500">
            {challan.violationType}
          </span>
        </div>
      </div>

      {/* Detail fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0 pt-4 border-t border-stone-100 dark:border-stone-800">
        <DetailRow
          icon={Truck}
          label="Vehicle"
          value={vehicle.registrationNumber}
          subValue={`${vehicle.type} · ${vehicle.model}`}
        />
        {driver && (
          <DetailRow
            icon={User}
            label="Driver"
            value={driver.name}
            subValue={driver.licenseNumber}
          />
        )}
        <DetailRow
          icon={Calendar}
          label="Issue Date"
          value={formatDate(challan.issueDate)}
        />
        <DetailRow
          icon={MapPin}
          label="Location"
          value={challan.location}
        />
        <DetailRow
          icon={Hash}
          label="Violation"
          value={challan.violationType}
        />
        {challan.paymentReference && (
          <DetailRow
            icon={CreditCard}
            label="Payment Ref"
            value={challan.paymentReference}
          />
        )}
      </div>

      {/* SLA Progress */}
      <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
        <SlaProgress
          slaDeadline={challan.slaDeadline}
          createdAt={challan.createdAt}
          status={challan.status}
        />
      </div>

      {/* Actions */}
      <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
        <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-3">
          Actions
        </p>
        <Actions
          challan={challan}
          sla={sla}
          onPay={onPay}
          onDispute={onDispute}
          onEscalateToCase={onEscalateToCase}
          onDownloadReceipt={onDownloadReceipt}
          onRequestRefund={onRequestRefund}
        />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Comments Tab
// ---------------------------------------------------------------------------

function CommentsTab({
  comments,
  onAddComment,
}: {
  comments: Comment[]
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
            No comments yet. Start the conversation below.
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
                          Support
                        </span>
                      )}
                      <span className="text-[11px] text-stone-400 dark:text-stone-500">
                        {formatDateTime(comment.createdAt)}
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

      <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
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
            placeholder="Type a message..."
            rows={2}
            className="flex-1 px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 resize-none transition-colors"
          />
          <button
            onClick={handleSubmit}
            disabled={!newMessage.trim()}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:bg-stone-200 dark:disabled:bg-stone-700 disabled:cursor-not-allowed text-white disabled:text-stone-400 dark:disabled:text-stone-500 transition-colors flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-1.5">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
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
  const [activeTab, setActiveTab] = useState<TabId>('overview')

  const statusConfig = STATUS_CONFIG[challan.status]
  const StatusIcon = statusConfig.icon
  const sla = getSlaData(challan.slaDeadline, challan.createdAt, challan.status)

  const tabCounts: Record<TabId, number> = {
    overview: 0,
    comments: comments.length,
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-10">

        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Challans
        </button>

        {/* ================================================================= */}
        {/* Header Card with Tabs */}
        {/* ================================================================= */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
          {/* Top accent */}
          <div
            className={`h-1 ${
              challan.status === 'resolved'
                ? 'bg-emerald-500'
                : challan.status === 'notSettled'
                ? 'bg-red-500'
                : challan.status === 'onHold'
                ? 'bg-stone-400'
                : 'bg-amber-500'
            }`}
          />

          <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-50 font-mono tracking-tight">
                  {challan.displayId}
                </h1>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
                  Created {formatDateTime(challan.createdAt)}
                </p>
              </div>
              <span
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold border self-start ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
              >
                <StatusIcon className="w-4 h-4" />
                {statusConfig.label}
              </span>
            </div>
          </div>

          {/* Tab Bar */}
          <div className="flex border-t border-stone-100 dark:border-stone-800 px-3 sm:px-4">
            {TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              const count = tabCounts[tab.id]

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 sm:px-4 py-3 text-sm font-medium transition-colors relative ${
                    isActive
                      ? 'text-emerald-700 dark:text-emerald-300'
                      : 'text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.shortLabel}</span>
                  {count > 0 && (
                    <span
                      className={`text-[11px] tabular-nums min-w-[18px] text-center px-1 py-0.5 rounded-full leading-none ${
                        isActive
                          ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                  {isActive && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* Tab Content */}
        {/* ================================================================= */}
        {activeTab === 'overview' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5 items-start">
            {/* Left: Challan Details */}
            <SectionCard title="Challan Details" icon={Info}>
              <OverviewTab
                challan={challan}
                vehicle={vehicle}
                driver={driver}
                sla={sla}
                onPay={onPay}
                onDispute={onDispute}
                onEscalateToCase={onEscalateToCase}
                onDownloadReceipt={onDownloadReceipt}
                onRequestRefund={onRequestRefund}
              />
            </SectionCard>

            {/* Right: Timeline */}
            <SectionCard title="Timeline" icon={Activity} count={activities.length}>
              <Timeline activities={activities} />
            </SectionCard>
          </div>
        ) : (
          <div className="mt-5">
            <SectionCard title="Comments" icon={MessageSquare} count={comments.length}>
              <CommentsTab
                comments={comments}
                onAddComment={onAddComment}
              />
            </SectionCard>
          </div>
        )}

      </div>
    </div>
  )
}
