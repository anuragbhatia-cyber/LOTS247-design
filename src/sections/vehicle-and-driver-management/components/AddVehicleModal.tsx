import { useState, useRef } from 'react'
import {
  X,
  CheckCircle2,
  Truck,
  Upload,
  Download,
  FileSpreadsheet,
  AlertCircle,
} from 'lucide-react'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'

const translations: Record<Language, Record<string, string>> = {
  en: {
    addVehicle: 'Add Vehicle',
    enterVehicleDetails: 'Register a new vehicle or import in bulk',
    singleVehicle: 'Single Vehicle',
    bulkUpload: 'Bulk Upload',
    vehicleNumber: 'Vehicle Number',
    vehicleNumberPlaceholder: 'UP32MM1113',
    cancel: 'Cancel',
    vehicleAdded: 'Vehicle Added',
    vehicleAddedDesc: 'has been successfully added to your fleet.',
    done: 'Done',
    // Bulk upload
    downloadSample: 'Download Sample',
    dropFileHere: 'Drop your file here, or',
    browse: 'browse',
    supportedFormats: 'Supports CSV, XLS, and XLSX files',
    removeFile: 'Remove file',
    requiredColumns: 'Required columns',
    requiredColumnsList: 'RC Number, Vehicle Type, Make, Model, Year, Category, Insurance Expiry, PUC Expiry',
    uploadAndImport: 'Upload & Import',
  },
  hi: {
    addVehicle: 'वाहन जोड़ें',
    enterVehicleDetails: 'नया वाहन पंजीकृत करें या बल्क में आयात करें',
    singleVehicle: 'एकल वाहन',
    bulkUpload: 'बल्क अपलोड',
    vehicleNumber: 'वाहन नंबर',
    vehicleNumberPlaceholder: 'उदा. UP32MM1113',
    cancel: 'रद्द करें',
    vehicleAdded: 'वाहन जोड़ा गया',
    vehicleAddedDesc: 'आपके बेड़े में सफलतापूर्वक जोड़ दिया गया है।',
    done: 'हो गया',
    // Bulk upload
    downloadSample: 'नमूना डाउनलोड करें',
    dropFileHere: 'अपनी फ़ाइल यहाँ छोड़ें, या',
    browse: 'ब्राउज़ करें',
    supportedFormats: 'CSV, XLS और XLSX फ़ाइलें समर्थित हैं',
    removeFile: 'फ़ाइल हटाएँ',
    requiredColumns: 'आवश्यक कॉलम',
    requiredColumnsList: 'RC नंबर, वाहन प्रकार, मेक, मॉडल, वर्ष, श्रेणी, बीमा समाप्ति, PUC समाप्ति',
    uploadAndImport: 'अपलोड और आयात',
  },
}

export interface AddVehicleModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd?: () => void
}

export function AddVehicleModal({
  isOpen,
  onClose,
  onAdd,
}: AddVehicleModalProps) {
  const [activeTab, setActiveTab] = useState<'single' | 'bulk'>('single')
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [addedVehicle, setAddedVehicle] = useState('')
  const [dragOver, setDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { language } = useLanguage()
  const t = translations[language]

  if (!isOpen) return null

  function handleAdd() {
    setAddedVehicle(vehicleNumber)
    setShowSuccess(true)
    onAdd?.()
  }

  function handleClose() {
    setVehicleNumber('')
    setShowSuccess(false)
    setAddedVehicle('')
    setSelectedFile(null)
    setActiveTab('single')
    onClose()
  }

  function handleVehicleNumberChange(value: string) {
    const cleaned = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 10)
    setVehicleNumber(cleaned)
  }

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
      onAdd?.()
      setSelectedFile(null)
      handleClose()
    }
  }

  const isValid = vehicleNumber.length >= 6

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70" onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl my-auto">
        {showSuccess ? (
          /* Success State */
          <>
            <div className="relative px-6 py-10 flex flex-col items-center text-center">
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 p-2 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-50">
                {t.vehicleAdded}
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1.5">
                <span className="font-mono font-semibold text-stone-700 dark:text-stone-200">{addedVehicle}</span>{' '}
                {t.vehicleAddedDesc}
              </p>
            </div>
            <div className="flex items-center justify-center px-6 py-4 border-t border-stone-200 dark:border-stone-800">
              <button
                onClick={handleClose}
                className="px-6 py-2 rounded-xl text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm"
              >
                {t.done}
              </button>
            </div>
          </>
        ) : (
          /* Form State */
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
              <div>
                <h2 className="text-base font-bold text-stone-900 dark:text-stone-50">
                  {t.addVehicle}
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {t.enterVehicleDetails}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-3 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Switcher */}
            <div className="px-6 pt-4">
              <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-800 rounded-lg">
                <button
                  onClick={() => setActiveTab('single')}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'single'
                      ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-50 shadow-sm'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  {t.singleVehicle}
                </button>
                <button
                  onClick={() => setActiveTab('bulk')}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === 'bulk'
                      ? 'bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-50 shadow-sm'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                  }`}
                >
                  <Upload className="w-4 h-4" />
                  {t.bulkUpload}
                </button>
              </div>
            </div>

            {/* Body */}
            {activeTab === 'single' ? (
              <>
                <div className="px-6 py-5 space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                      {t.vehicleNumber}
                    </label>
                    <input
                      type="text"
                      value={vehicleNumber}
                      onChange={(e) => handleVehicleNumberChange(e.target.value)}
                      placeholder={t.vehicleNumberPlaceholder}
                      maxLength={10}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-mono text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors tracking-wider"
                    />
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
                    onClick={handleAdd}
                    disabled={!isValid}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm ${
                      isValid
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-stone-500 cursor-not-allowed'
                    }`}
                  >
                    {t.addVehicle}
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="px-6 py-5">
                  {/* Download Sample */}
                  <div className="flex items-center justify-end mb-3">
                    <button
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-100 hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:border-stone-600 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      {t.downloadSample}
                    </button>
                  </div>

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
                          className="text-xs text-stone-500 dark:text-stone-400 hover:text-red-600 dark:hover:text-red-400 transition-colors min-h-11 inline-flex items-center"
                        >
                          {t.removeFile}
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                          <FileSpreadsheet className="w-6 h-6 text-stone-400 dark:text-stone-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                            {t.dropFileHere} <span className="text-emerald-600 dark:text-emerald-400">{t.browse}</span>
                          </p>
                          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                            {t.supportedFormats}
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
                        <p className="font-medium text-stone-600 dark:text-stone-300 mb-1">{t.requiredColumns}</p>
                        <p>{t.requiredColumnsList}</p>
                      </div>
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
                    disabled={!selectedFile}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm ${
                      selectedFile
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-stone-500 cursor-not-allowed'
                    }`}
                  >
                    <Upload className="w-4 h-4" />
                    {t.uploadAndImport}
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}
