import { useState } from 'react'
import {
  X,
  CheckCircle2,
} from 'lucide-react'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'

const translations: Record<Language, Record<string, string>> = {
  en: {
    addVehicle: 'Add Vehicle',
    enterVehicleDetails: 'Enter vehicle details to register',
    vehicleNumber: 'Vehicle Number',
    vehicleNumberPlaceholder: 'UP32MM1113',
    cancel: 'Cancel',
    vehicleAdded: 'Vehicle Added',
    vehicleAddedDesc: 'has been successfully added to your fleet.',
    done: 'Done',
  },
  hi: {
    addVehicle: 'वाहन जोड़ें',
    enterVehicleDetails: 'पंजीकरण के लिए वाहन विवरण दर्ज करें',
    vehicleNumber: 'वाहन नंबर',
    vehicleNumberPlaceholder: 'उदा. UP32MM1113',
    cancel: 'रद्द करें',
    vehicleAdded: 'वाहन जोड़ा गया',
    vehicleAddedDesc: 'आपके बेड़े में सफलतापूर्वक जोड़ दिया गया है।',
    done: 'हो गया',
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
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [showSuccess, setShowSuccess] = useState(false)
  const [addedVehicle, setAddedVehicle] = useState('')
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
    onClose()
  }

  function handleVehicleNumberChange(value: string) {
    const cleaned = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 10)
    setVehicleNumber(cleaned)
  }

  const isValid = vehicleNumber.length >= 6

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4">
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
                className="absolute top-3 right-3 p-2 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
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
            <div className="flex items-center justify-center px-6 py-4 border-t border-stone-100 dark:border-stone-800">
              <button
                onClick={handleClose}
                className="px-6 py-2 rounded-lg text-sm font-medium bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm"
              >
                {t.done}
              </button>
            </div>
          </>
        ) : (
          /* Form State */
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800">
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
                className="p-3 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-5">
              {/* Vehicle Number Input */}
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
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-stone-100 dark:border-stone-800">
              <button
                onClick={handleClose}
                className="px-4 py-2 rounded-lg text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleAdd}
                disabled={!isValid}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm ${
                  isValid
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-stone-500 cursor-not-allowed'
                }`}
              >
                {t.addVehicle}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
