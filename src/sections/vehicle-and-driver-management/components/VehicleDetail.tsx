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
  Send,
  Gavel,
  MoreVertical,
  Loader2,
} from 'lucide-react'
import type {
  VehicleDetailProps,
  Vehicle,
  Driver,
  VehicleCategory,
  VehicleStatus,
  DocumentStatus,
  VehicleDocument,
} from '@/../product/sections/vehicle-and-driver-management/types'

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

const CATEGORY_CONFIG: Record<VehicleCategory, { label: string; bg: string; text: string }> = {
  owned: {
    label: 'Owned',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-300',
  },
  leased: {
    label: 'Leased',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    text: 'text-blue-700 dark:text-blue-300',
  },
  rented: {
    label: 'Rented',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-300',
  },
}

const DOC_STATUS_CONFIG: Record<DocumentStatus, { label: string; bg: string; text: string; border: string; icon: typeof CheckCircle2 }> = {
  valid: {
    label: 'Valid',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-200 dark:border-emerald-800',
    icon: CheckCircle2,
  },
  'expiring-soon': {
    label: 'Expiring Soon',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-300',
    border: 'border-amber-200 dark:border-amber-800',
    icon: Clock,
  },
  expired: {
    label: 'Expired',
    bg: 'bg-red-50 dark:bg-red-950/40',
    text: 'text-red-700 dark:text-red-300',
    border: 'border-red-200 dark:border-red-800',
    icon: XCircle,
  },
}

