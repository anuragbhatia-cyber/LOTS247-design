# Incident Management — Test Specifications

## Overview

Tests for the Challans and Cases sub-sections covering list views, detail views, comment threads, case creation from challans, SLA tracking, and refund flow.

---

## 1. Challan List

### Success Path
- [ ] Navigate to Incident Management — verify "Challans" tab is active by default
- [ ] Verify challan cards render in receipt-style layout
- [ ] Verify each card shows: challan number, vehicle number, date, violation type, amount, status badge
- [ ] Apply filter: status "Pending" — verify only pending challans show
- [ ] Apply filter: vehicle "MH01AB1234" — verify filtered list
- [ ] Verify sort by date (newest first) is default
- [ ] Verify total count label updates with filter (e.g., "Showing 5 of 12 challans")

### Failure Path
- [ ] API timeout on challan list — verify skeleton loaders appear
- [ ] API returns empty array — verify "No challans found" empty state
- [ ] Apply filters that match nothing — verify "No challans match your filters" with clear button

---

## 2. Challan Detail

### Success Path
- [ ] Tap challan "CH-2026-00451" — verify ChallanDetail opens
- [ ] Verify header: challan number in monospace, status badge, amount prominently displayed
- [ ] Verify details section: vehicle number, violation type, location, date/time, issuing authority
- [ ] Verify 45-day SLA bar with days remaining (e.g., "32 days left")
- [ ] Verify comment thread renders with existing comments
- [ ] Type "Checking with RTO" in comment input — tap Send — verify comment appears
- [ ] Verify "Create Case" button is visible for unresolved challans
- [ ] Verify "Pay Challan" button triggers onPayChallan

### Failure Path
- [ ] Add empty comment — verify Send button is disabled
- [ ] Comment submission fails — verify "Failed to post comment" error with retry
- [ ] Challan not found (deleted) — verify "Challan not found" error page

---

## 3. Case List

### Success Path
- [ ] Tap "Cases" tab — verify CaseList renders
- [ ] Verify case cards show: case number, title, status, priority badge, assigned lawyer, SLA indicator
- [ ] Apply filter: status "In Progress" — verify filtered results
- [ ] Verify sort by priority (High first) option works
- [ ] Tap a case card — verify CaseDetail opens

### Failure Path
- [ ] Cases list empty — verify "No cases yet. Cases are created from challans." with link to challans
- [ ] API error — verify retry mechanism

---

## 4. Case Creation from Challan

### Success Path
- [ ] Open ChallanDetail for an unresolved challan
- [ ] Tap "Create Case" button
- [ ] Verify confirmation dialog: "Create a legal case for challan CH-2026-00451?"
- [ ] Confirm — verify onCreateCase fires with challanId
- [ ] Verify success toast "Case created successfully"
- [ ] Verify challan status updates to "Case Created"
- [ ] Verify linked case reference appears in ChallanDetail

### Failure Path
- [ ] Tap "Create Case" on a challan that already has a case — verify button is disabled with tooltip "Case already exists"
- [ ] Case creation API fails — verify error toast and challan remains unchanged

---

## Empty State Tests

- [ ] No challans — empty state with "No challans detected for your fleet" message
- [ ] No cases — empty state with prompt to create case from challans
- [ ] Challan detail with no comments — "No comments yet. Be the first to add one."
- [ ] Case detail with no linked challans — "No linked challans" section hidden

## Component Interaction Tests

- [ ] Switching between Challans and Cases tabs preserves filter state for each
- [ ] Creating a case from ChallanDetail updates the ChallanList badge count
- [ ] Adding a comment auto-scrolls to the new comment
- [ ] SLA bar color changes: green (30+ days), amber (15-29 days), red (below 15 days)
- [ ] Payment completion updates challan status to "Paid" and hides "Pay" button

## Edge Cases

- [ ] Challan with SLA expired (past 45 days) — shows "SLA Expired" in red, refund option hidden
- [ ] Challan amount of 0 (warning only) — "Pay" button hidden, shows "Warning challan, no fine"
- [ ] Very long violation description (500+ chars) — truncated with "Read more" toggle
- [ ] Comment with special characters and emojis — renders correctly
- [ ] Multiple users commenting simultaneously — new comments appear via polling
- [ ] Challan with 50+ comments — paginated or virtual-scrolled

## Accessibility Checks

- [ ] Challan and Case tabs are keyboard navigable with arrow keys
- [ ] Receipt-style cards have descriptive aria-labels
- [ ] SLA progress bar has aria-valuenow and aria-valuemax
- [ ] Comment input has label "Add a comment"
- [ ] Status badges use aria-label (not just color)
- [ ] Focus management on tab switch and detail open/close

## Sample Test Data

```json
{
  "challans": [
    {
      "id": "ch-001",
      "challanNumber": "CH-2026-00451",
      "vehicle": "MH01AB1234",
      "date": "2026-04-15",
      "violation": "Signal Jump",
      "amount": 1000,
      "status": "Pending",
      "slaDeadline": "2026-05-30",
      "location": "Andheri Signal, Mumbai",
      "issuingAuthority": "Mumbai Traffic Police"
    },
    {
      "id": "ch-002",
      "challanNumber": "CH-2026-00389",
      "vehicle": "MH04CD5678",
      "date": "2026-04-10",
      "violation": "Over Speeding",
      "amount": 2000,
      "status": "Paid",
      "slaDeadline": "2026-05-25"
    }
  ],
  "cases": [
    {
      "id": "case-001",
      "caseNumber": "C-102",
      "title": "Signal violation dispute - MH01AB1234",
      "status": "In Progress",
      "priority": "High",
      "assignedLawyer": "Adv. Sharma",
      "linkedChallans": ["ch-001"],
      "createdAt": "2026-04-16"
    }
  ],
  "comments": [
    { "id": "cmt-1", "author": "Rajesh Kumar", "text": "Checking with RTO office", "timestamp": "2026-04-16T10:30:00Z" },
    { "id": "cmt-2", "author": "Adv. Sharma", "text": "Filed representation. Awaiting response.", "timestamp": "2026-04-17T14:00:00Z" }
  ]
}
```
