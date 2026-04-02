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

Each section includes a `tests.md` file with detailed test-writing instructions. These are **framework-agnostic** — adapt them to your testing setup.

**For each section:**
1. Read `product-plan/sections/[section-id]/tests.md`
2. Write failing tests for key user flows
3. Implement the feature to make tests pass
4. Refactor while keeping tests green

---

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

---

# Milestone 1: Foundation

> **Prerequisites:** None

## Goal

Set up the foundational elements: design tokens, data model types, routing structure, and application shell.

## What to Implement

### 1. Design Tokens

Configure your styling system with these tokens:

- See `product-plan/design-system/tokens.css` for CSS custom properties
- See `product-plan/design-system/tailwind-colors.md` for Tailwind configuration
- See `product-plan/design-system/fonts.md` for Google Fonts setup

**Colors:** Primary = Emerald, Secondary = Amber, Neutral = Stone
**Fonts:** DM Sans (headings + body), IBM Plex Mono (code/technical)

### 2. Data Model Types

Create TypeScript interfaces for your core entities:

- See `product-plan/data-model/types.ts` for interface definitions
- See `product-plan/data-model/README.md` for entity relationships

Key entities: Subscriber, Vehicle, Driver, Subscription, Payment, Incident, Challan, Lawyer, Document, Notification

### 3. Routing Structure

Create routes for each section:

- `/` — Home (Quick Actions Hub)
- `/onboarding` — Onboarding & Activation (standalone, no shell)
- `/compliance` — Compliance Dashboard
- `/incidents/challans` — Challan Management
- `/incidents/cases` — Case Management
- `/fleet` — Vehicle & Driver Management
- `/fleet/:id` — Vehicle Detail
- `/reports` — Reports
- `/api-catalogue` — API Catalogue
- `/api-catalogue/:id` — API Detail
- `/wallet` — Wallet
- `/proposals` — Proposals
- `/proposals/:id` — Proposal Detail
- `/settings` — Settings

### 4. Application Shell

Copy the shell components from `product-plan/shell/components/` to your project:

- `AppShell.tsx` — Main layout wrapper with sidebar, top bar, and modals
- `MainNav.tsx` — Navigation component with nested item support
- `UserMenu.tsx` — User menu with avatar and plan badge
- `LanguageContext.tsx` — Bilingual support (English/Hindi)

**Wire Up Navigation:**

Connect navigation items to your routing:

Primary nav items:
- Home (icon: Home) — `/`
- Compliance (icon: ShieldCheck) — `/compliance`
- Incidents (icon: AlertTriangle) — parent, with children:
  - Challans — `/incidents/challans`
  - Cases — `/incidents/cases`
- Fleet (icon: Truck) — `/fleet`
- Reports (icon: FileText) — `/reports`
- API Catalogue (icon: Code) — `/api-catalogue`
- Wallet (icon: Wallet) — `/wallet`
- Proposals (icon: FileSignature) — `/proposals`

Secondary nav items (below divider):
- Settings (icon: Settings) — `/settings`
- Help (icon: HelpCircle) — opens support ticket modal

**User Menu:**
The user menu expects: user name, optional avatar URL, subscription plan badge (Basic/Fleet/Enterprise), logout callback.

**Quick Actions:**
The shell includes quick action buttons: Add Incident, Add Vehicle, Call a Lawyer, Add Driver. Wire these to open the appropriate modals or trigger actions.

## Files to Reference

- `product-plan/design-system/` — Design tokens
- `product-plan/data-model/` — Type definitions
- `product-plan/shell/README.md` — Shell design intent
- `product-plan/shell/components/` — Shell React components

## Done When

- [ ] Design tokens are configured (emerald, amber, stone + DM Sans, IBM Plex Mono)
- [ ] Data model types are defined for all core entities
- [ ] Routes exist for all sections (can be placeholder pages)
- [ ] Shell renders with sidebar navigation
- [ ] Navigation links to correct routes
- [ ] Nested navigation works (Incidents — Challans / Cases)
- [ ] User menu shows user info and plan badge
- [ ] Quick actions trigger appropriate modals/actions
- [ ] Responsive on mobile (hamburger menu, overlay sidebar)
- [ ] Language switcher toggles between English and Hindi

---

# Milestone 2: Home

> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Home screen — the daily entry point for fleet operators providing a real-time operational snapshot.

## Overview

The Home screen is the primary control center of LOTS247, serving as the default landing view after login. It provides a real-time operational snapshot across five summary cards and four quick action shortcuts, answering: "What is the current health of my fleet and what needs attention right now?"

**Key Functionality:**
- View five overview cards: Active Vehicles, Active Drivers, Pending Challans, Active Incidents, Subscription Status
- Quick action buttons: Add Incident, Add Vehicle, Call a Lawyer, Add Driver
- Fleet-wide compliance health score with category breakdown
- Proactive alerts for expiring documents and pending challans
- Activity feed showing recent system events
- Deep-linking from cards to respective modules

## Recommended Approach: Test-Driven Development

See `product-plan/sections/home/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/home/components/`:
- `HomeView.tsx` — Main home layout
- `TopHeader.tsx` — Page header
- `OverviewCard.tsx` — Stat card component
- `QuickActions.tsx` — Quick action buttons
- `ComplianceScore.tsx` — Compliance health score display
- `VehicleComplianceCheck.tsx` — Vehicle compliance checker
- `VehicleComplianceResultsView.tsx` — Compliance check results
- `ActivityView.tsx` — Activity section
- `ActivityFeed.tsx` — Activity feed list
- `AddIncidentModal.tsx` — Modal for creating incidents
- `CheckChallanModal.tsx` — Modal for checking challans
- `ChallanResultsView.tsx` — Challan check results

### Data Layer

Key types from `types.ts`: HomeStats, ComplianceScore, AlertItem, Subscriber, Subscription, ActiveVehiclesStat, ActiveDriversStat, PendingChallansStat, ActiveIncidentsStat

You'll need to:
- Create API endpoints to aggregate fleet stats
- Fetch compliance scores from the compliance engine
- Aggregate alerts from document expiry tracking
- Stream activity feed events

### Callbacks

| Callback | Description |
|----------|-------------|
| `onViewVehicles` | Navigate to Vehicle & Driver Management |
| `onViewDrivers` | Navigate to Driver list |
| `onViewChallans` | Navigate to Challan Management with filters |
| `onViewIncidents` | Navigate to Incident Management |
| `onViewSubscription` | Navigate to Subscription settings |
| `onAddIncident` | Open Add Incident modal |
| `onAddVehicle` | Open Add Vehicle modal |
| `onCallLawyer` | Trigger legal support call |
| `onAddDriver` | Open Add Driver form |
| `onViewProfile` | Navigate to user profile |
| `onLogout` | Trigger logout flow |

### Empty States

- No vehicles yet: Show "Add your first vehicle" CTA
- No challans: Show "No pending challans" message
- No incidents: Show "No active incidents" message
- No alerts: Show "All clear — your fleet is compliant"

## Expected User Flows

### Flow 1: View Fleet Overview
1. User lands on Home after login
2. User sees all five overview cards with live data
3. User clicks "Pending Challans" card
4. **Outcome:** Navigates to Challan Management with pending filter

