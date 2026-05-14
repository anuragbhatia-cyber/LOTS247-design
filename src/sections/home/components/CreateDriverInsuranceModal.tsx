import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, ShieldCheck, Search, Truck, Check, User, Mail, Phone, IdCard } from 'lucide-react'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'
import vehicleData from '@/../product/sections/vehicle-and-driver-management/data.json'
import type { Vehicle } from '@/../product/sections/vehicle-and-driver-management/types'

const translations: Record<Language, {
  title: string
  subtitle: string
  close: string
  driverName: string
  driverNamePlaceholder: string
  email: string
  emailPlaceholder: string
  phone: string
  phonePlaceholder: string
  licenseNumber: string
  licenseNumberPlaceholder: string
  assignedVehicle: string
  searchVehiclePlaceholder: string
  noVehiclesFound: string
  cancel: string
  createPolicy: string
  success: string
  successDesc: string
  done: string
}> = {
  en: {
    title: 'Create Driver Insurance',
    subtitle: "Issue a personal accident policy for one of your drivers",
    close: 'Close',
    driverName: 'Driver Name',
    driverNamePlaceholder: 'Full name as on license',
    email: 'Email',
    emailPlaceholder: 'driver@example.com',
    phone: 'Phone Number',
    phonePlaceholder: '+91 98765 43210',
    licenseNumber: 'Driving License Number',
    licenseNumberPlaceholder: 'e.g. MH12 19 0045678',
    assignedVehicle: 'Vehicle Assigned',
    searchVehiclePlaceholder: 'Search by RC number, make, model…',
    noVehiclesFound: 'No vehicles match your search',
    cancel: 'Cancel',
    createPolicy: 'Create Policy',
    success: 'Policy Request Submitted',
    successDesc: 'Insurance partner will reach out within 24 hours to complete KYC and issue the policy.',
    done: 'Done',
  },
  hi: {
    title: 'ड्राइवर बीमा बनाएं',
    subtitle: 'अपने ड्राइवर के लिए व्यक्तिगत दुर्घटना पॉलिसी जारी करें',
    close: 'बंद करें',
    driverName: 'ड्राइवर का नाम',
    driverNamePlaceholder: 'लाइसेंस पर पूरा नाम',
    email: 'ईमेल',
    emailPlaceholder: 'driver@example.com',
    phone: 'फ़ोन नंबर',
    phonePlaceholder: '+91 98765 43210',
    licenseNumber: 'ड्राइविंग लाइसेंस नंबर',
    licenseNumberPlaceholder: 'जैसे MH12 19 0045678',
    assignedVehicle: 'नियुक्त वाहन',
    searchVehiclePlaceholder: 'RC नंबर, निर्माता, मॉडल से खोजें…',
    noVehiclesFound: 'खोज से कोई वाहन नहीं मिला',
    cancel: 'रद्द करें',
    createPolicy: 'पॉलिसी बनाएं',
    success: 'पॉलिसी अनुरोध सबमिट हो गया',
    successDesc: 'बीमा साझेदार KYC पूरा करने और पॉलिसी जारी करने के लिए 24 घंटों में संपर्क करेगा।',
    done: 'पूर्ण',
  },
}

const vehicles = vehicleData.vehicles as Vehicle[]

export interface CreateDriverInsuranceModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateDriverInsuranceModal({ isOpen, onClose }: CreateDriverInsuranceModalProps) {
  const { language } = useLanguage()
  const t = translations[language]

