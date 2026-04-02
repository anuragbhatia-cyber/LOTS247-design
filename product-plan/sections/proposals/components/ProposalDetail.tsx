import { useState } from 'react'
import {
  ArrowLeft,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  Info,
  Activity,
  MessageSquare,
  FileText,
  ArrowUpRight,
  Calendar,
  Hash,
  Layers,
  IndianRupee,
} from 'lucide-react'
import type {
  ProposalDetailProps,
  ProposalStatus,
  ProposalType,
  ProposalActivity,
  Comment,
} from '../types'
import { useLanguage, type Language } from './LanguageContext' // TODO: adjust path to your project's LanguageContext

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const translations: Record<Language, Record<string, string>> = {
  en: {
    backToProposals: 'Back to Proposals',
    statusSent: 'Sent',
    statusConverted: 'Converted',
    statusRejected: 'Rejected',
    typeChallan: 'Challan',
    typeDL: 'DL',
    typeRC: 'RC',
    created: 'Created',
    tabOverview: 'Overview',
    tabFollowUp: 'Follow-up',
    proposalDetails: 'Proposal Details',
    timeline: 'Timeline',
    type: 'Type',
    quantity: 'Quantity',
    amount: 'Amount',
    lastUpdated: 'Last Updated',
    linkedIncident: 'Linked Incident',
    description: 'Description',
    cancelProposal: 'Cancel Proposal',
    noActivityYet: 'No activity yet',
    noCommentsYet: 'No follow-up messages yet. Start the conversation below.',
    support: 'Support',
    typeAMessage: 'Type a message...',
    enterToSend: 'Press Enter to send, Shift+Enter for new line',
  },
  hi: {
    backToProposals: 'प्रस्तावों पर वापस',
    statusSent: 'भेजा गया',
    statusConverted: 'परिवर्तित',
    statusRejected: 'अस्वीकृत',
    typeChallan: 'चालान',
    typeDL: 'डीएल',
    typeRC: 'आरसी',
    created: 'बनाया गया',
    tabOverview: 'अवलोकन',
    tabFollowUp: 'फॉलो-अप',
    proposalDetails: 'प्रस्ताव विवरण',
    timeline: 'समयरेखा',
    type: 'प्रकार',
    quantity: 'मात्रा',
    amount: 'राशि',
    lastUpdated: 'अंतिम अपडेट',
    linkedIncident: 'लिंक किया गया मामला',
    description: 'विवरण',
    cancelProposal: 'प्रस्ताव रद्द करें',
    noActivityYet: 'अभी तक कोई गतिविधि नहीं',
    noCommentsYet: 'अभी कोई फॉलो-अप संदेश नहीं। नीचे बातचीत शुरू करें।',
    support: 'सहायता',
    typeAMessage: 'संदेश लिखें...',
    enterToSend: 'भेजने के लिए Enter दबाएं, नई लाइन के लिए Shift+Enter',
  },
}

// ---------------------------------------------------------------------------
// Status config
// ---------------------------------------------------------------------------

const STATUS_CONFIG: Record<
  ProposalStatus,
  { labelKey: string; bg: string; text: string; icon: typeof Clock }
> = {
  sent: {
    labelKey: 'statusSent',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    text: 'text-blue-700 dark:text-blue-300',
    icon: Send,
  },
  converted: {
    labelKey: 'statusConverted',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    icon: CheckCircle2,
  },
  rejected: {
    labelKey: 'statusRejected',
    bg: 'bg-red-50 dark:bg-red-950/40',
    text: 'text-red-700 dark:text-red-300',
    icon: XCircle,
  },
}

