import { useState } from 'react'
import type { VehicleDetailsForm } from '@/../product/sections/onboarding-and-activation/types'


export type VehicleErrorKind = 'invalidRC' | 'duplicateRC' | 'apiFailed' | 'requiredFields'

interface VehicleAdditionStepProps {
  /** Called when user clicks Fetch Details */
  onFetchDetails?: (rcNumber: string) => void
  /** Called when user submits vehicle */
  onAddVehicle?: (vehicle: VehicleDetailsForm) => void
  /** Called when user chooses manual entry */
  onManualEntry?: () => void
  /** Called when user wants to re-edit the RC after a successful fetch */
  onResetFetch?: () => void
  /** Vehicle validation error message (legacy single-string slot) */
  error?: string
  /** Specific error kind — drives recovery UX (manual fallback for apiFailed, etc.) */
  errorKind?: VehicleErrorKind
  /** Whether vehicle details are being fetched */
  isFetching?: boolean
  /** Fetched/entered vehicle data */
  vehicleData?: Partial<VehicleDetailsForm>
  /** Whether API fetch was successful */
  fetchSuccess?: boolean
  /** Whether in manual entry mode */
  isManualMode?: boolean
}

export function VehicleAdditionStep({
  onFetchDetails,
  onAddVehicle,
  onManualEntry,
  onResetFetch,
  error,
  errorKind,
  isFetching = false,
  vehicleData,
  fetchSuccess = false,
  isManualMode = false,
}: VehicleAdditionStepProps) {
  const [rcNumber, setRcNumber] = useState(vehicleData?.rcNumber || '')
  const [manualData, setManualData] = useState<Partial<VehicleDetailsForm>>({
    vehicleName: vehicleData?.vehicleName || '',
    vehicleType: vehicleData?.vehicleType || '',
  })

  const formatRcNumber = (value: string) => {
    return value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10)
  }

  const handleRcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRcNumber(formatRcNumber(e.target.value))
  }

  // RC input should be editable again after a failed fetch — so the user can correct the typo
  const rcInputDisabled = isFetching || (fetchSuccess && !errorKind)

  const handleFetchDetails = () => {
    if (rcNumber.length >= 8) {
      onFetchDetails?.(rcNumber)
    }
  }

  const handleSubmit = () => {
    const vehicle: VehicleDetailsForm = {
      rcNumber,
      vehicleName: vehicleData?.vehicleName || manualData.vehicleName || '',
      vehicleType: vehicleData?.vehicleType || manualData.vehicleType || '',
      registrationDate: vehicleData?.registrationDate || '',
      ownerName: vehicleData?.ownerName || '',
      fuelType: vehicleData?.fuelType || '',
      isFetching: false,
      fetchedFromApi: fetchSuccess && !isManualMode,
      manualEntry: isManualMode,
    }
    onAddVehicle?.(vehicle)
  }

  const isValid = rcNumber.length >= 8 && (
    fetchSuccess ||
    (isManualMode && manualData.vehicleName && manualData.vehicleType)
  )

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
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
              Add your first vehicle
            </h1>
            <p className="text-stone-600 dark:text-stone-400 mt-1">
              Enter your RC number to start tracking compliance
            </p>
          </div>

          <div className="space-y-5">
            {/* RC Number Input */}
            <div>
              <label
                htmlFor="rc"
                className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2"
              >
                Enter Vehicle Number
              </label>
              <div className="flex gap-2">
                <input
                  id="rc"
                  type="text"
                  value={rcNumber}
                  onChange={handleRcChange}
                  placeholder="e.g., DL03AF1234"
                  disabled={rcInputDisabled}
                  className={`
                    flex-1 px-4 py-3.5 rounded-xl border text-base tracking-wider font-mono uppercase
                    bg-white dark:bg-stone-900
                    text-stone-900 dark:text-white
                    placeholder:text-stone-400 dark:placeholder:text-stone-500
                    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                    transition-all duration-200
                    disabled:opacity-60 disabled:cursor-not-allowed
                    ${
                      error
                        ? 'border-red-500 dark:border-red-500'
                        : 'border-stone-300 dark:border-stone-700'
                    }
                  `}
                  autoFocus
                />
                {!fetchSuccess && !isManualMode && (
                  <button
                    onClick={handleFetchDetails}
                    disabled={rcNumber.length < 8 || isFetching}
                    className={`
                      px-5 py-3.5 rounded-xl font-semibold text-sm whitespace-nowrap
                      transition-all duration-200
                      ${
                        rcNumber.length >= 8 && !isFetching
                          ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                          : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400 cursor-not-allowed'
                      }
                    `}
                  >
                    {isFetching ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Fetching
                      </span>
                    ) : (
                      'Fetch Details'
                    )}
                  </button>
                )}
              </div>
              {error && (
                <div className="mt-3 p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800" role="alert">
                  <p className="text-sm text-red-700 dark:text-red-300 flex items-start gap-2">
                    <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                  </p>
                  {errorKind === 'apiFailed' && !isManualMode && (
                    <button
                      onClick={onManualEntry}
                      className="mt-2 text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:underline"
                    >
                      Enter vehicle details manually →
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Loading State — skeleton mirrors the fetched-details card */}
            {isFetching && (
              <div
                className="p-5 rounded-xl bg-stone-50 dark:bg-stone-900/50 border border-stone-200 dark:border-stone-800 motion-safe:animate-pulse"
                aria-busy="true"
                aria-live="polite"
                role="status"
              >
                <span className="sr-only">Fetching vehicle details</span>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 rounded-full bg-stone-200 dark:bg-stone-800" />
                  <div className="h-3 w-40 rounded bg-stone-200 dark:bg-stone-800" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="h-2.5 w-20 rounded bg-stone-200 dark:bg-stone-800 mb-2" />
                    <div className="h-3.5 w-28 rounded bg-stone-200 dark:bg-stone-800" />
                  </div>
                  <div>
                    <div className="h-2.5 w-20 rounded bg-stone-200 dark:bg-stone-800 mb-2" />
                    <div className="h-3.5 w-24 rounded bg-stone-200 dark:bg-stone-800" />
                  </div>
                  <div>
                    <div className="h-2.5 w-20 rounded bg-stone-200 dark:bg-stone-800 mb-2" />
                    <div className="h-3.5 w-32 rounded bg-stone-200 dark:bg-stone-800" />
                  </div>
                  <div>
                    <div className="h-2.5 w-20 rounded bg-stone-200 dark:bg-stone-800 mb-2" />
                    <div className="h-3.5 w-20 rounded bg-stone-200 dark:bg-stone-800" />
                  </div>
                </div>
              </div>
            )}

            {/* Fetched Vehicle Details */}
            {fetchSuccess && vehicleData && !isManualMode && (
              <div className="p-5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="font-medium text-emerald-700 dark:text-emerald-300 text-sm">
                      Vehicle details fetched
                    </span>
                  </div>
                  {onResetFetch && (
                    <button
                      onClick={onResetFetch}
                      className="text-xs font-medium text-emerald-800 dark:text-emerald-300 hover:underline"
                    >
                      Wrong vehicle? Edit
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {vehicleData.vehicleName && (
                    <div>
                      <p className="text-xs text-stone-600 dark:text-stone-400 mb-0.5">Vehicle Name</p>
                      <p className="text-sm font-medium text-stone-900 dark:text-white">{vehicleData.vehicleName}</p>
                    </div>
                  )}
                  {vehicleData.vehicleType && (
                    <div>
                      <p className="text-xs text-stone-600 dark:text-stone-400 mb-0.5">Vehicle Type</p>
                      <p className="text-sm font-medium text-stone-900 dark:text-white">{vehicleData.vehicleType}</p>
                    </div>
                  )}
                  {vehicleData.ownerName && (
                    <div>
                      <p className="text-xs text-stone-600 dark:text-stone-400 mb-0.5">Owner Name</p>
                      <p className="text-sm font-medium text-stone-900 dark:text-white">{vehicleData.ownerName}</p>
                    </div>
                  )}
                  {vehicleData.fuelType && (
                    <div>
                      <p className="text-xs text-stone-600 dark:text-stone-400 mb-0.5">Fuel Type</p>
                      <p className="text-sm font-medium text-stone-900 dark:text-white">{vehicleData.fuelType}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Manual Entry Form */}
            {isManualMode && (
              <div className="space-y-4 p-5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-amber-700 dark:text-amber-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-amber-700 dark:text-amber-300">
                    Enter details manually
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                    Vehicle Name / Model
                  </label>
                  <input
                    type="text"
                    value={manualData.vehicleName}
                    onChange={(e) => setManualData({ ...manualData, vehicleName: e.target.value })}
                    placeholder="Enter vehicle name"
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                    Vehicle Type
                  </label>
                  <select
                    value={manualData.vehicleType}
                    onChange={(e) => setManualData({ ...manualData, vehicleType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="">Select type</option>
                    <option value="Car">Car</option>
                    <option value="Bike">Bike</option>
                    <option value="Truck">Truck</option>
                    <option value="Bus">Bus</option>
                    <option value="Auto">Auto Rickshaw</option>
                    <option value="Taxi">Taxi</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            )}

            {/* Manual Entry Link */}
            {!isFetching && !fetchSuccess && !isManualMode && rcNumber.length >= 8 && (
              <button
                onClick={onManualEntry}
                className="w-full text-center text-sm text-stone-600 dark:text-stone-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
              >
                Having trouble? Enter details manually →
              </button>
            )}

            {/* Submit Button — contextual label so the action feels like one flow, not two */}
            <button
              onClick={handleSubmit}
              disabled={!isValid}
              className={`
                w-full py-3.5 rounded-xl font-semibold text-base
                transition-all duration-200
                ${
                  isValid
                    ? 'bg-emerald-700 hover:bg-emerald-800 text-white shadow-lg shadow-emerald-500/20'
                    : 'bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-400 cursor-not-allowed'
                }
              `}
            >
              {fetchSuccess && !isManualMode ? 'Confirm & Continue' : isManualMode ? 'Add Vehicle' : 'Continue'}
            </button>
          </div>

          {/* Helper text */}
          <p className="mt-6 text-xs text-stone-600 dark:text-stone-400">
            Your vehicle's RC number can be found on your Registration Certificate
          </p>
        </div>
      </div>
    </div>
  )
}
