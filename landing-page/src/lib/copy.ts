export type Lang = 'en' | 'hi'

export interface Copy {
  // Header
  navHome: string
  navFeatures: string
  navPricing: string
  navFAQ: string
  navPrimaryCTA: string
  navCallLabel: string
  navMenuLanguageLabel: string

  // Core promise
  corePromise: string

  // Section 01 — Hero
  heroEyebrow: string
  heroHeadline: string
  heroSub: string
  heroCTAPrimary: string
  heroCTASecondary: string
  heroVehiclePlaceholder: string
  heroMobilePlaceholder: string
  heroInputCTA: string
  heroTrustBadge1: string
  heroTrustBadge2: string
  heroTrustBadge3: string
  heroFormLabel: string
  heroFormCaption: string
  heroPressEyebrow: string
  heroScrollCue: string

  // Section 02 — Trust strip
  trustEyebrow: string
  trustHeadline: string
  trustItems: { label: string; sub: string }[]
  trustPartnersLabel: string
  trustPartners: string[]

  // Section 03 — Road reality
  realityEyebrow: string
  realityHeadline: string
  realitySub: string
  realityCards: { title: string; body: string; impact: string }[]
  realityCTA: string

  // Section 04 — What is UDrive
  whatEyebrow: string
  whatHeadline: string
  whatSub: string
  whatBullets: string[]
  whatCTA: string
  whatDemoLink: string

  // Section 05 — What you get (6 cards)
  getEyebrow: string
  getHeadline: string
  getSub: string
  getCards: { title: string; body: string; tag?: string; micro?: string }[]
  getCTA: string

  // Section 06 — How it works (4 steps)
  howEyebrow: string
  howHeadline: string
  howSub: string
  howSteps: { title: string; body: string; timing: string }[]
  howCTA: string

  // Section 07 — Dashboard preview
  dashEyebrow: string
  dashHeadline: string
  dashSub: string
  dashLocked: string
  dashCTA: string

  // Section 08 — Pricing
  pricingEyebrow: string
  pricingHeadline: string
  pricingSub: string
  pricingPlanName: string
  pricingPrice: string
  pricingPriceUnit: string
  pricingWalletNote: string
  pricingIncludes: string[]
  pricingCTA: string
  pricingFinePrint: string
  pricingNetValueLabel: string
  pricingNetValueHeadline: string
  pricingNetValueSub: string
  pricingWalletHeadline: string
  pricingWalletSubtext: string
  pricingCompareLabel: string
  pricingCompareRows: { label: string; value: string; highlight?: boolean }[]
  pricingTestimonialLabel: string
  pricingTestimonialQuote: string
  pricingTestimonialName: string
  pricingTestimonialRole: string
  pricingIncludesLabel: string
  pricingNoSetupBadge: string
  pricingCTAMicro: string
  pricingMonthlyEquivalent: string

  // Section 09 — Use cases
  casesEyebrow: string
  casesHeadline: string
  cases: { title: string; body: string; time?: string; action?: string; outcome?: string }[]
  casesCTA: string

  // Section 10 — Why SMEs
  smeEyebrow: string
  smeHeadline: string
  smeSub: string
  smeStats: { value: string; label: string }[]
  smeCTA: string

  // Section 11 — Network strength
  networkEyebrow: string
  networkHeadline: string
  networkSub: string
  networkPoints: string[]
  networkCTA: string
  networkCities: string[]
  networkLiveLabel: string
  networkLiveStat: string

  // Section 12 — Testimonials
  testEyebrow: string
  testHeadline: string
  testimonials: {
    quote: string
    name: string
    role: string
    location: string
    vehicles: string
    vehicleType: 'truck' | 'tempo' | 'cab'
    verified: boolean
    relationship: string
    image?: string
  }[]
  testVerifiedLabel: string
  testMoreVoicesLabel: string
  testMoreVoices: string[]

  // Section 13 — FAQ + Final CTA
  faqEyebrow: string
  faqHeadline: string
  faqs: { q: string; a: string; category: string }[]
  faqCategoryAbout: string
  faqCategoryPlan: string
  faqCategoryHow: string
  faqSupportEyebrow: string
  faqSupportHeadline: string
  faqSupportSub: string
  faqSupportWhatsapp: string
  faqSupportCall: string
  faqSupportHours: string
  faqHelpfulLabel: string
  finalEyebrow: string
  finalHeadline: string
  finalSub: string
  finalCTA: string
  finalWhatsapp: string
  finalFormLabel: string
  finalFormCaption: string
  finalTalkToUs: string
  finalUrgencyStats: { value: string; label: string }[]
  finalClosingArg: string
  finalSocialProof: string
  finalWordmark: string

  // Footer
  footerTagline: string
  footerProductCol: string
  footerCompanyCol: string
  footerSupportCol: string
  footerCopyright: string
  footerMadeIn: string
  footerCoverageStrip: string
  footerSecurePayments: string
  footerLanguageLabel: string
  footerProductLinks: { label: string; href: string }[]
  footerCompanyLinks: string[]
  footerHelpCenter: string
  footerTerms: string
  footerPrivacy: string
}