### Flow 2: Quick Action — Add Incident
1. User clicks "Add Incident" button
2. Modal opens with incident creation form
3. User fills in incident details and submits
4. **Outcome:** Incident created, card updates

### Flow 3: Check Compliance Alerts
1. User views compliance health score
2. User sees alerts for expiring PUC/insurance
3. User clicks an alert
4. **Outcome:** Deep-links to the vehicle's detail page

## Files to Reference

- `product-plan/sections/home/README.md`
- `product-plan/sections/home/tests.md`
- `product-plan/sections/home/components/`
- `product-plan/sections/home/types.ts`
- `product-plan/sections/home/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Five overview cards render with real data
- [ ] Quick actions trigger correct modals/actions
- [ ] Compliance score displays with category breakdown
- [ ] Alerts show for expiring documents
- [ ] Activity feed shows recent events
- [ ] Empty states display when no data exists
- [ ] Deep-links work to respective modules
- [ ] Responsive on mobile

---

# Milestone 3: Onboarding & Activation

> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the multi-step onboarding wizard that guides new users from registration through phone verification, vehicle addition, optional driver addition, and subscription plan selection to full activation — all in under 3 minutes.

## Overview

The Onboarding & Activation module is a standalone flow (no application shell) that ensures every new user reaches the dashboard with at least one vehicle linked and an active subscription. The wizard is linear — users cannot go backwards — and the system resumes from the last completed step if the user exits mid-flow.

**Key Functionality:**
- Registration form with business details and T&C agreement
- Phone verification via 6-digit OTP with auto-advance input boxes
- Vehicle addition via RC number with auto-fetch from government API
- Optional driver addition with skip capability
- Subscription plan selection (Free activates immediately, Paid redirects to Razorpay)
- Session resume from last completed step on re-login
- Login flow for returning users ("Already have an account? Login")

## Recommended Approach: Test-Driven Development

See `product-plan/sections/onboarding-and-activation/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/onboarding-and-activation/components/`:
- `OnboardingFlow.tsx` — Main wizard orchestrator managing step transitions
- `RegistrationStep.tsx` — Registration form (name, mobile, business type, state, pincode, email, T&C checkbox)
- `LoginStep.tsx` — Login form for returning users
- `PhoneVerificationStep.tsx` — OTP entry with 6 separate input boxes, countdown timer, resend link
- `VehicleAdditionStep.tsx` — RC number input, fetch details button, auto-populated confirmation, manual fallback
- `DriverAdditionStep.tsx` — Optional driver form with name, ID, license number, vehicle assignment, skip link
- `PlanSelectionStep.tsx` — 4 pricing cards (Free + 3 paid tiers) with feature comparison
- `ProgressIndicator.tsx` — Visual step progress (note: spec says no step counter shown, but component exists for internal tracking)

### Data Layer

Key types from `types.ts`: OnboardingProgress, SubscriptionPlan, SubscriptionPlanFeatures, PhoneVerificationForm, VehicleDetailsForm, DriverDetailsForm, ValidationErrors, UIState

You'll need to:
- Create user registration API endpoint
- Implement OTP generation, delivery (SMS), and verification
- Integrate with government RC vehicle details API for auto-fetch
- Create vehicle and driver records on the backend
- Integrate Razorpay payment gateway for paid plans
- Implement session persistence to resume from last completed step
- Validate duplicate RC numbers, phone numbers, and email addresses

### Callbacks

| Callback | Description |
|----------|-------------|
| `onRequestOTP` | Send OTP to the user's phone number |
| `onVerifyOTP` | Validate the 6-digit OTP |
| `onResendOTP` | Resend OTP after countdown expires |
| `onPhoneVerified` | Proceed after successful verification |
| `onFetchVehicleDetails` | Call government API to auto-fetch vehicle details by RC number |
| `onAddVehicle` | Save vehicle and link to user account |
| `onManualEntry` | Switch to manual vehicle entry when API fails |
| `onAddDriver` | Save driver and assign to vehicle |
| `onSkipDriver` | Skip driver step and proceed to plan selection |
| `onSelectPlan` | Select a subscription plan |
| `onFreePlanActivated` | Activate free plan immediately |
| `onInitiatePayment` | Redirect to Razorpay for paid plan |
| `onPaymentComplete` | Handle successful payment and activate subscription |
| `onPaymentFailed` | Show payment failure error with retry option |

### Empty States

- N/A — the onboarding flow is always presented fresh to new users. There are no "empty" states; all steps require input or action.

### Error States

- Invalid phone number: Inline error below the phone input
- Invalid OTP: Inline error with "Resend OTP" link
- Rate-limited OTP: Message indicating too many attempts
- Duplicate RC number: Inline error below RC input
- RC API failure: Auto-switch to manual entry mode with fallback message
- Payment failure: Inline error on plan screen with retry option
- Payment timeout: Error with retry option
- Missing required fields: Inline validation errors per field

## Expected User Flows

### Flow 1: Happy Path — Full Registration to Activation
1. User fills out registration form (name, mobile, business type, state, pincode, email)
2. User checks "I agree to T&C and Privacy Policy" and taps "Continue"
3. User receives OTP on their mobile number
4. User enters 6-digit OTP in the separate input boxes (auto-advance on each digit)
5. System verifies OTP, creates user account, advances to vehicle step
6. User enters RC number and taps "Fetch Details"
7. Loading spinner shows "Fetching vehicle details..."
8. Vehicle details auto-populate; user confirms
9. User optionally fills in driver details or taps "I'll add drivers later"
10. User sees 4 subscription plans, selects "Free" plan
11. Free plan activates immediately
12. **Outcome:** User is redirected to the Home dashboard with one vehicle linked

### Flow 2: Returning User — Login
1. User taps "Already have an account? Login" link on registration page
2. User enters phone number and receives OTP
3. User enters OTP and is authenticated
4. **Outcome:** User is redirected to the Home dashboard

### Flow 3: RC API Failure — Manual Entry
1. User enters RC number and taps "Fetch Details"
2. API call fails; system shows fallback message
3. User is presented with manual entry form fields (vehicle name, type, etc.)
4. User fills in vehicle details manually and confirms
5. **Outcome:** Vehicle is saved, flow advances to driver step

### Flow 4: Paid Plan — Razorpay Payment
1. User reaches plan selection step
2. User selects a paid plan (e.g., Bsafe, Vcare, or Enterprise)
3. System redirects to Razorpay payment gateway
4. User completes payment
5. **Outcome:** Subscription activates, user is redirected to Home dashboard
6. **On failure:** User remains on plan screen with inline error and retry option

## Files to Reference

- `product-plan/sections/onboarding-and-activation/README.md`
- `product-plan/sections/onboarding-and-activation/tests.md`
- `product-plan/sections/onboarding-and-activation/components/`
- `product-plan/sections/onboarding-and-activation/types.ts`
- `product-plan/sections/onboarding-and-activation/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Registration form validates all fields and submits correctly
- [ ] T&C checkbox is required before continuing
- [ ] OTP is sent, verified, and auto-advances between input boxes
- [ ] Resend OTP works after countdown timer expires
- [ ] Vehicle details auto-fetch via RC number API
- [ ] Manual entry fallback works when API fails
- [ ] Duplicate RC number shows inline error
- [ ] Driver addition is optional with working skip link
- [ ] All 4 subscription plans display with correct features
- [ ] Free plan activates immediately
- [ ] Paid plans redirect to Razorpay and handle success/failure
- [ ] Session resumes from last completed step on re-login
- [ ] Standalone pages render without application shell
- [ ] Responsive on mobile
- [ ] "Already have an account? Login" flow works

