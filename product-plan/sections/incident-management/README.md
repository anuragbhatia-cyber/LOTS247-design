# Incident Management — Challans & Cases

## Overview

Incident Management handles two core workflows: Challans (traffic violations with a 45-day SLA for resolution and refund eligibility) and Cases (legal proceedings). The section features sub-navigation between Challans and Cases, rich filtering, detail views with comment threads, case creation from challans, and SLA-based refund tracking.

## User Flows

1. **Challan List** — User browses challans with filters (status, vehicle, date range, violation type). Receipt-style cards show challan details.
2. **Challan Detail** — Tapping a challan opens ChallanDetail with full info: violation, amount, SLA countdown, payment status, linked case, and a comment thread.
3. **Case List** — User browses cases with filters (status, priority, date). Cards show case summary with SLA indicator.
4. **Case Detail** — CaseDetail shows case overview, linked challans, assigned lawyer, comment thread, and status timeline.
5. **Create Case from Challan** — From ChallanDetail, user taps "Create Case" to escalate a challan to legal proceedings.
6. **SLA Refund** — If a challan is resolved within the 45-day SLA, the refund status is tracked and displayed.

## Design Decisions

- Sub-navigation tabs: "Challans" and "Cases" at the top of the section.
- Challan cards use receipt-style design with dashed border, monospaced challan number, and amount in bold.
- 45-day SLA is visualized as a progress bar with days remaining.
- Comment threads support text and attachments (images, PDFs).
- Case status timeline uses a vertical stepper pattern.

## Data Used

- `product/sections/incident-management/data.json` — Sample challans, cases, comments, SLA data.
- `product/sections/incident-management/types.ts` — Challan, Case, Comment, SLAStatus.

## Components Provided

| Component | File | Description |
|-----------|------|-------------|
| ChallanList | ChallanList.tsx | Filterable list of challan cards |
| ChallanDetail | ChallanDetail.tsx | Full challan view with comments |
| CaseList | CaseList.tsx | Filterable list of case cards |
| CaseDetail | CaseDetail.tsx | Full case view with timeline |

## Callback Props

| Prop | Component | Signature | Purpose |
|------|-----------|-----------|---------|
| onChallanSelect | ChallanList | `(challanId: string) => void` | Opens challan detail |
| onCreateCase | ChallanDetail | `(challanId: string) => void` | Escalates challan to case |
| onAddComment | ChallanDetail, CaseDetail | `(entityId: string, comment: string) => void` | Posts comment |
| onCaseSelect | CaseList | `(caseId: string) => void` | Opens case detail |
| onFilterChange | ChallanList, CaseList | `(filters: object) => void` | Applies filters |
| onPayChallan | ChallanDetail | `(challanId: string) => void` | Initiates challan payment |
| onBack | ChallanDetail, CaseDetail | `() => void` | Returns to list view |
