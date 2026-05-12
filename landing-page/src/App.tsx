import { LangProvider } from '@/lib/i18n'
import { SiteHeader } from '@/components/SiteHeader'
import { Hero } from '@/sections/Hero'
import { TrustStrip } from '@/sections/TrustStrip'
import { RoadReality } from '@/sections/RoadReality'
import { WhatYouGet } from '@/sections/WhatYouGet'
import { HowItWorks } from '@/sections/HowItWorks'
import { DashboardPreview } from '@/sections/DashboardPreview'
import { Pricing } from '@/sections/Pricing'
import { UseCases } from '@/sections/UseCases'
import { WhySMEs } from '@/sections/WhySMEs'
import { Network } from '@/sections/Network'
import { Testimonials } from '@/sections/Testimonials'
import { FAQ } from '@/sections/FAQ'
import { FinalCTA } from '@/sections/FinalCTA'
import { Footer } from '@/sections/Footer'

export function App() {
  return (
    <LangProvider>
      <SiteHeader />
      <main>
        <Hero />
        <TrustStrip />
        <RoadReality />
        <WhatYouGet />
        <HowItWorks />
        <DashboardPreview />
        <Pricing />
        <UseCases />
        <WhySMEs />
        <Network />
        <Testimonials />
        <FAQ />
        <FinalCTA />
        <Footer />
      </main>
    </LangProvider>
  )
}
