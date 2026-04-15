# Admin Portal — Proposal Management Handoff

## Context

LOTS247 is a fleet compliance management platform. There are **two dashboards**:

1. **Customer Dashboard** (already built) — Fleet owners raise service requests (proposals) for challan resolution, DL verification, and RC verification.
2. **Admin/Team Dashboard** (to be built) — The LOTS internal team receives these requests, reviews them, creates quotes, manages work, and communicates with customers.

This document describes everything you need to build the **admin-side proposal management** section. It mirrors the customer-facing proposal system but from the team's operational perspective.

---

## The Proposal Lifecycle (Both Sides)

```
CUSTOMER SIDE                          ADMIN SIDE
─────────────                          ──────────
Customer raises request ──────────►  New request appears in Inbox
(status: sent)                        (status: sent)

                                      Team picks up request
                                      (status: sent → under_review)

                                      Team reviews, prepares quote,
                                      sets amount, sends proposal
                                      (status: under_review → received)

Customer sees quote ◄────────────    Waiting for customer response
(status: received)                    (status: received)

Customer accepts ─────────────────►  Team converts to incident,
(status: converted)                   assigns service, tracks work
                                      (serviceStatus: pending → in_progress → completed)

Customer rejects ─────────────────►  Proposal closed
(status: rejected)                    (serviceStatus: not_applicable)
```

---

## Shared Data Model

The admin portal uses the **exact same data types** as the customer portal. Both sides read/write to the same proposals, activities, and comments.

### Types

```typescript
type ProposalType = 'Challan' | 'DL' | 'RC'

type ProposalStatus = 'sent' | 'under_review' | 'received' | 'converted' | 'rejected'

type ServiceStatus = 'pending' | 'in_progress' | 'completed' | 'not_applicable'

interface Proposal {
  id: string
  displayId: string              // e.g., "PRP-1001" (shown as "REQ-1001" to customers)
  type: ProposalType
  description: string
  quantity: number               // Number of items (challans, drivers, vehicles)
  amount: number                 // Service fee in INR (₹)
  status: ProposalStatus
  serviceStatus?: ServiceStatus
  linkedIncidentId: string | null
  createdAt: string              // ISO 8601
  updatedAt: string              // ISO 8601
}

interface ProposalActivity {
  id: string
  proposalId: string
  actionType: 'statusChange' | 'note'
  performedBy: string            // "System", "LOTS Team", or team member name
  notes: string
  timestamp: string
}

interface Comment {
  id: string
  entityType: 'proposal'
  entityId: string
  authorType: 'user' | 'team'   // 'user' = customer, 'team' = admin team member
  authorName: string
  message: string
  createdAt: string
}
```

### Customer Info (New for Admin Side)

The customer dashboard doesn't need customer info (the customer is the logged-in user). But the admin side needs to know **who** raised each request. Add this to each proposal:

```typescript
interface ProposalWithCustomer extends Proposal {
  customer: {
    id: string
    name: string                 // e.g., "Rajesh Kumar"
    company: string              // e.g., "Kumar Transport Pvt Ltd"
    phone: string                // e.g., "+91 98765 43210"
    email: string
  }
  assignedTo?: {
    id: string
    name: string                 // Team member handling this proposal
  }
}
```

---

## Admin Screens to Build

### Screen 1: Proposal Queue (List View)

The main operational view. Uses a **tab-based layout** to separate proposals by where they are in the workflow.

#### Tabs

| Tab | Filter | Description | Count Badge |
|-----|--------|-------------|-------------|
| **Inbox** | `status === 'sent'` | New requests from customers, not yet picked up | Yes (unread count) |
| **In Review** | `status === 'under_review'` | Picked up by a team member, being assessed | Yes |
| **Quote Sent** | `status === 'received'` | Quote sent to customer, awaiting their response | Yes |
| **Converted** | `status === 'converted'` | Customer accepted, work in progress or completed | No |
| **Rejected** | `status === 'rejected'` | Declined by customer or team | No |

#### Table Columns

| Column | All Tabs | Notes |
|--------|----------|-------|
| Request ID | Yes | Display as "REQ-1001" format, monospace |
| Customer | Yes | Customer name + company name below |
| Type | Yes | Badge: Challan (amber), DL (purple), RC (sky) |
| Qty | Yes | Number of items |
| Amount (₹) | Yes | INR formatted. In Inbox tab, may show "—" if not yet quoted |
| Created | Yes | Relative or absolute date |
| Assigned To | In Review, Quote Sent | Team member name or "Unassigned" |
| Service Status | Converted only | pending / in_progress / completed badges |
| Linked Incident | Converted only | Incident ID as clickable link |
| Actions | Yes | Context menu (see below) |

