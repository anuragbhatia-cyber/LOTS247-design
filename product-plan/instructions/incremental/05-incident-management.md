# Milestone 5: Incident Management

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement Incident Management — handling both Challans (short-lifecycle traffic violations) and Cases (long-lifecycle legal matters) with sub-navigation, detail views, and unified comment threads.

## Overview

The Incident Management section handles two distinct sub-sections accessible via sub-nav: **Challans** (traffic violation penalties with a 45-day resolution SLA) and **Cases** (structured legal matters like accidents, detention, theft with lawyer assignment). Both support unified comment threads for follow-ups between user and LOTS247 team.

**Key Functionality:**
- Challans list with filtering by vehicle, date, status, amount
- Challan detail with status badge, key fields, actions (Pay Now, Dispute, Escalate to Case, Download Receipt)
- Cases list with filtering by status, type, vehicle
- Case creation via multi-step modal (type → vehicle → driver → description → documents)
- Case detail with Timeline, Documents, and Comments tabs
- Unified comment thread on both challans and cases
- 45-day SLA tracking on challans with refund capability

## Recommended Approach: Test-Driven Development

See `product-plan/sections/incident-management/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/incident-management/components/`:

- `IncidentManagement.tsx` — Main container with sub-nav (Challans | Cases)
- Additional sub-components for challan list, case list, detail views

### Data Layer

**Challan Lifecycle (User View):**
- Submitted → In Progress → Resolved / On Hold / Not Settled
- 45-day SLA from creation; if breached, user can request refund

**Case Lifecycle (User View):**
- Submitted → In Progress → Resolved / Document Requested / Extended
- No fixed SLA; cases can originate from lawyer calls

### Callbacks

| Callback | Description |
|----------|-------------|
| `onViewChallan` | Opens challan detail view |
| `onPayChallan` | Initiates challan payment |
| `onDisputeChallan` | Starts dispute process |
| `onEscalateToCase` | Opens case creation pre-filled with challan data |
| `onDownloadReceipt` | Downloads challan receipt PDF |
| `onRequestRefund` | Requests refund for SLA breach |
| `onCreateCase` | Opens multi-step case creation modal |
| `onViewCase` | Opens case detail page |
| `onPostComment` | Adds comment to challan or case thread |
| `onUploadDocument` | Uploads document to case |

### Empty States

- **No challans:** Show "No challans found" with helpful message
- **No cases:** Show "No cases yet" with CTA to create first case
- **No comments:** Show "No comments yet" in comment thread
- **No documents:** Show upload prompt in case documents tab

## Expected User Flows

### Flow 1: View Challan Detail
1. User navigates to Incidents → Challans tab
2. User clicks a challan row in the table
3. User sees status badge, key fields, action buttons, and comment thread
4. **Outcome:** Full challan detail visible with available actions

### Flow 2: Escalate Challan to Case
1. User views a challan detail
2. User clicks "Escalate to Case" button
3. Multi-step case creation modal opens pre-filled with challan data (vehicle, description)
4. User completes remaining steps and submits
5. **Outcome:** New case created, linked to original challan

### Flow 3: Create a New Case
1. User navigates to Incidents → Cases tab
2. User clicks "Create Case" button
3. Multi-step modal: case type → vehicle → driver → description → documents → submit
4. **Outcome:** New case created with status "Submitted"

### Flow 4: Post Comment Follow-up
1. User opens a case or challan detail
2. User types a comment in the thread
3. User submits the comment
4. **Outcome:** Comment appears in chronological feed with timestamp

## Files to Reference

- `product-plan/sections/incident-management/README.md` — Feature overview
- `product-plan/sections/incident-management/tests.md` — Test instructions
- `product-plan/sections/incident-management/components/` — React components
- `product-plan/sections/incident-management/types.ts` — TypeScript interfaces
- `product-plan/sections/incident-management/sample-data.json` — Test data

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Sub-nav switches between Challans and Cases views
- [ ] Challans list with filtering (vehicle, date, status, amount)
- [ ] Challan detail shows status badge, fields, actions, comments
- [ ] Cases list with filtering (status, type, vehicle)
- [ ] Case creation multi-step modal works end-to-end
- [ ] Case detail with Timeline, Documents, Comments tabs
- [ ] Escalate to Case pre-fills from challan data
- [ ] Comment thread works for both challans and cases
- [ ] 45-day SLA tracking with refund option when breached
- [ ] Subscription gating on appropriate actions
- [ ] Empty states for all views
- [ ] Responsive on mobile
