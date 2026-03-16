import { useState, useEffect } from 'react'
import {
  Home,
  ShieldCheck,
  AlertTriangle,
  FileWarning,
  Truck,
  Settings,
  HelpCircle,
  Briefcase,
  BarChart3,
} from 'lucide-react'
import { AppShell } from './components/AppShell'
import { getAllPreviewItems } from '@/lib/preview-helpers'

// Map from nav href to section screen design
// Format: sectionId:ScreenDesignName (matches the preview-helpers pattern)
const hrefToScreen: Record<string, { sectionId: string; screenName?: string }> = {
  '/': { sectionId: 'home' },
  '/compliance': { sectionId: 'compliance-dashboard' },
  '/incidents/challans': { sectionId: 'incident-management', screenName: 'ChallanList' },
  '/incidents/cases': { sectionId: 'incident-management', screenName: 'CaseList' },
  '/fleet': { sectionId: 'vehicle-and-driver-management', screenName: 'VehicleList' },
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

export default function ShellPreview() {
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
    { label: 'Home', href: '/', icon: <Home className="w-5 h-5" />, isActive: activePath === '/' },
    { label: 'Compliance', href: '/compliance', icon: <ShieldCheck className="w-5 h-5" />, isActive: activePath === '/compliance' },
    {
      label: 'Incidents',
      href: '/incidents',
      icon: <AlertTriangle className="w-5 h-5" />,
      isActive: activePath.startsWith('/incidents'),
      children: [
        {
          label: 'Challans',
          href: '/incidents/challans',
          icon: <FileWarning className="w-4 h-4" />,
          isActive: activePath === '/incidents/challans',
          badge: 5,
        },
        {
          label: 'Cases',
          href: '/incidents/cases',
          icon: <Briefcase className="w-4 h-4" />,
          isActive: activePath === '/incidents/cases',
          badge: 3,
        },
      ],
    },
    { label: 'Vehicles & Drivers', href: '/fleet', icon: <Truck className="w-5 h-5" />, isActive: activePath === '/fleet' },
    { label: 'Reports', href: '/reports', icon: <BarChart3 className="w-5 h-5" />, isActive: activePath === '/reports' },
  ]

  const secondaryItems = [
    { label: 'Settings', href: '/settings', icon: <Settings className="w-5 h-5" />, isActive: activePath === '/settings' },
    { label: 'Help', href: '/help', icon: <HelpCircle className="w-5 h-5" />, isActive: activePath === '/help' },
  ]

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
        setExtraParams({})
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
          key={`${screenUrl}-${JSON.stringify(extraParams)}`}
          src={`${screenUrl}?embed=true${Object.entries(extraParams).map(([k, v]) => `&${k}=${v}`).join('')}`}
          className="w-full h-full border-0 min-h-screen"
          title="Section preview"
        />
      ) : (
        <div />
      )}
    </AppShell>
  )
}
