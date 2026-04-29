# API Catalogue — Test Specifications

## Overview

Tests for API card grid, search, detail page with Description/Endpoints tabs, contact modal, and credit top-up flow.

---

## 1. API Catalogue Grid

### Success Path
- [ ] Navigate to API Catalogue
- [ ] Verify grid of API cards renders
- [ ] Verify each card shows: name, description (truncated), credit cost chip, status badge
- [ ] Verify responsive layout: 1 column on mobile, 2 on tablet, 3 on desktop
- [ ] Search for "Vahan" — verify only matching APIs show
- [ ] Verify credit balance indicator shows current balance at top

### Failure Path
- [ ] API list fails to load — verify error state with "Unable to load APIs" and retry
- [ ] Search with no matches — verify "No APIs found for your search" message
- [ ] Empty catalogue (new platform) — verify "No APIs available yet" empty state

---

## 2. API Detail Page

### Success Path
- [ ] Tap "Vahan Vehicle Lookup" card — verify ApiDetail opens
- [ ] Verify header: API name, status badge, credit cost
- [ ] Verify "Description" tab is active by default
- [ ] Verify description shows: overview text, use cases list, pricing info
- [ ] Tap "Endpoints" tab — verify endpoint list renders
- [ ] Verify each endpoint shows: HTTP method badge, path, description
- [ ] Tap an endpoint — verify expanded view with parameters table, sample request, sample response
- [ ] Verify "Request Access" button is visible

### Failure Path
- [ ] API detail for unavailable API — verify "Coming Soon" overlay with notification opt-in
- [ ] Endpoint documentation missing — verify "Documentation pending" placeholder

---

## 3. Contact Modal

### Success Path
- [ ] Tap "Request Access" on an API
- [ ] Verify ContactModal opens with pre-filled API name in dropdown
- [ ] Fill: Name "Rajesh Kumar", Email "rajesh@fleet.in", Message "Need access for 50 vehicles"
- [ ] Tap Submit — verify onSubmitContact fires with form data
- [ ] Verify success message "Request submitted. We'll contact you within 24 hours."
- [ ] Verify modal closes

### Failure Path
- [ ] Submit with empty email — verify "Email is required" error
- [ ] Submit with invalid email — verify "Enter a valid email" error
- [ ] Server error on submit — verify "Failed to submit. Please try again." error
- [ ] Submit with empty message — verify "Please describe your requirements" error

---

## 4. Credit Top-Up

### Success Path
- [ ] Tap credit balance indicator
- [ ] Verify TopUpModal opens with credit packages (e.g., 100 credits for Rs 499, 500 for Rs 1999)
- [ ] Select "500 credits" package
- [ ] Tap "Purchase" — verify payment flow initiates
- [ ] On payment success — verify credit balance updates
- [ ] Verify success toast "500 credits added to your account"

### Failure Path
- [ ] Payment fails — verify "Payment failed. Credits not added." error with retry
- [ ] Payment cancelled — verify modal remains open with packages
- [ ] Network error during payment — verify "Connection lost. Please check and try again."

---

## Empty State Tests

- [ ] No APIs in catalogue — "APIs will be available soon" with illustration
- [ ] Zero credit balance — credit indicator shows "0" with "Top Up Now" CTA
- [ ] API with no endpoints documented — "Endpoints coming soon"

## Component Interaction Tests

- [ ] Search input debounces by 300ms to avoid excessive filtering
- [ ] Tab switch in ApiDetail preserves scroll position per tab
- [ ] Opening ContactModal from different APIs pre-fills the correct API name
- [ ] Credit top-up success updates the balance displayed on all API cards

## Edge Cases

- [ ] API name with 80+ characters — truncated on card, full name on detail
- [ ] API with 20+ endpoints — scrollable endpoint list
- [ ] Sample request/response with deeply nested JSON — properly formatted with indentation
- [ ] Credit cost of 0 (free API) — shows "Free" instead of credit chip
- [ ] Concurrent top-up from two tabs — only one succeeds, balance correct

## Accessibility Checks

- [ ] API cards are keyboard navigable with Enter to open detail
- [ ] Credit cost chips have aria-label (e.g., "Costs 5 credits per request")
- [ ] HTTP method badges have aria-label (e.g., "GET request")
- [ ] Code blocks in endpoints have appropriate roles
- [ ] ContactModal form fields have labels
- [ ] TopUpModal package selection works with keyboard

## Sample Test Data

```json
{
  "apis": [
    {
      "id": "api-001",
      "name": "Vahan Vehicle Lookup",
      "description": "Fetch vehicle details from RC number via the Vahan database",
      "creditCost": 5,
      "status": "active",
      "category": "Vehicle",
      "endpoints": [
        {
          "method": "POST",
          "path": "/api/v1/vehicle/lookup",
          "description": "Look up vehicle by RC number",
          "parameters": [{ "name": "rcNumber", "type": "string", "required": true }],
          "sampleRequest": { "rcNumber": "MH01AB1234" },
          "sampleResponse": { "make": "Tata", "model": "Ace", "fuelType": "Diesel" }
        }
      ]
    },
    {
      "id": "api-002",
      "name": "Sarathi DL Verification",
      "description": "Verify driving license details from DL number",
      "creditCost": 3,
      "status": "active",
      "category": "Driver"
    }
  ],
  "creditBalance": 150,
  "creditPackages": [
    { "id": "pkg-100", "credits": 100, "price": 499 },
    { "id": "pkg-500", "credits": 500, "price": 1999 },
    { "id": "pkg-1000", "credits": 1000, "price": 3499 }
  ]
}
```