const DOC_TYPE_LABELS: Record<string, { label: string; description: string }> = {
  insurance: { label: 'Motor Insurance', description: 'Third-party or comprehensive policy' },
  puc: { label: 'PUC Certificate', description: 'Pollution Under Control certificate' },
  fitness: { label: 'Fitness Certificate', description: 'Vehicle fitness approval' },
  rc: { label: 'Registration Certificate', description: 'Vehicle registration document' },
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

function daysUntil(dateStr: string): number {
  const now = new Date()
  const target = new Date(dateStr)
  return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
}

function getComplianceColor(score: number): { text: string; bg: string; ring: string; label: string } {
  if (score >= 75) return {
    text: 'text-emerald-700 dark:text-emerald-300',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    ring: 'stroke-emerald-500',
    label: 'Good',
  }
  if (score >= 50) return {
    text: 'text-amber-700 dark:text-amber-300',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    ring: 'stroke-amber-500',
    label: 'Needs Attention',
  }
  return {
    text: 'text-red-700 dark:text-red-300',
    bg: 'bg-red-50 dark:bg-red-950/40',
    ring: 'stroke-red-500',
    label: 'Critical',
  }
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ComplianceRing({ score }: { score: number }) {
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
        <span className="text-[10px] text-stone-400 dark:text-stone-500 uppercase tracking-wider font-medium">Score</span>
      </div>
    </div>
  )
}

function DocumentCard({ doc }: { doc: VehicleDocument }) {
  const statusConfig = DOC_STATUS_CONFIG[doc.status]
  const typeInfo = DOC_TYPE_LABELS[doc.type] || { label: doc.name, description: '' }
  const StatusIcon = statusConfig.icon
  const days = daysUntil(doc.expiry)

  return (
    <div className={`rounded-xl border p-4 border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${statusConfig.bg}`}>
            <FileText className={`w-4.5 h-4.5 ${statusConfig.text}`} />
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-900 dark:text-stone-50">
              {typeInfo.label}
            </p>
            <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
              {typeInfo.description}
            </p>
          </div>
        </div>
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${statusConfig.bg} ${statusConfig.text}`}>
          <StatusIcon className="w-3 h-3" />
          {statusConfig.label}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
          <Calendar className="w-3.5 h-3.5" />
          Expires {formatDate(doc.expiry)}
        </div>
        {doc.status === 'expired' && (
          <span className="text-xs font-medium text-red-600 dark:text-red-400">
            Expired {Math.abs(days)} days ago
          </span>
        )}
        {doc.status === 'expiring-soon' && (
          <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
            {days} days remaining
          </span>
        )}
        {doc.status === 'valid' && days > 180 && (
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            {Math.floor(days / 30)} months remaining
          </span>
        )}
        {doc.status === 'valid' && days <= 180 && (
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            {days} days remaining
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
}: {
  isOpen: boolean
  onClose: () => void
  vehicle: Vehicle
  onSave?: () => void
}) {
  const [category, setCategory] = useState<VehicleCategory>(vehicle.category)
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
    setCategory(vehicle.category)
    setStatus(vehicle.status)
    setVehicleType(vehicle.vehicleType)
    setMake(vehicle.make)
    setModel(vehicle.model)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70" onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800">
          <div>
            <h2 className="text-base font-semibold text-stone-900 dark:text-stone-50">
              Edit Vehicle
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {vehicle.rcNumber}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* RC Number (read-only) */}
          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
              RC Number
            </label>
            <input
              type="text"
              value={vehicle.rcNumber}
              disabled
              className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/50 text-sm font-mono text-stone-400 dark:text-stone-500 tracking-wider cursor-not-allowed"
            />
          </div>

          {/* Editable Fields Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                Make
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
                Model
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
              Vehicle Type
            </label>
            <div className="relative">
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value)}
                className="w-full appearance-none px-3.5 py-2.5 pr-8 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors cursor-pointer"
              >
                <option value="Truck">Truck</option>
                <option value="Trailer">Trailer</option>
                <option value="Tanker">Tanker</option>
                <option value="Container">Container</option>
                <option value="Mini Truck">Mini Truck</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
              Vehicle Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as VehicleCategory)}
                className="w-full appearance-none px-3.5 py-2.5 pr-8 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors cursor-pointer"
              >
                {(['owned', 'leased', 'rented'] as VehicleCategory[]).map((cat) => (
                  <option key={cat} value={cat}>
                    {CATEGORY_CONFIG[cat].label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
              Status
            </label>
            <div className="flex gap-2">
              {(['active', 'inactive'] as VehicleStatus[]).map((s) => {
                const isSelected = status === s
                return (
                  <button
                    key={s}
                    onClick={() => setStatus(s)}
                    className={`flex-1 px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors capitalize ${
                      isSelected
                        ? s === 'active'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-current'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-current'
                        : 'border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:border-stone-300 dark:hover:border-stone-600'
                    }`}
                  >
                    {s}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-stone-100 dark:border-stone-800">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-sm"
          >
            Save Changes
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
}: {
  isOpen: boolean
  onClose: () => void
  drivers: Driver[]
  currentDriverId: string | null
  onAssign?: (driverId: string) => void
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4">
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70" onClick={handleClose} />

      <div className="relative w-full max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800">
          <div>
            <h2 className="text-base font-semibold text-stone-900 dark:text-stone-50">
              {currentDriverId ? 'Change Driver' : 'Assign Driver'}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Select a driver from the list
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
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
              placeholder="Search by name, license, phone..."
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
            />
          </div>
        </div>

        {/* Driver List */}
        <div className="px-6 py-4 space-y-1.5 max-h-72 overflow-y-auto">
          {filtered.map((d) => {
            const isSelected = selectedId === d.id
            const isCurrent = currentDriverId === d.id
            const licenseConfig = DOC_STATUS_CONFIG[d.licenseStatus]
            const LicenseIcon = licenseConfig.icon

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
                        Current
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="text-xs text-stone-400 dark:text-stone-500 font-mono">
                      {d.licenseNumber}
                    </span>
                    <span className={`inline-flex items-center gap-1 text-[10px] font-medium ${licenseConfig.text}`}>
                      <LicenseIcon className="w-2.5 h-2.5" />
                      {licenseConfig.label}
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
              <p className="text-sm text-stone-500 dark:text-stone-400">No drivers found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-stone-100 dark:border-stone-800">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedId || selectedId === currentDriverId}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm ${
              selectedId && selectedId !== currentDriverId
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-stone-500 cursor-not-allowed'
            }`}
          >
            {currentDriverId ? 'Change Driver' : 'Assign Driver'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

type DetailTab = 'details' | 'documents' | 'compliance' | 'challans' | 'driver'

const TABS: { id: DetailTab; label: string; icon: typeof CreditCard }[] = [
  { id: 'details', label: 'Details', icon: CreditCard },
  { id: 'documents', label: 'Documents', icon: FileText },
  { id: 'compliance', label: 'Compliance', icon: ShieldCheck },
  { id: 'challans', label: 'Challans', icon: FileWarning },
  { id: 'driver', label: 'Assigned Driver', icon: User },
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
}

const SAMPLE_CHALLANS: VehicleChallan[] = [
  {
    id: 'ch1',
    challanNumber: 'DL-2026-00847',
    violationType: 'Overspeeding',
    amount: 2000,
    issueDate: '2026-02-18',
    location: 'NH-48, Gurugram Toll Plaza',
    status: 'pending',
    source: 'Parivahan',
  },
  {
    id: 'ch2',
    challanNumber: 'DL-2026-00623',
    violationType: 'Red Light Violation',
    amount: 5000,
    issueDate: '2026-02-10',
    location: 'Mahipalpur Junction, Delhi',
    status: 'pending',
    source: 'Parivahan',
  },
  {
    id: 'ch3',
    challanNumber: 'UP-2026-01192',
    violationType: 'Overloading',
    amount: 20000,
    issueDate: '2026-01-25',
    location: 'Yamuna Expressway, KM 45',
    status: 'pending',
    source: 'Parivahan',
  },
]

type ChallanFetchState = 'idle' | 'fetching' | 'done'

// ---------------------------------------------------------------------------
// Upload Document Modal
// ---------------------------------------------------------------------------

const DOC_TYPE_OPTIONS = [
  { value: 'insurance', label: 'Motor Insurance' },
  { value: 'puc', label: 'PUC Certificate' },
  { value: 'fitness', label: 'Fitness Certificate' },
  { value: 'rc', label: 'Registration Certificate' },
  { value: 'permit', label: 'Permit' },
  { value: 'other', label: 'Other' },
]

function UploadDocumentModal({
  isOpen,
  onClose,
  rcNumber,
}: {
  isOpen: boolean
  onClose: () => void
  rcNumber: string
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4">
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70" onClick={handleClose} />

      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800">
          <div>
            <h2 className="text-base font-semibold text-stone-900 dark:text-stone-50">
              Upload Document
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {rcNumber}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Document Type */}
          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
              Document Type
            </label>
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full appearance-none px-3.5 py-2.5 pr-8 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors cursor-pointer"
              >
                <option value="" disabled>Select document type</option>
                {DOC_TYPE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
            </div>
          </div>

          {/* File Drop Zone */}
          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
              Upload File
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
                    className="text-xs text-stone-500 dark:text-stone-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-stone-400 dark:text-stone-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                      Drop your file here, or <span className="text-emerald-600 dark:text-emerald-400">browse</span>
                    </p>
                    <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                      PDF, JPG, PNG or WebP up to 10MB
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-stone-100 dark:border-stone-800">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || !selectedType}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm ${
              selectedFile && selectedType
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-stone-500 cursor-not-allowed'
            }`}
          >
            <FileText className="w-4 h-4" />
            Upload
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
  const [activeTab, setActiveTab] = useState<DetailTab>('details')
  const [showEditModal, setShowEditModal] = useState(false)
  const [showAssignDriver, setShowAssignDriver] = useState(false)
  const [challanFetchState, setChallanFetchState] = useState<ChallanFetchState>('idle')
  const [fetchedChallans, setFetchedChallans] = useState<VehicleChallan[]>([])
  const [challanActionMenu, setChallanActionMenu] = useState<string | null>(null)
  const [showUploadDoc, setShowUploadDoc] = useState(false)
  const complianceColors = getComplianceColor(vehicle.complianceScore)
  const categoryConfig = CATEGORY_CONFIG[vehicle.category]

  const expiredDocs = vehicle.documents.filter((d) => d.status === 'expired')
  const expiringDocs = vehicle.documents.filter((d) => d.status === 'expiring-soon')

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-10">
        {/* Back Button */}
        <button
          onClick={() => onBack?.()}
          className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors mb-5"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Vehicles
        </button>

        {/* ================================================================= */}
        {/* Hero Header */}
        {/* ================================================================= */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden mb-6">
          {/* Alert Banner */}
          {expiredDocs.length > 0 && (
            <div className="px-5 py-3 bg-red-50 dark:bg-red-950/30 border-b border-red-200 dark:border-red-900/40 flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
              <p className="text-sm text-red-700 dark:text-red-300">
                <span className="font-semibold">{expiredDocs.length} document{expiredDocs.length > 1 ? 's' : ''} expired</span>
                {' — '}
                {expiredDocs.map((d) => DOC_TYPE_LABELS[d.type]?.label || d.name).join(', ')}
              </p>
            </div>
          )}
          {expiredDocs.length === 0 && expiringDocs.length > 0 && (
            <div className="px-5 py-3 bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-900/40 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
              <p className="text-sm text-amber-700 dark:text-amber-300">
                <span className="font-semibold">{expiringDocs.length} document{expiringDocs.length > 1 ? 's' : ''} expiring soon</span>
                {' — '}
                {expiringDocs.map((d) => DOC_TYPE_LABELS[d.type]?.label || d.name).join(', ')}
              </p>
            </div>
          )}

          <div className="p-5 sm:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              {/* Left: Vehicle Info */}
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-5">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    vehicle.status === 'active'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500'
                  }`}>
                    <Truck className="w-7 h-7" />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 font-mono tracking-tight">
                      {vehicle.rcNumber}
                    </h1>
                    <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">
                      {vehicle.make} {vehicle.model} · {vehicle.year} · {vehicle.vehicleType}
                    </p>
                    <div className="flex items-center gap-2 mt-2.5">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${categoryConfig.bg} ${categoryConfig.text}`}>
                        {categoryConfig.label}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${
                        vehicle.status === 'active'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                      }`}>
                        {vehicle.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowEditModal(true)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors shadow-sm"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit Vehicle
                  </button>
                  <button
                    onClick={() => setShowAssignDriver(true)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-medium text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-600 transition-colors"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    {driver ? 'Change Driver' : 'Assign Driver'}
                  </button>
                  <button
                    onClick={() => onDelete?.()}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-medium text-amber-600 dark:text-amber-400 hover:border-amber-300 dark:hover:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/20 transition-colors"
                  >
                    <Ban className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Deactivate</span>
                  </button>
                </div>
              </div>

              {/* Right: Compliance Score Ring */}
              <div className="flex flex-col items-center gap-2">
                <ComplianceRing score={vehicle.complianceScore} />
                <span className={`text-xs font-semibold uppercase tracking-wider ${complianceColors.text}`}>
                  {complianceColors.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* Tab Switcher */}
        {/* ================================================================= */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-900 rounded-lg w-fit mb-6 overflow-x-auto">
          {TABS.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-50 shadow-sm'
                    : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
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
                <p className="text-[10px] font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1">RC Number</p>
                <p className="text-sm font-semibold font-mono text-stone-900 dark:text-stone-100">{vehicle.rcNumber}</p>
              </div>
              <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                <p className="text-[10px] font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1">Vehicle Type</p>
                <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{vehicle.vehicleType}</p>
              </div>
              <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                <p className="text-[10px] font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1">Make</p>
                <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{vehicle.make}</p>
              </div>
              <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                <p className="text-[10px] font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1">Model</p>
                <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{vehicle.model}</p>
              </div>
              <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                <p className="text-[10px] font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1">Year</p>
                <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{vehicle.year}</p>
              </div>
              <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                <p className="text-[10px] font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1">Category</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${categoryConfig.bg} ${categoryConfig.text}`}>
                  {categoryConfig.label}
                </span>
              </div>
              <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                <p className="text-[10px] font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1">Status</p>
                <span className={`text-sm font-medium ${
                  vehicle.status === 'active'
                    ? 'text-emerald-600 dark:text-emerald-400'
                    : 'text-stone-500 dark:text-stone-400'
                }`}>
                  {vehicle.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* Tab: Documents */}
        {/* ================================================================= */}
        {activeTab === 'documents' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-50">
                Vehicle Documents
              </h3>
              <button
                onClick={() => setShowUploadDoc(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" />
                Upload Document
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {vehicle.documents.map((doc) => (
                <DocumentCard key={doc.id} doc={doc} />
              ))}
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* Tab: Compliance */}
        {/* ================================================================= */}
        {activeTab === 'compliance' && (
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
              <ComplianceRing score={vehicle.complianceScore} />
              <div className="flex-1 text-center sm:text-left">
                <p className={`text-lg font-bold ${complianceColors.text}`}>{complianceColors.label}</p>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">
                  Overall compliance score based on document validity
                </p>

                <div className="mt-5 space-y-3">
                  {expiredDocs.length > 0 && (
                    <div className="flex items-center gap-2.5 p-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0" />
                      <p className="text-sm text-red-700 dark:text-red-300">
                        <span className="font-semibold">{expiredDocs.length} expired</span>
                        {' — '}
                        {expiredDocs.map((d) => DOC_TYPE_LABELS[d.type]?.label || d.name).join(', ')}
                      </p>
                    </div>
                  )}
                  {expiringDocs.length > 0 && (
                    <div className="flex items-center gap-2.5 p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-lg">
                      <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                      <p className="text-sm text-amber-700 dark:text-amber-300">
                        <span className="font-semibold">{expiringDocs.length} expiring soon</span>
                        {' — '}
                        {expiringDocs.map((d) => DOC_TYPE_LABELS[d.type]?.label || d.name).join(', ')}
                      </p>
                    </div>
                  )}
                  {expiredDocs.length === 0 && expiringDocs.length === 0 && (
                    <div className="flex items-center gap-2.5 p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <p className="text-sm text-emerald-700 dark:text-emerald-300">
                        All documents are valid and up to date
                      </p>
                    </div>
                  )}
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
                  Fetch Challans for {vehicle.rcNumber}
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400 mb-6 max-w-sm mx-auto">
                  Check for pending traffic challans from Parivahan and other government databases against this vehicle.
                </p>
                <button
                  onClick={() => {
                    setChallanFetchState('fetching')
                    setTimeout(() => {
                      setFetchedChallans(SAMPLE_CHALLANS)
                      setChallanFetchState('done')
                    }, 2500)
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors shadow-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                  Fetch Challans
                </button>
              </div>
            )}

            {challanFetchState === 'fetching' && (
              <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
                  <Loader2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400 animate-spin" />
                </div>
                <h3 className="text-base font-semibold text-stone-900 dark:text-stone-50 mb-1.5">
                  Fetching Challans...
                </h3>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  Checking Parivahan and government databases for <span className="font-mono font-medium text-stone-700 dark:text-stone-300">{vehicle.rcNumber}</span>
                </p>
              </div>
            )}

            {challanFetchState === 'done' && (
              <div className="space-y-4">
                {/* Header with result count and re-fetch */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-50">
                      Pending Challans
                    </h3>
                    {fetchedChallans.length > 0 && (
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400">
                        {fetchedChallans.filter(c => c.status === 'pending').length} pending
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setChallanFetchState('fetching')
                      setTimeout(() => {
                        setFetchedChallans(SAMPLE_CHALLANS)
                        setChallanFetchState('done')
                      }, 2500)
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-xs font-medium text-stone-600 dark:text-stone-400 hover:border-stone-300 dark:hover:border-stone-600 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    Re-fetch
                  </button>
                </div>

                {/* Total Amount Card */}
                {fetchedChallans.length > 0 && (
                  <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center">
                        <IndianRupee className="w-5 h-5 text-amber-700 dark:text-amber-400" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider">Total Pending Amount</p>
                        <p className="text-xl font-bold text-amber-800 dark:text-amber-200 tabular-nums">
                          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(
                            fetchedChallans.filter(c => c.status === 'pending').reduce((sum, c) => sum + c.amount, 0)
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Challan Cards */}
                {fetchedChallans.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {fetchedChallans.map((challan) => (
                      <div
                        key={challan.id}
                        className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4 sm:p-5"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-red-50 dark:bg-red-950/40 flex items-center justify-center flex-shrink-0">
                              <FileWarning className="w-5 h-5 text-red-600 dark:text-red-400" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-stone-900 dark:text-stone-50">
                                {challan.violationType}
                              </p>
                              <p className="text-xs text-stone-400 dark:text-stone-500 font-mono mt-0.5">
                                {challan.challanNumber}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${
                              challan.status === 'pending'
                                ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300'
                                : challan.status === 'submitted'
                                ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300'
                                : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300'
                            }`}>
                              {challan.status === 'pending' ? 'Pending' : challan.status === 'submitted' ? 'Submitted' : 'Resolved'}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4">
                          <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
                            <IndianRupee className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="font-semibold text-stone-900 dark:text-stone-100 tabular-nums">
                              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(challan.amount)}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
                            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                            {formatDate(challan.issueDate)}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
                            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                            <span className="truncate">{challan.location}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        {challan.status === 'pending' && (
                          <div className="flex items-center gap-2 pt-3 border-t border-stone-100 dark:border-stone-800">
                            <button
                              onClick={() => {
                                setFetchedChallans(prev =>
                                  prev.map(c => c.id === challan.id ? { ...c, status: 'submitted' as const } : c)
                                )
                              }}
                              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors shadow-sm"
                            >
                              <Gavel className="w-3.5 h-3.5" />
                              Submit for Resolution
                            </button>
                            <button
                              onClick={() => {}}
                              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-medium text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-600 transition-colors"
                            >
                              <Send className="w-3.5 h-3.5" />
                              Send Proposal
                            </button>
                          </div>
                        )}

                        {challan.status === 'submitted' && (
                          <div className="flex items-center gap-2 pt-3 border-t border-stone-100 dark:border-stone-800">
                            <span className="flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400">
                              <Clock className="w-3.5 h-3.5" />
                              Submitted for resolution — awaiting update
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-10 text-center">
                    <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <p className="text-sm font-medium text-stone-900 dark:text-stone-50">No pending challans</p>
                    <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                      This vehicle has no pending traffic challans
                    </p>
                  </div>
                )}
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
                    <p className="text-[10px] font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1">License Number</p>
                    <p className="text-sm font-medium font-mono text-stone-900 dark:text-stone-100">{driver.licenseNumber}</p>
                  </div>
                  <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                    <p className="text-[10px] font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1">License Expiry</p>
                    <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{formatDate(driver.licenseExpiry)}</p>
                  </div>
                  <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                    <p className="text-[10px] font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1">License Status</p>
                    {(() => {
                      const config = DOC_STATUS_CONFIG[driver.licenseStatus]
                      const Icon = config.icon
                      return (
                        <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${config.text}`}>
                          <Icon className="w-3.5 h-3.5" />
                          {config.label}
                        </span>
                      )
                    })()}
                  </div>
                  <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
                    <p className="text-[10px] font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1">Vehicles Assigned</p>
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
                  No driver assigned
                </p>
                <p className="text-xs text-stone-400 dark:text-stone-500 mb-4">
                  Assign a driver to this vehicle to track their details here
                </p>
                <button
                  onClick={() => setShowAssignDriver(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  Assign Driver
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
        />

        {/* Assign Driver Modal */}
        <AssignDriverModal
          isOpen={showAssignDriver}
          onClose={() => setShowAssignDriver(false)}
          drivers={drivers}
          currentDriverId={vehicle.assignedDriverId}
          onAssign={(driverId) => onAssignDriver?.(driverId)}
        />

        {/* Upload Document Modal */}
        <UploadDocumentModal
          isOpen={showUploadDoc}
          onClose={() => setShowUploadDoc(false)}
          rcNumber={vehicle.rcNumber}
        />
      </div>
    </div>
  )
}
