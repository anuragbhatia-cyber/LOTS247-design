# Milestone 5: Incident Management

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete, Milestone 6 (Vehicle & Driver Management) recommended

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

Implement the Incident Management section with its two sub-sections — Challans and Cases — including list views, detail views, creation flows, comment threads, and challan-to-case escalation.

## Overview

Incident Management handles two distinct sub-sections accessible via a sub-nav under "Incidents" in the sidebar. Challans manage short-lifecycle traffic violation penalties with a 45-day resolution SLA. Cases handle structured long-lifecycle legal matters (accidents, detention, theft, disputes) with lawyer assignment and activity logging. Both sub-sections support a unified comment thread for follow-ups between the user and the LOTS247 team.

**Key Functionality:**
- **Challans:** List with filters, detail with status/actions/comments, 45-day SLA tracking, refund requests on SLA breach
- **Cases:** List with filters, multi-step creation modal, detail with tabs (Timeline/Documents/Comments)
- Unified comment threads on both challans and cases
- Challan-to-case escalation via pre-filled case creation modal
- Subscription gating (free plan shows locked actions with upgrade prompts)

**Challan Lifecycle (User View):** Submitted -> In Progress -> Resolved / On Hold / Not Settled
**Case Lifecycle (User View):** Submitted -> In Progress -> Resolved / Document Requested / Extended

**Case Types:** Theft, Detention, Bail, Accidents, FIRs, Superdari, Vehicle Impounding, E-Way Bill, Others

## Recommended Approach: Test-Driven Development

See `product-plan/sections/incident-management/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/incident-management/components/`:
- `ChallanList.tsx` — Challan table with columns for ID, vehicle, violation, amount, status, and actions; filterable by vehicle, date range, status, amount range
- `ChallanDetail.tsx` — Challan detail view with status badge, key fields, action buttons (Pay Now, Dispute, Escalate to Case, Download Receipt), and comment thread
- `CaseList.tsx` — Case table with columns for ID, type, vehicle, status, and actions; filterable by status, case type, vehicle
- `CaseDetail.tsx` — Case detail with header summary, assigned lawyer info, and tabbed sections (Timeline, Documents, Comments)

Additional top-level views:
- `IncidentManagement.tsx` — Wrapper with sub-nav toggling between Challans and Cases
- `ChallanList.tsx` (top-level) — Preview wrapper for challan list
- `CaseList.tsx` (top-level) — Preview wrapper for case list
- `ChallanDetail.tsx` (top-level) — Preview wrapper for challan detail
- `CaseDetail.tsx` (top-level) — Preview wrapper for case detail

### Data Layer

Key types from `types.ts`: Challan, ChallanStatus, ChallanType, ChallanActivity, ChallanActivityType, Case, CaseStatus, CaseType, CaseOrigin, CaseActivity, CaseDocument, CaseReport, Comment, Vehicle, Driver, Lawyer

You'll need to:
- Create CRUD API endpoints for challans and cases
- Implement challan status transitions (Submitted -> In Progress -> Resolved/On Hold/Not Settled)
- Implement case status transitions (Submitted -> In Progress -> Resolved/Document Requested/Extended)
- Track the 45-day SLA deadline per challan and flag breaches
- Implement comment threads (polymorphic: entityType = 'challan' | 'case')
- Implement document upload and storage for cases
- Build the multi-step case creation flow (type -> vehicle -> driver -> description -> documents -> submit)
- Implement challan-to-case escalation with data pre-fill
- Generate activity timeline events for status changes, assignments, and notes
- Implement subscription gating (lock actions for free plan users)

### Callbacks — Challan List

| Callback | Description |
|----------|-------------|
| `onView` | Navigate to challan detail page |
| `onAddFollowUp` | Open follow-up comment on a challan |
| `onPay` | Initiate challan payment |
| `onDispute` | Initiate challan dispute |
| `onEscalateToCase` | Open case creation modal pre-filled with challan data |
| `onDownloadReceipt` | Download payment receipt PDF |
| `onRequestRefund` | Request refund for SLA-breached challan |

