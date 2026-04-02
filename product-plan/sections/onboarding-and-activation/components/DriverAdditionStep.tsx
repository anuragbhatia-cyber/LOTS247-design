import { useState } from 'react'
import type { DriverDetailsForm } from '../types'


interface DriverAdditionStepProps {
  /** List of vehicles to assign driver to */
  availableVehicles: Array<{ id: string; name: string }>
  /** Called when user adds driver */
  onAddDriver?: (driver: DriverDetailsForm) => void
  /** Called when user goes back */
  onBack?: () => void
  /** Called when user skips this step */
  onSkip?: () => void
  /** Validation error message */
  error?: string
  /** Whether submitting */
  isSubmitting?: boolean
}

export function DriverAdditionStep({
  availableVehicles,
  onAddDriver,
  onBack,
  onSkip,
  error,
  isSubmitting = false,
}: DriverAdditionStepProps) {
  const [formData, setFormData] = useState<Partial<DriverDetailsForm>>({
    driverName: '',
    driverId: '',
    licenseNumber: '',
    assignedVehicleId: availableVehicles[0]?.id || '',
    licenseExpiryDate: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const formatLicenseNumber = (value: string) => {
    return value.toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 20)
  }

  const handleLicenseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      licenseNumber: formatLicenseNumber(e.target.value),
    }))
  }

  const handleSubmit = () => {
    if (formData.driverName && formData.licenseNumber) {
      onAddDriver?.({
        driverName: formData.driverName || '',
        driverId: formData.driverId || `DRV-${Date.now()}`,
        licenseNumber: formData.licenseNumber || '',
        assignedVehicleId: formData.assignedVehicleId || '',
        licenseExpiryDate: formData.licenseExpiryDate || '',
      })
    }
  }

  const isValid = formData.driverName

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[30%] bg-white dark:bg-stone-900 flex-col relative border-r border-stone-200 dark:border-stone-800">
        {/* Logo */}
        <div className="p-8">
          <img
            src="/lots247-logo.png"
            alt="LOTS247 - India's First Road Side Legal Assistance Platform"
            className="h-20 w-auto"
          />
        </div>

        {/* Illustration */}
        <div className="mt-auto flex justify-center px-10 pb-10">
          <img
            src="/truck-illustration.png"
            alt="Truck illustration"
            className="w-full max-w-xs h-auto"
          />
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center bg-stone-100 dark:bg-stone-950 px-6 py-12 lg:py-0">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-10 flex justify-center">
            <img
              src="/lots247-logo.png"
              alt="LOTS247"
              className="h-16 w-auto"
            />
          </div>



          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <button
                onClick={onBack}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                aria-label="Go back"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                Add a driver
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400">
                Optional
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Driver Name */}
            <div>
              <label
                htmlFor="driverName"
                className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2"
              >
                Driver Name <span className="text-red-500">*</span>
              </label>
              <input
                id="driverName"
                name="driverName"
                type="text"
                value={formData.driverName}
                onChange={handleChange}
                placeholder="Enter driver's full name"
                className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                autoFocus
              />
            </div>

            {/* Driver ID (Optional) */}
            <div>
              <label
                htmlFor="driverId"
                className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2"
              >
                Driver ID{' '}
                <span className="text-stone-400 dark:text-stone-500 font-normal">
                  (optional)
                </span>
              </label>
              <input
                id="driverId"
                name="driverId"
                type="text"
                value={formData.driverId}
                onChange={handleChange}
                placeholder="e.g., DRV-001"
                className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Assign to Vehicle */}
            {availableVehicles.length > 0 && (
              <div>
                <label
                  htmlFor="assignedVehicleId"
                  className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2"
                >
                  Assign to Vehicle
                </label>
                <select
                  id="assignedVehicleId"
                  name="assignedVehicleId"
                  value={formData.assignedVehicleId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                >
                  {availableVehicles.map((vehicle) => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.name} ({vehicle.id})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <p className="text-sm text-red-500 flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={!isValid || isSubmitting}
              className={`
                w-full py-3.5 rounded-xl font-semibold text-base
                transition-all duration-200
                ${
                  isValid && !isSubmitting
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-500 cursor-not-allowed'
                }
              `}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Adding Driver...
                </span>
              ) : (
                'Continue'
              )}
            </button>

            {/* Skip Link */}
            <button
              onClick={onSkip}
              className="w-full text-center text-sm font-medium text-stone-500 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:underline transition-colors py-2"
            >
              I'll add drivers later →
            </button>
          </div>

          {/* Helper text */}
          <p className="mt-6 text-xs text-stone-400 dark:text-stone-500">
            You can add more drivers from your dashboard after setup
          </p>
        </div>
      </div>
    </div>
  )
}
