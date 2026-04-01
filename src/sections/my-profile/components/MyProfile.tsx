import { useState, useMemo } from 'react'
import {
  User,
  Building2,
  ShieldCheck,
  CreditCard,
  Pencil,
  Camera,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileText,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Hash,
  XCircle,
  Info,
} from 'lucide-react'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'
import type {
  MyProfileProps,
  KycDocumentStatus,
  KycDocumentType,
  AccountType,
  KycStatus,
} from '@/../product/sections/my-profile/types'

// =============================================================================
// Translations
// =============================================================================

const translations: Record<Language, Record<string, string>> = {
  en: {
    pageTitle: 'My Profile',
    tabPersonal: 'Personal Info',
    tabOrganization: 'Organization',
    tabKyc: 'KYC & Verification',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
    uploadPhoto: 'Upload Photo',
    removePhoto: 'Remove',
    changePhoto: 'Change',
    fullName: 'Full Name',
    mobileNumber: 'Mobile Number',
    emailAddress: 'Email Address',
    dateOfBirth: 'Date of Birth',
    profilePhoto: 'Profile Photo',
    subscriberId: 'Subscriber ID',
    memberSince: 'Member Since',
    businessName: 'Business Name',
    businessType: 'Business Type',
    gstNumber: 'GST Number',
    cinNumber: 'CIN',
    registeredAddress: 'Registered Address',
    city: 'City',
    state: 'State',
    pincode: 'Pincode',
    documentsVerified: 'documents verified',
    uploadDocument: 'Upload',
    reupload: 'Re-upload',
    viewDocument: 'View',
    uploadedOn: 'Uploaded',
    verifiedOn: 'Verified',
    rejectionReason: 'Reason',
    individual: 'Individual',
    fleet: 'Fleet',
    business: 'Business',
    proprietorship: 'Proprietorship',
    llp: 'LLP',
    'private-limited': 'Private Limited',
    verified: 'Verified',
    partial: 'Partially Verified',
    unverified: 'Unverified',
    not_submitted: 'Not Submitted',
    pending_review: 'Under Review',
    rejected: 'Rejected',
    of: 'of',
  },
  hi: {
    pageTitle: 'मेरी प्रोफ़ाइल',
    tabPersonal: 'व्यक्तिगत जानकारी',
    tabOrganization: 'संगठन',
    tabKyc: 'KYC और सत्यापन',
    edit: 'संपादित करें',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    uploadPhoto: 'फ़ोटो अपलोड करें',
    removePhoto: 'हटाएं',
    changePhoto: 'बदलें',
    fullName: 'पूरा नाम',
    mobileNumber: 'मोबाइल नंबर',
    emailAddress: 'ईमेल पता',
    dateOfBirth: 'जन्म तिथि',
    profilePhoto: 'प्रोफ़ाइल फ़ोटो',
    subscriberId: 'सब्सक्राइबर आईडी',
    memberSince: 'सदस्य तब से',
    businessName: 'व्यवसाय का नाम',
    businessType: 'व्यवसाय प्रकार',
    gstNumber: 'GST नंबर',
    cinNumber: 'CIN',
    registeredAddress: 'पंजीकृत पता',
    city: 'शहर',
    state: 'राज्य',
    pincode: 'पिनकोड',
    documentsVerified: 'दस्तावेज़ सत्यापित',
    uploadDocument: 'अपलोड',
    reupload: 'पुनः अपलोड',
    viewDocument: 'देखें',
    uploadedOn: 'अपलोड किया',
    verifiedOn: 'सत्यापित',
    rejectionReason: 'कारण',
    individual: 'व्यक्तिगत',
    fleet: 'फ्लीट',
    business: 'व्यवसाय',
    proprietorship: 'प्रोपराइटरशिप',
    llp: 'LLP',
    'private-limited': 'प्राइवेट लिमिटेड',
    verified: 'सत्यापित',
    partial: 'आंशिक सत्यापित',
    unverified: 'असत्यापित',
    not_submitted: 'जमा नहीं',
    pending_review: 'समीक्षा में',
    rejected: 'अस्वीकृत',
    of: 'में से',
  },
}

// =============================================================================
// Config Objects
// =============================================================================

const ACCOUNT_TYPE_CONFIG: Record<AccountType, { color: string; bg: string }> = {
  individual: {
    color: 'text-stone-700 dark:text-stone-300',
    bg: 'bg-stone-100 dark:bg-stone-800',
  },
  fleet: {
    color: 'text-emerald-700 dark:text-emerald-300',
    bg: 'bg-emerald-50 dark:bg-emerald-950/50',
  },
  business: {
    color: 'text-amber-700 dark:text-amber-300',
    bg: 'bg-amber-50 dark:bg-amber-950/50',
  },
}

