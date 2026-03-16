import { useState, useRef } from 'react'
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  FileText,
  FileQuestion,
  Timer,
  AlertCircle,
  Scale,
  Car,
  Shield,
  Lock,
  FileWarning,
  Gavel,
  ArrowUpRight,
  Truck,
  User,
  Calendar,
  Briefcase,
  MapPin,
  Upload,
  Download,
  File,
  Send,
  MessageSquare,
  Activity,
  Paperclip,
  UserCheck,
  Info,
  FileDown,
} from 'lucide-react'
import type {
  CaseDetailProps,
  CaseStatus,
  CaseType,
  CaseActivity,
  CaseDocument,
  CaseReport,
  Comment,
} from '@/../product/sections/incident-management/types'

// ---------------------------------------------------------------------------
// Status config
// ---------------------------------------------------------------------------

const STATUS_CONFIG: Record<
  CaseStatus,
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
  documentRequested: {
    label: 'Document Requested',
    bg: 'bg-purple-50 dark:bg-purple-950/40',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800',
    icon: FileQuestion,
  },
  extended: {
    label: 'Extended',
    bg: 'bg-orange-50 dark:bg-orange-950/40',
    text: 'text-orange-700 dark:text-orange-300',
    border: 'border-orange-200 dark:border-orange-800',
    icon: Timer,
  },
}