---

# Milestone 4: Compliance Dashboard

> **Prerequisites:** Milestone 1 (Foundation) complete, Milestone 6 (Vehicle & Driver Management) recommended

## Goal

Implement the Compliance Dashboard — a fleet-level, view-only analytics dashboard that gives fleet managers real-time visibility into document validity, government flags, and compliance health across all vehicles and drivers.

## Overview

The Compliance Dashboard is designed for fleet managers overseeing 50-500+ vehicles who need aggregate insights with drill-down capability. It is strictly a view-only analytics surface — all actions (document uploads, renewals, etc.) happen in their respective sections. The dashboard answers: "What is the compliance health of my fleet, what needs attention, and what are the trends?"

**Key Functionality:**
- Overall fleet compliance ring score (0-100) with month-over-month change
- 8 clickable category cards: RC, Insurance, PUCC, Permits, DL, Challans, Blacklisted, NTBT
- Auto-generated insights panel (3-4 data-driven insights)
- Monthly compliance trend line chart
- Expiry urgency table sorted by soonest expiry
- Category drill-down views with vehicle-level breakdown tables
- Filters: date range presets and scope toggle (Fleet / Vehicle / Driver)
- Permits drill-down with sub-breakdown by type (All India / Nationwide / State)
- Blacklisted drill-down with flag details (reason, authority, date)
- NTBT drill-down with hold details (reason, authority, case reference)
- Historical stats summary

## Recommended Approach: Test-Driven Development

See `product-plan/sections/compliance-dashboard/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/compliance-dashboard/components/`:
- `ComplianceDashboard.tsx` — Full dashboard component handling fleet overview, category cards, insights, trends, expiry table, drill-down views, and all filtering

### Data Layer

Key types from `types.ts`: ComplianceScore, ComplianceCategory, CategoryId, Insight, MonthlyTrendPoint, MonthlyChallanTrendPoint, ExpiryUrgencyItem, CategoryDrilldowns (with per-category row types: RcDrilldownRow, InsuranceDrilldownRow, PuccDrilldownRow, PermitDrilldownRow, DlDrilldownRow, ChallanDrilldownRow, BlacklistedDrilldownRow, NtbtDrilldownRow), HistoricalStats, Vehicle, Driver

You'll need to:
- Build a compliance scoring engine that calculates overall and per-category scores
- Create API endpoints to aggregate compliance data across the fleet
- Implement date range filtering (This Month, Last 3 Months, Last 6 Months, Last Year, Custom)
- Implement scope filtering (Fleet, Vehicle-specific, Driver-specific)
- Generate auto-insights from compliance data (e.g., "12 PUC certificates expiring in next 15 days")
- Compute monthly trend data points for the line chart
- Compute challan trend data (count, online vs court, amounts)
- Query expiry dates across all documents and sort by urgency
- Build drill-down queries for each of the 8 categories
- Integrate with government databases for Blacklisted and NTBT flags
- Track vehicle history events for per-vehicle timelines

### Callbacks

| Callback | Description |
|----------|-------------|
| `onCategorySelect` | Open drill-down view for a specific compliance category |
| `onBackToOverview` | Return from drill-down to the Fleet Overview |
| `onDateRangeChange` | Apply a date range filter (preset or custom range) |
| `onScopeChange` | Switch scope between Fleet, Vehicle, or Driver (with optional selected ID) |

### Empty States

- No vehicles in fleet: Show "Add your first vehicle to see compliance data" with CTA to Fleet section
- No data for selected date range: Show "No compliance data available for this period"
- No expiring documents: Show "All documents are up to date" in the expiry urgency table
- No insights available: Show "Not enough data to generate insights yet"
- Empty drill-down: Show "No vehicles found for this category"

## Expected User Flows

### Flow 1: View Fleet Compliance Overview
1. User navigates to Compliance Dashboard
2. User sees the overall compliance ring score (e.g., 87/100, "Healthy")
3. User views 8 category cards with compliant/total counts and status colors
4. User scrolls to see insights, monthly trend chart, and expiry urgency table
5. **Outcome:** User has a full picture of fleet compliance health

### Flow 2: Drill Down into a Category
1. User clicks the "Insurance" category card
2. Dashboard transitions to the Insurance drill-down view
3. User sees insurance-specific compliance score with trend
4. User sees a table of all vehicles with insurance status, provider, policy number, and expiry date
5. User clicks "Back" to return to Fleet Overview
6. **Outcome:** User has identified which vehicles need insurance renewal

### Flow 3: Filter by Scope — Specific Vehicle
1. User changes scope toggle from "Fleet" to "Vehicle"
2. A search/select dropdown appears
3. User selects a specific vehicle (e.g., "MH04AB1234")
4. Dashboard updates to show compliance data for that vehicle only
5. **Outcome:** User sees single-vehicle compliance across all 8 categories

### Flow 4: Review Expiry Urgency
1. User scrolls to the Expiry Urgency table
2. User sees documents sorted by soonest expiry with urgency badges (Expired, 7 days, 15 days, 30 days)
3. User identifies 3 vehicles with expired PUC certificates
4. **Outcome:** User knows exactly which documents need immediate attention

## Files to Reference

