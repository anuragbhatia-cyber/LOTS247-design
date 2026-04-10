// =============================================================================
// Data Types
// =============================================================================

export type ArticleCategory = 'template' | 'faq' | 'guide' | 'checklist' | 'regulation' | 'judgement' | 'circular'

export interface Article {
  id: string
  title: string
  category: ArticleCategory
  excerpt: string
  tags: string[]
  readTime: string
  lastUpdated: string
  author: string
  helpfulCount: number
  notHelpfulCount: number
  content: string
  relatedArticleIds: string[]
}

export interface FaqItem {
  id: string
  articleId: string
  topic: string
  question: string
  answer: string
}

export interface ChecklistItem {
  id: string
  articleId: string
  section: string
  label: string
  description: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface KnowledgeBaseBrowseProps {
  /** All articles available in the knowledge base */
  articles: Article[]
  /** Called when user clicks an article card to view details */
  onViewArticle?: (id: string) => void
}

export interface KnowledgeBaseDetailProps {
  /** The article being viewed */
  article: Article
  /** FAQ items belonging to this article (for FAQ-type articles) */
  faqItems?: FaqItem[]
  /** Checklist items belonging to this article (for checklist-type articles) */
  checklistItems?: ChecklistItem[]
  /** Related articles to show at the bottom */
  relatedArticles?: Article[]
  /** Called when user clicks "Download Template" on a template article */
  onDownloadTemplate?: (id: string) => void
  /** Called when user clicks "Copy Text" on a template article */
  onCopyTemplate?: (id: string) => void
  /** Called when user taps thumbs up */
  onHelpful?: (id: string) => void
  /** Called when user taps thumbs down */
  onNotHelpful?: (id: string) => void
  /** Called when user clicks a related article */
  onViewRelated?: (id: string) => void
  /** Called when user navigates back to browse view */
  onBack?: () => void
}
