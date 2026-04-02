import { useState, useEffect } from 'react'
import {
  Home,
  ShieldCheck,
  AlertTriangle,
  Truck,
  Settings,
  HelpCircle,
  BarChart3,
  BookOpen,
  Wallet,
  FileText,
  LayoutDashboard,
  IdCard,
  CreditCard,
  ClipboardList,
  Library,
} from 'lucide-react'
import { AppShell } from './components/AppShell'
import { LanguageProvider, useLanguage, type Language } from './components/LanguageContext'
import { getAllPreviewItems } from '@/lib/preview-helpers'

const navTranslations: Record<Language, Record<string, string>> = {
  en: {
    home: 'Home',
    compliance: 'Compliance',
    incidents: 'Incidents',
    vehiclesDrivers: 'Vehicles & Drivers',
    reports: 'Reports',
    apiCatalogue: 'API Catalogue',
    wallet: 'Wallet',
    proposals: 'Proposals',
    knowledgeBase: 'Knowledge Base',
    settings: 'Settings',
    help: 'Help',
  },
  hi: {
    home: 'होम',
    compliance: 'अनुपालन',
    incidents: 'घटनाएँ',
    vehiclesDrivers: 'वाहन और ड्राइवर',
    reports: 'रिपोर्ट',
    apiCatalogue: 'API कैटलॉग',
    wallet: 'वॉलेट',
    proposals: 'प्रस्ताव',
    knowledgeBase: 'ज्ञान आधार',
    settings: 'सेटिंग्स',
    help: 'सहायता',
  },
}

// Map from nav href to section screen design
// Format: sectionId:ScreenDesignName (matches the preview-helpers pattern)
const hrefToScreen: Record<string, { sectionId: string; screenName?: string; params?: Record<string, string> }> = {
  '/': { sectionId: 'home' },
  '/compliance': { sectionId: 'compliance-dashboard' },
  '/compliance/dl': { sectionId: 'compliance-dashboard', params: { view: 'dl' } },
  '/compliance/rc': { sectionId: 'compliance-dashboard', params: { view: 'rc' } },
  '/compliance/challans': { sectionId: 'compliance-dashboard', params: { view: 'challan' } },
  '/compliance/vehicle': { sectionId: 'compliance-dashboard', params: { view: 'vehicle' } },
  '/compliance/vehicle-report': { sectionId: 'compliance-dashboard', params: { view: 'vehicle-report' } },
  '/incidents': { sectionId: 'incident-management', screenName: 'IncidentManagement' },
  '/fleet': { sectionId: 'vehicle-and-driver-management', screenName: 'VehicleList' },
  '/api-catalogue': { sectionId: 'api-catalogue' },
  '/reports': { sectionId: 'reports', screenName: 'ReportsList' },
  '/wallet': { sectionId: 'wallet' },
  '/proposals': { sectionId: 'proposals', screenName: 'ProposalManagement' },
  '/knowledge-base': { sectionId: 'knowledge-base' },
  '/profile': { sectionId: 'my-profile' },
  '/settings': { sectionId: 'settings' },
}

// Build lookup from all preview items
const allItems = getAllPreviewItems()

function getScreenUrl(href: string): string | null {
  const mapping = hrefToScreen[href]
  if (!mapping) return null

  if (mapping.screenName) {
    // Find exact screen design
    const item = allItems.find(
      (i) =>
        i.type === 'screen' &&
        i.sectionId === mapping.sectionId &&
        i.screenName === mapping.screenName
    )
    return item?.iframeSrc || null
  }

  // Fallback: find first screen for the section
  const item = allItems.find(
    (i) => i.type === 'screen' && i.sectionId === mapping.sectionId
  )
  return item?.iframeSrc || null
}

function ShellContent() {
  const { language } = useLanguage()
  const t = navTranslations[language]
  const [activePath, setActivePath] = useState('/')
  const [extraParams, setExtraParams] = useState<Record<string, string>>({})

  // Listen for messages from embedded section iframes
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'logout' && event.data?.target) {
        if (window.parent !== window) {
          window.parent.postMessage(event.data, '*')
        } else {
          window.location.href = `/sections/onboarding-and-activation/screen-designs/OnboardingFlow/fullscreen`
        }
      }
      if (event.data?.type === 'navigate' && event.data?.href) {
        setActivePath(event.data.href)
        setExtraParams(event.data.params || {})
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const navigationItems = [
    { label: t.home, href: '/', icon: <Home className="w-5 h-5" />, isActive: activePath === '/' },
    { label: t.vehiclesDrivers, href: '/fleet', icon: <Truck className="w-5 h-5" />, isActive: activePath === '/fleet' },
    { label: t.incidents, href: '/incidents', icon: <AlertTriangle className="w-5 h-5" />, isActive: activePath === '/incidents' },
    { label: t.compliance, href: '/compliance', icon: <ShieldCheck className="w-5 h-5" />, isActive: activePath === '/compliance' || activePath.startsWith('/compliance/'), children: [
      { label: 'Fleet Overview', href: '/compliance', isActive: activePath === '/compliance' },
      { label: 'Fleet Challans', href: '/compliance/challans', isActive: activePath === '/compliance/challans' },
      { label: 'Vehicle RC', href: '/compliance/rc', isActive: activePath === '/compliance/rc' },
      { label: 'Driving License', href: '/compliance/dl', isActive: activePath === '/compliance/dl' },
      { label: 'Vehicle-wise Report', href: '/compliance/vehicle-report', isActive: activePath === '/compliance/vehicle-report' },
    ]},
    { label: t.reports, href: '/reports', icon: <BarChart3 className="w-5 h-5" />, isActive: activePath === '/reports' },
    { label: t.proposals, href: '/proposals', icon: <FileText className="w-5 h-5" />, isActive: activePath === '/proposals' },
    { label: t.apiCatalogue, href: '/api-catalogue', icon: <BookOpen className="w-5 h-5" />, isActive: activePath === '/api-catalogue' },
    { label: t.wallet, href: '/wallet', icon: <Wallet className="w-5 h-5" />, isActive: activePath === '/wallet' },
    { label: t.knowledgeBase, href: '/knowledge-base', icon: <Library className="w-5 h-5" />, isActive: activePath === '/knowledge-base' },
  ]

  const secondaryItems: typeof navigationItems = []

  const user = {
    name: 'Rajesh Kumar',
    plan: 'Fleet' as const,
  }

  const screenUrl = getScreenUrl(activePath)

  return (
    <AppShell
      navigationItems={navigationItems}
      secondaryItems={secondaryItems}
      user={user}
      onNavigate={(href) => {
        setActivePath(href)
        const mapping = hrefToScreen[href]
        setExtraParams(mapping?.params || {})
      }}
      onLogout={() => {
        if (window.parent !== window) {
          window.parent.postMessage({ type: 'logout', target: 'onboarding-and-activation:OnboardingFlow' }, '*')
        } else {
          window.location.href = '/sections/onboarding-and-activation/screen-designs/OnboardingFlow/fullscreen'
        }
      }}
    >
      {screenUrl ? (
        <iframe
          key={`${screenUrl}-${language}-${JSON.stringify(extraParams)}`}
          src={`${screenUrl}?embed=true&lang=${language}${Object.entries(extraParams).map(([k, v]) => `&${k}=${v}`).join('')}`}
          className="w-full border-0"
          style={{ height: 'calc(100vh - 4rem)' }}
          title="Section preview"
        />
      ) : (
        <div />
      )}
    </AppShell>
  )
}

export default function ShellPreview() {
  return (
    <LanguageProvider>
      <ShellContent />
    </LanguageProvider>
  )
}
