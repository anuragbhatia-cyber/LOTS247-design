import { useState } from 'react'
import type { DriverDetailsForm } from '@/../product/sections/onboarding-and-activation/types'


interface DriverAdditionStepProps {
  /** List of vehicles to assign driver to */
  availableVehicles: Array<{ id: string; name: string }>
  /** Called when user adds driver */
  onAddDriver?: (driver: DriverDetailsForm) => void
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

  const isValid = Boolean(formData.driverName?.trim() && formData.licenseNumber && formData.licenseNumber.length >= 8)

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
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                Add a driver
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
                Optional
              </span>
            </div>
            <p className="text-stone-600 dark:text-stone-400 text-sm">
              Drivers help us link incidents to specific licenses. You can skip and add this later.
            </p>
          </div>

          <div className="space-y-4">
            {/* Driver Name */}
            <div>
              <label
                htmlFor="driverName"
                className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2"
              >
                Driver Name <span className="text-red-700">*</span>
              </label>
              <input
                id="driverName"
                name="driverName"
                type="text"
                autoComplete="name"
                maxLength={60}
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
                <span className="text-stone-600 dark:text-stone-400 font-normal">
                  (auto-generated if blank)
                </span>
              </label>
              <input
                id="driverId"
                name="driverId"
                type="text"
                value={formData.driverId}
                onChange={handleChange}
                placeholder="Enter driver ID"
                className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Driving License Number */}
            <div>
              <label
                htmlFor="licenseNumber"
                className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2"
              >
                Driving License Number <span className="text-red-700">*</span>
              </label>
              <input
                id="licenseNumber"
                name="licenseNumber"
                type="text"
                value={formData.licenseNumber}
                onChange={handleLicenseChange}
                placeholder="e.g., DL-0420180001234"
                className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 font-mono uppercase tracking-wider"
              />
              <p className="mt-1 text-xs text-stone-600 dark:text-stone-400">
                {formData.licenseNumber?.length || 0}/20 characters
              </p>
            </div>

            {/* License Expiry Date (Optional) */}
            <div>
              <label
                htmlFor="licenseExpiryDate"
                className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2"
              >
                License Expiry{' '}
                <span className="text-stone-600 dark:text-stone-400 font-normal">
                  (optional)
                </span>
              </label>
              <input
                id="licenseExpiryDate"
                name="licenseExpiryDate"
                type="date"
                value={formData.licenseExpiryDate}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
              />
            </div>

            {/* Assign to Vehicle */}
            {availableVehicles.length > 0 ? (
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
                      {vehicle.name || vehicle.id} ({vehicle.id})
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/50 px-4 py-3">
                <p className="text-xs text-stone-600 dark:text-stone-400">
                  No vehicles yet — you can assign drivers later from your dashboard.
                </p>
              </div>
            )}

            {/* Error Message — boxed alert pattern for async submit errors */}
            {error && (
              <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800" role="alert">
                <p className="text-sm text-red-700 dark:text-red-300 flex items-start gap-2">
                  <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </p>
              </div>
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
                    ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400 cursor-not-allowed'
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
              className="w-full text-center text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:underline transition-colors py-2"
            >
              I'll add drivers later →
            </button>
          </div>

          {/* Helper text */}
          <p className="mt-6 text-xs text-stone-600 dark:text-stone-400">
            You can add more drivers from your dashboard after setup
          </p>
        </div>
      </div>
    </div>
  )
}
