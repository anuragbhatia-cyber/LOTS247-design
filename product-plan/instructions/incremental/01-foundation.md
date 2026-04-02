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
