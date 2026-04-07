import { useState } from 'react'
import { createPortal } from 'react-dom'
import { X, Wallet, CheckCircle2 } from 'lucide-react'

interface TopUpModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit?: (amount: number) => void
}

const PRESET_AMOUNTS = [500, 1000, 2000, 5000]

export function TopUpModal({ isOpen, onClose, onSubmit }: TopUpModalProps) {
  const [amount, setAmount] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const value = Number(amount)
    if (!value || value <= 0) return
    onSubmit?.(value)
    setSubmitted(true)
    setTimeout(() => {
      setAmount('')
      setSubmitted(false)
      onClose()
    }, 1800)
  }

  function handlePreset(value: number) {
    setAmount(String(value))
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 dark:bg-black/50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl shadow-stone-300/30 dark:shadow-stone-950/50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
              <Wallet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-stone-900 dark:text-stone-50">
              Top-up Balance
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-10 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-sm font-medium text-stone-900 dark:text-stone-50">Payment successful!</p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              Your balance has been updated.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="px-6 py-5 space-y-4">
              {/* Current Balance */}
              <div className="flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-800/60 rounded-xl border border-stone-200 dark:border-stone-700">
                <span className="text-sm text-stone-500 dark:text-stone-400">Current Balance</span>
                <span className="text-sm font-bold text-stone-900 dark:text-stone-50 tabular-nums">1,753 credits</span>
              </div>

              {/* Amount Input */}
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Enter amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-stone-400 dark:text-stone-500">
                    &#8377;
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    min="1"
                    className="w-full pl-8 pr-4 py-3 text-sm bg-white dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors tabular-nums [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    autoFocus
                  />
                </div>
              </div>

              {/* Preset Amounts */}
              <div className="flex items-center gap-2">
                {PRESET_AMOUNTS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handlePreset(preset)}
                    className={`flex-1 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                      amount === String(preset)
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-400'
                        : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:border-stone-300 dark:hover:border-stone-600'
                    }`}
                  >
                    &#8377;{preset.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-stone-200 dark:border-stone-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!amount || Number(amount) <= 0}
                className="px-5 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Add Money
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  )
}