- `product-plan/sections/compliance-dashboard/README.md`
- `product-plan/sections/compliance-dashboard/tests.md`
- `product-plan/sections/compliance-dashboard/components/`
- `product-plan/sections/compliance-dashboard/types.ts`
- `product-plan/sections/compliance-dashboard/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Overall compliance ring score displays with month-over-month change
- [ ] Score color-codes correctly: emerald (75+), amber (50-74), red (below 50)
- [ ] All 8 category cards render with compliant/total counts and percentage
- [ ] Category cards are clickable and open drill-down views
- [ ] Drill-down views show category-specific score, trend, and vehicle-level table
- [ ] Permits drill-down shows sub-breakdown by type (All India / Nationwide / State)
- [ ] Blacklisted drill-down shows flag reason, authority, and date
- [ ] NTBT drill-down shows hold reason, authority, and case reference
- [ ] Insights panel shows 3-4 auto-generated insights
- [ ] Monthly trend chart renders with data points adapting to date range
- [ ] Expiry urgency table shows documents sorted by soonest expiry
- [ ] Urgency badges display correctly (Expired, 7 days, 15 days, 30 days)
- [ ] Date range filter works with all presets and custom range
- [ ] Scope toggle works for Fleet, Vehicle, and Driver
- [ ] Vehicle/Driver selector appears when scope is changed
- [ ] Back button in drill-down returns to Fleet Overview
- [ ] Empty states display when no data exists
- [ ] Responsive on mobile (cards stack to 2 columns)

---

# Milestone 5: Incident Management

> **Prerequisites:** Milestone 1 (Foundation) complete, Milestone 6 (Vehicle & Driver Management) recommended

## Goal

Implement the Incident Management section with its two sub-sections — Challans and Cases — including list views, detail views, creation flows, comment threads, and challan-to-case escalation.

## Overview

Incident Management handles two distinct sub-sections accessible via a sub-nav under "Incidents" in the sidebar. Challans manage short-lifecycle traffic violation penalties with a 45-day resolution SLA. Cases handle structured long-lifecycle legal matters (accidents, detention, theft, disputes) with lawyer assignment and activity logging. Both sub-sections support a unified comment thread for follow-ups between the user and the LOTS247 team.

**Key Functionality:**
- **Challans:** List with filters, detail with status/actions/comments, 45-day SLA tracking, refund requests on SLA breach
- **Cases:** List with filters, multi-step creation modal, detail with tabs (Timeline/Documents/Comments)
- Unified comment threads on both challans and cases
- Challan-to-case escalation via pre-filled case creation modal
- Subscription gating (free plan shows locked actions with upgrade prompts)

**Challan Lifecycle (User View):** Submitted -> In Progress -> Resolved / On Hold / Not Settled
**Case Lifecycle (User View):** Submitted -> In Progress -> Resolved / Document Requested / Extended

**Case Types:** Theft, Detention, Bail, Accidents, FIRs, Superdari, Vehicle Impounding, E-Way Bill, Others

## Recommended Approach: Test-Driven Development

See `product-plan/sections/incident-management/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/incident-management/components/`:
- `ChallanList.tsx` — Challan table with columns for ID, vehicle, violation, amount, status, and actions; filterable by vehicle, date range, status, amount range
- `ChallanDetail.tsx` — Challan detail view with status badge, key fields, action buttons (Pay Now, Dispute, Escalate to Case, Download Receipt), and comment thread
- `CaseList.tsx` — Case table with columns for ID, type, vehicle, status, and actions; filterable by status, case type, vehicle
- `CaseDetail.tsx` — Case detail with header summary, assigned lawyer info, and tabbed sections (Timeline, Documents, Comments)

Additional top-level views:
- `IncidentManagement.tsx` — Wrapper with sub-nav toggling between Challans and Cases
- `ChallanList.tsx` (top-level) — Preview wrapper for challan list
- `CaseList.tsx` (top-level) — Preview wrapper for case list
- `ChallanDetail.tsx` (top-level) — Preview wrapper for challan detail
- `CaseDetail.tsx` (top-level) — Preview wrapper for case detail

### Data Layer

Key types from `types.ts`: Challan, ChallanStatus, ChallanType, ChallanActivity, ChallanActivityType, Case, CaseStatus, CaseType, CaseOrigin, CaseActivity, CaseDocument, CaseReport, Comment, Vehicle, Driver, Lawyer

You'll need to:
- Create CRUD API endpoints for challans and cases
- Implement challan status transitions (Submitted -> In Progress -> Resolved/On Hold/Not Settled)
- Implement case status transitions (Submitted -> In Progress -> Resolved/Document Requested/Extended)
- Track the 45-day SLA deadline per challan and flag breaches
- Implement comment threads (polymorphic: entityType = 'challan' | 'case')
- Implement document upload and storage for cases
- Build the multi-step case creation flow (type -> vehicle -> driver -> description -> documents -> submit)
- Implement challan-to-case escalation with data pre-fill
- Generate activity timeline events for status changes, assignments, and notes
- Implement subscription gating (lock actions for free plan users)

### Callbacks — Challan List

| Callback | Description |
|----------|-------------|
| `onView` | Navigate to challan detail page |
| `onAddFollowUp` | Open follow-up comment on a challan |
| `onPay` | Initiate challan payment |
| `onDispute` | Initiate challan dispute |
| `onEscalateToCase` | Open case creation modal pre-filled with challan data |
| `onDownloadReceipt` | Download payment receipt PDF |
| `onRequestRefund` | Request refund for SLA-breached challan |

### Callbacks — Challan Detail

| Callback | Description |
|----------|-------------|
| `onPay` | Initiate challan payment |
| `onDispute` | Initiate challan dispute |
| `onEscalateToCase` | Open case creation modal pre-filled with challan data |
| `onDownloadReceipt` | Download payment receipt PDF |
| `onRequestRefund` | Request refund for SLA-breached challan |
| `onAddComment` | Post a comment to the challan thread |
| `onBack` | Navigate back to challan list |

### Callbacks — Case List

| Callback | Description |
|----------|-------------|
| `onView` | Navigate to case detail page |
| `onCreate` | Open multi-step case creation modal |

### Callbacks — Case Detail

| Callback | Description |
|----------|-------------|
| `onUploadDocument` | Upload a document to the case |
| `onAddComment` | Post a comment to the case thread |
| `onBack` | Navigate back to case list |

### Empty States

- No challans: Show "No challans found" with contextual message based on active filters
- No cases: Show "No cases found" with option to create a new case
- No comments on a challan/case: Show "No comments yet — add a follow-up below"
- No documents on a case: Show "No documents attached yet"
- No activity on a case timeline: Show "No activity recorded yet"

## Expected User Flows

### Flow 1: View and Filter Challans
1. User navigates to Incidents -> Challans
2. User sees the challan list table with all challans
3. User filters by status "In Progress" and vehicle "MH04AB1234"
4. Table updates to show only matching challans
5. **Outcome:** User sees filtered challan list

### Flow 2: View Challan Detail and Add Comment
1. User clicks a challan row in the list
2. Challan detail page opens with status badge, key fields, and action buttons
3. User scrolls to the comment thread
4. User types a follow-up message and submits
5. **Outcome:** Comment appears in the thread with timestamp

### Flow 3: Escalate Challan to Case
1. User views a challan detail
2. User clicks "Escalate to Case" action button
3. Multi-step case creation modal opens, pre-filled with challan's vehicle and description
4. User selects case type, confirms details, optionally attaches documents
5. User submits the case
6. **Outcome:** New case is created linked to the original challan; challan shows escalation reference

### Flow 4: Create a New Case
1. User navigates to Incidents -> Cases
2. User clicks "Create Case" button
3. Multi-step modal opens: Step 1 (case type) -> Step 2 (vehicle) -> Step 3 (driver) -> Step 4 (description) -> Step 5 (documents) -> Step 6 (submit)
4. User fills in each step and submits
5. **Outcome:** Case is created and appears in the case list with "Submitted" status

### Flow 5: Request Refund on SLA-Breached Challan
1. User views a challan that has exceeded the 45-day SLA
2. System shows SLA breach indicator
3. User clicks "Request Refund" action button
4. **Outcome:** Refund request is submitted and tracked

## Files to Reference

- `product-plan/sections/incident-management/README.md`
- `product-plan/sections/incident-management/tests.md`
- `product-plan/sections/incident-management/components/`
- `product-plan/sections/incident-management/types.ts`
- `product-plan/sections/incident-management/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Challan list renders with filterable table (vehicle, date range, status, amount)
- [ ] Challan detail shows status badge, key fields, action buttons, and comment thread
- [ ] Pay Now, Dispute, Escalate to Case, Download Receipt actions work
- [ ] 45-day SLA is tracked and refund request is available on breach
- [ ] Case list renders with filterable table (status, case type, vehicle)
- [ ] Case creation multi-step modal works with all steps
- [ ] Case detail shows header, assigned lawyer, and 3 tabs (Timeline, Documents, Comments)
- [ ] Document upload works on case detail
- [ ] Comment threads work on both challans and cases
- [ ] Challan-to-case escalation pre-fills case creation with challan data
- [ ] Sub-nav correctly toggles between Challans and Cases pages
- [ ] Empty states display when no data exists
- [ ] Subscription gating shows locked actions for free plan users
- [ ] Responsive on mobile

