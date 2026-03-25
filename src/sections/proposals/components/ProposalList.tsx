import { useState } from 'react'
import {
  FileText,
  Eye,
  MessageSquare,
  XCircle,
  Send,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Search,
} from 'lucide-react'
import type { ProposalListProps, Proposal, ProposalStatus, ProposalType } from '@/../product/sections/proposals/types'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const translations: Record<Language, Record<string, string>> = {
  en: {
    pageTitle: 'Proposals',
    pageSubtitle: 'Track service requests from compliance checks',
    activeProposals: 'Active',
    pastProposals: 'Past',
    createdDate: 'Created',
    proposalId: 'Proposal ID',
    type: 'Type',
    quantity: 'Qty',
    amount: 'Amount',
    status: 'Status',
    actions: 'Actions',
    viewDetail: 'View',
    followUp: 'Follow-up',
    cancel: 'Cancel',
    noActiveProposals: 'No active proposals',
    noActiveProposalsDesc: 'Proposals sent from compliance checks will appear here',
    noPastProposals: 'No past proposals yet',
    noPastProposalsDesc: 'Converted and rejected proposals will move here',
    statusSent: 'Sent',
    statusConverted: 'Converted',
    statusRejected: 'Rejected',
    typeChallan: 'Challan',
    typeDL: 'DL',
    typeRC: 'RC',
    linkedIncident: 'Linked',
    searchPlaceholder: 'Search proposals...',
  },
  hi: {
    pageTitle: 'प्रस्ताव',
    pageSubtitle: 'अनुपालन जाँच से सेवा अनुरोध ट्रैक करें',
    activeProposals: 'सक्रिय',
    pastProposals: 'पिछले',
    createdDate: 'बनाया गया',
    proposalId: 'प्रस्ताव आईडी',
    type: 'प्रकार',
    quantity: 'मात्रा',
    amount: 'राशि',
    status: 'स्थिति',
    actions: 'कार्य',
    viewDetail: 'देखें',
    followUp: 'फॉलो-अप',
    cancel: 'रद्द करें',
    noActiveProposals: 'कोई सक्रिय प्रस्ताव नहीं',
    noActiveProposalsDesc: 'अनुपालन जाँच से भेजे गए प्रस्ताव यहाँ दिखाई देंगे',
    noPastProposals: 'अभी तक कोई पिछले प्रस्ताव नहीं',
    noPastProposalsDesc: 'परिवर्तित और अस्वीकृत प्रस्ताव यहाँ आएंगे',
    statusSent: 'भेजा गया',
    statusConverted: 'परिवर्तित',
    statusRejected: 'अस्वीकृत',
    typeChallan: 'चालान',
    typeDL: 'डीएल',
    typeRC: 'आरसी',
    linkedIncident: 'लिंक',
    searchPlaceholder: 'प्रस्ताव खोजें...',
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

function formatCurrency(amount: number): string {
  return '₹' + amount.toLocaleString('en-IN')
}

// ---------------------------------------------------------------------------
// Empty State
// ---------------------------------------------------------------------------

function EmptyState({ title, description }: { title: string; description: string }) {
  return (
    <div className="py-16 text-center">
      <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto mb-3">
        <FileText className="w-5 h-5 text-stone-400 dark:text-stone-500" />
      </div>
      <p className="text-sm font-medium text-stone-600 dark:text-stone-300">{title}</p>
      <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">{description}</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Proposal Row
// ---------------------------------------------------------------------------

function ProposalRow({
  proposal,
  onView,
  onFollowUp,
  onCancel,
  t,
  language,
}: {
  proposal: Proposal
  onView?: () => void
  onFollowUp?: () => void
  onCancel?: () => void
  t: Record<string, string>
  language: Language
}) {
  const statusConfig = STATUS_CONFIG[proposal.status]
  const typeConfig = TYPE_CONFIG[proposal.type]
  const StatusIcon = statusConfig.icon
  const isActive = proposal.status === 'sent'

  return (
    <div className="group/row flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 px-4 sm:px-5 py-4 border-b border-stone-100 dark:border-stone-800 last:border-b-0 hover:bg-stone-50 dark:hover:bg-stone-800/30 transition-colors">
      {/* Mobile: Top row with ID + Status */}
      <div className="flex items-center justify-between sm:hidden">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-stone-900 dark:text-stone-50 font-mono tracking-tight">
            {proposal.displayId}
          </span>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium ${typeConfig.bg} ${typeConfig.text}`}>
            {t[typeConfig.labelKey]}
          </span>
        </div>
        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium ${statusConfig.bg} ${statusConfig.text}`}>
          <StatusIcon className="w-3 h-3" />
          {t[statusConfig.labelKey]}
        </span>
      </div>

      {/* Mobile: Details row */}
      <div className="flex items-center justify-between sm:hidden">
        <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
          <span>{formatDate(proposal.createdAt, language)}</span>
          <span>Qty: {proposal.quantity}</span>
          <span className="font-semibold text-stone-700 dark:text-stone-200">{formatCurrency(proposal.amount)}</span>
        </div>
      </div>

      {/* Mobile: Description */}
      <p className="sm:hidden text-xs text-stone-500 dark:text-stone-400 line-clamp-1">
        {proposal.description}
      </p>

      {/* Mobile: Actions */}
      <div className="flex items-center gap-2 sm:hidden">
        <button
          onClick={onView}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-xs font-medium text-stone-600 dark:text-stone-300 transition-colors"
        >
          <Eye className="w-3 h-3" />
          {t.viewDetail}
        </button>
        {isActive && (
          <>
            <button
              onClick={onFollowUp}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-medium text-white transition-colors"
            >
              <MessageSquare className="w-3 h-3" />
              {t.followUp}
            </button>
            <button
              onClick={onCancel}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-800 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
            >
              {t.cancel}
            </button>
          </>
        )}
        {proposal.linkedIncidentId && (
          <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <ArrowUpRight className="w-3 h-3" />
            {proposal.linkedIncidentId}
          </span>
        )}
      </div>

      {/* Desktop: Table columns */}
      <div className="hidden sm:flex sm:items-center sm:flex-1 sm:gap-0">
        {/* Date */}
        <div className="w-[110px] flex-shrink-0">
          <span className="text-xs text-stone-500 dark:text-stone-400">{formatDate(proposal.createdAt, language)}</span>
        </div>

        {/* Proposal ID */}
        <div className="w-[110px] flex-shrink-0">
          <span className="text-sm font-bold text-stone-900 dark:text-stone-50 font-mono tracking-tight">
            {proposal.displayId}
          </span>
        </div>

        {/* Type */}
        <div className="w-[90px] flex-shrink-0">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium ${typeConfig.bg} ${typeConfig.text}`}>
            {t[typeConfig.labelKey]}
          </span>
        </div>

        {/* Quantity */}
        <div className="w-[60px] flex-shrink-0 text-center">
          <span className="text-sm font-semibold text-stone-800 dark:text-stone-200 tabular-nums">{proposal.quantity}</span>
        </div>

        {/* Amount */}
        <div className="w-[120px] flex-shrink-0">
          <span className="text-sm font-semibold text-stone-900 dark:text-stone-100 tabular-nums">{formatCurrency(proposal.amount)}</span>
        </div>

        {/* Status */}
        <div className="w-[110px] flex-shrink-0">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium ${statusConfig.bg} ${statusConfig.text}`}>
            <StatusIcon className="w-3 h-3" />
            {t[statusConfig.labelKey]}
          </span>
        </div>

        {/* Linked Incident */}
        <div className="flex-1 min-w-0">
          {proposal.linkedIncidentId && (
            <span className="inline-flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              <ArrowUpRight className="w-3 h-3" />
              {proposal.linkedIncidentId}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1.5 flex-shrink-0 opacity-0 group-hover/row:opacity-100 transition-opacity">
          <button
            onClick={onView}
            className="p-2 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
            title={t.viewDetail}
          >
            <Eye className="w-4 h-4" />
          </button>
          {isActive && (
            <>
              <button
                onClick={onFollowUp}
                className="p-2 rounded-lg text-emerald-500 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
                title={t.followUp}
              >
                <MessageSquare className="w-4 h-4" />
              </button>
              <button
                onClick={onCancel}
                className="p-2 rounded-lg text-red-400 dark:text-red-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                title={t.cancel}
              >
                <XCircle className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

type Tab = 'active' | 'past'

export function ProposalList({
  proposals,
  onView,
  onFollowUp,
  onCancel,
}: ProposalListProps) {
  const { language } = useLanguage()
  const t = translations[language]
  const [activeTab, setActiveTab] = useState<Tab>('active')
  const [search, setSearch] = useState('')

  const activeProposals = proposals.filter((p) => p.status === 'sent')
  const pastProposals = proposals.filter((p) => p.status === 'converted' || p.status === 'rejected')

  const currentList = activeTab === 'active' ? activeProposals : pastProposals
  const filtered = search.trim()
    ? currentList.filter(
        (p) =>
          p.displayId.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()) ||
          p.type.toLowerCase().includes(search.toLowerCase())
      )
    : currentList

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
      <div className="px-4 sm:px-6 lg:px-8 pt-5 sm:pt-7 lg:pt-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              {t.pageTitle}
            </h1>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              {t.pageSubtitle}
            </p>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4">
          <div className="rounded-xl bg-white dark:bg-stone-900 shadow-sm dark:shadow-stone-950/20 overflow-hidden">
            <div className="p-4 sm:p-5 lg:p-6">
              <div className="flex items-center justify-between mb-1">
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 tabular-nums">
                  {activeProposals.length}
                </p>
                <div className="p-2 sm:p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                  <Send className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{t.statusSent}</p>
            </div>
          </div>
          <div className="rounded-xl bg-white dark:bg-stone-900 shadow-sm dark:shadow-stone-950/20 overflow-hidden">
            <div className="p-4 sm:p-5 lg:p-6">
              <div className="flex items-center justify-between mb-1">
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 tabular-nums">
                  {pastProposals.filter((p) => p.status === 'converted').length}
                </p>
                <div className="p-2 sm:p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{t.statusConverted}</p>
            </div>
          </div>
          <div className="rounded-xl bg-white dark:bg-stone-900 shadow-sm dark:shadow-stone-950/20 overflow-hidden">
            <div className="p-4 sm:p-5 lg:p-6">
              <div className="flex items-center justify-between mb-1">
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 tabular-nums">
                  {pastProposals.filter((p) => p.status === 'rejected').length}
                </p>
                <div className="p-2 sm:p-2.5 rounded-lg bg-red-50 dark:bg-red-950/50">
                  <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{t.statusRejected}</p>
            </div>
          </div>
        </div>

        {/* Tab Switcher + Search */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div className="flex items-center gap-1 p-1 bg-stone-200/40 dark:bg-stone-900 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab('active')}
              className={`flex items-center gap-2 px-4 py-2 min-h-11 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'active'
                  ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-50 shadow-sm'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
              }`}
            >
              <Clock className="w-4 h-4" />
              {t.activeProposals}
              <span className={`text-xs tabular-nums px-1.5 py-0.5 rounded-full ${
                activeTab === 'active'
                  ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                  : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400'
              }`}>
                {activeProposals.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`flex items-center gap-2 px-4 py-2 min-h-11 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'past'
                  ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-50 shadow-sm'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
              }`}
            >
              <FileText className="w-4 h-4" />
              {t.pastProposals}
              <span className={`text-xs tabular-nums px-1.5 py-0.5 rounded-full ${
                activeTab === 'past'
                  ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                  : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400'
              }`}>
                {pastProposals.length}
              </span>
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="pl-9 pr-3 py-2 w-full sm:w-64 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
          {/* Desktop Header */}
          <div className="hidden sm:flex items-center gap-0 px-5 py-3 border-b border-stone-100 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900">
            <div className="w-[110px] flex-shrink-0 text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.createdDate}</div>
            <div className="w-[110px] flex-shrink-0 text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.proposalId}</div>
            <div className="w-[90px] flex-shrink-0 text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.type}</div>
            <div className="w-[60px] flex-shrink-0 text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider text-center">{t.quantity}</div>
            <div className="w-[120px] flex-shrink-0 text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.amount}</div>
            <div className="w-[110px] flex-shrink-0 text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.status}</div>
            <div className="flex-1 min-w-0" />
            <div className="w-[120px] flex-shrink-0 text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider text-right">{t.actions}</div>
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            activeTab === 'active' ? (
              <EmptyState title={t.noActiveProposals} description={t.noActiveProposalsDesc} />
            ) : (
              <EmptyState title={t.noPastProposals} description={t.noPastProposalsDesc} />
            )
          ) : (
            filtered.map((proposal) => (
              <ProposalRow
                key={proposal.id}
                proposal={proposal}
                onView={() => onView?.(proposal.id)}
                onFollowUp={() => onFollowUp?.(proposal.id)}
                onCancel={() => onCancel?.(proposal.id)}
                t={t}
                language={language}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
