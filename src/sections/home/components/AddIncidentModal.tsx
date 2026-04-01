import { useState, useRef, useEffect } from 'react'
import {
  X,
  ArrowLeft,
  ChevronDown,
  FileWarning,
  ShieldAlert,
  Building2,
  Scale,
  Search,
} from 'lucide-react'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'

type Category = 'challan' | 'case' | 'rto' | 'other'

const translations: Record<Language, Record<string, string>> = {
  en: {
    addIncident: 'Add Incident',
    selectCategory: 'Select the type of incident to report',
    challan: 'Challan Assistance',
    challanDesc: 'Report a traffic challan',
    case: 'Case Assistance',
    caseDesc: 'Report an accident or legal issue',
    rto: 'RTO Assistance',
    rtoDesc: 'RTO-related query',
    other: 'Other',
    otherDesc: 'Other incident',
    vehicleNumber: 'Vehicle Number',
    vehicleNumberPlaceholder: 'UP32MM1113',
    challanNumber: 'Challan Number',
    challanNumberPlaceholder: 'e.g. CHL-2026-12345',
    caseType: 'Case Type',
    selectCaseType: 'Select case type',
    theft: 'Theft',
    detention: 'Detention',
    bail: 'Bail',
    accidents: 'Accidents',
    firs: 'FIRs',
    superdari: 'Superdari',
    vehicleImpounding: 'Vehicle Impounding',
    ewayBillIssues: 'E-Way Bill',
    others: 'Others',
    caseDetail: 'Case Detail',
    caseDetailPlaceholder: 'Describe the case in detail...',
    incidentState: 'Incident State:',
    selectState: 'Select',
    incidentCity: 'Incident City:',
    selectCity: 'Select',
    roadName: 'Road Name',
    roadNamePlaceholder: '',
    pin: 'Pin',
    pinPlaceholder: '',
    incidentReporterPhone: 'Incident Reporter Phone',
    incidentReporterPhonePlaceholder: '',
    authorityInvolved: 'Authority Involved:',
    selectAuthority: 'Select',
    incidentArea: 'Incident Area',
    incidentAreaPlaceholder: '',
    incidentReporterName: 'Incident Reporter Name',
    incidentReporterNamePlaceholder: '',
    rtoType: 'Type',
    selectRtoType: 'Select type',
    rtoRcRenewal: 'RC Renewal',
    rtoRcRetrieval: 'RC Retrieval',
    rtoLicenseRetrieval: 'License Retrieval',
    rtoLicenseRenewal: 'License Renewal',
    rtoFitnessRetrieval: 'Fitness Retrieval',
    rtoFitnessRenewal: 'Fitness Renewal',
    rtoOwnershipTransfer: 'Ownership Transfer',
    rtoNumberUpdating: 'Number Updating',
    rtoPucRenewal: 'PUC Renewal',
    rtoInsuranceRenewal: 'Insurance Renewal',
    rtoOthers: 'Others',
    description: 'Description',
    descriptionPlaceholder: 'Describe the incident...',
    searchVehicle: 'Type to search vehicle...',
    noResults: 'No vehicles found',
    cancel: 'Cancel',
    submit: 'Request Proposal',
    payNow: 'Pay Now',
    back: 'Back',
  },
  hi: {
    addIncident: 'घटना जोड़ें',
    selectCategory: 'रिपोर्ट करने के लिए घटना का प्रकार चुनें',
    challan: 'चालान सहायता',
    challanDesc: 'ट्रैफ़िक चालान की रिपोर्ट करें',
    case: 'केस सहायता',
    caseDesc: 'दुर्घटना या कानूनी मुद्दे की रिपोर्ट करें',
    rto: 'RTO सहायता',
    rtoDesc: 'RTO से संबंधित प्रश्न',
    other: 'अन्य',
    otherDesc: 'अन्य घटना',
    vehicleNumber: 'वाहन नंबर',
    vehicleNumberPlaceholder: 'उदा. UP32MM1113',
    challanNumber: 'चालान नंबर',
    challanNumberPlaceholder: 'उदा. CHL-2026-12345',
    caseType: 'केस का प्रकार',
    selectCaseType: 'केस प्रकार चुनें',
    theft: 'चोरी',
    detention: 'हिरासत',
    bail: 'जमानत',
    accidents: 'दुर्घटनाएँ',
    firs: 'FIR',
    superdari: 'सुपुर्दगी',
    vehicleImpounding: 'वाहन जब्ती',
    ewayBillIssues: 'ई-वे बिल',
    others: 'अन्य',
    caseDetail: 'केस विवरण',
    caseDetailPlaceholder: 'केस का विस्तृत विवरण दें...',
    incidentState: 'घटना राज्य:',
    selectState: 'चुनें',
    incidentCity: 'घटना शहर:',
    selectCity: 'चुनें',
    roadName: 'सड़क का नाम',
    roadNamePlaceholder: '',
    pin: 'पिन',
    pinPlaceholder: '',
    incidentReporterPhone: 'रिपोर्टर फ़ोन',
    incidentReporterPhonePlaceholder: '',
    authorityInvolved: 'शामिल प्राधिकरण:',
    selectAuthority: 'चुनें',
    incidentArea: 'घटना क्षेत्र',
    incidentAreaPlaceholder: '',
    incidentReporterName: 'रिपोर्टर का नाम',
    incidentReporterNamePlaceholder: '',
    rtoType: 'प्रकार',
    selectRtoType: 'प्रकार चुनें',
    rtoRcRenewal: 'RC नवीनीकरण',
    rtoRcRetrieval: 'RC पुनर्प्राप्ति',
    rtoLicenseRetrieval: 'लाइसेंस पुनर्प्राप्ति',
    rtoLicenseRenewal: 'लाइसेंस नवीनीकरण',
    rtoFitnessRetrieval: 'फिटनेस पुनर्प्राप्ति',
    rtoFitnessRenewal: 'फिटनेस नवीनीकरण',
    rtoOwnershipTransfer: 'स्वामित्व हस्तांतरण',
    rtoNumberUpdating: 'नंबर अपडेटिंग',
    rtoPucRenewal: 'PUC नवीनीकरण',
    rtoInsuranceRenewal: 'बीमा नवीनीकरण',
    rtoOthers: 'अन्य',
    description: 'विवरण',
    descriptionPlaceholder: 'घटना का विवरण दें...',
    searchVehicle: 'वाहन खोजने के लिए टाइप करें...',
    noResults: 'कोई वाहन नहीं मिला',
    cancel: 'रद्द करें',
    submit: 'प्रस्ताव अनुरोध',
    payNow: 'अभी भुगतान करें',
    back: 'वापस',
  },
}

