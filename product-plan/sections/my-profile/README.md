# My Profile — User & Organization Settings

## Overview

My Profile provides a comprehensive view and edit interface for the user's personal information, organization details, and KYC documents. It features a profile header with avatar, 3 content tabs (Personal, Organization, KYC), inline editing with save/cancel, phone number change via OTP, GSTIN entry with verification, and document upload for KYC compliance.

## User Flows

1. **View Profile** — User sees a profile header with avatar, name, role, and organization. Below are 3 tabs.
2. **Personal Tab** — View and inline-edit personal details: name, email, phone, designation.
3. **Phone Change** — Changing phone triggers OTP verification flow before saving.
4. **Organization Tab** — View and edit organization details: name, address, GSTIN, industry type.
5. **GSTIN Verification** — Entering a GSTIN triggers auto-verification with real-time status.
6. **KYC Tab** — Upload and manage identity documents (Aadhaar, PAN, address proof) with status tracking.

## Design Decisions

- Profile header is a card with avatar (initials fallback), name in large text, role badge.
- Inline editing uses an "Edit" icon next to each field; fields become editable on tap.
- Save and Cancel buttons appear when a field is in edit mode.
- Phone change opens a modal with current number, new number input, and OTP step.
- GSTIN field shows a verification badge (verified/pending/invalid) inline.
- KYC documents displayed as cards with upload area, file preview, and status badge.
- Document statuses: Not Uploaded, Pending Review, Verified, Rejected.

## Data Used

- `product/sections/my-profile/data.json` — Sample user profile, organization, KYC documents.
- `product/sections/my-profile/types.ts` — UserProfile, Organization, KYCDocument.

## Components Provided

| Component | File | Description |
|-----------|------|-------------|
| MyProfile | MyProfile.tsx | Full profile management interface |

## Callback Props

| Prop | Component | Signature | Purpose |
|------|-----------|-----------|---------|
| onUpdatePersonal | MyProfile | `(data: Partial<UserProfile>) => void` | Saves personal details |
| onChangePhone | MyProfile | `(newPhone: string, otp: string) => void` | Updates phone with OTP |
| onUpdateOrganization | MyProfile | `(data: Partial<Organization>) => void` | Saves org details |
| onVerifyGSTIN | MyProfile | `(gstin: string) => void` | Triggers GSTIN verification |
| onUploadDocument | MyProfile | `(docType: string, file: File) => void` | Uploads KYC document |
| onDeleteDocument | MyProfile | `(docType: string) => void` | Removes uploaded document |
