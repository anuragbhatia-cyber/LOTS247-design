# Milestone 12: My Profile

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement My Profile — the subscriber's personal account hub with tabbed interface for personal details, organization info, and KYC verification.

## Overview

The My Profile section consolidates personal details, organization/business information, and KYC verification status into a clean tabbed interface. It serves both individual vehicle owners and fleet operators who need to manage organization-level data. Subscription management and billing are handled separately in Settings.

**Key Functionality:**
- Profile header with avatar, name, Subscriber ID, account type badge, KYC status
- Personal Information tab: edit name, mobile (OTP re-verification), email, DOB, photo
- Organization tab: business name, type, state, GST, CIN (conditional for fleet/business)
- KYC & Verification tab: document upload, status tracking, rejection handling
- Inline editing with validation

## Recommended Approach: Test-Driven Development

See `product-plan/sections/my-profile/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/my-profile/components/`:

- `MyProfile.tsx` — Profile page with header card and tabbed sections

### Data Layer

- Subscriber profile data: name, mobile, email, DOB, photo
- Organization/business details: name, type, GST, CIN, address
- KYC documents: Aadhaar, PAN, GST Certificate, Company Registration
- Document statuses: Not Submitted, Pending Review, Verified, Rejected
- Account types: Individual, Fleet, Business

### Callbacks

| Callback | Description |
|----------|-------------|
| `onEditPersonal` | Enables inline edit mode for personal fields |
| `onSavePersonal` | Saves personal info changes |
| `onChangeMobile` | Triggers OTP re-verification for mobile change |
| `onUploadPhoto` | Uploads/changes profile photo |
| `onEditOrganization` | Enables inline edit for org fields |
| `onSaveOrganization` | Saves organization changes |
| `onUploadDocument` | Uploads KYC document (JPG, PNG, PDF; max 5MB) |
| `onReuploadDocument` | Re-uploads rejected document |

### Empty States

- **No photo:** Show initials fallback (emerald bg) in avatar
- **No KYC documents:** Show "Not Submitted" status for all documents
- **Individual account:** Hide GST/CIN fields in Organization tab

## Expected User Flows

### Flow 1: Edit Personal Information
1. User navigates to My Profile → Personal Info tab
2. User clicks "Edit" button
3. Fields switch to inline edit mode
4. User modifies name and email
5. User clicks "Save"
6. **Outcome:** Changes saved, confirmation shown

### Flow 2: Change Mobile Number
1. User clicks edit on mobile number field
2. OTP re-verification flow triggers
3. User enters new number and verifies OTP
4. **Outcome:** Mobile number updated after verification

### Flow 3: Upload KYC Document
1. User navigates to KYC & Verification tab
2. User clicks upload on Aadhaar document card
3. Upload modal opens with drag-and-drop (JPG, PNG, PDF; max 5MB)
4. User selects file and uploads
5. **Outcome:** Document status changes to "Pending Review"

### Flow 4: Re-upload Rejected Document
1. User sees a document with "Rejected" status and rejection reason
2. User clicks "Re-upload" action
3. User uploads new document
4. **Outcome:** Document re-submitted for review

## Files to Reference

- `product-plan/sections/my-profile/README.md` — Feature overview
- `product-plan/sections/my-profile/tests.md` — Test instructions
- `product-plan/sections/my-profile/components/` — React components
- `product-plan/sections/my-profile/types.ts` — TypeScript interfaces
- `product-plan/sections/my-profile/sample-data.json` — Test data

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Profile header shows avatar, name, ID, account type badge, KYC badge
- [ ] Tabs work: Personal Info, Organization, KYC & Verification
- [ ] Personal info inline editing with save
- [ ] Mobile change triggers OTP re-verification
- [ ] Photo upload/change with preview
- [ ] Organization tab shows conditional fields (GST/CIN for business types only)
- [ ] GSTIN format validation (15-character pattern)
- [ ] KYC document cards with status badges
- [ ] Document upload with file type/size restrictions
- [ ] Rejected documents show reason and re-upload action
- [ ] Overall KYC badge: Unverified (red), Partial (amber), Verified (emerald)
- [ ] Progress summary ("2 of 4 documents verified")
- [ ] Empty states handled
- [ ] Responsive on mobile
