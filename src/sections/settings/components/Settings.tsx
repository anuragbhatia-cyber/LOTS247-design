import { useState } from 'react'
import { createPortal } from 'react-dom'
import {
  Bell,
  Sliders,
  CreditCard,
  AlertTriangle,
  X,
  CheckCircle2,
  Lock,
  Download,
  Sparkles,
  Truck,
  Users,
  Check,
  Home,
  BarChart3,
  Wallet,
  Smartphone,
  Plus,
  Star,
  UserPlus,
  Shield,
  FileText,
  Calendar,
  Clock,
  Globe,
  Settings as SettingsIcon,
  MoreVertical,
  Mail,
  Phone,
  UserMinus,
} from 'lucide-react'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'
import type {
  SettingsProps,
  NotificationChannels,
  LandingPage,
  SubscriptionStatus,
  BillingStatus,
  AvailablePlan,
  PaymentMethodType,
  TeamMemberRole,
  TeamMemberStatus,
  ReportFrequency,
  ReportFormat,
} from '@/../product/sections/settings/types'

// =============================================================================
// Translations
// =============================================================================

const translations: Record<Language, Record<string, string>> = {
  en: {
    pageTitle: 'Settings',
    tabNotifications: 'Notifications',
    tabPreferences: 'Preferences',
    tabSubscription: 'Subscription',
    tabBilling: 'Accounts & Billing',
    tabTeam: 'Team Management',
    tabReports: 'Reports',
    tabGeneral: 'General',
    // Notification channels
    inApp: 'In-App',
    whatsapp: 'WhatsApp',
    email: 'Email',
    sms: 'SMS',
    quietHours: 'Quiet Hours',
    quietHoursDesc: 'Suppress non-critical notifications during this window. Emergency alerts (active incident escalations) are always delivered.',
    startTime: 'From',
    endTime: 'To',
    dailyDigest: 'Daily Compliance Digest',
    dailyDigestDesc: 'Receive a morning summary of your fleet\'s compliance status via WhatsApp',
    // Preferences
    defaultLandingPage: 'Default Landing Page',
    defaultLandingPageDesc: 'Choose which page to show when you log in',
    landingHome: 'Home',
    landingCompliance: 'Compliance Dashboard',
    landingIncidents: 'Incidents',
    sidebarBadges: 'Sidebar Vehicle Badges',
    sidebarBadgesDesc: 'Show vehicle count badges on sidebar navigation items',
    // Subscription
    currentPlan: 'Current Plan',
    changePlan: 'Change Plan',
    nextRenewal: 'Next Renewal',
    startedOn: 'Started',
    vehicles: 'Vehicles',
    users: 'Users',
    unlimited: 'Unlimited',
    planFeatures: 'Plan Features',
    payPerUse: 'Pay Per Use',
    billingHistory: 'Billing History',
    date: 'Date',
    description: 'Description',
    amount: 'Amount',
    status: 'Status',
    downloadInvoice: 'Download',
    of: 'of',
    noLimit: 'No limit',
    active: 'Active',
    expiring_soon: 'Expiring Soon',
    expired: 'Expired',
    paid: 'Paid',
    pending: 'Pending',
    failed: 'Failed',
    refunded: 'Refunded',
    currentPlanBadge: 'Current',
    selectPlan: 'Select Plan',
    perMonth: '/month',
    topSeller: 'Top Seller',
    paymentMethods: 'Payment Methods',
    addPaymentMethod: 'Add Method',
    defaultMethod: 'Default',
    setAsDefault: 'Set as Default',
    upi: 'UPI',
    card: 'Card',
    netbanking: 'Net Banking',
    wallet: 'Wallet',
    addPaymentTitle: 'Add Payment Method',
    paymentType: 'Payment Type',
    upiId: 'UPI ID',
    upiIdPlaceholder: 'yourname@upi',
    cardNumber: 'Card Number',
    cardNumberPlaceholder: '**** **** **** ****',
    cardHolderName: 'Cardholder Name',
    cardHolderPlaceholder: 'Name on card',
    expiryDate: 'Expiry',
    expiryPlaceholder: 'MM/YY',
    cvv: 'CVV',
    cvvPlaceholder: '***',
    bankName: 'Bank Name',
    bankNamePlaceholder: 'Select your bank',
    walletProvider: 'Wallet Provider',
    walletProviderPlaceholder: 'Select wallet',
    walletPhone: 'Registered Phone',
    walletPhonePlaceholder: '+91 98765 43210',
    makeDefault: 'Set as default payment method',
    addMethod: 'Add Method',
    // Team Management
    inviteMember: 'Invite Member',
    inviteTitle: 'Invite Team Member',
    nameLabel: 'Full Name',
    namePlaceholder: 'Enter full name',
    emailLabel: 'Email Address',
    emailPlaceholder: 'name@company.com',
    phoneLabel: 'Phone Number',
    phonePlaceholder: '+91 98765 43210',
    roleLabel: 'Role',
    sendInvite: 'Send Invite',
    cancel: 'Cancel',
    teamMembersTitle: 'Team Members',
    membersTab: 'Members',
    rolesTab: 'Roles',
    owner: 'Owner',
    admin: 'Admin',
    manager: 'Manager',
    viewer: 'Viewer',
    invited: 'Invited',
    deactivated: 'Deactivated',
    joined: 'Joined',
    removeMember: 'Remove',
    changeRole: 'Change Role',
    teamUsage: 'of',
    teamSeats: 'seats used',
    rolePermissions: 'Permissions',
    ownerDesc: 'Full access to all settings, billing, team management, and data. Cannot be removed.',
    adminDesc: 'Can manage vehicles, drivers, incidents, compliance, and team members. Cannot access billing.',
    managerDesc: 'Can view and manage assigned vehicles, raise proposals, and handle incidents.',
    viewerDesc: 'Read-only access to dashboards, compliance status, and reports.',
    ownerActivities: 'Manage billing & subscription,Add or remove team members,Change member roles,Access all settings,View & export all reports,Manage vehicles & drivers,Handle incidents & compliance',
    adminActivities: 'Add or remove team members,Manage vehicles & drivers,Handle incidents & challans,View compliance dashboard,Generate & export reports,Manage proposals',
    managerActivities: 'View assigned vehicles,Raise & track proposals,Report & manage incidents,View compliance status,Download reports',
    viewerActivities: 'View dashboards,View compliance status,View reports,View vehicle details',
    // Reports
    scheduledReports: 'Scheduled Reports',
    lastGenerated: 'Last generated',
    recipients: 'recipients',
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    pdf: 'PDF',
    csv: 'CSV',
    excel: 'Excel',
    // General
    languageSetting: 'Language',
    languageDesc: 'Choose your preferred language',
    english: 'English',
    hindi: 'हिन्दी',
    timezoneSetting: 'Timezone',
    timezoneDesc: 'All dates and times are displayed in this timezone',
    dateFormatSetting: 'Date Format',
    dateFormatDesc: 'Choose how dates are displayed',
    currencySetting: 'Currency',
    currencyDesc: 'Currency for all monetary values',
    dataRetention: 'Data Retention',
    dataRetentionDesc: 'How long to keep historical data',
    months: 'months',
    autoLogout: 'Auto Logout',
    autoLogoutDesc: 'Automatically log out after inactivity',
    minutes: 'minutes',
  },
  hi: {
    pageTitle: 'सेटिंग्स',
    tabNotifications: 'सूचनाएं',
    tabPreferences: 'प्राथमिकताएं',
    tabSubscription: 'सदस्यता',
    tabBilling: 'खाता और बिलिंग',
    tabTeam: 'टीम प्रबंधन',
    tabReports: 'रिपोर्ट्स',
    tabGeneral: 'सामान्य',
    inApp: 'इन-ऐप',
    whatsapp: 'WhatsApp',
    email: 'ईमेल',
    sms: 'SMS',
    quietHours: 'शांत समय',
    quietHoursDesc: 'इस अवधि में गैर-ज़रूरी सूचनाएं रोकें। आपातकालीन अलर्ट हमेशा भेजे जाएंगे।',
    startTime: 'से',
    endTime: 'तक',
    dailyDigest: 'दैनिक अनुपालन सारांश',
    dailyDigestDesc: 'WhatsApp पर अपने बेड़े की अनुपालन स्थिति का सुबह का सारांश प्राप्त करें',
    defaultLandingPage: 'डिफ़ॉल्ट लैंडिंग पेज',
    defaultLandingPageDesc: 'लॉगिन करने पर कौन सा पेज दिखाएं',
    landingHome: 'होम',
    landingCompliance: 'अनुपालन डैशबोर्ड',
    landingIncidents: 'घटनाएं',
    sidebarBadges: 'साइडबार वाहन बैज',
    sidebarBadgesDesc: 'साइडबार नेविगेशन में वाहन गणना बैज दिखाएं',
    currentPlan: 'वर्तमान प्लान',
    changePlan: 'प्लान बदलें',
    nextRenewal: 'अगला नवीनीकरण',
    startedOn: 'शुरू किया',
    vehicles: 'वाहन',
    users: 'उपयोगकर्ता',
    unlimited: 'असीमित',
    planFeatures: 'प्लान सुविधाएं',
    payPerUse: 'उपयोग के अनुसार',
    billingHistory: 'बिलिंग इतिहास',
    date: 'तारीख',
    description: 'विवरण',
    amount: 'राशि',
    status: 'स्थिति',
    downloadInvoice: 'डाउनलोड',
    of: 'में से',
    noLimit: 'कोई सीमा नहीं',
    active: 'सक्रिय',
    expiring_soon: 'जल्द समाप्त',
    expired: 'समाप्त',
    paid: 'भुगतान किया',
    pending: 'लंबित',
    failed: 'विफल',
    refunded: 'वापसी',
    currentPlanBadge: 'वर्तमान',
    selectPlan: 'प्लान चुनें',
    perMonth: '/माह',
    topSeller: 'टॉप सेलर',
    paymentMethods: 'भुगतान विधियां',
    addPaymentMethod: 'विधि जोड़ें',
    defaultMethod: 'डिफ़ॉल्ट',
    setAsDefault: 'डिफ़ॉल्ट बनाएं',
    upi: 'UPI',
    card: 'कार्ड',
    netbanking: 'नेट बैंकिंग',
    wallet: 'वॉलेट',
    addPaymentTitle: 'भुगतान विधि जोड़ें',
    paymentType: 'भुगतान प्रकार',
    upiId: 'UPI आईडी',
    upiIdPlaceholder: 'yourname@upi',
    cardNumber: 'कार्ड नंबर',
    cardNumberPlaceholder: '**** **** **** ****',
    cardHolderName: 'कार्डधारक का नाम',
    cardHolderPlaceholder: 'कार्ड पर नाम',
    expiryDate: 'समाप्ति',
    expiryPlaceholder: 'MM/YY',
    cvv: 'CVV',
    cvvPlaceholder: '***',
    bankName: 'बैंक का नाम',
    bankNamePlaceholder: 'अपना बैंक चुनें',
    walletProvider: 'वॉलेट प्रदाता',
    walletProviderPlaceholder: 'वॉलेट चुनें',
    walletPhone: 'पंजीकृत फ़ोन',
    walletPhonePlaceholder: '+91 98765 43210',
    makeDefault: 'डिफ़ॉल्ट भुगतान विधि बनाएं',
    addMethod: 'विधि जोड़ें',
    inviteMember: 'सदस्य आमंत्रित करें',
    inviteTitle: 'टीम सदस्य आमंत्रित करें',
    nameLabel: 'पूरा नाम',
    namePlaceholder: 'पूरा नाम दर्ज करें',
    emailLabel: 'ईमेल पता',
    emailPlaceholder: 'name@company.com',
    phoneLabel: 'फ़ोन नंबर',
    phonePlaceholder: '+91 98765 43210',
    roleLabel: 'भूमिका',
    sendInvite: 'आमंत्रण भेजें',
    cancel: 'रद्द करें',
    teamMembersTitle: 'टीम सदस्य',
    membersTab: 'सदस्य',
    rolesTab: 'भूमिकाएं',
    owner: 'मालिक',
    admin: 'व्यवस्थापक',
    manager: 'प्रबंधक',
    viewer: 'दर्शक',
    invited: 'आमंत्रित',
    deactivated: 'निष्क्रिय',
    joined: 'शामिल हुए',
    removeMember: 'हटाएं',
    changeRole: 'भूमिका बदलें',
    teamUsage: 'में से',
    teamSeats: 'सीटें उपयोग में',
    rolePermissions: 'अनुमतियां',
    ownerDesc: 'सभी सेटिंग्स, बिलिंग, टीम प्रबंधन और डेटा तक पूर्ण पहुंच। हटाया नहीं जा सकता।',
    adminDesc: 'वाहन, ड्राइवर, घटनाएं, अनुपालन और टीम सदस्यों का प्रबंधन कर सकते हैं। बिलिंग तक पहुंच नहीं।',
    managerDesc: 'सौंपे गए वाहनों को देख और प्रबंधित कर सकते हैं, प्रस्ताव उठा सकते हैं और घटनाओं को संभाल सकते हैं।',
    viewerDesc: 'डैशबोर्ड, अनुपालन स्थिति और रिपोर्ट तक केवल पढ़ने की पहुंच।',
    ownerActivities: 'बिलिंग और सदस्यता प्रबंधित करें,टीम सदस्य जोड़ें या हटाएं,सदस्य भूमिकाएं बदलें,सभी सेटिंग्स एक्सेस करें,सभी रिपोर्ट देखें और निर्यात करें,वाहन और ड्राइवर प्रबंधित करें,घटनाएं और अनुपालन संभालें',
    adminActivities: 'टीम सदस्य जोड़ें या हटाएं,वाहन और ड्राइवर प्रबंधित करें,घटनाएं और चालान संभालें,अनुपालन डैशबोर्ड देखें,रिपोर्ट बनाएं और निर्यात करें,प्रस्ताव प्रबंधित करें',
    managerActivities: 'सौंपे गए वाहन देखें,प्रस्ताव उठाएं और ट्रैक करें,घटनाएं रिपोर्ट और प्रबंधित करें,अनुपालन स्थिति देखें,रिपोर्ट डाउनलोड करें',
    viewerActivities: 'डैशबोर्ड देखें,अनुपालन स्थिति देखें,रिपोर्ट देखें,वाहन विवरण देखें',
    scheduledReports: 'निर्धारित रिपोर्ट्स',
    lastGenerated: 'अंतिम बार बनाई',
    recipients: 'प्राप्तकर्ता',
    daily: 'दैनिक',
    weekly: 'साप्ताहिक',
    monthly: 'मासिक',
    pdf: 'PDF',
    csv: 'CSV',
    excel: 'Excel',
    languageSetting: 'भाषा',
    languageDesc: 'अपनी पसंदीदा भाषा चुनें',
    english: 'English',
    hindi: 'हिन्दी',
    timezoneSetting: 'समय क्षेत्र',
    timezoneDesc: 'सभी तारीखें और समय इस समय क्षेत्र में दिखाए जाते हैं',
    dateFormatSetting: 'तारीख प्रारूप',
    dateFormatDesc: 'तारीखें कैसे दिखाई जाएं',
    currencySetting: 'मुद्रा',
    currencyDesc: 'सभी मौद्रिक मूल्यों के लिए मुद्रा',
    dataRetention: 'डेटा प्रतिधारण',
    dataRetentionDesc: 'ऐतिहासिक डेटा कितने समय तक रखें',
    months: 'महीने',
    autoLogout: 'स्वचालित लॉगआउट',
    autoLogoutDesc: 'निष्क्रियता के बाद स्वचालित रूप से लॉग आउट करें',
    minutes: 'मिनट',
  },
}

