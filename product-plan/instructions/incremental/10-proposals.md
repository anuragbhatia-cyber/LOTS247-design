# Milestone 10: Proposals

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Proposals section — a tracking hub for service requests originating from compliance checks, with follow-up capability and conversion tracking.

## Overview

Proposals is a tracking hub for service requests originating from Compliance checks (Challan, DL, RC). Users can view all sent proposals, track their status, follow up with the LOTS team, and see when proposals convert into incidents or get rejected.

**Key Functionality:**
- View proposals in two tabs: Active Proposals and Past Proposals
- Track proposal status: Sent, Converted, Rejected
- Follow up with LOTS team via chat-style thread (same pattern as Incident Management)
- View proposal detail with Overview (timeline + details) and Follow-up tabs
- Converted proposals link to created incidents
- Cancel active proposals

## Recommended Approach: Test-Driven Development

See `product-plan/sections/proposals/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/proposals/components/`:

- `Proposals.tsx` — Main proposals interface with tabs and list

### Data Layer

- Proposals list with Active/Past tabs
- Proposal detail: ID, type (Challan/DL/RC), quantity, amount, status, timeline
- Follow-up thread (chat-style, matching Incident Management pattern)
- Status transitions: Sent → Converted / Rejected (moves to Past)
- Links between converted proposals and created incidents

### Callbacks

| Callback | Description |
|----------|-------------|
| `onViewProposal` | Opens proposal detail view |
| `onFollowUp` | Posts follow-up message in thread |
| `onCancelProposal` | Cancels an active proposal |
| `onTabChange` | Switches between Active and Past tabs |
| `onViewLinkedIncident` | Navigates to linked incident for converted proposals |

### Empty States

- **No active proposals:** Show "No active proposals" with context about how proposals originate
- **No past proposals:** Show "No past proposals yet"
- **No follow-up messages:** Show empty state in follow-up tab

## Expected User Flows

### Flow 1: View Active Proposals
1. User navigates to Proposals section
2. Active Proposals tab shows table with Created Date, ID, Type, Quantity, Amount, Status, Actions
3. **Outcome:** User sees all pending proposals at a glance

### Flow 2: View Proposal Detail
1. User clicks a proposal row
2. Detail view opens with Overview tab (timeline + details) and Follow-up tab
3. **Outcome:** User sees complete proposal information

### Flow 3: Follow Up on Proposal
1. User opens a proposal detail
2. User switches to Follow-up tab
3. User types and sends a follow-up message
4. **Outcome:** Message appears in chat-style thread

### Flow 4: View Converted Proposal
1. User switches to Past Proposals tab
2. User clicks a "Converted" proposal
3. User sees link to the created incident
4. **Outcome:** User can navigate to the related incident

## Files to Reference

- `product-plan/sections/proposals/README.md` — Feature overview
- `product-plan/sections/proposals/tests.md` — Test instructions
- `product-plan/sections/proposals/components/` — React components
- `product-plan/sections/proposals/types.ts` — TypeScript interfaces
- `product-plan/sections/proposals/sample-data.json` — Test data

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Two-tab layout works (Active / Past)
- [ ] Proposals table shows all columns
- [ ] Detail view with Overview and Follow-up tabs
- [ ] Follow-up chat thread works (matches Incident Management pattern)
- [ ] Cancel action works on active proposals
- [ ] Converted proposals link to incidents
- [ ] Status badges render correctly (Sent, Converted, Rejected)
- [ ] Empty states for all views
- [ ] Responsive on mobile
