# Proposals Specification

## Overview
Proposals is a tracking hub for service requests originating from Compliance checks (Challan, DL, RC). Users can view all sent proposals, track their status, follow up with the LOTS team, and see when proposals convert into incidents or get rejected.

## User Flows
- User sends a proposal from Compliance (challan check, DL check, or RC check) — it appears in Active Proposals
- User views the proposals list with two tabs: Active Proposals and Past Proposals
- Active Proposals table shows: Created Date, Proposal ID, Type (Challan/DL/RC), Quantity, Amount, Status (Sent/Converted/Rejected), and Actions (Follow-up, Cancel, View Detail)
- User taps into a proposal detail view with two tabs: Overview (timeline + details) and Follow-up (chat-style thread, same pattern as Incident Management)
- When a proposal is Converted or Rejected, it moves to Past Proposals
- Converted proposals link to the created incidents

## UI Requirements
- Two-tab layout on the list view: Active Proposals / Past Proposals
- Table/list rows with columns: Created Date, Proposal ID, Type, Quantity, Amount, Status, Actions
- Detail view with tabs: Overview (status timeline + proposal details) and Follow-up (chat-style thread matching Incident Management pattern)
- Follow-up and Cancel actions available on active proposals
- Status badges: Sent, Converted, Rejected

## Configuration
- shell: true
