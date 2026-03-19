import { useState } from 'react'
import { X, Send } from 'lucide-react'

interface ContactModalProps {
  apiName: string
  isOpen: boolean
  onClose: () => void
  onSubmit?: (message: string) => void
}

export function ContactModal({ apiName, isOpen, onClose, onSubmit }: ContactModalProps) {
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if (!isOpen) return null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim()) return
    onSubmit?.(message)
    setSubmitted(true)
    setTimeout(() => {
      setMessage('')
      setSubmitted(false)
      onClose()
    }, 1800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-2xl shadow-stone-300/30 dark:shadow-stone-950/50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800">
          <h3 className="text-base font-semibold text-stone-900 dark:text-stone-50">
            Contact for Pricing
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-10 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center">
              <Send className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-sm font-medium text-stone-900 dark:text-stone-50">Enquiry sent!</p>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              We'll get back to you about {apiName} pricing shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="px-6 py-5">
              <p className="text-sm text-stone-500 dark:text-stone-400 mb-3">
                Interested in <span className="font-medium text-stone-700 dark:text-stone-300">{apiName}</span>? Tell us about your use case and we'll share pricing details.
              </p>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your use case, expected volume, or any questions..."
                rows={4}
                className="w-full px-4 py-3 text-sm bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-400 dark:focus:border-emerald-600 resize-none transition-colors"
                autoFocus
              />
            </div>

            <div className="px-6 py-4 border-t border-stone-100 dark:border-stone-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!message.trim()}
                className="px-5 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Send Enquiry
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
