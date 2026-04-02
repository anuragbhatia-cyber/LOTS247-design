import { useState, useRef } from 'react'
import {
  ArrowLeft,
  Truck,
  User,
  ShieldCheck,
  FileText,
  Calendar,
  Pencil,
  Ban,
  UserPlus,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
  Phone,
  CreditCard,
  X,
  ChevronDown,
  FileWarning,
  Search,
  RefreshCw,
  MapPin,
  IndianRupee,
  Gavel,
  MoreVertical,
  Loader2,
  Download,
  Eye,
  Briefcase,
  Building2,
  MoreHorizontal,
  Paperclip,
  Upload,
} from 'lucide-react'
import type {
  VehicleDetailProps,
  Vehicle,
  Driver,
  VehicleStatus,
  DocumentStatus,
  VehicleDocument,
} from '@/../product/sections/vehicle-and-driver-management/types'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'
import { ChallanList } from '@/sections/incident-management/components/ChallanList'
import { CaseList } from '@/sections/incident-management/components/CaseList'
import incidentData from '@/../product/sections/incident-management/data.json'

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Back button
    backToVehicles: 'Back to Vehicles',

    // Hero / Header
    active: 'Active',
    inactive: 'Inactive',
    editVehicle: 'Edit Vehicle',
    changeDriver: 'Change Driver',
    assignDriver: 'Assign Driver',
    deactivate: 'Deactivate',

    // Compliance ring
    score: 'Score',
    good: 'Good',
    needsAttention: 'Needs Attention',
    critical: 'Critical',

    // Alert banners
    documentExpired: 'document expired',
    documentsExpired: 'documents expired',
    documentExpiringSoon: 'document expiring soon',
    documentsExpiringSoon: 'documents expiring soon',

    // Tabs
    tabDetails: 'Details',
    tabDocuments: 'Documents',
    tabCompliance: 'Compliance',
    tabChallans: 'Challans',
    tabIncidents: 'Incidents',
    tabAssignedDriver: 'Assigned Driver',

    // Incidents tab
    recentIncidents: 'Recent Incidents',
    noIncidents: 'No incidents reported',
    noIncidentsDesc: 'This vehicle has no reported incidents or cases',
    incidentOpen: 'Open',
    incidentInProgress: 'In Progress',
    incidentResolved: 'Resolved',
    incidentClosed: 'Closed',
    incidentSeverityHigh: 'High',
    incidentSeverityMedium: 'Medium',
    incidentSeverityLow: 'Low',
    reportedOn: 'Reported',
    viewDetails: 'View Details',
    viewIncident: 'View Incident',
    headerIncident: 'Incident',
    headerType: 'Type',
    headerSeverity: 'Severity',
    headerDate: 'Date',
    headerLocation: 'Location',
    headerStatus: 'Status',
    headerAction: 'Action',

    // Details tab
    rcNumber: 'RC Number',
    vehicleType: 'Vehicle Type',
    make: 'Make',
    model: 'Model',
    year: 'Year',
    category: 'Category',
    status: 'Status',
    fetchDetails: 'Fetch Details',
    fetchingDetails: 'Fetching...',

    // Category labels
    owned: 'Owned',
    leased: 'Leased',
    rented: 'Rented',

    // Document status labels
    valid: 'Valid',
    expiringSoon: 'Expiring Soon',
    expired: 'Expired',

    // Document type labels
    motorInsurance: 'Motor Insurance',
    motorInsuranceDesc: 'Third-party or comprehensive policy',
    pucCertificate: 'PUC Certificate',
    pucCertificateDesc: 'Pollution Under Control certificate',
    fitnessCertificate: 'Fitness Certificate',
    fitnessCertificateDesc: 'Vehicle fitness approval',
    registrationCertificate: 'Registration Certificate',
    registrationCertificateDesc: 'Vehicle registration document',
    permit: 'Permit',
    other: 'Other',

    // Document card
    expires: 'Expires',
    expiredDaysAgo: 'days ago',
    daysRemaining: 'days remaining',
    monthsRemaining: 'months remaining',
    viewDocument: 'View Document',
    downloadDocument: 'Download Document',

    // Documents tab
    vehicleDocuments: 'Vehicle Documents',
    uploadDocument: 'Upload Document',

    // Compliance tab
    overallComplianceScore: 'Overall compliance score based on document validity',
    expiredLabel: 'expired',
    expiringSoonLabel: 'expiring soon',
    allDocumentsValid: 'All documents are valid and up to date',

    // Challans tab — idle state
    fetchChallansFor: 'Fetch Challans for',
    challanIdleDescription: 'Check for pending traffic challans from Parivahan and other government databases against this vehicle.',
    fetchChallans: 'Fetch Challans',

    // Challans tab — fetching state
    fetchingChallans: 'Fetching Challans...',
    checkingDatabases: 'Checking Parivahan and government databases for',

    // Challans tab — done state
    pendingChallans: 'Pending Challans',
    pending: 'Pending',
    submitted: 'Submitted',
    resolved: 'Resolved',
    reFetch: 'Re-fetch',
    totalPendingAmount: 'Total Pending Amount',
    submitForResolution: 'Submit for Resolution',
    sendProposal: 'Send Proposal',
    submittedForResolution: 'Submitted for resolution — awaiting update',
    payNow: 'Pay Now',
    courtChallans: 'Court Challans',
    onlineChallans: 'Online Challans',
    paid: 'Paid',
    noPendingChallans: 'No pending challans',
    noPendingChallansDesc: 'This vehicle has no pending traffic challans',

    // Driver tab
    licenseNumber: 'License Number',
    licenseExpiry: 'License Expiry',
    licenseStatus: 'License Status',
    vehiclesAssigned: 'Vehicles Assigned',
    noDriverAssigned: 'No driver assigned',
    noDriverAssignedDesc: 'Assign a driver to this vehicle to track their details here',

    // Edit vehicle modal
    saveChanges: 'Save Changes',
    cancel: 'Cancel',
    vehicleCategory: 'Vehicle Category',

    // Vehicle type options
    truck: 'Truck',
    trailer: 'Trailer',
    tanker: 'Tanker',
    container: 'Container',
    miniTruck: 'Mini Truck',

    // Assign driver modal
    selectDriverFromList: 'Select a driver from the list',
    searchPlaceholder: 'Search by name, license, phone...',
    current: 'Current',
    noDriversFound: 'No drivers found',

    // Upload document modal
    documentType: 'Document Type',
    selectDocumentType: 'Select document type',
    uploadFile: 'Upload File',
    dropFileHere: 'Drop your file here, or',
    browse: 'browse',
    fileFormats: 'PDF, JPG, PNG or WebP up to 10MB',
    removeFile: 'Remove file',
    upload: 'Upload',
  },
  hi: {
    // Back button
    backToVehicles: 'वाहनों पर वापस जाएं',

    // Hero / Header
    active: 'सक्रिय',
    inactive: 'निष्क्रिय',
    editVehicle: 'वाहन संपादित करें',
    changeDriver: 'ड्राइवर बदलें',
    assignDriver: 'ड्राइवर नियुक्त करें',
    deactivate: 'निष्क्रिय करें',

    // Compliance ring
    score: 'स्कोर',
    good: 'अच्छा',
    needsAttention: 'ध्यान आवश्यक',
    critical: 'गंभीर',

    // Alert banners
    documentExpired: 'दस्तावेज़ समाप्त',
    documentsExpired: 'दस्तावेज़ समाप्त',
    documentExpiringSoon: 'दस्तावेज़ जल्द समाप्त',
    documentsExpiringSoon: 'दस्तावेज़ जल्द समाप्त',

    // Tabs
    tabDetails: 'विवरण',
    tabDocuments: 'दस्तावेज़',
    tabCompliance: 'अनुपालन',
    tabChallans: 'चालान',
    tabIncidents: 'घटनाएं',
    tabAssignedDriver: 'नियुक्त ड्राइवर',

    // Incidents tab
    recentIncidents: 'हाल की घटनाएं',
    noIncidents: 'कोई घटना दर्ज नहीं',
    noIncidentsDesc: 'इस वाहन की कोई दर्ज घटना या मामला नहीं है',
    incidentOpen: 'खुला',
    incidentInProgress: 'प्रगति में',
    incidentResolved: 'हल किया',
    incidentClosed: 'बंद',
    incidentSeverityHigh: 'उच्च',
    incidentSeverityMedium: 'मध्यम',
    incidentSeverityLow: 'निम्न',
    reportedOn: 'दर्ज',
    viewDetails: 'विवरण देखें',
    viewIncident: 'घटना देखें',
    headerIncident: 'घटना',
    headerType: 'प्रकार',
    headerSeverity: 'गंभीरता',
    headerDate: 'तारीख',
    headerLocation: 'स्थान',
    headerStatus: 'स्थिति',
    headerAction: 'कार्रवाई',

    // Details tab
    rcNumber: 'आरसी नंबर',
    vehicleType: 'वाहन प्रकार',
    make: 'निर्माता',
    model: 'मॉडल',
    year: 'वर्ष',
    category: 'श्रेणी',
    status: 'स्थिति',
    fetchDetails: 'विवरण प्राप्त करें',
    fetchingDetails: 'प्राप्त हो रहा...',

    // Category labels
    owned: 'स्वामित्व',
    leased: 'पट्टे पर',
    rented: 'किराए पर',

    // Document status labels
    valid: 'वैध',
    expiringSoon: 'जल्द समाप्त',
    expired: 'समाप्त',

    // Document type labels
    motorInsurance: 'मोटर बीमा',
    motorInsuranceDesc: 'तृतीय-पक्ष या व्यापक पॉलिसी',
    pucCertificate: 'पीयूसी प्रमाणपत्र',
    pucCertificateDesc: 'प्रदूषण नियंत्रण प्रमाणपत्र',
    fitnessCertificate: 'फिटनेस प्रमाणपत्र',
    fitnessCertificateDesc: 'वाहन फिटनेस अनुमोदन',
    registrationCertificate: 'पंजीकरण प्रमाणपत्र',
    registrationCertificateDesc: 'वाहन पंजीकरण दस्तावेज़',
    permit: 'परमिट',
    other: 'अन्य',

    // Document card
    expires: 'समाप्ति',
    expiredDaysAgo: 'दिन पहले समाप्त',
    daysRemaining: 'दिन शेष',
    monthsRemaining: 'महीने शेष',
    viewDocument: 'दस्तावेज़ देखें',
    downloadDocument: 'दस्तावेज़ डाउनलोड करें',

    // Documents tab
    vehicleDocuments: 'वाहन दस्तावेज़',
    uploadDocument: 'दस्तावेज़ अपलोड करें',

    // Compliance tab
    overallComplianceScore: 'दस्तावेज़ वैधता के आधार पर समग्र अनुपालन स्कोर',
    expiredLabel: 'समाप्त',
    expiringSoonLabel: 'जल्द समाप्त',
    allDocumentsValid: 'सभी दस्तावेज़ वैध और अद्यतित हैं',

    // Challans tab — idle state
    fetchChallansFor: 'चालान प्राप्त करें',
    challanIdleDescription: 'इस वाहन के लिए परिवहन और अन्य सरकारी डेटाबेस से लंबित यातायात चालान की जांच करें।',
    fetchChallans: 'चालान प्राप्त करें',

    // Challans tab — fetching state
    fetchingChallans: 'चालान प्राप्त हो रहे हैं...',
    checkingDatabases: 'परिवहन और सरकारी डेटाबेस की जांच हो रही है',

    // Challans tab — done state
    pendingChallans: 'लंबित चालान',
    pending: 'लंबित',
    submitted: 'जमा किया गया',
    resolved: 'हल किया गया',
    reFetch: 'पुनः प्राप्त करें',
    totalPendingAmount: 'कुल लंबित राशि',
    submitForResolution: 'समाधान के लिए जमा करें',
    sendProposal: 'प्रस्ताव भेजें',
    submittedForResolution: 'समाधान के लिए जमा किया गया — अपडेट की प्रतीक्षा है',
    payNow: 'अभी भुगतान करें',
    courtChallans: 'कोर्ट चालान',
    onlineChallans: 'ऑनलाइन चालान',
    paid: 'भुगतान किया',
    noPendingChallans: 'कोई लंबित चालान नहीं',
    noPendingChallansDesc: 'इस वाहन पर कोई लंबित यातायात चालान नहीं है',

    // Driver tab
    licenseNumber: 'लाइसेंस नंबर',
    licenseExpiry: 'लाइसेंस समाप्ति',
    licenseStatus: 'लाइसेंस स्थिति',
    vehiclesAssigned: 'नियुक्त वाहन',
    noDriverAssigned: 'कोई ड्राइवर नियुक्त नहीं',
    noDriverAssignedDesc: 'उनका विवरण यहां ट्रैक करने के लिए इस वाहन को एक ड्राइवर नियुक्त करें',

    // Edit vehicle modal
    saveChanges: 'परिवर्तन सहेजें',
    cancel: 'रद्द करें',
    vehicleCategory: 'वाहन श्रेणी',

    // Vehicle type options
    truck: 'ट्रक',
    trailer: 'ट्रेलर',
    tanker: 'टैंकर',
    container: 'कंटेनर',
    miniTruck: 'मिनी ट्रक',

    // Assign driver modal
    selectDriverFromList: 'सूची से एक ड्राइवर चुनें',
    searchPlaceholder: 'नाम, लाइसेंस, फ़ोन से खोजें...',
    current: 'वर्तमान',
    noDriversFound: 'कोई ड्राइवर नहीं मिला',

    // Upload document modal
    documentType: 'दस्तावेज़ प्रकार',
    selectDocumentType: 'दस्तावेज़ प्रकार चुनें',
    uploadFile: 'फ़ाइल अपलोड करें',
    dropFileHere: 'अपनी फ़ाइल यहां डालें, या',
    browse: 'ब्राउज़ करें',
    fileFormats: 'PDF, JPG, PNG या WebP 10MB तक',
    removeFile: 'फ़ाइल हटाएं',
    upload: 'अपलोड',
  },
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const DOC_STATUS_STYLE: Record<DocumentStatus, { bg: string; text: string; border: string; icon: typeof CheckCircle2 }> = {
  valid: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
    icon: CheckCircle2,
  },
  'expiring-soon': {
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800',
    icon: Clock,
  },
  expired: {
    bg: 'bg-red-50 dark:bg-red-950/40',
    text: 'text-red-700 dark:text-red-300',
    border: 'border-red-200 dark:border-red-800',
    icon: XCircle,
  },
}

