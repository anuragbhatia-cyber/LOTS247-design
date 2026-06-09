import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  X,
  ShieldCheck,
  Search,
  Truck,
  Check,
} from 'lucide-react'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'
import vehicleData from '@/../product/sections/vehicle-and-driver-management/data.json'
import type { Vehicle } from '@/../product/sections/vehicle-and-driver-management/types'

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry',
]

type T = {
  title: string
  subtitle: string
  close: string
  memberName: string
  memberNamePlaceholder: string
  email: string
  emailPlaceholder: string
  mobile: string
  mobilePlaceholder: string
  dateOfBirth: string
  age: string
  agePlaceholder: string
  gender: string
  genderPlaceholder: string
  genderMale: string
  genderFemale: string
  genderOther: string
  state: string
  statePlaceholder: string
  pincode: string
  pincodePlaceholder: string
  aadhaar: string
  aadhaarPlaceholder: string
  licenseNumber: string
  licenseNumberPlaceholder: string
  nomineeName: string
  nomineeNamePlaceholder: string
  nomineeRelationship: string
  nomineeRelationshipPlaceholder: string
  relSpouse: string
  relParent: string
  relChild: string
  relSibling: string
  relOther: string
  assignedVehicle: string
  searchVehiclePlaceholder: string
  noVehiclesFound: string
  cancel: string
  createPolicy: string
  success: string
  successDesc: string
  done: string
}

const translations: Record<Language, T> = {
  en: {
    title: 'Activate Driver Insurance',
    subtitle: 'Issue a personal accident policy for one of your drivers',
    close: 'Close',
    memberName: 'Member Name',
    memberNamePlaceholder: 'Full name as on government ID or Aadhaar',
    email: 'Email ID',
    emailPlaceholder: 'driver@example.com',
    mobile: 'Mobile Number',
    mobilePlaceholder: '+91 98765 43210',
    dateOfBirth: 'Date of Birth',
    age: 'Age',
    agePlaceholder: 'Auto-calculated',
    gender: 'Gender',
    genderPlaceholder: 'Select gender',
    genderMale: 'Male',
    genderFemale: 'Female',
    genderOther: 'Other',
    state: 'State',
    statePlaceholder: 'Select state',
    pincode: 'Pincode',
    pincodePlaceholder: '6-digit pincode',
    aadhaar: 'Aadhaar Number',
    aadhaarPlaceholder: '1234 5678 9012',
    licenseNumber: 'Driving License No.',
    licenseNumberPlaceholder: 'e.g. MH12 19 0045678',
    nomineeName: 'Nominee Name',
    nomineeNamePlaceholder: 'Full name of nominee',
    nomineeRelationship: 'Nominee Relationship',
    nomineeRelationshipPlaceholder: 'Select relationship',
    relSpouse: 'Spouse',
    relParent: 'Parent',
    relChild: 'Child',
    relSibling: 'Sibling',
    relOther: 'Other',
    assignedVehicle: 'Vehicle Assigned',
    searchVehiclePlaceholder: 'Search by RC number, make, model…',
    noVehiclesFound: 'No vehicles match your search',
    cancel: 'Cancel',
    createPolicy: 'Activate Policy',
    success: 'Policy Request Submitted',
    successDesc: 'Insurance partner will reach out within 24 hours to complete KYC and issue the policy.',
    done: 'Done',
  },
  hi: {
    title: 'ड्राइवर बीमा सक्रिय करें',
    subtitle: 'अपने ड्राइवर के लिए व्यक्तिगत दुर्घटना पॉलिसी जारी करें',
    close: 'बंद करें',
    memberName: 'सदस्य का नाम',
    memberNamePlaceholder: 'सरकारी ID या आधार पर पूरा नाम',
    email: 'ईमेल आईडी',
    emailPlaceholder: 'driver@example.com',
    mobile: 'मोबाइल नंबर',
    mobilePlaceholder: '+91 98765 43210',
    dateOfBirth: 'जन्म तिथि',
    age: 'आयु',
    agePlaceholder: 'स्वतः गणना',
    gender: 'लिंग',
    genderPlaceholder: 'लिंग चुनें',
    genderMale: 'पुरुष',
    genderFemale: 'महिला',
    genderOther: 'अन्य',
    state: 'राज्य',
    statePlaceholder: 'राज्य चुनें',
    pincode: 'पिनकोड',
    pincodePlaceholder: '6 अंकों का पिनकोड',
    aadhaar: 'आधार नंबर',
    aadhaarPlaceholder: '1234 5678 9012',
    licenseNumber: 'ड्राइविंग लाइसेंस नंबर',
    licenseNumberPlaceholder: 'जैसे MH12 19 0045678',
    nomineeName: 'नामांकित व्यक्ति का नाम',
    nomineeNamePlaceholder: 'नामांकित व्यक्ति का पूरा नाम',
    nomineeRelationship: 'नामांकित व्यक्ति का संबंध',
    nomineeRelationshipPlaceholder: 'संबंध चुनें',
    relSpouse: 'पति/पत्नी',
    relParent: 'माता/पिता',
    relChild: 'बच्चा',
    relSibling: 'भाई/बहन',
    relOther: 'अन्य',
    assignedVehicle: 'नियुक्त वाहन',
    searchVehiclePlaceholder: 'RC नंबर, निर्माता, मॉडल से खोजें…',
    noVehiclesFound: 'खोज से कोई वाहन नहीं मिला',
    cancel: 'रद्द करें',
    createPolicy: 'पॉलिसी सक्रिय करें',
    success: 'पॉलिसी अनुरोध सबमिट हो गया',
    successDesc: 'बीमा साझेदार KYC पूरा करने और पॉलिसी जारी करने के लिए 24 घंटों में संपर्क करेगा।',
    done: 'पूर्ण',
  },
}

