import { useState, useRef } from 'react'
import {
  X,
  Download,
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'

const translations: Record<Language, Record<string, string>> = {
  en: {
    bulkUploadVehicles: 'Bulk Upload Vehicles',
    importMultipleVehicles: 'Import multiple vehicles from a spreadsheet',
    downloadSample: 'Download Sample',
    dropFileHere: 'Drop your file here, or',
    browse: 'browse',
    supportedFormats: 'Supports CSV, XLS, and XLSX files',
    removeFile: 'Remove file',
    requiredColumns: 'Required columns',
    requiredColumnsList: 'RC Number, Vehicle Type, Make, Model, Year, Category, Insurance Expiry, PUC Expiry',
    cancel: 'Cancel',
    uploadAndImport: 'Upload & Import',
  },
  hi: {
    bulkUploadVehicles: 'बल्क अपलोड वाहन',
    importMultipleVehicles: 'स्प्रेडशीट से कई वाहन आयात करें',
    downloadSample: 'नमूना डाउनलोड करें',
    dropFileHere: 'अपनी फ़ाइल यहाँ छोड़ें, या',
    browse: 'ब्राउज़ करें',
    supportedFormats: 'CSV, XLS और XLSX फ़ाइलें समर्थित हैं',
    removeFile: 'फ़ाइल हटाएँ',
    requiredColumns: 'आवश्यक कॉलम',
    requiredColumnsList: 'RC नंबर, वाहन प्रकार, मेक, मॉडल, वर्ष, श्रेणी, बीमा समाप्ति, PUC समाप्ति',
    cancel: 'रद्द करें',
    uploadAndImport: 'अपलोड और आयात',
  },
}

export interface BulkUploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload?: () => void
  onDownloadSample?: () => void
}

export function BulkUploadModal({
  isOpen,
  onClose,
  onUpload,
  onDownloadSample,
}: BulkUploadModalProps) {
  const [dragOver, setDragOver] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { language } = useLanguage()
  const t = translations[language]

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70"
        onClick={() => { setSelectedFile(null); onClose() }}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-50">
              {t.bulkUploadVehicles}
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {t.importMultipleVehicles}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDownloadSample?.()}
              className="flex items-center gap-1.5 px-3 py-1.5 min-h-11 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-medium text-stone-600 dark:text-stone-300 hover:bg-stone-100 hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:border-stone-600 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              {t.downloadSample}
            </button>
            <button
              onClick={() => { setSelectedFile(null); onClose() }}
              className="p-3 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
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
            onClick={() => { setSelectedFile(null); onClose() }}
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
                : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400 cursor-not-allowed'
            }`}
          >
            <Upload className="w-4 h-4" />
            {t.uploadAndImport}
          </button>
        </div>
      </div>
    </div>
  )
}
