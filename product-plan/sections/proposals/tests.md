# Proposals Section - Test Instructions

## ProposalList

### Rendering
- [ ] Shows page header "Proposals" with subtitle
- [ ] Shows three tabs: Sent, Received, Past
- [ ] Defaults to the Sent tab on initial load
- [ ] Shows search input with placeholder text
- [ ] Shows table columns: Created Date, Proposal ID, Type, Quantity, Amount, Status, Actions
- [ ] Desktop: renders table layout
- [ ] Mobile: renders card layout

### Tab Filtering
- [ ] Sent tab shows only proposals with status "sent"
- [ ] Received tab shows only proposals with status "received"
- [ ] Past tab shows only proposals with status "converted" or "rejected"
- [ ] Tab counts update to reflect the number of proposals in each tab
- [ ] Switching tabs resets search input

### Search
- [ ] Searching by proposal display ID (e.g., "PRP-1001") filters results
- [ ] Searching by description text filters results
- [ ] Searching by type (e.g., "Challan") filters results
- [ ] Empty search shows all results for the active tab
- [ ] Search is case-insensitive

### Status Badges
- [ ] "Sent" status displays with blue badge styling
- [ ] "Received" status displays with amber badge styling
- [ ] "Converted" status displays with green badge styling
- [ ] "Rejected" status displays with red badge styling

### Row Actions
- [ ] "View" action button calls `onView` with the proposal id
- [ ] "Follow-up" action button calls `onFollowUp` with the proposal id
- [ ] "Cancel" action button calls `onCancel` with the proposal id
- [ ] Follow-up and Cancel actions are only available on active proposals (sent/received)
- [ ] Past proposals (converted/rejected) only show the View action

### Data Display
- [ ] Created date is formatted in a human-readable format
- [ ] Amount displays with currency formatting (Indian Rupee)
- [ ] Type badge shows correct label: Challan, DL, or RC
- [ ] Converted proposals show linked incident ID when available

### Empty States
- [ ] When no proposals exist at all, shows an empty state message
- [ ] When Sent tab has no proposals, shows "No sent proposals" with description
- [ ] When Received tab has no proposals, shows "No received proposals" with description
- [ ] When Past tab has no proposals, shows "No past proposals" with description
- [ ] When search returns no results, shows a "no matching proposals" message

## ProposalDetail

### Rendering
- [ ] Shows back button that calls `onBack`
- [ ] Shows proposal display ID (e.g., "PRP-1001") in header
- [ ] Shows status badge in header
- [ ] Shows type badge (Challan/DL/RC)
- [ ] Shows two tabs: Overview and Follow-up

### Overview Tab
- [ ] Shows proposal description
- [ ] Shows created date
- [ ] Shows quantity value
- [ ] Shows amount with currency formatting
- [ ] Shows current status with badge
- [ ] Shows timeline of activities in chronological order
- [ ] Each activity shows: action type icon, notes, performed by, and timestamp
- [ ] Status change activities are visually distinct from note activities
- [ ] Converted proposals show a link to the associated incident ID

### Follow-up Tab
- [ ] Shows comment thread for the proposal
- [ ] Comments display author name, message, and timestamp
- [ ] User comments and team comments are visually distinct (different alignment or styling)
- [ ] Shows comment input at the bottom of the thread
- [ ] Posting a comment calls `onAddComment` with the message text
- [ ] Comment input clears after submission
- [ ] Empty comment cannot be submitted (submit button disabled or input validated)
- [ ] When no comments exist, shows an empty state encouraging the user to start a conversation

### Cancel Action
- [ ] Cancel button is visible for active proposals (status "sent" or "received")
- [ ] Cancel button calls `onCancel`
- [ ] Cancel button is hidden or disabled for converted/rejected proposals

### Back Navigation
- [ ] Back button is always visible
- [ ] Clicking back button calls `onBack`

## Component Interaction Tests

### List to Detail Flow
- [ ] Clicking View on a proposal in the list should trigger navigation to ProposalDetail
- [ ] ProposalDetail receives the correct proposal, activities, and comments for the selected proposal
- [ ] Clicking back from detail returns to the list

### Follow-up Flow
- [ ] User types a message in the follow-up input
- [ ] User submits the message (Enter key or submit button)
- [ ] `onAddComment` is called with the typed message
- [ ] Input field resets after submission

### Cancel Flow
- [ ] User clicks Cancel on an active proposal
- [ ] `onCancel` callback is invoked
- [ ] Application handles confirmation (if implemented) before executing cancellation

## Edge Cases

### Large Data Sets
- [ ] List renders correctly with 100+ proposals
- [ ] Scrolling is smooth with many proposals
- [ ] Tab counts remain accurate with large data sets

### Long Content
- [ ] Long proposal descriptions are truncated or wrapped properly in the list view
- [ ] Long proposal descriptions display fully in the detail view
- [ ] Long comment messages wrap correctly in the follow-up thread
- [ ] Long proposal IDs do not break the table layout

