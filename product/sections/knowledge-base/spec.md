# Knowledge Base Specification

## Overview
A centralized legal knowledge repository where vehicle owners and fleet managers can browse, search, and access legal templates, FAQs, step-by-step guides, compliance checklists, and regulatory references. Content is curated by the LOTS247 legal team and organized by category and topic, with bilingual support (EN/HI).

## Content Categories
- **Legal Templates** — Ready-to-use legal documents (accident affidavits, Form 29/30 for ownership transfer, NOC applications, insurance claim forms, RTI applications, legal notices, complaint letters)
- **FAQs** — Frequently asked questions organized by topic (Challans, Compliance, Insurance, RTO, Fleet Management, Seizure & Detention)
- **Legal Guides** — Step-by-step procedural guides (accident response, challan dispute process, insurance claims, interstate transfer, hypothecation removal, state-wise RTO procedures)
- **Compliance Checklists** — Actionable checklists (vehicle ownership checklist, pre-travel checklist, accident procedure checklist, fleet compliance checklist)
- **Regulatory Reference** — Key sections of Motor Vehicles Act 2019, penalty structures, and state-specific regulations

## User Flows
- User lands on Knowledge Base and sees a search bar, category tabs, and a grid of article cards
- User searches for content using free-text search across all articles (searches title, body, and tags)
- User filters content by category tab: All (default), Templates, FAQs, Guides, Checklists, Regulations
- User further filters by tags (vehicle type, state, document type, topic)
- User clicks an article card to open the detail view
- In the detail view, user reads the article content with formatted headings, lists, and callouts
- For template articles, user taps "Download Template" to get a PDF or "Copy Text" to copy the template content
- For FAQ articles, user sees expandable question-answer pairs grouped by topic
- For checklist articles, user sees an interactive checklist with checkable items (state not persisted)
- User sees related articles at the bottom of the detail view and can navigate to them
- User taps "Was this helpful?" (thumbs up/down) to provide feedback on an article
- User taps the back button or breadcrumb to return to the browse view with previous filters preserved

## UI Requirements

### Browse View
- Search bar at the top with placeholder text "Search legal guides, templates, FAQs..."
- Category tabs below search: All | Templates | FAQs | Guides | Checklists | Regulations
- Tag filter bar below tabs: horizontal scrollable chips for common tags (e.g., Accident, Challan, Insurance, RTO, Fleet, State-specific)
- Active filters shown as dismissible chips
- Article cards in a responsive grid (3 columns on desktop, 2 on tablet, 1 on mobile)
- Each card shows: category badge (color-coded), title, short excerpt (2 lines), tag chips (max 3), read time estimate, last updated date
- Results count shown above the grid (e.g., "24 articles")
- Empty state when search/filter returns no results with suggestion to adjust filters

### Detail View
- Breadcrumb navigation: Knowledge Base > [Category] > [Article Title]
- Article header: title, category badge, tag chips, read time, last updated date
- Article body: formatted content with headings, paragraphs, ordered/unordered lists, callout boxes (tip, warning, important), and inline links
- For Templates: "Download Template" and "Copy Text" action buttons in the header area
- For FAQs: accordion-style expandable Q&A pairs
- For Checklists: interactive checkbox items with section groupings
- Related Articles section at the bottom: horizontal scroll of 3-4 related article cards
- "Was this helpful?" feedback row with thumbs up/down buttons
- Sticky back-to-top button on long articles

## Configuration
- shell: true
