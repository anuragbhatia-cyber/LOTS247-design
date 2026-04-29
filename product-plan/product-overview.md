# LOTS247 — Product Overview

## Summary

A mission-critical legal-tech platform that eliminates roadside legal issues for vehicle owners and fleets in real-time. From compliance tracking to challan resolution, accident support, and 24/7 lawyer access across 98% of India's pin codes — LOTS247 is the indispensable legal safety net for every vehicle on Indian roads.

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
4. **Incident Management** — 24/7 legal support requests, guided resolution workflows, lawyer assignment, and case tracking.
5. **Vehicle & Driver Management** — Vehicle overview, driver profiles, document storage, and audit-ready reporting.
6. **Reports** — Fleet analytics, compliance trends, incident summaries, and challan reports with exportable data views.
7. **API Catalogue** — Browse available APIs, explore endpoints, and submit requests for new APIs.
8. **Wallet** — Credit and debit payment ledger used for challan settlements, subscription payments, and transaction history.
9. **Proposals** — Create, manage, and track service proposals for fleet owners.
10. **Knowledge Base** — Centralized repository of legal guides, compliance documentation, FAQs, and how-to articles.
11. **My Profile** — Personal account hub — view and edit personal details, organization/business information, and KYC verification status.
12. **Settings** — Notification preferences, app behavior configuration, subscription plan management, and billing history.

## Data Model

Core entities: Subscriber, Vehicle, Driver, Subscription, Payment, Incident, Challan, Lawyer, Document, Notification

Key relationships:
- Subscriber has many Vehicles, Drivers, Incidents, Documents, Challans, Payments, Notifications
- Subscriber has one active Subscription
- Vehicle belongs to Subscriber, has many Documents, Challans, and Drivers (many-to-many)
- Driver belongs to Subscriber, has many Vehicles (many-to-many) and Documents
- Incident belongs to Subscriber, may involve a Vehicle, may be assigned to a Lawyer
- Challan belongs to Subscriber (via Vehicle), may link to a Payment

## Design System

**Colors:**
- Primary: `emerald` — Used for buttons, links, key accents
- Secondary: `amber` — Used for tags, highlights, alerts/warnings
- Neutral: `stone` — Used for backgrounds, text, borders

**Typography:**
- Heading: DM Sans
- Body: DM Sans
- Mono: IBM Plex Mono

## Implementation Sequence

Build this product in milestones:

1. **Foundation** — Set up design tokens, data model types, routing, and application shell
2. **Home** — Quick Actions Hub with compliance overview and shortcuts
3. **Onboarding & Activation** — Account creation and subscription activation flow
4. **Compliance Dashboard** — Fleet-level compliance monitoring
5. **Incident Management** — Challans and legal cases
6. **Vehicle & Driver Management** — Vehicle/driver repository
7. **Reports** — Fleet analytics and report browsing
8. **API Catalogue** — API browsing and pricing enquiries
9. **Wallet** — Prepaid wallet and transaction ledger
10. **Proposals** — Service proposal tracking
11. **Knowledge Base** — Legal knowledge repository
12. **My Profile** — Personal account and KYC management
13. **Settings** — Preferences and subscription management

Each milestone has a dedicated instruction document in `instructions/incremental/`.