---

# Milestone 6: Vehicle & Driver Management

> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Vehicle & Driver Management section — the central repository for all vehicles and drivers in the user's account, with individual vehicle addition via RC auto-fetch, bulk CSV upload, vehicle detail with compliance tracking, and a basic driver listing.

## Overview

Vehicle & Driver Management is the foundational fleet data section that many other sections depend on (Compliance Dashboard, Incidents, Home stats). Users can add vehicles individually via RC number (with auto-fetch from government API), bulk upload via CSV for fleet owners, and categorize vehicles by ownership type. Each vehicle tracks its insurance, PUC, and fitness expiry status along with an individual compliance score. A basic driver listing is linked to vehicles.

**Key Functionality:**
- Vehicle list with search and filters (by category, compliance score, expiry status)
- Add single vehicle by RC number with auto-fetch from government API
- Bulk upload vehicles via CSV file with preview and validation
- Categorize vehicles as owned, leased, or rented
- Vehicle detail page with RC details, documents, compliance score, expiry dates, and assigned driver
- Track insurance, PUC, and fitness expiry dates with proactive alerts
- Basic driver listing with name, license number, license status, and assigned vehicles
- Add driver modal and assign driver to vehicle

## Recommended Approach: Test-Driven Development

See `product-plan/sections/vehicle-and-driver-management/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/vehicle-and-driver-management/components/`:
- `VehicleList.tsx` — Searchable, filterable vehicle table with columns for RC number, vehicle type, category, compliance score, insurance expiry, PUC expiry, and status
- `VehicleDetail.tsx` — Vehicle detail page with header summary, compliance score, document sections, expiry status, and assigned driver
- `AddVehicleModal.tsx` — Modal with RC number input, fetch details button, auto-populated confirmation, manual fallback (shared component also used in AppShell)
- `AddDriverModal.tsx` — Modal for adding a new driver
- `BulkUploadModal.tsx` — CSV upload flow with file selection, preview, validation, and confirmation

Additional top-level views:
- `VehicleList.tsx` (top-level) — Preview wrapper for vehicle list
- `VehicleDetail.tsx` (top-level) — Preview wrapper for vehicle detail

### Data Layer

Key types from `types.ts`: Vehicle, VehicleCategory, VehicleStatus, SubscriptionStatus, DocumentType, DocumentStatus, VehicleDocument, Driver, LicenseStatus, VehicleFilters

You'll need to:
- Create CRUD API endpoints for vehicles and drivers
- Integrate with government RC vehicle details API for auto-fetch on add
- Implement CSV parsing, validation, and bulk vehicle creation
- Calculate per-vehicle compliance scores based on document validity
- Track document expiry dates (insurance, PUC, fitness, RC)
- Implement driver-vehicle assignment (one driver can be assigned to multiple vehicles)
- Implement search across vehicle fields (RC number, make, model)
- Implement filtering by category, compliance score range, and expiry status

### Callbacks — Vehicle List

| Callback | Description |
|----------|-------------|
| `onViewVehicle` | Navigate to vehicle detail page |
| `onAddVehicle` | Open Add Vehicle modal |
| `onBulkUpload` | Open Bulk Upload modal |
| `onEditVehicle` | Open edit form for a vehicle |
| `onDeleteVehicle` | Delete a vehicle (with confirmation) |
| `onChangeCategory` | Change a vehicle's category (owned/leased/rented) |
| `onAssignDriver` | Assign a driver to a vehicle |
| `onSearch` | Search the vehicle list |
| `onFilter` | Apply filters to the vehicle list |

### Callbacks — Vehicle Detail

| Callback | Description |
|----------|-------------|
| `onBack` | Navigate back to vehicle list |
| `onEdit` | Open edit form for the vehicle |
| `onDelete` | Delete the vehicle (with confirmation) |
| `onChangeCategory` | Change the vehicle's category |
| `onAssignDriver` | Assign or change the driver |

### Empty States

- No vehicles: Show "No vehicles in your fleet yet" with prominent "Add Vehicle" and "Bulk Upload" CTAs
- No drivers: Show "No drivers added yet" with "Add Driver" CTA
- No documents on a vehicle: Show "No documents tracked for this vehicle"
- Search/filter with no results: Show "No vehicles match your search" with option to clear filters
- Vehicle with no assigned driver: Show "No driver assigned" with "Assign Driver" button

## Expected User Flows

### Flow 1: Add a Single Vehicle via RC Number
1. User clicks "Add Vehicle" button on the vehicle list
2. Add Vehicle modal opens with RC number input field
3. User enters RC number (e.g., "MH04AB1234") and clicks "Fetch Details"
4. Loading spinner shows while API fetches vehicle data
5. Vehicle details auto-populate (name, type, registration date, owner, fuel type)
6. User confirms details
7. **Outcome:** Vehicle is added to the list with auto-fetched data

### Flow 2: Bulk Upload Vehicles via CSV
1. User clicks "Bulk Upload" button on the vehicle list
2. Bulk Upload modal opens with file input
3. User selects a CSV file
4. System parses CSV and shows a preview table with validation results
5. User reviews the preview (valid rows, invalid rows with error messages)
6. User clicks "Import" to confirm
7. **Outcome:** Valid vehicles are added to the fleet; invalid rows are reported

### Flow 3: View Vehicle Detail and Compliance
1. User clicks a vehicle row in the list
2. Vehicle detail page opens with header (RC number, make, model, year)
3. User sees compliance score (color-coded), document sections with expiry dates
4. User sees insurance, PUC, and fitness status with urgency badges
5. User sees the assigned driver (or "No driver assigned" with assign button)
6. **Outcome:** User has full visibility into the vehicle's compliance state

### Flow 4: Assign Driver to Vehicle
1. User is on a vehicle's detail page
2. User clicks "Assign Driver" button
3. A dropdown or modal shows available drivers
4. User selects a driver
5. **Outcome:** Driver is assigned to the vehicle; both vehicle detail and driver listing reflect the assignment

## Files to Reference

