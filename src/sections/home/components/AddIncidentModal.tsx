import { useState, useRef, useEffect } from 'react'
import {
  X,
  ArrowLeft,
  ChevronDown,
  FileWarning,
  ShieldAlert,
  Building2,
  HelpCircle,
  Search,
} from 'lucide-react'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'

type Category = 'challan' | 'case' | 'rto' | 'other'

const translations: Record<Language, Record<string, string>> = {
  en: {
    addIncident: 'Add Incident',
    selectCategory: 'Select the type of incident to report',
    challan: 'Challan',
    challanDesc: 'Report a traffic challan',
    case: 'Case',
    caseDesc: 'Report an accident or legal issue',
    rto: 'RTO',
    rtoDesc: 'RTO-related query',
    other: 'Other',
    otherDesc: 'Other incident',
    vehicleNumber: 'Vehicle Number',
    vehicleNumberPlaceholder: 'UP32MM1113',
    violationType: 'Violation Type',
    selectViolation: 'Select violation',
    overloading: 'Overloading',
    speeding: 'Speeding',
    parking: 'Parking',
    pollution: 'Pollution',
    seatbelt: 'Seatbelt',
    otherViolation: 'Other',
    amount: 'Amount (₹)',
    amountPlaceholder: '1500',
    caseType: 'Case Type',
    selectCaseType: 'Select case type',
    accident: 'Accident',
    vehicleDetention: 'Vehicle Detention',
    theft: 'Theft',
    impounding: 'Impounding',
    insuranceDispute: 'Insurance Dispute',
    legalComplaint: 'Legal Complaint',
    caseDetail: 'Case Detail',
    caseDetailPlaceholder: 'Describe the case in detail...',
    description: 'Description',
    descriptionPlaceholder: 'Describe the incident...',
    searchVehicle: 'Type to search vehicle...',
    noResults: 'No vehicles found',
    cancel: 'Cancel',
    submit: 'Submit',
    back: 'Back',
  },
  hi: {
    addIncident: 'घटना जोड़ें',
    selectCategory: 'रिपोर्ट करने के लिए घटना का प्रकार चुनें',
    challan: 'चालान',
    challanDesc: 'ट्रैफ़िक चालान की रिपोर्ट करें',
    case: 'केस',
    caseDesc: 'दुर्घटना या कानूनी मुद्दे की रिपोर्ट करें',
    rto: 'RTO',
    rtoDesc: 'RTO से संबंधित प्रश्न',
    other: 'अन्य',
    otherDesc: 'अन्य घटना',
    vehicleNumber: 'वाहन नंबर',
    vehicleNumberPlaceholder: 'उदा. UP32MM1113',
    violationType: 'उल्लंघन का प्रकार',
    selectViolation: 'उल्लंघन चुनें',
    overloading: 'ओवरलोडिंग',
    speeding: 'तेज़ गति',
    parking: 'पार्किंग',
    pollution: 'प्रदूषण',
    seatbelt: 'सीटबेल्ट',
    otherViolation: 'अन्य',
    amount: 'राशि (₹)',
    amountPlaceholder: '1500',
    caseType: 'केस का प्रकार',
    selectCaseType: 'केस प्रकार चुनें',
    accident: 'दुर्घटना',
    vehicleDetention: 'वाहन हिरासत',
    theft: 'चोरी',
    impounding: 'जब्ती',
    insuranceDispute: 'बीमा विवाद',
    legalComplaint: 'कानूनी शिकायत',
    caseDetail: 'केस विवरण',
    caseDetailPlaceholder: 'केस का विस्तृत विवरण दें...',
    description: 'विवरण',
    descriptionPlaceholder: 'घटना का विवरण दें...',
    searchVehicle: 'वाहन खोजने के लिए टाइप करें...',
    noResults: 'कोई वाहन नहीं मिला',
    cancel: 'रद्द करें',
    submit: 'सबमिट करें',
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
  { id: 'other', labelKey: 'other', descKey: 'otherDesc', icon: HelpCircle, color: 'text-stone-500', bg: 'bg-stone-100 dark:bg-stone-800' },
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
  const [violationType, setViolationType] = useState('')
  const [amount, setAmount] = useState('')
  const [caseType, setCaseType] = useState('')
  const [description, setDescription] = useState('')
  const vehicleSearchRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()
  const t = translations[language]

  // Close vehicle dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (vehicleSearchRef.current && !vehicleSearchRef.current.contains(e.target as Node)) {
        setVehicleDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
    setViolationType('')
    setAmount('')
    setCaseType('')
    setDescription('')
    onClose()
  }

  function handleBack() {
    setStep('category')
    setCategory(null)
    setVehicleNumber('')
    setVehicleSearch('')
    setVehicleDropdownOpen(false)
    setViolationType('')
    setAmount('')
    setCaseType('')
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
        return violationType !== '' && amount !== ''
      case 'case':
        return caseType !== '' && description.trim().length > 0
      case 'rto':
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 dark:bg-black/70" onClick={resetAndClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-3">
            {step === 'form' && (
              <button
                onClick={handleBack}
                className="p-1.5 -ml-1.5 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
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
            className="p-3 rounded-lg text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
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

                {/* Dropdown */}
                {vehicleDropdownOpen && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg shadow-lg max-h-48 overflow-y-auto z-10">
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
                <>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                      {t.violationType}
                    </label>
                    <div className="relative">
                      <select
                        value={violationType}
                        onChange={(e) => setViolationType(e.target.value)}
                        className="w-full appearance-none px-3.5 pr-8 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors cursor-pointer"
                      >
                        <option value="">{t.selectViolation}</option>
                        <option value="overloading">{t.overloading}</option>
                        <option value="speeding">{t.speeding}</option>
                        <option value="parking">{t.parking}</option>
                        <option value="pollution">{t.pollution}</option>
                        <option value="seatbelt">{t.seatbelt}</option>
                        <option value="other">{t.otherViolation}</option>
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                      {t.amount}
                    </label>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder={t.amountPlaceholder}
                      min={0}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-mono text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors tracking-wider"
                    />
                  </div>
                </>
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
                        <option value="accident">{t.accident}</option>
                        <option value="vehicle_detention">{t.vehicleDetention}</option>
                        <option value="theft">{t.theft}</option>
                        <option value="impounding">{t.impounding}</option>
                        <option value="insurance_dispute">{t.insuranceDispute}</option>
                        <option value="legal_complaint">{t.legalComplaint}</option>
                      </select>
                      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
                    </div>
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

              {/* RTO / Other — just description */}
              {(category === 'rto' || category === 'other') && (
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
          <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-stone-100 dark:border-stone-800">
            <button
              onClick={resetAndClose}
              className="px-4 py-2 rounded-lg text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
            >
              {t.cancel}
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isFormValid()}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm ${
                isFormValid()
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-stone-200 dark:bg-stone-700 text-stone-400 dark:text-stone-500 cursor-not-allowed'
              }`}
            >
              {t.submit}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
