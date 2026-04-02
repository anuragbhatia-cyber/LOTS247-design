# Milestone 3: Onboarding & Activation

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the multi-step onboarding wizard that guides new users from registration through phone verification, vehicle addition, optional driver addition, and subscription plan selection to full activation — all in under 3 minutes.

## Overview

The Onboarding & Activation module is a standalone flow (no application shell) that ensures every new user reaches the dashboard with at least one vehicle linked and an active subscription. The wizard is linear — users cannot go backwards — and the system resumes from the last completed step if the user exits mid-flow.

**Key Functionality:**
- Registration form with business details and T&C agreement
- Phone verification via 6-digit OTP with auto-advance input boxes
- Vehicle addition via RC number with auto-fetch from government API
- Optional driver addition with skip capability
- Subscription plan selection (Free activates immediately, Paid redirects to Razorpay)
- Session resume from last completed step on re-login
- Login flow for returning users ("Already have an account? Login")

## Recommended Approach: Test-Driven Development

See `product-plan/sections/onboarding-and-activation/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/onboarding-and-activation/components/`:
- `OnboardingFlow.tsx` — Main wizard orchestrator managing step transitions
- `RegistrationStep.tsx` — Registration form (name, mobile, business type, state, pincode, email, T&C checkbox)
- `LoginStep.tsx` — Login form for returning users
- `PhoneVerificationStep.tsx` — OTP entry with 6 separate input boxes, countdown timer, resend link
- `VehicleAdditionStep.tsx` — RC number input, fetch details button, auto-populated confirmation, manual fallback
- `DriverAdditionStep.tsx` — Optional driver form with name, ID, license number, vehicle assignment, skip link
- `PlanSelectionStep.tsx` — 4 pricing cards (Free + 3 paid tiers) with feature comparison
- `ProgressIndicator.tsx` — Visual step progress (note: spec says no step counter shown, but component exists for internal tracking)

### Data Layer

Key types from `types.ts`: OnboardingProgress, SubscriptionPlan, SubscriptionPlanFeatures, PhoneVerificationForm, VehicleDetailsForm, DriverDetailsForm, ValidationErrors, UIState

You'll need to:
- Create user registration API endpoint
- Implement OTP generation, delivery (SMS), and verification
- Integrate with government RC vehicle details API for auto-fetch
- Create vehicle and driver records on the backend
- Integrate Razorpay payment gateway for paid plans
- Implement session persistence to resume from last completed step
- Validate duplicate RC numbers, phone numbers, and email addresses

### Callbacks

| Callback | Description |
|----------|-------------|
| `onRequestOTP` | Send OTP to the user's phone number |
| `onVerifyOTP` | Validate the 6-digit OTP |
| `onResendOTP` | Resend OTP after countdown expires |
| `onPhoneVerified` | Proceed after successful verification |
| `onFetchVehicleDetails` | Call government API to auto-fetch vehicle details by RC number |
| `onAddVehicle` | Save vehicle and link to user account |
| `onManualEntry` | Switch to manual vehicle entry when API fails |
| `onAddDriver` | Save driver and assign to vehicle |
| `onSkipDriver` | Skip driver step and proceed to plan selection |
| `onSelectPlan` | Select a subscription plan |
| `onFreePlanActivated` | Activate free plan immediately |
| `onInitiatePayment` | Redirect to Razorpay for paid plan |
| `onPaymentComplete` | Handle successful payment and activate subscription |
| `onPaymentFailed` | Show payment failure error with retry option |

### Empty States

- N/A — the onboarding flow is always presented fresh to new users. There are no "empty" states; all steps require input or action.

### Error States

- Invalid phone number: Inline error below the phone input
- Invalid OTP: Inline error with "Resend OTP" link
- Rate-limited OTP: Message indicating too many attempts
- Duplicate RC number: Inline error below RC input
- RC API failure: Auto-switch to manual entry mode with fallback message
- Payment failure: Inline error on plan screen with retry option
- Payment timeout: Error with retry option
- Missing required fields: Inline validation errors per field

## Expected User Flows

### Flow 1: Happy Path — Full Registration to Activation
1. User fills out registration form (name, mobile, business type, state, pincode, email)
2. User checks "I agree to T&C and Privacy Policy" and taps "Continue"
3. User receives OTP on their mobile number
4. User enters 6-digit OTP in the separate input boxes (auto-advance on each digit)
5. System verifies OTP, creates user account, advances to vehicle step
6. User enters RC number and taps "Fetch Details"
7. Loading spinner shows "Fetching vehicle details..."
8. Vehicle details auto-populate; user confirms
9. User optionally fills in driver details or taps "I'll add drivers later"
10. User sees 4 subscription plans, selects "Free" plan
11. Free plan activates immediately
12. **Outcome:** User is redirected to the Home dashboard with one vehicle linked

### Flow 2: Returning User — Login
1. User taps "Already have an account? Login" link on registration page
2. User enters phone number and receives OTP
3. User enters OTP and is authenticated
4. **Outcome:** User is redirected to the Home dashboard

### Flow 3: RC API Failure — Manual Entry
1. User enters RC number and taps "Fetch Details"
2. API call fails; system shows fallback message
3. User is presented with manual entry form fields (vehicle name, type, etc.)
4. User fills in vehicle details manually and confirms
5. **Outcome:** Vehicle is saved, flow advances to driver step

### Flow 4: Paid Plan — Razorpay Payment
1. User reaches plan selection step
2. User selects a paid plan (e.g., Bsafe, Vcare, or Enterprise)
3. System redirects to Razorpay payment gateway
4. User completes payment
5. **Outcome:** Subscription activates, user is redirected to Home dashboard
6. **On failure:** User remains on plan screen with inline error and retry option

## Files to Reference

- `product-plan/sections/onboarding-and-activation/README.md`
- `product-plan/sections/onboarding-and-activation/tests.md`
- `product-plan/sections/onboarding-and-activation/components/`
- `product-plan/sections/onboarding-and-activation/types.ts`
- `product-plan/sections/onboarding-and-activation/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Registration form validates all fields and submits correctly
- [ ] T&C checkbox is required before continuing
- [ ] OTP is sent, verified, and auto-advances between input boxes
- [ ] Resend OTP works after countdown timer expires
- [ ] Vehicle details auto-fetch via RC number API
- [ ] Manual entry fallback works when API fails
- [ ] Duplicate RC number shows inline error
- [ ] Driver addition is optional with working skip link
- [ ] All 4 subscription plans display with correct features
- [ ] Free plan activates immediately
- [ ] Paid plans redirect to Razorpay and handle success/failure
- [ ] Session resumes from last completed step on re-login
- [ ] Standalone pages render without application shell
- [ ] Responsive on mobile
- [ ] "Already have an account? Login" flow works