const vehicles = vehicleData.vehicles as Vehicle[]

function computeAge(dob: string): string {
  if (!dob) return ''
  const d = new Date(dob)
  if (Number.isNaN(d.getTime())) return ''
  const now = new Date()
  let age = now.getFullYear() - d.getFullYear()
  const m = now.getMonth() - d.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--
  return age >= 0 && age < 130 ? String(age) : ''
}

function formatAadhaar(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 12)
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ')
}

export interface CreateDriverInsuranceModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateDriverInsuranceModal({ isOpen, onClose }: CreateDriverInsuranceModalProps) {
  const { language } = useLanguage()
  const t = translations[language]

  const [memberName, setMemberName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState('')
  const [state, setState] = useState('')
  const [pincode, setPincode] = useState('')
  const [aadhaar, setAadhaar] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [nomineeName, setNomineeName] = useState('')
  const [nomineeRelationship, setNomineeRelationship] = useState('')
  const [vehicleQuery, setVehicleQuery] = useState('')
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null)
  const [vehicleDropdownOpen, setVehicleDropdownOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const vehicleFieldRef = useRef<HTMLDivElement>(null)

  const age = useMemo(() => computeAge(dateOfBirth), [dateOfBirth])

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
      setMemberName('')
      setEmail('')
      setMobile('')
      setDateOfBirth('')
      setGender('')
      setState('')
      setPincode('')
      setAadhaar('')
      setLicenseNumber('')
      setNomineeName('')
      setNomineeRelationship('')
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

  const aadhaarDigits = aadhaar.replace(/\s/g, '')

  const isValid =
    memberName.trim().length > 0 &&
    email.trim().length > 0 &&
    mobile.trim().length > 0 &&
    dateOfBirth.trim().length > 0 &&
    age !== '' &&
    gender !== '' &&
    state !== '' &&
    /^\d{6}$/.test(pincode) &&
    aadhaarDigits.length === 12 &&
    licenseNumber.trim().length > 0 &&
    nomineeName.trim().length > 0 &&
    nomineeRelationship !== '' &&
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
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl my-auto overflow-hidden max-h-[calc(100vh-2rem)] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-stone-200 dark:border-stone-800 flex-shrink-0">
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
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
            <div className="px-6 py-5 space-y-4">
              {/* Member Name */}
              <Field
                label={t.memberName}
                value={memberName}
                onChange={setMemberName}
                placeholder={t.memberNamePlaceholder}
                required
              />

              {/* Email + Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label={t.email}
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder={t.emailPlaceholder}
                  required
                />
                <Field
                  label={t.mobile}
                  type="tel"
                  value={mobile}
                  onChange={setMobile}
                  placeholder={t.mobilePlaceholder}
                  required
                />
              </div>

              {/* DOB + Age */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label={t.dateOfBirth}
                  type="date"
                  value={dateOfBirth}
                  onChange={setDateOfBirth}
                  required
                />
                <Field
                  label={t.age}
                  value={age}
                  onChange={() => {}}
                  placeholder={t.agePlaceholder}
                  readOnly
                  required
                />
              </div>

              {/* Gender + State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SelectField
                  label={t.gender}
                  value={gender}
                  onChange={setGender}
                  placeholder={t.genderPlaceholder}
                  options={[
                    { value: 'male', label: t.genderMale },
                    { value: 'female', label: t.genderFemale },
                    { value: 'other', label: t.genderOther },
                  ]}
                  required
                />
                <SelectField
                  label={t.state}
                  value={state}
                  onChange={setState}
                  placeholder={t.statePlaceholder}
                  options={INDIAN_STATES.map((s) => ({ value: s, label: s }))}
                  required
                />
              </div>

              {/* Pincode + Aadhaar */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label={t.pincode}
                  type="text"
                  inputMode="numeric"
                  value={pincode}
                  onChange={(v) => setPincode(v.replace(/\D/g, '').slice(0, 6))}
                  placeholder={t.pincodePlaceholder}
                  mono
                  required
                />
                <Field
                  label={t.aadhaar}
                  type="text"
                  inputMode="numeric"
                  value={aadhaar}
                  onChange={(v) => setAadhaar(formatAadhaar(v))}
                  placeholder={t.aadhaarPlaceholder}
                  mono
                  required
                />
              </div>

              {/* Driving License */}
              <Field
                label={t.licenseNumber}
                value={licenseNumber}
                onChange={(v) => setLicenseNumber(v.toUpperCase())}
                placeholder={t.licenseNumberPlaceholder}
                mono
                required
              />

              {/* Nominee Name + Relationship */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label={t.nomineeName}
                  value={nomineeName}
                  onChange={setNomineeName}
                  placeholder={t.nomineeNamePlaceholder}
                  required
                />
                <SelectField
                  label={t.nomineeRelationship}
                  value={nomineeRelationship}
                  onChange={setNomineeRelationship}
                  placeholder={t.nomineeRelationshipPlaceholder}
                  options={[
                    { value: 'spouse', label: t.relSpouse },
                    { value: 'parent', label: t.relParent },
                    { value: 'child', label: t.relChild },
                    { value: 'sibling', label: t.relSibling },
                    { value: 'other', label: t.relOther },
                  ]}
                  required
                />
              </div>

              {/* Vehicle search */}
              <div ref={vehicleFieldRef}>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                  {t.assignedVehicle}
                  <span className="text-red-500 ml-0.5">*</span>
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
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50/60 dark:bg-stone-900/60 flex-shrink-0">
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
  value,
  onChange,
  placeholder,
  type = 'text',
  inputMode,
  mono = false,
  readOnly = false,
  required = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  inputMode?: 'numeric' | 'text' | 'tel' | 'email' | 'search' | 'url' | 'decimal' | 'none'
  mono?: boolean
  readOnly?: boolean
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <input
          type={type}
          inputMode={inputMode}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          className={`w-full px-3 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 ${
            readOnly
              ? 'bg-stone-50 dark:bg-stone-800/50 text-stone-600 dark:text-stone-400 cursor-default'
              : 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-50'
          } text-sm placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 dark:focus:border-emerald-500 transition-colors ${
            mono ? 'font-mono' : ''
          }`}
        />
      </div>
    </div>
  )
}

function SelectField({
  label,
  value,
  onChange,
  placeholder,
  options,
  required = false,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  options: { value: string; label: string }[]
  required?: boolean
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full pl-3 pr-8 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm ${
            value ? 'text-stone-900 dark:text-stone-50' : 'text-stone-400 dark:text-stone-500'
          } focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 dark:focus:border-emerald-500 transition-colors appearance-none cursor-pointer`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="text-stone-900 dark:text-stone-50">
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          className="w-4 h-4 text-stone-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  )
}