  const [driverName, setDriverName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [vehicleQuery, setVehicleQuery] = useState('')
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null)
  const [vehicleDropdownOpen, setVehicleDropdownOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const vehicleFieldRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'showOverlay' }, '*')
    }
    return () => {
      window.removeEventListener('keydown', onKey)
      if (window.parent !== window) {
        window.parent.postMessage({ type: 'hideOverlay' }, '*')
      }
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) {
      setDriverName('')
      setEmail('')
      setPhone('')
      setLicenseNumber('')
      setVehicleQuery('')
      setSelectedVehicleId(null)
      setVehicleDropdownOpen(false)
      setSubmitted(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (!vehicleDropdownOpen) return
    const onClick = (e: MouseEvent) => {
      if (vehicleFieldRef.current && !vehicleFieldRef.current.contains(e.target as Node)) {
        setVehicleDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [vehicleDropdownOpen])

  const selectedVehicle = useMemo(
    () => vehicles.find((v) => v.id === selectedVehicleId) ?? null,
    [selectedVehicleId],
  )

  const filteredVehicles = useMemo(() => {
    const q = vehicleQuery.trim().toLowerCase()
    if (!q) return vehicles
    return vehicles.filter((v) =>
      v.rcNumber.toLowerCase().includes(q) ||
      v.make.toLowerCase().includes(q) ||
      v.model.toLowerCase().includes(q),
    )
  }, [vehicleQuery])

  const isValid =
    driverName.trim().length > 0 &&
    email.trim().length > 0 &&
    phone.trim().length > 0 &&
    licenseNumber.trim().length > 0 &&
    selectedVehicleId !== null

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    setSubmitted(true)
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={t.title}
        className="relative w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl my-auto overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-50">
                {t.title}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">
                {t.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 inline-flex items-center justify-center rounded-full border border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex-shrink-0"
            aria-label={t.close}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-10 text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center mx-auto">
              <Check className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="mt-4 text-base font-bold text-stone-900 dark:text-stone-50">
              {t.success}
            </h3>
            <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
              {t.successDesc}
            </p>
            <button
              onClick={onClose}
              className="mt-6 inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
            >
              {t.done}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            {/* Driver Name */}
            <Field
              label={t.driverName}
              icon={<User className="w-4 h-4" />}
              value={driverName}
              onChange={setDriverName}
              placeholder={t.driverNamePlaceholder}
            />

            {/* Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label={t.email}
                type="email"
                icon={<Mail className="w-4 h-4" />}
                value={email}
                onChange={setEmail}
                placeholder={t.emailPlaceholder}
              />
              <Field
                label={t.phone}
                type="tel"
                icon={<Phone className="w-4 h-4" />}
                value={phone}
                onChange={setPhone}
                placeholder={t.phonePlaceholder}
              />
            </div>

            {/* License Number */}
            <Field
              label={t.licenseNumber}
              icon={<IdCard className="w-4 h-4" />}
              value={licenseNumber}
              onChange={(v) => setLicenseNumber(v.toUpperCase())}
              placeholder={t.licenseNumberPlaceholder}
              mono
            />

            {/* Vehicle search */}
            <div ref={vehicleFieldRef}>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                {t.assignedVehicle}
              </label>
              <div className="relative">
                {selectedVehicle ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedVehicleId(null)
                      setVehicleQuery('')
                      setVehicleDropdownOpen(true)
                    }}
                    className="w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors text-left"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center flex-shrink-0">
                        <Truck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-mono font-semibold text-stone-900 dark:text-stone-50 truncate">
                          {selectedVehicle.rcNumber}
                        </p>
                        <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                          {selectedVehicle.make} {selectedVehicle.model} · {selectedVehicle.year}
                        </p>
                      </div>
                    </div>
                    <X className="w-4 h-4 text-stone-400 flex-shrink-0" />
                  </button>
                ) : (
                  <>
                    <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={vehicleQuery}
                      onChange={(e) => {
                        setVehicleQuery(e.target.value)
                        setVehicleDropdownOpen(true)
                      }}
                      onFocus={() => setVehicleDropdownOpen(true)}
                      placeholder={t.searchVehiclePlaceholder}
                      className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-50 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 dark:focus:border-emerald-500 transition-colors"
                    />
                  </>
                )}

                {!selectedVehicle && vehicleDropdownOpen && (
                  <div className="absolute z-10 mt-1.5 w-full max-h-60 overflow-y-auto rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 shadow-xl shadow-stone-200/60 dark:shadow-stone-950/60">
                    {filteredVehicles.length === 0 ? (
                      <p className="px-4 py-4 text-xs text-stone-500 dark:text-stone-400 text-center">
                        {t.noVehiclesFound}
                      </p>
                    ) : (
                      <ul className="py-1">
                        {filteredVehicles.map((v) => (
                          <li key={v.id}>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedVehicleId(v.id)
                                setVehicleDropdownOpen(false)
                                setVehicleQuery('')
                              }}
                              className="w-full flex items-center gap-2.5 px-3 py-2 hover:bg-stone-50 dark:hover:bg-stone-800/60 transition-colors text-left"
                            >
                              <div className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center flex-shrink-0">
                                <Truck className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="text-sm font-mono font-semibold text-stone-900 dark:text-stone-50 truncate">
                                  {v.rcNumber}
                                </p>
                                <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                                  {v.make} {v.model} · {v.year}
                                </p>
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                {t.cancel}
              </button>
              <button
                type="submit"
                disabled={!isValid}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-300 dark:disabled:bg-stone-700 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors shadow-sm shadow-emerald-600/20"
              >
                {t.createPolicy}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body,
  )
}

function Field({
  label,
  icon,
  value,
  onChange,
  placeholder,
  type = 'text',
  mono = false,
}: {
  label: string
  icon: React.ReactNode
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  mono?: boolean
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 dark:text-stone-500 pointer-events-none">
          {icon}
        </span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-10 pr-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-50 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 dark:focus:border-emerald-500 transition-colors ${
            mono ? 'font-mono' : ''
          }`}
        />
      </div>
    </div>
  )
}
