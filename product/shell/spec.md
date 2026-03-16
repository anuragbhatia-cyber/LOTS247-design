# Application Shell Specification

## Overview
LOTS247 uses a collapsible sidebar navigation pattern optimized for a dashboard-heavy legal-tech application. The shell provides persistent access to all 5 main sections plus settings and help, with a Quick Actions Hub as the default home view.

## Navigation Structure
- **Home** → Quick Actions Hub (default landing)
- **Compliance** → Compliance Dashboard
- **Incidents** → Incident Management
- **Challans** → Challan Management
- **Fleet** → Fleet & Driver Management
- *(Visual divider)*
- **Settings** → Account settings, preferences, notifications
- **Help** → Support, FAQ, documentation

## User Menu
- **Location:** Bottom of sidebar
- **Contents:**
  - User avatar (initials fallback)
  - Subscriber name
  - Subscription plan badge (Basic/Fleet/Enterprise)
  - Logout action

## Layout Pattern
Collapsible sidebar with:
- Full width: 240px with icons + labels
- Collapsed width: 64px with icons only
- Toggle button to expand/collapse
- Content area fills remaining width

## Responsive Behavior
- **Desktop (1024px+):** Full sidebar, collapsible via toggle
- **Tablet (768px-1023px):** Sidebar collapsed by default, expandable
- **Mobile (<768px):** Sidebar hidden, hamburger menu in header to toggle overlay

## Quick Actions Hub (Home)
The default view when users log in, featuring:
- Overall compliance score card with trend indicator
- Active incidents counter with urgency badges
- Pending challans summary with total amount
- Quick action buttons:
  - Report Incident (emergency)
  - Add Vehicle
  - Call Lawyer (24/7 hotline)
  - View All Alerts

## Design Notes
- **Colors:** Emerald primary for active states, amber for alerts/warnings, stone for neutrals
- **Typography:** DM Sans for all text
- **Icons:** Lucide React icons throughout
- **States:** Active nav item has emerald background, hover states on all interactive elements
- **Dark mode:** Full support with `dark:` variants
