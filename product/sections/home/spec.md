# Home Specification

## Overview
The Home screen is the primary control center of LOTS247, serving as the daily entry point for fleet operators. It provides a real-time operational snapshot across five summary cards and four quick action shortcuts, answering the question: "What is the current health of my fleet and what needs attention right now?"

## User Flows
- User lands on Home after login and sees all five overview cards populated with live data
- User clicks any overview card to deep-link to the respective module (vehicles, drivers, challans, incidents, subscription)
- Pending Challans card opens Challan Management with filters pre-applied
- Subscription card highlights urgency when expiry is within 7 days; expired state restricts features
- User clicks "Add Incident" to open the Incident Creation workflow directly from Home
- User clicks "Add Vehicle" to open the Add Vehicle screen; if plan limit reached, upgrade prompt is shown
- User clicks "Call a Lawyer" to trigger legal support (call modal on web, direct call on mobile); upgrade prompt if plan restricts it
- User clicks "Add Driver" to open the Add Driver form; if no vehicles exist, user is prompted to add one first
- Role-based users (Support Staff, Drivers) see restricted Quick Actions based on their permissions
- User views Compliance Health Score and sees overall fleet compliance percentage with color-coded status
- User sees per-category compliance breakdown (RC, Insurance, PUC, DL, Challans) and clicks through to the relevant module
- User views Alerts section showing vehicles with expiring PUC, insurance, or pending challans, sorted by urgency
- User clicks an alert to deep-link to the specific vehicle's detail page

## UI Requirements
- Five overview cards in a responsive grid: Active Vehicles, Active Drivers, Pending Challans (count + amount), Active Tickets, Subscription Status
- Each card shows a zero-state message when data is empty (e.g., "No Pending Challans")
- Severity-based visual indicators: amber/red for expiring or expired subscription, urgency badges on incidents
- Subscription card shows plan name, status badge (Active / Expiring Soon / Expired), and expiry date
- Four Quick Action buttons: Add Incident (visually emphasized as high-priority), Add Vehicle, Call a Lawyer, Add Driver
- Plan restriction prompts shown inline when user hits limits or unsupported features
- All cards and actions must deep-link to the correct module

### Compliance Health Score
- Overall fleet compliance percentage displayed prominently
- Color-coded status indicator: Green (healthy), Yellow (warnings present), Red (critical issues)
- Breakdown by category, each showing its own status:
  - RC Validity
  - Insurance Status
  - PUC Status
  - DL Validity
  - Pending Challans

### Alerts
- Proactive alerts for vehicles with expiring PUC, insurance, or pending challans
- Each alert shows the specific vehicle (e.g., "MH12AB1234 — PUC expires in 5 days")
- Sorted by urgency — most urgent items first regardless of category
- Category indicated per alert (PUC, Insurance, Challan)
- Expiry thresholds at 7, 15, and 30 days with color-coded urgency (red / amber / yellow)
- Clicking an alert deep-links to the vehicle's detail in Vehicle & Driver Management

## Configuration
- shell: true