- `product-plan/sections/vehicle-and-driver-management/README.md`
- `product-plan/sections/vehicle-and-driver-management/tests.md`
- `product-plan/sections/vehicle-and-driver-management/components/`
- `product-plan/sections/vehicle-and-driver-management/types.ts`
- `product-plan/sections/vehicle-and-driver-management/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Vehicle list renders with searchable, filterable table
- [ ] Filters work for category, compliance score range, and expiry status
- [ ] Search works across RC number, make, model
- [ ] Add Vehicle modal works with RC auto-fetch from API
- [ ] Manual entry fallback works when API fails
- [ ] Duplicate RC number shows inline error
- [ ] Bulk Upload modal parses CSV, shows preview, validates, and imports
- [ ] Vehicle detail page shows all fields, compliance score, and documents
- [ ] Document expiry badges display correctly (valid, expiring soon, expired)
- [ ] Driver listing shows all drivers with license status and assigned vehicles
- [ ] Add Driver modal works
- [ ] Driver-vehicle assignment works from both list and detail views
- [ ] Delete vehicle works with confirmation dialog
- [ ] Change vehicle category works (owned/leased/rented)
- [ ] Empty states display when no data exists
- [ ] Responsive on mobile

---

# Milestone 7: Reports

> **Prerequisites:** Milestone 1 (Foundation) complete, Milestone 5 (Incident Management) recommended

## Goal

Implement the Reports section — a read-only report browsing interface where fleet owners can view, preview, download, and share system-generated reports organized by type via tabs.

## Overview

Reports is a consumption-only section where fleet owners and admins browse system-generated reports. Reports are automatically generated by the system at specific triggers (monthly summaries, incident closures, 24-hour post-incident summaries) and cannot be manually created by users. The section provides tabbed browsing, PDF preview, download, and sharing via email/WhatsApp.

**Key Functionality:**
- Tabbed navigation: All | MIS | ICR | ISR | MIS-CHALLAN
- Table view with columns: Period, Report Type, Format, Generated Date, Action
- PDF preview on report click (modal or detail view)
- Download report as PDF
- Share report via email or WhatsApp
- Search and filter by date, vehicle, or incident reference
- Read-only — no manual report creation

**Report Types:**
- **MIS** — Monthly Incident Summary, auto-generated each month
- **ICR** — Incident Closure Report, generated when an incident is closed
- **ISR** — Incident Summary Report, generated 24 hours after an incident
- **MIS-CHALLAN** — Monthly Challan Summary, auto-generated each month

## Recommended Approach: Test-Driven Development

See `product-plan/sections/reports/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/reports/components/`:
- `ReportsList.tsx` — Full reports view with tabbed navigation, search/filter controls, report table, and action buttons (preview, download, share)

Additional top-level view:
- `ReportsList.tsx` (top-level) — Preview wrapper for the reports list

### Data Layer

Key types from `types.ts`: Report, ReportType, ReportTab

You'll need to:
- Create a report generation pipeline that auto-generates reports at the correct triggers:
  - MIS: Auto-generated at the end of each month
  - ICR: Auto-generated when an incident (challan or case) is closed/resolved
  - ISR: Auto-generated 24 hours after an incident is created
  - MIS-CHALLAN: Auto-generated at the end of each month
- Store generated PDF files (S3 or equivalent)
- Create API endpoints to list, filter, and fetch reports
- Implement PDF rendering/preview capability
- Implement file download serving
- Implement email sharing (generate a share link or attach PDF)
- Implement WhatsApp sharing (generate a deep link with PDF URL)
- Recipients are fleet owner/admin only

### Callbacks

| Callback | Description |
|----------|-------------|
| `onTabChange` | Switch between report type tabs (All, MIS, ICR, ISR, MIS-CHALLAN) |
| `onPreview` | Open PDF preview for a report |
| `onDownload` | Download report as PDF |
| `onShareEmail` | Share report via email |
| `onShareWhatsApp` | Share report via WhatsApp |
| `onSearch` | Search/filter reports by keyword |

### Empty States

- No reports at all: Show "No reports generated yet. Reports will appear here as your fleet activity generates them."
- No reports in a specific tab: Show "No [type] reports found"
- Search/filter with no results: Show "No reports match your search" with option to clear filters

## Expected User Flows

### Flow 1: Browse Reports by Type
1. User navigates to Reports section
2. User sees "All" tab active with all reports in a table
3. User clicks the "MIS" tab
4. Table filters to show only Monthly Incident Summary reports
5. **Outcome:** User sees only MIS reports sorted by most recent

### Flow 2: Preview and Download a Report
1. User clicks a report row in the table
2. PDF preview opens (in a modal or detail view)
3. User reviews the report content
4. User clicks "Download" button
5. **Outcome:** PDF file downloads to user's device

### Flow 3: Share a Report via WhatsApp
1. User clicks the share action on a report row
2. Share options appear (Email, WhatsApp)
3. User selects "WhatsApp"
4. WhatsApp deep link opens with the report PDF URL
5. **Outcome:** User can send the report to a WhatsApp contact

## Files to Reference

- `product-plan/sections/reports/README.md`
- `product-plan/sections/reports/tests.md`
- `product-plan/sections/reports/components/`
- `product-plan/sections/reports/types.ts`
- `product-plan/sections/reports/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Tabbed navigation works for All, MIS, ICR, ISR, MIS-CHALLAN
- [ ] Report table renders with correct columns (Period, Report Type, Format, Generated Date, Action)
- [ ] Tab switching filters the report list correctly
- [ ] PDF preview opens on report click
- [ ] Download as PDF works
- [ ] Share via email works
- [ ] Share via WhatsApp works
- [ ] Search and filter controls work (by date, vehicle, incident reference)
- [ ] Report generation pipeline auto-creates reports at correct triggers
- [ ] Reports are read-only (no manual creation UI)
- [ ] Empty states display when no reports exist
- [ ] Responsive on mobile

---

# Milestone 8: API Catalogue

> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the API Catalogue — a browsable catalogue of available APIs presented as cards in a grid layout, with a two-column detail page for each API and a contact modal for pricing enquiries.

## Overview

The API Catalogue is an informational section showcasing the APIs available through LOTS247. Users browse a card grid, click into detailed API pages, and submit pricing enquiries through a contact modal. The catalogue currently features three APIs (Challan API, Driving Licence API, RC API) but should be built to accommodate additional APIs in the future.

**Key Functionality:**
- Card grid browsing (3-column responsive grid, stacks on mobile)
- Each card shows icon, API name, provider subtitle, short description, and category tag
- Detail page with left sidebar (API info + contact CTA) and right content area with tabs
- "Description" tab with feature highlight sections (heading + paragraph pairs)
- "Endpoints" tab with method badges (GET/POST), paths, and descriptions
- "Contact for Pricing" modal with message textarea and submit button
- "View documentation" link on detail page sidebar

## Recommended Approach: Test-Driven Development

See `product-plan/sections/api-catalogue/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/api-catalogue/components/`:
- `ApiCatalogue.tsx` — Card grid view with all API cards
- `ApiDetail.tsx` — Two-column detail page with sidebar and tabbed content
- `ContactModal.tsx` — Contact/pricing enquiry modal with message textarea
- `TopUpModal.tsx` — API credit top-up modal

Additional top-level views:
- `ApiCatalogueView.tsx` — Preview wrapper for the catalogue grid
- `ApiDetailView.tsx` — Preview wrapper for the detail page

### Data Layer

Key types from `types.ts`: Api, ApiEndpoint, ApiFeature

You'll need to:
- Create a data store for API catalogue entries (can be static/seeded data initially)
- Store API definitions: name, provider, descriptions, documentation URL, category, icon, features, endpoints
- Create API endpoints to list all APIs and fetch a single API by ID
- Implement the contact/pricing enquiry submission (store message, notify internal team)
- Store and manage pricing enquiries

### Callbacks — Catalogue

| Callback | Description |
|----------|-------------|
| `onViewDetail` | Navigate to the API detail page (by API ID) |

### Callbacks — Detail

| Callback | Description |
|----------|-------------|
| `onBack` | Navigate back to the catalogue grid |
| `onContactSubmit` | Submit a pricing enquiry message for a specific API |

### Empty States

