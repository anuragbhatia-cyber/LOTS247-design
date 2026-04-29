# Milestone 3: Onboarding & Activation

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Onboarding & Activation flow — guiding new users from registration to first vehicle and subscription activation in under 3 minutes.

## Overview

The onboarding module is a standalone multi-step wizard (no app shell) that handles account creation, OTP verification, vehicle registration via RC number auto-fetch, optional driver assignment, and subscription plan selection. The primary goal is to ensure every user reaches the dashboard with at least one vehicle linked and an active subscription.

**Key Functionality:**
- Multi-step registration form with OTP verification
- Vehicle addition via RC number with auto-fetch from government API
- Optional driver assignment linked to the added vehicle
- Subscription plan selection with 4 tiers (Free + 3 Paid)
- Resume from last completed step if user exits mid-onboarding

## Recommended Approach: Test-Driven Development

See `product-plan/sections/onboarding-and-activation/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/onboarding-and-activation/components/`:

- `Onboarding.tsx` — Multi-step wizard with all onboarding screens

### Data Layer

- Registration data: name, mobile, business name, business type, state, pincode, email
- OTP verification: 6-digit code sent to mobile
- Vehicle: RC number input → API auto-fetch → confirmation
- Driver: optional name, ID, license number, vehicle assignment
- Subscription: plan selection from 4 tiers

### Callbacks

| Callback | Description |
|----------|-------------|
| `onRegister` | Submits registration form data |
| `onVerifyOTP` | Validates 6-digit OTP code |
| `onResendOTP` | Triggers OTP resend after countdown |
| `onFetchVehicle` | Fetches vehicle details by RC number |
| `onAddDriver` | Submits optional driver details |
| `onSelectPlan` | Selects subscription plan |
| `onComplete` | Redirects to dashboard on activation |

### Important Notes

- **No shell/navigation chrome** — this is a standalone focused flow
- **No back button** — users cannot go backwards in the flow
- **No progress indicator** — no step counter or step labels shown
- **Resume capability** — system resumes from last completed step on next login
- **Free plan activates immediately** — paid plans redirect to payment gateway

### Empty States & Error Handling

- **API fetch failure:** Allow manual vehicle entry as fallback
- **Duplicate RC number:** Show inline error below RC input
- **Invalid OTP:** Show inline error with resend option and rate limiting
- **Payment failure:** Keep user on plan screen with retry option

## Expected User Flows

### Flow 1: Complete Registration
1. User fills registration form (name, mobile, business name, type, state, pincode, email)
2. User agrees to Terms & Conditions checkbox
3. User clicks "Continue"
4. **Outcome:** OTP sent to mobile number, user advances to OTP screen

### Flow 2: OTP Verification
1. User enters 6-digit OTP in separate input boxes
2. Digits auto-advance between boxes
3. **Outcome:** Account created, user advances to vehicle addition

### Flow 3: Add Vehicle via RC
1. User enters RC number and clicks "Fetch Details"
2. Loading spinner shows "Fetching vehicle details..."
3. Vehicle details auto-populate for confirmation
4. **Outcome:** Vehicle linked to account, flow advances

### Flow 4: Select Subscription Plan
1. User sees 4 pricing cards displayed
2. User clicks "Select Plan" on desired tier
3. Free plan activates immediately; Paid triggers payment
4. **Outcome:** User redirected to dashboard

## Files to Reference

- `product-plan/sections/onboarding-and-activation/README.md` — Feature overview
- `product-plan/sections/onboarding-and-activation/tests.md` — Test instructions
- `product-plan/sections/onboarding-and-activation/components/` — React components
- `product-plan/sections/onboarding-and-activation/types.ts` — TypeScript interfaces
- `product-plan/sections/onboarding-and-activation/sample-data.json` — Test data

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Registration form validates and submits correctly
- [ ] OTP verification works with auto-advance between digits
- [ ] Vehicle RC auto-fetch with loading state and manual fallback
- [ ] Driver addition is optional with skip link
- [ ] All 4 subscription plans display with correct details
- [ ] Free plan activates immediately
- [ ] Paid plan redirects to payment gateway
- [ ] Onboarding renders without app shell
- [ ] Resume from last step works on re-login
- [ ] All error states handled inline
- [ ] Mobile responsive
