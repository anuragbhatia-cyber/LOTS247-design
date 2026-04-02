# LOTS247 — Product Overview

## Summary

A mission-critical legal-tech platform that eliminates roadside legal issues for vehicle owners and fleets in real-time. From compliance tracking to challan resolution, accident support, and 24/7 lawyer access across 98% of India's pin codes — LOTS247 is the indispensable legal safety net for every vehicle on Indian roads.

## Key Problems Solved

1. **Legal complexity on the road** — Instant 24/7 on-call lawyer access resolves 85% of issues over a single call, with on-site deployment in 2 hours when needed.
2. **Scattered compliance tracking** — Centralized dashboard showing real-time compliance scores, document expiries, and vehicle status across your entire fleet.
3. **Challan chaos** — Live challan dashboard with automated tracking, Lok Adalat representation, and bulk resolution services.
4. **Incident panic** — Guided resolution for accidents, seizures, and legal entanglements with full-service handling by a nationwide network of 75K+ lawyers.
5. **RTO bureaucracy** — RTO-as-a-Service handling fitness, hypothecation, ownership transfers, and regulatory compliance.

## Key Features

- 24/7 on-call legal resolution
- 2-hour on-site lawyer deployment (98% pin code coverage)
- Real-time compliance engine with proactive alerts
- Live challan tracking and resolution dashboard
- Incident management with guided workflows
- Fleet-wide compliance visibility and reporting
- RTO and regulatory services
- WhatsApp incident updates

## Planned Sections

1. **Home** — Quick Actions Hub — the default landing view with compliance score overview, active incidents, pending challans, and quick action shortcuts.
2. **Onboarding & Activation** — Account creation, vehicle registration, compliance score generation, and subscription activation in under 3 minutes.
3. **Compliance Dashboard** — Real-time compliance scores, document expiry tracking, and proactive alerts across all vehicles and drivers.
4. **Incident Management** — 24/7 legal support requests, guided resolution workflows, lawyer assignment, and case tracking. Includes Challans (traffic violations) and Cases (legal matters).
5. **Vehicle & Driver Management** — Vehicle overview, driver profiles, document storage, and audit-ready reporting.
6. **Reports** — Fleet analytics, compliance trends, incident summaries, and challan reports with exportable data views.
7. **API Catalogue** — Browse available APIs, explore endpoints, and submit requests to the team for new APIs needed in the system.
8. **Wallet** — Credit and debit payment ledger used for challan settlements, subscription payments, and transaction history.
9. **Proposals** — Create, manage, and track service proposals for fleet owners — including pricing breakdowns, coverage details, and approval workflows.

## Data Model

Core entities: Subscriber, Vehicle, Driver, Subscription, Payment, Incident, Challan, Lawyer, Document, Notification

Key relationships:
- Subscriber owns Vehicles, Drivers, Incidents, Challans, Documents
- Subscriber has one active Subscription and many Payments
- Vehicle has Documents and Challans; many-to-many with Drivers
- Incident may involve a Vehicle and be assigned to a Lawyer
- Challan belongs to Vehicle, may link to Payment

## Design System

**Colors:**
- Primary: `emerald` — Used for buttons, links, key accents
- Secondary: `amber` — Used for warnings, alerts, secondary elements
- Neutral: `stone` — Used for backgrounds, text, borders

**Typography:**
- Heading: DM Sans
- Body: DM Sans
- Mono: IBM Plex Mono

## Implementation Sequence

Build this product in milestones:

1. **Foundation** — Set up design tokens, data model types, routing structure, and application shell
2. **Home** — Quick Actions Hub with compliance overview and quick action shortcuts
3. **Onboarding & Activation** — Multi-step registration, vehicle addition, and subscription selection
4. **Compliance Dashboard** — Fleet-wide compliance monitoring with drill-down capability
5. **Incident Management** — Challan tracking and case management with comment threads
6. **Vehicle & Driver Management** — Vehicle list, detail views, driver assignment
7. **Reports** — Report browsing, PDF preview, download and sharing
8. **API Catalogue** — API browsing with detail pages and contact forms
9. **Wallet** — Prepaid wallet with transaction ledger and Razorpay integration
10. **Proposals** — Proposal tracking with status management and follow-up threads

Each milestone has a dedicated instruction document in `product-plan/instructions/`.