- No APIs in catalogue: Show "No APIs available yet. Check back soon."
- No endpoints listed for an API: Show "Endpoint documentation coming soon"
- No features listed for an API: Show "Feature details coming soon"

## Expected User Flows

### Flow 1: Browse API Catalogue
1. User navigates to API Catalogue
2. User sees three API cards in a grid layout: Challan API, Driving Licence API, RC API
3. Each card displays the API name, provider ("Built by LOTS247"), short description, and category badge
4. **Outcome:** User has a quick overview of all available APIs

### Flow 2: View API Detail
1. User clicks the "Challan API" card
2. Detail page opens with a two-column layout
3. Left sidebar shows: API icon, name, full description, "View documentation" link, category label, and "Contact for Pricing" button
4. Right content area shows "Description" tab active with feature highlights
5. User clicks "Endpoints" tab
6. Endpoints list shows method badges (GET/POST), paths, and descriptions
7. **Outcome:** User understands the API's capabilities and available endpoints

### Flow 3: Submit Pricing Enquiry
1. User is on an API detail page
2. User clicks "Contact for Pricing" button in the sidebar
3. Contact modal opens with a message textarea
4. User types their enquiry and clicks "Submit"
5. **Outcome:** Enquiry is submitted; user sees confirmation; internal team is notified

## Files to Reference

- `product-plan/sections/api-catalogue/README.md`
- `product-plan/sections/api-catalogue/tests.md`
- `product-plan/sections/api-catalogue/components/`
- `product-plan/sections/api-catalogue/types.ts`
- `product-plan/sections/api-catalogue/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Card grid renders with all APIs (3-column on desktop, stacked on mobile)
- [ ] Each card shows icon, name, provider, description, and category badge
- [ ] Clicking a card navigates to the detail page
- [ ] Detail page renders with two-column layout (sidebar + content)
- [ ] Sidebar shows API info, documentation link, and "Contact for Pricing" button
- [ ] "Description" tab shows feature highlights as heading + paragraph pairs
- [ ] "Endpoints" tab shows method badge (GET/POST), path, and description for each endpoint
- [ ] Tab switching works between Description and Endpoints
- [ ] "Contact for Pricing" modal opens with message textarea
- [ ] Enquiry submission works and provides confirmation
- [ ] Back button navigates from detail to catalogue grid
- [ ] "View documentation" link works
- [ ] Empty states display when no data exists
- [ ] Responsive on mobile

---

# Milestone 9: Wallet

> **Prerequisites:** Milestone 1 (Foundation) complete

## Goal

Implement the Wallet — the central financial hub functioning as a prepaid wallet with Razorpay integration, providing a unified credit/debit ledger for all system transactions.

## Overview

The Wallet is LOTS247's financial backbone. Every system transaction — subscription payments, challan settlements, legal service fees, and manual top-ups — flows through the wallet as a unified credit/debit ledger. Users add money via Razorpay, and the system automatically debits for services. The wallet gives fleet operators a single place to track all financial activity.

**Key Functionality:**
- Balance card with current balance, last recharge info, and "Add Money" CTA
- Low balance visual treatment when below threshold
- Add Money modal with preset quick-select amounts (500, 1000, 2000, 5000) and custom amount entry
- Razorpay payment gateway integration
- Transaction ledger in reverse chronological order with running balance
- Filters: date range (Today, This Week, This Month, Custom), type (Credit/Debit), category (Recharge, Subscription, Challan, Legal Fee, Refund)
- Search by description or reference ID
- Active filters shown as dismissible chips
- Transaction detail panel with full metadata (amount, date/time, category, reference ID, status, description)
- Related entity links in transaction detail (e.g., link to challan ID, subscription plan)

## Recommended Approach: Test-Driven Development

See `product-plan/sections/wallet/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/wallet/components/`:
- `WalletView.tsx` — Full wallet interface including balance card, Add Money modal, transaction ledger, filters, search, and transaction detail panel

Additional top-level view:
- `WalletView.tsx` (top-level) — Preview wrapper for the wallet

### Data Layer

Key types from `types.ts`: WalletSummary, LastRecharge, Transaction, TransactionType, TransactionCategory, TransactionStatus, RelatedEntityType, TransactionFilters

You'll need to:
- Create a wallet record per user with current balance and low balance threshold
- Implement credit operations (recharge via Razorpay, refunds)
- Implement debit operations (subscription payments, challan settlements, legal fees)
- Maintain a transaction ledger with running balance calculation
- Integrate Razorpay payment gateway for the Add Money flow
- Handle payment success/failure callbacks from Razorpay
- Implement transaction filtering (date range, type, category)
- Implement transaction search (by description, reference ID)
- Link transactions to related entities (challans, subscriptions, incidents, disputes)
- Set and enforce minimum/maximum recharge limits
- Implement low balance detection and visual threshold

### Callbacks

| Callback | Description |
|----------|-------------|
| `onAddMoney` | Open Add Money modal and initiate Razorpay payment with chosen amount |
| `onViewTransaction` | Expand transaction detail panel for a specific transaction |
| `onNavigateToEntity` | Navigate to related entity (challan, subscription, incident) from transaction detail |
| `onFilterChange` | Apply filters to the transaction ledger |
| `onSearch` | Search transactions by description or reference ID |

### Empty States

- No transactions (new wallet): Show "Your wallet is empty. Add money to get started." with prominent "Add Money" CTA and a friendly icon/illustration
- No transactions matching filters: Show "No transactions match your filters" with option to clear filters
- No transactions matching search: Show "No transactions found for your search"

## Expected User Flows

### Flow 1: Add Money via Razorpay
1. User navigates to Wallet and sees current balance (e.g., "Rs. 2,500")
2. User clicks "Add Money" button
3. Add Money modal opens with preset amounts (500, 1000, 2000, 5000) and a custom amount field
4. User selects Rs. 2,000 (or enters a custom amount)
5. User clicks "Proceed to Pay"
6. Razorpay payment gateway opens
7. User completes payment
8. **Outcome:** Balance updates to Rs. 4,500; a credit entry appears at the top of the transaction ledger

### Flow 2: Browse and Filter Transaction History
1. User scrolls through the transaction ledger
2. User sees credits (green) and debits (red) with descriptions and running balance
3. User clicks "This Month" date filter and "Debit" type filter
4. Active filters appear as dismissible chips
5. Ledger updates to show only debits from this month
6. **Outcome:** User sees a filtered view of their spending

### Flow 3: View Transaction Detail
1. User taps a transaction row (e.g., "Challan Settlement - MH04AB1234")
2. Transaction detail panel expands showing: amount, date/time, category (Challan), reference ID, status (Success), description
3. User sees a link to the related challan entity
4. User taps the challan link
5. **Outcome:** User navigates to the challan detail page

### Flow 4: Empty Wallet — First-Time User
1. New user navigates to Wallet for the first time
2. Balance shows Rs. 0
3. Empty state illustration with message: "Your wallet is empty. Add money to get started."
4. Prominent "Add Money" CTA button
5. **Outcome:** User is guided to add their first recharge

## Files to Reference

- `product-plan/sections/wallet/README.md`
- `product-plan/sections/wallet/tests.md`
- `product-plan/sections/wallet/components/`
- `product-plan/sections/wallet/types.ts`
- `product-plan/sections/wallet/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Balance card displays current balance prominently
- [ ] Last recharge date and amount shown as secondary info
- [ ] Low balance visual treatment triggers below threshold
- [ ] "Add Money" button opens the Add Money modal
- [ ] Preset quick-select amounts work (500, 1000, 2000, 5000)
- [ ] Custom amount entry works with min/max validation
- [ ] Razorpay payment gateway integration works end-to-end
- [ ] Balance updates immediately after successful payment
- [ ] Credit entry appears in ledger after recharge
- [ ] Transaction ledger renders in reverse chronological order
- [ ] Each transaction row shows date, description, category badge, amount (colored), and running balance
- [ ] Date range filter works (Today, This Week, This Month, Custom)
- [ ] Type filter works (All, Credit, Debit)
- [ ] Category filter works (Recharge, Subscription, Challan, Legal Fee, Refund)
- [ ] Active filters display as dismissible chips
- [ ] Search works for description and reference ID
- [ ] Transaction detail panel expands with full metadata
- [ ] Related entity links navigate to correct entities
- [ ] Empty state displays for new wallets with "Add Money" CTA
- [ ] Responsive on mobile

