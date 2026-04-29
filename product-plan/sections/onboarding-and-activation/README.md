# Onboarding & Activation — Multi-Step Wizard

## Overview

The Onboarding & Activation section guides new users through a multi-step registration wizard. It collects phone number, verifies via OTP, fetches vehicle details from RC number, adds driver information, and presents plan selection. The flow is designed for first-time fleet operators with minimal tech familiarity.

## User Flows

1. **Registration** — User enters name, email, and organization name in RegistrationStep.
2. **Phone Verification** — User enters mobile number, receives OTP, and verifies in PhoneVerificationStep.
3. **Login** — Returning users enter phone + OTP to authenticate in LoginStep.
4. **Vehicle Addition** — User enters RC number, system auto-fetches vehicle details (make, model, registration date, expiry). User confirms or edits in VehicleAdditionStep.
5. **Driver Addition** — User enters driver name, phone, and DL number. DL details are auto-fetched in DriverAdditionStep.
6. **Plan Selection** — User reviews available plans (Basic, Pro, Enterprise) with feature comparison and selects one in PlanSelectionStep.

## Design Decisions

- Wizard uses a horizontal ProgressIndicator with step numbers and labels.
- Each step is a full-screen card with clear primary CTA at the bottom.
- RC/DL auto-fetch shows a loading shimmer while the API resolves, then pre-fills fields.
- Plan cards use a highlighted "Recommended" badge on the suggested plan.
- Back navigation is supported at every step; data persists across steps.
- Mobile-first layout with single-column form fields.

## Data Used

- `product/sections/onboarding-and-activation/data.json` — Sample user profiles, OTP mock, vehicle RC data, driver DL data, plans.
- `product/sections/onboarding-and-activation/types.ts` — RegistrationData, OtpPayload, VehicleRCData, DriverDLData, Plan.

## Components Provided

| Component | File | Description |
|-----------|------|-------------|
| OnboardingFlow | OnboardingFlow.tsx | Top-level wizard orchestrator |
| RegistrationStep | RegistrationStep.tsx | Name, email, org form |
| PhoneVerificationStep | PhoneVerificationStep.tsx | Phone input + OTP verification |
| LoginStep | LoginStep.tsx | Returning user phone + OTP |
| VehicleAdditionStep | VehicleAdditionStep.tsx | RC number entry + auto-fetch |
| DriverAdditionStep | DriverAdditionStep.tsx | Driver details + DL fetch |
| PlanSelectionStep | PlanSelectionStep.tsx | Plan comparison and selection |
| ProgressIndicator | ProgressIndicator.tsx | Horizontal step tracker |

## Callback Props

| Prop | Component | Signature | Purpose |
|------|-----------|-----------|---------|
| onRegister | RegistrationStep | `(data: RegistrationData) => void` | Submits registration |
| onVerifyOtp | PhoneVerificationStep | `(phone: string, otp: string) => void` | Verifies OTP |
| onLogin | LoginStep | `(phone: string, otp: string) => void` | Authenticates returning user |
| onAddVehicle | VehicleAdditionStep | `(rc: string, data: VehicleRCData) => void` | Confirms vehicle |
| onAddDriver | DriverAdditionStep | `(data: DriverDLData) => void` | Confirms driver |
| onSelectPlan | PlanSelectionStep | `(planId: string) => void` | Selects a plan |
| onBack | OnboardingFlow | `() => void` | Navigates to previous step |
| onSkip | VehicleAdditionStep, DriverAdditionStep | `() => void` | Skips optional step |