const DOC_STATUS_LABEL_KEY: Record<DocumentStatus, string> = {
  valid: 'valid',
  'expiring-soon': 'expiringSoon',
  expired: 'expired',
}

const DOC_TYPE_LABEL_KEY: Record<string, { label: string; description: string }> = {
  insurance: { label: 'motorInsurance', description: 'motorInsuranceDesc' },
  puc: { label: 'pucCertificate', description: 'pucCertificateDesc' },
  fitness: { label: 'fitnessCertificate', description: 'fitnessCertificateDesc' },
  rc: { label: 'registrationCertificate', description: 'registrationCertificateDesc' },
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(dateStr: string, language: Language): string {
  return new Date(dateStr).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function daysUntil(dateStr: string): number {
  const now = new Date()
  const target = new Date(dateStr)
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

function getComplianceColor(score: number): { text: string; bg: string; ring: string; labelKey: string } {
  if (score >= 75) return {
    text: 'text-emerald-700 dark:text-emerald-300',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    ring: 'stroke-emerald-500',
    labelKey: 'good',
  }
  if (score >= 50) return {
    text: 'text-amber-700 dark:text-amber-300',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    ring: 'stroke-amber-500',
    labelKey: 'needsAttention',
  }
  return {
    text: 'text-red-700 dark:text-red-300',
    bg: 'bg-red-50 dark:bg-red-950/40',
    ring: 'stroke-red-500',
    labelKey: 'critical',
  }
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ComplianceRing({ score, t }: { score: number; t: Record<string, string> }) {
  const colors = getComplianceColor(score)
  const radius = 40
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <div className="relative w-28 h-28 flex items-center justify-center">
      <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="8"
          className="stroke-stone-200 dark:stroke-stone-800"
        />
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={`${colors.ring} transition-all duration-700 ease-out`}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-2xl font-bold tabular-nums ${colors.text}`}>{score}</span>
        <span className="text-[10px] text-stone-500 dark:text-stone-400 uppercase tracking-wider font-medium">{t.score}</span>
      </div>
    </div>
  )
}

function DocumentCard({ doc, t, language }: { doc: VehicleDocument; t: Record<string, string>; language: Language }) {
  const [showMenu, setShowMenu] = useState(false)
  const statusStyle = DOC_STATUS_STYLE[doc.status]
  const typeKeys = DOC_TYPE_LABEL_KEY[doc.type] || { label: '', description: '' }
  const typeLabel = typeKeys.label ? t[typeKeys.label] : doc.name
  const statusLabel = t[DOC_STATUS_LABEL_KEY[doc.status]]
  const StatusIcon = statusStyle.icon
  const days = daysUntil(doc.expiry)

  return (
    <div className={`rounded-xl border p-4 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${statusStyle.bg}`}>
            <FileText className={`w-4.5 h-4.5 ${statusStyle.text}`} />
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-900 dark:text-stone-50">
              {typeLabel}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${statusStyle.bg} ${statusStyle.text}`}>
            <StatusIcon className="w-3 h-3" />
            {statusLabel}
          </span>
          {doc.status === 'valid' && (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-1.5 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
              {showMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                  <div className="absolute right-0 top-full mt-1 z-20 w-44 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg shadow-lg py-1">
                    <button
                      onClick={() => { setShowMenu(false) }}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-left"
                    >
                      <Eye className="w-4 h-4 text-stone-400 dark:text-stone-500" />
                      {t.viewDocument}
                    </button>
                    <button
                      onClick={() => { setShowMenu(false) }}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-left"
                    >
                      <Download className="w-4 h-4 text-stone-400 dark:text-stone-500" />
                      {t.downloadDocument}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
          <Calendar className="w-3.5 h-3.5" />
          {t.expires} {formatDate(doc.expiry, language)}
        </div>
        {doc.status === 'expired' && (
          <span className="text-xs font-medium text-red-600 dark:text-red-400">
            {Math.abs(days)} {t.expiredDaysAgo}
          </span>
        )}
        {doc.status === 'expiring-soon' && (
          <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
            {days} {t.daysRemaining}
          </span>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Edit Vehicle Modal
// ---------------------------------------------------------------------------

function EditVehicleModal({
  isOpen,
  onClose,
  vehicle,
  onSave,
  t,
}: {
  isOpen: boolean
  onClose: () => void
  vehicle: Vehicle
  onSave?: () => void
  t: Record<string, string>
}) {
  const [status, setStatus] = useState<VehicleStatus>(vehicle.status)
  const [vehicleType, setVehicleType] = useState(vehicle.vehicleType)
  const [make, setMake] = useState(vehicle.make)
  const [model, setModel] = useState(vehicle.model)

  if (!isOpen) return null

  function handleSave() {
    onSave?.()
    onClose()
  }

  function handleClose() {
    setStatus(vehicle.status)
    setVehicleType(vehicle.vehicleType)
    setMake(vehicle.make)
    setModel(vehicle.model)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70" onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h2 className="text-base font-semibold text-stone-900 dark:text-stone-50">
              {t.editVehicle}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {vehicle.rcNumber}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-3 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* RC Number (read-only) */}
          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
              {t.rcNumber}
            </label>
            <input
              type="text"
              value={vehicle.rcNumber}
              disabled
              className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/50 text-sm text-stone-500 dark:text-stone-400 cursor-not-allowed"
            />
          </div>

          {/* Editable Fields Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                {t.make}
              </label>
              <input
                type="text"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                {t.model}
              </label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
              />
            </div>
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
              {t.vehicleType}
            </label>
            <div className="relative">
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full appearance-none px-3.5 py-2.5 pr-8 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors cursor-pointer"
              >
                <option value="Truck">{t.truck}</option>
                <option value="Trailer">{t.trailer}</option>
                <option value="Tanker">{t.tanker}</option>
                <option value="Container">{t.container}</option>
                <option value="Mini Truck">{t.miniTruck}</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
              {t.status}
            </label>
            <div className="flex gap-2">
              {(['active', 'inactive'] as VehicleStatus[]).map((s) => {
                const isSelected = status === s
                return (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`flex-1 px-3 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                      isSelected
                        ? s === 'active'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-current'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-current'
                        : 'border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:bg-stone-100 hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:border-stone-600'
                    }`}
                  >
                    {s === 'active' ? t.active : t.inactive}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-stone-200 dark:border-stone-800">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-xl text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
          >
            {t.cancel}
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm"
          >
            {t.saveChanges}
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Assign Driver Modal
// ---------------------------------------------------------------------------

function AssignDriverModal({
  isOpen,
  onClose,
  drivers,
  currentDriverId,
  onAssign,
  t,
}: {
  isOpen: boolean
  onClose: () => void
  drivers: Driver[]
  currentDriverId: string | null
  onAssign?: (driverId: string) => void
  t: Record<string, string>
}) {
  const [selectedId, setSelectedId] = useState<string>(currentDriverId || '')
  const [search, setSearch] = useState('')

  if (!isOpen) return null

  const filtered = search
    ? drivers.filter(
        (d) =>
          d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.licenseNumber.toLowerCase().includes(search.toLowerCase()) ||
          d.phone.includes(search)
      )
    : drivers

  function handleAssign() {
    if (selectedId) {
      onAssign?.(selectedId)
    }
    onClose()
  }

  function handleClose() {
    setSelectedId(currentDriverId || '')
    setSearch('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70" onClick={handleClose} />

      <div className="relative w-full max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h2 className="text-base font-semibold text-stone-900 dark:text-stone-50">
              {currentDriverId ? t.changeDriver : t.assignDriver}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {t.selectDriverFromList}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-3 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 pt-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
            />
          </div>
        </div>

        {/* Driver List */}
        <div className="px-6 py-4 space-y-1.5 max-h-72 overflow-y-auto">
          {filtered.map((d) => {
            const isSelected = selectedId === d.id
            const isCurrent = currentDriverId === d.id
            const licenseStyle = DOC_STATUS_STYLE[d.licenseStatus]
            const licenseLabel = t[DOC_STATUS_LABEL_KEY[d.licenseStatus]]
            const LicenseIcon = licenseStyle.icon

            return (
              <button
                key={d.id}
                onClick={() => setSelectedId(d.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${
                  isSelected
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800'
                    : 'border border-transparent hover:bg-stone-50 dark:hover:bg-stone-800/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isSelected
                    ? 'bg-emerald-100 dark:bg-emerald-900/50'
                    : 'bg-stone-100 dark:bg-stone-800'
                }`}>
                  <User className={`w-4.5 h-4.5 ${
                    isSelected
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-stone-500 dark:text-stone-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`text-sm font-medium truncate ${
                      isSelected
                        ? 'text-emerald-900 dark:text-emerald-100'
                        : 'text-stone-900 dark:text-stone-100'
                    }`}>
                      {d.name}
                    </p>
                    {isCurrent && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400">
                        {t.current}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">
                      {d.licenseNumber}
                    </span>
                  </div>
                </div>
                {isSelected && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                )}
              </button>
            )
          })}

          {filtered.length === 0 && (
            <div className="text-center py-6">
              <p className="text-sm text-stone-500 dark:text-stone-400">{t.noDriversFound}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-stone-200 dark:border-stone-800">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-xl text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
          >
            {t.cancel}
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedId || selectedId === currentDriverId}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm ${
              selectedId && selectedId !== currentDriverId
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400 cursor-not-allowed'
            }`}
          >
            {currentDriverId ? t.changeDriver : t.assignDriver}
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

type DetailTab = 'details' | 'documents' | 'compliance' | 'challans' | 'incidents' | 'driver'

const TABS: { id: DetailTab; labelKey: string; icon: typeof CreditCard }[] = [
  { id: 'details', labelKey: 'tabDetails', icon: CreditCard },
  { id: 'documents', labelKey: 'tabDocuments', icon: FileText },
  { id: 'compliance', labelKey: 'tabCompliance', icon: ShieldCheck },
  { id: 'challans', labelKey: 'tabChallans', icon: FileWarning },
  { id: 'incidents', labelKey: 'tabIncidents', icon: AlertTriangle },
  { id: 'driver', labelKey: 'tabAssignedDriver', icon: User },
]

// ---------------------------------------------------------------------------
// Challan Types & Sample Data
// ---------------------------------------------------------------------------

interface VehicleChallan {
  id: string
  challanNumber: string
  violationType: string
  amount: number
  issueDate: string
  location: string
  status: 'pending' | 'submitted' | 'resolved'
  source: string
  challanType: 'court' | 'online'
}

const SAMPLE_CHALLANS: VehicleChallan[] = [
  {
    id: 'ch1',
    challanNumber: 'CH1213390290',
    violationType: 'Overspeeding',
    amount: 2000,
    issueDate: '2026-02-18',
    location: 'NH-48, Gurugram Toll Plaza',
    status: 'pending',
    source: 'Parivahan',
    challanType: 'court',
  },
  {
    id: 'ch2',
    challanNumber: 'CH1213390455',
    violationType: 'Red Light Violation',
    amount: 5000,
    issueDate: '2026-02-10',
    location: 'Mahipalpur Junction, Delhi',
    status: 'pending',
    source: 'Parivahan',
    challanType: 'online',
  },
  {
    id: 'ch3',
    challanNumber: 'CH1213390178',
    violationType: 'Overloading',
    amount: 20000,
    issueDate: '2026-01-25',
    location: 'Yamuna Expressway, KM 45',
    status: 'pending',
    source: 'Parivahan',
    challanType: 'court',
  },
]

// ---------------------------------------------------------------------------
// Incident Types & Sample Data
// ---------------------------------------------------------------------------

interface VehicleIncident {
  id: string
  title: string
  type: string
  severity: 'high' | 'medium' | 'low'
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  reportedAt: string
  location: string
  description: string
}

const SAMPLE_INCIDENTS: VehicleIncident[] = [
  {
    id: 'inc-001',
    title: 'Minor Collision at Toll Plaza',
    type: 'Accident',
    severity: 'medium',
    status: 'in-progress',
    reportedAt: '2026-03-12',
    location: 'NH-48, Gurugram Toll Plaza',
    description: 'Minor collision with a stationary vehicle while entering the toll lane. Front bumper damage reported.',
  },
  {
    id: 'inc-002',
    title: 'Tyre Burst on Expressway',
    type: 'Breakdown',
    severity: 'high',
    status: 'resolved',
    reportedAt: '2026-02-28',
    location: 'Yamuna Expressway, KM 102',
    description: 'Rear left tyre burst at high speed. Vehicle safely pulled over. No injuries.',
  },
  {
    id: 'inc-003',
    title: 'Cargo Damage During Transit',
    type: 'Cargo Issue',
    severity: 'low',
    status: 'closed',
    reportedAt: '2026-01-15',
    location: 'Warehouse, Manesar',
    description: 'Minor water damage to packaged goods due to tarpaulin tear during rain.',
  },
]

const INCIDENT_STATUS_STYLE: Record<VehicleIncident['status'], { bg: string; text: string }> = {
  open: { bg: 'bg-red-50 dark:bg-red-950/40', text: 'text-red-700 dark:text-red-300' },
  'in-progress': { bg: 'bg-blue-50 dark:bg-blue-950/40', text: 'text-blue-700 dark:text-blue-300' },
  resolved: { bg: 'bg-emerald-50 dark:bg-emerald-950/40', text: 'text-emerald-700 dark:text-emerald-300' },
  closed: { bg: 'bg-stone-100 dark:bg-stone-800', text: 'text-stone-600 dark:text-stone-400' },
}

const INCIDENT_STATUS_LABEL_KEY: Record<VehicleIncident['status'], string> = {
  open: 'incidentOpen',
  'in-progress': 'incidentInProgress',
  resolved: 'incidentResolved',
  closed: 'incidentClosed',
}

const SEVERITY_STYLE: Record<VehicleIncident['severity'], { bg: string; text: string }> = {
  high: { bg: 'bg-red-50 dark:bg-red-950/40', text: 'text-red-700 dark:text-red-300' },
  medium: { bg: 'bg-amber-50 dark:bg-amber-950/40', text: 'text-amber-700 dark:text-amber-300' },
  low: { bg: 'bg-stone-100 dark:bg-stone-800', text: 'text-stone-600 dark:text-stone-400' },
}

const SEVERITY_LABEL_KEY: Record<VehicleIncident['severity'], string> = {
  high: 'incidentSeverityHigh',
  medium: 'incidentSeverityMedium',
  low: 'incidentSeverityLow',
}

type ChallanFetchState = 'idle' | 'fetching' | 'done'

// ---------------------------------------------------------------------------
// Upload Document Modal
// ---------------------------------------------------------------------------

const DOC_TYPE_OPTIONS = [
  { value: 'insurance', labelKey: 'motorInsurance' },
  { value: 'puc', labelKey: 'pucCertificate' },
  { value: 'fitness', labelKey: 'fitnessCertificate' },
  { value: 'rc', labelKey: 'registrationCertificate' },
  { value: 'permit', labelKey: 'permit' },
  { value: 'other', labelKey: 'other' },
]

function UploadDocumentModal({
  isOpen,
  onClose,
  rcNumber,
  t,
}: {
  isOpen: boolean
  onClose: () => void
  rcNumber: string
  t: Record<string, string>
}) {
  const [selectedType, setSelectedType] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) setSelectedFile(file)
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) setSelectedFile(file)
  }

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  function handleUpload() {
    if (selectedFile && selectedType) {
      setSelectedFile(null)
      setSelectedType('')
      onClose()
    }
  }

  function handleClose() {
    setSelectedFile(null)
    setSelectedType('')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70" onClick={handleClose} />

      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h2 className="text-base font-semibold text-stone-900 dark:text-stone-50">
              {t.uploadDocument}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {rcNumber}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-3 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Document Type */}
          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
              {t.documentType}
            </label>
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full appearance-none px-3.5 py-2.5 pr-8 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors cursor-pointer"
              >
                <option value="" disabled>{t.selectDocumentType}</option>
                {DOC_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{t[opt.labelKey]}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
            </div>
          </div>

          {/* File Drop Zone */}
          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
              {t.uploadFile}
            </label>
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
                dragOver
                  ? 'border-emerald-400 dark:border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20'
                  : selectedFile
                  ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/30 dark:bg-emerald-950/10'
                  : 'border-stone-300 dark:border-stone-700 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-800/50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.webp"
                onChange={handleFileSelect}
                className="hidden"
              />

              {selectedFile ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-900 dark:text-stone-50">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelectedFile(null) }}
                    className="text-xs text-stone-500 dark:text-stone-400 hover:text-red-600 dark:hover:text-red-400 transition-colors min-h-11 inline-flex items-center"
                  >
                    {t.removeFile}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-stone-400 dark:text-stone-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                      {t.dropFileHere} <span className="text-emerald-600 dark:text-emerald-400">{t.browse}</span>
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                      {t.fileFormats}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-stone-200 dark:border-stone-800">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-xl text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
          >
            {t.cancel}
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || !selectedType}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm ${
              selectedFile && selectedType
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400 cursor-not-allowed'
            }`}
          >
            <FileText className="w-4 h-4" />
            {t.upload}
          </button>
        </div>
      </div>
    </div>
  )
}

export function VehicleDetail({
  vehicle,
  driver,
  drivers,
  onBack,
  onEdit,
  onDelete,
  onChangeCategory,
  onAssignDriver,
}: VehicleDetailProps) {
  const { language } = useLanguage()
  const t = translations[language]
  const [activeTab, setActiveTab] = useState<DetailTab>('details')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAssignDriver, setShowAssignDriver] = useState(false)
  const [challanFetchState, setChallanFetchState] = useState<ChallanFetchState>('idle')
  const [fetchedChallans, setFetchedChallans] = useState<VehicleChallan[]>([])
  const [challanActionMenu, setChallanActionMenu] = useState<string | null>(null)
  const [showUploadDoc, setShowUploadDoc] = useState(false)
  const [incidentSubTab, setIncidentSubTab] = useState<'challans' | 'cases' | 'rto' | 'other'>('challans')
  const [expandedCompliance, setExpandedCompliance] = useState<Set<string>>(new Set())
  const [detailsFetched, setDetailsFetched] = useState(vehicle.detailsFetched !== false)
  const [detailsFetching, setDetailsFetching] = useState(false)

  const handleFetchDetails = () => {
    setDetailsFetching(true)
    setTimeout(() => {
      setDetailsFetching(false)
      setDetailsFetched(true)
    }, 1500)
  }

  // Filter incident data for this vehicle
  const vehicleChallans = incidentData.challans.filter((c: { vehicleId: string }) => c.vehicleId === vehicle.id)
  const vehicleCases = incidentData.cases.filter((c: { vehicleId: string }) => c.vehicleId === vehicle.id)
  const complianceColors = getComplianceColor(vehicle.complianceScore)
  const expiredDocs = vehicle.documents.filter((d) => d.status === 'expired')
  const expiringDocs = vehicle.documents.filter((d) => d.status === 'expiring-soon')

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
      <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-10">
        {/* ================================================================= */}
        {/* Hero Header */}
        {/* ================================================================= */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden mb-6">
          {/* Alert Banner */}
          {expiredDocs.length > 0 && (
            <div className="px-5 py-3 bg-red-50 dark:bg-red-950/30 border-b border-red-200 dark:border-red-900/40 flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-700 dark:text-red-300">
                <span className="font-semibold">{expiredDocs.length} {expiredDocs.length > 1 ? t.documentsExpired : t.documentExpired}</span>
                {' — '}
                {expiredDocs.map((d) => { const keys = DOC_TYPE_LABEL_KEY[d.type]; return keys ? t[keys.label] : d.name }).join(', ')}
              </p>
            </div>
          )}
          {expiredDocs.length === 0 && expiringDocs.length > 0 && (
            <div className="px-5 py-3 bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-900/40 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
              <p className="text-sm text-amber-700 dark:text-amber-300">
                <span className="font-semibold">{expiringDocs.length} {expiringDocs.length > 1 ? t.documentsExpiringSoon : t.documentExpiringSoon}</span>
                {' — '}
                {expiringDocs.map((d) => { const keys = DOC_TYPE_LABEL_KEY[d.type]; return keys ? t[keys.label] : d.name }).join(', ')}
              </p>
            </div>
          )}

          <div className="p-5 sm:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              {/* Left: Vehicle Info */}
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-5">
                  <button
                    onClick={() => onBack?.()}
                    className="mt-1 p-2 -ml-1 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex-shrink-0"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    vehicle.status === 'active'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500'
                  }`}>
                    <Truck className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 font-mono tracking-tight">
                        {vehicle.rcNumber}
                      </h1>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                        vehicle.status === 'active'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                      }`}>
                        {vehicle.status === 'active' ? t.active : t.inactive}
                      </span>
                    </div>
                    {detailsFetched ? (
                      <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
                        {vehicle.make} {vehicle.model} · {vehicle.year} · {vehicle.vehicleType}
                      </p>
                    ) : (
                      <button
                        onClick={handleFetchDetails}
                        disabled={detailsFetching}
                        className="mt-1 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-xs font-medium hover:bg-emerald-100 dark:hover:bg-emerald-950/50 transition-colors disabled:opacity-60"
                      >
                        {detailsFetching ? (
                          <><Loader2 className="w-3 h-3 animate-spin" />{t.fetchingDetails}</>
                        ) : (
                          <><RefreshCw className="w-3 h-3" />{t.fetchDetails}</>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors shadow-sm"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    {t.editVehicle}
                  </button>
                  <button
                    onClick={() => setShowAssignDriver(true)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:border-stone-600 transition-colors"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    {driver ? t.changeDriver : t.assignDriver}
                  </button>
                  <button
                    onClick={() => onDelete?.()}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-medium text-amber-600 dark:text-amber-400 hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-colors"
                  >
                    <Ban className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{t.deactivate}</span>
                  </button>
                </div>
              </div>

              {/* Right: Compliance Score Ring */}
              <div className="flex flex-col items-center gap-2">
                <ComplianceRing score={vehicle.complianceScore} t={t} />
                <span className={`text-xs font-semibold uppercase tracking-wider ${complianceColors.text}`}>
                  {t[complianceColors.labelKey]}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* Tab Switcher */}
        {/* ================================================================= */}
        <div className="flex items-center gap-1 p-1 bg-stone-200/40 dark:bg-stone-900 rounded-lg w-fit mb-6 overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 min-h-11 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-50 shadow-sm'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {t[tab.labelKey]}
              </button>
            )
          })}
        </div>

        {/* ================================================================= */}
        {/* Tab: Details */}
        {/* ================================================================= */}
        {activeTab === 'details' && (
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                <p className="text-[10px] font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">{t.rcNumber}</p>
                <p className="text-sm font-semibold font-mono text-stone-900 dark:text-stone-100">{vehicle.rcNumber}</p>
              </div>
              <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                <p className="text-[10px] font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">{t.vehicleType}</p>
                <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{vehicle.vehicleType}</p>
              </div>
              {detailsFetched ? (
                <>
                  <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                    <p className="text-[10px] font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">{t.make}</p>
                    <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{vehicle.make}</p>
                  </div>
                  <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                    <p className="text-[10px] font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">{t.model}</p>
                    <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{vehicle.model}</p>
                  </div>
                  <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                    <p className="text-[10px] font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">{t.year}</p>
                    <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{vehicle.year}</p>
                  </div>
                </>
              ) : (
                <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 rounded-lg border border-dashed border-emerald-200 dark:border-emerald-800 col-span-1 sm:col-span-2 lg:col-span-3 flex items-center justify-center">
                  <button
                    onClick={handleFetchDetails}
                    disabled={detailsFetching}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-stone-900 text-emerald-700 dark:text-emerald-400 text-sm font-medium hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors disabled:opacity-60"
                  >
                    {detailsFetching ? (
                      <><Loader2 className="w-4 h-4 animate-spin" />{t.fetchingDetails}</>
                    ) : (
                      <><RefreshCw className="w-4 h-4" />{t.fetchDetails}</>
                    )}
                  </button>
                </div>
              )}
              <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                <p className="text-[10px] font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">{t.status}</p>
                <span className={`text-sm font-medium ${
                  vehicle.status === 'active'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-stone-500 dark:text-stone-400'
                }`}>
                  {vehicle.status === 'active' ? t.active : t.inactive}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* Tab: Documents */}
        {/* ================================================================= */}
        {activeTab === 'documents' && (
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <Paperclip className="w-4 h-4 text-stone-400 dark:text-stone-500" />
                <h3 className="text-sm font-semibold text-stone-700 dark:text-stone-300">
                  {t.vehicleDocuments}
                </h3>
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400">
                  {vehicle.documents.length}
                </span>
              </div>
              <button
                onClick={() => setShowUploadDoc(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-sm font-medium text-stone-700 dark:text-stone-300 transition-colors"
              >
                <Upload className="w-3.5 h-3.5" />
                {t.uploadDocument}
              </button>
            </div>
            <div className="divide-y divide-stone-200 dark:divide-stone-800">
              {vehicle.documents.map((doc) => {
                const ext = doc.name.split('.').pop()?.toLowerCase() || ''
                const isPdf = ext === 'pdf'
                const typeKeys = DOC_TYPE_LABEL_KEY[doc.type] || { label: '', description: '' }
                const typeLabel = typeKeys.label ? t[typeKeys.label] : doc.name
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
                        {typeLabel}
                      </p>
                      <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                        {Math.floor(50 + typeLabel.length * 7)} KB
                      </p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover/row:opacity-100 transition-opacity">
                      <button className="p-2 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors flex-shrink-0">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors flex-shrink-0">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* Tab: Compliance */}
        {/* ================================================================= */}
        {activeTab === 'compliance' && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
            {/* Left column — Vehicle Summary + Compliance Status */}
            <div className="lg:col-span-3 space-y-4">
              {/* Vehicle Summary Card */}
              <div className="rounded-2xl bg-white dark:bg-stone-900 shadow-md shadow-stone-200/60 dark:shadow-stone-950/40 p-5 sm:p-6">
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-50 uppercase tracking-wider mb-4">
                  Vehicle Summary
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="rounded-xl bg-stone-50 dark:bg-stone-800/50 p-4">
                    <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-2">Total Incidents</p>
                    <p className="text-2xl font-bold text-stone-900 dark:text-stone-50 tabular-nums">5</p>
                    <p className="text-base font-semibold text-stone-700 dark:text-stone-300 mt-1 tabular-nums">Amount: ₹48,500</p>
                  </div>
                  <div className="rounded-xl bg-stone-50 dark:bg-stone-800/50 p-4">
                    <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-2">Total Cases</p>
                    <p className="text-2xl font-bold text-stone-900 dark:text-stone-50 tabular-nums">3</p>
                    <p className="text-base font-semibold text-stone-700 dark:text-stone-300 mt-1 tabular-nums">Amount: ₹32,000</p>
                  </div>
                  <div className="rounded-xl bg-stone-50 dark:bg-stone-800/50 p-4">
                    <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mb-2">Total Renewals</p>
                    <p className="text-2xl font-bold text-stone-900 dark:text-stone-50 tabular-nums">7</p>
                    <p className="text-base font-semibold text-stone-700 dark:text-stone-300 mt-1 tabular-nums">Amount: ₹18,200</p>
                  </div>
                </div>
              </div>

              {/* Compliance Status */}
              <div className="rounded-2xl bg-white dark:bg-stone-900 shadow-md shadow-stone-200/60 dark:shadow-stone-950/40 p-5 sm:p-6">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-50 uppercase tracking-wider mb-4">
                Compliance Status
              </h3>
              <div className="space-y-1">
                {/* Document rows */}
                {vehicle.documents.map((doc) => {
                  const typeKeys = DOC_TYPE_LABEL_KEY[doc.type] || { label: '', description: '' }
                  const typeLabel = typeKeys.label ? t[typeKeys.label] : doc.name
                  const statusLabel = doc.status === 'valid' ? t.valid : doc.status === 'expiring-soon' ? 'Expiring' : 'Expired'
                  const statusBadge = doc.status === 'valid'
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                    : doc.status === 'expiring-soon'
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
                    : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400'
                  const isExpanded = expandedCompliance.has(doc.id)
                  const toggleExpand = () => {
                    setExpandedCompliance(prev => {
                      const next = new Set(prev)
                      if (next.has(doc.id)) next.delete(doc.id)
                      else next.add(doc.id)
                      return next
                    })
                  }
                  const detail = (() => {
                    switch (doc.type) {
                      case 'insurance': return [
                        { label: 'Document', value: doc.name },
                        { label: 'Expiry Date', value: new Date(doc.expiry).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) },
                        { label: 'Status', value: statusLabel },
                      ]
                      case 'puc': return [
                        { label: 'Document', value: doc.name },
                        { label: 'Expiry Date', value: new Date(doc.expiry).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) },
                        { label: 'Status', value: statusLabel },
                      ]
                      case 'fitness': return [
                        { label: 'Document', value: doc.name },
                        { label: 'Expiry Date', value: new Date(doc.expiry).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) },
                        { label: 'Status', value: statusLabel },
                      ]
                      case 'rc': return [
                        { label: 'Document', value: doc.name },
                        { label: 'Expiry Date', value: new Date(doc.expiry).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) },
                        { label: 'Status', value: statusLabel },
                      ]
                      default: return [
                        { label: 'Document', value: doc.name },
                        { label: 'Expiry Date', value: new Date(doc.expiry).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) },
                      ]
                    }
                  })()
                  return (
                    <div
                      key={doc.id}
                      className={`rounded-xl transition-colors ${isExpanded ? 'bg-stone-100 dark:bg-stone-800/60' : 'bg-stone-50 dark:bg-stone-800/30 hover:bg-stone-100/80 dark:hover:bg-stone-800/50'}`}
                    >
                      <button
                        onClick={toggleExpand}
                        className="w-full flex items-center justify-between px-4 py-3.5 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <ChevronDown className={`w-4 h-4 text-stone-400 dark:text-stone-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : '-rotate-90'}`} />
                          <p className="text-sm font-medium text-stone-800 dark:text-stone-200">{typeLabel}</p>
                        </div>
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${statusBadge}`}>{statusLabel}</span>
                      </button>
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-0.5 ml-7">
                          <div className="border-l-2 border-stone-200 dark:border-stone-700 pl-4 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
                            {detail.map(d => (
                              <div key={d.label}>
                                <p className="text-[11px] uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-0.5">{d.label}</p>
                                <p className="text-sm font-medium text-stone-700 dark:text-stone-300">{d.value}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
                {/* Pending Challans row */}
                {(() => {
                  const challansId = '__challans__'
                  const isExpanded = expandedCompliance.has(challansId)
                  const toggleExpand = () => {
                    setExpandedCompliance(prev => {
                      const next = new Set(prev)
                      if (next.has(challansId)) next.delete(challansId)
                      else next.add(challansId)
                      return next
                    })
                  }
                  return (
                    <div className={`rounded-xl transition-colors ${isExpanded ? 'bg-stone-100 dark:bg-stone-800/60' : 'bg-stone-50 dark:bg-stone-800/30 hover:bg-stone-100/80 dark:hover:bg-stone-800/50'}`}>
                      <button
                        onClick={toggleExpand}
                        className="w-full flex items-center justify-between px-4 py-3.5 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <ChevronDown className={`w-4 h-4 text-stone-400 dark:text-stone-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : '-rotate-90'}`} />
                          <p className="text-sm font-medium text-stone-800 dark:text-stone-200">Challans</p>
                        </div>
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400">{t.pending}</span>
                      </button>
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-0.5 ml-7">
                          <div className="border-l-2 border-stone-200 dark:border-stone-700 pl-4 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
                            <div>
                              <p className="text-[11px] uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-0.5">Pending</p>
                              <p className="text-sm font-medium text-stone-700 dark:text-stone-300">3 Challans</p>
                            </div>
                            <div>
                              <p className="text-[11px] uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-0.5">Total Amount</p>
                              <p className="text-sm font-medium text-stone-700 dark:text-stone-300">₹15,500</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })()}
                {/* Permits row */}
                {(() => {
                  const permitsId = '__permits__'
                  const isExpanded = expandedCompliance.has(permitsId)
                  const toggleExpand = () => {
                    setExpandedCompliance(prev => {
                      const next = new Set(prev)
                      if (next.has(permitsId)) next.delete(permitsId)
                      else next.add(permitsId)
                      return next
                    })
                  }
                  return (
                    <div className={`rounded-xl transition-colors ${isExpanded ? 'bg-stone-100 dark:bg-stone-800/60' : 'bg-stone-50 dark:bg-stone-800/30 hover:bg-stone-100/80 dark:hover:bg-stone-800/50'}`}>
                      <button
                        onClick={toggleExpand}
                        className="w-full flex items-center justify-between px-4 py-3.5 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <ChevronDown className={`w-4 h-4 text-stone-400 dark:text-stone-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : '-rotate-90'}`} />
                          <p className="text-sm font-medium text-stone-800 dark:text-stone-200">Permits</p>
                        </div>
                        <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">{t.valid}</span>
                      </button>
                      {isExpanded && (
                        <div className="px-4 pb-4 pt-0.5 ml-7">
                          <div className="border-l-2 border-stone-200 dark:border-stone-700 pl-4 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
                            <div>
                              <p className="text-[11px] uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-0.5">Permit Type</p>
                              <p className="text-sm font-medium text-stone-700 dark:text-stone-300">All India</p>
                            </div>
                            <div>
                              <p className="text-[11px] uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-0.5">Expiry Date</p>
                              <p className="text-sm font-medium text-stone-700 dark:text-stone-300">15 Mar 2027</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })()}
              </div>
            </div>
            </div>

            {/* Vehicle History — right */}
            <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-stone-900 shadow-md shadow-stone-200/60 dark:shadow-stone-950/40 overflow-hidden">
              <div className="px-5 py-4">
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-50 uppercase tracking-wider">
                  Vehicle History
                </h3>
              </div>
              <div className="px-5 pb-5">
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-[5px] top-2 bottom-2 w-px bg-stone-200 dark:bg-stone-700" />

                  <div className="space-y-4">
                    {[
                      { event: 'Incident Solved', date: '10 Mar 2026', desc: 'Insurance claim settled' },
                      { event: 'New Incident Created', date: '22 Feb 2026', desc: 'Challan dispute filed' },
                      { event: 'Incident Solved', date: '15 Feb 2026', desc: 'PUC renewal completed' },
                      { event: 'New Incident Created', date: '20 Jan 2026', desc: 'Overloading challan reported' },
                      { event: 'New Incident Created', date: '5 Dec 2025', desc: 'RC mismatch flagged' },
                      { event: 'Added to LOTS247', date: '2 Oct 2025', desc: 'Vehicle registered on platform' },
                    ].map((item, i) => (
                      <div key={i} className="relative flex gap-3 pl-0">
                        {/* Dot */}
                        <div className="w-[10px] h-[10px] rounded-full flex-shrink-0 z-10 mt-1.5 bg-emerald-500 dark:bg-emerald-400" />
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-stone-800 dark:text-stone-200 truncate">{item.event}</p>
                          <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-0.5">{item.desc}</p>
                          <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-0.5">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* Tab: Challans */}
        {/* ================================================================= */}
        {activeTab === 'challans' && (
          <div>
            {challanFetchState === 'idle' && (
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-8 sm:p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center">
                  <Search className="w-7 h-7 text-amber-600 dark:text-amber-400" />
                </div>
                <h3 className="text-base font-semibold text-stone-900 dark:text-stone-50 mb-1.5">
                  {t.fetchChallansFor} {vehicle.rcNumber}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 mb-6 max-w-sm mx-auto">
                  {t.challanIdleDescription}
                </p>
                <button
                  onClick={() => {
                    setChallanFetchState('fetching')
                    setTimeout(() => {
                      setFetchedChallans(SAMPLE_CHALLANS)
                      setChallanFetchState('done')
                    }, 2500)
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors shadow-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  {t.fetchChallans}
                </button>
              </div>
            )}

            {challanFetchState === 'fetching' && (
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
                  <Loader2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400 animate-spin" />
                </div>
                <h3 className="text-base font-semibold text-stone-900 dark:text-stone-50 mb-1.5">
                  {t.fetchingChallans}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  {t.checkingDatabases} <span className="font-mono font-medium text-stone-700 dark:text-stone-300">{vehicle.rcNumber}</span>
                </p>
              </div>
            )}

            {challanFetchState === 'done' && (() => {
              const pendingChallans = fetchedChallans.filter(c => c.status === 'pending')
              const paidChallans = fetchedChallans.filter(c => c.status !== 'pending')
              type ChallanFilter = 'pending' | 'paid'
              const challanFilter: ChallanFilter = (challanActionMenu as ChallanFilter) || 'pending'
              const displayChallans = challanFilter === 'pending' ? pendingChallans : paidChallans
              const formatAmount = (amt: number) => new Intl.NumberFormat(language === 'hi' ? 'hi-IN' : 'en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amt)

              return (
                <div className="flex flex-col lg:flex-row gap-5">
                  {/* Sidebar filters */}
                  <div className="lg:w-48 flex-shrink-0">
                    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
                      {([
                        { key: 'pending' as const, icon: FileWarning, label: t.pending, count: pendingChallans.length },
                        { key: 'paid' as const, icon: CheckCircle2, label: t.paid, count: paidChallans.length },
                      ]).map((item) => (
                        <button
                          key={item.key}
                          onClick={() => setChallanActionMenu(item.key)}
                          className={`w-full flex items-center justify-between px-4 py-3 text-sm font-medium transition-colors ${
                            challanFilter === item.key
                              ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 border-l-3 border-amber-500'
                              : 'text-stone-500 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <item.icon className="w-4 h-4" />
                            <span>{item.label}</span>
                          </div>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            challanFilter === item.key
                              ? 'bg-amber-200 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300'
                              : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                          }`}>
                            {item.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="flex-1 space-y-4">
                    {/* Vehicle info card */}
                    <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center flex-shrink-0">
                        <Truck className="w-5 h-5 text-stone-500 dark:text-stone-400" />
                      </div>
                      <div>
                        <p className="text-base font-bold text-stone-900 dark:text-stone-50 font-mono tracking-wide">{vehicle.rcNumber}</p>
                        <p className="text-xs text-stone-500 dark:text-stone-400">
                          {vehicle.make} {vehicle.model} · Reg. {vehicle.year}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setChallanFetchState('fetching')
                          setTimeout(() => {
                            setFetchedChallans(SAMPLE_CHALLANS)
                            setChallanFetchState('done')
                          }, 2500)
                        }}
                        className="ml-auto flex items-center gap-1.5 px-3 py-1.5 min-h-9 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-100 hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:border-stone-600 transition-colors"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        {t.reFetch}
                      </button>
                    </div>

                    {/* Challan Cards */}
                    {displayChallans.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {displayChallans.map((challan) => (
                          <div
                            key={challan.id}
                            className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 sm:p-6 flex flex-col"
                          >
                            {/* Top: Violation + Amount */}
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <p className="text-sm font-bold text-stone-900 dark:text-stone-50">
                                  {challan.violationType}
                                </p>
                                <p className="text-xs text-stone-400 dark:text-stone-500 font-mono mt-0.5">
                                  {challan.challanNumber}
                                </p>
                              </div>
                              <p className="text-lg font-bold text-red-600 dark:text-red-400 tabular-nums whitespace-nowrap">
                                {formatAmount(challan.amount)}
                              </p>
                            </div>

                            {/* Date + Location */}
                            <div className="flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400 mb-4">
                              <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                                {formatDate(challan.issueDate, language)}
                              </div>
                              <div className="flex items-center gap-1.5 min-w-0">
                                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                                <span className="truncate">{challan.location}</span>
                              </div>
                            </div>

                            {/* Footer: Type badge + Pay Now */}
                            <div className="flex items-center justify-between mt-auto pt-3 border-t border-stone-200 dark:border-stone-800">
                              <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                                challan.challanType === 'court'
                                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
                                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
                              }`}>
                                {challan.challanType === 'court' ? t.courtChallans : t.onlineChallans}
                              </span>
                              {challan.status === 'pending' && (
                                <button
                                  onClick={() => {
                                    setFetchedChallans(prev =>
                                      prev.map(c => c.id === challan.id ? { ...c, status: 'submitted' as const } : c)
                                    )
                                  }}
                                  className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-sm"
                                >
                                  {t.payNow}
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-10 text-center">
                        <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
                          <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <p className="text-sm font-medium text-stone-900 dark:text-stone-50">{t.noPendingChallans}</p>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                          {t.noPendingChallansDesc}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })()}
          </div>
        )}

        {/* ================================================================= */}
        {/* Tab: Incidents */}
        {/* ================================================================= */}
        {activeTab === 'incidents' && (
          <div>
            {/* Sub-Tab Switcher */}
            <div className="flex items-center gap-1 p-1 bg-stone-200/40 dark:bg-stone-900 rounded-lg w-fit mb-4">
              {([
                { id: 'challans' as const, label: t.tabChallans, icon: FileWarning, count: vehicleChallans.length },
                { id: 'cases' as const, label: 'Cases', icon: Briefcase, count: vehicleCases.length },
                { id: 'rto' as const, label: 'RTO', icon: Building2, count: 0 },
                { id: 'other' as const, label: 'Other', icon: MoreHorizontal, count: 0 },
              ]).map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setIncidentSubTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2 min-h-11 rounded-md text-sm font-medium transition-colors ${
                      incidentSubTab === tab.id
                        ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-50 shadow-sm'
                        : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    <span className={`text-xs tabular-nums px-1.5 py-0.5 rounded-full ${
                      incidentSubTab === tab.id
                        ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                        : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Sub-Tab Content */}
            {incidentSubTab === 'challans' && (
              <ChallanList
                challans={vehicleChallans}
                vehicles={incidentData.vehicles}
                drivers={incidentData.drivers}
                onView={(id) => console.log('View challan:', id)}
                onPay={(id) => console.log('Pay challan:', id)}
                onDispute={(id) => console.log('Dispute challan:', id)}
                onEscalateToCase={(id) => console.log('Escalate to case:', id)}
                onDownloadReceipt={(id) => console.log('Download receipt:', id)}
                onRequestRefund={(id) => console.log('Request refund:', id)}
              />
            )}
            {incidentSubTab === 'cases' && (
              <CaseList
                cases={vehicleCases}
                vehicles={incidentData.vehicles}
                drivers={incidentData.drivers}
                lawyers={incidentData.lawyers}
                onView={(id) => console.log('View case:', id)}
                onCreate={() => console.log('Create new case')}
              />
            )}
            {(incidentSubTab === 'rto' || incidentSubTab === 'other') && (
              <div className="py-16 text-center">
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  No {incidentSubTab === 'rto' ? 'RTO' : 'other'} incidents for this vehicle
                </p>
              </div>
            )}
          </div>
        )}

        {/* ================================================================= */}
        {/* Tab: Assigned Driver */}
        {/* ================================================================= */}
        {activeTab === 'driver' && (
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 sm:p-6">
            {driver ? (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                    <User className="w-6 h-6 text-stone-500 dark:text-stone-400" />
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-stone-900 dark:text-stone-50">
                      {driver.name}
                    </p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Phone className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" />
                      <span className="text-sm text-stone-500 dark:text-stone-400">
                        {driver.phone}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                    <p className="text-[10px] font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">{t.licenseNumber}</p>
                    <p className="text-sm font-medium font-mono text-stone-900 dark:text-stone-100">{driver.licenseNumber}</p>
                  </div>
                  <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                    <p className="text-[10px] font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">{t.licenseExpiry}</p>
                    <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{formatDate(driver.licenseExpiry, language)}</p>
                  </div>
                  <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                    <p className="text-[10px] font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">{t.licenseStatus}</p>
                    {(() => {
                      const style = DOC_STATUS_STYLE[driver.licenseStatus]
                      const Icon = style.icon
                      return (
                        <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${style.text}`}>
                          <Icon className="w-3.5 h-3.5" />
                          {t[DOC_STATUS_LABEL_KEY[driver.licenseStatus]]}
                        </span>
                      )
                    })()}
                  </div>
                  <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                    <p className="text-[10px] font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">{t.vehiclesAssigned}</p>
                    <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{driver.assignedVehicleIds.length}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                  <UserPlus className="w-6 h-6 text-stone-400 dark:text-stone-500" />
                </div>
                <p className="text-sm font-medium text-stone-600 dark:text-stone-400 mb-1">
                  {t.noDriverAssigned}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">
                  {t.noDriverAssignedDesc}
                </p>
                <button
                  onClick={() => setShowAssignDriver(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  {t.assignDriver}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Edit Vehicle Modal */}
        <EditVehicleModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          vehicle={vehicle}
          onSave={() => onEdit?.()}
          t={t}
        />

        {/* Assign Driver Modal */}
        <AssignDriverModal
          isOpen={showAssignDriver}
          onClose={() => setShowAssignDriver(false)}
          drivers={drivers}
          currentDriverId={vehicle.assignedDriverId}
          onAssign={(driverId) => onAssignDriver?.(driverId)}
          t={t}
        />

        {/* Upload Document Modal */}
        <UploadDocumentModal
          isOpen={showUploadDoc}
          onClose={() => setShowUploadDoc(false)}
          rcNumber={vehicle.rcNumber}
          t={t}
        />
      </div>
    </div>
  )
}
