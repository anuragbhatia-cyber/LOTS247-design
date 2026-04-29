# Application Shell

## Overview

LOTS247 uses a collapsible sidebar navigation pattern optimized for a dashboard-heavy legal-tech application. The shell provides persistent access to all main sections plus settings and help.

## Navigation Structure

- **Home** → Quick Actions Hub (default landing)
- **Compliance** → Compliance Dashboard
- **Incidents** → Incident Management (Challans + Cases sub-nav)
- **Fleet** → Vehicle & Driver Management
- *(Visual divider)*
- **Settings** → Account settings, preferences, notifications

## Layout Pattern

Collapsible sidebar with:
- Full width: 240px with icons + labels
- Collapsed width: 64px with icons only
- Toggle button to expand/collapse
- Content area fills remaining width

## Responsive Behavior

- **Desktop (1024px+):** Full sidebar, collapsible via toggle
- **Tablet (768px-1023px):** Sidebar collapsed by default
- **Mobile (<768px):** Sidebar hidden, hamburger menu overlay

## User Menu

- Located at bottom of sidebar
- Shows: user avatar (initials fallback), subscriber name, subscription plan badge
- Logout action

## Design Notes

- Colors: Emerald primary for active states, amber for alerts/warnings, stone for neutrals
- Typography: DM Sans for all text
- Icons: Lucide React icons
- Full dark mode support

## Components

- `AppShell.tsx` — Main layout wrapper with sidebar and content area
- `MainNav.tsx` — Navigation component with section links
- `LanguageContext.tsx` — Language context provider for bilingual support
- `index.ts` — Barrel export file

## Callback Props

| Callback | Description |
|----------|-------------|
| `onNavigate` | Called when user clicks a navigation item |
| `onLogout` | Called when user clicks logout |
| `onToggleSidebar` | Called to expand/collapse sidebar |
