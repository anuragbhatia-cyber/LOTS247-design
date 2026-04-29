import { useState } from 'react'
import { ArrowLeft, FileWarning, CheckCircle2, Calendar, MapPin, Truck, Copy } from 'lucide-react'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'

const translations: Record<Language, Record<string, string>> = {
  en: {
    challansOn: 'Challans on',
    pending: 'Pending',
    paid: 'Paid',
    totalOutstanding: 'Total Pending',
    payNow: 'Pay Now',
    paidOn: 'Paid on',
    noPending: 'No pending challans',
    noPendingDesc: 'This vehicle has no pending traffic challans.',
    noPaid: 'No paid challans',
    noPaidDesc: 'No challan payments found for this vehicle.',
    source: 'Source',
    back: 'Back',
  },
  hi: {
    challansOn: 'चालान —',
    pending: 'लंबित',
    paid: 'भुगतान किया',
    totalOutstanding: 'कुल बकाया',
    payNow: 'अभी भुगतान करें',
    paidOn: 'भुगतान तिथि',
    noPending: 'कोई लंबित चालान नहीं',
    noPendingDesc: 'इस वाहन पर कोई बकाया ट्रैफ़िक चालान नहीं है।',
    noPaid: 'कोई भुगतान किया गया चालान नहीं',
    noPaidDesc: 'इस वाहन के लिए कोई चालान भुगतान नहीं मिला।',
    source: 'स्रोत',
    back: 'वापस',
  },
}

type ChallanCategory = 'court' | 'online'

interface Challan {
  id: string
  challanNumber: string
  violationType: string
  amount: number
  issueDate: string
  location: string
  status: 'pending' | 'paid'
  source: string
  category: ChallanCategory
  paidDate?: string
}

const SAMPLE_CHALLANS: Challan[] = [
  {
    id: 'ch1',
    challanNumber: 'CH1213390290',
    violationType: 'Overspeeding',
    amount: 2000,
    issueDate: '2026-02-18',
    location: 'NH-48, Gurugram Toll Plaza',
    status: 'pending',
    source: 'Parivahan',
    category: 'court',
  },
  {
    id: 'ch2',
    challanNumber: 'CH1213390455',
    violationType: 'Red Light Violation',
    amount: 5000,
    issueDate: '2026-02-10',
    location: 'Mahipalpur Junction, Delhi',
    status: 'pending',
    source: 'Parivahan',
    category: 'online',
  },
  {
    id: 'ch3',
    challanNumber: 'CH1213390178',
    violationType: 'Overloading',
    amount: 20000,
    issueDate: '2026-01-25',
    location: 'Yamuna Expressway, KM 45',
    status: 'pending',
    source: 'Parivahan',
    category: 'court',
  },
  {
    id: 'ch4',
    challanNumber: 'CH1213389821',
    violationType: 'Parking Violation',
    amount: 1500,
    issueDate: '2025-11-08',
    location: 'Connaught Place, Delhi',
    status: 'paid',
    source: 'Parivahan',
    category: 'online',
    paidDate: '2025-11-20',
  },
  {
    id: 'ch5',
    challanNumber: 'CH1213389647',
    violationType: 'No Seatbelt',
    amount: 1000,
    issueDate: '2025-09-15',
    location: 'Noida Expressway, Sector 62',
    status: 'paid',
    source: 'Parivahan',
    category: 'online',
    paidDate: '2025-10-02',
  },
]

type ResultTab = 'pending' | 'paid'

