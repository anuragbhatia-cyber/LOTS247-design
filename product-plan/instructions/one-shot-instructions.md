# LOTS247 — Complete Implementation Instructions

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Test-Driven Development

Each section includes a `tests.md` file with detailed test-writing instructions. These are **framework-agnostic** — adapt them to your testing setup (Jest, Vitest, Playwright, Cypress, RSpec, Minitest, PHPUnit, etc.).

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write failing tests for key user flows (success and failure paths)
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

The test instructions include:
- Specific UI elements, button labels, and interactions to verify
- Expected success and failure behaviors
- Empty state handling (when no records exist yet)
- Data assertions and state validations

---

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

---


---

# Milestone 1: Foundation

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** None

---

## About These Instructions

**What you're receiving:**
- Finished UI designs (React components with full styling)
- Data model definitions (TypeScript types and sample data)
- UI/UX specifications (user flows, requirements, screenshots)
- Design system tokens (colors, typography, spacing)
- Test-writing instructions for each section (for TDD approach)

**What you need to build:**
- Backend API endpoints and database schema
- Authentication and authorization
- Data fetching and state management
- Business logic and validation
- Integration of the provided UI components with real data

**Important guidelines:**
- **DO NOT** redesign or restyle the provided components — use them as-is
- **DO** wire up the callback props to your routing and API calls
- **DO** replace sample data with real data from your backend
- **DO** implement proper error handling and loading states
- **DO** implement empty states when no records exist (first-time users, after deletions)
- **DO** use test-driven development — write tests first using `tests.md` instructions
- The components are props-based and ready to integrate — focus on the backend and data layer

---

## Goal

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for Google Fonts setup

**Color Palette:**
- Primary: `emerald` — Used for buttons, links, key accents, active states
- Secondary: `amber` — Used for alerts, warnings, tags, highlights
- Neutral: `stone` — Used for backgrounds, text, borders

**Typography:**
- Heading & Body: DM Sans (variable weight 100-1000)
- Code/Technical: IBM Plex Mono (for IDs, reference numbers, technical data)

### 2. Data Model Types

Create TypeScript interfaces for your core entities:

- See `product-plan/data-model/types.ts` for interface definitions
- See `product-plan/data-model/README.md` for entity relationships

**Core Entities:**
- Subscriber — User/account entity with KYC and business details
- Vehicle — Registered vehicles with compliance tracking
- Driver — Driver profiles with license details
- Subscription — Plan management with tier-based limits
- Payment — Financial transactions and ledger entries
- Incident — Cases requiring legal support
- Challan — Traffic violation penalties
- Lawyer — Legal professionals assigned to cases
- Document — File attachments for KYC, vehicles, cases
- Notification — Alerts and system messages

### 3. Routing Structure

Create placeholder routes for each section:

| Route | Section |
|-------|---------|
| `/` | Home (Quick Actions Hub) |
| `/onboarding` | Onboarding & Activation (standalone, no shell) |
| `/compliance` | Compliance Dashboard |
| `/incidents/challans` | Incident Management — Challans sub-section |
| `/incidents/cases` | Incident Management — Cases sub-section |
| `/fleet` | Vehicle & Driver Management |
| `/reports` | Reports |
| `/api-catalogue` | API Catalogue |
| `/wallet` | Wallet |
| `/proposals` | Proposals |
| `/knowledge-base` | Knowledge Base |
| `/profile` | My Profile |
| `/settings` | Settings |

### 4. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper with collapsible sidebar
- `MainNav.tsx` — Navigation component with section links
- `LanguageContext.tsx` — Language context provider for bilingual support (EN/HI)

**Wire Up Navigation:**

Connect navigation to your routing:

- **Home** → `/` (default landing)
- **Compliance** → `/compliance`
- **Incidents** → `/incidents/challans` (with sub-nav: Challans | Cases)
- **Fleet** → `/fleet`
- **Reports** → `/reports`
- **API Catalogue** → `/api-catalogue`
- **Wallet** → `/wallet`
- **Proposals** → `/proposals`
- **Knowledge Base** → `/knowledge-base`
- **Settings** → `/settings`

**Shell Layout:**
- Full width sidebar: 240px with icons + labels
- Collapsed width: 64px with icons only
- Floating edge toggle button to expand/collapse
- Content area fills remaining width

**Responsive Behavior:**
- Desktop (1024px+): Full sidebar, collapsible via toggle
- Tablet (768px-1023px): Sidebar collapsed by default
- Mobile (<768px): Sidebar hidden, hamburger menu overlay

**User Menu:**
- Located at bottom of sidebar
- Shows: user avatar (initials fallback), subscriber name, subscription plan badge
- Logout action