#### Actions Per Tab

**Inbox tab:**
- **Pick Up** — Assign to self, move to `under_review`
- **Assign** — Assign to a specific team member, move to `under_review`
- **View** — Open detail view
- **Reject** — Reject with reason (skips the quote step)

**In Review tab:**
- **Send Quote** — Opens quote modal (set amount, add note), moves to `received`
- **Reassign** — Change assigned team member
- **View** — Open detail view
- **Reject** — Reject with reason

**Quote Sent tab:**
- **View** — Open detail view
- **Revise Quote** — Update amount, resend
- **Withdraw** — Pull back the quote (move back to `under_review`)

**Converted tab:**
- **View** — Open detail view
- **Update Service Status** — Change between pending / in_progress / completed
- **View Incident** — Navigate to linked incident

**Rejected tab:**
- **View** — Open detail view
- **Reopen** — Move back to Inbox (status → `sent`)

#### Filters & Search

- **Search:** By request ID, customer name, company name, or description
- **Type filter:** All / Challan / DL / RC
- **Assigned To filter:** All / specific team members / Unassigned
- **Date range:** Created date from/to
- **Sort:** By date (newest/oldest), amount (high/low), quantity (high/low)

---

### Screen 2: Proposal Detail (Admin View)

When a team member clicks into a proposal, they see the full detail view with admin-specific actions.

#### Header

- Back button (to list)
- Request ID (monospace, e.g., "REQ-1001")
- Status badge (same colors as customer side)
- Type badge
- Created date
- **Customer info card:** Name, company, phone, email
- **Assigned to:** Team member name with reassign option
- **Amount:** Editable for `under_review` status, read-only otherwise
- **Action buttons:** Context-sensitive (same as list actions for current status)

#### Tabs

**1. Details Tab**
- Type, quantity, amount, description
- Created date, last updated
- Customer details (name, company, contact)
- Assigned team member