const TYPE_CONFIG: Record<ProposalType, { labelKey: string; bg: string; text: string }> = {
  Challan: {
    labelKey: 'typeChallan',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-300',
  },
  DL: {
    labelKey: 'typeDL',
    bg: 'bg-purple-50 dark:bg-purple-950/40',
    text: 'text-purple-700 dark:text-purple-300',
  },
  RC: {
    labelKey: 'typeRC',
    bg: 'bg-sky-50 dark:bg-sky-950/40',
    text: 'text-sky-700 dark:text-sky-300',
  },
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getLocale(language: Language): string {
  return language === 'hi' ? 'hi-IN' : 'en-IN'
}

function formatDate(dateStr: string, language: Language): string {
  return new Date(dateStr).toLocaleDateString(getLocale(language), {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatDateTime(dateStr: string, language: Language): string {
  return new Date(dateStr).toLocaleDateString(getLocale(language), {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatCurrency(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN')
}

// ---------------------------------------------------------------------------
// Shared: SectionCard
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
// Empty state
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
// Detail row
// ---------------------------------------------------------------------------

function DetailRow({
  icon: Icon,
  label,
  value,
  subValue,
}: {
  icon: typeof Hash
  label: string
  value: string | React.ReactNode
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
        <div className="mt-0.5 text-sm font-medium text-stone-900 dark:text-stone-100">
          {value}
        </div>
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
// Activity heading map
// ---------------------------------------------------------------------------

const ACTIVITY_HEADING: Record<string, string> = {
  statusChange: 'Status Update',
  note: 'Note',
}

// ---------------------------------------------------------------------------
// Timeline
// ---------------------------------------------------------------------------

function Timeline({ activities, language }: { activities: ProposalActivity[]; language: Language }) {
  const t = translations[language]
  const sorted = [...activities].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  if (sorted.length === 0) {
    return <EmptyState icon={Activity} message={t.noActivityYet} />
  }

  return (
    <div>
      {sorted.map((activity, index) => (
        <div key={activity.id} className="flex gap-4">
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-emerald-500 dark:bg-emerald-400 mt-1.5 flex-shrink-0" />
            {index < sorted.length - 1 && (
              <div className="flex-1 w-px bg-stone-200 dark:bg-stone-700 my-1" />
            )}
          </div>
          <div className="pb-5 min-w-0">
            <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 leading-snug">
              {ACTIVITY_HEADING[activity.actionType] ?? 'Update'}
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
              {activity.notes}
            </p>
            <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
              {formatDate(activity.timestamp, language)}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Follow-up tab (Comments)
// ---------------------------------------------------------------------------

function FollowUpTab({
  comments,
  onAddComment,
}: {
  comments: Comment[]
  onAddComment?: (message: string) => void
}) {
  const { language } = useLanguage()
  const t = translations[language]
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
        <EmptyState icon={MessageSquare} message={t.noCommentsYet} />
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
                        {formatDateTime(comment.createdAt, language)}
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
            placeholder={t.typeAMessage}
            rows={2}
            className="flex-1 px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 resize-none transition-colors"
          />
          <button
            onClick={handleSubmit}
            disabled={!newMessage.trim()}
            className="flex items-center justify-center w-11 h-11 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-200 dark:disabled:bg-stone-700 disabled:cursor-not-allowed text-white disabled:text-stone-400 dark:disabled:text-stone-500 transition-colors flex-shrink-0"
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
// Overview tab
// ---------------------------------------------------------------------------

function OverviewTab({
  proposal,
  language,
}: {
  proposal: ProposalDetailProps['proposal']
  language: Language
}) {
  const t = translations[language]
  const typeConfig = TYPE_CONFIG[proposal.type]

  return (
    <div className="space-y-6">
      {/* Description */}
      <div>
        <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5">
          {t.description}
        </p>
        <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          {proposal.description}
        </p>
      </div>

      {/* Linked Incident */}
      {proposal.linkedIncidentId && (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
          <ArrowUpRight className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <p className="text-xs text-emerald-700 dark:text-emerald-300">
            {t.linkedIncident}:{' '}
            <span className="font-mono font-semibold">{proposal.linkedIncidentId}</span>
          </p>
        </div>
      )}

      {/* Detail fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0 pt-2 border-t border-stone-100 dark:border-stone-800">
        <DetailRow
          icon={FileText}
          label={t.type}
          value={
            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${typeConfig.bg} ${typeConfig.text}`}>
              {t[typeConfig.labelKey]}
            </span>
          }
        />
        <DetailRow
          icon={Layers}
          label={t.quantity}
          value={String(proposal.quantity)}
        />
        <DetailRow
          icon={IndianRupee}
          label={t.amount}
          value={formatCurrency(proposal.amount)}
        />
        <DetailRow
          icon={Calendar}
          label={t.lastUpdated}
          value={formatDate(proposal.updatedAt, language)}
        />
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Tab types
// ---------------------------------------------------------------------------

type TabId = 'overview' | 'followup'

const TABS: { id: TabId; labelKey: string; icon: typeof Activity }[] = [
  { id: 'overview', labelKey: 'tabOverview', icon: Info },
  { id: 'followup', labelKey: 'tabFollowUp', icon: MessageSquare },
]

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function ProposalDetail({
  proposal,
  activities,
  comments,
  onAddComment,
  onCancel,
  onBack,
}: ProposalDetailProps) {
  const { language } = useLanguage()
  const t = translations[language]
  const [activeTab, setActiveTab] = useState<TabId>('overview')

  const statusConfig = STATUS_CONFIG[proposal.status]
  const StatusIcon = statusConfig.icon
  const typeConfig = TYPE_CONFIG[proposal.type]
  const isActive = proposal.status === 'sent'

  const tabCounts: Record<TabId, number> = {
    overview: 0,
    followup: comments.length,
  }

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
      <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-10">

        {/* Hero Header Card */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden mb-6">
          <div className="p-5 sm:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              {/* Left: Proposal Info */}
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <button
                    onClick={onBack}
                    className="mt-1 p-2 -ml-1 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex-shrink-0"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 font-mono tracking-tight">
                        {proposal.displayId}
                      </h1>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                        <StatusIcon className="w-3 h-3" />
                        {t[statusConfig.labelKey]}
                      </span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${typeConfig.bg} ${typeConfig.text}`}>
                        {t[typeConfig.labelKey]}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                      {t.created} {formatDate(proposal.createdAt, language)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Amount + Cancel */}
              <div className="flex-shrink-0 lg:text-right flex flex-col items-start lg:items-end gap-2">
                <p className="text-xl font-bold text-stone-900 dark:text-stone-50 tabular-nums">
                  {formatCurrency(proposal.amount)}
                </p>
                {isActive && (
                  <button
                    onClick={onCancel}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-800 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    {t.cancelProposal}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-stone-200/40 dark:bg-stone-900 rounded-lg w-fit mb-6 overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActiveTab = activeTab === tab.id
            const count = tabCounts[tab.id]

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 min-h-11 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  isActiveTab
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-50 shadow-sm'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {t[tab.labelKey]}
                {count > 0 && (
                  <span className={`text-xs tabular-nums px-1.5 py-0.5 rounded-full ${
                    isActiveTab
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

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-5 items-start">
            <SectionCard title={t.proposalDetails} icon={Info}>
              <OverviewTab proposal={proposal} language={language} />
            </SectionCard>
            <SectionCard title={t.timeline} icon={Activity} count={activities.length}>
              <Timeline activities={activities} language={language} />
            </SectionCard>
          </div>
        )}

        {activeTab === 'followup' && (
          <div>
            <SectionCard title={t.tabFollowUp} icon={MessageSquare} count={comments.length || undefined}>
              <FollowUpTab
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