---

# Milestone 10: Proposals

> **Prerequisites:** Milestone 1 (Foundation) complete, Milestone 4 (Compliance Dashboard) recommended, Milestone 5 (Incident Management) recommended

## Goal

Implement the Proposals section — a tracking hub for service requests originating from Compliance checks, with proposal listing, detail views with timeline and chat-style follow-up, and lifecycle management.

## Overview

Proposals is a tracking hub for service requests that originate from Compliance checks (Challan, DL, RC). When a user runs a compliance check and finds issues, they can send a proposal to the LOTS247 team requesting resolution. Users can then track proposal status, follow up with the team, and see when proposals convert into incidents or get rejected. Converted proposals link to the created incidents.

**Key Functionality:**
- Two-tab layout: Active Proposals / Past Proposals
- Active proposals table with columns: Created Date, Proposal ID, Type (Challan/DL/RC), Quantity, Amount, Status, Actions
- Proposal statuses: Sent, Received, Converted, Rejected
- Proposal detail view with two tabs: Overview (status timeline + details) and Follow-up (chat-style thread)
- Follow-up tab uses the same chat-style comment thread pattern as Incident Management
- Cancel action available on active proposals
- Converted proposals link to created incidents
- When a proposal is Converted or Rejected, it moves to Past Proposals

## Recommended Approach: Test-Driven Development

See `product-plan/sections/proposals/tests.md` for detailed test-writing instructions.

## What to Implement

### Components

Copy from `product-plan/sections/proposals/components/`:
- `ProposalList.tsx` — Two-tab proposal list (Active/Past) with table showing Created Date, Proposal ID, Type, Quantity, Amount, Status, and Actions (Follow-up, Cancel, View Detail)
- `ProposalDetail.tsx` — Detail view with two tabs: Overview (status timeline + proposal details) and Follow-up (chat-style comment thread)

Additional top-level views:
- `ProposalManagement.tsx` — Preview wrapper for the proposal list
- `ProposalDetail.tsx` (top-level) — Preview wrapper for the proposal detail

### Data Layer

Key types from `types.ts`: Proposal, ProposalType, ProposalStatus, ProposalActivity, ProposalActivityType, Comment

You'll need to:
- Create CRUD API endpoints for proposals
- Implement proposal creation from Compliance checks (Challan check, DL check, RC check)
- Implement proposal status transitions: Sent -> Received -> Converted / Rejected
- When a proposal is Converted, create a linked incident and store the `linkedIncidentId`
- When a proposal is Converted or Rejected, move it to Past Proposals
- Implement the comment/follow-up thread (same pattern as Incident Management comments)
- Track proposal activities (status changes, notes) with timestamps
- Implement proposal cancellation for active proposals
- Link proposals to their originating compliance check data

### Callbacks — Proposal List

| Callback | Description |
|----------|-------------|
| `onView` | Navigate to proposal detail page |
| `onFollowUp` | Open follow-up thread for a proposal |
| `onCancel` | Cancel an active proposal (with confirmation) |

### Callbacks — Proposal Detail

| Callback | Description |
|----------|-------------|
| `onAddComment` | Post a follow-up message to the proposal thread |
| `onCancel` | Cancel the proposal (with confirmation) |
| `onBack` | Navigate back to the proposal list |

### Empty States

- No active proposals: Show "No active proposals. Proposals are created from Compliance checks."
- No past proposals: Show "No past proposals yet"
- No comments on a proposal: Show "No follow-ups yet — send a message below"
- No activity on a proposal timeline: Show "No activity recorded yet"

## Expected User Flows

### Flow 1: View Active and Past Proposals
1. User navigates to Proposals section
2. User sees "Active Proposals" tab selected by default
3. User views the table of active proposals with status badges (Sent, Received)
4. User clicks "Past Proposals" tab
5. Table switches to show Converted and Rejected proposals
6. **Outcome:** User can see all proposals organized by lifecycle state

### Flow 2: View Proposal Detail and Timeline
1. User clicks a proposal row in the Active list
2. Proposal detail page opens with "Overview" tab active
3. User sees the status timeline showing progression (Sent -> Received)
4. User sees proposal details: type, quantity, amount, creation date
5. **Outcome:** User understands the current state and history of the proposal

### Flow 3: Follow Up on a Proposal
1. User is on a proposal detail page
2. User clicks the "Follow-up" tab
3. User sees the chat-style thread with previous messages from user and LOTS247 team
4. User types a follow-up message and submits
5. **Outcome:** Message appears in the thread; LOTS247 team is notified

### Flow 4: Cancel an Active Proposal
1. User is viewing an active proposal
2. User clicks "Cancel" action
3. Confirmation dialog appears
4. User confirms cancellation
5. **Outcome:** Proposal is cancelled and moves to Past Proposals

### Flow 5: Navigate from Converted Proposal to Incident
1. User views a Converted proposal in Past Proposals
2. User clicks the linked incident reference
3. **Outcome:** User is navigated to the incident detail page in Incident Management

## Files to Reference

- `product-plan/sections/proposals/README.md`
- `product-plan/sections/proposals/tests.md`
- `product-plan/sections/proposals/components/`
- `product-plan/sections/proposals/types.ts`
- `product-plan/sections/proposals/sample-data.json`

## Done When

- [ ] Tests written for key user flows
- [ ] All tests pass
- [ ] Two-tab layout works (Active Proposals / Past Proposals)
- [ ] Active proposals table renders with correct columns and status badges
- [ ] Past proposals table renders with Converted and Rejected proposals
- [ ] Proposal detail page renders with Overview and Follow-up tabs
- [ ] Overview tab shows status timeline and proposal details
- [ ] Follow-up tab shows chat-style comment thread (matching Incident Management pattern)
- [ ] Posting follow-up messages works
- [ ] Cancel action works with confirmation dialog
- [ ] Cancelled proposals move to Past Proposals
- [ ] Converted proposals show linked incident reference
- [ ] Clicking linked incident navigates to Incident Management detail
- [ ] Proposals can be created from Compliance checks (Challan, DL, RC)
- [ ] Status transitions work correctly (Sent -> Received -> Converted/Rejected)
- [ ] Empty states display when no data exists
- [ ] Responsive on mobile