// =============================================================================
// Config Objects
// =============================================================================

const SUBSCRIPTION_STATUS_CONFIG: Record<SubscriptionStatus, { color: string; bg: string; border: string }> = {
  active: {
    color: 'text-emerald-700 dark:text-emerald-300',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    border: 'border-emerald-200 dark:border-emerald-800',
  },
  expiring_soon: {
    color: 'text-amber-700 dark:text-amber-300',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    border: 'border-amber-200 dark:border-amber-800',
  },
  expired: {
    color: 'text-red-700 dark:text-red-300',
    bg: 'bg-red-50 dark:bg-red-950/40',
    border: 'border-red-200 dark:border-red-800',
  },
}

const BILLING_STATUS_CONFIG: Record<BillingStatus, { color: string; bg: string }> = {
  paid: { color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-50 dark:bg-emerald-950/40' },
  pending: { color: 'text-amber-700 dark:text-amber-300', bg: 'bg-amber-50 dark:bg-amber-950/40' },
  failed: { color: 'text-red-700 dark:text-red-300', bg: 'bg-red-50 dark:bg-red-950/40' },
  refunded: { color: 'text-stone-600 dark:text-stone-400', bg: 'bg-stone-100 dark:bg-stone-800' },
}

const FEATURE_LABELS: Record<string, string> = {
  onCallResolution: '24/7 On-Call Resolution',
  onSiteResolution: 'On-Site Resolution',
  challanResolutionOnline: 'Online Challan Resolution',
  dashboardAccess: 'Dashboard Access',
  automatedReports: 'Automated Reports',
  personalizedReports: 'Personalized Reports',
  whatsappUpdates: 'WhatsApp Updates',
  accountManager: 'Dedicated Account Manager',
  bulkChallanResolution: 'Bulk Challan Resolution',
  apiIntegration: 'API Integration',
}

const PAYMENT_METHOD_ICONS: Record<PaymentMethodType, typeof CreditCard> = {
  upi: Smartphone,
  card: CreditCard,
  netbanking: Wallet,
  wallet: Wallet,
}

const CHANNEL_KEYS: (keyof NotificationChannels)[] = ['inApp', 'whatsapp']

const LANDING_OPTIONS: { key: LandingPage; icon: typeof Home }[] = [
  { key: 'home', icon: Home },
  { key: 'compliance', icon: BarChart3 },
  { key: 'incidents', icon: AlertTriangle },
]

const LANDING_LABELS: Record<LandingPage, string> = {
  home: 'landingHome',
  compliance: 'landingCompliance',
  incidents: 'landingIncidents',
}

// =============================================================================
// Sub-Components
// =============================================================================

type Tab = 'notifications' | 'preferences' | 'subscription' | 'billing' | 'team' | 'reports' | 'general'

const ROLE_CONFIG: Record<TeamMemberRole, { color: string; bg: string }> = {
  owner: { color: 'text-amber-700 dark:text-amber-300', bg: 'bg-amber-50 dark:bg-amber-950/40' },
  admin: { color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-50 dark:bg-emerald-950/40' },
  manager: { color: 'text-blue-700 dark:text-blue-300', bg: 'bg-blue-50 dark:bg-blue-950/40' },
  viewer: { color: 'text-stone-600 dark:text-stone-400', bg: 'bg-stone-100 dark:bg-stone-800' },
}

const MEMBER_STATUS_CONFIG: Record<TeamMemberStatus, { color: string; bg: string }> = {
  active: { color: 'text-emerald-700 dark:text-emerald-300', bg: 'bg-emerald-50 dark:bg-emerald-950/40' },
  invited: { color: 'text-amber-700 dark:text-amber-300', bg: 'bg-amber-50 dark:bg-amber-950/40' },
  deactivated: { color: 'text-stone-500 dark:text-stone-400', bg: 'bg-stone-100 dark:bg-stone-800' },
}

const FREQUENCY_CONFIG: Record<ReportFrequency, typeof Calendar> = {
  daily: Clock,
  weekly: Calendar,
  monthly: Calendar,
}

const FORMAT_ICONS: Record<ReportFormat, typeof FileText> = {
  pdf: FileText,
  csv: FileText,
  excel: FileText,
}

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
        enabled ? 'bg-emerald-500' : 'bg-stone-300 dark:bg-stone-600'
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform ${
          enabled ? 'translate-x-[18px]' : 'translate-x-[3px]'
        }`}
      />
    </button>
  )
}

function StatusBadge({ label, color, bg }: { label: string; color: string; bg: string }) {
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${color} ${bg}`}>
      {label}
    </span>
  )
}

