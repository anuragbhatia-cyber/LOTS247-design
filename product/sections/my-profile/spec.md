# My Profile Specification

## Overview
The My Profile section is the subscriber's personal account hub, consolidating personal details, organization/business information, and KYC verification status into a clean tabbed interface. It serves both individual vehicle owners managing basic contact info and KYC, and fleet operators who need to manage organization-level data like GST and fleet registration details. Subscription management and billing are handled in the Settings section.

## User Flows

### Profile Header
- User navigates to My Profile from the user dropdown and sees a header card with avatar (initials fallback), full name, Subscriber ID (e.g., LWD-1167612), account type badge (Individual/Fleet/Business), and KYC verification status

### Personal Information
- User views personal details: full name, mobile number (+91), email, date of birth, profile photo
- User clicks "Edit" to modify details inline; mobile number change triggers OTP re-verification
- User uploads/changes profile photo via file picker

### Organization / Business Details
- User views business info: business name, business type (Individual/Proprietorship/LLP/Private Limited), state, pincode, city
- Fleet/Business accounts see additional fields: GST number (15-digit GSTIN), CIN, registered address
- Individual accounts see a simplified view without GST/CIN fields
- User edits organization details with inline validation (GSTIN format check)

### KYC & Verification
- User sees KYC status with per-document indicators: Aadhaar (masked XXXX XXXX 1234), PAN (masked XXXXX1234X), GST Certificate, Company Registration Certificate
- Each document shows status: Not Submitted, Pending Review, Verified, or Rejected
- User uploads documents via file picker (JPG, PNG, PDF; max 5 MB)
- Rejected documents show rejection reason and "Re-upload" action
- Overall KYC badge: Unverified (red), Partial (amber), Fully Verified (emerald)
- Individual accounts require Aadhaar + PAN; Fleet/Business also require GST Certificate

## UI Requirements

### Profile Header Card
- 64px avatar with initials fallback (emerald bg), or uploaded photo
- Full name in large type, Subscriber ID in mono font
- Account type badge: Individual (stone), Fleet (emerald), Business (amber)
- KYC badge: Unverified (red), Partial (amber), Verified (emerald)

### Tab Navigation
- Horizontal tabs: Personal Info, Organization, KYC & Verification
- Tabs scroll horizontally on mobile with active indicator

### Personal Info Tab
- Two-column grid (single on mobile) with labeled fields
- Inline edit mode: fields switch to inputs without page change
- Phone shows "+91" prefix; editing opens OTP flow
- Photo upload with preview and remove

### Organization Tab
- Two-column field grid
- GSTIN format validation (2-digit state code + 10-char PAN + entity + check digit + Z)
- Conditional rendering: GST/CIN only for Proprietorship/LLP/Private Limited
- Address section with street, city, state, and pincode

### KYC & Verification Tab
- Document cards in grid: type icon, name, status badge, masked number, upload date, action button
- Upload modal with drag-and-drop, file type restrictions (JPG, PNG, PDF; max 5 MB)
- Rejected docs show reason in red banner
- Progress summary: "2 of 4 documents verified"

## Configuration
- shell: true