// Fleet vehicles available in the system
const FLEET_VEHICLES = [
  { id: 'veh-001', registrationNumber: 'UP32MM1113', type: 'Truck', model: 'Tata Prima 4928.S' },
  { id: 'veh-002', registrationNumber: 'UP32NN2224', type: 'Truck', model: 'Ashok Leyland 4220' },
  { id: 'veh-003', registrationNumber: 'UP32PP3335', type: 'Truck', model: 'BharatBenz 3523R' },
  { id: 'veh-004', registrationNumber: 'UP32QQ4446', type: 'Trailer', model: 'Mahindra Blazo X 46' },
  { id: 'veh-005', registrationNumber: 'UP32RR5557', type: 'Truck', model: 'Eicher Pro 6049' },
]

const CATEGORIES: {
  id: Category
  labelKey: string
  descKey: string
  icon: typeof FileWarning
  color: string
  bg: string
}[] = [
  { id: 'challan', labelKey: 'challan', descKey: 'challanDesc', icon: FileWarning, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/50' },
  { id: 'case', labelKey: 'case', descKey: 'caseDesc', icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-50 dark:bg-red-950/50' },
  { id: 'rto', labelKey: 'rto', descKey: 'rtoDesc', icon: Building2, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/50' },
  { id: 'other', labelKey: 'other', descKey: 'otherDesc', icon: Scale, color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-950/40' },
]

export interface AddIncidentModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddIncidentModal({ isOpen, onClose }: AddIncidentModalProps) {
  const [step, setStep] = useState<'category' | 'form'>('category')
  const [category, setCategory] = useState<Category | null>(null)
  const [vehicleNumber, setVehicleNumber] = useState('')
  const [vehicleSearch, setVehicleSearch] = useState('')
  const [vehicleDropdownOpen, setVehicleDropdownOpen] = useState(false)
  const [challanNumber, setChallanNumber] = useState('')
  const [caseType, setCaseType] = useState('')
  const [incidentState, setIncidentState] = useState('')
  const [incidentCity, setIncidentCity] = useState('')
  const [roadName, setRoadName] = useState('')
  const [pin, setPin] = useState('')
  const [incidentReporterPhone, setIncidentReporterPhone] = useState('')
  const [authorityInvolved, setAuthorityInvolved] = useState('')
  const [incidentArea, setIncidentArea] = useState('')
  const [incidentReporterName, setIncidentReporterName] = useState('')
  const [rtoType, setRtoType] = useState('')
  const [description, setDescription] = useState('')
  const vehicleSearchRef = useRef<HTMLDivElement>(null)
  const vehicleDropdownRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()
  const t = translations[language]

  // Close vehicle dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        vehicleSearchRef.current && !vehicleSearchRef.current.contains(e.target as Node) &&
        (!vehicleDropdownRef.current || !vehicleDropdownRef.current.contains(e.target as Node))
      ) {
        setVehicleDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Track dropdown position for fixed rendering (avoids overflow clipping)
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({})

  useEffect(() => {
    if (!vehicleDropdownOpen || !vehicleSearchRef.current) return
    const updatePos = () => {
      const rect = vehicleSearchRef.current!.getBoundingClientRect()
      setDropdownStyle({ top: rect.bottom + 4, left: rect.left, width: rect.width })
    }
    updatePos()
    window.addEventListener('scroll', updatePos, true)
    window.addEventListener('resize', updatePos)
    return () => {
      window.removeEventListener('scroll', updatePos, true)
      window.removeEventListener('resize', updatePos)
    }
  }, [vehicleDropdownOpen])

  const filteredVehicles = FLEET_VEHICLES.filter((v) => {
    const query = vehicleSearch.replace(/\s/g, '').toUpperCase()
    if (!query) return true
    return (
      v.registrationNumber.replace(/\s/g, '').includes(query) ||
      v.model.toUpperCase().includes(query) ||
      v.type.toUpperCase().includes(query)
    )
  })

  if (!isOpen) return null

  function resetAndClose() {
    setStep('category')
    setCategory(null)
    setVehicleNumber('')
    setVehicleSearch('')
    setVehicleDropdownOpen(false)
    setChallanNumber('')
    setCaseType('')
    setIncidentState('')
    setIncidentCity('')
    setRoadName('')
    setPin('')
    setIncidentReporterPhone('')
    setAuthorityInvolved('')
    setIncidentArea('')
    setIncidentReporterName('')
    setRtoType('')
    setDescription('')
    onClose()
  }

  function handleBack() {
    setStep('category')
    setCategory(null)
    setVehicleNumber('')
    setVehicleSearch('')
    setVehicleDropdownOpen(false)
    setChallanNumber('')
    setCaseType('')
    setIncidentState('')
    setIncidentCity('')
    setRoadName('')
    setPin('')
    setIncidentReporterPhone('')
    setAuthorityInvolved('')
    setIncidentArea('')
    setIncidentReporterName('')
    setRtoType('')
    setDescription('')
  }

  function handleCategorySelect(cat: Category) {
    setCategory(cat)
    setStep('form')
  }

  function handleSubmit() {
    resetAndClose()
  }

  const vehicleValid = vehicleNumber.length > 0

  function isFormValid(): boolean {
    if (!vehicleValid) return false
    switch (category) {
      case 'challan':
        return challanNumber.trim().length > 0
      case 'case':
        return caseType !== '' && description.trim().length > 0
      case 'rto':
        return rtoType !== '' && description.trim().length > 0
      case 'other':
        return description.trim().length > 0
      default:
        return false
    }
  }

  const categoryMeta = CATEGORIES.find((c) => c.id === category)
  const headerTitle = step === 'category' ? t.addIncident : categoryMeta ? t[categoryMeta.labelKey] : t.addIncident
  const headerSubtitle = step === 'category' ? t.selectCategory : undefined

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-6">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70" onClick={resetAndClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl my-auto overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div className="flex items-center gap-3">
            {step === 'form' && (
              <button
                onClick={handleBack}
                className="p-1.5 -ml-1.5 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div>
              <h2 className="text-base font-bold text-stone-900 dark:text-stone-50">
                {headerTitle}
              </h2>
              {headerSubtitle && (
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  {headerSubtitle}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={resetAndClose}
            className="p-3 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 overflow-y-auto flex-1">
          {step === 'category' ? (
            /* Category Selection Grid */
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className="flex flex-col items-center gap-2.5 p-5 rounded-xl border border-stone-200 dark:border-stone-700 hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md bg-white dark:bg-stone-800/50 transition-all duration-200 text-center group"
                  >
                    <div className={`p-3 rounded-xl ${cat.bg}`}>
                      <Icon className={`w-5 h-5 ${cat.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-stone-900 dark:text-stone-50">{t[cat.labelKey]}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{t[cat.descKey]}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          ) : (
            /* Form */
            <div className="space-y-5">
              {/* Vehicle Number — searchable */}
              <div ref={vehicleSearchRef} className="relative">
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                  {t.vehicleNumber}
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500 pointer-events-none" />
                  <input
                    type="text"
                    value={vehicleNumber || vehicleSearch}
                    onChange={(e) => {
                      const val = e.target.value
                      setVehicleNumber('')
                      setVehicleSearch(val.toUpperCase())
                      setVehicleDropdownOpen(true)
                    }}
                    onFocus={() => setVehicleDropdownOpen(true)}
                    placeholder={t.searchVehicle}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-mono text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors tracking-wider"
                  />
                </div>

                {/* Dropdown — fixed so it escapes overflow-y-auto parent */}
                {vehicleDropdownOpen && (
                  <div ref={vehicleDropdownRef} style={dropdownStyle} className="fixed bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg shadow-lg max-h-48 overflow-y-auto z-[110]">
                    {filteredVehicles.length === 0 ? (
                      <div className="px-4 py-3 text-xs text-stone-400 dark:text-stone-500 text-center">
                        {t.noResults}
                      </div>
                    ) : (
                      filteredVehicles.map((v) => (
                        <button
                          key={v.id}
                          onClick={() => {
                            setVehicleNumber(v.registrationNumber)
                            setVehicleSearch('')
                            setVehicleDropdownOpen(false)
                          }}
                          className="w-full flex items-center px-4 py-2.5 text-left hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-colors"
                        >
                          <span className="text-sm font-mono font-semibold text-stone-900 dark:text-stone-100 tracking-wider">
                            {v.registrationNumber}
                          </span>
                          <span className="ml-2 text-xs text-stone-500 dark:text-stone-400">
                            {v.model}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>

              {/* Challan-specific fields */}
              {category === 'challan' && (
                <div>
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                    {t.challanNumber}
                  </label>
                  <input
                    type="text"
                    value={challanNumber}
                    onChange={(e) => setChallanNumber(e.target.value.toUpperCase())}
                    placeholder={t.challanNumberPlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-mono text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors tracking-wider"
                  />
                </div>
              )}

              {/* Case-specific fields */}
              {category === 'case' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                      {t.caseType}
                    </label>
                    <div className="relative">
                      <select
                        value={caseType}
                        onChange={(e) => setCaseType(e.target.value)}
                        className="w-full appearance-none px-3.5 pr-8 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors cursor-pointer"
                      >
                        <option value="">{t.selectCaseType}</option>
                        <option value="theft">{t.theft}</option>
                        <option value="detention">{t.detention}</option>
                        <option value="bail">{t.bail}</option>
                        <option value="accidents">{t.accidents}</option>
                        <option value="firs">{t.firs}</option>
                        <option value="superdari">{t.superdari}</option>
                        <option value="vehicle_impounding">{t.vehicleImpounding}</option>
                        <option value="eway_bill_issues">{t.ewayBillIssues}</option>
                        <option value="others">{t.others}</option>
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Incident State & City */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                        {t.incidentState}
                      </label>
                      <div className="relative">
                        <select
                          value={incidentState}
                          onChange={(e) => { setIncidentState(e.target.value); setIncidentCity('') }}
                          className="w-full appearance-none px-3.5 pr-8 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors cursor-pointer"
                        >
                          <option value="">{t.selectState}</option>
                          <option value="uttar_pradesh">Uttar Pradesh</option>
                          <option value="maharashtra">Maharashtra</option>
                          <option value="delhi">Delhi</option>
                          <option value="rajasthan">Rajasthan</option>
                          <option value="madhya_pradesh">Madhya Pradesh</option>
                          <option value="gujarat">Gujarat</option>
                          <option value="karnataka">Karnataka</option>
                          <option value="tamil_nadu">Tamil Nadu</option>
                          <option value="haryana">Haryana</option>
                          <option value="punjab">Punjab</option>
                          <option value="bihar">Bihar</option>
                          <option value="west_bengal">West Bengal</option>
                          <option value="telangana">Telangana</option>
                          <option value="andhra_pradesh">Andhra Pradesh</option>
                          <option value="chhattisgarh">Chhattisgarh</option>
                          <option value="jharkhand">Jharkhand</option>
                          <option value="odisha">Odisha</option>
                          <option value="kerala">Kerala</option>
                          <option value="assam">Assam</option>
                          <option value="uttarakhand">Uttarakhand</option>
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                        {t.incidentCity}
                      </label>
                      <div className="relative">
                        <select
                          value={incidentCity}
                          onChange={(e) => setIncidentCity(e.target.value)}
                          className="w-full appearance-none px-3.5 pr-8 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors cursor-pointer"
                        >
                          <option value="">{t.selectCity}</option>
                          {incidentState === 'uttar_pradesh' && (<><option value="lucknow">Lucknow</option><option value="kanpur">Kanpur</option><option value="varanasi">Varanasi</option><option value="agra">Agra</option><option value="noida">Noida</option><option value="prayagraj">Prayagraj</option></>)}
                          {incidentState === 'maharashtra' && (<><option value="mumbai">Mumbai</option><option value="pune">Pune</option><option value="nagpur">Nagpur</option><option value="nashik">Nashik</option><option value="thane">Thane</option></>)}
                          {incidentState === 'delhi' && (<><option value="new_delhi">New Delhi</option><option value="north_delhi">North Delhi</option><option value="south_delhi">South Delhi</option><option value="east_delhi">East Delhi</option><option value="west_delhi">West Delhi</option></>)}
                          {incidentState === 'rajasthan' && (<><option value="jaipur">Jaipur</option><option value="jodhpur">Jodhpur</option><option value="udaipur">Udaipur</option><option value="kota">Kota</option></>)}
                          {incidentState === 'madhya_pradesh' && (<><option value="bhopal">Bhopal</option><option value="indore">Indore</option><option value="gwalior">Gwalior</option><option value="jabalpur">Jabalpur</option></>)}
                          {incidentState === 'gujarat' && (<><option value="ahmedabad">Ahmedabad</option><option value="surat">Surat</option><option value="vadodara">Vadodara</option><option value="rajkot">Rajkot</option></>)}
                          {incidentState === 'karnataka' && (<><option value="bengaluru">Bengaluru</option><option value="mysuru">Mysuru</option><option value="hubli">Hubli</option><option value="mangaluru">Mangaluru</option></>)}
                          {incidentState === 'tamil_nadu' && (<><option value="chennai">Chennai</option><option value="coimbatore">Coimbatore</option><option value="madurai">Madurai</option><option value="salem">Salem</option></>)}
                          {incidentState === 'haryana' && (<><option value="gurugram">Gurugram</option><option value="faridabad">Faridabad</option><option value="karnal">Karnal</option><option value="panipat">Panipat</option></>)}
                          {incidentState === 'punjab' && (<><option value="chandigarh">Chandigarh</option><option value="ludhiana">Ludhiana</option><option value="amritsar">Amritsar</option><option value="jalandhar">Jalandhar</option></>)}
                          {incidentState === 'bihar' && (<><option value="patna">Patna</option><option value="gaya">Gaya</option><option value="muzaffarpur">Muzaffarpur</option></>)}
                          {incidentState === 'west_bengal' && (<><option value="kolkata">Kolkata</option><option value="howrah">Howrah</option><option value="durgapur">Durgapur</option></>)}
                          {incidentState === 'telangana' && (<><option value="hyderabad">Hyderabad</option><option value="warangal">Warangal</option><option value="karimnagar">Karimnagar</option></>)}
                          {incidentState === 'andhra_pradesh' && (<><option value="visakhapatnam">Visakhapatnam</option><option value="vijayawada">Vijayawada</option><option value="tirupati">Tirupati</option></>)}
                          {incidentState === 'chhattisgarh' && (<><option value="raipur">Raipur</option><option value="bilaspur">Bilaspur</option><option value="durg">Durg</option></>)}
                          {incidentState === 'jharkhand' && (<><option value="ranchi">Ranchi</option><option value="jamshedpur">Jamshedpur</option><option value="dhanbad">Dhanbad</option></>)}
                          {incidentState === 'odisha' && (<><option value="bhubaneswar">Bhubaneswar</option><option value="cuttack">Cuttack</option><option value="rourkela">Rourkela</option></>)}
                          {incidentState === 'kerala' && (<><option value="kochi">Kochi</option><option value="thiruvananthapuram">Thiruvananthapuram</option><option value="kozhikode">Kozhikode</option></>)}
                          {incidentState === 'assam' && (<><option value="guwahati">Guwahati</option><option value="silchar">Silchar</option><option value="dibrugarh">Dibrugarh</option></>)}
                          {incidentState === 'uttarakhand' && (<><option value="dehradun">Dehradun</option><option value="haridwar">Haridwar</option><option value="rishikesh">Rishikesh</option></>)}
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  {/* Authority Involved */}
                  <div>
                    <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                      {t.authorityInvolved}
                    </label>
                    <div className="relative">
                      <select
                        value={authorityInvolved}
                        onChange={(e) => setAuthorityInvolved(e.target.value)}
                        className="w-full appearance-none px-3.5 pr-8 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors cursor-pointer"
                      >
                        <option value="">{t.selectAuthority}</option>
                        <option value="police">Police</option>
                        <option value="rto">RTO</option>
                        <option value="court">Court</option>
                        <option value="traffic_police">Traffic Police</option>
                        <option value="transport_dept">Transport Department</option>
                        <option value="excise_dept">Excise Department</option>
                        <option value="other">Other</option>
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                    </div>
                  </div>

                  {/* Road Name & Pin */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                        {t.roadName}
                      </label>
                      <input
                        type="text"
                        value={roadName}
                        onChange={(e) => setRoadName(e.target.value)}
                        placeholder={t.roadNamePlaceholder}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                        {t.pin}
                      </label>
                      <input
                        type="text"
                        value={pin}
                        onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder={t.pinPlaceholder}
                        inputMode="numeric"
                        maxLength={6}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-mono text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors tracking-wider"
                      />
                    </div>
                  </div>

                  {/* Incident Area */}
                  <div>
                    <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                      {t.incidentArea}
                    </label>
                    <input
                      type="text"
                      value={incidentArea}
                      onChange={(e) => setIncidentArea(e.target.value)}
                      placeholder={t.incidentAreaPlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
                    />
                  </div>

                  {/* Incident Reporter Name */}
                  <div>
                    <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                      {t.incidentReporterName}
                    </label>
                    <input
                      type="text"
                      value={incidentReporterName}
                      onChange={(e) => setIncidentReporterName(e.target.value)}
                      placeholder={t.incidentReporterNamePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
                    />
                  </div>

                  {/* Incident Reporter Phone */}
                  <div>
                    <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                      {t.incidentReporterPhone}
                    </label>
                    <input
                      type="tel"
                      value={incidentReporterPhone}
                      onChange={(e) => setIncidentReporterPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder={t.incidentReporterPhonePlaceholder}
                      inputMode="tel"
                      maxLength={10}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-mono text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors tracking-wider"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                      {t.caseDetail}
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={t.caseDetailPlaceholder}
                      rows={3}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors resize-none"
                    />
                  </div>
                </>
              )}

              {/* RTO-specific fields */}
              {category === 'rto' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                      {t.rtoType}
                    </label>
                    <div className="relative">
                      <select
                        value={rtoType}
                        onChange={(e) => setRtoType(e.target.value)}
                        className="w-full appearance-none px-3.5 pr-8 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors cursor-pointer"
                      >
                        <option value="">{t.selectRtoType}</option>
                        <option value="rc_renewal">{t.rtoRcRenewal}</option>
                        <option value="rc_retrieval">{t.rtoRcRetrieval}</option>
                        <option value="license_retrieval">{t.rtoLicenseRetrieval}</option>
                        <option value="license_renewal">{t.rtoLicenseRenewal}</option>
                        <option value="fitness_retrieval">{t.rtoFitnessRetrieval}</option>
                        <option value="fitness_renewal">{t.rtoFitnessRenewal}</option>
                        <option value="ownership_transfer">{t.rtoOwnershipTransfer}</option>
                        <option value="number_updating">{t.rtoNumberUpdating}</option>
                        <option value="puc_renewal">{t.rtoPucRenewal}</option>
                        <option value="insurance_renewal">{t.rtoInsuranceRenewal}</option>
                        <option value="others">{t.rtoOthers}</option>
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                      {t.description}
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={t.descriptionPlaceholder}
                      rows={3}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors resize-none"
                    />
                  </div>
                </>
              )}

              {/* Other — just description */}
              {category === 'other' && (
                <div>
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                    {t.description}
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t.descriptionPlaceholder}
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors resize-none"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer — only on form step */}
        {step === 'form' && (
          <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-stone-200 dark:border-stone-800">
            <button
              onClick={resetAndClose}
              className="px-4 py-2 rounded-xl text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
            >
              {t.cancel}
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isFormValid()}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm ${
                isFormValid()
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-stone-500 cursor-not-allowed'
              }`}
            >
              {category === 'challan' ? t.payNow : t.submit}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
