# Proposals

## Overview

Proposals is a tracking hub for service requests originating from Compliance checks (Challan, DL, RC). Users can view all sent proposals, track their status, follow up with the LOTS team, and see when proposals convert into incidents or get rejected.

## User Flows

- User sends a proposal from Compliance (challan check, DL check, or RC check) -- it appears in Active Proposals
- User views the proposals list with three tabs: Sent, Received, and Past Proposals
- Table rows show: Created Date, Proposal ID, Type (Challan/DL/RC), Quantity, Amount, Status (Sent/Received/Converted/Rejected), and Actions (Follow-up, Cancel, View Detail)
- User taps into a proposal detail view with two tabs: Overview (timeline + details) and Follow-up (chat-style thread, same pattern as Incident Management)
- When a proposal is Converted or Rejected, it moves to Past Proposals
- Converted proposals link to the created incidents

## Components Provided

- `ProposalList` -- Lists all proposals with tab filtering (Sent / Received / Past), search, and action buttons
- `ProposalDetail` -- Shows full proposal details with Overview tab (status timeline, proposal info) and Follow-up tab (chat-style comment thread)

## Data Requirements

- **Proposal[]** -- Proposal records with type, quantity, amount, status, and optional linked incident ID
- **ProposalActivity[]** -- Timeline entries for status changes and team notes
- **Comment[]** -- Follow-up thread messages between user and LOTS team

## Callback Props

### ProposalListProps

| Prop | Type | Description |
|---|---|---|
| `proposals` | `Proposal[]` | The list of proposals to display |
| `onView` | `(id: string) => void` | Called when user wants to view a proposal's details |
| `onFollowUp` | `(id: string) => void` | Called when user wants to follow up on a proposal |
| `onCancel` | `(id: string) => void` | Called when user wants to cancel an active proposal |

### ProposalDetailProps

| Prop | Type | Description |
|---|---|---|
| `proposal` | `Proposal` | The proposal to display |
| `activities` | `ProposalActivity[]` | Timeline of activities for this proposal |
| `comments` | `Comment[]` | Comments / follow-up thread for this proposal |
| `onAddComment` | `(message: string) => void` | Called when user posts a follow-up message |
| `onCancel` | `() => void` | Called when user wants to cancel the proposal |
| `onBack` | `() => void` | Called when user navigates back to the list |

## External Dependencies

- `lucide-react` -- Icon library
- `LanguageContext` -- Provides `{ language }` value (`"en"` | `"hi"`) for bilingual support
- Tailwind CSS v4 with `dark:` variant support

## Status Lifecycle

`sent` -> `received` -> `converted` | `rejected`

## Key Patterns

- Three-tab list view: Sent (active, status=sent), Received (active, status=received), Past (status=converted or rejected)
- Status badges with color coding: Sent (blue), Received (amber), Converted (green), Rejected (red)
- Follow-up tab uses a chat-style comment thread matching the Incident Management pattern
- Timeline activities include status changes and team notes
- Comment system supports user and team author types
- Converted proposals display a link to the associated incident
- Mobile-responsive: table on desktop, card layout on mobile
- All text supports English/Hindi bilingual rendering
