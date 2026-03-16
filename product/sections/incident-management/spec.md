# Incident Management Specification

## Overview
The Incident Management section handles two distinct sub-sections — Challans and Cases — accessible via a sub-nav under the main "Incidents" navigation entry. Challans manage short-lifecycle traffic violation penalties with a 45-day resolution SLA, while Cases handle structured long-lifecycle legal matters (accidents, detention, theft, disputes) with lawyer assignment and activity logging. Both sub-sections support a unified comment thread for follow-ups between the user and the LOTS247 team.

## Challan Lifecycle (User View)
- **Submitted** — User creates a challan incident
- **In Progress** — Internal: screening (verify details + assess eligibility), agent assignment, lawyer assignment (names not shown to user)
- **Resolved** — Challan successfully dismissed or settled
- **On Hold** — Waiting on court/authority action
- **Not Settled** — Dispute failed, user must pay original amount
- 45-day SLA starts from challan creation. If breached, user can request a refund.

## Case Lifecycle (User View)
- **Submitted** — User creates a case manually or case originates from a lawyer call
- **In Progress** — Internal: screening, legal team assignment, may be resolved on-call or assigned to external lawyer
- **Resolved** — Case successfully closed
- **Document Requested** — Lawyer or user needs to provide documents; case paused until uploaded (either party can upload)
- **Extended** — Case requires more time beyond initial scope
- No fixed SLA for cases.

## User Flows
- View the Challans list filtered by vehicle, date range, status, or amount
- View a Challan detail with status badge, key fields, comment thread, and action buttons (Pay Now, Dispute, Escalate to Case, Download Receipt)
- Escalate a Challan to Case via pre-filled case creation modal
- View the Cases list filtered by status, case type, or vehicle
- Create a Case via a multi-step modal (case type → vehicle → driver → description → documents) or from a lawyer call
- View a Case detail page: header with summary, then tabbed sections for Timeline, Documents, and Comments
- Post comments and follow-ups on both challans and cases (single unified thread with user and team messages)
- Request a refund on a challan if the 45-day SLA is breached

## UI Requirements
- Incidents sub-nav with two items: Challans and Cases (separate pages, no combined dashboard)
- Challans list: table with columns for Challan ID, Vehicle, Violation, Amount, Status, and action button; filterable by vehicle, date range, status, and amount range
- Challan detail: status badge, key fields, action buttons (Pay Now, Dispute, Escalate to Case, Download Receipt), and comment thread
- Escalate to Case opens the multi-step case creation modal pre-filled with challan data (vehicle, description)
- Cases list: table showing Case ID, type, vehicle, status, and action button
- Case creation: multi-step modal (case type → vehicle → driver → description → documents → submit)
- Case detail header: case summary and assigned lawyer info
- Case detail tabs: Timeline (activity log with timestamps), Documents (upload + view from either party), Comments (unified thread)
- Comment thread on both challans and cases: single chronological feed with user messages, team updates, and follow-ups
- Subscription gating: free plan limits visible (e.g., locked actions with upgrade prompts)

## Configuration
- shell: true
