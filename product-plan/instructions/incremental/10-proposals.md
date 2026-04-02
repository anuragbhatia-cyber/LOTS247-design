# Milestone 10: Proposals

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete, Milestone 4 (Compliance Dashboard) recommended, Milestone 5 (Incident Management) recommended

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Implement the Proposals section — a tracking hub for service requests originating from Compliance checks, with proposal listing, detail views with timeline and chat-style follow-up, and lifecycle management.

## Overview

Proposals is a tracking hub for service requests that originate from Compliance checks (Challan, DL, RC). When a user runs a compliance check and finds issues, they can send a proposal to the LOTS247 team requesting resolution. Users can then track proposal status, follow up with the team, and see when proposals convert into incidents or get rejected. Converted proposals link to the created incidents.

**Key Functionality:**
- Two-tab layout: Active Proposals / Past Proposals
- Active proposals table with columns: Created Date, Proposal ID, Type (Challan/DL/RC), Quantity, Amount, Status, Actions
- Proposal statuses: Sent, Received, Converted, Rejected
- Proposal detail view with two tabs: Overview (status timeline + details) and Follow-up (chat-style thread)
- Follow-up tab uses the same chat-style comment thread pattern as Incident Management
- Cancel action available on active proposals
- Converted proposals link to created incidents
- When a proposal is Converted or Rejected, it moves to Past Proposals

## Recommended Approach: Test-Driven Development

See `product-plan/sections/proposals/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/proposals/components/`:
- `ProposalList.tsx` — Two-tab proposal list (Active/Past) with table showing Created Date, Proposal ID, Type, Quantity, Amount, Status, and Actions (Follow-up, Cancel, View Detail)
- `ProposalDetail.tsx` — Detail view with two tabs: Overview (status timeline + proposal details) and Follow-up (chat-style comment thread)

Additional top-level views:
- `ProposalManagement.tsx` — Preview wrapper for the proposal list
- `ProposalDetail.tsx` (top-level) — Preview wrapper for the proposal detail

### Data Layer

Key types from `types.ts`: Proposal, ProposalType, ProposalStatus, ProposalActivity, ProposalActivityType, Comment

You'll need to:
- Create CRUD API endpoints for proposals
- Implement proposal creation from Compliance checks (Challan check, DL check, RC check)
- Implement proposal status transitions: Sent -> Received -> Converted / Rejected
- When a proposal is Converted, create a linked incident and store the `linkedIncidentId`
- When a proposal is Converted or Rejected, move it to Past Proposals
- Implement the comment/follow-up thread (same pattern as Incident Management comments)
- Track proposal activities (status changes, notes) with timestamps
- Implement proposal cancellation for active proposals
- Link proposals to their originating compliance check data

### Callbacks — Proposal List

| Callback | Description |
|----------|-------------|
| `onView` | Navigate to proposal detail page |
| `onFollowUp` | Open follow-up thread for a proposal |
| `onCancel` | Cancel an active proposal (with confirmation) |

### Callbacks — Proposal Detail

| Callback | Description |
|----------|-------------|
| `onAddComment` | Post a follow-up message to the proposal thread |
| `onCancel` | Cancel the proposal (with confirmation) |
| `onBack` | Navigate back to the proposal list |

### Empty States

- No active proposals: Show "No active proposals. Proposals are created from Compliance checks."
- No past proposals: Show "No past proposals yet"
- No comments on a proposal: Show "No follow-ups yet — send a message below"
- No activity on a proposal timeline: Show "No activity recorded yet"

## Expected User Flows

### Flow 1: View Active and Past Proposals
1. User navigates to Proposals section
2. User sees "Active Proposals" tab selected by default
3. User views the table of active proposals with status badges (Sent, Received)
4. User clicks "Past Proposals" tab
5. Table switches to show Converted and Rejected proposals
6. **Outcome:** User can see all proposals organized by lifecycle state

### Flow 2: View Proposal Detail and Timeline
1. User clicks a proposal row in the Active list
2. Proposal detail page opens with "Overview" tab active
3. User sees the status timeline showing progression (Sent -> Received)
4. User sees proposal details: type, quantity, amount, creation date
5. **Outcome:** User understands the current state and history of the proposal

### Flow 3: Follow Up on a Proposal
1. User is on a proposal detail page
2. User clicks the "Follow-up" tab
3. User sees the chat-style thread with previous messages from user and LOTS247 team
4. User types a follow-up message and submits
5. **Outcome:** Message appears in the thread; LOTS247 team is notified

### Flow 4: Cancel an Active Proposal
1. User is viewing an active proposal
2. User clicks "Cancel" action
3. Confirmation dialog appears
4. User confirms cancellation
5. **Outcome:** Proposal is cancelled and moves to Past Proposals

### Flow 5: Navigate from Converted Proposal to Incident
1. User views a Converted proposal in Past Proposals
2. User clicks the linked incident reference
3. **Outcome:** User is navigated to the incident detail page in Incident Management

## Files to Reference

- `product-plan/sections/proposals/README.md`
- `product-plan/sections/proposals/tests.md`
- `product-plan/sections/proposals/components/`
- `product-plan/sections/proposals/types.ts`
- `product-plan/sections/proposals/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Two-tab layout works (Active Proposals / Past Proposals)
- [ ] Active proposals table renders with correct columns and status badges
- [ ] Past proposals table renders with Converted and Rejected proposals
- [ ] Proposal detail page renders with Overview and Follow-up tabs
- [ ] Overview tab shows status timeline and proposal details
- [ ] Follow-up tab shows chat-style comment thread (matching Incident Management pattern)
- [ ] Posting follow-up messages works
- [ ] Cancel action works with confirmation dialog
- [ ] Cancelled proposals move to Past Proposals
- [ ] Converted proposals show linked incident reference
- [ ] Clicking linked incident navigates to Incident Management detail
- [ ] Proposals can be created from Compliance checks (Challan, DL, RC)
- [ ] Status transitions work correctly (Sent -> Received -> Converted/Rejected)
- [ ] Empty states display when no data exists
- [ ] Responsive on mobile
