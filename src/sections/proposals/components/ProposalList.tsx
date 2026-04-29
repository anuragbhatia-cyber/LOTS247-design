import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
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
  MoreVertical,
  Plus,
  X,
  Wallet,
  CreditCard,
  ShieldCheck,
  IndianRupee,
  ChevronDown,
  IdCard,
  SlidersHorizontal,
} from 'lucide-react'
import type { ProposalListProps, Proposal, ProposalStatus, ProposalType, ServiceStatus } from '@/../product/sections/proposals/types'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const translations: Record<Language, Record<string, string>> = {
  en: {
    pageTitle: 'Request Proposals',
    pageSubtitle: 'Track service requests from compliance checks',
    sentProposals: 'Request Created',
    underReviewProposals: 'Under Review',
    receivedProposals: 'Proposal Created',
    pastProposals: 'Accepted / Rejected',
    createdDate: 'Created',
    proposalId: 'Proposal ID',
    requestId: 'Request ID',
    type: 'Type',
    quantity: 'Qty',
    amount: 'Amount',
    status: 'Status',
    actions: 'Actions',
    viewDetail: 'View Proposal',
    followUp: 'Follow-up',
    cancel: 'Cancel',
    accept: 'Accept',
    reject: 'Reject',
    noSentProposals: 'No sent proposals',
    noSentProposalsDesc: 'Proposals sent from compliance checks will appear here',
    noReceivedProposals: 'No received proposals',
    noReceivedProposalsDesc: 'Proposals received from vendors will appear here',
    noPastProposals: 'No past proposals yet',
    noPastProposalsDesc: 'Converted and rejected proposals will move here',
    statusSent: 'Sent',
    statusUnderReview: 'Under Review',
    statusReceived: 'Received',
    statusConverted: 'Converted',
    statusRejected: 'Rejected',
    typeChallan: 'Challan',
    typeDL: 'DL',
    typeRC: 'RC',
    linkedIncident: 'Linked',
    searchPlaceholder: 'Search by ID, type or description...',
    createRequest: 'Create Request',
    incidentCreated: 'Incident Created',
    yes: 'Yes',
    viewIncident: 'View',
    createRequestTitle: 'Create Request',
    createRequestSubtitle: 'Select the type of request you want to create',
    fleetChallans: 'Fleet Challans',
    fleetChallansDesc: 'Request for pending challan resolution',
    vehicleRC: 'Vehicle RC',
    vehicleRCDesc: 'Request for RC renewal or transfer',
    drivingLicense: 'Driving License',
    drivingLicenseDesc: 'Request for DL renewal or verification',
    filters: 'Filters',
    typeFilter: 'Type',
    allTypes: 'All Types',
    sortBy: 'Sort',
    dateNewest: 'Date: Newest',
    dateOldest: 'Date: Oldest',
    amountHigh: 'Amount: High → Low',
    amountLow: 'Amount: Low → High',
    qtyHigh: 'Qty: High → Low',
    qtyLow: 'Qty: Low → High',
    clearAll: 'Clear All',
    filteredBy: 'Filtered by:',
    serviceStatus: 'Service Status',
    serviceStatusPending: 'Pending',
    serviceStatusInProgress: 'In Progress',
    serviceStatusCompleted: 'Completed',
    serviceStatusNA: 'N/A',
    dateRange: 'Date Range',
    from: 'From',
    to: 'To',
    statusFilter: 'Status',
    allStatuses: 'All Statuses',
    serviceStatusFilter: 'Service Status',
    allServiceStatuses: 'All',
  },
  hi: {
    pageTitle: 'Request Proposals',
    pageSubtitle: 'अनुपालन जाँच से सेवा अनुरोध ट्रैक करें',
    sentProposals: 'अनुरोध बनाया',
    underReviewProposals: 'समीक्षाधीन',
    receivedProposals: 'प्रस्ताव बनाया',
    pastProposals: 'स्वीकृत / अस्वीकृत',
    createdDate: 'बनाया गया',
    proposalId: 'प्रस्ताव आईडी',
    requestId: 'अनुरोध आईडी',
    type: 'प्रकार',
    quantity: 'मात्रा',
    amount: 'राशि',
    status: 'स्थिति',
    actions: 'कार्य',
    viewDetail: 'प्रस्ताव देखें',
    followUp: 'फॉलो-अप',
    cancel: 'रद्द करें',
    accept: 'स्वीकार',
    reject: 'अस्वीकार',
    noSentProposals: 'कोई भेजे गए प्रस्ताव नहीं',
    noSentProposalsDesc: 'अनुपालन जाँच से भेजे गए प्रस्ताव यहाँ दिखाई देंगे',
    noReceivedProposals: 'कोई प्राप्त प्रस्ताव नहीं',
    noReceivedProposalsDesc: 'विक्रेताओं से प्राप्त प्रस्ताव यहाँ दिखाई देंगे',
    noPastProposals: 'अभी तक कोई पिछले प्रस्ताव नहीं',
    noPastProposalsDesc: 'परिवर्तित और अस्वीकृत प्रस्ताव यहाँ आएंगे',
    statusSent: 'भेजा गया',
    statusUnderReview: 'समीक्षाधीन',
    statusReceived: 'प्राप्त',
    statusConverted: 'परिवर्तित',
    statusRejected: 'अस्वीकृत',
    typeChallan: 'चालान',
    typeDL: 'डीएल',
    typeRC: 'आरसी',
    linkedIncident: 'लिंक',
    searchPlaceholder: 'आईडी, प्रकार या विवरण से खोजें...',
    createRequest: 'अनुरोध बनाएं',
    incidentCreated: 'इंसिडेंट बनाया',
    yes: 'हाँ',
    viewIncident: 'देखें',
    createRequestTitle: 'अनुरोध बनाएं',
    createRequestSubtitle: 'जो अनुरोध बनाना चाहते हैं उसका प्रकार चुनें',
    fleetChallans: 'फ्लीट चालान',
    fleetChallansDesc: 'लंबित चालान समाधान के लिए अनुरोध',
    vehicleRC: 'वाहन आरसी',
    vehicleRCDesc: 'आरसी नवीनीकरण या हस्तांतरण के लिए अनुरोध',
    drivingLicense: 'ड्राइविंग लाइसेंस',
    drivingLicenseDesc: 'डीएल नवीनीकरण या सत्यापन के लिए अनुरोध',
    filters: 'फ़िल्टर',
    typeFilter: 'प्रकार',
    allTypes: 'सभी प्रकार',
    sortBy: 'क्रमबद्ध',
    dateNewest: 'तारीख: नवीनतम',
    dateOldest: 'तारीख: पुरानी',
    amountHigh: 'राशि: अधिक → कम',
    amountLow: 'राशि: कम → अधिक',
    qtyHigh: 'मात्रा: अधिक → कम',
    qtyLow: 'मात्रा: कम → अधिक',
    clearAll: 'सब हटाएं',
    filteredBy: 'फ़िल्टर:',
    serviceStatus: 'सेवा स्थिति',
    serviceStatusPending: 'लंबित',
    serviceStatusInProgress: 'प्रगति में',
    serviceStatusCompleted: 'पूर्ण',
    serviceStatusNA: 'लागू नहीं',
    dateRange: 'तारीख सीमा',
    from: 'से',
    to: 'तक',
    statusFilter: 'स्थिति',
    allStatuses: 'सभी स्थिति',
    serviceStatusFilter: 'सेवा स्थिति',
    allServiceStatuses: 'सभी',
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
  under_review: {
    labelKey: 'statusUnderReview',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-300',
    icon: Clock,
  },
  received: {
    labelKey: 'statusReceived',
    bg: 'bg-violet-50 dark:bg-violet-950/40',
    text: 'text-violet-700 dark:text-violet-300',
    icon: FileText,
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

const SERVICE_STATUS_CONFIG: Record<
  ServiceStatus,
  { labelKey: string; bg: string; text: string }
> = {
  pending: {
    labelKey: 'serviceStatusPending',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-300',
  },
  in_progress: {
    labelKey: 'serviceStatusInProgress',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    text: 'text-blue-700 dark:text-blue-300',
  },
  completed: {
    labelKey: 'serviceStatusCompleted',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-300',
  },
  not_applicable: {
    labelKey: 'serviceStatusNA',
    bg: 'bg-stone-100 dark:bg-stone-800',
    text: 'text-stone-500 dark:text-stone-400',
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
      <p className="text-sm font-semibold text-stone-700 dark:text-stone-300">{title}</p>
      <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">{description}</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Filter Pill
// ---------------------------------------------------------------------------

function FilterPill({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
      {label}
      <button
        onClick={onClear}
        className="ml-0.5 p-0.5 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
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
  onAccept,
  onReject,
  showProposalActions,
  showIncidentColumn,
  t,
  language,
}: {
  proposal: Proposal
  onView?: () => void
  onFollowUp?: () => void
  onCancel?: () => void
  onAccept?: () => void
  onReject?: () => void
  showProposalActions?: boolean
  showIncidentColumn?: boolean
  t: Record<string, string>
  language: Language
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const statusConfig = STATUS_CONFIG[proposal.status]
  const typeConfig = TYPE_CONFIG[proposal.type]
  const StatusIcon = statusConfig.icon
  const isActive = proposal.status === 'sent'

  return (
    <div onClick={onView} className="group/row flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 px-4 sm:px-5 py-4 border-b border-stone-200 dark:border-stone-800 last:border-b-0 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors cursor-pointer">
      {/* Mobile: Top row with ID + Status + Actions */}
      <div className="flex items-center justify-between sm:hidden">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-stone-900 dark:text-stone-50 font-mono tracking-tight">
            {proposal.displayId.replace(/^PRP-/i, 'REQ-')}
          </span>
          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${typeConfig.bg} ${typeConfig.text}`}>
            {t[typeConfig.labelKey]}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
            {t[statusConfig.labelKey]}
          </span>
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-1.5 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 shadow-xl shadow-stone-200/40 dark:shadow-stone-950/60 overflow-hidden z-30">
                  <button
                    onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onView?.() }}
                    className="w-full text-left px-3.5 py-2.5 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                  >
                    {t.viewDetail}
                  </button>
                  {isActive && (
                    <>
                      <div className="border-t border-stone-200 dark:border-stone-800" />
                      <button
                        onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onFollowUp?.() }}
                        className="w-full text-left px-3.5 py-2.5 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                      >
                        {t.followUp}
                      </button>
                      <div className="border-t border-stone-200 dark:border-stone-800" />
                      <button
                        onClick={(e) => { e.stopPropagation(); setMenuOpen(false); onCancel?.() }}
                        className="w-full text-left px-3.5 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      >
                        {t.cancel}
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile: Details row */}
      <div className="flex items-center justify-between sm:hidden">
        <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
          <span>{formatDate(proposal.createdAt, language)}</span>
          <span>Qty: {proposal.quantity}</span>
          <span className="font-semibold text-stone-700 dark:text-stone-200">{formatCurrency(proposal.amount)}</span>
        </div>
      </div>


      {/* Mobile: Service Status (past tab only) */}
      {showIncidentColumn && proposal.serviceStatus && proposal.serviceStatus !== 'not_applicable' && (
        <div className="flex items-center gap-2 sm:hidden">
          <span className="text-xs text-stone-500 dark:text-stone-400">{t.serviceStatus}:</span>
          <span className="text-xs font-medium text-stone-600 dark:text-stone-300">
            {t[SERVICE_STATUS_CONFIG[proposal.serviceStatus].labelKey]}
          </span>
        </div>
      )}

      {/* Mobile: Linked incident (if any) */}
      {proposal.linkedIncidentId && (
        <div className="flex items-center sm:hidden">
          <span className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <ArrowUpRight className="w-3 h-3" />
            {proposal.linkedIncidentId}
          </span>
        </div>
      )}

      {/* Desktop: Table columns */}
      <div className="hidden sm:flex sm:items-center sm:flex-1">
        {/* Date */}
        <div className="w-[14%] min-w-[90px]">
          <span className="text-xs text-stone-500 dark:text-stone-400">{formatDate(proposal.createdAt, language)}</span>
        </div>

        {/* Proposal ID */}
        <div className="w-[14%] min-w-[90px]">
          <span className="text-sm font-bold text-stone-900 dark:text-stone-50 font-mono tracking-tight">
            {proposal.displayId.replace(/^PRP-/i, 'REQ-')}
          </span>
        </div>

        {/* Type */}
        <div className="w-[12%] min-w-[70px]">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${typeConfig.bg} ${typeConfig.text}`}>
            {t[typeConfig.labelKey]}
          </span>
        </div>

        {/* Quantity */}
        <div className="w-[8%] min-w-[40px] text-center">
          <span className="text-sm font-semibold text-stone-800 dark:text-stone-200 tabular-nums">{proposal.quantity}</span>
        </div>

        {/* Amount */}
        <div className="w-[14%] min-w-[90px]">
          <span className="text-sm font-semibold text-stone-900 dark:text-stone-100 tabular-nums">{formatCurrency(proposal.amount)}</span>
        </div>

        {/* Status or Accept/Reject */}
        <div className={`${showIncidentColumn ? 'w-[12%] min-w-[80px]' : 'flex-1 min-w-[80px]'}`}>
          {showProposalActions ? (
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={onAccept}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
              >
                {t.accept}
              </button>
              <button
                onClick={onReject}
                className="px-3.5 py-1.5 rounded-lg border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-semibold transition-colors"
              >
                {t.reject}
              </button>
            </div>
          ) : (
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
              {t[statusConfig.labelKey]}
            </span>
          )}
        </div>

        {/* Service Status (past tab only) */}
        {showIncidentColumn && (
          <div className="w-[12%] min-w-[90px]">
            {proposal.serviceStatus && proposal.serviceStatus !== 'not_applicable' ? (
              <span className="text-sm font-medium text-stone-600 dark:text-stone-300">
                {t[SERVICE_STATUS_CONFIG[proposal.serviceStatus].labelKey]}
              </span>
            ) : (
              <span className="text-sm font-bold text-stone-400 dark:text-stone-500">— —</span>
            )}
          </div>
        )}

        {/* Incident Created (past tab only) */}
        {showIncidentColumn && (
          <div className="flex-1 min-w-[100px]">
            {proposal.status === 'converted' ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-stone-700 dark:text-stone-300">{t.yes}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); window.parent.postMessage({ type: 'navigate', section: 'incident-management' }, '*') }}
                  className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                >
                  {t.viewIncident}
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <span className="text-sm font-bold text-stone-400 dark:text-stone-500">— —</span>
            )}
          </div>
        )}

        {/* Actions — three-dot menu */}
        <div className="relative flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-20" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-1 w-40 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 shadow-xl shadow-stone-200/40 dark:shadow-stone-950/60 overflow-hidden z-30">
                <button
                  onClick={() => { setMenuOpen(false); onView?.() }}
                  className="w-full text-left px-3.5 py-2.5 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                >
                  {t.viewDetail}
                </button>
                {isActive && (
                  <>
                    <div className="border-t border-stone-200 dark:border-stone-800" />
                    <button
                      onClick={() => { setMenuOpen(false); onCancel?.() }}
                      className="w-full text-left px-3.5 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                    >
                      {t.cancel}
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Overlay helper — tell parent shell to dim sidebar/header
// ---------------------------------------------------------------------------

function notifyParentOverlay(show: boolean) {
  if (window.parent !== window) {
    window.parent.postMessage({ type: show ? 'showOverlay' : 'hideOverlay' }, '*')
  }
}

// ---------------------------------------------------------------------------
// Accept Proposal Modal
// ---------------------------------------------------------------------------

function AcceptProposalModal({
  proposal,
  onClose,
  t,
}: {
  proposal: Proposal
  onClose: () => void
  t: Record<string, string>
}) {
  const [step, setStep] = useState<'confirm' | 'payment'>('confirm')
  const typeConfig = TYPE_CONFIG[proposal.type]

  useEffect(() => {
    notifyParentOverlay(true)
    return () => { notifyParentOverlay(false) }
  }, [])

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      {/* Backdrop */}
      <div className="fixed inset-0 z-[100] bg-black/50 dark:bg-black/70" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-[101] w-full max-w-lg max-h-[90vh] flex flex-col bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl my-auto overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-3">
            {step === 'payment' && (
              <button
                onClick={() => setStep('confirm')}
                className="p-1.5 -ml-1.5 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <ArrowUpRight className="w-4 h-4 -rotate-[135deg]" />
              </button>
            )}
            <div>
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-50">
                {step === 'confirm' ? 'Accept Proposal' : 'Make Payment'}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {step === 'confirm' ? 'Review and confirm to proceed with payment' : 'Choose a payment method'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'confirm' ? (
          <div className="p-6 overflow-y-auto">
            {/* Proposal Info */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <span className="text-sm font-semibold text-stone-900 dark:text-stone-50 font-mono tracking-tight">
                  {proposal.displayId}
                </span>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${typeConfig.bg} ${typeConfig.text}`}>
                  {t[typeConfig.labelKey]}
                </span>
              </div>
              <span className="text-xs text-stone-500 dark:text-stone-400">Qty: {proposal.quantity}</span>
            </div>

            {/* Amount Card */}
            <div className="rounded-xl border border-stone-200 dark:border-stone-800 p-5 mb-5 text-center">
              <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                Amount to Pay
              </p>
              <p className="text-3xl font-bold text-stone-900 dark:text-stone-50 tabular-nums">
                {formatCurrency(proposal.amount)}
              </p>
            </div>

            <p className="text-xs text-stone-500 dark:text-stone-400 mb-6 text-center">
              By accepting, you agree to pay {formatCurrency(proposal.amount)} to proceed.
            </p>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-sm font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep('payment')}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
              >
                Complete Payment
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6 overflow-y-auto">
            {/* Amount reminder */}
            <div className="flex items-center justify-between rounded-xl border border-stone-200 dark:border-stone-800 px-4 py-3 mb-6">
              <span className="text-sm text-stone-500 dark:text-stone-400">Total Amount</span>
              <span className="text-lg font-bold text-stone-900 dark:text-stone-50 tabular-nums">
                {formatCurrency(proposal.amount)}
              </span>
            </div>

            {/* Payment Options */}
            <div className="grid grid-cols-2 gap-3">
              {/* Pay with Wallet */}
              <button
                onClick={() => { onClose() }}
                className="flex flex-col items-center gap-3 p-5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40 transition-colors">
                  <Wallet className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-stone-900 dark:text-stone-50">Pay with Wallet</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">LOTS247 balance</p>
                </div>
              </button>

              {/* Pay with Razorpay */}
              <button
                onClick={() => { onClose() }}
                className="flex flex-col items-center gap-3 p-5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                  <CreditCard className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-center">
                  <p className="text-sm font-semibold text-stone-900 dark:text-stone-50">Pay with Razorpay</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">UPI, cards & more</p>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  )
}

// ---------------------------------------------------------------------------
// Reject Proposal Modal
// ---------------------------------------------------------------------------

const REJECT_REASONS = [
  'Amount too high',
  'Found a better offer',
  'Service not needed anymore',
  'Incorrect proposal details',
  'Taking too long',
  'Other',
]

function RejectProposalModal({
  proposal,
  onClose,
  t,
}: {
  proposal: Proposal
  onClose: () => void
  t: Record<string, string>
}) {
  const [selectedReason, setSelectedReason] = useState('')
  const [message, setMessage] = useState('')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const typeConfig = TYPE_CONFIG[proposal.type]

  useEffect(() => {
    notifyParentOverlay(true)
    return () => { notifyParentOverlay(false) }
  }, [])

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      {/* Backdrop */}
      <div className="fixed inset-0 z-[100] bg-black/50 dark:bg-black/70" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-[101] w-full max-w-lg max-h-[90vh] flex flex-col bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl my-auto overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-50">
              Reject Proposal
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Tell us why you're declining this proposal
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {/* Proposal Info */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <span className="text-sm font-semibold text-stone-900 dark:text-stone-50 font-mono tracking-tight">
                {proposal.displayId}
              </span>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${typeConfig.bg} ${typeConfig.text}`}>
                {t[typeConfig.labelKey]}
              </span>
            </div>
            <span className="text-sm font-semibold text-stone-900 dark:text-stone-100 tabular-nums">{formatCurrency(proposal.amount)}</span>
          </div>

          {/* Reason Dropdown */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
              Reason for Rejection <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-sm text-left transition-colors ${
                  selectedReason
                    ? 'border-stone-300 dark:border-stone-600 text-stone-900 dark:text-stone-100'
                    : 'border-stone-200 dark:border-stone-700 text-stone-400 dark:text-stone-500'
                } bg-white dark:bg-stone-800 hover:border-stone-300 dark:hover:border-stone-600`}
              >
                {selectedReason || 'Select a reason'}
                <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {dropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl shadow-xl shadow-stone-200/40 dark:shadow-stone-950/60 overflow-hidden z-20">
                    {REJECT_REASONS.map((reason) => (
                      <button
                        key={reason}
                        onClick={() => { setSelectedReason(reason); setDropdownOpen(false) }}
                        className={`w-full text-left px-3.5 py-2.5 text-sm transition-colors ${
                          selectedReason === reason
                            ? 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-300 font-medium'
                            : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700/50'
                        }`}
                      >
                        {reason}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
              Additional Message <span className="text-stone-400 dark:text-stone-500 font-normal normal-case">(optional)</span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add any additional details for the rejection..."
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-400 dark:focus:border-red-600 resize-none transition-colors"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 text-sm font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => { onClose() }}
              disabled={!selectedReason}
              className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-red-300 dark:disabled:bg-red-900/40 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors"
            >
              Reject Proposal
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

// ---------------------------------------------------------------------------
// Create Request Modal
// ---------------------------------------------------------------------------

function CreateRequestModal({
  isOpen,
  onClose,
  onCreateRequest,
  t,
}: {
  isOpen: boolean
  onClose: () => void
  onCreateRequest?: (type: 'challan' | 'rc' | 'dl') => void
  t: Record<string, string>
}) {
  useEffect(() => {
    if (isOpen) notifyParentOverlay(true)
    return () => { notifyParentOverlay(false) }
  }, [isOpen])

  if (!isOpen) return null

  const REQUEST_TYPES = [
    {
      id: 'challans',
      label: t.fleetChallans,
      description: t.fleetChallansDesc,
      icon: CreditCard,
      iconBg: 'bg-amber-50 dark:bg-amber-950/40',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      id: 'rc',
      label: t.vehicleRC,
      description: t.vehicleRCDesc,
      icon: FileText,
      iconBg: 'bg-sky-50 dark:bg-sky-950/40',
      iconColor: 'text-sky-600 dark:text-sky-400',
    },
    {
      id: 'dl',
      label: t.drivingLicense,
      description: t.drivingLicenseDesc,
      icon: IdCard,
      iconBg: 'bg-purple-50 dark:bg-purple-950/40',
      iconColor: 'text-purple-600 dark:text-purple-400',
    },
  ]

  function handleSelect(id: string) {
    onClose()
    if (onCreateRequest) {
      const typeMap: Record<string, 'challan' | 'rc' | 'dl'> = { challans: 'challan', rc: 'rc', dl: 'dl' }
      onCreateRequest(typeMap[id] || (id as 'challan' | 'rc' | 'dl'))
    } else {
      window.parent.postMessage({ type: 'navigate', href: `/compliance/${id}` }, '*')
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6" onClick={onClose}>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70 pointer-events-none" />

      {/* Modal */}
      <div
        className="relative z-[101] w-full max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-50">
              {t.createRequestTitle}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {t.createRequestSubtitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cards */}
        <div className="p-5 space-y-3">
          {REQUEST_TYPES.map((type) => {
            const Icon = type.icon
            return (
              <button
                key={type.id}
                onClick={() => handleSelect(type.id)}
                className="w-full flex items-center gap-4 p-4 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-all text-left group cursor-pointer"
              >
                <div className={`w-11 h-11 rounded-xl ${type.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${type.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-stone-900 dark:text-stone-50">
                    {type.label}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                    {type.description}
                  </p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-stone-300 dark:text-stone-600 group-hover:text-emerald-500 transition-colors flex-shrink-0" />
              </button>
            )
          })}
        </div>
      </div>
    </div>,
    document.body
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

type Tab = 'sent' | 'under_review' | 'received' | 'past'

export function ProposalList({
  proposals,
  onView,
  onFollowUp,
  onCancel,
  onCreateRequest,
}: ProposalListProps) {
  const { language } = useLanguage()
  const t = translations[language]
  const [activeTab, setActiveTab] = useState<Tab>('sent')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [acceptingProposal, setAcceptingProposal] = useState<Proposal | null>(null)
  const [rejectingProposal, setRejectingProposal] = useState<Proposal | null>(null)
  const [showCreateRequest, setShowCreateRequest] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [typeFilter, setTypeFilter] = useState<ProposalType | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<ProposalStatus | 'all'>('all')
  const [serviceStatusFilter, setServiceStatusFilter] = useState<ServiceStatus | 'all'>('all')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'amount' | 'qty'>('date')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const PAGE_SIZE = 5

  const activeFilterCount = (typeFilter !== 'all' ? 1 : 0) + (statusFilter !== 'all' ? 1 : 0) + (serviceStatusFilter !== 'all' ? 1 : 0) + (dateFrom ? 1 : 0) + (dateTo ? 1 : 0)

  const handleTabChange = (tab: Tab) => { setActiveTab(tab); setCurrentPage(1); setSearch(''); setTypeFilter('all'); setStatusFilter('all'); setServiceStatusFilter('all'); setDateFrom(''); setDateTo('') }

  const sentProposals = proposals.filter((p) => p.status === 'sent')
  const underReviewProposals = proposals.filter((p) => p.status === 'under_review')
  const receivedProposals = proposals.filter((p) => p.status === 'received')
  const pastProposals = proposals.filter((p) => p.status === 'converted' || p.status === 'rejected')

  const currentList =
    activeTab === 'sent' ? sentProposals :
    activeTab === 'under_review' ? underReviewProposals :
    activeTab === 'received' ? receivedProposals :
    pastProposals

  // Apply search
  let filtered = search.trim()
    ? currentList.filter(
        (p) =>
          p.displayId.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()) ||
          p.type.toLowerCase().includes(search.toLowerCase())
      )
    : [...currentList]

  // Apply type filter
  if (typeFilter !== 'all') {
    filtered = filtered.filter((p) => p.type === typeFilter)
  }

  // Apply status filter
  if (statusFilter !== 'all') {
    filtered = filtered.filter((p) => p.status === statusFilter)
  }

  // Apply service status filter
  if (serviceStatusFilter !== 'all') {
    filtered = filtered.filter((p) => p.serviceStatus === serviceStatusFilter)
  }

  // Apply date filter
  if (dateFrom) {
    const from = new Date(dateFrom)
    from.setHours(0, 0, 0, 0)
    filtered = filtered.filter((p) => new Date(p.createdAt) >= from)
  }
  if (dateTo) {
    const to = new Date(dateTo)
    to.setHours(23, 59, 59, 999)
    filtered = filtered.filter((p) => new Date(p.createdAt) <= to)
  }

  // Apply sort
  filtered.sort((a, b) => {
    let cmp = 0
    if (sortBy === 'date') cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    else if (sortBy === 'amount') cmp = a.amount - b.amount
    else if (sortBy === 'qty') cmp = a.quantity - b.quantity
    return sortDir === 'desc' ? -cmp : cmp
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(currentPage, totalPages)
  const paginated = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const emptyProps =
    activeTab === 'sent'
      ? { title: t.noSentProposals, description: t.noSentProposalsDesc }
      : activeTab === 'under_review'
      ? { title: 'No requests under review', description: 'Requests being reviewed by the LOTS team will appear here' }
      : activeTab === 'received'
      ? { title: t.noReceivedProposals, description: t.noReceivedProposalsDesc }
      : { title: t.noPastProposals, description: t.noPastProposalsDesc }

  const TAB_LIST = [
    { key: 'sent' as Tab, label: t.sentProposals, count: sentProposals.length },
    { key: 'under_review' as Tab, label: t.underReviewProposals, count: underReviewProposals.length },
    { key: 'received' as Tab, label: t.receivedProposals, count: receivedProposals.length },
    { key: 'past' as Tab, label: t.pastProposals, count: pastProposals.length },
  ]

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              {t.pageTitle}
            </h1>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">{t.pageSubtitle}</p>
          </div>
          <button
            onClick={() => setShowCreateRequest(true)}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            {t.createRequest}
          </button>
        </div>

        {/* Tabs — dropdown on mobile, pill bar on sm+ */}
        <div className="mb-5">
          {/* Mobile: dropdown (wider) + button in one row */}
          <div className="sm:hidden flex items-center gap-2">
            <select
              value={activeTab}
              onChange={(e) => handleTabChange(e.target.value as Tab)}
              className="flex-1 min-w-0 px-3.5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm font-medium text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
            >
              {TAB_LIST.map((tab) => (
                <option key={tab.key} value={tab.key}>
                  {tab.label} ({tab.count})
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowCreateRequest(true)}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shrink-0 whitespace-nowrap"
            >
              <Plus className="w-3.5 h-3.5" />
              Create
            </button>
          </div>
          {/* Desktop pill bar */}
          <div className="hidden sm:flex items-center gap-1 p-1 bg-stone-200/40 dark:bg-stone-900 rounded-lg w-fit">
            {TAB_LIST.map((tab) => {
              const isActive = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2 min-h-11 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-50 shadow-sm'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                  }`}
                >
                  {tab.label}
                  <span className={`text-xs tabular-nums px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                      : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Search + Filters */}
        <div className="mb-4 space-y-3">
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrentPage(1) }}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
              />
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                showFilters || activeFilterCount > 0
                  ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'
                  : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-100 hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:border-stone-600'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">{t.filters}</span>
              {activeFilterCount > 0 && (
                <span className="ml-1 w-5 h-5 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort dropdown */}
            <div className="hidden sm:flex items-center gap-1.5 text-sm relative">
              <select
                value={`${sortBy}-${sortDir}`}
                onChange={(e) => {
                  const [field, dir] = e.target.value.split('-') as [typeof sortBy, 'asc' | 'desc']
                  setSortBy(field)
                  setSortDir(dir)
                }}
                className="appearance-none pl-3 pr-8 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm font-medium text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors cursor-pointer"
              >
                <option value="date-desc">{t.dateNewest}</option>
                <option value="date-asc">{t.dateOldest}</option>
                <option value="amount-desc">{t.amountHigh}</option>
                <option value="amount-asc">{t.amountLow}</option>
                <option value="qty-desc">{t.qtyHigh}</option>
                <option value="qty-asc">{t.qtyLow}</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
            </div>
          </div>

          {/* Expanded filter panel */}
          {showFilters && (
            <div className="flex flex-wrap items-end gap-4 p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  {t.typeFilter}
                </label>
                <div className="relative">
                  <select
                    value={typeFilter}
                    onChange={(e) => { setTypeFilter(e.target.value as ProposalType | 'all'); setCurrentPage(1) }}
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                  >
                    <option value="all">{t.allTypes}</option>
                    <option value="Challan">{t.typeChallan}</option>
                    <option value="DL">{t.typeDL}</option>
                    <option value="RC">{t.typeRC}</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                </div>
              </div>

              {/* Date From */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  {t.from}
                </label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => { setDateFrom(e.target.value); setCurrentPage(1) }}
                  className="pl-3 pr-3 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                />
              </div>

              {/* Date To */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  {t.to}
                </label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => { setDateTo(e.target.value); setCurrentPage(1) }}
                  className="pl-3 pr-3 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                />
              </div>

              {/* Status filter */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  {t.statusFilter}
                </label>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => { setStatusFilter(e.target.value as ProposalStatus | 'all'); setCurrentPage(1) }}
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                  >
                    <option value="all">{t.allStatuses}</option>
                    <option value="sent">{t.statusSent}</option>
                    <option value="under_review">{t.statusUnderReview}</option>
                    <option value="received">{t.statusReceived}</option>
                    <option value="converted">{t.statusConverted}</option>
                    <option value="rejected">{t.statusRejected}</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                </div>
              </div>

              {/* Service Status filter */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  {t.serviceStatusFilter}
                </label>
                <div className="relative">
                  <select
                    value={serviceStatusFilter}
                    onChange={(e) => { setServiceStatusFilter(e.target.value as ServiceStatus | 'all'); setCurrentPage(1) }}
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                  >
                    <option value="all">{t.allServiceStatuses}</option>
                    <option value="pending">{t.serviceStatusPending}</option>
                    <option value="in_progress">{t.serviceStatusInProgress}</option>
                    <option value="completed">{t.serviceStatusCompleted}</option>
                    <option value="not_applicable">{t.serviceStatusNA}</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                </div>
              </div>

              {/* Mobile sort (shown in filter panel on small screens) */}
              <div className="flex flex-col gap-1 sm:hidden">
                <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  {t.sortBy}
                </label>
                <div className="relative">
                  <select
                    value={`${sortBy}-${sortDir}`}
                    onChange={(e) => {
                      const [field, dir] = e.target.value.split('-') as [typeof sortBy, 'asc' | 'desc']
                      setSortBy(field)
                      setSortDir(dir)
                    }}
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                  >
                    <option value="date-desc">{t.dateNewest}</option>
                    <option value="date-asc">{t.dateOldest}</option>
                    <option value="amount-desc">{t.amountHigh}</option>
                    <option value="amount-asc">{t.amountLow}</option>
                    <option value="qty-desc">{t.qtyHigh}</option>
                    <option value="qty-asc">{t.qtyLow}</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                </div>
              </div>

              {activeFilterCount > 0 && (
                <button
                  onClick={() => { setTypeFilter('all'); setStatusFilter('all'); setServiceStatusFilter('all'); setDateFrom(''); setDateTo(''); setCurrentPage(1) }}
                  className="px-3 py-2 min-h-11 text-xs font-medium text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
                >
                  {t.clearAll}
                </button>
              )}
            </div>
          )}

          {/* Filter pills (when panel is closed but filters active) */}
          {activeFilterCount > 0 && !showFilters && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-stone-500 dark:text-stone-400">{t.filteredBy}</span>
              {typeFilter !== 'all' && (
                <FilterPill
                  label={t[TYPE_CONFIG[typeFilter].labelKey]}
                  onClear={() => { setTypeFilter('all'); setCurrentPage(1) }}
                />
              )}
              {statusFilter !== 'all' && (
                <FilterPill
                  label={t[STATUS_CONFIG[statusFilter].labelKey]}
                  onClear={() => { setStatusFilter('all'); setCurrentPage(1) }}
                />
              )}
              {serviceStatusFilter !== 'all' && (
                <FilterPill
                  label={t[SERVICE_STATUS_CONFIG[serviceStatusFilter].labelKey]}
                  onClear={() => { setServiceStatusFilter('all'); setCurrentPage(1) }}
                />
              )}
              {dateFrom && (
                <FilterPill
                  label={`${t.from}: ${dateFrom}`}
                  onClear={() => { setDateFrom(''); setCurrentPage(1) }}
                />
              )}
              {dateTo && (
                <FilterPill
                  label={`${t.to}: ${dateTo}`}
                  onClear={() => { setDateTo(''); setCurrentPage(1) }}
                />
              )}
            </div>
          )}
        </div>

        {/* Table Card */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
          {/* Desktop Header */}
          <div className="hidden sm:flex items-center gap-0 px-5 py-3 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60">
            <div className="w-[14%] min-w-[90px] text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.createdDate}</div>
            <div className="w-[14%] min-w-[90px] text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.requestId}</div>
            <div className="w-[12%] min-w-[70px] text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.type}</div>
            <div className="w-[8%] min-w-[40px] text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider text-center">{t.quantity}</div>
            <div className="w-[14%] min-w-[90px] text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.amount}</div>
            <div className={`${activeTab === 'past' ? 'w-[12%] min-w-[80px]' : 'flex-1 min-w-[140px]'} text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider`}>
              {activeTab === 'received' ? 'Action' : t.status}
            </div>
            {activeTab === 'past' && (
              <div className="w-[12%] min-w-[90px] text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                {t.serviceStatus}
              </div>
            )}
            {activeTab === 'past' && (
              <div className="flex-1 min-w-[100px] text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                {t.incidentCreated}
              </div>
            )}
            <div className="w-10 flex-shrink-0" />
          </div>

          {/* Rows */}
          {filtered.length === 0 ? (
            <EmptyState {...emptyProps} />
          ) : (
            paginated.map((proposal) => (
              <ProposalRow
                key={proposal.id}
                proposal={proposal}
                onView={() => onView?.(proposal.id)}
                onFollowUp={() => onFollowUp?.(proposal.id)}
                onCancel={() => onCancel?.(proposal.id)}
                onAccept={() => setAcceptingProposal(proposal)}
                onReject={() => setRejectingProposal(proposal)}
                showProposalActions={activeTab === 'received'}
                showIncidentColumn={activeTab === 'past'}
                t={t}
                language={language}
              />
            ))
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 px-1">
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Showing {(safePage - 1) * PAGE_SIZE + 1}–{Math.min(safePage * PAGE_SIZE, filtered.length)} of {filtered.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                    safePage === page
                      ? 'bg-emerald-600 text-white'
                      : 'border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Accept Proposal Modal */}
      {acceptingProposal && (
        <AcceptProposalModal
          proposal={acceptingProposal}
          onClose={() => setAcceptingProposal(null)}
          t={t}
        />
      )}

      {/* Reject Proposal Modal */}
      {rejectingProposal && (
        <RejectProposalModal
          proposal={rejectingProposal}
          onClose={() => setRejectingProposal(null)}
          t={t}
        />
      )}

      {/* Create Request Modal */}
      <CreateRequestModal
        isOpen={showCreateRequest}
        onClose={() => setShowCreateRequest(false)}
        onCreateRequest={onCreateRequest}
        t={t}
      />
    </div>
  )
}