### Special Characters
- [ ] Proposal descriptions with special characters render correctly
- [ ] Comments with special characters render correctly
- [ ] Search handles special characters without errors

### Boundary Values
- [ ] Proposal with quantity of 0 displays correctly
- [ ] Proposal with amount of 0 displays correctly (e.g., free service)
- [ ] Proposal with null linkedIncidentId does not show incident link
- [ ] Proposal with linkedIncidentId shows clickable incident reference

### Status Transitions
- [ ] A proposal that transitions from "sent" to "received" moves from Sent tab to Received tab
- [ ] A proposal that transitions from "received" to "converted" moves from Received tab to Past tab
- [ ] A proposal that transitions from "received" to "rejected" moves from Received tab to Past tab

## Responsive Design
- [ ] ProposalList: table layout on desktop (lg+), card layout on mobile
- [ ] ProposalDetail: tabs stack or scroll horizontally on small screens
- [ ] Comment input remains accessible and usable on mobile
- [ ] Action buttons are tap-friendly on mobile (minimum 44px touch target)
- [ ] Status badges remain legible on all screen sizes

## Bilingual Support
- [ ] All visible text changes when language switches between "en" and "hi"
- [ ] Tab labels, column headers, status labels, and action buttons all translate
- [ ] Empty state messages translate correctly
- [ ] Detail view labels and tab names translate correctly

## Sample Test Data

Use these records from the sample data for test assertions:

```typescript
// Active proposal (sent)
const sentProposal: Proposal = {
  id: "prp-001",
  displayId: "PRP-1001",
  type: "Challan",
  description: "Bulk challan resolution for 12 pending challans across Lucknow fleet vehicles",
  quantity: 12,
  amount: 240000,
  status: "sent",
  linkedIncidentId: null,
  createdAt: "2026-03-22T09:15:00Z",
  updatedAt: "2026-03-22T09:15:00Z",
}

// Active proposal (received)
const receivedProposal: Proposal = {
  id: "prp-009",
  displayId: "PRP-1009",
  type: "Challan",
  description: "Quote received for 5 pending court challans",
  quantity: 5,
  amount: 95000,
  status: "received",
  linkedIncidentId: null,
  createdAt: "2026-03-23T11:00:00Z",
  updatedAt: "2026-03-23T14:30:00Z",
}

// Converted proposal (past)
const convertedProposal: Proposal = {
  id: "prp-005",
  displayId: "PRP-1005",
  type: "Challan",
  description: "Court challans settlement for 7 vehicles",
  quantity: 7,
  amount: 175000,
  status: "converted",
  linkedIncidentId: "IRN-11106557",
  createdAt: "2026-02-28T10:00:00Z",
  updatedAt: "2026-03-10T15:20:00Z",
}

// Rejected proposal (past)
const rejectedProposal: Proposal = {
  id: "prp-007",
  displayId: "PRP-1007",
  type: "RC",
  description: "RC verification for 1 vehicle",
  quantity: 1,
  amount: 1500,
  status: "rejected",
  linkedIncidentId: null,
  createdAt: "2026-03-01T13:20:00Z",
  updatedAt: "2026-03-05T09:45:00Z",
}

// Sample activities for prp-005
const sampleActivities: ProposalActivity[] = [
  {
    id: "pa-006",
    proposalId: "prp-005",
    actionType: "statusChange",
    performedBy: "System",
    notes: "Proposal submitted for Lok Adalat batch -- 7 court challans",
    timestamp: "2026-02-28T10:00:00Z",
  },
  {
    id: "pa-007",
    proposalId: "prp-005",
    actionType: "note",
    performedBy: "LOTS Team",
    notes: "Lok Adalat date confirmed for 8 Mar. All 7 challans eligible for hearing.",
    timestamp: "2026-03-04T11:30:00Z",
  },
  {
    id: "pa-008",
    proposalId: "prp-005",
    actionType: "statusChange",
    performedBy: "LOTS Team",
    notes: "Proposal converted -- incident IRN-11106557 created for case tracking",
    timestamp: "2026-03-10T15:20:00Z",
  },
]

// Sample comments for prp-001
const sampleComments: Comment[] = [
  {
    id: "cmt-p001",
    entityType: "proposal",
    entityId: "prp-001",
    authorType: "user",
    authorName: "Rajesh Kumar",
    message: "Please prioritise the 4 court challans in this batch.",
    createdAt: "2026-03-22T10:00:00Z",
  },
  {
    id: "cmt-p002",
    entityType: "proposal",
    entityId: "prp-001",
    authorType: "team",
    authorName: "Amit Verma",
    message: "Noted. Court challans flagged as priority.",
    createdAt: "2026-03-22T11:30:00Z",
  },
]
```
