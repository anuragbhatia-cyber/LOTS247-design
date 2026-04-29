# Proposals — Service Requests & Follow-ups

## Overview

The Proposals section manages service requests raised by fleet operators. Proposals are tracked through their lifecycle with Active and Past tabs, a detail view with Overview and Follow-up sub-tabs, a threaded chat for communication, and the ability to cancel proposals. Proposals can also be linked to incidents for context.

## User Flows

1. **Proposal List** — User sees proposals organized under Active and Past tabs. Each card shows: proposal ID, title, status, date, and assignee.
2. **Proposal Detail** — Tapping a proposal opens ProposalDetail with two sub-tabs: Overview (summary, linked incidents, status timeline) and Follow-up (chat thread with service team).
3. **Chat Thread** — In the Follow-up tab, users exchange messages with the LOTS247 service team. Supports text messages and file attachments.
4. **Cancel Proposal** — User can cancel an active proposal with a reason. Confirmation dialog required.
5. **Linked Incidents** — Proposals reference related challans or cases for context.

## Design Decisions

- Active/Past tabs at the top for quick status separation.
- Proposal cards show a status badge with color coding (New, In Progress, Resolved, Cancelled).
- Detail view uses sub-tabs to separate static overview from dynamic chat.
- Chat thread styled as a messaging interface with sender alignment (user on right, team on left).
- Cancel flow requires a reason from a predefined list + optional free-text.

## Data Used

- `product/sections/proposals/data.json` — Sample proposals, chat messages, linked incidents.
- `product/sections/proposals/types.ts` — Proposal, ChatMessage, ProposalStatus.

## Components Provided

| Component | File | Description |
|-----------|------|-------------|
| ProposalList | ProposalList.tsx | Tabbed list of proposals |
| ProposalDetail | ProposalDetail.tsx | Detail with overview and chat |

## Callback Props

| Prop | Component | Signature | Purpose |
|------|-----------|-----------|---------|
| onProposalSelect | ProposalList | `(proposalId: string) => void` | Opens proposal detail |
| onSendMessage | ProposalDetail | `(proposalId: string, message: string) => void` | Sends chat message |
| onCancel | ProposalDetail | `(proposalId: string, reason: string) => void` | Cancels proposal |
| onTabChange | ProposalList | `(tab: "active" \| "past") => void` | Switches tabs |
| onBack | ProposalDetail | `() => void` | Returns to list |
| onViewIncident | ProposalDetail | `(incidentId: string) => void` | Navigates to linked incident |
