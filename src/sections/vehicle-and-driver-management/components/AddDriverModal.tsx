import { useState } from 'react'
import {
  X,
  UserPlus,
} from 'lucide-react'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'

const translations: Record<Language, Record<string, string>> = {
  en: {
    addDriver: 'Add Driver',
    subtitle: 'Enter driver details and assign to a vehicle',
    fullName: 'Full Name',
    fullNamePlaceholder: 'e.g. Rajesh Kumar',
    phoneNumber: 'Phone Number',
    phonePlaceholder: '918976543210',
    licenseNumber: 'License Number',
    licensePlaceholder: 'DL-1420110012345',
    licenseExpiry: 'License Expiry',
    cancel: 'Cancel',
  },
  hi: {
    addDriver: 'ड्राइवर जोड़ें',
    subtitle: 'ड्राइवर की जानकारी दर्ज करें और वाहन नियुक्त करें',
    fullName: 'पूरा नाम',
    fullNamePlaceholder: 'उदा. राजेश कुमार',
    phoneNumber: 'फ़ोन नंबर',
    phonePlaceholder: '918976543210',
    licenseNumber: 'लाइसेंस नंबर',
    licensePlaceholder: 'DL-1420110012345',
    licenseExpiry: 'लाइसेंस समाप्ति',
    cancel: 'रद्द करें',
  },
}

export interface AddDriverModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd?: () => void
}

export function AddDriverModal({
  isOpen,
  onClose,
  onAdd,
}: AddDriverModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [licenseExpiry, setLicenseExpiry] = useState('')
  const { language } = useLanguage()
  const t = translations[language]

  if (!isOpen) return null

  function handleAdd() {
    onAdd?.()
    handleClose()
  }

  function handleClose() {
    setName('')
    setPhone('')
    setLicenseNumber('')
    setLicenseExpiry('')
    onClose()
  }

  function handlePhoneChange(value: string) {
    const cleaned = value.replace(/[^0-9]/g, '')
    setPhone(cleaned)
  }

  function handleLicenseChange(value: string) {
    const formatted = value.toUpperCase().replace(/[^A-Z0-9\-]/g, '')
    setLicenseNumber(formatted)
  }

  const isValid = name.trim().length >= 2 && phone.trim().length >= 10 && licenseNumber.trim().length >= 6

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70" onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center">
              <UserPlus className="w-4.5 h-4.5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-50">
                {t.addDriver}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {t.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-3 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
              {t.fullName}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.fullNamePlaceholder}
              className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
              {t.phoneNumber}
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => handlePhoneChange(e.target.value)}
              placeholder={t.phonePlaceholder}
              className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
            />
          </div>

          {/* License Number & Expiry */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                {t.licenseNumber}
              </label>
              <input
                type="text"
                value={licenseNumber}
                onChange={(e) => handleLicenseChange(e.target.value)}
                placeholder={t.licensePlaceholder}
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-mono text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors tracking-wider"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                {t.licenseExpiry}
              </label>
              <input
                type="date"
                value={licenseExpiry}
                onChange={(e) => setLicenseExpiry(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
              />
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
            onClick={handleAdd}
            disabled={!isValid}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm ${
              isValid
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-stone-500 cursor-not-allowed'
            }`}
          >
            {t.addDriver}
          </button>
        </div>
      </div>
    </div>
  )
}