function UsageMeter({ label, used, limit, t }: { label: string; used: number; limit: number | null; t: Record<string, string> }) {
  const percentage = limit ? Math.min((used / limit) * 100, 100) : 0
  const isNearLimit = limit ? percentage >= 80 : false

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-stone-700 dark:text-stone-300">{label}</span>
        <span className="text-sm text-stone-500 dark:text-stone-400">
          {used} {limit ? `${t.of} ${limit}` : `(${t.noLimit})`}
        </span>
      </div>
      {limit ? (
        <div className="h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${isNearLimit ? 'bg-amber-500' : 'bg-emerald-500'}`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      ) : (
        <div className="h-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full overflow-hidden">
          <div className="h-full w-full bg-emerald-500/20 rounded-full" />
        </div>
      )}
    </div>
  )
}

function PlanComparisonModal({
  plans,
  onSelect,
  onClose,
  t,
}: {
  plans: AvailablePlan[]
  onSelect: (planId: string) => void
  onClose: () => void
  t: Record<string, string>
}) {
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white dark:bg-stone-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-700 px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">{t.changePlan}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-xl border-2 p-5 transition-all ${
                plan.isCurrentPlan
                  ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/20'
                  : plan.isRecommended
                  ? 'border-amber-300 dark:border-amber-700 bg-amber-50/30 dark:bg-amber-950/10'
                  : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-2.5 right-4 px-2.5 py-0.5 bg-amber-500 text-white text-xs font-semibold rounded-full">{plan.badge}</span>
              )}
              {plan.isCurrentPlan && (
                <span className="absolute -top-2.5 left-4 px-2.5 py-0.5 bg-emerald-500 text-white text-xs font-semibold rounded-full">{t.currentPlanBadge}</span>
              )}
              <div className="mb-4">
                <h4 className="text-lg font-bold text-stone-900 dark:text-stone-100">{plan.name}</h4>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-2xl font-bold text-stone-900 dark:text-stone-100">{plan.price === 0 ? 'Free' : `₹${plan.price}`}</span>
                  {plan.price > 0 && <span className="text-sm text-stone-500 dark:text-stone-400">{t.perMonth}</span>}
                </div>
              </div>
              <div className="mb-4 space-y-1.5 text-sm text-stone-600 dark:text-stone-400">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-stone-400" />
                  <span>{plan.vehicleLimit ? `${plan.vehicleLimit} ${t.vehicles}` : `${t.unlimited} ${t.vehicles}`}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-stone-400" />
                  <span>{plan.userLimit} {t.users}</span>
                </div>
              </div>
              <ul className="space-y-1.5 mb-5">
                {plan.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-stone-600 dark:text-stone-400">
                    <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => { if (!plan.isCurrentPlan) onSelect(plan.id) }}
                disabled={plan.isCurrentPlan}
                className={`w-full py-2 rounded-xl text-sm font-medium transition-colors ${
                  plan.isCurrentPlan
                    ? 'bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500 cursor-not-allowed'
                    : plan.isRecommended
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:bg-stone-800 dark:hover:bg-stone-200'
                }`}
              >
                {plan.isCurrentPlan ? t.currentPlanBadge : t.selectPlan}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  )
}

