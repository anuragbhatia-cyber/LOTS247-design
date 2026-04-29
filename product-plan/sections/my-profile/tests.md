# My Profile — Test Specifications

## Overview

Tests for profile header, Personal/Organization/KYC tabs, inline editing, phone OTP change, GSTIN verification, and document upload.

---

## 1. Profile Header & Tab Navigation

### Success Path
- [ ] Navigate to My Profile
- [ ] Verify profile header shows: avatar (or initials), name "Rajesh Kumar", role "Fleet Manager", org "Kumar Transport"
- [ ] Verify 3 tabs render: Personal, Organization, KYC
- [ ] Verify "Personal" tab is active by default
- [ ] Tap "Organization" tab — verify organization content loads
- [ ] Tap "KYC" tab — verify KYC document cards load

### Failure Path
- [ ] Profile API fails — verify "Unable to load profile" with retry
- [ ] Avatar image fails to load — verify initials fallback "RK" renders

---

## 2. Personal Tab — Inline Editing

### Success Path
- [ ] Verify fields display: Name, Email, Phone, Designation (read-only mode)
- [ ] Tap Edit icon next to Name — verify field becomes editable
- [ ] Change name to "Rajesh K. Kumar"
- [ ] Tap Save — verify onUpdatePersonal fires with updated name
- [ ] Verify field returns to read-only mode with new value
- [ ] Tap Edit then Cancel — verify original value restored

### Failure Path
- [ ] Save with empty name — verify "Name cannot be empty" error
- [ ] Save with invalid email "rajesh@" — verify "Enter a valid email" error
- [ ] Save API fails — verify "Failed to update. Please try again." toast, field stays in edit mode

---

## 3. Phone Change with OTP

### Success Path
- [ ] Tap Edit next to Phone field
- [ ] Verify phone change modal opens showing current number "9876543210"
- [ ] Enter new number "9876543211"
- [ ] Tap "Send OTP" — verify OTP input appears with countdown timer
- [ ] Enter OTP "123456" — tap Verify
- [ ] Verify onChangePhone fires with new phone and OTP
- [ ] Verify phone field updates to new number
- [ ] Verify success toast "Phone number updated"

### Failure Path
- [ ] Enter same phone as current — verify "New number must be different" error
- [ ] Enter invalid phone "12345" — verify "Enter a valid 10-digit number" error
- [ ] Wrong OTP — verify "Invalid OTP" error
- [ ] OTP expires — verify "Resend OTP" button activates

---

## 4. Organization Tab

### Success Path
- [ ] Tap "Organization" tab
- [ ] Verify fields: Organization Name, Address, GSTIN, Industry Type
- [ ] Edit Organization Name to "Kumar Transport Pvt Ltd"
- [ ] Save — verify update persists
- [ ] Enter GSTIN "22AAAAA0000A1Z5" — verify verification check triggers
- [ ] Verify GSTIN badge shows "Verified" in green

### Failure Path
- [ ] Enter invalid GSTIN format "ABC123" — verify "Invalid GSTIN format" error
- [ ] GSTIN verification fails (not found) — verify "GSTIN not found" error badge
- [ ] Save with empty org name — verify "Organization name is required" error

---

## 5. KYC Tab — Document Upload

### Success Path
- [ ] Tap "KYC" tab
- [ ] Verify document cards: Aadhaar, PAN, Address Proof
- [ ] Verify each card shows status: Not Uploaded / Pending Review / Verified / Rejected
- [ ] Tap Upload on Aadhaar card — verify file picker opens
- [ ] Select a JPG file — verify preview thumbnail appears
- [ ] Verify onUploadDocument fires with "aadhaar" and file
- [ ] Verify status changes to "Pending Review"
- [ ] Verify uploaded document shows with timestamp

### Failure Path
- [ ] Upload file exceeding 5MB — verify "File size must be under 5MB" error
- [ ] Upload unsupported format (.exe) — verify "Supported formats: JPG, PNG, PDF" error
- [ ] Upload fails (network) — verify "Upload failed. Tap to retry."
- [ ] Delete a verified document — verify confirmation "Are you sure? This will require re-verification."

---

## Empty State Tests

- [ ] New user — all fields show default/placeholder text
- [ ] KYC tab — all documents show "Not Uploaded" with upload CTA
- [ ] No GSTIN entered — GSTIN field shows placeholder "Enter your GSTIN"

## Component Interaction Tests

- [ ] Editing a field and switching tabs — unsaved changes prompt "Discard changes?"
- [ ] Phone change OTP timer continues if user switches tabs and returns
- [ ] GSTIN verification result persists across tab switches
- [ ] Document upload progress continues in background while user views other tabs

## Edge Cases

- [ ] Name with Unicode characters (Hindi/Marathi) — renders correctly
- [ ] Very long address (500+ chars) — wraps correctly, no overflow
- [ ] GSTIN with lowercase letters auto-uppercases
- [ ] Upload the same document twice — replaces previous with confirmation
- [ ] Concurrent edits from two devices — last write wins with conflict toast
- [ ] Profile photo upload (if supported) — circular crop interface

## Accessibility Checks

- [ ] Profile header has aria-label with user name and role
- [ ] Tab navigation with keyboard (arrow keys, Enter)
- [ ] Edit/Save/Cancel buttons have descriptive aria-labels
- [ ] Phone change modal traps focus
- [ ] Document upload cards have aria-label with document type and status
- [ ] OTP input fields have aria-label "Enter OTP digit X"
- [ ] Form validation errors linked to fields via aria-describedby

## Sample Test Data

```json
{
  "profile": {
    "name": "Rajesh Kumar",
    "email": "rajesh@fleet.in",
    "phone": "9876543210",
    "designation": "Fleet Manager",
    "avatar": null
  },
  "organization": {
    "name": "Kumar Transport",
    "address": "123, Industrial Area, Andheri East, Mumbai - 400069",
    "gstin": "27AABCK1234F1ZX",
    "gstinVerified": true,
    "industryType": "Logistics"
  },
  "kycDocuments": [
    { "type": "aadhaar", "label": "Aadhaar Card", "status": "verified", "uploadedAt": "2026-03-10T12:00:00Z", "fileName": "aadhaar_front.jpg" },
    { "type": "pan", "label": "PAN Card", "status": "pendingReview", "uploadedAt": "2026-04-01T09:00:00Z", "fileName": "pan_card.pdf" },
    { "type": "addressProof", "label": "Address Proof", "status": "notUploaded", "uploadedAt": null, "fileName": null }
  ]
}
```