const CASE_TYPE_ICONS: Record<CaseType, typeof AlertCircle> = {
  Accident: AlertCircle,
  'Vehicle Detention': Lock,
  Theft: Shield,
  'Vehicle Impounding': Car,
  'Insurance Dispute': Scale,
  'Legal Complaint': Gavel,
  'RTO Escalation': FileWarning,
  'Escalated Challan': ArrowUpRight,
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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

function formatTimeOnly(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function groupActivitiesByDate(activities: CaseActivity[]) {
  const groups: Record<string, CaseActivity[]> = {}
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
    case 'lawyerAssigned':
      return {
        icon: UserCheck,
        bg: 'bg-emerald-50 dark:bg-emerald-950/40',
        color: 'text-emerald-600 dark:text-emerald-400',
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
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Shared: Empty state
// ---------------------------------------------------------------------------

function EmptyState({
  icon: Icon,
  message,
}: {
  icon: typeof Activity
  message: string
}) {
  return (
    <div className="py-10 text-center">
      <Icon className="w-7 h-7 mx-auto mb-2.5 text-stone-300 dark:text-stone-600" />
      <p className="text-sm text-stone-500 dark:text-stone-400">{message}</p>
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
// Tab types
// ---------------------------------------------------------------------------

type TabId = 'overview' | 'documents' | 'reports' | 'comments'

const TABS: { id: TabId; label: string; shortLabel: string; icon: typeof Activity }[] = [
  { id: 'overview', label: 'Overview', shortLabel: 'Overview', icon: Info },
  { id: 'documents', label: 'Documents', shortLabel: 'Docs', icon: Paperclip },
  { id: 'reports', label: 'Reports', shortLabel: 'Reports', icon: FileDown },
  { id: 'comments', label: 'Comments', shortLabel: 'Chat', icon: MessageSquare },
]

// ---------------------------------------------------------------------------
// Timeline
// ---------------------------------------------------------------------------

function Timeline({ activities }: { activities: CaseActivity[] }) {
  const groups = groupActivitiesByDate(activities)

  if (activities.length === 0) {
    return <EmptyState icon={Activity} message="No activity yet" />
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
// Documents Tab
// ---------------------------------------------------------------------------

function DocumentsTab({
  documents,
  onUploadDocument,
}: {
  documents: CaseDocument[]
  onUploadDocument?: (file: File) => void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && onUploadDocument) {
      onUploadDocument(file)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div>
      <div className="mb-4">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        <button
          onClick={handleUpload}
          className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-lg border-2 border-dashed border-stone-200 dark:border-stone-700 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 text-stone-500 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span className="text-sm font-medium">Upload a document</span>
        </button>
      </div>

      {documents.length === 0 ? (
        <EmptyState icon={Paperclip} message="No documents uploaded yet" />
      ) : (
        <div className="space-y-1.5">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center gap-3 px-3.5 py-3 rounded-lg bg-stone-50 dark:bg-stone-800/40 hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 flex items-center justify-center flex-shrink-0">
                <File className="w-4 h-4 text-stone-400 dark:text-stone-500" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-stone-800 dark:text-stone-200 truncate">
                  {doc.fileName}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className={`text-[11px] font-medium px-1.5 py-0.5 rounded ${
                      doc.uploadedBy === 'user'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                        : 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                    }`}
                  >
                    {doc.uploadedBy === 'user' ? 'You' : 'Lawyer'}
                  </span>
                  <span className="text-[11px] text-stone-400 dark:text-stone-500">
                    {formatDateTime(doc.uploadedAt)}
                  </span>
                </div>
              </div>

              <button className="p-2 rounded-lg text-stone-400 dark:text-stone-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-stone-700 transition-colors flex-shrink-0">
                <Download className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Reports Tab
// ---------------------------------------------------------------------------

function ReportsTab({ reports }: { reports: CaseReport[] }) {
  if (reports.length === 0) {
    return <EmptyState icon={FileDown} message="No reports generated yet" />
  }

  return (
    <div className="space-y-1.5">
      {reports.map((report) => (
        <div
          key={report.id}
          className="flex items-center gap-3 px-3.5 py-3 rounded-lg bg-stone-50 dark:bg-stone-800/40 hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-colors"
        >
          <div className="w-9 h-9 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 text-red-500 dark:text-red-400" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-stone-800 dark:text-stone-200 truncate">
              {report.title}
            </p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[11px] text-stone-400 dark:text-stone-500 font-mono truncate">
                {report.fileName}
              </span>
              <span className="text-stone-300 dark:text-stone-600">&middot;</span>
              <span className="text-[11px] text-stone-400 dark:text-stone-500 whitespace-nowrap">
                {formatDate(report.generatedAt)}
              </span>
            </div>
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-stone-700 transition-colors flex-shrink-0">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Download</span>
          </button>
        </div>
      ))}
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
        <EmptyState
          icon={MessageSquare}
          message="No comments yet. Start the conversation below."
        />
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
// Overview Tab
// ---------------------------------------------------------------------------

function OverviewTab({
  caseData,
  vehicle,
  driver,
  lawyer,
}: {
  caseData: CaseDetailProps['caseData']
  vehicle: CaseDetailProps['vehicle']
  driver: CaseDetailProps['driver']
  lawyer: CaseDetailProps['lawyer']
}) {
  const CaseTypeIcon = CASE_TYPE_ICONS[caseData.caseType] || Briefcase

  return (
    <div className="space-y-5">
      {/* Case Type + Description */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <CaseTypeIcon className="w-4 h-4 text-stone-500 dark:text-stone-400" />
          <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
            {caseData.caseType}
          </span>
        </div>
        <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          {caseData.description}
        </p>
        {caseData.escalatedFromChallanId && (
          <div className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
            <ArrowUpRight className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <p className="text-xs text-amber-700 dark:text-amber-300">
              Escalated from challan{' '}
              <span className="font-mono font-semibold">
                {caseData.escalatedFromChallanId.toUpperCase()}
              </span>
            </p>
          </div>
        )}
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
          label="Last Updated"
          value={formatDate(caseData.updatedAt)}
        />
      </div>

      {/* Assigned Lawyer */}
      <div className="pt-4 border-t border-stone-100 dark:border-stone-800">
        <p className="text-xs font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-3">
          Assigned Lawyer
        </p>
        {lawyer ? (
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center flex-shrink-0">
              <Briefcase className="w-4.5 h-4.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                {lawyer.name}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5 text-xs text-stone-500 dark:text-stone-400">
                <span>{lawyer.specialization}</span>
                <span className="text-stone-300 dark:text-stone-600">&middot;</span>
                <MapPin className="w-3 h-3" />
                <span>{lawyer.location}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 py-1">
            <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center flex-shrink-0">
              <User className="w-4.5 h-4.5 text-stone-300 dark:text-stone-600" />
            </div>
            <div>
              <p className="text-sm text-stone-500 dark:text-stone-400 italic">
                Not yet assigned
              </p>
              <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                A lawyer will be assigned after screening
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function CaseDetail({
  caseData,
  vehicle,
  driver,
  lawyer,
  activities,
  documents,
  reports,
  comments,
  onUploadDocument,
  onAddComment,
  onBack,
}: CaseDetailProps) {
  const [activeTab, setActiveTab] = useState<TabId>('overview')

  const statusConfig = STATUS_CONFIG[caseData.status]
  const StatusIcon = statusConfig.icon

  const tabCounts: Record<TabId, number> = {
    overview: 0,
    documents: documents.length,
    reports: reports.length,
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
          Back to Cases
        </button>

        {/* ================================================================= */}
        {/* Header Card with Tabs */}
        {/* ================================================================= */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
          {/* Top accent */}
          <div
            className={`h-1 ${
              caseData.status === 'resolved'
                ? 'bg-emerald-500'
                : caseData.status === 'documentRequested'
                ? 'bg-purple-500'
                : caseData.status === 'extended'
                ? 'bg-orange-500'
                : 'bg-amber-500'
            }`}
          />

          <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <h1 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-50 font-mono tracking-tight">
                    {caseData.displayId}
                  </h1>
                  {caseData.origin !== 'manual' && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400">
                      {caseData.origin === 'lawyerCall'
                        ? 'Lawyer Call'
                        : 'Escalated'}
                    </span>
                  )}
                </div>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  Created {formatDateTime(caseData.createdAt)}
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
            {/* Left: Case Details */}
            <SectionCard title="Case Details" icon={Info}>
              <OverviewTab
                caseData={caseData}
                vehicle={vehicle}
                driver={driver}
                lawyer={lawyer}
              />
            </SectionCard>

            {/* Right: Timeline */}
            <SectionCard title="Timeline" icon={Activity} count={activities.length}>
              <Timeline activities={activities} />
            </SectionCard>
          </div>
        ) : (
          <div className="mt-5">
            <SectionCard
              title={
                activeTab === 'documents'
                  ? 'Documents'
                  : activeTab === 'reports'
                  ? 'Reports'
                  : 'Comments'
              }
              icon={
                activeTab === 'documents'
                  ? Paperclip
                  : activeTab === 'reports'
                  ? FileDown
                  : MessageSquare
              }
              count={tabCounts[activeTab] || undefined}
            >
              {activeTab === 'documents' && (
                <DocumentsTab
                  documents={documents}
                  onUploadDocument={onUploadDocument}
                />
              )}
              {activeTab === 'reports' && <ReportsTab reports={reports} />}
              {activeTab === 'comments' && (
                <CommentsTab
                  comments={comments}
                  onAddComment={onAddComment}
                />
              )}
            </SectionCard>
          </div>
        )}

      </div>
    </div>
  )
}
