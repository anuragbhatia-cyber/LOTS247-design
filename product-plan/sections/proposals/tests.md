# Proposals — Test Specifications

## Overview

Tests for proposal listing, Active/Past tabs, detail with Overview/Follow-up, chat thread, cancellation, and linked incidents.

---

## 1. Proposal List

### Success Path
- [ ] Navigate to Proposals section
- [ ] Verify "Active" tab is selected by default
- [ ] Verify proposal cards render with: ID, title, status badge, date, assignee name
- [ ] Verify active proposals show statuses: New, In Progress
- [ ] Tap "Past" tab — verify resolved and cancelled proposals show
- [ ] Verify cards sorted by date (newest first)

### Failure Path
- [ ] API failure — verify "Unable to load proposals" with retry
- [ ] Empty active list — verify "No active proposals" message
- [ ] Empty past list — verify "No past proposals" message

---

## 2. Proposal Detail — Overview Tab

### Success Path
- [ ] Tap proposal "PRO-2026-045"
- [ ] Verify ProposalDetail opens with "Overview" tab active
- [ ] Verify summary section: title, description, created date, status, assigned team member
- [ ] Verify status timeline shows chronological steps (Created, Assigned, In Progress)
- [ ] Verify linked incidents section shows referenced challans/cases
- [ ] Tap a linked incident — verify onViewIncident fires with correct ID

### Failure Path
- [ ] Proposal with no linked incidents — "No linked incidents" section hidden
- [ ] Proposal detail API fails — verify "Unable to load proposal details" error

---

## 3. Proposal Detail — Follow-up Tab (Chat)

### Success Path
- [ ] Tap "Follow-up" tab in ProposalDetail
- [ ] Verify chat thread renders with messages
- [ ] Verify user messages aligned right, team messages aligned left
- [ ] Verify each message shows: sender name, text, timestamp
- [ ] Type "What is the status update?" in input — tap Send
- [ ] Verify message appears in thread immediately
- [ ] Verify onSendMessage fires with proposalId and message

### Failure Path
- [ ] Send message fails — verify "Failed to send. Tap to retry." on the message
- [ ] Empty chat thread — verify "Start the conversation by sending a message"
- [ ] Send empty message — verify Send button is disabled

---

## 4. Cancel Proposal

### Success Path
- [ ] Open an active proposal
- [ ] Tap "Cancel Proposal" button
- [ ] Verify confirmation dialog opens with reason dropdown
- [ ] Select reason "No longer needed"
- [ ] Tap Confirm — verify onCancel fires with proposalId and reason
- [ ] Verify proposal status changes to "Cancelled"
- [ ] Verify proposal moves to "Past" tab

### Failure Path
- [ ] Cancel without selecting reason — verify "Please select a reason" error
- [ ] Cancel API fails — verify "Failed to cancel proposal" toast, proposal unchanged
- [ ] Cancel button hidden for already cancelled/resolved proposals

---

## Empty State Tests

- [ ] No proposals at all — "No proposals yet. Create a service request to get started."
- [ ] Active tab empty — "No active proposals. All caught up!"
- [ ] Past tab empty — "No past proposals yet."
- [ ] Chat thread empty — "No messages yet. Start the conversation."

## Component Interaction Tests

- [ ] Cancelling a proposal from detail view updates the list view when navigating back
- [ ] New chat message updates the Follow-up tab badge with unread count
- [ ] Tapping a linked incident navigates to Incident Management section
- [ ] Switching between Active/Past tabs preserves scroll position within each

## Edge Cases

- [ ] Proposal with 100+ chat messages — scrollable with "Load earlier messages" at top
- [ ] Chat message with 1000+ characters — wraps correctly within message bubble
- [ ] File attachment in chat (image/PDF) — renders preview thumbnail
- [ ] Proposal status changes by team while user is viewing — live update via polling
- [ ] Rapid message sending — messages queue and send in order
- [ ] Proposal with 10+ linked incidents — scrollable linked incidents section

## Accessibility Checks

- [ ] Active/Past tabs navigable with keyboard, aria-selected on active tab
- [ ] Proposal cards have aria-label with title and status
- [ ] Chat messages have role="log" on container and role="listitem" on messages
- [ ] Chat input has aria-label "Type a message"
- [ ] Cancel confirmation dialog traps focus
- [ ] Status timeline steps have aria-label with step name and completion status

## Sample Test Data

```json
{
  "proposals": [
    {
      "id": "pro-001",
      "proposalId": "PRO-2026-045",
      "title": "Insurance renewal assistance for 5 vehicles",
      "description": "Need help renewing insurance for vehicles expiring in May 2026",
      "status": "inProgress",
      "assignee": "Amit Verma",
      "createdAt": "2026-04-20T10:00:00Z",
      "linkedIncidents": ["ch-001"],
      "timeline": [
        { "step": "Created", "date": "2026-04-20T10:00:00Z", "completed": true },
        { "step": "Assigned", "date": "2026-04-20T11:30:00Z", "completed": true },
        { "step": "In Progress", "date": "2026-04-21T09:00:00Z", "completed": true },
        { "step": "Resolved", "date": null, "completed": false }
      ]
    },
    {
      "id": "pro-002",
      "proposalId": "PRO-2026-038",
      "title": "Challan dispute for MH04CD5678",
      "status": "resolved",
      "assignee": "Priya Desai",
      "createdAt": "2026-04-10T14:00:00Z",
      "resolvedAt": "2026-04-18T16:30:00Z"
    }
  ],
  "chatMessages": [
    { "id": "msg-1", "sender": "Rajesh Kumar", "senderType": "user", "text": "Please prioritize the insurance renewals", "timestamp": "2026-04-20T10:05:00Z" },
    { "id": "msg-2", "sender": "Amit Verma", "senderType": "team", "text": "On it. Will share quotes by tomorrow.", "timestamp": "2026-04-20T11:45:00Z" },
    { "id": "msg-3", "sender": "Amit Verma", "senderType": "team", "text": "Quotes attached for all 5 vehicles. Please review.", "timestamp": "2026-04-21T10:30:00Z" }
  ]
}
```