function formatDate(dateStr: string, lang: Language): string {
  return new Date(dateStr).toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function formatCurrency(amount: number, lang: Language): string {
  return new Intl.NumberFormat(lang === 'hi' ? 'hi-IN' : 'en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export interface ChallanResultsViewProps {
  vehicleNumber: string
  onBack: () => void
}

export function ChallanResultsView({ vehicleNumber, onBack }: ChallanResultsViewProps) {
  const { language } = useLanguage()
  const t = translations[language]
  const [activeTab, setActiveTab] = useState<ResultTab>('pending')

  const challans = SAMPLE_CHALLANS
  const pendingChallans = challans.filter((c) => c.status === 'pending')
  const paidChallans = challans.filter((c) => c.status === 'paid')
  const totalOutstanding = pendingChallans.reduce((sum, c) => sum + c.amount, 0)

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
      <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-10">

        {/* Page Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-white dark:hover:bg-stone-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
            {t.challansOn}{' '}
            <span className="font-mono">{vehicleNumber}</span>
          </h1>
        </div>

        {/* Side-by-side layout: vertical tabs + content */}
        <div className="flex flex-col lg:flex-row gap-4">

          {/* Vertical Tabs Sidebar */}
          <div className="bg-white dark:bg-stone-900 rounded-xl p-3 flex flex-row lg:flex-col gap-3 lg:w-[240px] lg:flex-shrink-0 lg:self-start">
            <button
              onClick={() => setActiveTab('pending')}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors w-full ${
                activeTab === 'pending'
                  ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
              }`}
            >
              <FileWarning className="w-4 h-4" />
              {t.pending}
              <span className={`text-xs tabular-nums px-1.5 py-0.5 rounded-full ml-auto ${
                activeTab === 'pending'
                  ? 'bg-amber-200 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300'
                  : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400'
              }`}>
                {pendingChallans.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('paid')}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors w-full ${
                activeTab === 'paid'
                  ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                  : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              {t.paid}
              <span className={`text-xs tabular-nums px-1.5 py-0.5 rounded-full ml-auto ${
                activeTab === 'paid'
                  ? 'bg-emerald-200 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                  : 'bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400'
              }`}>
                {paidChallans.length}
              </span>
            </button>
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">

            {/* Vehicle Info Card */}
            <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5 sm:p-6 flex items-center gap-4">
              <div className="p-3 rounded-lg bg-stone-100 dark:bg-stone-800 flex-shrink-0">
                <Truck className="w-5 h-5 text-stone-500 dark:text-stone-400" />
              </div>
              <div className="min-w-0">
                <p className="text-lg font-bold font-mono text-stone-900 dark:text-stone-50 tracking-wide">{vehicleNumber}</p>
                <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">Tata Ace Gold · Reg. 2022</p>
              </div>
            </div>

            {/* Pending Tab */}
            {activeTab === 'pending' && (
              <div className="flex flex-col gap-4">
                {pendingChallans.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {pendingChallans.map((challan) => (
                        <div key={challan.id} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-1.5">
                              <p className="text-sm font-mono font-bold text-stone-900 dark:text-stone-100">{challan.challanNumber}</p>
                              <button
                                onClick={() => navigator.clipboard.writeText(challan.challanNumber)}
                                className="p-1 rounded hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <span className="text-lg font-bold text-red-600 dark:text-red-400 tabular-nums">
                              {formatCurrency(challan.amount, language)}
                            </span>
                          </div>
                          <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">{challan.violationType}</p>
                          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-stone-500 dark:text-stone-400 mt-2 mb-4">
                            <span className="inline-flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatDate(challan.issueDate, language)}
                            </span>
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5" />
                              {challan.location}
                            </span>
                          </div>
                          <div className="flex items-center justify-between pt-3 border-t border-stone-200 dark:border-stone-800">
                            {challan.category === 'court' ? (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400">
                                {language === 'hi' ? 'कोर्ट चालान' : 'Court Challans'}
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400">
                                {language === 'hi' ? 'ऑनलाइन चालान' : 'Online Challans'}
                              </span>
                            )}
                            <button className="px-5 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors shadow-sm">
                              {t.payNow}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                  </>
                ) : (
                  <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl py-16 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <p className="text-sm font-medium text-stone-900 dark:text-stone-50">{t.noPending}</p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{t.noPendingDesc}</p>
                  </div>
                )}
              </div>
            )}

            {/* Paid Tab */}
            {activeTab === 'paid' && (
              <div>
                {paidChallans.length > 0 ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {paidChallans.map((challan) => (
                      <div key={challan.id} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-5">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-mono font-bold text-stone-900 dark:text-stone-100">{challan.challanNumber}</p>
                            <button
                              onClick={() => navigator.clipboard.writeText(challan.challanNumber)}
                              className="p-1 rounded hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <span className="inline-flex items-center gap-1.5 text-lg font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                            <CheckCircle2 className="w-4 h-4" />
                            {formatCurrency(challan.amount, language)}
                          </span>
                        </div>
                        <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">{challan.violationType}</p>
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-sm text-stone-500 dark:text-stone-400 mt-2 mb-4">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(challan.issueDate, language)}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            {challan.location}
                          </span>
                        </div>
                        {challan.paidDate && (
                          <div className="pt-3 border-t border-stone-200 dark:border-stone-800">
                            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                              {t.paidOn}: {formatDate(challan.paidDate, language)}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl py-16 text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                      <FileWarning className="w-7 h-7 text-stone-400 dark:text-stone-500" />
                    </div>
                    <p className="text-sm font-medium text-stone-900 dark:text-stone-50">{t.noPaid}</p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{t.noPaidDesc}</p>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

      </div>

      {/* Sticky Bottom Bar — Total Outstanding */}
      {activeTab === 'pending' && pendingChallans.length > 0 && (
        <div className="sticky bottom-0 z-40 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
          <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-amber-700 dark:text-amber-400 font-medium tracking-wider">{language === 'hi' ? 'कुल चालान राशि' : 'Total Challan Amount'}</p>
              <p className="text-2xl font-bold text-stone-900 dark:text-stone-50 tabular-nums mt-0.5">
                {formatCurrency(totalOutstanding, language)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 text-sm font-medium transition-colors">
                {language === 'hi' ? 'प्रस्ताव भेजें' : 'Send Proposal'}
              </button>
              <button className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors shadow-sm">
                {t.payNow}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
