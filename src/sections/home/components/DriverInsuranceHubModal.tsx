import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  X,
  ShieldCheck,
  Search,
  Truck,
  Check,
  PlusCircle,
  ListChecks,
  ChevronRight,
  ArrowLeft,
  User as UserIcon,
  CalendarDays,
} from 'lucide-react'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'
import vehicleData from '@/../product/sections/vehicle-and-driver-management/data.json'
import type { Vehicle, Driver } from '@/../product/sections/vehicle-and-driver-management/types'
import { DriverInsuranceModal } from '@/sections/vehicle-and-driver-management/components/DriverInsuranceModal'

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
  hubTitle: string
  hubSubtitle: string
  addNewTitle: string
  addNewDesc: string
  addChooserTitle: string
  addChooserSubtitle: string
  addNewInsuranceTitle: string
  addNewInsuranceDesc: string
  chooseExistingDriverTitle: string
  chooseExistingDriverDesc: string
  viewAllTitle: string
  viewAllDesc: string
  listTitle: string
  listSubtitle: string
  listEmptyTitle: string
  listEmptyDesc: string
  listEmptyCta: string
  activePoliciesCount: (n: number) => string
  back: string
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
  policyNumber: string
  sumInsured: string
  validTill: string
  nominee: string
  active: string
  viewPolicy: string
  back: string
  detailTitle: string
  detailSubtitle: string
  planName: string
  insurer: string
  premium: string
  perYear: string
  validFrom: string
  driverPhone: string
  licenseNumber: string
  nomineeRelation: string
  coveredVehicles: string
  downloadPolicy: string
}

const translations: Record<Language, T> = {
  en: {
    hubTitle: 'Driver Insurance',
    hubSubtitle: 'Issue a new policy or review the ones already active',
    addNewTitle: 'Add driver insurance',
    addNewDesc: 'Start a fresh personal accident policy for one of your drivers',
    addChooserTitle: 'Add driver insurance',
    addChooserSubtitle: 'Issue a policy for a new driver or someone already on your fleet',
    addNewInsuranceTitle: 'Add new insurance',
    addNewInsuranceDesc: 'Start a fresh personal accident policy for a driver',
    chooseExistingDriverTitle: 'Choose existing driver',
    chooseExistingDriverDesc: 'Pick a driver already on your fleet and issue a policy',
    viewAllTitle: 'View all insurance',
    viewAllDesc: 'See every active driver policy and its coverage details',
    listTitle: 'Active Driver Insurance',
    listSubtitle: 'All drivers with an active personal accident policy',
    listEmptyTitle: 'No active driver insurance yet',
    listEmptyDesc: 'Activate a policy for any driver and it will show up here.',
    listEmptyCta: 'Add driver insurance',
    activePoliciesCount: (n: number) => `${n} active ${n === 1 ? 'policy' : 'policies'}`,
    back: 'Back',
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
    policyNumber: 'Policy',
    sumInsured: 'Sum Insured',
    validTill: 'Valid till',
    nominee: 'Nominee',
    active: 'Active',
    viewPolicy: 'View policy',
    back: 'Back',
    detailTitle: 'Policy Details',
    detailSubtitle: 'Personal accident cover for the selected driver',
    planName: 'Plan',
    insurer: 'Insurer',
    premium: 'Premium',
    perYear: '/ year',
    validFrom: 'Valid from',
    driverPhone: 'Driver phone',
    licenseNumber: 'License no.',
    nomineeRelation: 'Relation',
    coveredVehicles: 'Covered vehicles',
    downloadPolicy: 'Download policy',
  },
  hi: {
    hubTitle: 'ड्राइवर बीमा',
    hubSubtitle: 'नई पॉलिसी जारी करें या पहले से सक्रिय पॉलिसियाँ देखें',
    addNewTitle: 'ड्राइवर बीमा जोड़ें',
    addNewDesc: 'अपने ड्राइवर के लिए नई व्यक्तिगत दुर्घटना पॉलिसी शुरू करें',
    addChooserTitle: 'ड्राइवर बीमा जोड़ें',
    addChooserSubtitle: 'नए ड्राइवर के लिए या मौजूदा ड्राइवर के लिए पॉलिसी जारी करें',
    addNewInsuranceTitle: 'नई बीमा जोड़ें',
    addNewInsuranceDesc: 'ड्राइवर के लिए नई व्यक्तिगत दुर्घटना पॉलिसी शुरू करें',
    chooseExistingDriverTitle: 'मौजूदा ड्राइवर चुनें',
    chooseExistingDriverDesc: 'अपने फ्लीट के किसी ड्राइवर को चुनकर पॉलिसी जारी करें',
    viewAllTitle: 'सभी बीमा देखें',
    viewAllDesc: 'सभी सक्रिय ड्राइवर पॉलिसियाँ और उनकी कवरेज देखें',
    listTitle: 'सक्रिय ड्राइवर बीमा',
    listSubtitle: 'सक्रिय व्यक्तिगत दुर्घटना पॉलिसी वाले सभी ड्राइवर',
    listEmptyTitle: 'अभी तक कोई सक्रिय ड्राइवर बीमा नहीं',
    listEmptyDesc: 'किसी भी ड्राइवर के लिए पॉलिसी सक्रिय करें और वह यहाँ दिखेगी।',
    listEmptyCta: 'ड्राइवर बीमा जोड़ें',
    activePoliciesCount: (n: number) => `${n} सक्रिय पॉलिसी`,
    back: 'वापस',
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
    policyNumber: 'पॉलिसी',
    sumInsured: 'बीमा राशि',
    validTill: 'तक वैध',
    nominee: 'नामांकित',
    active: 'सक्रिय',
    viewPolicy: 'पॉलिसी देखें',
    back: 'वापस',
    detailTitle: 'पॉलिसी विवरण',
    detailSubtitle: 'चयनित ड्राइवर के लिए व्यक्तिगत दुर्घटना कवर',
    planName: 'प्लान',
    insurer: 'बीमाकर्ता',
    premium: 'प्रीमियम',
    perYear: '/ वर्ष',
    validFrom: 'से वैध',
    driverPhone: 'ड्राइवर फ़ोन',
    licenseNumber: 'लाइसेंस नं.',
    nomineeRelation: 'संबंध',
    coveredVehicles: 'कवर किए गए वाहन',
    downloadPolicy: 'पॉलिसी डाउनलोड करें',
  },
}

