# Onboarding & Activation — Test Specifications

## Overview

Tests for the multi-step onboarding wizard covering registration, OTP verification, vehicle RC auto-fetch, driver DL auto-fetch, and plan selection.

---

## 1. Registration Step

### Success Path
- [ ] Navigate to onboarding flow
- [ ] Verify RegistrationStep renders with fields: Name, Email, Organization
- [ ] Verify ProgressIndicator shows step 1 of 6 as active
- [ ] Enter name "Rajesh Kumar", email "rajesh@fleet.in", org "Kumar Transport"
- [ ] Tap Continue — verify onRegister fires with correct data
- [ ] Verify flow advances to PhoneVerificationStep

### Failure Path
- [ ] Submit with empty name — verify "Name is required" error
- [ ] Submit with invalid email "rajesh@" — verify "Enter a valid email" error
- [ ] Submit with empty organization — verify "Organization name is required" error
- [ ] Simulate server 500 — verify "Registration failed. Please try again." toast

---

## 2. Phone Verification Step

### Success Path
- [ ] Verify phone input with +91 prefix renders
- [ ] Enter "9876543210" — tap Send OTP
- [ ] Verify 6-digit OTP input appears with 30s countdown timer
- [ ] Enter "123456" — tap Verify
- [ ] Verify onVerifyOtp fires with phone and OTP
- [ ] Verify flow advances to next step

### Failure Path
- [ ] Enter phone with less than 10 digits "98765" — verify "Enter a valid 10-digit number" error
- [ ] Enter wrong OTP "000000" — verify "Invalid OTP. Please try again." error
- [ ] Let timer expire — verify "Resend OTP" button becomes active
- [ ] Tap Resend OTP — verify new OTP is sent and timer resets
- [ ] Exceed 3 wrong attempts — verify "Too many attempts. Try after 5 minutes." message

---

## 3. Vehicle Addition Step (RC Auto-Fetch)

### Success Path
- [ ] Verify VehicleAdditionStep renders with RC number input
- [ ] Enter "MH01AB1234" — verify loading shimmer appears
- [ ] Verify auto-fetched fields populate: Make "Tata", Model "Ace", Registration Date "2022-03-15", Expiry "2037-03-14"
- [ ] Verify user can edit pre-filled fields
- [ ] Tap Confirm — verify onAddVehicle fires with RC and data
- [ ] Verify "Skip" option is visible for optional step

### Failure Path
- [ ] Enter invalid RC format "ABC" — verify "Enter a valid RC number" error
- [ ] Enter RC "XX00ZZ9999" that returns no data — verify "Vehicle not found. Please enter details manually."
- [ ] Verify manual entry fields appear when auto-fetch fails
- [ ] Simulate network error — verify retry button appears

---

## 4. Driver Addition Step (DL Auto-Fetch)

### Success Path
- [ ] Verify fields: Driver Name, Phone, DL Number
- [ ] Enter DL "MH0120220001234" — verify DL details auto-fetch (name, validity, categories)
- [ ] Verify pre-filled driver name matches DL data
- [ ] Tap Confirm — verify onAddDriver fires
- [ ] Tap Skip — verify onSkip fires and advances to PlanSelectionStep

### Failure Path
- [ ] Enter invalid DL format — verify validation error
- [ ] DL auto-fetch returns expired license — verify warning "This license expired on 2025-11-30"
- [ ] Submit without phone — verify "Driver phone is required" error

---

## 5. Plan Selection Step

### Success Path
- [ ] Verify 3 plan cards render: Basic, Pro, Enterprise
- [ ] Verify "Recommended" badge on Pro plan
- [ ] Verify feature comparison rows are visible
- [ ] Tap Pro plan — verify card highlights with accent border
- [ ] Tap "Select Plan" — verify onSelectPlan fires with planId "pro"
- [ ] Verify flow completes and redirects to home

### Failure Path
- [ ] Attempt to proceed without selecting a plan — verify "Please select a plan" prompt
- [ ] Simulate payment gateway failure — verify "Payment failed. Please try again." message

---

## Empty State Tests

- [ ] Fresh onboarding — all steps empty, ProgressIndicator at step 1
- [ ] Vehicle step skipped — flow proceeds to driver step without vehicle data
- [ ] Driver step skipped — flow proceeds to plan selection without driver data

## Component Interaction Tests

- [ ] Back button on step 3 returns to step 2 with preserved phone number
- [ ] Back button on step 1 is hidden or disabled
- [ ] ProgressIndicator allows tapping completed steps to review (read-only)
- [ ] Keyboard dismisses on step transition

## Edge Cases

- [ ] OTP input accepts only numeric characters, max 6 digits
- [ ] RC number input auto-uppercases and strips spaces
- [ ] Pasting phone number with country code "+919876543210" extracts "9876543210"
- [ ] Extremely long organization name (100+ chars) truncates in display but stores full value
- [ ] Double-tap on Submit does not trigger duplicate API calls

## Accessibility Checks

- [ ] All form fields have associated labels
- [ ] OTP input fields are individually focusable with auto-advance
- [ ] ProgressIndicator has aria-label "Step X of Y"
- [ ] Error messages are announced to screen readers via aria-live="polite"
- [ ] Plan cards are selectable via keyboard (Space/Enter)
- [ ] Focus moves to first field of each new step on transition

## Sample Test Data

```json
{
  "registration": {
    "name": "Rajesh Kumar",
    "email": "rajesh@fleet.in",
    "organization": "Kumar Transport"
  },
  "phone": "9876543210",
  "otp": "123456",
  "vehicleRC": {
    "rcNumber": "MH01AB1234",
    "make": "Tata",
    "model": "Ace",
    "registrationDate": "2022-03-15",
    "expiryDate": "2037-03-14",
    "fuelType": "Diesel",
    "ownerName": "Rajesh Kumar"
  },
  "driverDL": {
    "dlNumber": "MH0120220001234",
    "name": "Suresh Patil",
    "validity": "2028-06-30",
    "categories": ["LMV", "HMV"]
  },
  "plans": [
    { "id": "basic", "name": "Basic", "price": 999, "features": ["Up to 10 vehicles", "Challan alerts", "Basic reports"] },
    { "id": "pro", "name": "Pro", "price": 2499, "recommended": true, "features": ["Up to 50 vehicles", "All alerts", "Full reports", "API access"] },
    { "id": "enterprise", "name": "Enterprise", "price": 4999, "features": ["Unlimited vehicles", "Priority support", "Custom reports", "API access", "Dedicated manager"] }
  ]
}
```
