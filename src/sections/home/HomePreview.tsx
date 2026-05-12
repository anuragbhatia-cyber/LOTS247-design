import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import data from '@/../product/sections/home/data.json'
import { HomeView } from './components/HomeView'
import { HomeSkeleton } from './components/HomeSkeleton'

const ONBOARDING_FULLSCREEN = '/sections/onboarding-and-activation/screen-designs/OnboardingFlow/fullscreen'
const ONBOARDING_VIEW_PARAM = 'onboarding-and-activation:OnboardingFlow'

export default function HomePreview() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 900)
    return () => clearTimeout(t)
  }, [])

  const handleLogout = () => {
    if (window.parent !== window) {
      // Inside an iframe — notify the parent preview page
      window.parent.postMessage({ type: 'logout', target: ONBOARDING_VIEW_PARAM }, '*')
    } else {
      // Direct fullscreen tab — navigate via router
      navigate(ONBOARDING_FULLSCREEN)
    }
  }

  if (isLoading) return <HomeSkeleton />
  return (
    <HomeView
      subscriber={data.subscriber}
      subscription={data.subscription}
      stats={data.stats}
      complianceScore={data.complianceScore}
      alerts={data.alerts}
      onViewVehicles={() => {
        window.parent.postMessage({ type: 'navigate', href: '/fleet', params: { tab: 'vehicles' } }, '*')
      }}
      onViewDrivers={() => {
        window.parent.postMessage({ type: 'navigate', href: '/fleet', params: { tab: 'drivers' } }, '*')
      }}
      onViewChallans={() => console.log('Navigate to: Challans (pre-filtered)')}
      onViewIncidents={() => console.log('Navigate to: Incidents')}
      onViewSubscription={() => console.log('Navigate to: Subscription & Billing')}
      onAddIncident={() => console.log('Open: Add Incident workflow')}
      onAddVehicle={() => {
        window.parent.postMessage({ type: 'openAddVehicle' }, '*')
      }}
      onCallLawyer={() => console.log('Open: Call a Lawyer modal')}
      onAddDriver={() => {
        window.parent.postMessage({ type: 'openAddDriver' }, '*')
      }}
      onViewProfile={() => console.log('Navigate to: My Profile')}
      onLogout={handleLogout}
    />
  )
}
