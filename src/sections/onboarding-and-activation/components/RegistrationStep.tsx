import { useState, useRef, useEffect } from 'react'

interface RegistrationFormData {
  phoneNumber: string
  businessName: string
  businessType: string
  state: string
  pincode: string
  agreedToTerms: boolean
}

interface RegistrationStepProps {
  /** Called when user submits registration form and requests OTP */
  onRequestOTP?: (phoneNumber: string, formData: RegistrationFormData) => void
  /** Called when user verifies OTP */
  onVerifyOTP?: (otp: string) => void
  /** Called when user requests OTP resend */
  onResendOTP?: () => void
  /** Phone number error message */
  phoneError?: string
  /** OTP error message */
  otpError?: string
  /** Whether OTP has been sent */
  otpSent?: boolean
  /** Whether OTP is being verified */
  isVerifying?: boolean
  /** Countdown seconds for resend */
  resendCountdown?: number
}

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Chandigarh', 'Puducherry',
]

const BUSINESS_TYPES = [
  { value: '', label: 'Select business type' },
  { value: 'individual', label: 'Individual' },
  { value: 'proprietorship', label: 'Proprietorship' },
  { value: 'llp', label: 'LLP' },
  { value: 'private-limited', label: 'Private Limited' },
]

export function RegistrationStep({
  onRequestOTP,
  onVerifyOTP,
  onResendOTP,
  otpError,
  otpSent = false,
  isVerifying = false,
  resendCountdown = 0,
}: RegistrationStepProps) {
  const [formData, setFormData] = useState<RegistrationFormData>({
    phoneNumber: '',
    businessName: '',
    businessType: '',
    state: '',
    pincode: '',
    agreedToTerms: false,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormData, string>>>({})
  const [otp, setOtp] = useState(['', '', '', ''])
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    if (digits.length <= 5) return digits
    return `${digits.slice(0, 5)} ${digits.slice(5)}`
  }

  const handleChange = (field: keyof RegistrationFormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10)
    handleChange('phoneNumber', value)
  }

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6)
    handleChange('pincode', value)
  }

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof RegistrationFormData, string>> = {}

    if (formData.phoneNumber.length !== 10) newErrors.phoneNumber = 'Enter a valid 10-digit phone number'
    if (!formData.businessName.trim()) newErrors.businessName = 'Business/Individual name is required'
    if (!formData.businessType) newErrors.businessType = 'Select a business type'
    if (!formData.state) newErrors.state = 'Select a state'
    if (formData.pincode.length !== 6) newErrors.pincode = 'Enter a valid 6-digit pincode'
    if (!formData.agreedToTerms) newErrors.agreedToTerms = 'You must agree to continue'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (validate()) {
      onRequestOTP?.(formData.phoneNumber, formData)
    }
  }

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)

    if (value && index < 3) {
      otpRefs.current[index + 1]?.focus()
    }

    if (newOtp.every((digit) => digit) && value) {
      onVerifyOTP?.(newOtp.join(''))
    }
  }

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4)
    const newOtp = [...otp]
    pastedData.split('').forEach((digit, i) => {
      if (i < 4) newOtp[i] = digit
    })
    setOtp(newOtp)
    if (pastedData.length === 4) {
      onVerifyOTP?.(pastedData)
    }
  }

  useEffect(() => {
    if (otpSent) {
      otpRefs.current[0]?.focus()
    }
  }, [otpSent])

  const inputClassName = (field: keyof RegistrationFormData) => `
    w-full px-4 py-3 rounded-xl border text-base
    bg-white dark:bg-stone-900
    text-stone-900 dark:text-white
    placeholder:text-stone-400 dark:placeholder:text-stone-500
    focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
    transition-all duration-200
    ${errors[field] ? 'border-red-500 dark:border-red-500' : 'border-stone-300 dark:border-stone-700'}
  `

  const ErrorMessage = ({ field }: { field: keyof RegistrationFormData }) =>
    errors[field] ? (
      <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1.5">
        <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        {errors[field]}
      </p>
    ) : null

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[30%] bg-white dark:bg-stone-900 flex-col relative border-r border-stone-200 dark:border-stone-800">
        <div className="p-8">
          <img
            src="/lots247-logo.png"
            alt="LOTS247 - India's First Road Side Legal Assistance Platform"
            className="h-20 w-auto"
          />
        </div>
        <div className="mt-auto flex justify-center px-10 pb-10">
          <img
            src="/truck-illustration.png"
            alt="Truck illustration"
            className="w-full max-w-xs h-auto"
          />
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 overflow-y-auto bg-stone-50 dark:bg-stone-950">
        <div className="min-h-full flex items-start lg:items-center justify-center px-6 py-10 lg:py-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8 flex justify-center">
              <img src="/lots247-logo.png" alt="LOTS247" className="h-16 w-auto" />
            </div>

            {!otpSent ? (
              <>
                {/* Header */}
                <div className="mb-6">
                  <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                    Create your account
                  </h1>
                </div>

                {/* Registration Form */}
                <div className="space-y-4">
                  {/* Mobile Number */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-500 dark:text-stone-400 text-sm font-medium">
                        +91
                      </span>
                      <input
                        id="phone"
                        type="tel"
                        value={formatPhone(formData.phoneNumber)}
                        onChange={handlePhoneChange}
                        placeholder="98765 43210"
                        className={`
                          flex-1 px-4 py-3 rounded-r-xl border text-base
                          bg-white dark:bg-stone-900
                          text-stone-900 dark:text-white
                          placeholder:text-stone-400 dark:placeholder:text-stone-500
                          focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent
                          transition-all duration-200
                          ${errors.phoneNumber ? 'border-red-500 dark:border-red-500' : 'border-stone-300 dark:border-stone-700'}
                        `}
                      />
                    </div>
                    <ErrorMessage field="phoneNumber" />
                  </div>

                  {/* Business/Individual Name */}
                  <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                      Business / Individual Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="businessName"
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => handleChange('businessName', e.target.value)}
                      placeholder="Enter business or individual name"
                      className={inputClassName('businessName')}
                    />
                    <ErrorMessage field="businessName" />
                  </div>

                  {/* Business Type */}
                  <div>
                    <label htmlFor="businessType" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                      Business Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="businessType"
                      value={formData.businessType}
                      onChange={(e) => handleChange('businessType', e.target.value)}
                      className={inputClassName('businessType')}
                    >
                      {BUSINESS_TYPES.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                    <ErrorMessage field="businessType" />
                  </div>

                  {/* State + Pincode Row */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="state" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                        State <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="state"
                        value={formData.state}
                        onChange={(e) => handleChange('state', e.target.value)}
                        className={inputClassName('state')}
                      >
                        <option value="">Select state</option>
                        {INDIAN_STATES.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </select>
                      <ErrorMessage field="state" />
                    </div>
                    <div>
                      <label htmlFor="pincode" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1.5">
                        Pincode <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="pincode"
                        type="text"
                        inputMode="numeric"
                        value={formData.pincode}
                        onChange={handlePincodeChange}
                        placeholder="110001"
                        className={inputClassName('pincode')}
                      />
                      <ErrorMessage field="pincode" />
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="pt-1">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={formData.agreedToTerms}
                        onChange={(e) => handleChange('agreedToTerms', e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-stone-300 dark:border-stone-600 text-emerald-600 focus:ring-emerald-500 bg-white dark:bg-stone-900"
                      />
                      <span className="text-sm text-stone-600 dark:text-stone-400 leading-snug">
                        I agree to the{' '}
                        <button className="underline text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300">
                          Terms & Conditions
                        </button>{' '}
                        and{' '}
                        <button className="underline text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300">
                          Privacy Policy
                        </button>
                      </span>
                    </label>
                    <ErrorMessage field="agreedToTerms" />
                  </div>

                  {/* Continue Button */}
                  <button
                    onClick={handleSubmit}
                    className="w-full py-3.5 rounded-xl font-semibold text-base bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 transition-all duration-200"
                  >
                    Continue
                  </button>

                  {/* Login Link */}
                  <p className="text-center text-sm text-stone-500 dark:text-stone-400">
                    Already have an account?{' '}
                    <button className="font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:underline transition-colors">
                      Login
                    </button>
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* OTP Verification */}
                <div className="mb-8">
                  <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white mb-2">
                    Enter verification code
                  </h1>
                  <p className="text-stone-500 dark:text-stone-400">
                    We sent a 4-digit code to +91 {formatPhone(formData.phoneNumber)}
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-3">
                      Enter OTP
                    </label>
                    <div className="flex gap-2.5" onPaste={handleOtpPaste}>
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => {
                            otpRefs.current[index] = el
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className={`
                            w-11 h-13 text-center text-xl font-bold
                            rounded-xl border-2
                            bg-white dark:bg-stone-900
                            text-stone-900 dark:text-white
                            focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500
                            transition-all duration-200
                            ${
                              otpError
                                ? 'border-red-500 dark:border-red-500'
                                : digit
                                  ? 'border-emerald-500 dark:border-emerald-500'
                                  : 'border-stone-300 dark:border-stone-700'
                            }
                          `}
                        />
                      ))}
                    </div>
                    {otpError && (
                      <p className="mt-3 text-sm text-red-500 flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {otpError}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => onVerifyOTP?.(otp.join(''))}
                    disabled={!otp.every((d) => d) || isVerifying}
                    className={`
                      w-full py-3.5 rounded-xl font-semibold text-base
                      transition-all duration-200
                      ${
                        otp.every((d) => d) && !isVerifying
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-500/20'
                          : 'bg-stone-200 dark:bg-stone-800 text-stone-400 dark:text-stone-500 cursor-not-allowed'
                      }
                    `}
                  >
                    {isVerifying ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Verifying...
                      </span>
                    ) : (
                      'Verify OTP'
                    )}
                  </button>

                  <div className="text-center">
                    {resendCountdown > 0 ? (
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        Resend OTP in{' '}
                        <span className="font-mono font-medium text-stone-700 dark:text-stone-300">
                          {resendCountdown}s
                        </span>
                      </p>
                    ) : (
                      <button
                        onClick={onResendOTP}
                        className="text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:underline transition-colors"
                      >
                        Didn't receive the code? Resend OTP
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
