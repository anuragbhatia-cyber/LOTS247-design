import { useState, useEffect, useRef } from 'react'
import { X, Search, Loader2 } from 'lucide-react'

export interface VehicleComplianceCheckProps {
  open: boolean
  onClose: () => void
  onShowResults?: (vehicleNumber: string) => void
}

export function VehicleComplianceCheck({ open, onClose, onShowResults }: VehicleComplianceCheckProps) {
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [step, setStep] = useState<'form' | 'loading'>('form')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open && step === 'form') {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open, step])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open && step === 'form') handleClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open, step])

  if (!open) return null

  function handleVehicleNumberChange(value: string) {
    const cleaned = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 10)
    setVehicleNumber(cleaned)
  }

  const isValid = vehicleNumber.length >= 6

  function handleSubmit() {
    if (!isValid) return
    setStep('loading')
    const vn = vehicleNumber
    setTimeout(() => {
      setVehicleNumber('')
      setStep('form')
      onClose()
      onShowResults?.(vn)
    }, 1500)
  }

  function handleClose() {
    setVehicleNumber('')
    setStep('form')
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70" onClick={step === 'form' ? handleClose : undefined} />

      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl my-auto">
        {step === 'form' ? (
          <>
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
              <div>
                <h2 className="text-base font-bold text-stone-900 dark:text-stone-50">Check Vehicle-wise Compliance</h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">Enter a vehicle registration number to check its compliance status</p>
              </div>
              <button onClick={handleClose} className="p-3 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-5">
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">Vehicle Number</label>
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) => handleVehicleNumberChange(e.target.value)}
                  placeholder="Enter vehicle number"
                  maxLength={10}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit() }}
                  className="w-full px-3.5 pr-9 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
              </div>
            </div>
            <div className="flex items-center justify-end px-6 py-4 border-t border-stone-200 dark:border-stone-800">
              <button
                onClick={handleSubmit}
                disabled={!isValid}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm ${
                  isValid
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-stone-500 cursor-not-allowed'
                }`}
              >
                Check Compliance Status
              </button>
            </div>
          </>
        ) : (
          <div className="px-6 py-16 flex flex-col items-center text-center">
            <Loader2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 animate-spin mb-5" />
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-50 mb-1.5">
              Checking Compliance...
            </h2>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Looking up compliance status for{' '}
              <span className="font-mono font-semibold text-stone-700 dark:text-stone-200">{vehicleNumber}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
