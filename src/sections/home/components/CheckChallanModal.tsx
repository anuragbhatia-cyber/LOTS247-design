import { useState, useEffect, useRef } from 'react'
import { X, Search, Loader2 } from 'lucide-react'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'

const translations: Record<Language, Record<string, string>> = {
  en: {
    title: 'Check Challan',
    subtitle: 'Enter a vehicle registration number to look up pending challans',
    label: 'Vehicle Number',
    placeholder: 'UP32MM1113',
    checkButton: 'Check Challan Status',
    checking: 'Checking Challans...',
    checkingDesc: 'Looking up Parivahan and government databases for',
  },
  hi: {
    title: 'चालान जाँचें',
    subtitle: 'लंबित चालान देखने के लिए वाहन पंजीकरण नंबर दर्ज करें',
    label: 'वाहन नंबर',
    placeholder: 'UP32MM1113',
    checkButton: 'चालान स्थिति जाँचें',
    checking: 'चालान जाँच रहे हैं...',
    checkingDesc: 'परिवहन और सरकारी डेटाबेस में खोज रहे हैं',
  },
}

export interface CheckChallanModalProps {
  isOpen: boolean
  onClose: () => void
  onCheck?: (vehicleNumber: string) => void
  onShowResults?: (vehicleNumber: string) => void
}

export function CheckChallanModal({ isOpen, onClose, onCheck, onShowResults }: CheckChallanModalProps) {
  const { language } = useLanguage()
  const t = translations[language]
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [step, setStep] = useState<'form' | 'loading'>('form')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && step === 'form') {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, step])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && step === 'form') handleClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose, isOpen, step])

  if (!isOpen) return null

  function handleVehicleNumberChange(value: string) {
    const cleaned = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 10)
    setVehicleNumber(cleaned)
  }

  const isValid = vehicleNumber.length >= 6

  function handleSubmit() {
    if (!isValid) return
    onCheck?.(vehicleNumber)
    setStep('loading')
    const vn = vehicleNumber
    setTimeout(() => {
      setVehicleNumber('')
      setStep('form')
      onClose()
      onShowResults?.(vn)
    }, 2500)
  }

  function handleClose() {
    setVehicleNumber('')
    setStep('form')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4">
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70" onClick={step === 'form' ? handleClose : undefined} />

      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl my-auto">
        {step === 'form' ? (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800">
              <div>
                <h2 className="text-base font-bold text-stone-900 dark:text-stone-50">{t.title}</h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">{t.subtitle}</p>
              </div>
              <button onClick={handleClose} className="p-3 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-5">
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">{t.label}</label>
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) => handleVehicleNumberChange(e.target.value)}
                  placeholder={t.placeholder}
                  maxLength={10}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }}
                  className="w-full px-3.5 pr-9 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-mono text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors tracking-wider"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex items-center justify-end px-6 py-4 border-t border-stone-100 dark:border-stone-800">
              <button
                onClick={handleSubmit}
                disabled={!isValid}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm ${
                  isValid
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-stone-500 cursor-not-allowed'
                }`}
              >
                {t.checkButton}
              </button>
            </div>
          </>
        ) : (
          <div className="px-6 py-16 flex flex-col items-center text-center">
            <Loader2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 animate-spin mb-5" />
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-50 mb-1.5">
              {t.checking}
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              {t.checkingDesc}{' '}
              <span className="font-mono font-semibold text-stone-700 dark:text-stone-200">{vehicleNumber}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