const KYC_STATUS_CONFIG: Record<KycStatus, { color: string; bg: string; icon: typeof CheckCircle2 }> = {
  verified: {
    color: 'text-emerald-700 dark:text-emerald-300',
    bg: 'bg-emerald-50 dark:bg-emerald-950/50',
    icon: CheckCircle2,
  },
  partial: {
    color: 'text-amber-700 dark:text-amber-300',
    bg: 'bg-amber-50 dark:bg-amber-950/50',
    icon: AlertTriangle,
  },
  unverified: {
    color: 'text-red-700 dark:text-red-300',
    bg: 'bg-red-50 dark:bg-red-950/50',
    icon: XCircle,
  },
}

const DOC_STATUS_CONFIG: Record<KycDocumentStatus, { color: string; bg: string; icon: typeof CheckCircle2; textColor: string }> = {
  verified: {
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    icon: CheckCircle2,
    textColor: 'text-emerald-700 dark:text-emerald-300',
  },
  pending_review: {
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    icon: Clock,
    textColor: 'text-amber-700 dark:text-amber-300',
  },
  rejected: {
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-950/40',
    icon: XCircle,
    textColor: 'text-red-700 dark:text-red-300',
  },
  not_submitted: {
    color: 'text-stone-400 dark:text-stone-500',
    bg: 'bg-stone-50 dark:bg-stone-900',
    icon: FileText,
    textColor: 'text-stone-500 dark:text-stone-400',
  },
}

const DOC_TYPE_ICONS: Record<KycDocumentType, typeof User> = {
  aadhaar: User,
  pan: CreditCard,
  gst_certificate: Building2,
  company_registration: FileText,
}

// =============================================================================
// Sub-Components
// =============================================================================

type Tab = 'personal' | 'organization' | 'kyc'

function formatPhone(phone: string): string {
  if (phone.startsWith('91') && phone.length === 12) {
    const number = phone.slice(2)
    return `+91 ${number.slice(0, 5)} ${number.slice(5)}`
  }
  return phone
}

function FieldRow({ label, value, mono }: { label: string; value: string | null; mono?: boolean }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide">{label}</p>
      <p className={`text-sm text-stone-900 dark:text-stone-100 ${mono ? 'font-mono' : ''}`}>
        {value || '—'}
      </p>
    </div>
  )
}

// =============================================================================
// Main Component
// =============================================================================

