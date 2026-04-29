# Knowledge Base — Articles & Resources

## Overview

The Knowledge Base provides a searchable repository of articles, templates, FAQs, checklists, judgements, and circulars organized across 8 category tabs. Users can browse by category, search by keyword, filter by tags, read full articles, download templates, copy content, and provide feedback on article helpfulness.

## User Flows

1. **Browse Articles** — User sees a list of article cards organized under 8 category tabs (All, FAQs, Templates, Checklists, Guides, Judgements, Circulars, BOT247).
2. **Search** — User types a keyword to search across all articles.
3. **Tag Filter** — User taps tags to filter articles within the current category.
4. **Article Detail** — Tapping an article opens full content with rich text, embedded media, and action buttons.
5. **Download/Copy** — User can download templates as PDF/DOCX or copy article content to clipboard.
6. **Feedback** — User taps thumbs up/down on an article to rate helpfulness.

## Design Decisions

- 8 category tabs in a horizontally scrollable tab bar.
- Article cards show: title, excerpt, category badge, tag chips, read time.
- Search bar is sticky at the top with real-time filtering.
- Tags are displayed as colored chips below the tab bar; tapping filters by that tag.
- Article detail is a full-screen view with back navigation.
- Download and copy buttons are fixed at the bottom of the article detail.
- Feedback uses simple thumbs up/down with optional text feedback.

## Data Used

- `product/sections/knowledge-base/data.json` — Sample articles, categories, tags.
- `product/sections/knowledge-base/types.ts` — Article, Category, Tag, Feedback.

## Components Provided

| Component | File | Description |
|-----------|------|-------------|
| KnowledgeBase | KnowledgeBase.tsx | Full knowledge base interface |

## Callback Props

| Prop | Component | Signature | Purpose |
|------|-----------|-----------|---------|
| onArticleSelect | KnowledgeBase | `(articleId: string) => void` | Opens article detail |
| onSearch | KnowledgeBase | `(query: string) => void` | Searches articles |
| onTagFilter | KnowledgeBase | `(tag: string) => void` | Filters by tag |
| onDownload | KnowledgeBase | `(articleId: string) => void` | Downloads article/template |
| onCopy | KnowledgeBase | `(articleId: string) => void` | Copies content to clipboard |
| onFeedback | KnowledgeBase | `(articleId: string, helpful: boolean) => void` | Submits feedback |
| onCategoryChange | KnowledgeBase | `(category: string) => void` | Switches category tab |
