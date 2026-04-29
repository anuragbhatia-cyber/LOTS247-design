import { useState, useMemo, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  Plus,
  Upload,
  Truck,
  User,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  FileWarning,
  X,
  MoreVertical,
  Pencil,
  Ban,
  Eye,
  Users,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  UserPlus,
  ArrowLeftRight,
  UserMinus,
  RefreshCw,
  Loader2,
  Download,
} from 'lucide-react'
import type {
  VehicleAndDriverManagementProps,
  Vehicle,
  Driver,
  VehicleStatus,
  SubscriptionStatus,
  DocumentStatus,
} from '@/../product/sections/vehicle-and-driver-management/types'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'

// ---------------------------------------------------------------------------
// Translations
// ---------------------------------------------------------------------------

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Page header
    vehiclesAndDrivers: 'Vehicles & Drivers',
    centralRepository: 'Central repository of all vehicles and assigned drivers',

    // Header buttons
    bulkUpload: 'Bulk Upload',
    addDriver: 'Add Driver',
    addVehicle: 'Add Vehicle',

    // Summary cards
    totalVehicles: 'Total Vehicles',
    active: 'active',
    avgCompliance: 'Avg. Compliance',
    expiredDocs: 'Expired Docs',
    vehiclesNeedAttention: 'vehicles need attention',
    expiringSoon: 'Expiring Soon',
    upcomingRenewals: 'upcoming renewals',

    // Tabs
    vehicles: 'Vehicles',
    drivers: 'Drivers',

    // Search placeholders
    searchVehiclesPlaceholder: 'Search by RC number, make, model, driver...',
    searchDriversPlaceholder: 'Search by name, license number, phone...',

    // Filters
    filters: 'Filters',
    category: 'Category',
    allCategories: 'All categories',
    owned: 'Owned',
    leased: 'Leased',
    rented: 'Rented',
    documentStatus: 'Document Status',
    allStatuses: 'All statuses',
    valid: 'Valid',
    expiringLabel: 'Expiring Soon',
    expired: 'Expired',
    status: 'Status',
    all: 'All',
    activeStatus: 'Active',
    inactiveStatus: 'Inactive',
    clearAll: 'Clear all',
    filteredBy: 'Filtered by:',

    // Sort options
    complianceHigh: 'Compliance (High)',
    complianceLow: 'Compliance (Low)',
    rcNumberAZ: 'RC Number (A-Z)',
    rcNumberZA: 'RC Number (Z-A)',
    expirySoonest: 'Expiry (Soonest)',
    expiryLatest: 'Expiry (Latest)',

    // Results count
    of: 'of',
    vehiclesCount: 'vehicles',
    driversCount: 'drivers',

    // Vehicle table headers
    vehicle: 'Vehicle',
    categoryHeader: 'Category',
    compliance: 'Compliance',
    subscription: 'Subscription',
    subscriptionActive: 'Active',
    subscriptionInactive: 'Inactive',
    insurance: 'Insurance Upto',
    puc: 'PUC Upto',
    actions: 'Actions',

    // Fetch details
    fetchDetails: 'Fetch Details',
    fetching: 'Fetching...',

    // Action menu
    viewDetails: 'View Details',
    edit: 'Edit',
    deactivate: 'Deactivate',

    // Vehicle status badge
    inactive: 'Inactive',

    // Empty states
    noVehiclesFound: 'No vehicles found',
    tryAdjustingSearchOrFilters: 'Try adjusting your search or filters',
    noDriversFound: 'No drivers found',
    tryAdjustingSearch: 'Try adjusting your search',

    // Driver table headers
    driver: 'Driver',
    licenseNumber: 'License Number',
    licenseExpiry: 'License Expiry',
    assignedVehicles: 'Assigned Vehicles',
    noVehiclesAssigned: 'No vehicles assigned',
    changeVehicle: 'Change Vehicle',
    removeDriver: 'Remove Driver',

    // Driver mobile card
    license: 'License',
    expires: 'Expires',
    expiring: 'Expiring',

    // Bulk upload modal
    bulkUploadVehicles: 'Bulk Upload Vehicles',
    importMultipleVehicles: 'Import multiple vehicles from a spreadsheet',
    downloadSample: 'Download Sample',
    removeFile: 'Remove file',
    dropFileHere: 'Drop your file here, or',
    browse: 'browse',
    supportedFormats: 'Supports CSV, XLS, and XLSX files',
    requiredColumns: 'Required columns',
    requiredColumnsList: 'RC Number, Vehicle Type, Make, Model, Year, Category, Insurance Expiry, PUC Expiry',
    cancel: 'Cancel',
    uploadAndImport: 'Upload & Import',

    // Change vehicle modal
    changeVehicleTitle: 'Change Vehicle',
    searchVehiclePlaceholder: 'Search by RC number, make, model...',
    selectVehicle: 'Select a vehicle to assign',
    currentlyAssigned: 'Currently Assigned',
    confirmAssignment: 'Confirm Assignment',
    assignDriverTo: 'Assign',
    toVehicle: 'to',
    questionMark: '?',
    yes: 'Yes',
    no: 'No',
    driverAssigned: 'Driver Assigned',
    driverAssignedDesc: 'has been assigned to',
    done: 'Done',

  },
  hi: {
    // Page header
    vehiclesAndDrivers: 'वाहन और ड्राइवर',
    centralRepository: 'सभी वाहनों और नियुक्त ड्राइवरों का केंद्रीय भंडार',

    // Header buttons
    bulkUpload: 'बल्क अपलोड',
    addDriver: 'ड्राइवर जोड़ें',
    addVehicle: 'वाहन जोड़ें',

    // Summary cards
    totalVehicles: 'कुल वाहन',
    active: 'सक्रिय',
    avgCompliance: 'औसत अनुपालन',
    expiredDocs: 'समाप्त दस्तावेज़',
    vehiclesNeedAttention: 'वाहनों पर ध्यान दें',
    expiringSoon: 'जल्द समाप्त',
    upcomingRenewals: 'आगामी नवीनीकरण',

    // Tabs
    vehicles: 'वाहन',
    drivers: 'ड्राइवर',

    // Search placeholders
    searchVehiclesPlaceholder: 'RC नंबर, निर्माता, मॉडल, ड्राइवर से खोजें...',
    searchDriversPlaceholder: 'नाम, लाइसेंस नंबर, फ़ोन से खोजें...',

    // Filters
    filters: 'फ़िल्टर',
    category: 'श्रेणी',
    allCategories: 'सभी श्रेणियां',
    owned: 'स्वामित्व',
    leased: 'पट्टे पर',
    rented: 'किराये पर',
    documentStatus: 'दस्तावेज़ स्थिति',
    allStatuses: 'सभी स्थितियां',
    valid: 'वैध',
    expiringLabel: 'जल्द समाप्त',
    expired: 'समाप्त',
    status: 'स्थिति',
    all: 'सभी',
    activeStatus: 'सक्रिय',
    inactiveStatus: 'निष्क्रिय',
    clearAll: 'सभी साफ़ करें',
    filteredBy: 'फ़िल्टर:',

    // Sort options
    complianceHigh: 'अनुपालन (उच्च)',
    complianceLow: 'अनुपालन (निम्न)',
    rcNumberAZ: 'RC नंबर (A-Z)',
    rcNumberZA: 'RC नंबर (Z-A)',
    expirySoonest: 'समाप्ति (निकटतम)',
    expiryLatest: 'समाप्ति (नवीनतम)',

    // Results count
    of: 'में से',
    vehiclesCount: 'वाहन',
    driversCount: 'ड्राइवर',

    // Vehicle table headers
    vehicle: 'वाहन',
    categoryHeader: 'श्रेणी',
    compliance: 'अनुपालन',
    subscription: 'सदस्यता',
    subscriptionActive: 'सक्रिय',
    subscriptionInactive: 'निष्क्रिय',
    insurance: 'बीमा तक',
    puc: 'पीयूसी तक',
    actions: 'कार्रवाई',

    // Fetch details
    fetchDetails: 'विवरण प्राप्त करें',
    fetching: 'प्राप्त हो रहा...',

    // Action menu
    viewDetails: 'विवरण देखें',
    edit: 'संपादन',
    deactivate: 'निष्क्रिय करें',

    // Vehicle status badge
    inactive: 'निष्क्रिय',

    // Empty states
    noVehiclesFound: 'कोई वाहन नहीं मिला',
    tryAdjustingSearchOrFilters: 'अपनी खोज या फ़िल्टर बदलकर देखें',
    noDriversFound: 'कोई ड्राइवर नहीं मिला',
    tryAdjustingSearch: 'अपनी खोज बदलकर देखें',

    // Driver table headers
    driver: 'ड्राइवर',
    licenseNumber: 'लाइसेंस नंबर',
    licenseExpiry: 'लाइसेंस समाप्ति',
    assignedVehicles: 'नियुक्त वाहन',
    noVehiclesAssigned: 'कोई वाहन नियुक्त नहीं',
    changeVehicle: 'वाहन बदलें',
    removeDriver: 'ड्राइवर हटाएं',

    // Driver mobile card
    license: 'लाइसेंस',
    expires: 'समाप्ति',
    expiring: 'जल्द समाप्त',

    // Bulk upload modal
    bulkUploadVehicles: 'वाहन बल्क अपलोड',
    importMultipleVehicles: 'स्प्रेडशीट से कई वाहन आयात करें',
    downloadSample: 'नमूना डाउनलोड करें',
    removeFile: 'फ़ाइल हटाएं',
    dropFileHere: 'अपनी फ़ाइल यहां छोड़ें, या',
    browse: 'ब्राउज़ करें',
    supportedFormats: 'CSV, XLS, और XLSX फ़ाइलें समर्थित हैं',
    requiredColumns: 'आवश्यक कॉलम',
    requiredColumnsList: 'RC नंबर, वाहन प्रकार, निर्माता, मॉडल, वर्ष, श्रेणी, बीमा समाप्ति, पीयूसी समाप्ति',
    cancel: 'रद्द करें',
    uploadAndImport: 'अपलोड और आयात',

    // Change vehicle modal
    changeVehicleTitle: 'वाहन बदलें',
    searchVehiclePlaceholder: 'RC नंबर, निर्माता, मॉडल से खोजें...',
    selectVehicle: 'नियुक्त करने के लिए वाहन चुनें',
    currentlyAssigned: 'वर्तमान में नियुक्त',
    confirmAssignment: 'नियुक्ति की पुष्टि करें',
    assignDriverTo: 'नियुक्त करें',
    toVehicle: 'को',
    questionMark: '?',
    yes: 'हाँ',
    no: 'नहीं',
    driverAssigned: 'ड्राइवर नियुक्त',
    driverAssignedDesc: 'को नियुक्त किया गया है',
    done: 'पूर्ण',

  },
}

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const EXPIRY_CONFIG: Record<DocumentStatus, { labelKey: 'valid' | 'expiringLabel' | 'expired'; bg: string; text: string; dot: string }> = {
  valid: {
    labelKey: 'valid',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    dot: 'bg-emerald-500',
  },
  'expiring-soon': {
    labelKey: 'expiringLabel',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-300',
    dot: 'bg-amber-500',
  },
  expired: {
    labelKey: 'expired',
    bg: 'bg-red-50 dark:bg-red-950/40',
    text: 'text-red-700 dark:text-red-300',
    dot: 'bg-red-500',
  },
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(dateStr: string, language: Language = 'en'): string {
  return new Date(dateStr).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function getComplianceColor(score: number): { text: string; bg: string; ring: string; fill: string } {
  if (score >= 75) return {
    text: 'text-emerald-700 dark:text-emerald-300',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    ring: 'ring-emerald-200 dark:ring-emerald-800',
    fill: 'text-emerald-500',
  }
  if (score >= 50) return {
    text: 'text-amber-700 dark:text-amber-300',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    ring: 'ring-amber-200 dark:ring-amber-800',
    fill: 'text-amber-500',
  }
  return {
    text: 'text-red-700 dark:text-red-300',
    bg: 'bg-red-50 dark:bg-red-950/40',
    ring: 'ring-red-200 dark:ring-red-800',
    fill: 'text-red-500',
  }
}

function getWorstExpiry(vehicle: Vehicle): DocumentStatus {
  const statuses = vehicle.documents
    .filter((d) => d.type !== 'rc')
    .map((d) => d.status)
  if (statuses.includes('expired')) return 'expired'
  if (statuses.includes('expiring-soon')) return 'expiring-soon'
  return 'valid'
}

function resolveDriver(driverId: string | null, drivers: Driver[]): Driver | undefined {
  if (!driverId) return undefined
  return drivers.find((d) => d.id === driverId)
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ComplianceScoreBadge({ score }: { score: number }) {
  const colors = getComplianceColor(score)
  return (
    <span className={`text-sm font-bold tabular-nums ${colors.text}`}>
      {score}
    </span>
  )
}

function ExpiryBadge({ status, label }: { status: DocumentStatus; label: string }) {
  return (
    <span className="text-xs font-medium text-stone-600 dark:text-stone-400">
      {label}
    </span>
  )
}

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
// Change Vehicle Modal (3-step: search → confirm → success)
// ---------------------------------------------------------------------------

type ChangeVehicleStep = 'search' | 'confirm' | 'success'

function notifyParentOverlay(show: boolean) {
  if (window.parent !== window) {
    window.parent.postMessage({ type: show ? 'showOverlay' : 'hideOverlay' }, '*')
  }
}

function ChangeVehicleModal({
  isOpen,
  onClose,
  driver,
  vehicles,
  t,
}: {
  isOpen: boolean
  onClose: () => void
  driver: Driver | null
  vehicles: Vehicle[]
  t: Record<string, string>
}) {
  const [step, setStep] = useState<ChangeVehicleStep>('search')
  const [search, setSearch] = useState('')
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null)

  useEffect(() => {
    if (isOpen) {
      notifyParentOverlay(true)
    }
    return () => { notifyParentOverlay(false) }
  }, [isOpen])

  if (!isOpen || !driver) return null

  const currentVehicleIds = driver.assignedVehicleIds
  const filtered = vehicles.filter((v) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      v.rcNumber.toLowerCase().includes(q) ||
      v.make.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q) ||
      v.vehicleType.toLowerCase().includes(q)
    )
  })

  const selectedVehicle = vehicles.find((v) => v.id === selectedVehicleId)

  function handleClose() {
    notifyParentOverlay(false)
    setStep('search')
    setSearch('')
    setSelectedVehicleId(null)
    onClose()
  }

  function handleConfirm() {
    setStep('success')
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6 bg-black/50 dark:bg-black/70" onClick={handleClose}>

      <div className="relative w-full max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl my-auto" onClick={(e) => e.stopPropagation()}>

        {/* ---- Step 1: Search & Select Vehicle ---- */}
        {step === 'search' && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
              <div>
                <h2 className="text-base font-bold text-stone-900 dark:text-stone-50">
                  {t.changeVehicleTitle}
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {t.selectVehicle}
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
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t.searchVehiclePlaceholder}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
                />
              </div>
            </div>

            {/* Vehicle List */}
            <div className="px-6 py-4 space-y-1.5 max-h-72 overflow-y-auto">
              {filtered.map((v) => {
                const isSelected = selectedVehicleId === v.id
                const isCurrent = currentVehicleIds.includes(v.id)

                return (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVehicleId(v.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${
                      isSelected
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800'
                        : 'border border-transparent hover:bg-stone-50 dark:hover:bg-stone-800/50'
                    }`}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-semibold font-mono tracking-tight truncate ${
                          isSelected
                            ? 'text-emerald-900 dark:text-emerald-100'
                            : 'text-stone-900 dark:text-stone-100'
                        }`}>
                          {v.rcNumber}
                        </p>
                        {isCurrent && (
                          <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 flex-shrink-0">
                            {t.currentlyAssigned}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                        {v.make} {v.model} · {v.vehicleType}
                      </p>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    )}
                  </button>
                )
              })}

              {filtered.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-sm text-stone-500 dark:text-stone-400">{t.noVehiclesFound}</p>
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
                onClick={() => {
                  if (selectedVehicleId) setStep('confirm')
                }}
                disabled={!selectedVehicleId || currentVehicleIds.includes(selectedVehicleId)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm ${
                  selectedVehicleId && !currentVehicleIds.includes(selectedVehicleId)
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400 cursor-not-allowed'
                }`}
              >
                {t.changeVehicle}
              </button>
            </div>
          </>
        )}

        {/* ---- Step 2: Confirmation ---- */}
        {step === 'confirm' && selectedVehicle && (
          <>
            <div className="px-6 py-8 text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 flex items-center justify-center">
                <ArrowLeftRight className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-50 mb-2">
                {t.confirmAssignment}
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                {t.assignDriverTo} <span className="font-semibold text-stone-900 dark:text-stone-100">{driver.name}</span> {t.toVehicle} <span className="font-semibold font-mono text-stone-900 dark:text-stone-100">{selectedVehicle.rcNumber}</span>{t.questionMark}
              </p>

              {/* Vehicle preview card */}
              <div className="mt-5 mx-auto max-w-xs p-4 bg-stone-50 dark:bg-stone-800/50 rounded-xl border border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
                    <Truck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold font-mono text-stone-900 dark:text-stone-50">
                      {selectedVehicle.rcNumber}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {selectedVehicle.make} {selectedVehicle.model}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center gap-3 px-6 py-4 border-t border-stone-200 dark:border-stone-800">
              <button
                onClick={() => setStep('search')}
                className="flex-1 max-w-[140px] px-4 py-2.5 rounded-xl text-sm font-medium border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                {t.no}
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 max-w-[140px] px-4 py-2.5 rounded-xl text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm"
              >
                {t.yes}
              </button>
            </div>
          </>
        )}

        {/* ---- Step 3: Success ---- */}
        {step === 'success' && selectedVehicle && (
          <>
            <div className="px-6 py-8 text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-base font-bold text-stone-900 dark:text-stone-50 mb-2">
                {t.driverAssigned}
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                <span className="font-semibold text-stone-900 dark:text-stone-100">{driver.name}</span> {t.driverAssignedDesc} <span className="font-semibold font-mono text-stone-900 dark:text-stone-100">{selectedVehicle.rcNumber}</span>
              </p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-center px-6 py-4 border-t border-stone-200 dark:border-stone-800">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-xl text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm"
              >
                {t.done}
              </button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function VehicleList({
  vehicles,
  drivers,
  onViewVehicle,
  onAddVehicle,
  onBulkUpload,
  onEditVehicle,
  onDeleteVehicle,
}: VehicleAndDriverManagementProps) {
  const { language } = useLanguage()
  const t = translations[language]

  const [activeTab, setActiveTab] = useState<'vehicles' | 'drivers'>(() => {
    const params = new URLSearchParams(window.location.search)
    const tab = params.get('tab')
    return tab === 'drivers' ? 'drivers' : 'vehicles'
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [expiryFilter, setExpiryFilter] = useState<DocumentStatus | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<VehicleStatus | 'all'>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'compliance' | 'rcNumber' | 'expiry'>('compliance')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  const [vehiclePage, setVehiclePage] = useState(1)
  const [driverPage, setDriverPage] = useState(1)
  const [driverActionId, setDriverActionId] = useState<string | null>(null)
  const [changeVehicleDriver, setChangeVehicleDriver] = useState<Driver | null>(null)
  const [fetchedIds, setFetchedIds] = useState<Set<string>>(() => {
    // Vehicles with detailsFetched !== false are already fetched
    return new Set(vehicles.filter((v) => v.detailsFetched !== false).map((v) => v.id))
  })
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set())
  const [selectedVehicleIds, setSelectedVehicleIds] = useState<Set<string>>(new Set())
  const ITEMS_PER_PAGE = 5
  const dropdownRef = useRef<HTMLDivElement>(null)
  const driverDropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdownId(null)
      }
      if (driverDropdownRef.current && !driverDropdownRef.current.contains(e.target as Node)) {
        setDriverActionId(null)
      }
    }
    if (openDropdownId || driverActionId) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openDropdownId, driverActionId])

  function handleFetchDetails(vehicleId: string) {
    setLoadingIds((prev) => new Set(prev).add(vehicleId))
    setTimeout(() => {
      setLoadingIds((prev) => {
        const next = new Set(prev)
        next.delete(vehicleId)
        return next
      })
      setFetchedIds((prev) => new Set(prev).add(vehicleId))
    }, 1500)
  }

  // Stats
  const stats = useMemo(() => {
    const active = vehicles.filter((v) => v.status === 'active').length
    const avgCompliance = vehicles.length > 0
      ? Math.round(vehicles.reduce((sum, v) => sum + v.complianceScore, 0) / vehicles.length)
      : 0
    const expiredCount = vehicles.filter((v) => getWorstExpiry(v) === 'expired').length
    const expiringCount = vehicles.filter((v) => getWorstExpiry(v) === 'expiring-soon').length

    return { total: vehicles.length, active, avgCompliance, expiredCount, expiringCount }
  }, [vehicles])

  // Filter & sort vehicles
  const filteredVehicles = useMemo(() => {
    let result = [...vehicles]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter((v) => {
        const driver = resolveDriver(v.assignedDriverId, drivers)
        return (
          v.rcNumber.toLowerCase().includes(q) ||
          v.make.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.vehicleType.toLowerCase().includes(q) ||
          driver?.name.toLowerCase().includes(q)
        )
      })
    }

    if (expiryFilter !== 'all') {
      result = result.filter((v) => getWorstExpiry(v) === expiryFilter)
    }

    if (statusFilter !== 'all') {
      result = result.filter((v) => v.status === statusFilter)
    }

    result.sort((a, b) => {
      const mul = sortDir === 'desc' ? -1 : 1
      if (sortBy === 'compliance') return mul * (a.complianceScore - b.complianceScore)
      if (sortBy === 'rcNumber') return mul * a.rcNumber.localeCompare(b.rcNumber)
      // Sort by worst expiry date
      const aExpiry = Math.min(
        new Date(a.insuranceExpiry).getTime(),
        new Date(a.pucExpiry).getTime()
      )
      const bExpiry = Math.min(
        new Date(b.insuranceExpiry).getTime(),
        new Date(b.pucExpiry).getTime()
      )
      return mul * (aExpiry - bExpiry)
    })

    return result
  }, [vehicles, drivers, searchQuery, expiryFilter, statusFilter, sortBy, sortDir])

  // Filter & sort drivers
  const filteredDrivers = useMemo(() => {
    if (!searchQuery) return drivers
    const q = searchQuery.toLowerCase()
    return drivers.filter((d) =>
      d.name.toLowerCase().includes(q) ||
      d.licenseNumber.toLowerCase().includes(q) ||
      d.phone.includes(q)
    )
  }, [drivers, searchQuery])

  // Reset page when filters/search change
  useEffect(() => { setVehiclePage(1) }, [searchQuery, expiryFilter, statusFilter, sortBy, sortDir])
  useEffect(() => { setDriverPage(1) }, [searchQuery])

  // Paginated slices
  const vehicleTotalPages = Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE)
  const paginatedVehicles = filteredVehicles.slice(
    (vehiclePage - 1) * ITEMS_PER_PAGE,
    vehiclePage * ITEMS_PER_PAGE
  )

  const driverTotalPages = Math.ceil(filteredDrivers.length / ITEMS_PER_PAGE)
  const paginatedDrivers = filteredDrivers.slice(
    (driverPage - 1) * ITEMS_PER_PAGE,
    driverPage * ITEMS_PER_PAGE
  )

  const activeFilterCount =
    (expiryFilter !== 'all' ? 1 : 0) +
    (statusFilter !== 'all' ? 1 : 0)

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
      <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-10">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              {t.vehiclesAndDrivers}
            </h1>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              {t.centralRepository}
            </p>
          </div>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-2 px-3.5 py-2.5 min-h-11 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:border-stone-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download PDF</span>
              </button>
              <button
                onClick={() => window.parent.postMessage({ type: 'openAddDriver' }, '*')}
                className="flex items-center gap-2 px-3.5 py-2.5 min-h-11 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-100 hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:border-stone-600 transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">{t.addDriver}</span>
              </button>
            </div>
            <button
              onClick={() => window.parent.postMessage({ type: 'openAddVehicle' }, '*')}
              className="flex items-center gap-2 px-3.5 py-2.5 min-h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              {t.addVehicle}
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <div className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm dark:shadow-stone-950/20 overflow-hidden">
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-1">
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 tabular-nums">
                  {stats.total}
                </p>
                <div className="p-2 sm:p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50">
                  <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                {t.totalVehicles}
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm dark:shadow-stone-950/20 overflow-hidden">
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-1">
                <p className={`text-2xl sm:text-3xl font-bold tracking-tight tabular-nums ${getComplianceColor(stats.avgCompliance).text}`}>
                  {stats.avgCompliance}%
                </p>
                <div className="p-2 sm:p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                {t.avgCompliance}
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm dark:shadow-stone-950/20 overflow-hidden">
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-1">
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 tabular-nums">
                  {stats.expiredCount}
                </p>
                <div className="p-2 sm:p-2.5 rounded-lg bg-red-50 dark:bg-red-950/50">
                  <ShieldX className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
              <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                {t.expiredDocs}
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm dark:shadow-stone-950/20 overflow-hidden">
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-1">
                <p className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 dark:text-stone-50 tabular-nums">
                  {stats.expiringCount}
                </p>
                <div className="p-2 sm:p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/50">
                  <ShieldAlert className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
              <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                {t.expiringSoon}
              </p>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-stone-200/40 dark:bg-stone-900 rounded-lg w-full sm:w-fit mb-5">
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`flex-1 sm:flex-initial flex items-center justify-center sm:justify-start gap-2 px-4 py-2 min-h-11 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'vehicles'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-50 shadow-sm'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
            }`}
          >
            <Truck className="w-4 h-4" />
            {t.vehicles}
            <span className={`text-xs tabular-nums px-1.5 py-0.5 rounded-full ${
              activeTab === 'vehicles'
                ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400'
            }`}>
              {vehicles.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('drivers')}
            className={`flex-1 sm:flex-initial flex items-center justify-center sm:justify-start gap-2 px-4 py-2 min-h-11 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'drivers'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-50 shadow-sm'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
            }`}
          >
            <Users className="w-4 h-4" />
            {t.drivers}
            <span className={`text-xs tabular-nums px-1.5 py-0.5 rounded-full ${
              activeTab === 'drivers'
                ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400'
            }`}>
              {drivers.length}
            </span>
          </button>
        </div>

        {/* Search + Filters */}
        <div className="mb-4 space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500" />
              <input
                type="text"
                placeholder={
                  activeTab === 'vehicles'
                    ? t.searchVehiclesPlaceholder
                    : t.searchDriversPlaceholder
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
              />
            </div>

            {activeTab === 'vehicles' && (
              <>
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

                <div className="hidden sm:flex items-center gap-1.5 text-sm relative">
                  <select
                    value={`${sortBy}-${sortDir}`}
                    onChange={(e) => {
                      const [field, dir] = e.target.value.split('-') as [typeof sortBy, 'asc' | 'desc']
                      setSortBy(field)
                      setSortDir(dir)
                    }}
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm font-medium text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors cursor-pointer"
                  >
                    <option value="compliance-desc">{t.complianceHigh}</option>
                    <option value="compliance-asc">{t.complianceLow}</option>
                    <option value="rcNumber-asc">{t.rcNumberAZ}</option>
                    <option value="rcNumber-desc">{t.rcNumberZA}</option>
                    <option value="expiry-asc">{t.expirySoonest}</option>
                    <option value="expiry-desc">{t.expiryLatest}</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                </div>
              </>
            )}
          </div>

          {/* Expanded Filters */}
          {showFilters && activeTab === 'vehicles' && (
            <div className="flex flex-wrap items-end gap-4 p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  {t.documentStatus}
                </label>
                <div className="relative">
                  <select
                    value={expiryFilter}
                    onChange={(e) => setExpiryFilter(e.target.value as DocumentStatus | 'all')}
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                  >
                    <option value="all">{t.allStatuses}</option>
                    <option value="valid">{t.valid}</option>
                    <option value="expiring-soon">{t.expiringLabel}</option>
                    <option value="expired">{t.expired}</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  {t.status}
                </label>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as VehicleStatus | 'all')}
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                  >
                    <option value="all">{t.all}</option>
                    <option value="active">{t.activeStatus}</option>
                    <option value="inactive">{t.inactiveStatus}</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                </div>
              </div>

              {activeFilterCount > 0 && (
                <button
                  onClick={() => {
                    setExpiryFilter('all')
                    setStatusFilter('all')
                  }}
                  className="px-3 py-2 min-h-11 text-xs font-medium text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
                >
                  {t.clearAll}
                </button>
              )}
            </div>
          )}

          {/* Active Filter Pills */}
          {activeFilterCount > 0 && !showFilters && activeTab === 'vehicles' && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 dark:text-stone-400">{t.filteredBy}</span>
              {expiryFilter !== 'all' && (
                <FilterPill
                  label={t[EXPIRY_CONFIG[expiryFilter].labelKey]}
                  onClear={() => setExpiryFilter('all')}
                />
              )}
              {statusFilter !== 'all' && (
                <FilterPill
                  label={statusFilter === 'active' ? t.activeStatus : t.inactiveStatus}
                  onClear={() => setStatusFilter('all')}
                />
              )}
            </div>
          )}
        </div>


        {/* ================================================================= */}
        {/* VEHICLES TAB */}
        {/* ================================================================= */}
        {activeTab === 'vehicles' && (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60">
                    <th className="w-10 px-0 py-3.5 pl-4">
                      <input
                        type="checkbox"
                        checked={paginatedVehicles.length > 0 && paginatedVehicles.every((v) => selectedVehicleIds.has(v.id))}
                        onChange={(e) => {
                          setSelectedVehicleIds((prev) => {
                            const next = new Set(prev)
                            if (e.target.checked) {
                              paginatedVehicles.forEach((v) => next.add(v.id))
                            } else {
                              paginatedVehicles.forEach((v) => next.delete(v.id))
                            }
                            return next
                          })
                        }}
                        className="w-4 h-4 rounded border-stone-300 dark:border-stone-600 text-emerald-600 focus:ring-emerald-500/30 cursor-pointer"
                      />
                    </th>
                    <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                      {t.vehicle}
                    </th>
                    <th className="text-center text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                      {t.compliance}
                    </th>
                    <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                      {t.insurance}
                    </th>
                    <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                      {t.puc}
                    </th>
                    <th className="text-center text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                      {t.subscription}
                    </th>
                    <th className="text-right text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                      {t.actions}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-stone-800/60">
                  {paginatedVehicles.map((vehicle) => {
                    const driver = resolveDriver(vehicle.assignedDriverId, drivers)
                    const insuranceDoc = vehicle.documents.find((d) => d.type === 'insurance')
                    const pucDoc = vehicle.documents.find((d) => d.type === 'puc')

                    return (
                      <tr
                        key={vehicle.id}
                        onClick={() => onViewVehicle?.(vehicle.id)}
                        className="group cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                      >
                        {/* Checkbox */}
                        <td className="w-10 px-0 py-4 pl-4" onClick={(e) => e.stopPropagation()}>
                          <input
                            type="checkbox"
                            checked={selectedVehicleIds.has(vehicle.id)}
                            onChange={() => {
                              setSelectedVehicleIds((prev) => {
                                const next = new Set(prev)
                                if (next.has(vehicle.id)) {
                                  next.delete(vehicle.id)
                                } else {
                                  next.add(vehicle.id)
                                }
                                return next
                              })
                            }}
                            className="w-4 h-4 rounded border-stone-300 dark:border-stone-600 text-emerald-600 focus:ring-emerald-500/30 cursor-pointer"
                          />
                        </td>

                        {/* Vehicle Info */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-stone-100 dark:bg-stone-800">
                              <Truck className="w-4.5 h-4.5 text-stone-400 dark:text-stone-500" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-stone-900 dark:text-stone-50 font-mono tracking-tight">
                                {vehicle.rcNumber}
                              </p>
                              {fetchedIds.has(vehicle.id) ? (
                                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                                  {vehicle.make} {vehicle.model} · {vehicle.year}
                                </p>
                              ) : (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    if (!loadingIds.has(vehicle.id)) handleFetchDetails(vehicle.id)
                                  }}
                                  className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 transition-colors"
                                >
                                  {loadingIds.has(vehicle.id) ? (
                                    <>
                                      <Loader2 className="w-3 h-3 animate-spin" />
                                      {t.fetching}
                                    </>
                                  ) : (
                                    <>
                                      <RefreshCw className="w-3 h-3" />
                                      {t.fetchDetails}
                                    </>
                                  )}
                                </button>
                              )}
                            </div>
                          </div>
                        </td>


                        {/* Compliance Score */}
                        <td className="px-5 py-4 text-center">
                          {fetchedIds.has(vehicle.id) ? (
                            <ComplianceScoreBadge score={vehicle.complianceScore} />
                          ) : (
                            <span className="text-sm font-bold text-stone-500 dark:text-stone-400">— —</span>
                          )}
                        </td>

                        {/* Insurance Expiry */}
                        <td className="px-5 py-4">
                          {fetchedIds.has(vehicle.id) ? (
                            insuranceDoc && (
                              <div>
                                <ExpiryBadge status={insuranceDoc.status} label={formatDate(insuranceDoc.expiry, language)} />
                              </div>
                            )
                          ) : (
                            <span className="text-sm font-bold text-stone-500 dark:text-stone-400">— —</span>
                          )}
                        </td>

                        {/* PUC Expiry */}
                        <td className="px-5 py-4">
                          {fetchedIds.has(vehicle.id) ? (
                            pucDoc && (
                              <div>
                                <ExpiryBadge status={pucDoc.status} label={formatDate(pucDoc.expiry, language)} />
                              </div>
                            )
                          ) : (
                            <span className="text-sm font-bold text-stone-500 dark:text-stone-400">— —</span>
                          )}
                        </td>

                        {/* Subscription Status */}
                        <td className="px-5 py-4 text-center">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                            vehicle.subscriptionStatus === 'active'
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                              : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                          }`}>
                            {vehicle.subscriptionStatus === 'active' ? t.subscriptionActive : t.subscriptionInactive}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4 text-right">
                          <div
                            className="relative inline-flex"
                            onClick={(e) => e.stopPropagation()}
                            ref={openDropdownId === vehicle.id ? dropdownRef : undefined}
                          >
                            <button
                              onClick={() =>
                                setOpenDropdownId(openDropdownId === vehicle.id ? null : vehicle.id)
                              }
                              className="p-3.5 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>

                            {openDropdownId === vehicle.id && (
                              <div className="absolute right-0 top-full mt-1 z-50 w-40 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl shadow-lg shadow-black/10 dark:shadow-black/30 overflow-hidden py-1">
                                <button
                                  onClick={() => {
                                    onViewVehicle?.(vehicle.id)
                                    setOpenDropdownId(null)
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3.5 py-2 min-h-11 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-colors"
                                >
                                  <Eye className="w-4 h-4" />
                                  {t.viewDetails}
                                </button>
                                <button
                                  onClick={() => {
                                    onDeleteVehicle?.(vehicle.id)
                                    setOpenDropdownId(null)
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3.5 py-2 min-h-11 text-sm text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors"
                                >
                                  <Ban className="w-4 h-4" />
                                  {t.deactivate}
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              {/* Empty State */}
              {filteredVehicles.length === 0 && (
                <div className="px-5 py-16 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                    <Search className="w-5 h-5 text-stone-400 dark:text-stone-500" />
                  </div>
                  <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
                    {t.noVehiclesFound}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                    {t.tryAdjustingSearchOrFilters}
                  </p>
                </div>
              )}

            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {paginatedVehicles.map((vehicle) => {
                const driver = resolveDriver(vehicle.assignedDriverId, drivers)
                const insuranceDoc = vehicle.documents.find((d) => d.type === 'insurance')
                const pucDoc = vehicle.documents.find((d) => d.type === 'puc')
                const worstExpiry = getWorstExpiry(vehicle)

                return (
                  <div
                    key={vehicle.id}
                    onClick={() => onViewVehicle?.(vehicle.id)}
                    className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 active:bg-stone-50 dark:active:bg-stone-800/40 transition-colors cursor-pointer"
                  >
                    {/* Top: Vehicle + Compliance */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedVehicleIds.has(vehicle.id)}
                          onChange={() => {
                            setSelectedVehicleIds((prev) => {
                              const next = new Set(prev)
                              if (next.has(vehicle.id)) {
                                next.delete(vehicle.id)
                              } else {
                                next.add(vehicle.id)
                              }
                              return next
                            })
                          }}
                          onClick={(e) => e.stopPropagation()}
                          className="w-4 h-4 rounded border-stone-300 dark:border-stone-600 text-emerald-600 focus:ring-emerald-500/30 cursor-pointer flex-shrink-0"
                        />
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-stone-100 dark:bg-stone-800">
                          <Truck className="w-5 h-5 text-stone-400 dark:text-stone-500" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-stone-900 dark:text-stone-50 font-mono tracking-tight">
                            {vehicle.rcNumber}
                          </p>
                          {fetchedIds.has(vehicle.id) ? (
                            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                              {vehicle.make} {vehicle.model}
                            </p>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                if (!loadingIds.has(vehicle.id)) handleFetchDetails(vehicle.id)
                              }}
                              className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 transition-colors"
                            >
                              {loadingIds.has(vehicle.id) ? (
                                <>
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                  {t.fetching}
                                </>
                              ) : (
                                <>
                                  <RefreshCw className="w-3 h-3" />
                                  {t.fetchDetails}
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                      {fetchedIds.has(vehicle.id) ? (
                        <ComplianceScoreBadge score={vehicle.complianceScore} />
                      ) : (
                        <span className="text-sm font-bold text-stone-500 dark:text-stone-400">— —</span>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-stone-500 dark:text-stone-400">
                        {vehicle.vehicleType}
                      </span>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${
                        vehicle.subscriptionStatus === 'active'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                      }`}>
                        {vehicle.subscriptionStatus === 'active' ? t.subscriptionActive : t.subscriptionInactive}
                      </span>
                      {vehicle.status === 'inactive' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400">
                          {t.inactive}
                        </span>
                      )}
                    </div>

                    {/* Expiry Info */}
                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-stone-500 dark:text-stone-400">{t.insurance}</span>
                        {fetchedIds.has(vehicle.id) ? (
                          insuranceDoc && <ExpiryBadge status={insuranceDoc.status} label={formatDate(insuranceDoc.expiry, language)} />
                        ) : (
                          <span className="text-xs font-bold text-stone-500 dark:text-stone-400">— —</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-stone-500 dark:text-stone-400">{t.puc}</span>
                        {fetchedIds.has(vehicle.id) ? (
                          pucDoc && <ExpiryBadge status={pucDoc.status} label={formatDate(pucDoc.expiry, language)} />
                        ) : (
                          <span className="text-xs font-bold text-stone-500 dark:text-stone-400">— —</span>
                        )}
                      </div>
                    </div>

                    {/* Bottom: Arrow */}
                    <div className="flex items-center justify-end pt-3 border-t border-stone-200 dark:border-stone-800">
                      <ChevronRight className="w-4 h-4 text-stone-300 dark:text-stone-600" />
                    </div>
                  </div>
                )
              })}

              {filteredVehicles.length === 0 && (
                <div className="py-16 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                    <Search className="w-5 h-5 text-stone-400 dark:text-stone-500" />
                  </div>
                  <p className="text-sm font-medium text-stone-600 dark:text-stone-400">{t.noVehiclesFound}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{t.tryAdjustingSearchOrFilters}</p>
                </div>
              )}

            </div>

            {/* Pagination */}
            {vehicleTotalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pb-4">
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {(vehiclePage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(vehiclePage * ITEMS_PER_PAGE, filteredVehicles.length)} {t.of} {filteredVehicles.length}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setVehiclePage((p) => Math.max(1, p - 1))}
                    disabled={vehiclePage === 1}
                    className="p-2 rounded-xl text-stone-500 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-800 hover:text-stone-700 dark:hover:text-stone-200 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: vehicleTotalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setVehiclePage(page)}
                      className={`min-w-[32px] h-8 rounded-xl text-xs font-medium transition-colors ${
                        page === vehiclePage
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-stone-600 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-800'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setVehiclePage((p) => Math.min(vehicleTotalPages, p + 1))}
                    disabled={vehiclePage === vehicleTotalPages}
                    className="p-2 rounded-xl text-stone-500 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-800 hover:text-stone-700 dark:hover:text-stone-200 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* ================================================================= */}
        {/* DRIVERS TAB */}
        {/* ================================================================= */}
        {activeTab === 'drivers' && (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60">
                    <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                      {t.driver}
                    </th>
                    <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                      {t.licenseNumber}
                    </th>
                    <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                      {t.licenseExpiry}
                    </th>
                    <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                      {t.assignedVehicles}
                    </th>
                    <th className="text-right text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                      {t.actions}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 dark:divide-stone-800/60">
                  {paginatedDrivers.map((driver) => {
                    const assignedVehicles = vehicles.filter((v) =>
                      driver.assignedVehicleIds.includes(v.id)
                    )
                    const licenseExpiry = EXPIRY_CONFIG[driver.licenseStatus]

                    return (
                      <tr
                        key={driver.id}
                        className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                              <User className="w-4 h-4 text-stone-500 dark:text-stone-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-stone-900 dark:text-stone-50">
                                {driver.name}
                              </p>
                              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                                {driver.phone}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <p className="text-sm text-stone-700 dark:text-stone-300 font-mono">
                            {driver.licenseNumber}
                          </p>
                        </td>
                        <td className="px-5 py-4">
                          <ExpiryBadge status={driver.licenseStatus} label={formatDate(driver.licenseExpiry, language)} />
                        </td>
                        <td className="px-5 py-4">
                          {assignedVehicles.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5">
                              {assignedVehicles.map((v) => (
                                <span
                                  key={v.id}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-mono"
                                >
                                  <Truck className="w-3 h-3" />
                                  {v.rcNumber}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-xs text-stone-500 dark:text-stone-400 italic">
                              {t.noVehiclesAssigned}
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4 text-right">
                          <div className="relative inline-block" ref={driverActionId === driver.id ? driverDropdownRef : undefined}>
                            <button
                              onClick={() => setDriverActionId(driverActionId === driver.id ? null : driver.id)}
                              className="p-2 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            {driverActionId === driver.id && (
                              <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 shadow-xl shadow-stone-200/60 dark:shadow-stone-950/60 overflow-hidden z-20">
                                <div className="py-1">
                                  <button
                                    onClick={() => {
                                      setChangeVehicleDriver(driver)
                                      setDriverActionId(null)
                                    }}
                                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                                  >
                                    <ArrowLeftRight className="w-4 h-4 text-stone-400" />
                                    {t.changeVehicle}
                                  </button>
                                  <button
                                    onClick={() => setDriverActionId(null)}
                                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                  >
                                    <UserMinus className="w-4 h-4" />
                                    {t.removeDriver}
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              {filteredDrivers.length === 0 && (
                <div className="px-5 py-16 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                    <Search className="w-5 h-5 text-stone-400 dark:text-stone-500" />
                  </div>
                  <p className="text-sm font-medium text-stone-600 dark:text-stone-400">{t.noDriversFound}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{t.tryAdjustingSearch}</p>
                </div>
              )}

            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {paginatedDrivers.map((driver) => {
                const assignedVehicles = vehicles.filter((v) =>
                  driver.assignedVehicleIds.includes(v.id)
                )

                return (
                  <div
                    key={driver.id}
                    className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                          <User className="w-5 h-5 text-stone-500 dark:text-stone-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-stone-900 dark:text-stone-50">{driver.name}</p>
                          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{driver.phone}</p>
                        </div>
                      </div>
                      <ExpiryBadge status={driver.licenseStatus} label={driver.licenseStatus === 'valid' ? t.valid : driver.licenseStatus === 'expiring-soon' ? t.expiring : t.expired} />
                    </div>

                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-stone-500 dark:text-stone-400">{t.license}</span>
                        <span className="text-xs font-mono text-stone-700 dark:text-stone-300">{driver.licenseNumber}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-stone-500 dark:text-stone-400">{t.expires}</span>
                        <span className="text-xs text-stone-700 dark:text-stone-300">{formatDate(driver.licenseExpiry, language)}</span>
                      </div>
                    </div>

                    {assignedVehicles.length > 0 && (
                      <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
                        <p className="text-xs text-stone-500 dark:text-stone-400 mb-1.5">{t.assignedVehicles}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {assignedVehicles.map((v) => (
                            <span
                              key={v.id}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-mono"
                            >
                              <Truck className="w-3 h-3" />
                              {v.rcNumber}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}

              {filteredDrivers.length === 0 && (
                <div className="py-16 text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                    <Search className="w-5 h-5 text-stone-400 dark:text-stone-500" />
                  </div>
                  <p className="text-sm font-medium text-stone-600 dark:text-stone-400">{t.noDriversFound}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{t.tryAdjustingSearch}</p>
                </div>
              )}

            </div>

            {/* Pagination */}
            {driverTotalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pb-4">
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {(driverPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(driverPage * ITEMS_PER_PAGE, filteredDrivers.length)} {t.of} {filteredDrivers.length}
                </p>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setDriverPage((p) => Math.max(1, p - 1))}
                    disabled={driverPage === 1}
                    className="p-2 rounded-xl text-stone-500 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-800 hover:text-stone-700 dark:hover:text-stone-200 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: driverTotalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setDriverPage(page)}
                      className={`min-w-[32px] h-8 rounded-xl text-xs font-medium transition-colors ${
                        page === driverPage
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-stone-600 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-800'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => setDriverPage((p) => Math.min(driverTotalPages, p + 1))}
                    disabled={driverPage === driverTotalPages}
                    className="p-2 rounded-xl text-stone-500 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-800 hover:text-stone-700 dark:hover:text-stone-200 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Change Vehicle Modal */}
        <ChangeVehicleModal
          isOpen={changeVehicleDriver !== null}
          onClose={() => setChangeVehicleDriver(null)}
          driver={changeVehicleDriver}
          vehicles={vehicles}
          t={t}
        />
      </div>
    </div>
  )
}
