import { Plus, Upload, Truck, FileText, ShieldCheck, AlertTriangle } from 'lucide-react'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'

const translations: Record<Language, {
  heading: string
  subtext: string
  addVehicle: string
  bulkUpload: string
  whatYouCanDo: string
  feature1Title: string
  feature1Desc: string
  feature2Title: string
  feature2Desc: string
  feature3Title: string
  feature3Desc: string
  feature4Title: string
  feature4Desc: string
}> = {
  en: {
    heading: 'Your fleet is empty',
    subtext: 'Add your first vehicle to start tracking compliance, challans, and incidents in one place.',
    addVehicle: 'Add Vehicle',
    bulkUpload: 'Bulk Upload',
    whatYouCanDo: 'What you can do once your fleet is set up',
    feature1Title: 'Track compliance',
    feature1Desc: 'RC, insurance, PUC, fitness & permit expiries at a glance',
    feature2Title: 'Manage challans',
    feature2Desc: 'Auto-fetch & settle traffic challans across India',
    feature3Title: 'Log incidents',
    feature3Desc: '24/7 on-call legal support for accidents & seizures',
    feature4Title: 'Driver insurance',
    feature4Desc: 'Personal accident cover for every driver you onboard',
  },
  hi: {
    heading: 'आपका बेड़ा खाली है',
    subtext: 'अनुपालन, चालान और घटनाओं को एक जगह ट्रैक करना शुरू करने के लिए अपना पहला वाहन जोड़ें।',
    addVehicle: 'वाहन जोड़ें',
    bulkUpload: 'बल्क अपलोड',
    whatYouCanDo: 'बेड़ा तैयार होने पर आप क्या कर सकते हैं',
    feature1Title: 'अनुपालन ट्रैक करें',
    feature1Desc: 'RC, बीमा, PUC, फिटनेस और परमिट की समाप्ति एक नज़र में',
    feature2Title: 'चालान प्रबंधन',
    feature2Desc: 'पूरे भारत में चालान स्वचालित रूप से प्राप्त करें और निपटाएं',
    feature3Title: 'घटनाएँ दर्ज करें',
    feature3Desc: 'दुर्घटनाओं और ज़ब्ती के लिए 24/7 कानूनी सहायता',
    feature4Title: 'ड्राइवर बीमा',
    feature4Desc: 'हर ड्राइवर के लिए व्यक्तिगत दुर्घटना कवर',
  },
}

interface EmptyFleetStateProps {
  onAddVehicle?: () => void
  onBulkUpload?: () => void
}

export function EmptyFleetState({ onAddVehicle, onBulkUpload }: EmptyFleetStateProps) {
  const { language } = useLanguage()
  const t = translations[language]

  const features = [
    { icon: ShieldCheck, title: t.feature1Title, desc: t.feature1Desc },
    { icon: FileText, title: t.feature2Title, desc: t.feature2Desc },
    { icon: AlertTriangle, title: t.feature3Title, desc: t.feature3Desc },
    { icon: Truck, title: t.feature4Title, desc: t.feature4Desc },
  ]

  return (
    <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden">
      {/* Hero section */}
      <div className="relative px-6 sm:px-10 pt-10 pb-8 text-center">
        {/* Subtle radial accent */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-30"
          style={{
            background:
              'radial-gradient(circle at 50% 0%, rgba(16,185,129,0.10) 0%, transparent 60%)',
          }}
        />

        <div className="relative">
          {/* Illustration */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-5 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
            <Truck className="w-12 h-12 sm:w-14 sm:h-14 text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
            {t.heading}
          </h2>
          <p className="mt-2 text-sm text-stone-500 dark:text-stone-400 max-w-md mx-auto leading-relaxed">
            {t.subtext}
          </p>

          {/* CTAs */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-2.5">
            <button
              onClick={onAddVehicle}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors shadow-sm shadow-emerald-600/20"
            >
              <Plus className="w-4 h-4" />
              {t.addVehicle}
            </button>
            <button
              onClick={onBulkUpload}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200 text-sm font-semibold transition-colors"
            >
              <Upload className="w-4 h-4" />
              {t.bulkUpload}
            </button>
          </div>
        </div>
      </div>

      {/* Feature grid */}
      <div className="border-t border-stone-200 dark:border-stone-800 px-6 sm:px-8 py-6 bg-stone-50 dark:bg-stone-950/40">
        <p className="text-[11px] uppercase tracking-wider font-semibold text-stone-500 dark:text-stone-400 text-center mb-5">
          {t.whatYouCanDo}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div
                key={i}
                className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4"
              >
                <div className="w-9 h-9 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                </div>
                <p className="text-sm font-semibold text-stone-900 dark:text-stone-50">
                  {feature.title}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
