# Onboarding & Activation Section - Test Instructions

## OnboardingFlow

### Step Navigation
- [ ] Flow starts at login/registration step
- [ ] After phone verification, advances to vehicle addition step
- [ ] After vehicle addition, advances to driver addition step
- [ ] After driver addition (or skip), advances to plan selection step
- [ ] After plan selection, shows activation success

### Progress Indicator
- [ ] Shows correct step highlighted at each stage
- [ ] Completed steps show check mark
- [ ] Current step is visually distinguished

## LoginStep

### Rendering
- [ ] Shows phone number input field
- [ ] Shows "Get OTP" button
- [ ] Shows link to register for new users

### Validation
- [ ] Phone number must be 10+ digits
- [ ] "Get OTP" button disabled until valid phone number entered
- [ ] After OTP sent, shows 6-digit OTP input
- [ ] OTP input accepts only digits

### OTP Flow
- [ ] Countdown timer shows after OTP is sent
- [ ] "Resend OTP" appears after countdown expires
- [ ] Incorrect OTP shows error message
- [ ] Correct OTP advances to next step

## RegistrationStep

### Rendering
- [ ] Shows business name, business type dropdown, state, pincode fields
- [ ] Shows terms and conditions checkbox
- [ ] Submit button disabled until required fields filled and terms accepted

### Validation
- [ ] Business name required (minimum 2 characters)
- [ ] Pincode must be 6 digits
- [ ] Terms must be accepted

## PhoneVerificationStep

### Rendering
- [ ] Shows phone input with country code prefix (+91)
- [ ] After sending OTP, shows 6-digit OTP input grid

### Interactions
- [ ] Auto-focus moves to next OTP digit field
- [ ] Backspace moves to previous field
- [ ] Paste fills all fields
- [ ] Countdown timer for resend

## VehicleAdditionStep

### Rendering
- [ ] Shows RC number input field
- [ ] Shows "Fetch Details" button
- [ ] After fetch, shows vehicle details (read-only) or manual entry form

### Fetch Flow
- [ ] Clicking "Fetch Details" shows loading state
- [ ] Success: auto-populates vehicle details
- [ ] Failure: shows error and "Enter Manually" option

### Validation
- [ ] RC number required (minimum 6 characters)
- [ ] RC number auto-formats to uppercase
- [ ] Non-alphanumeric characters stripped

## DriverAdditionStep

### Rendering
- [ ] Shows driver name, license number, license expiry fields
- [ ] Shows "Skip" button (this step is optional)
- [ ] Shows "Add Driver" submit button

### Interactions
- [ ] Skip button advances to plan selection
- [ ] Driver name minimum 2 characters
- [ ] License number minimum 6 characters

## PlanSelectionStep

### Rendering
- [ ] Shows 4 plan cards: Free, U Drive, B Safe, V Care
- [ ] Recommended plan (V Care) has visual highlight and "Top Seller" badge
- [ ] Each plan shows feature highlights
- [ ] Free plan shows limitations

### Interactions
- [ ] Clicking a plan card selects it
- [ ] Selected plan shows visual confirmation
- [ ] "Get Started" button activates selected plan
- [ ] For paid plans, payment flow would be triggered

## Responsive Design
- [ ] OnboardingFlow layout is centered and responsive
- [ ] Plan cards: 1 column on mobile, 2 on tablet, 4 on desktop
- [ ] Form inputs are full-width on mobile
- [ ] Truck animation hides on small screens
