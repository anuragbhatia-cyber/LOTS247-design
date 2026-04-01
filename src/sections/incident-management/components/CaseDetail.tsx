import { useState, useRef } from 'react'
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  FileText,
  FileQuestion,
  Timer,
  AlertCircle,
  ArrowUpRight,
  Truck,
  User,
  Calendar,
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
  X,
  Phone,
  Shield,
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
    caseTypeTheft: 'Theft',
    caseTypeDetention: 'Detention',
    caseTypeBail: 'Bail',
    caseTypeAccidents: 'Accidents',
    caseTypeFIRs: 'FIRs',
    caseTypeSuperdari: 'Superdari',
    caseTypeVehicleImpounding: 'Vehicle Impounding',
    caseTypeEWayBillIssues: 'E-Way Bill',
    caseTypeOthers: 'Others',

    // Tabs
    tabOverview: 'Overview',
    tabOverviewShort: 'Overview',
    tabDocuments: 'Documents',
    tabDocumentsShort: 'Docs',
    tabReports: 'Reports',
    tabReportsShort: 'Reports',
    tabComments: 'Comments',
    tabCommentsShort: 'Chat',
    tabFollowUp: 'Follow-up',
    tabFollowUpShort: 'Follow-up',

    // Origin badges
    originLawyerCall: 'Lawyer Call',
    originEscalated: 'Escalated',

    // Labels
    type: 'Case Type',
    expectedClosure: 'Expected Closure',
    slaCompleted: 'Completed',
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
    incidentState: 'Incident State',
    incidentCity: 'Incident City',
    authorityInvolved: 'Authority Involved',
    roadName: 'Road Name',
    pin: 'Pin',
    incidentArea: 'Incident Area',
    incidentReporterName: 'Reporter Name',
    incidentReporterPhone: 'Reporter Phone',
    incidentLocation: 'Incident Location',
    reporterInfo: 'Reporter Information',

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
    caseTypeTheft: 'चोरी',
    caseTypeDetention: 'हिरासत',
    caseTypeBail: 'ज़मानत',
    caseTypeAccidents: 'दुर्घटनाएँ',
    caseTypeFIRs: 'एफ़आईआर',
    caseTypeSuperdari: 'सुपुर्दगी',
    caseTypeVehicleImpounding: 'वाहन ज़ब्ती',
    caseTypeEWayBillIssues: 'ई-वे बिल',
    caseTypeOthers: 'अन्य',

    // Tabs
    tabOverview: 'अवलोकन',
    tabOverviewShort: 'अवलोकन',
    tabDocuments: 'दस्तावेज़',
    tabDocumentsShort: 'दस्तावेज़',
    tabReports: 'रिपोर्ट',
    tabReportsShort: 'रिपोर्ट',
    tabComments: 'टिप्पणियाँ',
    tabCommentsShort: 'चैट',
    tabFollowUp: 'फॉलो-अप',
    tabFollowUpShort: 'फॉलो-अप',

    // Origin badges
    originLawyerCall: 'वकील कॉल',
    originEscalated: 'बढ़ाया गया',

    // Labels
    type: 'मामले का प्रकार',
    expectedClosure: 'अपेक्षित समापन',
    slaCompleted: 'पूर्ण',
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
    incidentState: 'घटना राज्य',
    incidentCity: 'घटना शहर',
    authorityInvolved: 'शामिल प्राधिकरण',
    roadName: 'सड़क का नाम',
    pin: 'पिन',
    incidentArea: 'घटना क्षेत्र',
    incidentReporterName: 'रिपोर्टर का नाम',
    incidentReporterPhone: 'रिपोर्टर फ़ोन',
    incidentLocation: 'घटना स्थान',
    reporterInfo: 'रिपोर्टर जानकारी',

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
  Theft: 'caseTypeTheft',
  Detention: 'caseTypeDetention',
  Bail: 'caseTypeBail',
  Accidents: 'caseTypeAccidents',
  FIRs: 'caseTypeFIRs',
  Superdari: 'caseTypeSuperdari',
  'Vehicle Impounding': 'caseTypeVehicleImpounding',
  'E-Way Bill': 'caseTypeEWayBillIssues',
  Others: 'caseTypeOthers',
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

