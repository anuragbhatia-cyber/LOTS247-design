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
