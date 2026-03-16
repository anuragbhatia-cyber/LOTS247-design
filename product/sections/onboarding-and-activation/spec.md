# Onboarding & Activation Specification

## Overview
The onboarding module guides new users through account creation, vehicle registration, optional driver assignment, and subscription selection to achieve activation in under 3 minutes. The primary goal is to ensure every user reaches the dashboard with at least one vehicle linked and an active subscription (Free or Paid).

## User Flows
- User fills out registration form: Full Name, Mobile Number (with country code), Business/Individual Name, Business Type (dropdown), State, Pincode, Email
- User must agree to Terms & Conditions and Privacy Policy checkbox before continuing
- User taps "Continue" to submit registration form
- User receives OTP on the mobile number entered in registration form
- User enters 6-digit OTP in separate input boxes
- System creates user account and proceeds to vehicle addition
- User enters RC number; system fetches vehicle details via API with loading spinner
- User confirms auto-fetched vehicle details or manually enters if API fails
- Vehicle is added and linked to user account
- User optionally adds driver (name, ID, license number) and assigns to vehicle
- User can skip driver addition via text link "I'll add drivers later"
- System presents 4 subscription plans as pricing cards (Free + 3 Paid tiers)
- User selects plan; Free activates immediately, Paid redirects to payment gateway
- Upon successful activation, user is redirected to dashboard
- If user exits mid-onboarding, system resumes from last completed step on next login
- Duplicate RC entry shows inline error below RC input field
- Payment failure keeps user on plan screen with retry option and inline error
- API fetch failure allows manual vehicle entry
- Invalid OTP shows inline error with resend option

## UI Requirements
- Multi-step wizard without a progress indicator (no step counter or step labels shown)
- Standalone pages (no app shell/navigation chrome) for focused onboarding experience
- Each step occupies full screen with centered content
- Navigation between steps via "Continue" / "Next" buttons
- No back button (users cannot go backwards in the flow)
- Registration form with fields: Full Name, Mobile Number (with country code selector), Business/Individual Name, Business Type (dropdown: Individual, Proprietorship, LLP, Private Limited), State, Pincode, Email
- "Continue" button to submit registration form
- "Already have an account? Login" link below the continue button
- "I agree to the Terms & Conditions and Privacy Policy" checkbox at the bottom of the form (required before continuing)
- Inline validation errors for required fields, invalid email, invalid pincode
- 6 separate input boxes for OTP digits that auto-advance (OTP sent to mobile number from registration)
- "Resend OTP" text link (enabled after countdown timer)
- Inline error messages for invalid OTP
- Rate limiting messaging if too many attempts
- RC number input field as primary input
- "Fetch Details" button
- Loading spinner overlay with "Fetching vehicle details..." message during API call
- Auto-populated fields displayed for confirmation (vehicle name, type, etc.)
- Manual input fallback if API unavailable or fails
- Inline validation errors for duplicate RC or invalid format
- No "Add Vehicle" button; vehicle is automatically saved and flow advances on confirmation
- Form fields: Driver Name, Driver ID, Driving License Number
- Dropdown to assign driver to vehicle
- No "Add Driver" button; driver form is optional and advances via a single "Continue" or skip link
- Subtle text link below: "I'll add drivers later" to skip
- Inline validation for required fields
- 4 pricing cards displayed in a row (stacked on mobile)
- Each card shows: plan name, key features, incident coverage, support level, price
- Bsafe and Vcare plans highlight "24/7 on-call legal support" as a key feature (not unlimited vehicles)
- Recommended plan highlighted (if applicable)
- Free plan disabled or marked "Limited" if vehicle count exceeds limit
- "Select Plan" button on each card
- Free plan activates immediately; Paid plan redirects to payment
- Inline error messages for payment failures
- Redirect to dashboard upon activation
- Optional: Setup checklist displayed for incomplete actions
- Mobile responsive using Tailwind breakpoints
- Light and dark mode support using dark: variants
- Maximum content width for readability on desktop
- Generous whitespace and padding
- Clear visual hierarchy with primary actions emphasized

## Configuration
- shell: false
