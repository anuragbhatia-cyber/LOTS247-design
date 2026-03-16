import { useState } from 'react'
import {
  X,
  ChevronDown,
  User,
} from 'lucide-react'

type VehicleCategory = 'owned' | 'leased' | 'rented'

interface Driver {
  id: string
  name: string
  licenseNumber: string
}

export interface AddVehicleModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd?: () => void
  drivers?: Driver[]
}

export function AddVehicleModal({
  isOpen,
  onClose,
  onAdd,
  drivers = [],
}: AddVehicleModalProps) {
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [category, setCategory] = useState<VehicleCategory | ''>('')
  const [selectedDriverId, setSelectedDriverId] = useState<string>('')

  if (!isOpen) return null

  function handleAdd() {
    onAdd?.()
    handleClose()
  }

  function handleClose() {
    setVehicleNumber('')
    setCategory('')
    setSelectedDriverId('')
    onClose()
  }

  function handleVehicleNumberChange(value: string) {
    const cleaned = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
    let formatted = cleaned
    if (cleaned.length > 2) formatted = cleaned.slice(0, 2) + ' ' + cleaned.slice(2)
    if (cleaned.length > 4) formatted = cleaned.slice(0, 2) + ' ' + cleaned.slice(2, 4) + ' ' + cleaned.slice(4)
    if (cleaned.length > 6) formatted = cleaned.slice(0, 2) + ' ' + cleaned.slice(2, 4) + ' ' + cleaned.slice(4, 6) + ' ' + cleaned.slice(6, 10)
    setVehicleNumber(formatted)
  }

  const isValid = vehicleNumber.replace(/\s/g, '').length >= 6 && category !== ''

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
              Add Vehicle
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Enter vehicle details to register
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
          {/* Vehicle Number Input */}
          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
              Vehicle Number
            </label>
            <input
              type="text"
              value={vehicleNumber}
              onChange={(e) => handleVehicleNumberChange(e.target.value)}
              placeholder="MH 12 AB 1234"
              maxLength={13}
              className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-mono text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors tracking-wider"
            />
          </div>

          {/* Vehicle Category Dropdown */}
          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
              Vehicle Category
            </label>
            <div className="relative">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as VehicleCategory)}
                className="w-full appearance-none px-3.5 pr-8 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors cursor-pointer"
              >
                <option value="">Select category</option>
                <option value="owned">Owned</option>
                <option value="leased">Leased</option>
                <option value="rented">Rented</option>
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
            </div>
          </div>

          {/* Assign Driver */}
          <div>
            <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
              Assign Driver
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500" />
              <select
                value={selectedDriverId}
                onChange={(e) => setSelectedDriverId(e.target.value)}
                className="w-full appearance-none pl-9 pr-8 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors cursor-pointer"
              >
                <option value="">No driver assigned</option>
                {drivers.map((d) => (
                  <option key={d.id} value={d.id}>{d.name} — {d.licenseNumber}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
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
            onClick={handleAdd}
            disabled={!isValid}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm ${
              isValid
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                : 'bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-stone-500 cursor-not-allowed'
            }`}
          >
            Add Vehicle
          </button>
        </div>
      </div>
    </div>
  )
}