export function MyProfile({
  subscriberProfile,
  organizationDetails,
  kycDocuments,
  onUpdatePersonalInfo,
  onUpdateOrganization,
  onUploadKycDocument,
  onReuploadKycDocument,
  onUploadProfilePhoto,
  onRemoveProfilePhoto,
  onChangePhone,
}: MyProfileProps) {
  const { language } = useLanguage()
  const t = translations[language]

  const [activeTab, setActiveTab] = useState<Tab>('personal')
  const [isEditingPersonal, setIsEditingPersonal] = useState(false)
  const [isEditingOrg, setIsEditingOrg] = useState(false)

  // Personal info edit state
  const [editName, setEditName] = useState(subscriberProfile.name)
  const [editEmail, setEditEmail] = useState(subscriberProfile.email)
  const [editDob, setEditDob] = useState(subscriberProfile.dateOfBirth || '')

  // Organization edit state
  const [editBusinessName, setEditBusinessName] = useState(organizationDetails.businessName)
  const [editGst, setEditGst] = useState(organizationDetails.gstNumber || '')
  const [editAddress, setEditAddress] = useState(organizationDetails.registeredAddress || '')
  const [editCity, setEditCity] = useState(organizationDetails.city)
  const [editState, setEditState] = useState(organizationDetails.state)
  const [editPincode, setEditPincode] = useState(organizationDetails.pincode)

  const verifiedCount = useMemo(
    () => kycDocuments.filter((d) => d.status === 'verified').length,
    [kycDocuments]
  )

  const tabs = [
    { key: 'personal' as Tab, label: t.tabPersonal, icon: User },
    { key: 'organization' as Tab, label: t.tabOrganization, icon: Building2 },
    { key: 'kyc' as Tab, label: t.tabKyc, icon: ShieldCheck },
  ]

  const accountConfig = ACCOUNT_TYPE_CONFIG[subscriberProfile.accountType]
  const kycConfig = KYC_STATUS_CONFIG[subscriberProfile.kycStatus]
  const KycIcon = kycConfig.icon

  const businessTypeLabel = t[organizationDetails.businessType] || organizationDetails.businessType
  const showGstFields = organizationDetails.businessType !== 'individual'

  // =========================================================================
  // Handlers
  // =========================================================================

  function handleSavePersonal() {
    onUpdatePersonalInfo?.({
      name: editName,
      email: editEmail,
      dateOfBirth: editDob || null,
    })
    setIsEditingPersonal(false)
  }

  function handleSaveOrg() {
    onUpdateOrganization?.({
      businessName: editBusinessName,
      gstNumber: editGst || null,
      registeredAddress: editAddress || null,
      city: editCity,
      state: editState,
      pincode: editPincode,
    })
    setIsEditingOrg(false)
  }

  function handleCancelPersonal() {
    setEditName(subscriberProfile.name)
    setEditEmail(subscriberProfile.email)
    setEditDob(subscriberProfile.dateOfBirth || '')
    setIsEditingPersonal(false)
  }

  function handleCancelOrg() {
    setEditBusinessName(organizationDetails.businessName)
    setEditGst(organizationDetails.gstNumber || '')
    setEditAddress(organizationDetails.registeredAddress || '')
    setEditCity(organizationDetails.city)
    setEditState(organizationDetails.state)
    setEditPincode(organizationDetails.pincode)
    setIsEditingOrg(false)
  }

  // =========================================================================
  // Render
  // =========================================================================

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950">
      <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-7">
        {/* Page Title */}
        <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight mb-4">
          {t.pageTitle}
        </h1>

        {/* ================================================================= */}
        {/* Profile Header Card */}
        {/* ================================================================= */}
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Avatar */}
            <div className="relative group shrink-0">
              {subscriberProfile.avatarUrl ? (
                <img
                  src={subscriberProfile.avatarUrl}
                  alt={subscriberProfile.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                  <span className="text-xl font-bold text-emerald-700 dark:text-emerald-300">
                    {subscriberProfile.avatarInitials}
                  </span>
                </div>
              )}
              <button
                onClick={() => onUploadProfilePhoto?.(new File([], ''))}
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Camera className="w-3.5 h-3.5 text-stone-500" />
              </button>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 truncate">
                {subscriberProfile.name}
              </h2>
              <p className="text-sm font-mono text-stone-500 dark:text-stone-400 mt-0.5">
                {t.subscriberId}: {subscriberProfile.id}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${accountConfig.color} ${accountConfig.bg}`}>
                  {t[subscriberProfile.accountType]}
                </span>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${kycConfig.color} ${kycConfig.bg}`}>
                  <KycIcon className="w-3 h-3" />
                  {t[subscriberProfile.kycStatus]}
                </span>
              </div>
            </div>

            {/* Member since */}
            <div className="text-right hidden sm:block">
              <p className="text-xs text-stone-500 dark:text-stone-400">{t.memberSince}</p>
              <p className="text-sm font-medium text-stone-700 dark:text-stone-300 mt-0.5">
                {subscriberProfile.memberSince}
              </p>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* Tab Navigation */}
        {/* ================================================================= */}
        <div className="mb-4 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-1 p-1 bg-stone-100 dark:bg-stone-900 rounded-xl w-fit min-w-full sm:min-w-0">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-sm'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* Tab Content */}
        {/* ================================================================= */}
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800">
          {/* ----- Personal Info Tab ----- */}
          {activeTab === 'personal' && (
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100">
                  {t.tabPersonal}
                </h3>
                {!isEditingPersonal ? (
                  <button
                    onClick={() => setIsEditingPersonal(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    {t.edit}
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCancelPersonal}
                      className="px-3 py-1.5 rounded-xl text-sm font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    >
                      {t.cancel}
                    </button>
                    <button
                      onClick={handleSavePersonal}
                      className="px-3 py-1.5 rounded-xl text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                    >
                      {t.save}
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                    <User className="w-3.5 h-3.5" />
                    {t.fullName}
                  </label>
                  {isEditingPersonal ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                    />
                  ) : (
                    <p className="text-sm text-stone-900 dark:text-stone-100">{subscriberProfile.name}</p>
                  )}
                </div>

                {/* Mobile Number */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                    <Phone className="w-3.5 h-3.5" />
                    {t.mobileNumber}
                  </label>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-stone-900 dark:text-stone-100 font-mono">
                      {formatPhone(subscriberProfile.phone)}
                    </p>
                    {isEditingPersonal && (
                      <button
                        onClick={() => onChangePhone?.('')}
                        className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
                      >
                        {t.edit}
                      </button>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                    <Mail className="w-3.5 h-3.5" />
                    {t.emailAddress}
                  </label>
                  {isEditingPersonal ? (
                    <input
                      type="email"
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                    />
                  ) : (
                    <p className="text-sm text-stone-900 dark:text-stone-100">{subscriberProfile.email}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                    <Calendar className="w-3.5 h-3.5" />
                    {t.dateOfBirth}
                  </label>
                  {isEditingPersonal ? (
                    <input
                      type="text"
                      value={editDob}
                      onChange={(e) => setEditDob(e.target.value)}
                      placeholder="15 Aug 1985"
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                    />
                  ) : (
                    <p className="text-sm text-stone-900 dark:text-stone-100">
                      {subscriberProfile.dateOfBirth || '—'}
                    </p>
                  )}
                </div>
              </div>

              {/* Profile Photo Section */}
              <div className="mt-6 pt-5 border-t border-stone-100 dark:border-stone-800">
                <label className="flex items-center gap-1.5 text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-3">
                  <Camera className="w-3.5 h-3.5" />
                  {t.profilePhoto}
                </label>
                <div className="flex items-center gap-4">
                  {subscriberProfile.avatarUrl ? (
                    <img
                      src={subscriberProfile.avatarUrl}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                      <Camera className="w-5 h-5 text-stone-400" />
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUploadProfilePhoto?.(new File([], ''))}
                      className="px-3 py-1.5 rounded-xl text-sm font-medium border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                    >
                      {subscriberProfile.avatarUrl ? t.changePhoto : t.uploadPhoto}
                    </button>
                    {subscriberProfile.avatarUrl && (
                      <button
                        onClick={() => onRemoveProfilePhoto?.()}
                        className="px-3 py-1.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      >
                        {t.removePhoto}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ----- Organization Tab ----- */}
          {activeTab === 'organization' && (
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100">
                  {t.tabOrganization}
                </h3>
                {!isEditingOrg ? (
                  <button
                    onClick={() => setIsEditingOrg(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    {t.edit}
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCancelOrg}
                      className="px-3 py-1.5 rounded-xl text-sm font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                    >
                      {t.cancel}
                    </button>
                    <button
                      onClick={handleSaveOrg}
                      className="px-3 py-1.5 rounded-xl text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                    >
                      {t.save}
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Business Name */}
                <div className="space-y-1.5">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                    <Building2 className="w-3.5 h-3.5" />
                    {t.businessName}
                  </label>
                  {isEditingOrg ? (
                    <input
                      type="text"
                      value={editBusinessName}
                      onChange={(e) => setEditBusinessName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                    />
                  ) : (
                    <p className="text-sm text-stone-900 dark:text-stone-100">{organizationDetails.businessName}</p>
                  )}
                </div>

                {/* Business Type */}
                <FieldRow label={t.businessType} value={businessTypeLabel} />

                {/* GST Number (conditional) */}
                {showGstFields && (
                  <div className="space-y-1.5">
                    <label className="flex items-center gap-1.5 text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                      <Hash className="w-3.5 h-3.5" />
                      {t.gstNumber}
                    </label>
                    {isEditingOrg ? (
                      <input
                        type="text"
                        value={editGst}
                        onChange={(e) => setEditGst(e.target.value.toUpperCase())}
                        placeholder="22AAAAA0000A1Z5"
                        maxLength={15}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                      />
                    ) : (
                      <p className="text-sm text-stone-900 dark:text-stone-100 font-mono">
                        {organizationDetails.gstNumber || '—'}
                      </p>
                    )}
                  </div>
                )}

                {/* CIN (conditional) */}
                {showGstFields && (
                  <FieldRow label={t.cinNumber} value={organizationDetails.cinNumber} mono />
                )}
              </div>

              {/* Address Section */}
              <div className="mt-6 pt-5 border-t border-stone-100 dark:border-stone-800">
                <label className="flex items-center gap-1.5 text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-4">
                  <MapPin className="w-3.5 h-3.5" />
                  {t.registeredAddress}
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Street Address */}
                  <div className="sm:col-span-2 space-y-1.5">
                    {isEditingOrg ? (
                      <input
                        type="text"
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        placeholder="Street address"
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                      />
                    ) : (
                      <p className="text-sm text-stone-900 dark:text-stone-100">
                        {organizationDetails.registeredAddress || '—'}
                      </p>
                    )}
                  </div>

                  {/* City */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                      {t.city}
                    </label>
                    {isEditingOrg ? (
                      <input
                        type="text"
                        value={editCity}
                        onChange={(e) => setEditCity(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                      />
                    ) : (
                      <p className="text-sm text-stone-900 dark:text-stone-100">{organizationDetails.city}</p>
                    )}
                  </div>

                  {/* State */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                      {t.state}
                    </label>
                    {isEditingOrg ? (
                      <input
                        type="text"
                        value={editState}
                        onChange={(e) => setEditState(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                      />
                    ) : (
                      <p className="text-sm text-stone-900 dark:text-stone-100">{organizationDetails.state}</p>
                    )}
                  </div>

                  {/* Pincode */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide">
                      {t.pincode}
                    </label>
                    {isEditingOrg ? (
                      <input
                        type="text"
                        value={editPincode}
                        onChange={(e) => setEditPincode(e.target.value)}
                        maxLength={6}
                        className="w-full px-3 py-2 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                      />
                    ) : (
                      <p className="text-sm text-stone-900 dark:text-stone-100 font-mono">
                        {organizationDetails.pincode}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ----- KYC & Verification Tab ----- */}
          {activeTab === 'kyc' && (
            <div className="p-5 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl sm:text-2xl font-semibold text-stone-900 dark:text-stone-100">
                  {t.tabKyc}
                </h3>
                <span className="text-sm text-stone-500 dark:text-stone-400">
                  {verifiedCount} {t.of} {kycDocuments.length} {t.documentsVerified}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${(verifiedCount / kycDocuments.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Document Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {kycDocuments.map((doc) => {
                  const statusConfig = DOC_STATUS_CONFIG[doc.status]
                  const StatusIcon = statusConfig.icon
                  const DocIcon = DOC_TYPE_ICONS[doc.type]

                  return (
                    <div
                      key={doc.id}
                      className={`rounded-xl border p-4 transition-all ${
                        doc.status === 'rejected'
                          ? 'border-red-200 dark:border-red-900/50 bg-red-50/30 dark:bg-red-950/10'
                          : doc.status === 'verified'
                          ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/10'
                          : 'border-stone-200 dark:border-stone-700'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${statusConfig.bg}`}>
                          <DocIcon className={`w-5 h-5 ${statusConfig.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                                {doc.label}
                              </p>
                              {doc.maskedNumber && (
                                <p className="text-xs font-mono text-stone-500 dark:text-stone-400 mt-0.5">
                                  {doc.maskedNumber}
                                </p>
                              )}
                            </div>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${statusConfig.textColor} ${statusConfig.bg}`}>
                              <StatusIcon className="w-3 h-3" />
                              {t[doc.status]}
                            </span>
                          </div>

                          {/* Upload info */}
                          {doc.uploadedAt && (
                            <p className="text-xs text-stone-400 dark:text-stone-500 mt-2">
                              {t.uploadedOn}: {doc.uploadedAt}
                              {doc.fileName && ` · ${doc.fileName}`}
                            </p>
                          )}
                          {doc.verifiedAt && (
                            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                              {t.verifiedOn}: {doc.verifiedAt}
                            </p>
                          )}

                          {/* Rejection reason */}
                          {doc.status === 'rejected' && doc.rejectionReason && (
                            <div className="mt-2.5 p-2.5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/40">
                              <div className="flex items-start gap-1.5">
                                <Info className="w-3.5 h-3.5 text-red-500 mt-0.5 shrink-0" />
                                <p className="text-xs text-red-700 dark:text-red-300">
                                  {doc.rejectionReason}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Action buttons */}
                          <div className="mt-3">
                            {doc.status === 'not_submitted' && (
                              <button
                                onClick={() => onUploadKycDocument?.(doc.type, new File([], ''))}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                              >
                                <Upload className="w-3.5 h-3.5" />
                                {t.uploadDocument}
                              </button>
                            )}
                            {doc.status === 'rejected' && (
                              <button
                                onClick={() => onReuploadKycDocument?.(doc.id, new File([], ''))}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-amber-600 text-white hover:bg-amber-700 transition-colors"
                              >
                                <Upload className="w-3.5 h-3.5" />
                                {t.reupload}
                              </button>
                            )}
                            {doc.status === 'verified' && (
                              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
                                <FileText className="w-3.5 h-3.5" />
                                {t.viewDocument}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