// =============================================================================
// Main Component
// =============================================================================

export function Settings({
  notificationPreferences,
  quietHours,
  dailyDigest,
  appPreferences,
  subscription,
  billingHistory,
  availablePlans,
  paymentMethods,
  teamMembers,
  scheduledReports,
  generalSettings,
  isFleetOrBusiness = true,
  onToggleChannel,
  onUpdateQuietHours,
  onToggleDailyDigest,
  onChangeLandingPage,
  onToggleSidebarBadges,
  onChangePlan,
  onDownloadInvoice,
  onInviteMember,
  onChangeRole,
  onRemoveMember,
  onToggleReport,
  onUpdateGeneralSettings,
}: SettingsProps) {
  const { language } = useLanguage()
  const t = translations[language]

  const [activeTab, setActiveTab] = useState<Tab>('general')
  const [showPlanModal, setShowPlanModal] = useState(false)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false)
  // Track unchecked permissions per role (some start unchecked)
  const [uncheckedPerms, setUncheckedPerms] = useState<Record<string, Set<number>>>({
    admin: new Set([4, 5]),
    manager: new Set([2, 4]),
    viewer: new Set([1, 3]),
  })

  const sendOverlay = (show: boolean) => {
    window.parent.postMessage({ type: show ? 'showOverlay' : 'hideOverlay' }, '*')
  }
  const [newPaymentType, setNewPaymentType] = useState<PaymentMethodType>('upi')
  const [teamSubTab, setTeamSubTab] = useState<'members' | 'roles'>('members')
  const [openMemberMenu, setOpenMemberMenu] = useState<string | null>(null)
  const [localQuietHours, setLocalQuietHours] = useState(quietHours)
  const [localLanding, setLocalLanding] = useState(appPreferences.defaultLandingPage)
  const [localBadges, setLocalBadges] = useState(appPreferences.showSidebarBadges)
  const [localDigest, setLocalDigest] = useState(dailyDigest.enabled)

  const tabs = [
    { key: 'general' as Tab, label: t.tabGeneral, icon: SettingsIcon },
    { key: 'notifications' as Tab, label: t.tabNotifications, icon: Bell },
    { key: 'preferences' as Tab, label: t.tabPreferences, icon: Sliders },
    { key: 'team' as Tab, label: t.tabTeam, icon: Users },
    { key: 'reports' as Tab, label: t.tabReports, icon: FileText },
    { key: 'subscription' as Tab, label: t.tabSubscription, icon: CreditCard },
    { key: 'billing' as Tab, label: t.tabBilling, icon: Wallet },
  ]

  const subStatusConfig = SUBSCRIPTION_STATUS_CONFIG[subscription.status]

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 flex">
      {/* ================================================================= */}
      {/* Sidebar Navigation — hidden on mobile */}
      {/* ================================================================= */}
      <div className="w-64 lg:w-72 shrink-0 hidden md:block p-5 sm:p-6 lg:p-8">
        <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight mb-5">
          {t.pageTitle}
        </h1>
        <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-2 space-y-1 sticky top-6">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ================================================================= */}
      {/* Main Content */}
      {/* ================================================================= */}
      <div className="flex-1 min-w-0 p-5 sm:p-6 lg:p-8">
        {/* Mobile Header + Tab Switcher */}
        <div className="md:hidden mb-5">
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight mb-4">
            {t.pageTitle}
          </h1>
          <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-900 rounded-xl w-fit overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tab Content Card */}
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800">

          {/* ----- Notifications Tab ----- */}
          {activeTab === 'notifications' && (
            <div className="p-5 sm:p-6">
              {/* Notification Categories + Daily Digest as a unified list */}
              <div className="space-y-0 divide-y divide-stone-100 dark:divide-stone-800">
                {/* Daily Digest (Fleet/Business only) */}
                {isFleetOrBusiness && (
                  <div className="py-5 first:pt-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{t.dailyDigest}</p>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{t.dailyDigestDesc}</p>
                      </div>
                      <div className="shrink-0">
                        <Toggle
                          enabled={localDigest}
                          onChange={(v) => {
                            setLocalDigest(v)
                            onToggleDailyDigest?.(v)
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {notificationPreferences.map((pref) => {
                  return (
                    <div key={pref.id} className="py-5 last:pb-0">
                      <div className="flex items-start justify-between gap-4">
                        {/* Left: label + description */}
                        <div>
                          <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{pref.label}</p>
                          <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{pref.description}</p>
                        </div>
                        {/* Right: channel toggles */}
                        <div className="flex items-center gap-x-5 shrink-0">
                          {CHANNEL_KEYS.map((channel) => (
                            <label key={channel} className="flex items-center gap-1.5 cursor-pointer">
                              <Toggle
                                enabled={pref.channels[channel]}
                                onChange={(v) => onToggleChannel?.(pref.id, channel, v)}
                              />
                              <span className="text-xs font-medium text-stone-500 dark:text-stone-400 hidden lg:inline">
                                {t[channel]}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}

                {/* Quiet Hours */}
                <div className="py-5 last:pb-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{t.quietHours}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 max-w-md">{t.quietHoursDesc}</p>
                    </div>
                    <div className="shrink-0">
                      <Toggle
                        enabled={localQuietHours.enabled}
                        onChange={(v) => {
                          const updated = { ...localQuietHours, enabled: v }
                          setLocalQuietHours(updated)
                          onUpdateQuietHours?.(updated)
                        }}
                      />
                    </div>
                  </div>
                  {localQuietHours.enabled && (
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone-500 dark:text-stone-400">{t.startTime}</span>
                        <input
                          type="time"
                          value={localQuietHours.startTime}
                          onChange={(e) => {
                            const updated = { ...localQuietHours, startTime: e.target.value }
                            setLocalQuietHours(updated)
                            onUpdateQuietHours?.(updated)
                          }}
                          className="px-2.5 py-1.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                        />
                      </div>
                      <span className="text-stone-400">—</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-stone-500 dark:text-stone-400">{t.endTime}</span>
                        <input
                          type="time"
                          value={localQuietHours.endTime}
                          onChange={(e) => {
                            const updated = { ...localQuietHours, endTime: e.target.value }
                            setLocalQuietHours(updated)
                            onUpdateQuietHours?.(updated)
                          }}
                          className="px-2.5 py-1.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ----- Preferences Tab ----- */}
          {activeTab === 'preferences' && (
            <div className="p-5 sm:p-6">
              {/* Default Landing Page */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-1">
                  {t.defaultLandingPage}
                </h3>
                <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">{t.defaultLandingPageDesc}</p>
                <div className="flex flex-wrap gap-3">
                  {LANDING_OPTIONS.map((opt) => {
                    const LandingIcon = opt.icon
                    const isSelected = localLanding === opt.key
                    return (
                      <button
                        key={opt.key}
                        onClick={() => {
                          setLocalLanding(opt.key)
                          onChangeLandingPage?.(opt.key)
                        }}
                        className={`relative flex items-center gap-2.5 px-3 py-3 rounded-xl border-2 transition-all ${
                          isSelected
                            ? 'border-emerald-400 dark:border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20'
                            : 'border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-emerald-500 absolute top-1.5 right-1.5" />}
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-emerald-100 dark:bg-emerald-900/50'
                            : 'bg-stone-100 dark:bg-stone-800'
                        }`}>
                          <LandingIcon className={`w-4 h-4 ${
                            isSelected
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-stone-400 dark:text-stone-500'
                          }`} />
                        </div>
                        <span className={`text-sm font-medium whitespace-nowrap ${
                          isSelected
                            ? 'text-stone-900 dark:text-stone-100'
                            : 'text-stone-600 dark:text-stone-400'
                        }`}>
                          {t[LANDING_LABELS[opt.key]]}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Sidebar Badges (Fleet/Business only) */}
              {isFleetOrBusiness && (
                <div className="pt-6 border-t border-stone-100 dark:border-stone-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{t.sidebarBadges}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{t.sidebarBadgesDesc}</p>
                    </div>
                    <Toggle
                      enabled={localBadges}
                      onChange={(v) => {
                        setLocalBadges(v)
                        onToggleSidebarBadges?.(v)
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ----- Subscription & Billing Tab ----- */}
          {activeTab === 'subscription' && (
            <div className="p-5 sm:p-6">
              {/* Current Plan Card */}
              <div className={`rounded-xl border-2 p-5 mb-6 ${subStatusConfig.border} ${subStatusConfig.bg}`}>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1">
                      <h3 className="text-lg font-bold text-stone-900 dark:text-stone-100">
                        {subscription.planName}
                      </h3>
                      <StatusBadge
                        label={t[subscription.status]}
                        color={subStatusConfig.color}
                        bg="bg-white/60 dark:bg-stone-900/40"
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-stone-600 dark:text-stone-400">
                      <span>{t.startedOn}: {subscription.startDate}</span>
                      <span>{t.nextRenewal}: {subscription.nextRenewalDate}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => { setShowPlanModal(true); sendOverlay(true) }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shrink-0"
                  >
                    <Sparkles className="w-4 h-4" />
                    {t.changePlan}
                  </button>
                </div>
              </div>

              {/* Usage Meters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                <UsageMeter label={t.vehicles} used={subscription.vehiclesUsed} limit={subscription.vehicleLimit} t={t} />
                <UsageMeter label={t.users} used={subscription.usersUsed} limit={subscription.userLimit} t={t} />
              </div>

              {/* Plan Features */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-3">{t.planFeatures}</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {Object.entries(subscription.features).map(([key, value]) => {
                    const label = FEATURE_LABELS[key]
                    if (!label) return null
                    const isIncluded = value === true
                    const isPayPerUse = value === 'payPerUse'
                    const isNumeric = typeof value === 'number'
                    return (
                      <div key={key} className="flex items-center gap-2.5 py-1.5">
                        {isIncluded || isPayPerUse || isNumeric ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <Lock className="w-4 h-4 text-stone-300 dark:text-stone-600 shrink-0" />
                        )}
                        <span className={`text-sm ${
                          isIncluded || isPayPerUse || isNumeric
                            ? 'text-stone-700 dark:text-stone-300'
                            : 'text-stone-400 dark:text-stone-500'
                        }`}>
                          {label}
                          {isNumeric && ` (₹${value})`}
                          {isPayPerUse && (
                            <span className="text-xs text-amber-600 dark:text-amber-400 ml-1">({t.payPerUse})</span>
                          )}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>

            </div>
          )}

          {/* ----- Accounts & Billing Tab ----- */}
          {activeTab === 'billing' && (
            <div className="p-5 sm:p-6">
              {/* Payment Methods */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">{t.paymentMethods}</h3>
                  <button
                    onClick={() => { setNewPaymentType('upi'); setShowAddPaymentModal(true); sendOverlay(true) }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    {t.addPaymentMethod}
                  </button>
                </div>
                <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    const MethodIcon = PAYMENT_METHOD_ICONS[method.type]
                    return (
                      <div
                        key={method.id}
                        className="flex items-center justify-between p-4 rounded-xl border border-stone-200 dark:border-stone-700 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-stone-100 dark:bg-stone-800">
                            <MethodIcon className="w-5 h-5 text-stone-500 dark:text-stone-400" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{method.label}</p>
                              {method.isDefault && (
                                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/50">
                                  <Star className="w-2.5 h-2.5" />
                                  {t.defaultMethod}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 font-mono">{method.detail}</p>
                          </div>
                        </div>
                        {!method.isDefault && (
                          <button className="text-xs font-medium text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors">
                            {t.setAsDefault}
                          </button>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Billing History */}
              <div className="border-t border-stone-100 dark:border-stone-800 pt-6">
                <h4 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-4">{t.billingHistory}</h4>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-hidden rounded-lg border border-stone-200 dark:border-stone-700">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-stone-50 dark:bg-stone-800/60">
                        <th className="text-left px-4 py-2.5 font-medium text-stone-500 dark:text-stone-400">{t.date}</th>
                        <th className="text-left px-4 py-2.5 font-medium text-stone-500 dark:text-stone-400">{t.description}</th>
                        <th className="text-right px-4 py-2.5 font-medium text-stone-500 dark:text-stone-400">{t.amount}</th>
                        <th className="text-center px-4 py-2.5 font-medium text-stone-500 dark:text-stone-400">{t.status}</th>
                        <th className="text-center px-4 py-2.5 font-medium text-stone-500 dark:text-stone-400"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                      {billingHistory.map((record) => {
                        const billConfig = BILLING_STATUS_CONFIG[record.status]
                        return (
                          <tr key={record.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                            <td className="px-4 py-3 text-stone-600 dark:text-stone-400 whitespace-nowrap">{record.date}</td>
                            <td className="px-4 py-3 text-stone-900 dark:text-stone-100">{record.description}</td>
                            <td className="px-4 py-3 text-right font-mono text-stone-900 dark:text-stone-100">{record.amount}</td>
                            <td className="px-4 py-3 text-center">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${billConfig.color} ${billConfig.bg}`}>
                                {t[record.status]}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <button
                                onClick={() => onDownloadInvoice?.(record.invoiceId)}
                                className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                                title={t.downloadInvoice}
                              >
                                <Download className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-3">
                  {billingHistory.map((record) => {
                    const billConfig = BILLING_STATUS_CONFIG[record.status]
                    return (
                      <div key={record.id} className="rounded-lg border border-stone-200 dark:border-stone-700 p-3.5">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{record.description}</p>
                            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{record.date}</p>
                          </div>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${billConfig.color} ${billConfig.bg}`}>
                            {t[record.status]}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-mono font-medium text-stone-900 dark:text-stone-100">{record.amount}</span>
                          <button
                            onClick={() => onDownloadInvoice?.(record.invoiceId)}
                            className="flex items-center gap-1 text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                          >
                            <Download className="w-3.5 h-3.5" />
                            {t.downloadInvoice}
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ----- Team Management Tab ----- */}
          {activeTab === 'team' && (
            <div className="p-5 sm:p-6">
              {/* Sub-tabs: Members / Roles */}
              <div className="flex items-center gap-1 mb-5 border-b border-stone-200 dark:border-stone-800">
                <button
                  onClick={() => setTeamSubTab('members')}
                  className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                    teamSubTab === 'members'
                      ? 'border-emerald-600 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400'
                      : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                  }`}
                >
                  {t.membersTab}
                </button>
                <button
                  onClick={() => setTeamSubTab('roles')}
                  className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                    teamSubTab === 'roles'
                      ? 'border-emerald-600 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400'
                      : 'border-transparent text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                  }`}
                >
                  {t.rolesTab}
                </button>
              </div>

              {/* Members Sub-Tab */}
              {teamSubTab === 'members' && (
                <>
                  {/* Header with seat usage */}
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">{t.teamMembersTitle}</h3>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                        {teamMembers.length} {t.teamUsage} {subscription.userLimit} {t.teamSeats}
                      </p>
                    </div>
                    <button
                      onClick={() => { setShowInviteModal(true); sendOverlay(true) }}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      {t.inviteMember}
                    </button>
                  </div>

                  {/* Team Members List */}
                  <div className="space-y-0 divide-y divide-stone-100 dark:divide-stone-800">
                    {teamMembers.map((member) => {
                      const roleConfig = ROLE_CONFIG[member.role]
                      const statusConfig = MEMBER_STATUS_CONFIG[member.status]
                      return (
                        <div key={member.id} className="py-4 first:pt-0 last:pb-0">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0">
                                <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">{member.initials}</span>
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate">{member.name}</p>
                                  <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${roleConfig.color} ${roleConfig.bg}`}>
                                    {t[member.role]}
                                  </span>
                                  {member.status !== 'active' && (
                                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${statusConfig.color} ${statusConfig.bg}`}>
                                      {t[member.status]}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-3 mt-0.5">
                                  <span className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1 truncate">
                                    <Mail className="w-3 h-3 shrink-0" />
                                    {member.email}
                                  </span>
                                  <span className="text-xs text-stone-500 dark:text-stone-400 flex items-center gap-1 hidden sm:flex">
                                    <Phone className="w-3 h-3 shrink-0" />
                                    {member.phone}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-xs text-stone-400 dark:text-stone-500 hidden lg:inline">{t.joined} {member.joinedDate}</span>
                              {member.role !== 'owner' && (
                                <div className="relative">
                                  <button
                                    onClick={() => setOpenMemberMenu(openMemberMenu === member.id ? null : member.id)}
                                    className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                                  >
                                    <MoreVertical className="w-4 h-4" />
                                  </button>
                                  {openMemberMenu === member.id && (
                                    <>
                                      <div className="fixed inset-0 z-30" onClick={() => setOpenMemberMenu(null)} />
                                      <div className="absolute right-0 top-full mt-1 z-40 w-44 bg-white dark:bg-stone-800 rounded-xl shadow-lg border border-stone-200 dark:border-stone-700 py-1 overflow-hidden">
                                        <button
                                          onClick={() => { onRemoveMember?.(member.id); setOpenMemberMenu(null) }}
                                          className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                                        >
                                          <UserMinus className="w-4 h-4" />
                                          Remove Access
                                        </button>
                                      </div>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </>
              )}

              {/* Roles Sub-Tab */}
              {teamSubTab === 'roles' && (
                <div className="space-y-5">
                  {(['owner', 'admin', 'manager', 'viewer'] as TeamMemberRole[]).map((role) => {
                    const config = ROLE_CONFIG[role]
                    const activitiesKey = `${role}Activities` as string
                    const activities = (t[activitiesKey] || '').split(',')
                    return (
                      <div key={role} className="rounded-xl border border-stone-200 dark:border-stone-700 overflow-hidden">
                        <div className="px-5 py-4 bg-stone-50 dark:bg-stone-800/40 border-b border-stone-200 dark:border-stone-700">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider ${config.color} ${config.bg}`}>
                            {t[role]}
                          </span>
                        </div>
                        <div className="px-5 py-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {activities.map((activity: string, i: number) => {
                              const isChecked = !(uncheckedPerms[role]?.has(i))
                              return (
                                <label key={i} className="flex items-center gap-2.5 cursor-pointer select-none">
                                  <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => {
                                      setUncheckedPerms(prev => {
                                        const next = { ...prev }
                                        const set = new Set(prev[role] || [])
                                        if (set.has(i)) set.delete(i); else set.add(i)
                                        next[role] = set
                                        return next
                                      })
                                    }}
                                    className="w-4 h-4 rounded border-stone-300 dark:border-stone-600 text-emerald-600 focus:ring-emerald-500/30 cursor-pointer"
                                  />
                                  <span className="text-sm text-stone-600 dark:text-stone-400">{activity.trim()}</span>
                                </label>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* ----- Reports Tab ----- */}
          {activeTab === 'reports' && (
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100">{t.scheduledReports}</h3>
              </div>

              <div className="space-y-0 divide-y divide-stone-100 dark:divide-stone-800">
                {scheduledReports.map((report) => (
                  <div key={report.id} className="py-5 first:pt-0 last:pb-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{report.name}</p>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{report.description}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="inline-flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400">
                            <Calendar className="w-3 h-3" />
                            {t[report.frequency]}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400">
                            <FileText className="w-3 h-3" />
                            {t[report.format]}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400">
                            <Users className="w-3 h-3" />
                            {report.recipientCount} {t.recipients}
                          </span>
                          <span className="text-xs text-stone-400 dark:text-stone-500 hidden sm:inline">
                            {t.lastGenerated}: {report.lastGenerated}
                          </span>
                        </div>
                      </div>
                      <div className="shrink-0">
                        <Toggle
                          enabled={report.enabled}
                          onChange={(v) => onToggleReport?.(report.id, v)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ----- General Tab ----- */}
          {activeTab === 'general' && (
            <div className="p-5 sm:p-6">
              <div className="space-y-0 divide-y divide-stone-100 dark:divide-stone-800">
                {/* Language */}
                <div className="py-5 first:pt-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{t.languageSetting}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{t.languageDesc}</p>
                    </div>
                    <select
                      value={generalSettings.language}
                      onChange={(e) => onUpdateGeneralSettings?.({ language: e.target.value as 'en' | 'hi' })}
                      className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                    >
                      <option value="en">{t.english}</option>
                      <option value="hi">{t.hindi}</option>
                    </select>
                  </div>
                </div>

                {/* Timezone */}
                <div className="py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{t.timezoneSetting}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{t.timezoneDesc}</p>
                    </div>
                    <select
                      value={generalSettings.timezone}
                      onChange={(e) => onUpdateGeneralSettings?.({ timezone: e.target.value })}
                      className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                    >
                      <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                      <option value="UTC">UTC</option>
                      <option value="Asia/Dubai">Asia/Dubai (GST)</option>
                    </select>
                  </div>
                </div>

                {/* Date Format */}
                <div className="py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{t.dateFormatSetting}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{t.dateFormatDesc}</p>
                    </div>
                    <select
                      value={generalSettings.dateFormat}
                      onChange={(e) => onUpdateGeneralSettings?.({ dateFormat: e.target.value })}
                      className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                    >
                      <option value="DD MMM YYYY">DD MMM YYYY (31 Mar 2026)</option>
                      <option value="DD/MM/YYYY">DD/MM/YYYY (31/03/2026)</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY (03/31/2026)</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD (2026-03-31)</option>
                    </select>
                  </div>
                </div>

                {/* Data Retention */}
                <div className="py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{t.dataRetention}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{t.dataRetentionDesc}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={generalSettings.dataRetentionMonths}
                        onChange={(e) => onUpdateGeneralSettings?.({ dataRetentionMonths: Number(e.target.value) })}
                        className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                      >
                        <option value={12}>12 {t.months}</option>
                        <option value={24}>24 {t.months}</option>
                        <option value={36}>36 {t.months}</option>
                        <option value={60}>60 {t.months}</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Auto Logout */}
                <div className="py-5 last:pb-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{t.autoLogout}</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{t.autoLogoutDesc}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <select
                        value={generalSettings.autoLogoutMinutes}
                        onChange={(e) => onUpdateGeneralSettings?.({ autoLogoutMinutes: Number(e.target.value) })}
                        className="px-3 py-1.5 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                      >
                        <option value={15}>15 {t.minutes}</option>
                        <option value={30}>30 {t.minutes}</option>
                        <option value={60}>60 {t.minutes}</option>
                        <option value={120}>120 {t.minutes}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Plan Comparison Modal */}
      {showPlanModal && (
        <PlanComparisonModal
          plans={availablePlans}
          onSelect={(planId) => {
            onChangePlan?.(planId)
            setShowPlanModal(false)
            sendOverlay(false)
          }}
          onClose={() => { setShowPlanModal(false); sendOverlay(false) }}
          t={t}
        />
      )}

      {/* Add Payment Method Modal */}
      {showAddPaymentModal && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => { setShowAddPaymentModal(false); sendOverlay(false) }} />
          <div className="relative bg-white dark:bg-stone-900 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="border-b border-stone-200 dark:border-stone-700 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">{t.addPaymentTitle}</h3>
              <button onClick={() => { setShowAddPaymentModal(false); sendOverlay(false) }} className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {/* Payment Type Selector */}
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">{t.paymentType}</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['upi', 'card', 'netbanking', 'wallet'] as PaymentMethodType[]).map((type) => {
                    const Icon = PAYMENT_METHOD_ICONS[type]
                    return (
                      <button
                        key={type}
                        onClick={() => setNewPaymentType(type)}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-medium transition-all ${
                          newPaymentType === type
                            ? 'border-emerald-400 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'
                            : 'border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:border-stone-300 dark:hover:border-stone-600'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {t[type]}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* UPI Fields */}
              {newPaymentType === 'upi' && (
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">{t.upiId}</label>
                  <input
                    type="text"
                    placeholder={t.upiIdPlaceholder}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                  />
                </div>
              )}

              {/* Card Fields */}
              {newPaymentType === 'card' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">{t.cardNumber}</label>
                    <input
                      type="text"
                      placeholder={t.cardNumberPlaceholder}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">{t.cardHolderName}</label>
                    <input
                      type="text"
                      placeholder={t.cardHolderPlaceholder}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">{t.expiryDate}</label>
                      <input
                        type="text"
                        placeholder={t.expiryPlaceholder}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">{t.cvv}</label>
                      <input
                        type="password"
                        placeholder={t.cvvPlaceholder}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Net Banking Fields */}
              {newPaymentType === 'netbanking' && (
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">{t.bankName}</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600">
                    <option value="">{t.bankNamePlaceholder}</option>
                    <option value="sbi">State Bank of India</option>
                    <option value="hdfc">HDFC Bank</option>
                    <option value="icici">ICICI Bank</option>
                    <option value="axis">Axis Bank</option>
                    <option value="kotak">Kotak Mahindra Bank</option>
                    <option value="pnb">Punjab National Bank</option>
                  </select>
                </div>
              )}

              {/* Wallet Fields */}
              {newPaymentType === 'wallet' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">{t.walletProvider}</label>
                    <select className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600">
                      <option value="">{t.walletProviderPlaceholder}</option>
                      <option value="paytm">Paytm</option>
                      <option value="phonepe">PhonePe</option>
                      <option value="amazon">Amazon Pay</option>
                      <option value="mobikwik">MobiKwik</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">{t.walletPhone}</label>
                    <input
                      type="tel"
                      placeholder={t.walletPhonePlaceholder}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                    />
                  </div>
                </>
              )}

              {/* Set as Default Checkbox */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-stone-300 dark:border-stone-600 text-emerald-600 focus:ring-emerald-500/30" />
                <span className="text-sm text-stone-600 dark:text-stone-400">{t.makeDefault}</span>
              </label>
            </div>
            <div className="border-t border-stone-200 dark:border-stone-700 px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={() => { setShowAddPaymentModal(false); sendOverlay(false) }}
                className="px-4 py-2 rounded-xl text-sm font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                {t.cancel}
              </button>
              <button
                onClick={() => { setShowAddPaymentModal(false); sendOverlay(false) }}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
              >
                {t.addMethod}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Invite Member Modal */}
      {showInviteModal && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => { setShowInviteModal(false); sendOverlay(false) }} />
          <div className="relative bg-white dark:bg-stone-900 rounded-2xl shadow-2xl w-full max-w-md">
            <div className="border-b border-stone-200 dark:border-stone-700 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100">{t.inviteTitle}</h3>
              <button onClick={() => { setShowInviteModal(false); sendOverlay(false) }} className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">{t.nameLabel}</label>
                <input
                  type="text"
                  placeholder={t.namePlaceholder}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">{t.emailLabel}</label>
                <input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">{t.phoneLabel}</label>
                <input
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">{t.roleLabel}</label>
                <select className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600">
                  <option value="admin">{t.admin}</option>
                  <option value="manager">{t.manager}</option>
                  <option value="viewer">{t.viewer}</option>
                </select>
              </div>
            </div>
            <div className="border-t border-stone-200 dark:border-stone-700 px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={() => { setShowInviteModal(false); sendOverlay(false) }}
                className="px-4 py-2 rounded-xl text-sm font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                {t.cancel}
              </button>
              <button
                onClick={() => {
                  onInviteMember?.()
                  setShowInviteModal(false)
                  sendOverlay(false)
                }}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
              >
                {t.sendInvite}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