const CASE_TYPE_CONFIG: Record<CaseType, { color: string; bg: string }> = {
  Theft: { color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-950/40' },
  Detention: { color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/40' },
  Bail: { color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-950/40' },
  Accidents: { color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-950/40' },
  FIRs: { color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-950/40' },
  Superdari: { color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/40' },
  'Vehicle Impounding': { color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/40' },
  'E-Way Bill': { color: 'text-stone-600 dark:text-stone-400', bg: 'bg-stone-100 dark:bg-stone-800/60' },
  Others: { color: 'text-stone-500 dark:text-stone-400', bg: 'bg-stone-100 dark:bg-stone-800/60' },
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

type TabId = 'overview' | 'followup' | 'reports' | 'documents'

const TABS: { id: TabId; labelKey: string; shortLabelKey: string; icon: typeof Activity }[] = [
  { id: 'overview', labelKey: 'tabOverview', shortLabelKey: 'tabOverviewShort', icon: Info },
  { id: 'followup', labelKey: 'tabFollowUp', shortLabelKey: 'tabFollowUpShort', icon: MessageSquare },
  { id: 'reports', labelKey: 'tabReports', shortLabelKey: 'tabReportsShort', icon: FileDown },
  { id: 'documents', labelKey: 'tabDocuments', shortLabelKey: 'tabDocumentsShort', icon: Paperclip },
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

function UploadDocumentModal({ onClose, onUpload }: { onClose: () => void; onUpload?: (file: File) => void }) {
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
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <Upload className="w-4 h-4 text-stone-500 dark:text-stone-400" />
            <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">Upload Document</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
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
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{(selectedFile.size / 1024).toFixed(0)} KB</p>
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
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">PDF, JPG, PNG up to 10 MB</p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 px-5 py-4 border-t border-stone-200 dark:border-stone-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-sm font-medium text-stone-700 dark:text-stone-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => { if (selectedFile && onUpload) onUpload(selectedFile); onClose() }}
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

function DocumentsSection({
  documents,
  onUploadDocument,
  t,
}: {
  documents: CaseDocument[]
  onUploadDocument?: (file: File) => void
  t: Record<string, string>
}) {
  const { language } = useLanguage()
  const [showUpload, setShowUpload] = useState(false)

  return (
    <>
      <SectionCard
        title={t.documents}
        icon={Paperclip}
        count={documents.length || undefined}
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
        {documents.length === 0 ? (
          <EmptyState icon={Paperclip} message={t.noDocumentsUploaded} />
        ) : (
          <div className="divide-y divide-stone-200 dark:divide-stone-800">
            {documents.map((doc) => {
              const ext = doc.fileName.split('.').pop()?.toLowerCase() || ''
              const isPdf = ext === 'pdf'
              return (
                <div
                  key={doc.id}
                  className="flex items-center gap-3.5 px-5 py-3.5 group/row hover:bg-stone-50 dark:hover:bg-stone-800/30 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isPdf ? 'bg-red-50 dark:bg-red-950/40' : 'bg-blue-50 dark:bg-blue-950/40'}`}>
                    <FileText className={`w-4.5 h-4.5 ${isPdf ? 'text-red-500 dark:text-red-400' : 'text-blue-500 dark:text-blue-400'}`} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-stone-800 dark:text-stone-200 truncate">
                      {doc.fileName}
                    </p>
                    <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                      {Math.floor(50 + doc.fileName.length * 7)} KB
                    </p>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover/row:opacity-100 transition-opacity">
                    <button className="p-2 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors flex-shrink-0">
                      <Info className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors flex-shrink-0">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </SectionCard>

      {showUpload && <UploadDocumentModal onClose={() => setShowUpload(false)} onUpload={onUploadDocument} />}
    </>
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
            placeholder={t.typeAMessage}
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
  const caseTypeKey = CASE_TYPE_TRANSLATION_KEY[caseData.caseType]
  const caseTypeLabel = caseTypeKey ? t[caseTypeKey] : caseData.caseType
  const caseTypeConfig = CASE_TYPE_CONFIG[caseData.caseType] || CASE_TYPE_CONFIG.Others

  return (
    <div className="space-y-6">
      {/* Case Type + Description */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${caseTypeConfig.bg} ${caseTypeConfig.color}`}>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0 pt-2 border-t border-stone-200 dark:border-stone-800">
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

      {/* Incident Location */}
      {(caseData.incidentState || caseData.incidentCity || caseData.roadName || caseData.incidentArea || caseData.pin) && (
        <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
          <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">{t.incidentLocation}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0">
            {caseData.incidentState && (
              <DetailRow icon={MapPin} label={t.incidentState} value={caseData.incidentState} />
            )}
            {caseData.incidentCity && (
              <DetailRow icon={MapPin} label={t.incidentCity} value={caseData.incidentCity} />
            )}
            {caseData.roadName && (
              <DetailRow icon={MapPin} label={t.roadName} value={caseData.roadName} />
            )}
            {caseData.incidentArea && (
              <DetailRow icon={MapPin} label={t.incidentArea} value={caseData.incidentArea} />
            )}
            {caseData.pin && (
              <DetailRow icon={MapPin} label={t.pin} value={caseData.pin} />
            )}
          </div>
        </div>
      )}

      {/* Authority Involved */}
      {caseData.authorityInvolved && (
        <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0">
            <DetailRow icon={Shield} label={t.authorityInvolved} value={caseData.authorityInvolved} />
          </div>
        </div>
      )}

      {/* Reporter Information */}
      {(caseData.incidentReporterName || caseData.incidentReporterPhone) && (
        <div className="pt-2 border-t border-stone-200 dark:border-stone-800">
          <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">{t.reporterInfo}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-0">
            {caseData.incidentReporterName && (
              <DetailRow icon={User} label={t.incidentReporterName} value={caseData.incidentReporterName} />
            )}
            {caseData.incidentReporterPhone && (
              <DetailRow icon={Phone} label={t.incidentReporterPhone} value={caseData.incidentReporterPhone} />
            )}
          </div>
        </div>
      )}

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
    followup: comments.length,
    reports: reports.length,
    documents: documents.length,
  }

  const caseTypeKey = CASE_TYPE_TRANSLATION_KEY[caseData.caseType]
  const caseTypeLabel = caseTypeKey ? t[caseTypeKey] : caseData.caseType
  const caseTypeConfig = CASE_TYPE_CONFIG[caseData.caseType] || CASE_TYPE_CONFIG.Others

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
      <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-10">

        {/* Hero Header Card */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden mb-6">
          <div className="p-5 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              {/* Left: Case Info */}
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  {/* Back Arrow */}
                  <button
                    onClick={onBack}
                    className="mt-1 p-2 -ml-1 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex-shrink-0"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  {/* ID + Badges */}
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 font-mono tracking-tight">
                        {caseData.displayId}
                      </h1>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}>
                        <StatusIcon className="w-3 h-3" />
                        {t[statusConfig.labelKey]}
                      </span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${caseTypeConfig.bg} ${caseTypeConfig.color}`}>
                        {caseTypeLabel}
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                      {t.created} {formatDate(caseData.createdAt, language)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right: Amount-style with SLA */}
              <div className="flex-shrink-0 lg:text-right">
                {(() => {
                  const diffDays = Math.ceil((new Date(caseData.slaDeadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                  const label = caseData.status === 'resolved'
                    ? t.slaCompleted
                    : diffDays < 0
                    ? `${Math.abs(diffDays)} days overdue`
                    : `${diffDays} days remaining`
                  const color = caseData.status === 'resolved'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : diffDays < 0
                    ? 'text-red-600 dark:text-red-400'
                    : diffDays <= 7
                    ? 'text-amber-600 dark:text-amber-400'
                    : 'text-emerald-600 dark:text-emerald-400'
                  return (
                    <p className={`text-sm font-medium mt-1 ${color}`}>
                      {label}
                    </p>
                  )
                })()}
              </div>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-stone-200/40 dark:bg-stone-900 rounded-lg w-fit mb-6 overflow-x-auto">
          {TABS.map((tab) => {
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
            <DocumentsSection
              documents={documents}
              onUploadDocument={onUploadDocument}
              t={t}
            />
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="mt-5">
            <SectionCard title={t.reports} icon={FileDown} count={reports.length || undefined}>
              <ReportsTab reports={reports} />
            </SectionCard>
          </div>
        )}

        {activeTab === 'followup' && (
          <div className="mt-5">
            <SectionCard title={t.tabFollowUp} icon={MessageSquare} count={comments.length || undefined}>
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
