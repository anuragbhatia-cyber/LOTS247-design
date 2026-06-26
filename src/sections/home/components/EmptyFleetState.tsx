import { Plus, Upload, Truck, FileText, ShieldCheck, AlertTriangle } from 'lucide-react'
import { EmptyState } from '@/shell/components/EmptyState'
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

  return (
    <EmptyState
      icon={Truck}
      title={t.heading}
      description={t.subtext}
      primaryCta={{ label: t.addVehicle, onClick: onAddVehicle, icon: Plus }}
      secondaryCta={{ label: t.bulkUpload, onClick: onBulkUpload, icon: Upload }}
      featuresHeading={t.whatYouCanDo}
      features={[
        { icon: ShieldCheck, title: t.feature1Title, description: t.feature1Desc },
        { icon: FileText, title: t.feature2Title, description: t.feature2Desc },
        { icon: AlertTriangle, title: t.feature3Title, description: t.feature3Desc },
        { icon: Truck, title: t.feature4Title, description: t.feature4Desc },
      ]}
    />
  )
}
