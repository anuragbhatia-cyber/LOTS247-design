import { useState, useMemo, useRef, useEffect } from 'react'
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
  ChevronRight,
  Download,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  UserPlus,
} from 'lucide-react'
import type {
  VehicleAndDriverManagementProps,
  Vehicle,
  Driver,
  VehicleCategory,
  VehicleStatus,
  DocumentStatus,
} from '@/../product/sections/vehicle-and-driver-management/types'
import { AddVehicleModal } from './AddVehicleModal'
import { AddDriverModal } from './AddDriverModal'

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

const EXPIRY_CONFIG: Record<DocumentStatus, { label: string; bg: string; text: string; dot: string }> = {
  valid: {
    label: 'Valid',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-300',
    dot: 'bg-emerald-500',
  },
  'expiring-soon': {
    label: 'Expiring Soon',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-300',
    dot: 'bg-amber-500',
  },
  expired: {
    label: 'Expired',
    bg: 'bg-red-50 dark:bg-red-950/40',
    text: 'text-red-700 dark:text-red-300',
    dot: 'bg-red-500',
  },
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
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold tabular-nums ${colors.bg} ${colors.text} ring-1 ${colors.ring}`}>
      <ShieldCheck className="w-3 h-3" />
      {score}
    </span>
  )
}

function CategoryBadge({ category }: { category: VehicleCategory }) {
  const config = CATEGORY_CONFIG[category]
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  )
}

function ExpiryBadge({ status, label }: { status: DocumentStatus; label: string }) {
  const config = EXPIRY_CONFIG[status]
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${config.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
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
// Add Vehicle Modal — imported from shared component
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Bulk Upload Modal
// ---------------------------------------------------------------------------

function BulkUploadModal({
  isOpen,
  onClose,
  onUpload,
  onDownloadSample,
}: {
  isOpen: boolean
  onClose: () => void
  onUpload?: () => void
  onDownloadSample?: () => void
}) {
  const [dragOver, setDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!isOpen) return null

  function handleDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file && isValidFile(file)) {
      setSelectedFile(file)
    }
  }

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file && isValidFile(file)) {
      setSelectedFile(file)
    }
  }

  function isValidFile(file: File): boolean {
    const validTypes = [
      'text/csv',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ]
    const validExtensions = ['.csv', '.xls', '.xlsx']
    const ext = file.name.substring(file.name.lastIndexOf('.')).toLowerCase()
    return validTypes.includes(file.type) || validExtensions.includes(ext)
  }

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  function handleUpload() {
    if (selectedFile) {
      onUpload?.()
      setSelectedFile(null)
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70"
        onClick={() => { setSelectedFile(null); onClose() }}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg mx-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800">
          <div>
            <h2 className="text-base font-semibold text-stone-900 dark:text-stone-50">
              Bulk Upload Vehicles
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Import multiple vehicles from a spreadsheet
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDownloadSample?.()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-medium text-stone-600 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-600 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download Sample
            </button>
            <button
              onClick={() => { setSelectedFile(null); onClose() }}
              className="p-2 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {/* Drop Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
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
              accept=".csv,.xls,.xlsx"
              onChange={handleFileSelect}
              className="hidden"
            />

            {selectedFile ? (
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
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
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                  <FileSpreadsheet className="w-6 h-6 text-stone-400 dark:text-stone-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                    Drop your file here, or <span className="text-emerald-600 dark:text-emerald-400">browse</span>
                  </p>
                  <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                    Supports CSV, XLS, and XLSX files
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Format Info */}
          <div className="mt-4 p-3 bg-stone-50 dark:bg-stone-800/50 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-stone-400 dark:text-stone-500 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-stone-500 dark:text-stone-400">
                <p className="font-medium text-stone-600 dark:text-stone-300 mb-1">Required columns</p>
                <p>RC Number, Vehicle Type, Make, Model, Year, Category, Insurance Expiry, PUC Expiry</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-stone-100 dark:border-stone-800">
          <button
            onClick={() => { setSelectedFile(null); onClose() }}
            className="px-4 py-2 rounded-lg text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!selectedFile}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm ${
              selectedFile
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-stone-500 cursor-not-allowed'
            }`}
          >
            <Upload className="w-4 h-4" />
            Upload & Import
          </button>
        </div>
      </div>
    </div>
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
  const [activeTab, setActiveTab] = useState<'vehicles' | 'drivers'>(() => {
    const params = new URLSearchParams(window.location.search)
    const tab = params.get('tab')
    return tab === 'drivers' ? 'drivers' : 'vehicles'
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [showBulkUpload, setShowBulkUpload] = useState(false)
  const [showAddVehicle, setShowAddVehicle] = useState(false)
  const [showAddDriver, setShowAddDriver] = useState(false)
  const [categoryFilter, setCategoryFilter] = useState<VehicleCategory | 'all'>('all')
  const [expiryFilter, setExpiryFilter] = useState<DocumentStatus | 'all'>('all')
  const [statusFilter, setStatusFilter] = useState<VehicleStatus | 'all'>('all')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState<'compliance' | 'rcNumber' | 'expiry'>('compliance')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdownId(null)
      }
    }
    if (openDropdownId) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [openDropdownId])

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

    if (categoryFilter !== 'all') {
      result = result.filter((v) => v.category === categoryFilter)
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
  }, [vehicles, drivers, searchQuery, categoryFilter, expiryFilter, statusFilter, sortBy, sortDir])

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

  const activeFilterCount =
    (categoryFilter !== 'all' ? 1 : 0) +
    (expiryFilter !== 'all' ? 1 : 0) +
    (statusFilter !== 'all' ? 1 : 0)

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-10">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              Vehicles & Drivers
            </h1>
            <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
              Central repository of all vehicles and assigned drivers
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowBulkUpload(true)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm font-medium text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-600 transition-colors"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Bulk Upload</span>
            </button>
            <button
              onClick={() => setShowAddDriver(true)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm font-medium text-stone-700 dark:text-stone-300 hover:border-stone-300 dark:hover:border-stone-600 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Driver</span>
            </button>
            <button
              onClick={() => setShowAddVehicle(true)}
              className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Add Vehicle
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4">
            <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
              Total Vehicles
            </p>
            <p className="mt-1 text-2xl font-bold text-stone-900 dark:text-stone-50 tabular-nums">
              {stats.total}
            </p>
            <p className="mt-0.5 text-xs text-stone-400 dark:text-stone-500">
              {stats.active} active
            </p>
          </div>
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-4">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                Avg. Compliance
              </p>
            </div>
            <p className={`mt-1 text-2xl font-bold tabular-nums ${getComplianceColor(stats.avgCompliance).text}`}>
              {stats.avgCompliance}%
            </p>
          </div>
          <div className="bg-white dark:bg-stone-900 border border-red-200 dark:border-red-900/40 rounded-xl p-4">
            <p className="text-xs font-medium text-red-600 dark:text-red-400 uppercase tracking-wider">
              Expired Docs
            </p>
            <p className="mt-1 text-2xl font-bold text-stone-900 dark:text-stone-50 tabular-nums">
              {stats.expiredCount}
            </p>
            <p className="mt-0.5 text-xs text-stone-400 dark:text-stone-500">
              vehicles need attention
            </p>
          </div>
          <div className="bg-white dark:bg-stone-900 border border-amber-200 dark:border-amber-900/40 rounded-xl p-4">
            <p className="text-xs font-medium text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Expiring Soon
            </p>
            <p className="mt-1 text-2xl font-bold text-stone-900 dark:text-stone-50 tabular-nums">
              {stats.expiringCount}
            </p>
            <p className="mt-0.5 text-xs text-stone-400 dark:text-stone-500">
              upcoming renewals
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-900 rounded-lg w-fit mb-5">
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'vehicles'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-50 shadow-sm'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
            }`}
          >
            <Truck className="w-4 h-4" />
            Vehicles
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
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'drivers'
                ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-50 shadow-sm'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
            }`}
          >
            <Users className="w-4 h-4" />
            Drivers
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
                    ? 'Search by RC number, make, model, driver...'
                    : 'Search by name, license number, phone...'
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
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                    showFilters || activeFilterCount > 0
                      ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'
                      : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:border-stone-300 dark:hover:border-stone-600'
                  }`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="hidden sm:inline">Filters</span>
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
                    <option value="compliance-desc">Compliance (High)</option>
                    <option value="compliance-asc">Compliance (Low)</option>
                    <option value="rcNumber-asc">RC Number (A-Z)</option>
                    <option value="rcNumber-desc">RC Number (Z-A)</option>
                    <option value="expiry-asc">Expiry (Soonest)</option>
                    <option value="expiry-desc">Expiry (Latest)</option>
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
                  Category
                </label>
                <div className="relative">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value as VehicleCategory | 'all')}
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  >
                    <option value="all">All categories</option>
                    <option value="owned">Owned</option>
                    <option value="leased">Leased</option>
                    <option value="rented">Rented</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Document Status
                </label>
                <div className="relative">
                  <select
                    value={expiryFilter}
                    onChange={(e) => setExpiryFilter(e.target.value as DocumentStatus | 'all')}
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  >
                    <option value="all">All statuses</option>
                    <option value="valid">Valid</option>
                    <option value="expiring-soon">Expiring Soon</option>
                    <option value="expired">Expired</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as VehicleStatus | 'all')}
                    className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  >
                    <option value="all">All</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                </div>
              </div>

              {activeFilterCount > 0 && (
                <button
                  onClick={() => {
                    setCategoryFilter('all')
                    setExpiryFilter('all')
                    setStatusFilter('all')
                  }}
                  className="px-3 py-2 text-xs font-medium text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
          )}

          {/* Active Filter Pills */}
          {activeFilterCount > 0 && !showFilters && activeTab === 'vehicles' && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-400 dark:text-stone-500">Filtered by:</span>
              {categoryFilter !== 'all' && (
                <FilterPill
                  label={CATEGORY_CONFIG[categoryFilter].label}
                  onClear={() => setCategoryFilter('all')}
                />
              )}
              {expiryFilter !== 'all' && (
                <FilterPill
                  label={EXPIRY_CONFIG[expiryFilter].label}
                  onClear={() => setExpiryFilter('all')}
                />
              )}
              {statusFilter !== 'all' && (
                <FilterPill
                  label={statusFilter === 'active' ? 'Active' : 'Inactive'}
                  onClear={() => setStatusFilter('all')}
                />
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-3 text-xs text-stone-400 dark:text-stone-500">
          {activeTab === 'vehicles'
            ? `${filteredVehicles.length} of ${vehicles.length} vehicles`
            : `${filteredDrivers.length} of ${drivers.length} drivers`}
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
                  <tr className="border-b border-stone-100 dark:border-stone-800">
                    <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                      Vehicle
                    </th>
                    <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                      Category
                    </th>
                    <th className="text-center text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                      Compliance
                    </th>
                    <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                      Insurance
                    </th>
                    <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                      PUC
                    </th>
                    <th className="text-right text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
                  {filteredVehicles.map((vehicle) => {
                    const driver = resolveDriver(vehicle.assignedDriverId, drivers)
                    const insuranceDoc = vehicle.documents.find((d) => d.type === 'insurance')
                    const pucDoc = vehicle.documents.find((d) => d.type === 'puc')

                    return (
                      <tr
                        key={vehicle.id}
                        onClick={() => onViewVehicle?.(vehicle.id)}
                        className="group cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors"
                      >
                        {/* Vehicle Info */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                              vehicle.status === 'active'
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                                : 'bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500'
                            }`}>
                              <Truck className="w-4.5 h-4.5" />
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-stone-900 dark:text-stone-50 font-mono tracking-tight">
                                {vehicle.rcNumber}
                              </p>
                              <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                                {vehicle.make} {vehicle.model} · {vehicle.year}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-5 py-4">
                          <CategoryBadge category={vehicle.category} />
                        </td>

                        {/* Compliance Score */}
                        <td className="px-5 py-4 text-center">
                          <ComplianceScoreBadge score={vehicle.complianceScore} />
                        </td>

                        {/* Insurance Expiry */}
                        <td className="px-5 py-4">
                          {insuranceDoc && (
                            <div>
                              <ExpiryBadge status={insuranceDoc.status} label={formatDate(insuranceDoc.expiry)} />
                            </div>
                          )}
                        </td>

                        {/* PUC Expiry */}
                        <td className="px-5 py-4">
                          {pucDoc && (
                            <div>
                              <ExpiryBadge status={pucDoc.status} label={formatDate(pucDoc.expiry)} />
                            </div>
                          )}
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
                              className="p-1.5 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
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
                                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-colors"
                                >
                                  <Eye className="w-4 h-4" />
                                  View Details
                                </button>
                                <button
                                  onClick={() => {
                                    onEditVehicle?.(vehicle.id)
                                    setOpenDropdownId(null)
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-colors"
                                >
                                  <Pencil className="w-4 h-4" />
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    onDeleteVehicle?.(vehicle.id)
                                    setOpenDropdownId(null)
                                  }}
                                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-sm text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors"
                                >
                                  <Ban className="w-4 h-4" />
                                  Deactivate
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
                    No vehicles found
                  </p>
                  <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {filteredVehicles.map((vehicle) => {
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
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          vehicle.status === 'active'
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                            : 'bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500'
                        }`}>
                          <Truck className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-stone-900 dark:text-stone-50 font-mono tracking-tight">
                            {vehicle.rcNumber}
                          </p>
                          <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                            {vehicle.make} {vehicle.model}
                          </p>
                        </div>
                      </div>
                      <ComplianceScoreBadge score={vehicle.complianceScore} />
                    </div>

                    {/* Tags */}
                    <div className="flex items-center gap-2 mb-3">
                      <CategoryBadge category={vehicle.category} />
                      <span className="text-xs text-stone-400 dark:text-stone-500">
                        {vehicle.vehicleType}
                      </span>
                      {vehicle.status === 'inactive' && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400">
                          Inactive
                        </span>
                      )}
                    </div>

                    {/* Expiry Info */}
                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-stone-400 dark:text-stone-500">Insurance</span>
                        {insuranceDoc && <ExpiryBadge status={insuranceDoc.status} label={formatDate(insuranceDoc.expiry)} />}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-stone-400 dark:text-stone-500">PUC</span>
                        {pucDoc && <ExpiryBadge status={pucDoc.status} label={formatDate(pucDoc.expiry)} />}
                      </div>
                    </div>

                    {/* Bottom: Arrow */}
                    <div className="flex items-center justify-end pt-3 border-t border-stone-100 dark:border-stone-800">
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
                  <p className="text-sm font-medium text-stone-600 dark:text-stone-400">No vehicles found</p>
                  <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
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
                  <tr className="border-b border-stone-100 dark:border-stone-800">
                    <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                      Driver
                    </th>
                    <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                      License Number
                    </th>
                    <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                      License Expiry
                    </th>
                    <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3.5">
                      Assigned Vehicles
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
                  {filteredDrivers.map((driver) => {
                    const assignedVehicles = vehicles.filter((v) =>
                      driver.assignedVehicleIds.includes(v.id)
                    )
                    const licenseExpiry = EXPIRY_CONFIG[driver.licenseStatus]

                    return (
                      <tr
                        key={driver.id}
                        className="hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors"
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
                              <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
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
                          <ExpiryBadge status={driver.licenseStatus} label={formatDate(driver.licenseExpiry)} />
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
                            <span className="text-xs text-stone-400 dark:text-stone-500 italic">
                              No vehicles assigned
                            </span>
                          )}
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
                  <p className="text-sm font-medium text-stone-600 dark:text-stone-400">No drivers found</p>
                  <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">Try adjusting your search</p>
                </div>
              )}
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-3">
              {filteredDrivers.map((driver) => {
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
                          <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">{driver.phone}</p>
                        </div>
                      </div>
                      <ExpiryBadge status={driver.licenseStatus} label={driver.licenseStatus === 'valid' ? 'Valid' : driver.licenseStatus === 'expiring-soon' ? 'Expiring' : 'Expired'} />
                    </div>

                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-stone-400 dark:text-stone-500">License</span>
                        <span className="text-xs font-mono text-stone-700 dark:text-stone-300">{driver.licenseNumber}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-stone-400 dark:text-stone-500">Expires</span>
                        <span className="text-xs text-stone-700 dark:text-stone-300">{formatDate(driver.licenseExpiry)}</span>
                      </div>
                    </div>

                    {assignedVehicles.length > 0 && (
                      <div className="pt-3 border-t border-stone-100 dark:border-stone-800">
                        <p className="text-xs text-stone-400 dark:text-stone-500 mb-1.5">Assigned Vehicles</p>
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
                  <p className="text-sm font-medium text-stone-600 dark:text-stone-400">No drivers found</p>
                  <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">Try adjusting your search</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* Add Vehicle Modal */}
        <AddVehicleModal
          isOpen={showAddVehicle}
          onClose={() => setShowAddVehicle(false)}
          onAdd={() => onAddVehicle?.()}
          drivers={drivers}
        />

        {/* Bulk Upload Modal */}
        <BulkUploadModal
          isOpen={showBulkUpload}
          onClose={() => setShowBulkUpload(false)}
          onUpload={() => onBulkUpload?.()}
          onDownloadSample={() => console.log('Download sample template')}
        />

        {/* Add Driver Modal */}
        <AddDriverModal
          isOpen={showAddDriver}
          onClose={() => setShowAddDriver(false)}
        />
      </div>
    </div>
  )
}