const en: Copy = {
  navHome: 'Home',
  navFeatures: 'Features',
  navPricing: 'Pricing',
  navFAQ: 'FAQ',
  navPrimaryCTA: 'Create My Dashboard',
  navCallLabel: 'Call us',
  navMenuLanguageLabel: 'Language',

  corePromise: 'No legal stoppage. Only movement.',

  // Hero
  heroEyebrow: 'UDrive by LOTS247 · For commercial vehicles',
  heroHeadline: 'Legal support for your commercial vehicle, whenever the road creates trouble',
  heroSub: 'Get 24×7 on-call legal support, challan assistance and a vehicle-wise dashboard. Stay ready before a roadside issue becomes a business stoppage.',
  heroCTAPrimary: 'Check Your Vehicle Now',
  heroCTASecondary: 'View Plan Details',
  heroVehiclePlaceholder: 'Vehicle number  e.g. DL01AB1234',
  heroMobilePlaceholder: '10-digit mobile number',
  heroInputCTA: 'Create My Dashboard',
  heroTrustBadge1: '24×7 legal support',
  heroTrustBadge2: 'Challan assistance',
  heroTrustBadge3: 'Vehicle-wise dashboard',
  heroFormLabel: 'Get started in 60 seconds',
  heroFormCaption: 'Secure OTP · No documents upfront · ₹999/vehicle/year',
  heroPressEyebrow: 'Trusted across India',
  heroScrollCue: 'See how it works',

  // Trust strip
  trustEyebrow: 'Trust',
  trustHeadline: 'A trusted legal support network for Indian roads.',
  trustItems: [
    { label: '75,000+', sub: 'lawyers in network' },
    { label: '98%',     sub: 'pin codes covered' },
    { label: '24×7',    sub: 'on-call support' },
    { label: '2 hr',    sub: 'on-ground response*' },
  ],
  trustPartnersLabel: 'Used by transporters & fleets across India',
  trustPartners: [
    'Bharat Logistics',
    'Vasudev Transports',
    'Sona Cargo',
    'Maruti Roadways',
    'LCV Express',
    'Delhi Tempo Assoc',
    'India Trucking Council',
    'Shree Balaji Carriers',
    'Konkan Freight Lines',
    'Apex Movers',
  ],

  // Road reality
  realityEyebrow: 'Road reality',
  realityHeadline: 'One roadside issue can stop your full day’s business.',
  realitySub: 'Police checks, document confusion, pending challans and roadside disputes delay vehicles and disturb the entire schedule.',
  realityCards: [
    { title: 'Police checking',  body: 'Vehicle stopped, papers questioned, driver unsure what to say next.', impact: '~₹6,000 average loss per delayed trip' },
    { title: 'Challan pressure', body: 'Pending challans piling up. Renewals and permits getting blocked.',   impact: 'Renewal blocked till challans cleared' },
    { title: 'Business delay',   body: 'One stuck trip cascades into missed deliveries and unhappy clients.', impact: '2 days lost = 1 client gone' },
  ],
  realityCTA: 'Create My Dashboard',

  // What is UDrive
  whatEyebrow: 'What is UDrive',
  whatHeadline: 'UDrive is legal and challan support for your commercial vehicle.',
  whatSub: 'Manage roadside legal issues, challan support and vehicle-related compliance from one simple dashboard — one vehicle, one plan, one tap to call a lawyer.',
  whatBullets: [
    'Vehicle-wise dashboard, not a one-size enterprise tool',
    'Direct line to a lawyer when the road creates trouble',
    'On-ground lawyer support available on actual basis',
  ],
  whatCTA: 'Start with Vehicle Number',
  whatDemoLink: 'Watch 45-sec demo',

  // What you get
  getEyebrow: 'What you get',
  getHeadline: 'Everything your vehicle needs to stay legally ready.',
  getSub: 'Built for owner-managed fleets — practical, vehicle-first, no enterprise jargon.',
  getCards: [
    { title: '24×7 On-Call Legal Support', body: 'Talk to legal support the moment your vehicle faces a roadside issue.', tag: 'Included', micro: 'Avg connect ~12 sec' },
    { title: 'Vehicle Dashboard',          body: 'Vehicle, driver, challan and support details — all in one place.', micro: 'Multi-vehicle · 1 view' },
    { title: 'Wallet Credits',             body: 'Use available credits for eligible services right from the dashboard.', micro: 'Up to ₹1,499 included' },
    { title: 'Challan Assistance',         body: 'Check, pay, contest and close challans with guided support.', micro: 'Online · Lok Adalat · Court' },
    { title: 'On-Ground Lawyer Support',   body: 'If physical support is needed, a lawyer is arranged on actual basis.', tag: 'Actual basis', micro: 'Avg arrival: 2 hr' },
  ],
  getCTA: 'Create My Dashboard',

  // How it works
  howEyebrow: 'How it works',
  howHeadline: 'Start in 3 simple steps.',
  howSub: 'No paperwork, no waiting. Get your vehicle on the dashboard in minutes.',
  howSteps: [
    { title: 'Enter vehicle details',    body: 'Add your vehicle number and mobile number above the fold.',  timing: '30 sec' },
    { title: 'Verify with OTP',          body: 'Quick mobile OTP — no documents required upfront.',          timing: 'Instant' },
    { title: 'Create your dashboard',    body: 'Your vehicle is registered and the dashboard is ready to use.', timing: 'Done' },
    { title: 'Activate support',         body: 'Pick the UDrive plan and unlock all support features.',      timing: '₹999/yr' },
  ],
  howCTA: 'Create My Dashboard',

  // Dashboard preview
  dashEyebrow: 'Dashboard preview',
  dashHeadline: 'Your vehicle dashboard, built for daily business movement.',
  dashSub: 'View registered vehicles, add driver details, track wallet credits, check challan status. Unlock everything after activation.',
  dashLocked: 'Unlock after activation',
  dashCTA: 'Create My Dashboard',

  // Pricing
  pricingEyebrow: 'Wallet + Pricing',
  pricingHeadline: 'Activate your vehicle and get wallet credits.',
  pricingSub: 'Vehicle-wise subscription. Pay once, stay covered for the year.',
  pricingPlanName: 'UDrive Vehicle Plan',
  pricingPrice: '₹999',
  pricingPriceUnit: 'per vehicle / year',
  pricingWalletNote: 'Wallet credits up to ₹1,499 added to your dashboard',
  pricingIncludes: [
    '24×7 on-call legal support',
    'Vehicle-wise dashboard access',
    'Challan check, pay & contest',
    'Driver & incident records',
    'On-ground lawyer (actual basis)',
    'WhatsApp updates',
  ],
  pricingCTA: 'Create My Dashboard',
  pricingFinePrint: '*Pricing indicative. Final values confirmed at activation. On-ground lawyer support charged on actual basis when required.',
  pricingNetValueLabel: 'Net value on day one',
  pricingNetValueHeadline: 'You pay ₹999, you get ₹1,499 back.',
  pricingNetValueSub: 'That’s ₹500 of wallet credit ahead of your spend — plus 24×7 legal support running in the background, all year.',
  pricingWalletHeadline: '₹1,499 wallet credit included',
  pricingWalletSubtext: 'Covers roughly 3 lawyer calls or 1 on-ground visit before you spend more.',
  pricingCompareLabel: 'What it would cost otherwise',
  pricingCompareRows: [
    { label: 'One private lawyer consult (typical)', value: '₹3,000' },
    { label: 'RTO challan resolution (typical)',     value: '₹1,500' },
    { label: 'UDrive — full year, per vehicle',      value: '₹999', highlight: true },
  ],
  pricingTestimonialLabel: 'From a UDrive owner',
  pricingTestimonialQuote: 'One call and the lawyer guided him through the whole thing. The truck moved by midnight.',
  pricingTestimonialName: 'Rakesh Yadav',
  pricingTestimonialRole: '8-truck transport · Delhi NCR',
  pricingIncludesLabel: 'What’s included',
  pricingNoSetupBadge: 'No setup fee · Cancel anytime',
  pricingCTAMicro: 'Takes ~60 seconds · Secure OTP',
  pricingMonthlyEquivalent: 'Works out to ~₹83 / month',

  // Use cases
  casesEyebrow: 'When to use UDrive',
  casesHeadline: 'Built for the moments that stop your day.',
  cases: [
    { title: 'Police checking on highway',      body: 'Quick call to a lawyer who guides the driver through the conversation.', time: '11:42 PM · Highway',    action: 'Direct lawyer line on the spot',  outcome: 'Truck moves in ~15 min' },
    { title: 'Pending challan blocking permit', body: 'Guided resolution — online, Lok Adalat or court — whatever fits.',       time: 'Renewal day · Office', action: 'Online · Lok Adalat · Court',     outcome: 'Permit unblocked' },
    { title: 'Minor accident or dispute',       body: 'On-ground lawyer arranged when needed. Driver is not alone.',            time: 'Saturday · Local road',action: 'On-ground lawyer dispatched',     outcome: 'Driver not alone' },
    { title: 'Document confusion at RTO',       body: 'Support to figure out what is required and where to file it.',           time: 'Monday morning · RTO', action: 'Step-by-step doc guidance',       outcome: 'No more guesswork' },
  ],
  casesCTA: 'Create My Dashboard',

  // Why SMEs
  smeEyebrow: 'Why SMEs',
  smeHeadline: 'For a small business, one stopped vehicle is not a small problem.',
  smeSub: 'Most SMEs don’t need a legal team. They need one call that resolves the issue and gets the vehicle moving again.',
  smeStats: [
    { value: '1 stopped trip',    label: 'can break a week’s revenue' },
    { value: '85%',                label: 'of roadside issues resolved on call' },
    { value: '1 dashboard',        label: 'covers vehicles, drivers and challans' },
  ],
  smeCTA: 'Create My Dashboard',

  // Network strength
  networkEyebrow: 'Network',
  networkHeadline: 'Backed by the LOTS247 legal support network.',
  networkSub: 'UDrive sits on top of the full LOTS247 platform — built and run by India’s largest legal support network for road and fleet operations.',
  networkPoints: [
    '75,000+ verified lawyers across the country',
    'Coverage in 98% of India’s pin codes',
    'Average 2-hour on-ground response time',
    'Dedicated support for commercial and fleet vehicles',
  ],
  networkCTA: 'Create My Dashboard',
  networkCities: [
    'DELHI', 'MUMBAI', 'BENGALURU', 'CHENNAI', 'KOLKATA', 'HYDERABAD',
    'AHMEDABAD', 'PUNE', 'JAIPUR', 'LUCKNOW', 'BHOPAL', 'PATNA',
    'RANCHI', 'BHUBANESWAR', 'GUWAHATI', 'COIMBATORE', 'CHANDIGARH', 'INDORE',
    'KOCHI', 'SURAT',
  ],
  networkLiveLabel: 'Live · mock',
  networkLiveStat: 'Currently 47 active calls',

  // Testimonials
  testEyebrow: 'Voices from the road',
  testHeadline: 'Built for businesses that cannot afford vehicle stoppage.',
  testimonials: [
    {
      quote: 'My driver was stopped near Sonipat at 11 PM. One call and the lawyer guided him through the whole thing. The truck moved by midnight.',
      name: 'Rakesh Yadav',
      role: 'Owner, transport business',
      location: 'Sonipat, NH-44',
      vehicles: '8 trucks',
      vehicleType: 'truck',
      verified: true,
      relationship: '14 months on UDrive · 9 lawyer calls',
      image: '/rakesh.jpg',
    },
    {
      quote: 'I used to lose two days every month chasing challans. Now I just open the dashboard, pay or contest, and it’s done.',
      name: 'Suman Patel',
      role: 'Proprietor, tempo fleet',
      location: 'Ahmedabad',
      vehicles: '12 tempos',
      vehicleType: 'tempo',
      verified: true,
      relationship: '8 months on UDrive · 22 challans cleared',
      image: '/suman.jpg',
    },
    {
      quote: 'For my size of business, hiring a lawyer was never possible. UDrive gives me that comfort at a price I can actually pay.',
      name: 'Mohammed Aslam',
      role: 'Cab operator',
      location: 'Hyderabad',
      vehicles: '1 cab',
      vehicleType: 'cab',
      verified: true,
      relationship: '6 months on UDrive · 3 lawyer calls',
      image: '/aslam.jpg',
    },
  ],
  testVerifiedLabel: 'Verified business',
  testMoreVoicesLabel: 'More voices from the road',
  testMoreVoices: [
    'Saved me 4 hours at the RTO last week. — Vikram, 3-truck owner, Jaipur',
    'Driver felt confident because lawyer was on call. — Nitin, tempo operator, Pune',
    'Challan was contested and reduced. Didn’t even take leave. — Arif, 2-truck owner, Lucknow',
    'For ₹999 a year, this is honestly a no-brainer. — Priya, school van fleet, Bengaluru',
    'Got an on-ground lawyer in under 2 hours. — Harpreet, 5-truck owner, Ludhiana',
  ],

  // FAQ
  faqEyebrow: 'FAQ',
  faqHeadline: 'Quick answers before you activate.',
  faqCategoryAbout: 'About UDrive',
  faqCategoryPlan: 'Plan & pricing',
  faqCategoryHow: 'How it works',
  faqSupportEyebrow: 'Still have questions?',
  faqSupportHeadline: 'Talk to a human.',
  faqSupportSub: 'Our support team handles your queries directly — no bots, no forms. Most owners get a reply in under 10 minutes.',
  faqSupportWhatsapp: 'WhatsApp us',
  faqSupportCall: 'Call us',
  faqSupportHours: 'Mon–Sat · 9 AM to 9 PM IST',
  faqHelpfulLabel: 'Was this helpful?',
  faqs: [
    { q: 'What is UDrive by LOTS247?',                       a: 'UDrive is a self-serve legal and challan support plan for commercial vehicle owners.', category: 'about' },
    { q: 'Who is this plan for?',                            a: 'Small fleet owners, commercial vehicle owners, transport operators and SMEs using vehicles for business.', category: 'about' },
    { q: 'Does UDrive work outside cities?',                 a: 'Yes. The network covers 98% of India’s pin codes — highways, semi-urban routes and remote checkpoints included. On-call legal support reaches your driver wherever they are.', category: 'about' },
    { q: 'Is the price per vehicle?',                        a: 'Yes. The subscription is planned vehicle-wise. Each vehicle needs to be activated separately.', category: 'plan' },
    { q: 'Is on-ground lawyer support included?',            a: 'On-ground lawyer support is available when required and is charged on actual basis.', category: 'plan' },
    { q: 'How do I cancel my subscription?',                 a: 'Cancel anytime from your dashboard or by writing to support. There’s no lock-in and no setup fee — you only pay for the vehicles you choose to keep active.', category: 'plan' },
    { q: 'What happens after I enter my vehicle number?',    a: 'Your dashboard is created after OTP verification. You can activate the plan to unlock support features.', category: 'how' },
    { q: 'Can I add multiple vehicles?',                     a: 'Yes — add more vehicles right from the dashboard. Each vehicle may need its own subscription.', category: 'how' },
    { q: 'What if the lawyer isn’t available?',           a: 'Calls are routed to the next available lawyer in the network — typically connecting in ~12 seconds. If your case needs a specialist, we escalate and call you back within minutes.', category: 'how' },
  ],

  // Final CTA
  finalEyebrow: 'Ready when you are',
  finalHeadline: 'Don’t wait for a roadside issue to start looking for legal help.',
  finalSub: 'Activate UDrive for your vehicle and keep legal, challan and roadside support ready.',
  finalCTA: 'Create My Dashboard',
  finalWhatsapp: 'WhatsApp support: +91 98xxx xxxxx',
  finalFormLabel: 'Activate your vehicle in 60 seconds',
  finalFormCaption: 'Secure OTP · No documents upfront · ₹1,499 wallet bonus on day one',
  finalTalkToUs: 'Or talk to our team',
  finalUrgencyStats: [
    { value: '12,400+', label: 'vehicles activated' },
    { value: '60 sec',  label: 'average activation' },
    { value: '98%',     label: 'pin codes covered' },
    { value: '₹1,499',  label: 'wallet bonus included' },
  ],
  finalClosingArg: 'The next roadside check won’t wait for your paperwork. Get the dashboard, the lawyer line and the wallet bonus in the time it takes to read this sentence.',
  finalSocialProof: '850+ fleets · ₹4.2 Cr+ legal cost saved · 75,000+ lawyers on call',
  finalWordmark: 'UDrive by LOTS247',

  // Footer
  footerTagline: 'LOTS247 keeps legal, challan and roadside support ready for your commercial vehicle, so one issue does not stop your business movement.',
  footerProductCol: 'Product',
  footerCompanyCol: 'Company',
  footerSupportCol: 'Support',
  footerCopyright: '© 2026 LOTS247. All rights reserved.',
  footerMadeIn: 'Made in India',
  footerCoverageStrip: 'Now serving 28 states · 8 UTs · 98% pin codes',
  footerSecurePayments: 'Secure payments',
  footerLanguageLabel: 'Language',
  footerProductLinks: [
    { label: 'Features',     href: '#what-you-get' },
    { label: 'Pricing',      href: '#pricing' },
    { label: 'How it works', href: '#what-you-get' },
    { label: 'FAQ',          href: '#faq' },
  ],
  footerCompanyLinks: ['About', 'Lawyer network', 'Press', 'Careers'],
  footerHelpCenter: 'Help center',
  footerTerms: 'Terms',
  footerPrivacy: 'Privacy',
}

