import { useState } from 'react'
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
import { useLanguage, type Language } from '@/shell/components/LanguageContext'

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Back
    backToCases: 'Back to Cases',

    // Status labels
    statusSubmitted: 'Submitted',
    statusInProgress: 'In Progress',
    statusResolved: 'Resolved',
    statusDocumentRequested: 'Document Requested',
    statusExtended: 'Extended',

    // Case type labels
    caseTypeAccident: 'Accident',
    caseTypeVehicleDetention: 'Vehicle Detention',
    caseTypeTheft: 'Theft',
    caseTypeVehicleImpounding: 'Vehicle Impounding',
    caseTypeInsuranceDispute: 'Insurance Dispute',
    caseTypeLegalComplaint: 'Legal Complaint',
    caseTypeRTOEscalation: 'RTO Escalation',
    caseTypeEscalatedChallan: 'Escalated Challan',

    // Tabs
    tabOverview: 'Overview',
    tabOverviewShort: 'Overview',
    tabDocuments: 'Documents',
    tabDocumentsShort: 'Docs',
    tabReports: 'Reports',
    tabReportsShort: 'Reports',
    tabComments: 'Comments',
    tabCommentsShort: 'Chat',

    // Origin badges
    originLawyerCall: 'Lawyer Call',
    originEscalated: 'Escalated',

    // Created prefix
    created: 'Created',

    // Section card titles
    caseDetails: 'Case Details',
    timeline: 'Timeline',
    documents: 'Documents',
    reports: 'Reports',
    comments: 'Comments',

    // Overview tab
    escalatedFromChallan: 'Escalated from challan',
    vehicle: 'Vehicle',
    driver: 'Driver',
    lastUpdated: 'Last Updated',
    assignedLawyer: 'Assigned Lawyer',
    notYetAssigned: 'Not yet assigned',
    lawyerAssignedAfterScreening: 'A lawyer will be assigned after screening',

    // Documents tab
    uploadDocument: 'Upload a document',
    noDocumentsUploaded: 'No documents uploaded yet',
    you: 'You',
    lawyer: 'Lawyer',

    // Reports tab
    noReportsGenerated: 'No reports generated yet',
    download: 'Download',

    // Comments tab
    noCommentsYet: 'No comments yet. Start the conversation below.',
    support: 'Support',
    typeAMessage: 'Type a message...',
    enterToSend: 'Press Enter to send, Shift+Enter for new line',

    // Timeline
    noActivityYet: 'No activity yet',
  },
  hi: {
    // Back
    backToCases: 'मामलों पर वापस',

    // Status labels
    statusSubmitted: 'प्रस्तुत',
    statusInProgress: 'प्रगति में',
    statusResolved: 'हल किया',
    statusDocumentRequested: 'दस्तावेज़ अनुरोधित',
    statusExtended: 'विस्तारित',

    // Case type labels
    caseTypeAccident: 'दुर्घटना',
    caseTypeVehicleDetention: 'वाहन हिरासत',
    caseTypeTheft: 'चोरी',
    caseTypeVehicleImpounding: 'वाहन जब्ती',
    caseTypeInsuranceDispute: 'बीमा विवाद',
    caseTypeLegalComplaint: 'कानूनी शिकायत',
    caseTypeRTOEscalation: 'आरटीओ शिकायत',
    caseTypeEscalatedChallan: 'बढ़ाया गया चालान',

    // Tabs
    tabOverview: 'अवलोकन',
    tabOverviewShort: 'अवलोकन',
    tabDocuments: 'दस्तावेज़',
    tabDocumentsShort: 'दस्तावेज़',
    tabReports: 'रिपोर्ट',
    tabReportsShort: 'रिपोर्ट',
    tabComments: 'टिप्पणियाँ',
    tabCommentsShort: 'चैट',

    // Origin badges
    originLawyerCall: 'वकील कॉल',
    originEscalated: 'बढ़ाया गया',

    // Created prefix
    created: 'बनाया गया',

    // Section card titles
    caseDetails: 'मामले का विवरण',
    timeline: 'समयरेखा',
    documents: 'दस्तावेज़',
    reports: 'रिपोर्ट',
    comments: 'टिप्पणियाँ',

    // Overview tab
    escalatedFromChallan: 'चालान से बढ़ाया गया',
    vehicle: 'वाहन',
    driver: 'ड्राइवर',
    lastUpdated: 'अंतिम अपडेट',
    assignedLawyer: 'नियुक्त वकील',
    notYetAssigned: 'अभी तक नियुक्त नहीं',
    lawyerAssignedAfterScreening: 'स्क्रीनिंग के बाद वकील नियुक्त किया जाएगा',

    // Documents tab
    uploadDocument: 'दस्तावेज़ अपलोड करें',
    noDocumentsUploaded: 'अभी तक कोई दस्तावेज़ अपलोड नहीं किया गया',
    you: 'आप',
    lawyer: 'वकील',

    // Reports tab
    noReportsGenerated: 'अभी तक कोई रिपोर्ट नहीं बनी',
    download: 'डाउनलोड',

    // Comments tab
    noCommentsYet: 'अभी कोई टिप्पणी नहीं। नीचे बातचीत शुरू करें।',
    support: 'सहायता',
    typeAMessage: 'संदेश लिखें...',
    enterToSend: 'भेजने के लिए Enter दबाएं, नई लाइन के लिए Shift+Enter',

    // Timeline
    noActivityYet: 'अभी तक कोई गतिविधि नहीं',
  },
}

