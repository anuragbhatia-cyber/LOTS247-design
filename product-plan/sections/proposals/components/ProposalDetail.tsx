import { useState } from 'react'
import {
  ArrowLeft,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  Info,
  Activity,
  FileText,
  ArrowUpRight,
  Calendar,
  Hash,
  Layers,
  IndianRupee,
  Truck,
  User,
  CreditCard,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react'
import type {
  ProposalDetailProps,
  ProposalStatus,
  ProposalType,
  ProposalActivity,
  Comment,
} from '../types'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const translations: Record<Language, Record<string, string>> = {
  en: {
    backToProposals: 'Back to Proposals',
    statusSent: 'Sent',
    statusUnderReview: 'Under Review',
    statusReceived: 'Received',
    statusConverted: 'Converted',
    statusRejected: 'Rejected',
    typeChallan: 'Challan',
    typeDL: 'DL',
    typeRC: 'RC',
    created: 'Created',
    proposalDetails: 'Proposal Details',
    timeline: 'Timeline',
    type: 'Type',
    quantity: 'Quantity',
    amount: 'Amount',
    lastUpdated: 'Last Updated',
    linkedIncident: 'Linked Incident',
    description: 'Description',
    cancelProposal: 'Cancel Proposal',
    accept: 'Accept',
    reject: 'Reject',
    details: 'Details',
    quantityTab: 'Quantity',
    sNo: 'S.No',
    vehicleNumber: 'Vehicle Number',
    challanId: 'Challan ID',
    itemAmount: 'Amount',
    itemStatus: 'Status',
    expired: 'Expired',
    expiring: 'Expiring',
    licenceNumber: 'Licence Number',
    driverName: 'Driver Name',
    rcNumber: 'RC Number',
    ownerName: 'Owner Name',
    incidents: 'Incidents',
    notes: 'Notes',
    writeNote: 'Write a note...',
    you: 'You',
    lotsTeam: 'LOTS Team',
    send: 'Send',
  },
  hi: {
    backToProposals: 'प्रस्तावों पर वापस',
    statusSent: 'भेजा गया',
    statusUnderReview: 'समीक्षाधीन',
    statusReceived: 'प्राप्त',
    statusConverted: 'परिवर्तित',
    statusRejected: 'अस्वीकृत',
    typeChallan: 'चालान',
    typeDL: 'डीएल',
    typeRC: 'आरसी',
    created: 'बनाया गया',
    proposalDetails: 'प्रस्ताव विवरण',
    timeline: 'समयरेखा',
    type: 'प्रकार',
    quantity: 'मात्रा',
    amount: 'राशि',
    lastUpdated: 'अंतिम अपडेट',
    linkedIncident: 'लिंक किया गया मामला',
    description: 'विवरण',
    cancelProposal: 'प्रस्ताव रद्द करें',
    accept: 'स्वीकार',
    reject: 'अस्वीकार',
    details: 'विवरण',
    quantityTab: 'मात्रा',
    sNo: 'क्र.सं.',
    vehicleNumber: 'वाहन नंबर',
    challanId: 'चालान आईडी',
    itemAmount: 'राशि',
    itemStatus: 'स्थिति',
    expired: 'समाप्त',
    expiring: 'समाप्त हो रहा',
    licenceNumber: 'लाइसेंस नंबर',
    driverName: 'ड्राइवर का नाम',
    rcNumber: 'आरसी नंबर',
    ownerName: 'मालिक का नाम',
    incidents: 'इंसिडेंट',
    notes: 'नोट्स',
    writeNote: 'नोट लिखें...',
    you: 'आप',
    lotsTeam: 'LOTS टीम',
    send: 'भेजें',
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
      <div className="p-5 sm:p-6">{children}</div>
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

type TimelineEntry =
  | { kind: 'created'; timestamp: string }
  | { kind: 'activity'; activity: ProposalActivity }
  | { kind: 'comment'; comment: Comment }

function Timeline({
  activities,
  createdAt,
  comments,
  language,
}: {
  activities: ProposalActivity[]
  createdAt: string
  comments?: Comment[]
  language: Language
}) {
  const t = translations[language]

  const activityEntries: TimelineEntry[] = activities.map((a) => ({ kind: 'activity', activity: a }))
  const commentEntries: TimelineEntry[] = (comments ?? []).map((c) => ({ kind: 'comment', comment: c }))

  const allEntries: TimelineEntry[] = [...activityEntries, ...commentEntries]
  allEntries.sort((a, b) => {
    const tsA = a.kind === 'created' ? a.timestamp : a.kind === 'activity' ? a.activity.timestamp : a.comment.createdAt
    const tsB = b.kind === 'created' ? b.timestamp : b.kind === 'activity' ? b.activity.timestamp : b.comment.createdAt
    return new Date(tsB).getTime() - new Date(tsA).getTime()
  })

  const entries: TimelineEntry[] = [
    ...allEntries,
    { kind: 'created', timestamp: createdAt },
  ]

  return (
    <div>
      {entries.map((entry, index) => {
        const isLast = index === entries.length - 1
        if (entry.kind === 'created') {
          return (
            <div key="created" className="flex gap-4">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-stone-300 dark:bg-stone-600 mt-1.5 flex-shrink-0" />
              </div>
              <div className="pb-1 min-w-0">
                <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                  Request Created
                </p>
                <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                  {formatDate(entry.timestamp, language)}
                </p>
              </div>
            </div>
          )
        }
        if (entry.kind === 'comment') {
          const isTeam = entry.comment.authorType === 'team'
          return (
            <div key={entry.comment.id} className="flex gap-4">
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-3 h-3 rounded-full bg-emerald-500 dark:bg-emerald-400 mt-1.5 flex-shrink-0" />
                {!isLast && (
                  <div className="flex-1 w-px bg-stone-200 dark:bg-stone-700 my-1" />
                )}
              </div>
              <div className="pb-5 min-w-0">
                <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                  {isTeam ? t.lotsTeam : t.you}
                </p>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 line-clamp-2">
                  {entry.comment.message}
                </p>
                <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                  {formatDate(entry.comment.createdAt, language)}
                </p>
              </div>
            </div>
          )
        }
        return (
          <div key={entry.activity.id} className="flex gap-4">
            <div className="flex flex-col items-center flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-emerald-500 dark:bg-emerald-400 mt-1.5 flex-shrink-0" />
              {!isLast && (
                <div className="flex-1 w-px bg-stone-200 dark:bg-stone-700 my-1" />
              )}
            </div>
            <div className="pb-5 min-w-0">
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 leading-snug">
                {ACTIVITY_HEADING[entry.activity.actionType] ?? 'Update'}
              </p>
              <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                {formatDate(entry.activity.timestamp, language)}
              </p>
            </div>
          </div>
        )
      })}
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
      {/* Detail fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0">
        <DetailRow
          icon={FileText}
          label={t.type}
          value={
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${typeConfig.bg} ${typeConfig.text}`}>
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
// Quantity Tab — shows individual items in the proposal
// ---------------------------------------------------------------------------

const CHALLAN_ITEMS = [
  { id: 'CH-90281', vehicle: 'UP14AT1234', amount: 25000, status: 'Expired' },
  { id: 'CH-90282', vehicle: 'UP14AT1234', amount: 15000, status: 'Expiring' },
  { id: 'CH-90283', vehicle: 'UP14BT5678', amount: 20000, status: 'Expired' },
  { id: 'CH-90284', vehicle: 'UP14BT5678', amount: 18000, status: 'Expired' },
  { id: 'CH-90285', vehicle: 'UP14CT9012', amount: 22000, status: 'Expiring' },
  { id: 'CH-90286', vehicle: 'UP14CT9012', amount: 20000, status: 'Expired' },
  { id: 'CH-90287', vehicle: 'UP14DT3456', amount: 30000, status: 'Expired' },
  { id: 'CH-90288', vehicle: 'UP14DT3456', amount: 15000, status: 'Expiring' },
  { id: 'CH-90289', vehicle: 'UP14ET7890', amount: 25000, status: 'Expired' },
  { id: 'CH-90290', vehicle: 'UP14ET7890', amount: 20000, status: 'Expiring' },
  { id: 'CH-90291', vehicle: 'UP14FT2345', amount: 15000, status: 'Expired' },
  { id: 'CH-90292', vehicle: 'UP14FT2345', amount: 15000, status: 'Expiring' },
]

const DL_ITEMS = [
  { licence: 'DL-0420110012345', driver: 'Ramesh Kumar', status: 'Expired' },
  { licence: 'UP-0520110067890', driver: 'Suresh Singh', status: 'Expiring' },
  { licence: 'MP-0120110054321', driver: 'Anil Yadav', status: 'Expired' },
  { licence: 'UP-0720110098765', driver: 'Manoj Gupta', status: 'Expiring' },
  { licence: 'MP-0220110011111', driver: 'Vijay Sharma', status: 'Expired' },
]

const RC_ITEMS = [
  { rc: 'RC-UP14AT1234', vehicle: 'UP14AT1234', status: 'Expired' },
  { rc: 'RC-UP14BT5678', vehicle: 'UP14BT5678', status: 'Expiring' },
  { rc: 'RC-RJ14CT9012', vehicle: 'RJ14CT9012', status: 'Expired' },
  { rc: 'RC-RJ14DT3456', vehicle: 'RJ14DT3456', status: 'Expiring' },
  { rc: 'RC-UP14ET7890', vehicle: 'UP14ET7890', status: 'Expired' },
  { rc: 'RC-UP14FT2345', vehicle: 'UP14FT2345', status: 'Expired' },
  { rc: 'RC-MP09GT6789', vehicle: 'MP09GT6789', status: 'Expiring' },
  { rc: 'RC-MP09HT0123', vehicle: 'MP09HT0123', status: 'Expired' },
]

const ITEM_STATUS_STYLE: Record<string, string> = {
  Expired: 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300',
  Expiring: 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300',
}

function QuantityTab({
  proposal,
  language,
}: {
  proposal: ProposalDetailProps['proposal']
  language: Language
}) {
  const t = translations[language]

  if (proposal.type === 'Challan') {
    const items = CHALLAN_ITEMS.slice(0, proposal.quantity)
    return (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-stone-200 dark:border-stone-800">
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.sNo}</th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.challanId}</th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.vehicleNumber}</th>
              <th className="text-right px-4 py-3 text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.itemAmount}</th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.itemStatus}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
            {items.map((item, i) => (
              <tr key={item.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                <td className="px-4 py-3 text-sm text-stone-500 dark:text-stone-400">{i + 1}</td>
                <td className="px-4 py-3 text-sm font-mono font-medium text-stone-900 dark:text-stone-100">{item.id}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-stone-400" />
                    <span className="text-sm text-stone-700 dark:text-stone-300">{item.vehicle}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right text-sm font-semibold text-stone-900 dark:text-stone-100 tabular-nums">{formatCurrency(item.amount)}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${ITEM_STATUS_STYLE[item.status] || ''}`}>{item.status === 'Expired' ? t.expired : t.expiring}</span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40">
              <td colSpan={3} className="px-4 py-3 text-sm font-semibold text-stone-700 dark:text-stone-300">Total ({items.length} items)</td>
              <td className="px-4 py-3 text-right text-sm font-bold text-stone-900 dark:text-stone-50 tabular-nums">{formatCurrency(proposal.amount)}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </div>
    )
  }

  if (proposal.type === 'DL') {
    const items = DL_ITEMS.slice(0, proposal.quantity)
    return (
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-stone-200 dark:border-stone-800">
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.sNo}</th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.licenceNumber}</th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.driverName}</th>
              <th className="text-left px-4 py-3 text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.itemStatus}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
            {items.map((item, i) => (
              <tr key={item.licence} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                <td className="px-4 py-3 text-sm text-stone-500 dark:text-stone-400">{i + 1}</td>
                <td className="px-4 py-3 text-sm font-mono font-medium text-stone-900 dark:text-stone-100">{item.licence}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-stone-400" />
                    <span className="text-sm text-stone-700 dark:text-stone-300">{item.driver}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${ITEM_STATUS_STYLE[item.status] || ''}`}>{item.status === 'Expired' ? t.expired : t.expiring}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  // RC
  const items = RC_ITEMS.slice(0, proposal.quantity)
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[500px]">
        <thead>
          <tr className="border-b border-stone-200 dark:border-stone-800">
            <th className="text-left px-4 py-3 text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.sNo}</th>
            <th className="text-left px-4 py-3 text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.rcNumber}</th>
            <th className="text-left px-4 py-3 text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.vehicleNumber}</th>
            <th className="text-left px-4 py-3 text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.itemStatus}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
          {items.map((item, i) => (
            <tr key={item.rc} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
              <td className="px-4 py-3 text-sm text-stone-500 dark:text-stone-400">{i + 1}</td>
              <td className="px-4 py-3 text-sm font-mono font-medium text-stone-900 dark:text-stone-100">{item.rc}</td>
              <td className="px-4 py-3 text-sm text-stone-700 dark:text-stone-300">{item.vehicle}</td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${ITEM_STATUS_STYLE[item.status] || ''}`}>{item.status === 'Expired' ? t.expired : t.expiring}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Incidents Tab — shows linked incidents
// ---------------------------------------------------------------------------

const INCIDENT_ITEMS = [
  { id: 'INC-20261001', type: 'Challan', vehicle: 'UP14AT1234', status: 'Open', date: '2026-03-22', description: 'Overloading challan — pending court hearing' },
  { id: 'INC-20261002', type: 'Challan', vehicle: 'UP14BT5678', status: 'In Progress', date: '2026-03-23', description: 'Speed violation — Lok Adalat batch processing' },
  { id: 'INC-20261003', type: 'Challan', vehicle: 'UP14CT9012', status: 'Open', date: '2026-03-24', description: 'Red light violation — RTO follow-up required' },
  { id: 'INC-20261004', type: 'Challan', vehicle: 'RJ14DT3456', status: 'Resolved', date: '2026-03-20', description: 'Fitness certificate expired — resolved via RTO' },
  { id: 'INC-20261005', type: 'Challan', vehicle: 'MP09GT6789', status: 'Open', date: '2026-03-25', description: 'No PUC certificate — pending compliance check' },
]

const INCIDENT_STATUS_STYLE: Record<string, string> = {
  Open: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300',
  'In Progress': 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300',
  Resolved: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300',
}

function IncidentsTab({
  proposal,
  language,
}: {
  proposal: ProposalDetailProps['proposal']
  language: Language
}) {
  const t = translations[language]
  const items = proposal.linkedIncidentId ? INCIDENT_ITEMS : INCIDENT_ITEMS.slice(0, 3)

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px]">
        <thead>
          <tr className="border-b border-stone-200 dark:border-stone-800">
            <th className="text-left px-4 py-3 text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.sNo}</th>
            <th className="text-left px-4 py-3 text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.vehicleNumber}</th>
            <th className="text-left px-4 py-3 text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">{t.itemStatus}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
          {items.map((item, i) => (
            <tr key={item.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
              <td className="px-4 py-3 text-sm text-stone-500 dark:text-stone-400">{i + 1}</td>
              <td className="px-4 py-3 text-sm text-stone-700 dark:text-stone-300">{item.vehicle}</td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${INCIDENT_STATUS_STYLE[item.status] || ''}`}>{item.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Notes Tab — conversation thread between user and LOTS team
// ---------------------------------------------------------------------------

function NotesTab({
  comments,
  onAddComment,
  language,
}: {
  comments: Comment[]
  onAddComment?: (message: string) => void
  language: Language
}) {
  const t = translations[language]
  const [draft, setDraft] = useState('')

  const sorted = [...comments].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )

  const handleSend = () => {
    const text = draft.trim()
    if (!text) return
    onAddComment?.(text)
    setDraft('')
  }

  return (
    <div className="flex flex-col">
      {/* Messages */}
      <div className="p-4 sm:p-5 space-y-3">
        {sorted.length === 0 && (
          <div className="py-12 text-center">
            <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto mb-3">
              <MessageSquare className="w-5 h-5 text-stone-400 dark:text-stone-500" />
            </div>
            <p className="text-sm font-medium text-stone-500 dark:text-stone-400">No notes yet</p>
            <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">{t.writeNote}</p>
          </div>
        )}
        {sorted.map((comment) => {
          const isTeam = comment.authorType === 'team'
          return (
            <div
              key={comment.id}
              className={`rounded-xl p-4 ${
                isTeam
                  ? 'bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40'
                  : 'bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-700/50'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  isTeam
                    ? 'bg-emerald-500 dark:bg-emerald-600'
                    : 'bg-stone-700 dark:bg-stone-600'
                }`}>
                  {isTeam
                    ? <ShieldCheck className="w-3.5 h-3.5 text-white" />
                    : <User className="w-3.5 h-3.5 text-white" />
                  }
                </div>
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  <span className="text-[13px] font-semibold text-stone-900 dark:text-stone-100 truncate">
                    {comment.authorName}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    isTeam
                      ? 'bg-emerald-200/70 dark:bg-emerald-800/50 text-emerald-800 dark:text-emerald-300'
                      : 'bg-stone-200/70 dark:bg-stone-700/50 text-stone-600 dark:text-stone-400'
                  }`}>
                    {isTeam ? t.lotsTeam : t.you}
                  </span>
                </div>
                <span className="text-[11px] text-stone-400 dark:text-stone-500 flex-shrink-0 tabular-nums">
                  {formatDate(comment.createdAt, language)}
                </span>
              </div>
              <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed pl-[38px]">
                {comment.message}
              </p>
            </div>
          )
        })}
      </div>

      {/* Compose */}
      <div className="border-t border-stone-200 dark:border-stone-800 p-4 sm:p-5">
        <div className="flex items-center gap-2.5">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSend()
              }
            }}
            placeholder={t.writeNote}
            rows={1}
            className="flex-1 resize-none rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 px-3.5 py-2 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-400 dark:focus:border-emerald-500 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!draft.trim()}
            className="flex-shrink-0 h-[34px] px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            {t.send}
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function ProposalDetail({
  proposal,
  activities,
  comments = [],
  onAddComment,
  onCancel,
  onBack,
  onAccept,
  onReject,
}: ProposalDetailProps & {
  onAccept?: () => void
  onReject?: () => void
}) {
  const { language } = useLanguage()
  const t = translations[language]
  const [activeTab, setActiveTab] = useState<'details' | 'quantity' | 'notes' | 'incidents'>('details')
  const [localComments, setLocalComments] = useState<Comment[]>(comments)

  const statusConfig = STATUS_CONFIG[proposal.status]
  const StatusIcon = statusConfig.icon
  const typeConfig = TYPE_CONFIG[proposal.type]
  const isActive = proposal.status === 'sent'

  const incidentCount = proposal.linkedIncidentId ? INCIDENT_ITEMS.length : 3

  const handleAddComment = (message: string) => {
    const newComment: Comment = {
      id: `cmt-local-${Date.now()}`,
      entityType: 'proposal',
      entityId: proposal.id,
      authorType: 'user',
      authorName: 'You',
      message,
      createdAt: new Date().toISOString(),
    }
    setLocalComments((prev) => [...prev, newComment])
    onAddComment?.(message)
  }

  const TABS: { id: 'details' | 'quantity' | 'notes' | 'incidents'; label: string; icon?: typeof Info; count?: number }[] = [
    { id: 'details', label: t.details, icon: Info },
    { id: 'quantity', label: t.quantityTab, icon: Layers, count: proposal.quantity },
    { id: 'notes', label: t.notes, count: localComments.length || undefined },
    ...(proposal.status === 'converted' ? [{ id: 'incidents' as const, label: t.incidents, icon: Activity, count: incidentCount }] : []),
  ]

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
      <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-10">

        {/* Hero Header Card */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden mb-6">
          <div className="p-5 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              {/* Left: Proposal Info */}
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <button
                    onClick={onBack}
                    className="mt-1 p-2 -ml-1 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex-shrink-0"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight font-mono">
                        {proposal.displayId}
                      </h1>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
                        <StatusIcon className="w-3 h-3" />
                        {t[statusConfig.labelKey]}
                      </span>
                    </div>
                    <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
                      {t.created} {formatDate(proposal.createdAt, language)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Amount + Actions */}
              <div className="flex-shrink-0 lg:text-right flex flex-col items-start lg:items-end gap-2">
                <p className="text-xl font-bold text-stone-900 dark:text-stone-50 tabular-nums">
                  {formatCurrency(proposal.amount)}
                </p>
                {proposal.status === 'received' && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={onAccept}
                      className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors"
                    >
                      {t.accept}
                    </button>
                    <button
                      onClick={onReject}
                      className="px-4 py-2 rounded-xl border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 text-xs font-semibold transition-colors"
                    >
                      {t.reject}
                    </button>
                  </div>
                )}
                {isActive && (
                  <button
                    onClick={onCancel}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 dark:border-red-800 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    {t.cancelProposal}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 px-5 sm:px-6 border-t border-stone-200 dark:border-stone-800">
            {TABS.map((tab) => {
              const TabIcon = tab.icon
              const isTabActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-3.5 text-sm font-medium transition-colors ${
                    isTabActive
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                  }`}
                >
                  {TabIcon && <TabIcon className="w-4 h-4" />}
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      isTabActive
                        ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                  {isTabActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-5 items-start">
          {activeTab === 'details' ? (
            <SectionCard>
              <OverviewTab proposal={proposal} language={language} />
            </SectionCard>
          ) : activeTab === 'quantity' ? (
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
              <QuantityTab proposal={proposal} language={language} />
            </div>
          ) : activeTab === 'notes' ? (
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
              <NotesTab comments={localComments} onAddComment={handleAddComment} language={language} />
            </div>
          ) : (
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
              <IncidentsTab proposal={proposal} language={language} />
            </div>
          )}
          <SectionCard title={t.timeline} icon={Activity} count={activities.length + localComments.length}>
            <Timeline activities={activities} comments={localComments} createdAt={proposal.createdAt} language={language} />
          </SectionCard>
        </div>

      </div>
    </div>
  )
}