const vehicles = vehicleData.vehicles as Vehicle[]
const drivers = vehicleData.drivers as Driver[]

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

function formatCurrencyINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatShortDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

type View = 'choose' | 'addChooser' | 'create' | 'chooseDriver' | 'list'

export interface DriverInsuranceHubModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DriverInsuranceHubModal({ isOpen, onClose }: DriverInsuranceHubModalProps) {
  const { language } = useLanguage()
  const t = translations[language]

  const [view, setView] = useState<View>('choose')
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null)

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

  const activeDrivers = useMemo(
    () => drivers.filter((d) => d.insuranceStatus === 'active' && d.insurancePolicy).slice(0, 2),
    [],
  )

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
      setView('choose')
      setSelectedDriverId(null)
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

  const selectedDriver = useMemo(
    () => activeDrivers.find((d) => d.id === selectedDriverId) ?? null,
    [activeDrivers, selectedDriverId],
  )

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

  const headerCopy = (() => {
    if (view === 'create') return { title: t.title, subtitle: t.subtitle }
    if (view === 'addChooser') return { title: t.addChooserTitle, subtitle: t.addChooserSubtitle }
    if (view === 'chooseDriver') return { title: t.chooseExistingDriverTitle, subtitle: t.chooseExistingDriverDesc }
    if (view === 'list') return { title: t.listTitle, subtitle: t.listSubtitle }
    return { title: t.hubTitle, subtitle: t.hubSubtitle }
  })()

  return createPortal(
    <>
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70" onClick={onClose} />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={headerCopy.title}
        className="relative w-full max-w-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl my-auto overflow-hidden max-h-[calc(100vh-2rem)] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-stone-200 dark:border-stone-800 flex-shrink-0">
          <div className="flex items-start gap-3 min-w-0">
            {view !== 'choose' && (
              <button
                onClick={() => {
                  if (view === 'create') {
                    setView(selectedDriverId ? 'chooseDriver' : 'addChooser')
                  } else if (view === 'chooseDriver' || view === 'addChooser') {
                    setView(view === 'chooseDriver' ? 'addChooser' : 'choose')
                  } else {
                    setView('choose')
                  }
                }}
                className="w-10 h-10 inline-flex items-center justify-center rounded-xl border border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex-shrink-0"
                aria-label={t.back}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            {view === 'choose' && (
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            )}
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-stone-50">
                {headerCopy.title}
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">
                {headerCopy.subtitle}
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

        {/* Body */}
        {view === 'choose' && (
          <div className="px-6 py-6 space-y-3">
            <ChooserCard
              icon={PlusCircle}
              title={t.addNewTitle}
              description={t.addNewDesc}
              onClick={() => setView('addChooser')}
            />
            <ChooserCard
              icon={ListChecks}
              title={t.viewAllTitle}
              description={t.viewAllDesc}
              badge={t.activePoliciesCount(activeDrivers.length)}
              onClick={() => setView('list')}
            />
          </div>
        )}

        {view === 'addChooser' && (
          <div className="px-6 py-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto w-full">
            <ChooserCard
              icon={PlusCircle}
              title={t.addNewInsuranceTitle}
              description={t.addNewInsuranceDesc}
              onClick={() => setView('create')}
              stacked
            />
            <ChooserCard
              icon={UserIcon}
              title={t.chooseExistingDriverTitle}
              description={t.chooseExistingDriverDesc}
              onClick={() => setView('chooseDriver')}
              stacked
            />
          </div>
        )}

        {view === 'list' && (
          <div className="flex-1 overflow-y-auto px-6 py-5">
            {activeDrivers.length === 0 ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-7 h-7 text-stone-400 dark:text-stone-500" />
                </div>
                <h3 className="mt-4 text-base font-bold text-stone-900 dark:text-stone-50">
                  {t.listEmptyTitle}
                </h3>
                <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
                  {t.listEmptyDesc}
                </p>
                <button
                  onClick={() => setView('create')}
                  className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  {t.listEmptyCta}
                </button>
              </div>
            ) : (
              <ul className="space-y-3">
                {activeDrivers.map((d) => (
                  <li
                    key={d.id}
                    className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center flex-shrink-0">
                          <UserIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-stone-900 dark:text-stone-50 truncate">
                            {d.name}
                          </p>
                          <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                            {d.insurancePolicy?.insurer}
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 flex-shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {t.active}
                      </span>
                    </div>

                    <dl className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <dt className="text-stone-500 dark:text-stone-400">{t.policyNumber}</dt>
                        <dd className="font-mono font-semibold text-stone-900 dark:text-stone-50 truncate">
                          {d.insurancePolicy?.policyNumber}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-stone-500 dark:text-stone-400">{t.sumInsured}</dt>
                        <dd className="font-semibold text-stone-900 dark:text-stone-50">
                          {d.insurancePolicy ? formatCurrencyINR(d.insurancePolicy.sumInsured) : '—'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-stone-500 dark:text-stone-400 flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" />
                          {t.validTill}
                        </dt>
                        <dd className="font-semibold text-stone-900 dark:text-stone-50">
                          {d.insurancePolicy ? formatShortDate(d.insurancePolicy.endDate) : '—'}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-stone-500 dark:text-stone-400">{t.nominee}</dt>
                        <dd className="font-semibold text-stone-900 dark:text-stone-50 truncate">
                          {d.insurancePolicy?.nominee}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-3 pt-3 border-t border-stone-100 dark:border-stone-800 flex justify-end">
                      <button
                        type="button"
                        onClick={() => setSelectedDriverId(d.id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors"
                      >
                        {t.viewPolicy}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {view === 'chooseDriver' && (
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <ul className="flex flex-col gap-2">
              {[...drivers]
                .sort((a, b) => {
                  const aInsured = a.insuranceStatus === 'active' ? 1 : 0
                  const bInsured = b.insuranceStatus === 'active' ? 1 : 0
                  return aInsured - bInsured
                })
                .map((d) => {
                const alreadyInsured = d.insuranceStatus === 'active'
                return (
                  <li
                    key={d.id}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900"
                  >
                    <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center flex-shrink-0">
                      <UserIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-stone-900 dark:text-stone-50 truncate">
                        {d.name}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
                        {d.phone} · <span className="font-mono">{d.licenseNumber}</span>
                      </p>
                    </div>
                    {alreadyInsured ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 flex-shrink-0">
                        <Check className="w-3 h-3" />
                        Insured
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setSelectedDriverId(d.id)
                          setMemberName(d.name)
                          setMobile(d.phone)
                          setLicenseNumber(d.licenseNumber)
                          setView('create')
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex-shrink-0"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        Add insurance
                      </button>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        )}

        {view === 'create' && (
          submitted ? (
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
                <Field
                  label={t.memberName}
                  value={memberName}
                  onChange={setMemberName}
                  placeholder={t.memberNamePlaceholder}
                  required
                />

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

                <Field
                  label={t.licenseNumber}
                  value={licenseNumber}
                  onChange={(v) => setLicenseNumber(v.toUpperCase())}
                  placeholder={t.licenseNumberPlaceholder}
                  mono
                  required
                />

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
          )
        )}
      </div>
    </div>

    <DriverInsuranceModal
      isOpen={selectedDriver !== null}
      driver={selectedDriver}
      onClose={() => setSelectedDriverId(null)}
    />
    </>,
    document.body,
  )
}

function ChooserCard({
  icon: Icon,
  title,
  description,
  badge,
  onClick,
  stacked = false,
}: {
  icon: typeof PlusCircle
  title: string
  description: string
  badge?: string
  onClick: () => void
  stacked?: boolean
}) {
  if (stacked) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="group relative w-full flex flex-col items-center text-center gap-4 px-5 py-6 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md hover:shadow-emerald-500/10 hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
      >
        <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950/60 flex items-center justify-center transition-colors">
          <Icon className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <p className="text-sm font-bold text-stone-900 dark:text-stone-50">{title}</p>
            {badge && (
              <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1.5 leading-relaxed">
            {description}
          </p>
        </div>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full flex items-center gap-4 px-4 py-4 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-emerald-500 dark:hover:border-emerald-500 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 transition-all text-left focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
    >
      <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950/60 flex items-center justify-center flex-shrink-0 transition-colors">
        <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-bold text-stone-900 dark:text-stone-50">{title}</p>
          {badge && (
            <span className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 leading-snug">
          {description}
        </p>
      </div>
      <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex-shrink-0" />
    </button>
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