// ---------------------------------------------------------------------------
// Case type translation key map
// ---------------------------------------------------------------------------

const CASE_TYPE_TRANSLATION_KEY: Record<CaseType, string> = {
  Accident: 'caseTypeAccident',
  'Vehicle Detention': 'caseTypeVehicleDetention',
  Theft: 'caseTypeTheft',
  'Vehicle Impounding': 'caseTypeVehicleImpounding',
  'Insurance Dispute': 'caseTypeInsuranceDispute',
  'Legal Complaint': 'caseTypeLegalComplaint',
  'RTO Escalation': 'caseTypeRTOEscalation',
  'Escalated Challan': 'caseTypeEscalatedChallan',
}

// ---------------------------------------------------------------------------
// Status config
// ---------------------------------------------------------------------------

const STATUS_CONFIG: Record<
  CaseStatus,
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
  documentRequested: {
    labelKey: 'statusDocumentRequested',
    bg: 'bg-purple-50 dark:bg-purple-950/40',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800',
    icon: FileQuestion,
  },
  extended: {
    labelKey: 'statusExtended',
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

function formatTimeOnly(dateStr: string, language: Language): string {
  return new Date(dateStr).toLocaleTimeString(getLocale(language), {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function groupActivitiesByDate(activities: CaseActivity[], language: Language) {
  const groups: Record<string, CaseActivity[]> = {}
  const sorted = [...activities].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  for (const activity of sorted) {
    const dateKey = new Date(activity.timestamp).toLocaleDateString(getLocale(language), {
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
// Tab types
// ---------------------------------------------------------------------------

type TabId = 'overview' | 'documents' | 'reports' | 'comments'

const TABS: { id: TabId; labelKey: string; shortLabelKey: string; icon: typeof Activity }[] = [
  { id: 'overview', labelKey: 'tabOverview', shortLabelKey: 'tabOverviewShort', icon: Info },
  { id: 'documents', labelKey: 'tabDocuments', shortLabelKey: 'tabDocumentsShort', icon: Paperclip },
  { id: 'reports', labelKey: 'tabReports', shortLabelKey: 'tabReportsShort', icon: FileDown },
  { id: 'comments', labelKey: 'tabComments', shortLabelKey: 'tabCommentsShort', icon: MessageSquare },
]

// ---------------------------------------------------------------------------
// Timeline
// ---------------------------------------------------------------------------

const CASE_ACTIVITY_HEADING: Record<string, string> = {
  statusChange: 'Status Update',
  lawyerAssigned: 'Lawyer Assigned',
  note: 'Note',
}

function Timeline({ activities }: { activities: CaseActivity[] }) {
  const { language } = useLanguage()
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
              {CASE_ACTIVITY_HEADING[activity.actionType] ?? 'Update'}
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
// Documents Tab
// ---------------------------------------------------------------------------

function DocumentsTab({
  documents,
  onUploadDocument,
}: {
  documents: CaseDocument[]
  onUploadDocument?: (file: File) => void
}) {
  const { language } = useLanguage()
  const t = translations[language]
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
          <span className="text-sm font-medium">{t.uploadDocument}</span>
        </button>
      </div>

      {documents.length === 0 ? (
        <EmptyState icon={Paperclip} message={t.noDocumentsUploaded} />
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
                    {doc.uploadedBy === 'user' ? t.you : t.lawyer}
                  </span>
                  <span className="text-[11px] text-stone-500 dark:text-stone-400">
                    {formatDateTime(doc.uploadedAt, language)}
                  </span>
                </div>
              </div>

              <button className="p-3.5 rounded-lg text-stone-400 dark:text-stone-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-stone-700 transition-colors flex-shrink-0">
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
  const { language } = useLanguage()
  const t = translations[language]

  if (reports.length === 0) {
    return <EmptyState icon={FileDown} message={t.noReportsGenerated} />
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
              <span className="text-[11px] text-stone-500 dark:text-stone-400 font-mono truncate">
                {report.fileName}
              </span>
              <span className="text-stone-300 dark:text-stone-600">&middot;</span>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 whitespace-nowrap">
                {formatDate(report.generatedAt, language)}
              </span>
            </div>
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-white dark:hover:bg-stone-700 transition-colors flex-shrink-0">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">{t.download}</span>
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
        <EmptyState
          icon={MessageSquare}
          message={t.noCommentsYet}
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
  const { language } = useLanguage()
  const t = translations[language]
  const CaseTypeIcon = CASE_TYPE_ICONS[caseData.caseType] || Briefcase
  const caseTypeKey = CASE_TYPE_TRANSLATION_KEY[caseData.caseType]
  const caseTypeLabel = caseTypeKey ? t[caseTypeKey] : caseData.caseType

  return (
    <div className="space-y-3">
      {/* Case Type + Description */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <CaseTypeIcon className="w-4 h-4 text-stone-500 dark:text-stone-400" />
          <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
            {caseTypeLabel}
          </span>
        </div>
        <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
          {caseData.description}
        </p>
        {caseData.escalatedFromChallanId && (
          <div className="mt-2.5 flex items-center gap-2 px-3 py-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
            <ArrowUpRight className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <p className="text-xs text-amber-700 dark:text-amber-300">
              {t.escalatedFromChallan}{' '}
              <span className="font-mono font-semibold">
                {caseData.escalatedFromChallanId.toUpperCase()}
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Detail fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0 pt-2 border-t border-stone-100 dark:border-stone-800">
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
          label={t.lastUpdated}
          value={formatDate(caseData.updatedAt, language)}
        />
      </div>

      {/* Assigned Lawyer */}
      <div className="pt-3 border-t border-stone-100 dark:border-stone-800">
        <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-3">
          {t.assignedLawyer}
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
                {t.notYetAssigned}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                {t.lawyerAssignedAfterScreening}
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
  const { language } = useLanguage()
  const t = translations[language]
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
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
      <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-10">

        {/* Back Button with ID + Date */}
        <button
          onClick={onBack}
          className="flex items-center gap-3 mb-6 group"
        >
          <div className="w-8 h-8 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 flex items-center justify-center group-hover:bg-stone-100 dark:group-hover:bg-stone-800 transition-colors">
            <ArrowLeft className="w-4 h-4 text-stone-500 dark:text-stone-400" />
          </div>
          <div className="text-left">
            <p className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-50 font-mono tracking-tight">
              {caseData.displayId}
            </p>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              {t.created} {formatDateTime(caseData.createdAt, language)}
            </p>
          </div>
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ml-2 ${statusConfig.bg} ${statusConfig.text}`}
          >
            <StatusIcon className="w-3 h-3" />
            {t[statusConfig.labelKey]}
          </span>
        </button>

        {/* Tab Switcher (pill style) */}
        <div className="flex items-center gap-1 p-1 bg-stone-200/40 dark:bg-stone-900 rounded-lg w-fit mb-5">
          {TABS.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            const count = tabCounts[tab.id]

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 min-h-11 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-50 shadow-sm'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{t[tab.labelKey]}</span>
                <span className="sm:hidden">{t[tab.shortLabelKey]}</span>
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

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-[7fr_3fr] gap-5 mt-5 items-start">
            <SectionCard title={t.caseDetails} icon={Info}>
              <OverviewTab
                caseData={caseData}
                vehicle={vehicle}
                driver={driver}
                lawyer={lawyer}
              />
            </SectionCard>
            <SectionCard title={t.timeline} icon={Activity} count={activities.length}>
              <Timeline activities={activities} />
            </SectionCard>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="mt-5">
            <SectionCard title={t.documents} icon={Paperclip} count={documents.length || undefined}>
              <DocumentsTab
                documents={documents}
                onUploadDocument={onUploadDocument}
              />
            </SectionCard>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="mt-5">
            <SectionCard title={t.reports} icon={FileDown} count={reports.length || undefined}>
              <ReportsTab reports={reports} />
            </SectionCard>
          </div>
        )}

        {activeTab === 'comments' && (
          <div className="mt-5">
            <SectionCard title={t.comments} icon={MessageSquare} count={comments.length || undefined}>
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
