# Application Shell

## Overview

LOTS247 uses a collapsible sidebar navigation pattern optimized for a dashboard-heavy legal-tech application. The shell provides persistent access to all main sections plus settings and help.

## Layout Pattern

- **Full width sidebar:** 240px with icons + labels
- **Collapsed sidebar:** 64px with icons only
- **Toggle button** to expand/collapse
- Content area fills remaining width

## Responsive Behavior

- **Desktop (1024px+):** Full sidebar, collapsible via toggle
- **Tablet (768px-1023px):** Sidebar collapsed by default, expandable
- **Mobile (&lt;768px):** Sidebar hidden, hamburger menu in header with overlay

## Navigation Structure

Primary:
- Home → Quick Actions Hub (default landing)
- Compliance → Compliance Dashboard
- Incidents → Incident Management (with Challans and Cases sub-nav)
- Fleet → Vehicle & Driver Management

Secondary (below divider):
- Settings → Account settings
- Help → Support, FAQ

## Components Provided

- `AppShell.tsx` — Main layout wrapper with sidebar, top bar, mobile header, quick actions, notifications, and modals
- `MainNav.tsx` — Navigation component supporting nested items with expand/collapse
- `UserMenu.tsx` — User menu with avatar, plan badge, and sign out
- `LanguageContext.tsx` — Language provider for English/Hindi bilingual support

## Features

- **Quick Actions** dropdown in the top bar: Add Incident, Add Vehicle, Call a Lawyer, Add Driver
- **Notification bell** with dropdown showing recent notifications
- **Language switcher** (English/Hindi)
- **User profile** dropdown with My Profile, Settings, Logout
- **Support ticket** modal accessible from Help button
- **Bilingual support** — Full Hindi translations for all shell UI elements

## Props

### AppShellProps

| Prop | Type | Description |
|------|------|-------------|
| `children` | `ReactNode` | Main content area |
| `navigationItems` | `NavigationItem[]` | Primary nav items with icons, labels, hrefs |
| `secondaryItems` | `NavigationItem[]` | Secondary nav items (below divider) |
| `user` | `{ name, avatarUrl?, plan? }` | Current user info |
| `onNavigate` | `(href: string) => void` | Called when nav item clicked |
| `onLogout` | `() => void` | Called when logout clicked |

### NavigationItem

| Field | Type | Description |
|-------|------|-------------|
| `label` | `string` | Display text |
| `href` | `string` | Route path |
| `icon` | `ReactNode` | Lucide icon element |
| `isActive` | `boolean` | Whether this item is currently active |
| `badge` | `string \| number` | Optional badge (e.g., notification count) |
| `children` | `NavigationItem[]` | Sub-navigation items |

## Callback Props

| Callback | Description |
|----------|-------------|
| `onNavigate` | Called with href when user clicks a nav item |
| `onLogout` | Called when user clicks Sign Out |

## Design Notes

- **Colors:** Emerald primary for active states, amber for alerts/warnings, stone for neutrals
- **Typography:** DM Sans for all text
- **Icons:** Lucide React icons throughout
- **Dark mode:** Full support with `dark:` variants