**Special Notes:**
- Onboarding section renders standalone (no shell) — it's a focused wizard flow
- Settings is accessible from the sidebar
- Dark mode support throughout

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/data-model/` — Type definitions and entity relationships
- `product-plan/shell/README.md` — Shell design intent
- `product-plan/shell/components/` — Shell React components

## Done When

- [ ] Design tokens are configured (emerald/amber/stone palette, DM Sans + IBM Plex Mono)
- [ ] Data model types are defined for all 10 entities
- [ ] Routes exist for all sections (can be placeholder pages)
- [ ] Shell renders with collapsible sidebar navigation
- [ ] Navigation links to correct routes
- [ ] User menu shows user info and logout
- [ ] Responsive on desktop, tablet, and mobile
- [ ] Dark mode toggle works
- [ ] Onboarding route renders without shell

---

# Milestone 2: Home

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Home section — the daily landing page and operational control center for fleet operators.

## Overview

The Home screen is the primary entry point after login, providing a real-time operational snapshot with five summary cards, quick action shortcuts, compliance health scoring, and proactive alerts. It answers: "What is the current health of my fleet and what needs attention right now?"

**Key Functionality:**
- View five overview cards: Active Vehicles, Active Drivers, Pending Challans (count + amount), Active Tickets, Subscription Status
- Execute quick actions: Add Incident, Add Vehicle, Call a Lawyer, Add Driver
- View overall Compliance Health Score with category breakdown
- See proactive alerts for expiring documents and pending challans
- Deep-link from any card or alert to the relevant module

## Recommended Approach: Test-Driven Development

Before implementing this section, **write tests first** based on the test specifications provided.

See `product-plan/sections/home/tests.md` for detailed test-writing instructions including:
- Key user flows to test (success and failure paths)
- Specific UI elements, button labels, and interactions to verify
- Expected behaviors and assertions

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy the section components from `product-plan/sections/home/components/`:

- `Home.tsx` — Main home layout with overview cards, quick actions, compliance score, and alerts

### Data Layer

The components expect these data shapes (from `types.ts`):
- `HomeData` — Combined home state with vehicle/driver counts, challans, incidents, subscription
- `ComplianceScore` — Overall score and category breakdowns
- `Alert` — Proactive alert items with urgency levels

You'll need to:
- Create API endpoints aggregating data from vehicles, drivers, challans, incidents, and subscriptions
- Calculate compliance health score from document validity across fleet
- Generate alerts based on expiry thresholds (7, 15, 30 days)

### Callbacks

Wire up these user actions:

| Callback | Description |
|----------|-------------|
| `onAddIncident` | Opens incident creation workflow |
| `onAddVehicle` | Opens add vehicle modal (plan limit check) |
| `onCallLawyer` | Triggers legal support (call modal on web) |
| `onAddDriver` | Opens add driver form |
| `onCardClick` | Deep-links to respective module |
| `onAlertClick` | Navigates to specific vehicle detail |

### Empty States

- **No vehicles yet:** Show zero-state on Active Vehicles card with prompt to add
- **No challans:** Show "No Pending Challans" message
- **No alerts:** Show "All clear" state in alerts section
- **Subscription expired:** Show urgency state with renewal CTA

## Expected User Flows

### Flow 1: View Fleet Status
1. User logs in and lands on Home
2. User sees all five overview cards populated with live data
3. User clicks "Pending Challans" card
4. **Outcome:** Navigates to Challan Management with pending filter applied

### Flow 2: Quick Action — Add Incident
1. User clicks "Add Incident" quick action button
2. Incident creation workflow opens
3. **Outcome:** User can create a new incident from Home

### Flow 3: View Compliance Alert
1. User sees an alert: "MH12AB1234 — PUC expires in 5 days"
2. User clicks the alert
3. **Outcome:** Navigates to that vehicle's detail page in Fleet Management

### Flow 4: Plan Limit Reached
1. User clicks "Add Vehicle" but has reached plan limit
2. **Outcome:** Upgrade prompt is shown instead of add vehicle form

## Files to Reference

- `product-plan/sections/home/README.md` — Feature overview and design intent
- `product-plan/sections/home/tests.md` — Test-writing instructions (use for TDD)
- `product-plan/sections/home/components/` — React components
- `product-plan/sections/home/types.ts` — TypeScript interfaces
- `product-plan/sections/home/sample-data.json` — Test data

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Five overview cards render with real data
- [ ] Quick action buttons trigger correct workflows
- [ ] Compliance health score calculates from fleet data
- [ ] Alerts generated from expiry thresholds
- [ ] Deep-links navigate to correct modules
- [ ] Plan limits enforced with upgrade prompts
- [ ] Empty states display properly when no records exist
- [ ] Responsive on mobile

---

# Milestone 3: Onboarding & Activation

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Onboarding & Activation flow — guiding new users from registration to first vehicle and subscription activation in under 3 minutes.

## Overview

The onboarding module is a standalone multi-step wizard (no app shell) that handles account creation, OTP verification, vehicle registration via RC number auto-fetch, optional driver assignment, and subscription plan selection. The primary goal is to ensure every user reaches the dashboard with at least one vehicle linked and an active subscription.

**Key Functionality:**
- Multi-step registration form with OTP verification
- Vehicle addition via RC number with auto-fetch from government API
- Optional driver assignment linked to the added vehicle
- Subscription plan selection with 4 tiers (Free + 3 Paid)
- Resume from last completed step if user exits mid-onboarding

## Recommended Approach: Test-Driven Development

See `product-plan/sections/onboarding-and-activation/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/onboarding-and-activation/components/`:

- `Onboarding.tsx` — Multi-step wizard with all onboarding screens

### Data Layer

- Registration data: name, mobile, business name, business type, state, pincode, email
- OTP verification: 6-digit code sent to mobile
- Vehicle: RC number input → API auto-fetch → confirmation
- Driver: optional name, ID, license number, vehicle assignment
- Subscription: plan selection from 4 tiers

### Callbacks

| Callback | Description |
|----------|-------------|
| `onRegister` | Submits registration form data |
| `onVerifyOTP` | Validates 6-digit OTP code |
| `onResendOTP` | Triggers OTP resend after countdown |
| `onFetchVehicle` | Fetches vehicle details by RC number |
| `onAddDriver` | Submits optional driver details |
| `onSelectPlan` | Selects subscription plan |
| `onComplete` | Redirects to dashboard on activation |

### Important Notes

- **No shell/navigation chrome** — this is a standalone focused flow
- **No back button** — users cannot go backwards in the flow
- **No progress indicator** — no step counter or step labels shown
- **Resume capability** — system resumes from last completed step on next login
- **Free plan activates immediately** — paid plans redirect to payment gateway

### Empty States & Error Handling

- **API fetch failure:** Allow manual vehicle entry as fallback
- **Duplicate RC number:** Show inline error below RC input
- **Invalid OTP:** Show inline error with resend option and rate limiting
- **Payment failure:** Keep user on plan screen with retry option

## Expected User Flows

### Flow 1: Complete Registration
1. User fills registration form (name, mobile, business name, type, state, pincode, email)
2. User agrees to Terms & Conditions checkbox
3. User clicks "Continue"
4. **Outcome:** OTP sent to mobile number, user advances to OTP screen

### Flow 2: OTP Verification
1. User enters 6-digit OTP in separate input boxes
2. Digits auto-advance between boxes
3. **Outcome:** Account created, user advances to vehicle addition

### Flow 3: Add Vehicle via RC
1. User enters RC number and clicks "Fetch Details"
2. Loading spinner shows "Fetching vehicle details..."
3. Vehicle details auto-populate for confirmation
4. **Outcome:** Vehicle linked to account, flow advances

### Flow 4: Select Subscription Plan
1. User sees 4 pricing cards displayed
2. User clicks "Select Plan" on desired tier
3. Free plan activates immediately; Paid triggers payment
4. **Outcome:** User redirected to dashboard

## Files to Reference

- `product-plan/sections/onboarding-and-activation/README.md` — Feature overview
- `product-plan/sections/onboarding-and-activation/tests.md` — Test instructions
- `product-plan/sections/onboarding-and-activation/components/` — React components
- `product-plan/sections/onboarding-and-activation/types.ts` — TypeScript interfaces
- `product-plan/sections/onboarding-and-activation/sample-data.json` — Test data

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Registration form validates and submits correctly
- [ ] OTP verification works with auto-advance between digits
- [ ] Vehicle RC auto-fetch with loading state and manual fallback
- [ ] Driver addition is optional with skip link
- [ ] All 4 subscription plans display with correct details
- [ ] Free plan activates immediately
- [ ] Paid plan redirects to payment gateway
- [ ] Onboarding renders without app shell
- [ ] Resume from last step works on re-login
- [ ] All error states handled inline
- [ ] Mobile responsive

---

# Milestone 4: Compliance Dashboard

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Compliance Dashboard — a fleet-level compliance monitoring view with real-time scores, category breakdowns, and drill-down capability.

## Overview

A view-only analytics dashboard providing real-time visibility into document validity, government flags, and compliance health across all vehicles and drivers. Designed for fleet managers overseeing 50-500+ vehicles who need aggregate insights with drill-down capability. All actions (document uploads, renewals) happen in their respective sections.

**Key Functionality:**
- Overall fleet compliance score (0-100) with ring visualization
- 8 category cards: RC, Insurance, PUCC, Permits, DL, Challans, Blacklisted, NTBT
- Date range filtering and scope toggle (Fleet/Vehicle/Driver)
- Category drill-down with vehicle-level breakdown
- Auto-generated insights panel and monthly trend chart
- Expiry urgency table sorted by soonest expiry

## Recommended Approach: Test-Driven Development

See `product-plan/sections/compliance-dashboard/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/compliance-dashboard/components/`:

- `ComplianceDashboard.tsx` — Main dashboard with score, categories, insights, trends, and urgency table

### Data Layer

- Overall compliance score calculation (weighted across categories)
- Per-category compliance counts (compliant/total)
- Monthly trend data points
- Expiry urgency data with days-remaining calculations
- Auto-generated insights from data analysis
- Scope filtering (fleet-wide, per-vehicle, per-driver)

### Callbacks

| Callback | Description |
|----------|-------------|
| `onCategoryClick` | Opens category drill-down view |
| `onDateRangeChange` | Updates date filter for all data |
| `onScopeChange` | Switches between Fleet/Vehicle/Driver scope |
| `onVehicleSelect` | Selects specific vehicle in Vehicle scope |
| `onDriverSelect` | Selects specific driver in Driver scope |
| `onBackFromDrilldown` | Returns to Fleet Overview |

### Empty States

- **New account with no vehicles:** Show zero compliance state with prompt to add vehicles
- **No expiring documents:** Show "All documents current" in urgency table
- **Category with zero vehicles:** Show 0/0 with appropriate messaging

## Expected User Flows

### Flow 1: View Fleet Compliance
1. User navigates to Compliance Dashboard
2. User sees overall score ring, 8 category cards, insights, trends, urgency table
3. **Outcome:** Complete fleet compliance picture at a glance

### Flow 2: Category Drill-Down
1. User clicks the "Insurance" category card
2. Category drill-down view opens with insurance-specific compliance score
3. User sees vehicle-level breakdown table
4. User clicks back button
5. **Outcome:** Returns to Fleet Overview

### Flow 3: Scope Filtering
1. User switches scope toggle to "Vehicle"
2. Vehicle search/select dropdown appears
3. User selects a specific vehicle
4. **Outcome:** All data updates to show that vehicle's compliance across all 8 categories

### Flow 4: Date Range Adjustment
1. User changes date range to "Last 6 Months"
2. **Outcome:** Trend chart and insights update to reflect the selected range

## Files to Reference

- `product-plan/sections/compliance-dashboard/README.md` — Feature overview
- `product-plan/sections/compliance-dashboard/tests.md` — Test instructions
- `product-plan/sections/compliance-dashboard/components/` — React components
- `product-plan/sections/compliance-dashboard/types.ts` — TypeScript interfaces
- `product-plan/sections/compliance-dashboard/sample-data.json` — Test data

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Overall compliance score ring renders with correct percentage
- [ ] 8 category cards show compliant/total with status colors
- [ ] Date range filter updates all dashboard data
- [ ] Scope toggle switches between Fleet/Vehicle/Driver views
- [ ] Category drill-down shows vehicle-level breakdown
- [ ] Permits drill-down shows sub-breakdown by permit type
- [ ] Blacklisted and NTBT drill-downs show flag/hold details
- [ ] Insights panel shows auto-generated data-driven insights
- [ ] Monthly trend chart adapts to selected date range
- [ ] Expiry urgency table sorted by soonest expiry with badges
- [ ] Empty states display properly
- [ ] Responsive on mobile

---

# Milestone 5: Incident Management

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement Incident Management — handling both Challans (short-lifecycle traffic violations) and Cases (long-lifecycle legal matters) with sub-navigation, detail views, and unified comment threads.

## Overview

The Incident Management section handles two distinct sub-sections accessible via sub-nav: **Challans** (traffic violation penalties with a 45-day resolution SLA) and **Cases** (structured legal matters like accidents, detention, theft with lawyer assignment). Both support unified comment threads for follow-ups between user and LOTS247 team.

**Key Functionality:**
- Challans list with filtering by vehicle, date, status, amount
- Challan detail with status badge, key fields, actions (Pay Now, Dispute, Escalate to Case, Download Receipt)
- Cases list with filtering by status, type, vehicle
- Case creation via multi-step modal (type → vehicle → driver → description → documents)
- Case detail with Timeline, Documents, and Comments tabs
- Unified comment thread on both challans and cases
- 45-day SLA tracking on challans with refund capability

## Recommended Approach: Test-Driven Development

See `product-plan/sections/incident-management/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/incident-management/components/`:

- `IncidentManagement.tsx` — Main container with sub-nav (Challans | Cases)
- Additional sub-components for challan list, case list, detail views

### Data Layer

**Challan Lifecycle (User View):**
- Submitted → In Progress → Resolved / On Hold / Not Settled
- 45-day SLA from creation; if breached, user can request refund

**Case Lifecycle (User View):**
- Submitted → In Progress → Resolved / Document Requested / Extended
- No fixed SLA; cases can originate from lawyer calls

### Callbacks

| Callback | Description |
|----------|-------------|
| `onViewChallan` | Opens challan detail view |
| `onPayChallan` | Initiates challan payment |
| `onDisputeChallan` | Starts dispute process |
| `onEscalateToCase` | Opens case creation pre-filled with challan data |
| `onDownloadReceipt` | Downloads challan receipt PDF |
| `onRequestRefund` | Requests refund for SLA breach |
| `onCreateCase` | Opens multi-step case creation modal |
| `onViewCase` | Opens case detail page |
| `onPostComment` | Adds comment to challan or case thread |
| `onUploadDocument` | Uploads document to case |

### Empty States

- **No challans:** Show "No challans found" with helpful message
- **No cases:** Show "No cases yet" with CTA to create first case
- **No comments:** Show "No comments yet" in comment thread
- **No documents:** Show upload prompt in case documents tab

## Expected User Flows

### Flow 1: View Challan Detail
1. User navigates to Incidents → Challans tab
2. User clicks a challan row in the table
3. User sees status badge, key fields, action buttons, and comment thread
4. **Outcome:** Full challan detail visible with available actions

### Flow 2: Escalate Challan to Case
1. User views a challan detail
2. User clicks "Escalate to Case" button
3. Multi-step case creation modal opens pre-filled with challan data (vehicle, description)
4. User completes remaining steps and submits
5. **Outcome:** New case created, linked to original challan

### Flow 3: Create a New Case
1. User navigates to Incidents → Cases tab
2. User clicks "Create Case" button
3. Multi-step modal: case type → vehicle → driver → description → documents → submit
4. **Outcome:** New case created with status "Submitted"

### Flow 4: Post Comment Follow-up
1. User opens a case or challan detail
2. User types a comment in the thread
3. User submits the comment
4. **Outcome:** Comment appears in chronological feed with timestamp

## Files to Reference

- `product-plan/sections/incident-management/README.md` — Feature overview
- `product-plan/sections/incident-management/tests.md` — Test instructions
- `product-plan/sections/incident-management/components/` — React components
- `product-plan/sections/incident-management/types.ts` — TypeScript interfaces
- `product-plan/sections/incident-management/sample-data.json` — Test data

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Sub-nav switches between Challans and Cases views
- [ ] Challans list with filtering (vehicle, date, status, amount)
- [ ] Challan detail shows status badge, fields, actions, comments
- [ ] Cases list with filtering (status, type, vehicle)
- [ ] Case creation multi-step modal works end-to-end
- [ ] Case detail with Timeline, Documents, Comments tabs
- [ ] Escalate to Case pre-fills from challan data
- [ ] Comment thread works for both challans and cases
- [ ] 45-day SLA tracking with refund option when breached
- [ ] Subscription gating on appropriate actions
- [ ] Empty states for all views
- [ ] Responsive on mobile

---

# Milestone 6: Vehicle & Driver Management

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement Vehicle & Driver Management — the central repository for all vehicles and drivers with compliance tracking, RC auto-fetch, and bulk upload capabilities.

## Overview

The Vehicle & Driver Management section serves as the central repository for all vehicles in the user's account. Users can add vehicles individually via RC number (with auto-fetch from API), bulk upload via CSV, and categorize vehicles by ownership type. Each vehicle tracks insurance and PUC expiry with an individual compliance score. A basic driver listing is linked to vehicles.

**Key Functionality:**
- Searchable, filterable vehicle list with compliance indicators
- Add single vehicle by RC number with API auto-fetch
- Bulk upload vehicles via CSV file
- Vehicle detail page with documents, insurance/PUC status, compliance score
- Basic driver listing linked to vehicles
- Proactive expiry alerts for insurance and PUC

## Recommended Approach: Test-Driven Development

See `product-plan/sections/vehicle-and-driver-management/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/vehicle-and-driver-management/components/`:

- `VehicleManagement.tsx` — Main vehicle list and management interface
- `AddVehicleModal.tsx` — Modal for adding vehicles (shared with AppShell)

### Data Layer

- Vehicle list with search and filters (category, compliance score, expiry status)
- RC number auto-fetch from government API
- CSV bulk upload with validation and preview
- Per-vehicle compliance score calculation
- Insurance and PUC expiry tracking with thresholds
- Driver list linked to vehicles

### Callbacks

| Callback | Description |
|----------|-------------|
| `onAddVehicle` | Opens add vehicle modal |
| `onBulkUpload` | Opens CSV upload flow |
| `onViewVehicle` | Opens vehicle detail page |
| `onFetchRC` | Fetches vehicle details by RC number from API |
| `onEditVehicle` | Edits vehicle details |
| `onViewDriver` | Opens driver detail |
| `onAssignDriver` | Assigns driver to vehicle |
| `onFilter` | Applies filters to vehicle list |

### Empty States

- **No vehicles:** Show "No vehicles yet" with prominent Add Vehicle CTA
- **No drivers:** Show "No drivers yet" with prompt to add
- **Filter returns nothing:** Show "No vehicles match your filters" with clear filters option
- **API fetch failure:** Show manual entry fallback

## Expected User Flows

### Flow 1: Add Vehicle via RC Number
1. User clicks "Add Vehicle" button
2. Modal opens with RC number input
3. User enters RC number and clicks "Fetch Details"
4. Loading spinner shown while API fetches
5. Vehicle details auto-populate for confirmation
6. **Outcome:** Vehicle added to list with compliance score calculated

### Flow 2: Bulk Upload Vehicles
1. User clicks "Bulk Upload" option
2. CSV upload interface appears
3. User uploads a CSV file
4. Preview shows validated data with any errors highlighted
5. User confirms upload
6. **Outcome:** Multiple vehicles added to the account

### Flow 3: View Vehicle Detail
1. User clicks a vehicle row in the list
2. Detail page opens showing RC details, compliance score, documents, insurance/PUC status
3. User sees assigned driver and expiry alerts
4. **Outcome:** Complete vehicle information visible

### Flow 4: Filter by Expiry Status
1. User selects "Expiring Soon" in the expiry status filter
2. Vehicle list updates to show only vehicles with upcoming expirations
3. **Outcome:** User can quickly identify vehicles needing attention

## Files to Reference

- `product-plan/sections/vehicle-and-driver-management/README.md` — Feature overview
- `product-plan/sections/vehicle-and-driver-management/tests.md` — Test instructions
- `product-plan/sections/vehicle-and-driver-management/components/` — React components
- `product-plan/sections/vehicle-and-driver-management/types.ts` — TypeScript interfaces
- `product-plan/sections/vehicle-and-driver-management/sample-data.json` — Test data

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Vehicle list renders with search and filter controls
- [ ] Add Vehicle modal with RC auto-fetch works
- [ ] CSV bulk upload with validation and preview
- [ ] Vehicle detail page shows all data sections
- [ ] Per-vehicle compliance score calculates correctly
- [ ] Insurance/PUC expiry tracking with color-coded badges
- [ ] Driver list displays with vehicle assignments
- [ ] Category filters (owned/leased/rented) work
- [ ] Empty states for all views
- [ ] Responsive on mobile

---

# Milestone 7: Reports

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Reports section — a browsing interface for system-generated fleet analytics reports with filtering, PDF preview, download, and sharing capabilities.

## Overview

A report browsing section where fleet owners/admins can view, download, and share system-generated reports. Reports are organized by type via tabs (MIS, ICR, ISR, MIS-CHALLAN) with a combined "All" view as the default landing. Reports are read-only and auto-generated by the system.

**Key Functionality:**
- Browse reports with tabbed filtering by type (All, MIS, ICR, ISR, MIS-CHALLAN)
- Search and filter by date, vehicle, or incident reference
- PDF preview on report click
- Download reports as PDF
- Share reports via email or WhatsApp

## Recommended Approach: Test-Driven Development

See `product-plan/sections/reports/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/reports/components/`:

- `ReportsList.tsx` — Main reports list with tabs, filters, and table

### Data Layer

**Report Types:**
- **MIS** — Monthly Incident Summary (auto-generated monthly)
- **ICR** — Incident Closure Report (generated when incident is closed)
- **ISR** — Incident Summary Report (generated 24 hours after an incident)
- **MIS-CHALLAN** — Monthly Challan Summary (auto-generated monthly)

### Callbacks

| Callback | Description |
|----------|-------------|
| `onViewReport` | Opens PDF preview for selected report |
| `onDownloadReport` | Downloads report as PDF file |
| `onShareReport` | Shares report via email or WhatsApp |
| `onFilterChange` | Applies date/vehicle/reference filters |
| `onTabChange` | Switches between report type tabs |

### Empty States

- **No reports yet:** Show "No reports generated yet" with explanation
- **Tab with no reports:** Show "No [type] reports available"
- **Filter returns nothing:** Show "No reports match your filters"

## Expected User Flows

### Flow 1: Browse Reports by Type
1. User navigates to Reports section
2. User sees "All" tab with all reports in table
3. User clicks "MIS" tab
4. **Outcome:** Table filters to show only Monthly Incident Summary reports

### Flow 2: Preview and Download Report
1. User clicks a report row in the table
2. PDF preview opens (modal or detail view)
3. User clicks "Download" button
4. **Outcome:** Report PDF downloads to device

### Flow 3: Share Report
1. User clicks share action on a report
2. Share options appear (email, WhatsApp)
3. User selects sharing method
4. **Outcome:** Report shared via selected channel

## Files to Reference

- `product-plan/sections/reports/README.md` — Feature overview
- `product-plan/sections/reports/tests.md` — Test instructions
- `product-plan/sections/reports/components/` — React components
- `product-plan/sections/reports/types.ts` — TypeScript interfaces
- `product-plan/sections/reports/sample-data.json` — Test data

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Tabbed navigation works (All, MIS, ICR, ISR, MIS-CHALLAN)
- [ ] Table displays with correct columns (Period, Report Type, Format, Generated Date, Action)
- [ ] Search and filter controls work
- [ ] PDF preview opens on report click
- [ ] Download as PDF works
- [ ] Share via email/WhatsApp works
- [ ] Empty states for all tabs and filter states
- [ ] Responsive on mobile

---

# Milestone 8: API Catalogue

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the API Catalogue — a browsable catalogue of available APIs with detail pages, endpoint documentation, and pricing inquiry capability.

## Overview

A browsable catalogue of available APIs presented as cards in a grid layout. Users can browse APIs, click into a two-column detail page to explore features and endpoints, and submit pricing enquiries through a contact modal.

**Key Functionality:**
- Browse API cards in a 3-column responsive grid
- View API detail page with two-column layout (sidebar + tabbed content)
- Explore API features via Description tab
- View available endpoints via Endpoints tab
- Submit pricing enquiries through contact modal

## Recommended Approach: Test-Driven Development

See `product-plan/sections/api-catalogue/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/api-catalogue/components/`:

- `ApiCatalogue.tsx` — Grid of API cards
- `ApiDetail.tsx` — Two-column detail page with sidebar and tabbed content

### Data Layer

**Available APIs:**
- Challan API — Traffic challan lookup and management
- Driving Licence API — DL verification and details
- RC API — Vehicle registration certificate lookup

Each API includes: name, provider, description, category tag, features list, and endpoint definitions.

### Callbacks

| Callback | Description |
|----------|-------------|
| `onViewApi` | Opens API detail page |
| `onBack` | Returns to catalogue grid from detail |
| `onContactPricing` | Opens contact/pricing inquiry modal |
| `onSubmitInquiry` | Submits pricing inquiry message |
| `onTabChange` | Switches between Description and Endpoints tabs |

### Empty States

- **No APIs available:** Show "No APIs in catalogue yet"
- **Contact form submitted:** Show success confirmation

## Expected User Flows

### Flow 1: Browse APIs
1. User navigates to API Catalogue
2. User sees three API cards in a grid
3. Each card shows icon, name, provider, description, category tag
4. **Outcome:** User can browse all available APIs at a glance

### Flow 2: View API Detail
1. User clicks an API card (e.g., "Challan API")
2. Detail page opens with left sidebar (API info + contact CTA) and right content area
3. User reads the Description tab with feature highlights
4. User switches to Endpoints tab to see available endpoints with method badges
5. **Outcome:** User understands the API capabilities

### Flow 3: Contact for Pricing
1. User clicks "Contact for Pricing" button on detail page
2. Modal opens with message textarea
3. User enters inquiry message and clicks submit
4. **Outcome:** Inquiry submitted, confirmation shown

## Files to Reference

- `product-plan/sections/api-catalogue/README.md` — Feature overview
- `product-plan/sections/api-catalogue/tests.md` — Test instructions
- `product-plan/sections/api-catalogue/components/` — React components
- `product-plan/sections/api-catalogue/types.ts` — TypeScript interfaces
- `product-plan/sections/api-catalogue/sample-data.json` — Test data

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] API cards render in 3-column grid (responsive)
- [ ] Clicking card navigates to detail page
- [ ] Detail page shows two-column layout
- [ ] Description tab shows feature highlights
- [ ] Endpoints tab shows method badges (GET/POST), paths, descriptions
- [ ] Contact for Pricing modal works
- [ ] Back navigation returns to grid
- [ ] Empty states handled
- [ ] Responsive on mobile (cards stack)

---

# Milestone 9: Wallet

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Wallet — a prepaid wallet with Razorpay integration, unified credit/debit ledger, and transaction history.

## Overview

The Wallet is the central financial hub of LOTS247, functioning as a prepaid wallet with Razorpay integration. Every system transaction — subscription payments, challan settlements, legal service fees, and manual top-ups — flows through the wallet as a unified credit/debit ledger. Users add money via Razorpay, and the system automatically debits for services.

**Key Functionality:**
- View current balance with prominent display and last recharged date
- Add money via Razorpay payment gateway
- Browse full transaction history (credits and debits)
- Filter transactions by date range, type (credit/debit), and category
- View expanded transaction detail with full metadata
- Low balance visual warning

## Recommended Approach: Test-Driven Development

See `product-plan/sections/wallet/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/wallet/components/`:

- `Wallet.tsx` — Main wallet view with balance card, add money, and transaction ledger

### Data Layer

- Current balance tracking
- Transaction ledger: reverse chronological, with credits (green) and debits (red)
- Transaction categories: Recharge, Subscription, Challan, Legal Fee, Refund
- Transaction detail: amount, date/time, category, reference ID, status, description
- Razorpay payment gateway integration

### Callbacks

| Callback | Description |
|----------|-------------|
| `onAddMoney` | Opens add money modal |
| `onSubmitPayment` | Initiates Razorpay payment with amount |
| `onViewTransaction` | Expands transaction detail panel |
| `onFilterChange` | Applies date/type/category filters |
| `onSearch` | Searches transactions by description or reference ID |

### Empty States

- **No transactions:** Show "Your wallet is empty. Add money to get started." with Add Money CTA
- **Filter returns nothing:** Show "No transactions match your filters"
- **Low balance:** Visual treatment changes when balance below threshold

## Expected User Flows

### Flow 1: Add Money to Wallet
1. User clicks "Add Money" button on balance card
2. Recharge modal opens with preset amounts (500, 1000, 2000, 5000) and custom entry
3. User selects or enters amount
4. Razorpay payment gateway opens
5. On success: balance updates immediately, credit entry appears in ledger
6. **Outcome:** Wallet balance increased, transaction recorded

### Flow 2: Browse Transaction History
1. User scrolls through transaction ledger
2. Each row shows date, description, category badge, amount (green/red), running balance
3. **Outcome:** Complete financial history visible

### Flow 3: Filter Transactions
1. User applies filters: date range (This Month), type (Debit), category (Challan)
2. Transaction list updates to show only matching entries
3. **Outcome:** User can quickly find specific transactions

### Flow 4: View Transaction Detail
1. User taps a transaction row
2. Detail panel expands/slides showing full metadata
3. For debits, links to related entity (challan ID, subscription plan)
4. **Outcome:** Complete transaction information visible

## Files to Reference

- `product-plan/sections/wallet/README.md` — Feature overview
- `product-plan/sections/wallet/tests.md` — Test instructions
- `product-plan/sections/wallet/components/` — React components
- `product-plan/sections/wallet/types.ts` — TypeScript interfaces
- `product-plan/sections/wallet/sample-data.json` — Test data

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Balance card shows current balance prominently
- [ ] Add Money modal with preset and custom amounts
- [ ] Razorpay integration triggers payment
- [ ] Balance updates on successful payment
- [ ] Transaction ledger shows all credits/debits chronologically
- [ ] Filters work (date range, type, category)
- [ ] Search by description or reference ID works
- [ ] Transaction detail panel shows full metadata
- [ ] Low balance visual warning
- [ ] Empty state when no transactions
- [ ] Responsive on mobile

---

# Milestone 10: Proposals

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Proposals section — a tracking hub for service requests originating from compliance checks, with follow-up capability and conversion tracking.

## Overview

Proposals is a tracking hub for service requests originating from Compliance checks (Challan, DL, RC). Users can view all sent proposals, track their status, follow up with the LOTS team, and see when proposals convert into incidents or get rejected.

**Key Functionality:**
- View proposals in two tabs: Active Proposals and Past Proposals
- Track proposal status: Sent, Converted, Rejected
- Follow up with LOTS team via chat-style thread (same pattern as Incident Management)
- View proposal detail with Overview (timeline + details) and Follow-up tabs
- Converted proposals link to created incidents
- Cancel active proposals

## Recommended Approach: Test-Driven Development

See `product-plan/sections/proposals/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/proposals/components/`:

- `Proposals.tsx` — Main proposals interface with tabs and list

### Data Layer

- Proposals list with Active/Past tabs
- Proposal detail: ID, type (Challan/DL/RC), quantity, amount, status, timeline
- Follow-up thread (chat-style, matching Incident Management pattern)
- Status transitions: Sent → Converted / Rejected (moves to Past)
- Links between converted proposals and created incidents

### Callbacks

| Callback | Description |
|----------|-------------|
| `onViewProposal` | Opens proposal detail view |
| `onFollowUp` | Posts follow-up message in thread |
| `onCancelProposal` | Cancels an active proposal |
| `onTabChange` | Switches between Active and Past tabs |
| `onViewLinkedIncident` | Navigates to linked incident for converted proposals |

### Empty States

- **No active proposals:** Show "No active proposals" with context about how proposals originate
- **No past proposals:** Show "No past proposals yet"
- **No follow-up messages:** Show empty state in follow-up tab

## Expected User Flows

### Flow 1: View Active Proposals
1. User navigates to Proposals section
2. Active Proposals tab shows table with Created Date, ID, Type, Quantity, Amount, Status, Actions
3. **Outcome:** User sees all pending proposals at a glance

### Flow 2: View Proposal Detail
1. User clicks a proposal row
2. Detail view opens with Overview tab (timeline + details) and Follow-up tab
3. **Outcome:** User sees complete proposal information

### Flow 3: Follow Up on Proposal
1. User opens a proposal detail
2. User switches to Follow-up tab
3. User types and sends a follow-up message
4. **Outcome:** Message appears in chat-style thread

### Flow 4: View Converted Proposal
1. User switches to Past Proposals tab
2. User clicks a "Converted" proposal
3. User sees link to the created incident
4. **Outcome:** User can navigate to the related incident

## Files to Reference

- `product-plan/sections/proposals/README.md` — Feature overview
- `product-plan/sections/proposals/tests.md` — Test instructions
- `product-plan/sections/proposals/components/` — React components
- `product-plan/sections/proposals/types.ts` — TypeScript interfaces
- `product-plan/sections/proposals/sample-data.json` — Test data

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Two-tab layout works (Active / Past)
- [ ] Proposals table shows all columns
- [ ] Detail view with Overview and Follow-up tabs
- [ ] Follow-up chat thread works (matches Incident Management pattern)
- [ ] Cancel action works on active proposals
- [ ] Converted proposals link to incidents
- [ ] Status badges render correctly (Sent, Converted, Rejected)
- [ ] Empty states for all views
- [ ] Responsive on mobile

---

# Milestone 11: Knowledge Base

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Knowledge Base — a centralized legal knowledge repository with browsing, searching, and bilingual support for vehicle owners and fleet managers.

## Overview

A centralized legal knowledge repository where vehicle owners and fleet managers can browse, search, and access legal templates, FAQs, step-by-step guides, compliance checklists, regulatory references, judgements, and circulars. Content is curated by the LOTS247 legal team with bilingual support (EN/HI).

**Key Functionality:**
- Browse articles by category tabs: All, Templates, FAQs, Guides, Checklists, Regulations, Judgements, Circulars
- Search across all articles (title, body, tags)
- Filter by tags (vehicle type, state, document type, topic)
- View article detail with formatted content
- Category-specific rendering: downloadable templates, accordion FAQs, interactive checklists
- Related articles and helpfulness feedback
- Bilingual support (English/Hindi)

## Recommended Approach: Test-Driven Development

See `product-plan/sections/knowledge-base/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/knowledge-base/components/`:

- `KnowledgeBase.tsx` — Browse view with search, tabs, filters, and article grid
- `ArticleDetail.tsx` — Article detail view with formatted content

### Data Layer

**Content Categories:**
- Legal Templates — Ready-to-use legal documents (affidavits, forms, applications)
- FAQs — Questions organized by topic
- Legal Guides — Step-by-step procedural guides
- Compliance Checklists — Actionable checklists
- Regulatory Reference — Motor Vehicles Act sections, penalty structures
- Judgements — Landmark court rulings (Supreme Court, High Court, MACT)
- Circulars — Government notifications from MoRTH, IRDAI, state departments

### Callbacks

| Callback | Description |
|----------|-------------|
| `onViewArticle` | Opens article detail view |
| `onSearch` | Searches articles by free text |
| `onCategoryChange` | Filters by category tab |
| `onTagFilter` | Filters by tag chips |
| `onDownloadTemplate` | Downloads template as PDF |
| `onCopyText` | Copies template text to clipboard |
| `onFeedback` | Submits "Was this helpful?" response |
| `onBack` | Returns to browse view with preserved filters |

### Empty States

- **No articles:** Show "No articles available" (unlikely but handle)
- **Search returns nothing:** Show "No results found" with suggestion to adjust search/filters
- **No related articles:** Hide related section gracefully

## Expected User Flows

### Flow 1: Browse and Search
1. User navigates to Knowledge Base
2. User sees search bar, category tabs, tag filters, and article grid
3. User types a search term (e.g., "challan dispute")
4. Grid updates to show matching articles
5. **Outcome:** User finds relevant legal content

### Flow 2: Read an Article
1. User clicks an article card from the grid
2. Detail view opens with breadcrumb, header, formatted body content
3. User reads through the article
4. User clicks "Was this helpful?" (thumbs up/down)
5. **Outcome:** User gets legal guidance, feedback captured

### Flow 3: Download a Template
1. User browses Templates category
2. User clicks a template article
3. User clicks "Download Template" or "Copy Text"
4. **Outcome:** Template PDF downloaded or text copied to clipboard

### Flow 4: Use a Checklist
1. User opens a checklist article
2. User sees interactive checkbox items grouped by section
3. User checks items as completed
4. **Outcome:** User can track progress through the checklist (state not persisted)

## Files to Reference

- `product-plan/sections/knowledge-base/README.md` — Feature overview
- `product-plan/sections/knowledge-base/tests.md` — Test instructions
- `product-plan/sections/knowledge-base/components/` — React components
- `product-plan/sections/knowledge-base/types.ts` — TypeScript interfaces
- `product-plan/sections/knowledge-base/sample-data.json` — Test data

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Browse view with search, category tabs, tag filters
- [ ] Article cards in responsive grid (3/2/1 columns)
- [ ] Search works across title, body, tags
- [ ] Category tabs filter correctly (All, Templates, FAQs, etc.)
- [ ] Tag filter chips work
- [ ] Article detail renders formatted content
- [ ] Templates: Download and Copy actions work
- [ ] FAQs: Accordion Q&A pairs expand/collapse
- [ ] Checklists: Interactive checkboxes work
- [ ] Related articles section shows at bottom
- [ ] Feedback (thumbs up/down) captures response
- [ ] Breadcrumb navigation works
- [ ] Back preserves previous filters
- [ ] Empty/no-results states handled
- [ ] Responsive on mobile

---

# Milestone 12: My Profile

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement My Profile — the subscriber's personal account hub with tabbed interface for personal details, organization info, and KYC verification.

## Overview

The My Profile section consolidates personal details, organization/business information, and KYC verification status into a clean tabbed interface. It serves both individual vehicle owners and fleet operators who need to manage organization-level data. Subscription management and billing are handled separately in Settings.

**Key Functionality:**
- Profile header with avatar, name, Subscriber ID, account type badge, KYC status
- Personal Information tab: edit name, mobile (OTP re-verification), email, DOB, photo
- Organization tab: business name, type, state, GST, CIN (conditional for fleet/business)
- KYC & Verification tab: document upload, status tracking, rejection handling
- Inline editing with validation

## Recommended Approach: Test-Driven Development

See `product-plan/sections/my-profile/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/my-profile/components/`:

- `MyProfile.tsx` — Profile page with header card and tabbed sections

### Data Layer

- Subscriber profile data: name, mobile, email, DOB, photo
- Organization/business details: name, type, GST, CIN, address
- KYC documents: Aadhaar, PAN, GST Certificate, Company Registration
- Document statuses: Not Submitted, Pending Review, Verified, Rejected
- Account types: Individual, Fleet, Business

### Callbacks

| Callback | Description |
|----------|-------------|
| `onEditPersonal` | Enables inline edit mode for personal fields |
| `onSavePersonal` | Saves personal info changes |
| `onChangeMobile` | Triggers OTP re-verification for mobile change |
| `onUploadPhoto` | Uploads/changes profile photo |
| `onEditOrganization` | Enables inline edit for org fields |
| `onSaveOrganization` | Saves organization changes |
| `onUploadDocument` | Uploads KYC document (JPG, PNG, PDF; max 5MB) |
| `onReuploadDocument` | Re-uploads rejected document |

### Empty States

- **No photo:** Show initials fallback (emerald bg) in avatar
- **No KYC documents:** Show "Not Submitted" status for all documents
- **Individual account:** Hide GST/CIN fields in Organization tab

## Expected User Flows

### Flow 1: Edit Personal Information
1. User navigates to My Profile → Personal Info tab
2. User clicks "Edit" button
3. Fields switch to inline edit mode
4. User modifies name and email
5. User clicks "Save"
6. **Outcome:** Changes saved, confirmation shown

### Flow 2: Change Mobile Number
1. User clicks edit on mobile number field
2. OTP re-verification flow triggers
3. User enters new number and verifies OTP
4. **Outcome:** Mobile number updated after verification

### Flow 3: Upload KYC Document
1. User navigates to KYC & Verification tab
2. User clicks upload on Aadhaar document card
3. Upload modal opens with drag-and-drop (JPG, PNG, PDF; max 5MB)
4. User selects file and uploads
5. **Outcome:** Document status changes to "Pending Review"

### Flow 4: Re-upload Rejected Document
1. User sees a document with "Rejected" status and rejection reason
2. User clicks "Re-upload" action
3. User uploads new document
4. **Outcome:** Document re-submitted for review

## Files to Reference

- `product-plan/sections/my-profile/README.md` — Feature overview
- `product-plan/sections/my-profile/tests.md` — Test instructions
- `product-plan/sections/my-profile/components/` — React components
- `product-plan/sections/my-profile/types.ts` — TypeScript interfaces
- `product-plan/sections/my-profile/sample-data.json` — Test data

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Profile header shows avatar, name, ID, account type badge, KYC badge
- [ ] Tabs work: Personal Info, Organization, KYC & Verification
- [ ] Personal info inline editing with save
- [ ] Mobile change triggers OTP re-verification
- [ ] Photo upload/change with preview
- [ ] Organization tab shows conditional fields (GST/CIN for business types only)
- [ ] GSTIN format validation (15-character pattern)
- [ ] KYC document cards with status badges
- [ ] Document upload with file type/size restrictions
- [ ] Rejected documents show reason and re-upload action
- [ ] Overall KYC badge: Unverified (red), Partial (amber), Verified (emerald)
- [ ] Progress summary ("2 of 4 documents verified")
- [ ] Empty states handled
- [ ] Responsive on mobile

---

# Milestone 13: Settings

> **Provide alongside:** `product-overview.md`
> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Settings section — notification preferences, app behavior configuration, subscription management, and billing history.

## Overview

Settings gives subscribers control over notification preferences, app behavior, and subscription management. It consolidates alert channel configuration, default app preferences, plan management, and billing history into a clean tabbed interface, separate from My Profile which handles identity and KYC.

**Key Functionality:**
- Configure notification channels per category (In-App, WhatsApp, Email, SMS)
- Set Quiet Hours with critical alert exemptions
- Choose default landing page after login
- View current subscription plan with usage meters
- Change plans via comparison modal
- View billing history with PDF download

## Recommended Approach: Test-Driven Development

See `product-plan/sections/settings/tests.md` for detailed test-writing instructions.

**TDD Workflow:**
1. Read `tests.md` and write failing tests for the key user flows
2. Implement the feature to make tests pass
3. Refactor while keeping tests green

## What to Implement

### Components

Copy from `product-plan/sections/settings/components/`:

- `Settings.tsx` — Settings page with tabbed interface

### Data Layer

**Notification Categories:**
- Compliance: document expiry, score changes
- Incidents: case updates, lawyer assignment
- Challans: new challans, payment reminders
- Billing: renewal, payment receipts, low wallet balance

**Channels:** In-App, WhatsApp, Email, SMS (toggle per category)

**Subscription Data:**
- Current plan: name, status, renewal date, price
- Usage: vehicles used/limit, users used/limit
- Available plans for comparison
- Billing history: date, description, amount, status, PDF download

### Callbacks

| Callback | Description |
|----------|-------------|
| `onToggleChannel` | Toggles notification channel for a category |
| `onSetQuietHours` | Enables/configures quiet hours |
| `onSetLandingPage` | Sets default landing page preference |
| `onChangePlan` | Opens plan comparison modal |
| `onSelectPlan` | Selects new plan from comparison |
| `onDownloadInvoice` | Downloads billing PDF |

### Empty States

- **No billing history:** Show "No billing history yet" (new accounts)
- **Free plan:** Show limited features with upgrade prompts

## Expected User Flows

### Flow 1: Configure Notifications
1. User navigates to Settings → Notifications tab
2. User sees category cards with channel toggles
3. User toggles off "SMS" for Compliance notifications
4. Change auto-saves with confirmation toast
5. **Outcome:** Notification preference updated

### Flow 2: Set Quiet Hours
1. User enables Quiet Hours toggle
2. Time pickers appear for start (10 PM) and end (7 AM)
3. User sets times
4. **Outcome:** Non-critical notifications suppressed during quiet hours

### Flow 3: Change Subscription Plan
1. User navigates to Subscription & Billing tab
2. User sees current plan card with usage meters
3. User clicks "Change Plan"
4. Plan comparison modal opens with all available plans
5. User selects a new plan
6. **Outcome:** Plan change initiated (payment if upgrading)

### Flow 4: Download Billing Invoice
1. User scrolls to billing history table
2. User clicks "Download" on a billing entry
3. **Outcome:** PDF invoice downloads

## Files to Reference

- `product-plan/sections/settings/README.md` — Feature overview
- `product-plan/sections/settings/tests.md` — Test instructions
- `product-plan/sections/settings/components/` — React components
- `product-plan/sections/settings/types.ts` — TypeScript interfaces
- `product-plan/sections/settings/sample-data.json` — Test data

## Done When

- [ ] Tests written for key user flows (success and failure paths)
- [ ] All tests pass
- [ ] Tabs work: Notifications, Preferences, Subscription & Billing
- [ ] Notification category cards with channel toggles
- [ ] Toggle changes auto-save with confirmation toast
- [ ] Quiet Hours toggle with time pickers
- [ ] Critical alerts exempt from quiet hours (info text shown)
- [ ] Fleet/Business: Daily Digest toggle visible
- [ ] Default landing page radio selection
- [ ] Fleet/Business: sidebar badge toggle visible
- [ ] Current plan card with status color
- [ ] Usage meters (vehicles, users) with progress bars
- [ ] Change Plan modal with comparison cards
- [ ] Billing history table with PDF download
- [ ] Empty states handled
- [ ] Responsive on mobile (table → cards)