const hi: Copy = {
  navHome: 'Home',
  navFeatures: 'Features',
  navPricing: 'Pricing',
  navFAQ: 'FAQ',
  navPrimaryCTA: 'Mera Dashboard Banayein',
  navCallLabel: 'Call karein',
  navMenuLanguageLabel: 'Bhasha',

  corePromise: 'No legal stoppage. Only movement.',

  // Hero
  heroEyebrow: 'UDrive by LOTS247 · Commercial gaadi ke liye',
  heroHeadline: 'Commercial gaadi ke liye legal support, jab bhi road par problem aaye',
  heroSub: 'UDrive by LOTS247 ke saath paaiye 24×7 on-call legal support, challan assistance aur vehicle-wise dashboard. Roadside issue business stoppage banne se pehle ready rahein.',
  heroCTAPrimary: 'Apni Gaadi Check Karein',
  heroCTASecondary: 'Plan Details Dekhein',
  heroVehiclePlaceholder: 'Vehicle number  jaise DL01AB1234',
  heroMobilePlaceholder: '10-digit mobile number',
  heroInputCTA: 'Dashboard Banayein',
  heroTrustBadge1: '24×7 legal support',
  heroTrustBadge2: 'Challan assistance',
  heroTrustBadge3: 'Vehicle-wise dashboard',
  heroFormLabel: '60 second mein start karein',
  heroFormCaption: 'Secure OTP · Koi document upfront nahi · ₹999/gaadi/saal',
  heroPressEyebrow: 'India bhar mein trusted',
  heroScrollCue: 'Kaise kaam karta hai dekhein',

  // Trust strip
  trustEyebrow: 'Trust',
  trustHeadline: 'Indian roads ke liye trusted legal support network.',
  trustItems: [
    { label: '75,000+', sub: 'lawyers network mein' },
    { label: '98%',     sub: 'pin codes covered' },
    { label: '24×7',    sub: 'on-call support' },
    { label: '2 ghante', sub: 'on-ground response*' },
  ],
  trustPartnersLabel: 'Transporters aur fleets ke beech bharose ka naam',
  trustPartners: [
    'Bharat Logistics',
    'Vasudev Transports',
    'Sona Cargo',
    'Maruti Roadways',
    'LCV Express',
    'Delhi Tempo Assoc',
    'India Trucking Council',
    'Shree Balaji Carriers',
    'Konkan Freight Lines',
    'Apex Movers',
  ],

  // Road reality
  realityEyebrow: 'Road reality',
  realityHeadline: 'Road par ek issue, poore din ka business rok sakta hai.',
  realitySub: 'Police checking, document confusion, pending challan ya roadside dispute se gaadi delay ho sakti hai aur poora schedule disturb ho jaata hai.',
  realityCards: [
    { title: 'Police checking',   body: 'Gaadi roki gayi, papers maange gaye, driver ko samajh nahi aaya kya bole.', impact: 'Average ₹6,000 nuksaan per atki trip' },
    { title: 'Challan pressure',  body: 'Pending challan badhte ja rahe hain. Renewal aur permit atak rahe hain.',   impact: 'Challan clear hone tak renewal block' },
    { title: 'Business delay',    body: 'Ek atki hui trip se delivery miss aur client unhappy.',                     impact: '2 din ka delay = 1 client gaya' },
  ],
  realityCTA: 'Mera Dashboard Banayein',

  // What is UDrive
  whatEyebrow: 'UDrive kya hai',
  whatHeadline: 'UDrive aapki commercial gaadi ke liye legal aur challan support hai.',
  whatSub: 'Roadside legal issues, challan support aur vehicle-related compliance — sab kuch ek simple dashboard se manage karein. Ek gaadi, ek plan, ek tap mein lawyer se baat.',
  whatBullets: [
    'Vehicle-wise dashboard, koi enterprise tool nahi',
    'Road par problem ho to seedha lawyer se baat',
    'On-ground lawyer support actual basis par available',
  ],
  whatCTA: 'Vehicle Number Se Start Karein',
  whatDemoLink: '45-second demo dekhein',

  // What you get
  getEyebrow: 'Kya milega',
  getHeadline: 'Aapki gaadi ko legally ready rakhne ke liye sab kuch.',
  getSub: 'Owner-managed fleets ke liye bana — practical, vehicle-first, koi enterprise jargon nahi.',
  getCards: [
    { title: '24×7 On-Call Legal Support', body: 'Roadside issue par turant legal support se baat karein.', tag: 'Included', micro: 'Avg connect ~12 sec' },
    { title: 'Vehicle Dashboard',          body: 'Vehicle, driver, challan aur support details — sab ek jagah.', micro: 'Multi-vehicle · 1 view' },
    { title: 'Wallet Credits',             body: 'Dashboard ke andar eligible services ke liye credits use karein.', micro: '₹1,499 tak included' },
    { title: 'Challan Assistance',         body: 'Challan check, pay, contest aur close — guided support ke saath.', micro: 'Online · Lok Adalat · Court' },
    { title: 'On-Ground Lawyer Support',   body: 'Physical support chahiye to lawyer location par arrange hoga, actual basis par.', tag: 'Actual basis', micro: 'Avg arrival: 2 ghante' },
  ],
  getCTA: 'Mera Dashboard Banayein',

  // How it works
  howEyebrow: 'Kaise kaam karta hai',
  howHeadline: '3 simple steps mein start karein.',
  howSub: 'Koi paperwork nahi, koi wait nahi. Minutes mein gaadi dashboard par.',
  howSteps: [
    { title: 'Vehicle details daalein',  body: 'Apna vehicle number aur mobile number upar form mein daalein.', timing: '30 sec' },
    { title: 'OTP verify karein',         body: 'Quick mobile OTP — koi document upfront nahi chahiye.',         timing: 'Instant' },
    { title: 'Dashboard banayein',        body: 'Gaadi register ho gayi, dashboard ready hai.',                  timing: 'Ho gaya' },
    { title: 'Support activate karein',   body: 'UDrive plan select karke saare support features unlock karein.', timing: '₹999/saal' },
  ],
  howCTA: 'Mera Dashboard Banayein',

  // Dashboard preview
  dashEyebrow: 'Dashboard preview',
  dashHeadline: 'Aapki gaadi ka dashboard, daily business movement ke liye.',
  dashSub: 'Registered vehicles dekhein, driver details add karein, wallet credits track karein, challan status check karein. Activation ke baad sab unlock ho jaata hai.',
  dashLocked: 'Activation ke baad unlock',
  dashCTA: 'Mera Dashboard Banayein',

  // Pricing
  pricingEyebrow: 'Wallet + Pricing',
  pricingHeadline: 'Vehicle activate karein aur wallet credits paayein.',
  pricingSub: 'Vehicle-wise subscription. Ek baar pay karein, saal bhar covered rahein.',
  pricingPlanName: 'UDrive Vehicle Plan',
  pricingPrice: '₹999',
  pricingPriceUnit: 'per vehicle / saal',
  pricingWalletNote: 'Dashboard mein ₹1,499 tak wallet credits add hote hain',
  pricingIncludes: [
    '24×7 on-call legal support',
    'Vehicle-wise dashboard access',
    'Challan check, pay aur contest',
    'Driver aur incident records',
    'On-ground lawyer (actual basis)',
    'WhatsApp updates',
  ],
  pricingCTA: 'Mera Dashboard Banayein',
  pricingFinePrint: '*Pricing indicative hai. Final values activation ke time confirm hongi. On-ground lawyer support zarurat padne par actual basis par charged hoga.',
  pricingNetValueLabel: 'Day one ki net value',
  pricingNetValueHeadline: 'Aap dete ho ₹999, wapas milta hai ₹1,499.',
  pricingNetValueSub: 'Yaani aapke kharch se ₹500 zyada ka wallet credit pehle hi mil jaata hai — saath mein 24×7 legal support saal bhar background mein.',
  pricingWalletHeadline: '₹1,499 wallet credit included',
  pricingWalletSubtext: 'Roughly 3 lawyer calls ya 1 on-ground visit cover ho jaati hai aage kharch karne se pehle.',
  pricingCompareLabel: 'Warna kitna lagta',
  pricingCompareRows: [
    { label: 'Ek private lawyer consult (typical)', value: '₹3,000' },
    { label: 'RTO challan resolution (typical)',    value: '₹1,500' },
    { label: 'UDrive — poora saal, per vehicle',    value: '₹999', highlight: true },
  ],
  pricingTestimonialLabel: 'Ek UDrive owner ki baat',
  pricingTestimonialQuote: 'Ek call aur lawyer ne use poori baat guide ki. Aadhi raat tak truck chal pada.',
  pricingTestimonialName: 'Rakesh Yadav',
  pricingTestimonialRole: '8-truck transport · Delhi NCR',
  pricingIncludesLabel: 'Plan mein kya hai',
  pricingNoSetupBadge: 'No setup fee · Kabhi bhi cancel',
  pricingCTAMicro: 'Lagta hai ~60 second · Secure OTP',
  pricingMonthlyEquivalent: 'Mahine ka lagbhag ~₹83',

  // Use cases
  casesEyebrow: 'Kab use karein',
  casesHeadline: 'Un situations ke liye bana hai jo aapka din rok deti hain.',
  cases: [
    { title: 'Highway par police checking',         body: 'Lawyer ko ek call — woh driver ko poori conversation guide karta hai.', time: 'Raat 11:42 · Highway',  action: 'Seedha lawyer line, mauke par',  outcome: 'Truck ~15 min mein chalu' },
    { title: 'Pending challan se permit atki hai',  body: 'Guided resolution — online, Lok Adalat ya court — jo fit baithe.',      time: 'Renewal din · Office',  action: 'Online · Lok Adalat · Court',    outcome: 'Permit unblock ho gaya' },
    { title: 'Minor accident ya dispute',           body: 'Zarurat padne par on-ground lawyer arrange hota hai. Driver akela nahi.',time: 'Saturday · Local road', action: 'On-ground lawyer dispatch',      outcome: 'Driver akela nahi' },
    { title: 'RTO par document confusion',          body: 'Samajhne mein support — kya chahiye aur kahaan file karna hai.',        time: 'Monday subah · RTO',    action: 'Step-by-step document guidance', outcome: 'Ab guess work nahi' },
  ],
  casesCTA: 'Mera Dashboard Banayein',

  // Why SMEs
  smeEyebrow: 'SMEs ke liye kyun',
  smeHeadline: 'Small business ke liye ek ruki hui gaadi chhoti problem nahi hoti.',
  smeSub: 'Zyaadatar SMEs ko legal team nahi chahiye. Unko ek call chahiye jo issue solve kare aur gaadi wapas chalu kar de.',
  smeStats: [
    { value: '1 ruki trip', label: 'hafte ka revenue tod sakti hai' },
    { value: '85%',         label: 'roadside issues call par solve' },
    { value: '1 dashboard', label: 'vehicles, drivers, challan ek jagah' },
  ],
  smeCTA: 'Mera Dashboard Banayein',

  // Network
  networkEyebrow: 'Network',
  networkHeadline: 'LOTS247 ke legal support network se backed.',
  networkSub: 'UDrive poore LOTS247 platform par chalta hai — India ka sabse bada legal support network road aur fleet operations ke liye.',
  networkPoints: [
    '75,000+ verified lawyers desh bhar mein',
    'India ke 98% pin codes mein coverage',
    'Average 2-ghante ka on-ground response time',
    'Commercial aur fleet vehicles ke liye dedicated support',
  ],
  networkCTA: 'Mera Dashboard Banayein',
  networkCities: [
    'DELHI', 'MUMBAI', 'BENGALURU', 'CHENNAI', 'KOLKATA', 'HYDERABAD',
    'AHMEDABAD', 'PUNE', 'JAIPUR', 'LUCKNOW', 'BHOPAL', 'PATNA',
    'RANCHI', 'BHUBANESWAR', 'GUWAHATI', 'COIMBATORE', 'CHANDIGARH', 'INDORE',
    'KOCHI', 'SURAT',
  ],
  networkLiveLabel: 'Live · mock',
  networkLiveStat: 'Abhi 47 active calls',

  // Testimonials
  testEyebrow: 'Road se aawazein',
  testHeadline: 'Un businesses ke liye bana hai jinke liye vehicle stoppage costly hota hai.',
  testimonials: [
    {
      quote: 'Mera driver Sonipat ke paas raat 11 baje roka gaya. Ek call aur lawyer ne use poori baat guide ki. Aadhi raat tak truck chal pada.',
      name: 'Rakesh Yadav',
      role: 'Owner, transport business',
      location: 'Sonipat, NH-44',
      vehicles: '8 truck',
      vehicleType: 'truck',
      verified: true,
      relationship: '14 mahine UDrive par · 9 lawyer calls',
      image: '/rakesh.jpg',
    },
    {
      quote: 'Pehle har mahine 2 din challan chase karne mein chale jaate the. Ab bas dashboard kholo, pay ya contest karo — kaam ho gaya.',
      name: 'Suman Patel',
      role: 'Proprietor, tempo fleet',
      location: 'Ahmedabad',
      vehicles: '12 tempo',
      vehicleType: 'tempo',
      verified: true,
      relationship: '8 mahine UDrive par · 22 challan clear',
      image: '/suman.jpg',
    },
    {
      quote: 'Mere size ke business ke liye lawyer hire karna possible nahi tha. UDrive woh comfort deta hai aur price bhi affordable hai.',
      name: 'Mohammed Aslam',
      role: 'Cab operator',
      location: 'Hyderabad',
      vehicles: '1 cab',
      vehicleType: 'cab',
      verified: true,
      relationship: '6 mahine UDrive par · 3 lawyer calls',
      image: '/aslam.jpg',
    },
  ],
  testVerifiedLabel: 'Verified business',
  testMoreVoicesLabel: 'Aur aawazein road se',
  testMoreVoices: [
    'Pichle hafte RTO par 4 ghante bach gaye. — Vikram, 3-truck owner, Jaipur',
    'Lawyer call par tha, driver confident raha. — Nitin, tempo operator, Pune',
    'Challan contest hua aur kam ho gaya. Chhutti bhi nahi leni padi. — Arif, 2-truck owner, Lucknow',
    '₹999 saal ka — honestly no-brainer hai. — Priya, school van fleet, Bengaluru',
    '2 ghante ke andar on-ground lawyer mila. — Harpreet, 5-truck owner, Ludhiana',
  ],

  // FAQ
  faqEyebrow: 'FAQ',
  faqHeadline: 'Activate karne se pehle quick jawaab.',
  faqCategoryAbout: 'UDrive ke baare mein',
  faqCategoryPlan: 'Plan aur pricing',
  faqCategoryHow: 'Kaise kaam karta hai',
  faqSupportEyebrow: 'Abhi bhi sawaal hain?',
  faqSupportHeadline: 'Insaan se baat karein.',
  faqSupportSub: 'Hamari support team seedha aapke sawaal handle karti hai — koi bot nahi, koi form nahi. Zyaadatar owners ko 10 minute ke andar reply mil jaata hai.',
  faqSupportWhatsapp: 'WhatsApp karein',
  faqSupportCall: 'Call karein',
  faqSupportHours: 'Som–Shani · subah 9 baje se raat 9 baje tak',
  faqHelpfulLabel: 'Kya yeh helpful tha?',
  faqs: [
    { q: 'UDrive by LOTS247 kya hai?',                          a: 'UDrive commercial vehicle owners ke liye self-serve legal aur challan support plan hai.', category: 'about' },
    { q: 'Yeh plan kiske liye hai?',                            a: 'Small fleet owners, commercial vehicle owners, transport operators aur SMEs ke liye hai.', category: 'about' },
    { q: 'Kya UDrive cities ke bahar bhi kaam karta hai?',      a: 'Haan. Hamara network India ke 98% pin codes cover karta hai — highway, semi-urban routes aur remote checkpoints sab include hain. On-call legal support driver tak pahunch jaata hai chahe woh kahin bhi ho.', category: 'about' },
    { q: 'Kya price per vehicle hai?',                          a: 'Haan, subscription vehicle-wise planned hai. Har vehicle ke liye alag activation hoga.', category: 'plan' },
    { q: 'Kya on-ground lawyer support included hai?',          a: 'On-ground lawyer support zarurat padne par available hota hai aur actual basis par charged hota hai.', category: 'plan' },
    { q: 'Subscription kaise cancel karein?',                   a: 'Kabhi bhi dashboard se ya support ko likhke cancel kar sakte hain. Koi lock-in nahi, koi setup fee nahi — bas un vehicles ke liye pay karein jinhe aap active rakhna chahte hain.', category: 'plan' },
    { q: 'Vehicle number daalne ke baad kya hota hai?',         a: 'OTP verification ke baad dashboard create hota hai. Plan activate karke support features unlock kar sakte hain.', category: 'how' },
    { q: 'Kya multiple vehicles add kar sakte hain?',           a: 'Haan, dashboard se aur vehicles add kiye ja sakte hain. Har vehicle ke liye separate subscription required ho sakta hai.', category: 'how' },
    { q: 'Agar lawyer available nahi hua to?',                  a: 'Call network ke next available lawyer ko route ho jaati hai — typically ~12 second mein connect. Agar case ke liye specialist chahiye to hum escalate karke minutes ke andar call back karte hain.', category: 'how' },
  ],

  // Final CTA
  finalEyebrow: 'Aap ready hain to hum bhi',
  finalHeadline: 'Roadside issue aane ke baad legal help dhoondhne ka wait mat karein.',
  finalSub: 'Apni gaadi ke liye UDrive activate karein aur legal, challan aur roadside support ready rakhein.',
  finalCTA: 'Mera Dashboard Banayein',
  finalWhatsapp: 'WhatsApp support: +91 98xxx xxxxx',
  finalFormLabel: '60 second mein apni gaadi activate karein',
  finalFormCaption: 'Secure OTP · Koi document upfront nahi · Day one par ₹1,499 wallet bonus',
  finalTalkToUs: 'Ya humari team se baat karein',
  finalUrgencyStats: [
    { value: '12,400+', label: 'vehicles activated' },
    { value: '60 sec',  label: 'average activation' },
    { value: '98%',     label: 'pin codes covered' },
    { value: '₹1,499',  label: 'wallet bonus included' },
  ],
  finalClosingArg: 'Agli roadside checking aapke paperwork ka wait nahi karegi. Itni der mein dashboard, lawyer line aur wallet bonus — sab ready ho jaata hai.',
  finalSocialProof: '850+ fleets · ₹4.2 Cr+ legal kharch bachaya · 75,000+ lawyers on call',
  finalWordmark: 'UDrive by LOTS247',

  // Footer
  footerTagline: 'LOTS247 aapki commercial gaadi ke liye legal, challan aur roadside support ready rakhta hai — taaki ek issue aapka business movement na roke.',
  footerProductCol: 'Product',
  footerCompanyCol: 'Company',
  footerSupportCol: 'Support',
  footerCopyright: '© 2026 LOTS247. Sabhi rights reserved.',
  footerMadeIn: 'Made in India',
  footerCoverageStrip: 'Ab 28 states · 8 UTs · 98% pin codes mein',
  footerSecurePayments: 'Secure payments',
  footerLanguageLabel: 'Bhasha',
  footerProductLinks: [
    { label: 'Features',          href: '#what-you-get' },
    { label: 'Pricing',           href: '#pricing' },
    { label: 'Kaise kaam karta',  href: '#what-you-get' },
    { label: 'FAQ',               href: '#faq' },
  ],
  footerCompanyLinks: ['About', 'Lawyer network', 'Press', 'Careers'],
  footerHelpCenter: 'Help center',
  footerTerms: 'Terms',
  footerPrivacy: 'Privacy',
}

export const copy: Record<Lang, Copy> = { en, hi }