**2. Items Tab** (same as customer's "Quantity" tab)
Shows the specific items in this proposal based on type:
- **Challan:** Challan ID, Vehicle Number, Amount, Status
- **DL:** Licence Number, Driver Name, Status
- **RC:** RC Number, Vehicle Number, Status

**3. Notes Tab** (Chat-style, shared with customer)
This is the **same thread** the customer sees. Messages from the team show as "LOTS Team" on the customer side.
- Shows all comments chronologically
- Team messages: Labeled with team member name + "LOTS Team" badge
- Customer messages: Labeled with customer name + "Customer" badge
- Compose area at bottom for team to reply
- Enter to send, Shift+Enter for newline

**4. Activity Timeline Tab**
Full audit trail of everything that happened:
- Status changes with who triggered them
- Notes added
- Assignments and reassignments
- Quote sent/revised events
- Timestamps for everything

**5. Incidents Tab** (only for `converted` status)
- Linked incident ID with link to incident detail
- Service status with update dropdown
- Work progress notes

#### Right Sidebar: Quick Actions + Stats

- **Quick status change buttons** (based on current status)
- **Assignment widget** — Current assignee with change option
- **Amount/Quote widget** — Current amount, edit button (when applicable)
- **Service status widget** (for converted proposals)
- **Timeline summary** — Last 3-4 activities

---

### Screen 3: Send Quote Modal

When team clicks "Send Quote" on an `under_review` proposal:

**Fields:**
- Proposal summary (read-only) — Type, qty, customer, description
- **Quoted Amount (₹)** — Number input, required. Pre-filled if amount already set
- **Breakdown** (optional) — Text area for itemized breakdown
- **Note to Customer** (optional) — Message that appears in the notes thread
- **Send Quote** button — Changes status to `received`, logs activity

---

### Screen 4: Reject Modal

When team rejects a proposal:

**Fields:**
- Proposal summary (read-only)
- **Rejection Reason** — Required dropdown:
  - "Service not available for this case"
  - "Insufficient documentation"
  - "Out of service area"
  - "Duplicate request"
  - "Invalid/incorrect details"
  - "Customer request" (if customer asked to cancel)
- **Note to Customer** (optional) — Explanation message
- **Reject** button — Changes status to `rejected`, logs activity, sends note

---

### Screen 5: Convert to Incident Modal

When a customer accepts a quote (status changes to `converted`), the admin needs to:

**Fields:**
- Proposal summary (read-only)
- **Incident ID** — Auto-generated or input field (format: "IRN-XXXXXXXX")
- **Service Status** — Dropdown: pending (default) / in_progress
- **Assigned Agent** — Team member who will handle the incident
- **Notes** — Initial notes for the incident
- **Create Incident** button — Sets `linkedIncidentId`, `serviceStatus`, logs activity

---

## Dashboard Summary Cards (Optional Top Section)

At the top of the proposal queue, show summary stats:

| Card | Value | Description |
|------|-------|-------------|
| **New Requests** | Count of `sent` | Inbox items needing attention |
| **In Review** | Count of `under_review` | Currently being assessed |
| **Awaiting Response** | Count of `received` | Quotes sent, waiting on customer |
| **Active Work** | Count of `converted` where `serviceStatus !== 'completed'` | Ongoing service delivery |
| **Completed This Month** | Count of `completed` in current month | Monthly throughput |
| **Total Value** | Sum of amounts for `converted` proposals | Revenue from accepted proposals |

---

## Sample Data for Development

Use this data to build and test the admin screens. This is the same data the customer dashboard uses — you're just viewing it from the team's perspective.

### 24 Proposals

**8 in Inbox (status: sent):**

| ID | Type | Qty | Amount (₹) | Customer | Description |
|----|------|-----|------------|----------|-------------|
| PRP-1001 | Challan | 12 | 2,40,000 | Rajesh Kumar, Kumar Transport | Bulk challan resolution for 12 pending challans across Lucknow fleet |
| PRP-1002 | DL | 5 | 7,500 | Rajesh Kumar, Kumar Transport | DL verification for 5 newly onboarded drivers — UP and MP RTOs |
| PRP-1003 | RC | 8 | 12,000 | Rajesh Kumar, Kumar Transport | RC verification for 8 trucks transferred from Jaipur depot |
| PRP-1004 | Challan | 3 | 60,000 | Rajesh Kumar, Kumar Transport | Overloading challans for 3 vehicles on NH48 Pune stretch |
| PRP-1012 | RC | 6 | 9,000 | Rajesh Kumar, Kumar Transport | RC fitness renewal for 6 heavy trucks due in April |
| PRP-1013 | DL | 4 | 6,000 | Rajesh Kumar, Kumar Transport | Badge renewal for 4 commercial drivers — HGMV endorsement |
| PRP-1014 | Challan | 9 | 1,35,000 | Rajesh Kumar, Kumar Transport | Signal violation challans — Mumbai-Pune corridor bulk dispute |
| PRP-1015 | RC | 2 | 3,000 | Rajesh Kumar, Kumar Transport | Address update on RC for 2 vehicles relocated Nagpur → Hyderabad |

**4 Under Review:**

| ID | Type | Qty | Amount (₹) | Description |
|----|------|-----|------------|-------------|
| PRP-1023 | Challan | 6 | 90,000 | 6 highway challans from NH44 — documents submitted |
| PRP-1024 | DL | 3 | 4,500 | DL endorsement upgrade — documents under verification |
| PRP-1025 | RC | 5 | 7,500 | Fitness certificate renewal — inspections scheduled |
| PRP-1026 | Challan | 4 | 64,000 | Court challan batch — 4 vehicles in Lok Adalat pending |

**6 Quote Sent (status: received):**

| ID | Type | Qty | Amount (₹) | Description |
|----|------|-----|------------|-------------|
| PRP-1009 | Challan | 5 | 95,000 | Lok Adalat batch processing via Delhi RTO |
| PRP-1010 | RC | 4 | 18,000 | RC transfer documentation for 4 vehicles from Jaipur |
| PRP-1011 | DL | 3 | 4,500 | DL renewal for 3 drivers — licenses expiring April |
| PRP-1016 | Challan | 8 | 1,12,000 | Lok Adalat batch — 8 pending challans Bengaluru RTO |
| PRP-1017 | RC | 5 | 7,500 | Hypothecation removal for 5 vehicles with cleared loans |
| PRP-1018 | DL | 7 | 10,500 | PSV badge renewal for 7 bus drivers |

**4 Converted:**

| ID | Type | Qty | Amount (₹) | Service Status | Incident |
|----|------|-----|------------|----------------|----------|
| PRP-1005 | Challan | 7 | 1,75,000 | in_progress | IRN-11106557 |
| PRP-1006 | DL | 2 | 3,000 | completed | IRN-11106590 |
| PRP-1019 | DL | 6 | 9,000 | completed | IRN-11106612 |
| PRP-1020 | RC | 10 | 25,000 | pending | IRN-11106634 |

**4 Rejected:**

| ID | Type | Qty | Amount (₹) | Reason |
|----|------|-----|------------|--------|
| PRP-1007 | RC | 1 | 1,500 | Vehicle registration corrected by owner at RTO |
| PRP-1008 | Challan | 15 | 3,00,000 | CCTV evidence confirms violations, dispute not viable |
| PRP-1021 | Challan | 4 | 8,000 | Parking challans — depot relocation temporary violations |
| PRP-1022 | DL | 2 | 3,000 | Duplicate DL request for drivers with lost originals |

### Sample Notes/Comments Thread

The notes thread is **shared between customer and admin**. Here are existing conversations:

**PRP-1001:**
- **Customer (Rajesh Kumar):** "Please prioritise the 4 court challans in this batch — hearing dates are approaching."
- **Team (Amit Verma):** "Noted. Court challans flagged as priority. We'll process those first."

**PRP-1002:**
- **Customer (Rajesh Kumar):** "Two of the drivers are currently on long-haul routes — will that delay the verification?"
- **Team (Priya Sharma):** "No delay expected. DL verification is done digitally through the Parivahan portal. Physical presence is not needed."

**PRP-1005 (Converted):**
- **Customer (Rajesh Kumar):** "Thanks for the quick turnaround on this. When can we expect the Lok Adalat results?"
- **Team (Amit Verma):** "Hearing was successful for 5 of 7 challans. Remaining 2 adjourned to next sitting. Full update in the incident timeline."

**PRP-1008 (Rejected):**
- **Customer (Rajesh Kumar):** "Can we at least get the penalty amount reduced? ₹3,00,000 is a significant hit."
- **Team (Priya Sharma):** "Unfortunately the CCTV evidence is clear. We recommend paying promptly to avoid the late penalty surcharge which adds 25% after 60 days."

### Sample Team Members

Use these for assignment dropdowns and "performed by" fields:

| Name | Role |
|------|------|
| Amit Verma | Senior Operations Manager |
| Priya Sharma | Compliance Specialist |
| Vikram Singh | Challan Resolution Lead |
| Neha Gupta | DL & RC Processing |
| Rahul Tiwari | Operations Executive |

---

## Status Transitions (Admin Can Trigger)

```
sent ──────────► under_review       (Pick Up / Assign)
under_review ──► received           (Send Quote)
under_review ──► rejected           (Reject)
sent ──────────► rejected           (Reject directly from inbox)
received ──────► under_review       (Withdraw/Revise quote)
received ──────► converted          (Customer accepted — auto or manual)
received ──────► rejected           (Customer rejected — auto or manual)
rejected ──────► sent               (Reopen)
converted: serviceStatus changes    (pending → in_progress → completed)
```

Only the admin can trigger: Pick Up, Assign, Send Quote, Withdraw, Reject (from team side), Reopen, Update Service Status.

The customer can trigger: Accept (→ converted), Reject (→ rejected), Cancel (→ rejected).

---

## Key Differences from Customer Dashboard

| Aspect | Customer Side | Admin Side |
|--------|--------------|------------|
| **Who** | Single fleet owner sees only their proposals | Team sees ALL proposals from ALL customers |
| **Create** | Customer creates proposals from Compliance | Admin doesn't create proposals — they receive them |
| **Amount** | Customer sees amount (read-only) | Admin sets/edits the quoted amount |
| **Status changes** | Customer can accept, reject, cancel | Admin can pick up, review, send quote, reject, convert, reopen |
| **Assignment** | Not visible to customer | Admin assigns proposals to team members |
| **Notes thread** | Customer sees "LOTS Team" as author | Admin sees specific team member names + "Customer" label |
| **Service tracking** | Customer sees status badges | Admin updates service status (pending → in_progress → completed) |
| **Incident creation** | Customer sees linked incident ID | Admin creates the incident and links it |
| **Bulk actions** | Not available | Admin can bulk assign, bulk update status |
| **Dashboard stats** | Not shown | Admin sees operational metrics (inbox count, SLA, throughput) |

---

## UI/UX Notes

- **Mobile responsive** — The admin portal should work on tablets (team members may use tablets in the field)
- **Dark mode support** — Use `dark:` Tailwind variants on everything
- **Real-time feel** — The inbox should feel like a task queue. Consider showing time-since-created on inbox items (e.g., "2h ago", "3 days ago")
- **Priority indicators** — High-amount proposals (> ₹1,00,000) could get a subtle priority marker
- **Pagination** — 10 items per page for admin (more density than customer's 5)
- **Currency formatting** — Always use Indian format: ₹2,40,000 (not ₹240,000)
- **Date formatting** — Use "22 Mar 2026" format for absolute dates, "2h ago" for relative

---

## What You're NOT Building

- The customer-facing proposal screens (already built)
- Authentication/login (handle separately)
- The incident management system (separate section)
- Real-time notifications/websockets (can be added later)
- API layer (build the frontend first with sample data)