### Callbacks — Challan Detail

| Callback | Description |
|----------|-------------|
| `onPay` | Initiate challan payment |
| `onDispute` | Initiate challan dispute |
| `onEscalateToCase` | Open case creation modal pre-filled with challan data |
| `onDownloadReceipt` | Download payment receipt PDF |
| `onRequestRefund` | Request refund for SLA-breached challan |
| `onAddComment` | Post a comment to the challan thread |
| `onBack` | Navigate back to challan list |

### Callbacks — Case List

| Callback | Description |
|----------|-------------|
| `onView` | Navigate to case detail page |
| `onCreate` | Open multi-step case creation modal |

### Callbacks — Case Detail

| Callback | Description |
|----------|-------------|
| `onUploadDocument` | Upload a document to the case |
| `onAddComment` | Post a comment to the case thread |
| `onBack` | Navigate back to case list |

### Empty States

- No challans: Show "No challans found" with contextual message based on active filters
- No cases: Show "No cases found" with option to create a new case
- No comments on a challan/case: Show "No comments yet — add a follow-up below"
- No documents on a case: Show "No documents attached yet"
- No activity on a case timeline: Show "No activity recorded yet"

## Expected User Flows

### Flow 1: View and Filter Challans
1. User navigates to Incidents -> Challans
2. User sees the challan list table with all challans
3. User filters by status "In Progress" and vehicle "MH04AB1234"
4. Table updates to show only matching challans
5. **Outcome:** User sees filtered challan list

### Flow 2: View Challan Detail and Add Comment
1. User clicks a challan row in the list
2. Challan detail page opens with status badge, key fields, and action buttons
3. User scrolls to the comment thread
4. User types a follow-up message and submits
5. **Outcome:** Comment appears in the thread with timestamp

### Flow 3: Escalate Challan to Case
1. User views a challan detail
2. User clicks "Escalate to Case" action button
3. Multi-step case creation modal opens, pre-filled with challan's vehicle and description
4. User selects case type, confirms details, optionally attaches documents
5. User submits the case
6. **Outcome:** New case is created linked to the original challan; challan shows escalation reference

### Flow 4: Create a New Case
1. User navigates to Incidents -> Cases
2. User clicks "Create Case" button
3. Multi-step modal opens: Step 1 (case type) -> Step 2 (vehicle) -> Step 3 (driver) -> Step 4 (description) -> Step 5 (documents) -> Step 6 (submit)
4. User fills in each step and submits
5. **Outcome:** Case is created and appears in the case list with "Submitted" status

### Flow 5: Request Refund on SLA-Breached Challan
1. User views a challan that has exceeded the 45-day SLA
2. System shows SLA breach indicator
3. User clicks "Request Refund" action button
4. **Outcome:** Refund request is submitted and tracked

## Files to Reference

- `product-plan/sections/incident-management/README.md`
- `product-plan/sections/incident-management/tests.md`
- `product-plan/sections/incident-management/components/`
- `product-plan/sections/incident-management/types.ts`
- `product-plan/sections/incident-management/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Challan list renders with filterable table (vehicle, date range, status, amount)
- [ ] Challan detail shows status badge, key fields, action buttons, and comment thread
- [ ] Pay Now, Dispute, Escalate to Case, Download Receipt actions work
- [ ] 45-day SLA is tracked and refund request is available on breach
- [ ] Case list renders with filterable table (status, case type, vehicle)
- [ ] Case creation multi-step modal works with all steps
- [ ] Case detail shows header, assigned lawyer, and 3 tabs (Timeline, Documents, Comments)
- [ ] Document upload works on case detail
- [ ] Comment threads work on both challans and cases
- [ ] Challan-to-case escalation pre-fills case creation with challan data
- [ ] Sub-nav correctly toggles between Challans and Cases pages
- [ ] Empty states display when no data exists
- [ ] Subscription gating shows locked actions for free plan users
- [ ] Responsive on mobile
