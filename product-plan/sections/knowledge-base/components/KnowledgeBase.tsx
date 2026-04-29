import { useState, useMemo, useRef, useEffect } from 'react'
import {
  Search,
  X,
  Clock,
  Calendar,
  ArrowLeft,
  FileText,
  HelpCircle,
  BookOpen,
  CheckSquare,
  Scale,
  Gavel,
  ScrollText,
  ThumbsUp,
  ThumbsDown,
  Download,
  Copy,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ArrowUpToLine,
  SlidersHorizontal,
  Bot,
  Send,
  PanelRight,
  PanelRightClose,
} from 'lucide-react'
import { useLanguage, type Language } from '@/shell/components/LanguageContext'
import type {
  Article,
  ArticleCategory,
  FaqItem,
  ChecklistItem,
  KnowledgeBaseBrowseProps,
} from '../types'

// =============================================================================
// Translations
// =============================================================================

const translations: Record<Language, Record<string, string>> = {
  en: {
    pageTitle: 'Knowledge Base',
    pageSubtitle: 'Legal guides, templates, and resources for vehicle owners',
    searchPlaceholder: 'Search legal guides, templates, FAQs...',
    all: 'All',
    templates: 'Templates',
    faqs: 'FAQs',
    guides: 'Guides',
    checklists: 'Checklists',
    regulations: 'Regulations',
    judgements: 'Judgements',
    circulars: 'Circulars',
    articles: 'articles',
    readTime: 'read',
    updated: 'Updated',
    by: 'by',
    downloadTemplate: 'Download Template',
    copyText: 'Copy Text',
    copied: 'Copied!',
    relatedArticles: 'Related Articles',
    wasHelpful: 'Was this helpful?',
    helpful: 'Helpful',
    notHelpful: 'Not helpful',
    backToKb: 'Back to Knowledge Base',
    filters: 'Filters',
    tags: 'Tags',
    readTimeFilter: 'Read Time',
    sortByFilter: 'Sort By',
    allTags: 'All Tags',
    allReadTimes: 'All',
    quickRead: 'Quick (< 5 min)',
    mediumRead: 'Medium (5-8 min)',
    longRead: 'Long (> 8 min)',
    mostPopular: 'Most Popular',
    recentlyUpdated: 'Recently Updated',
    alphabetical: 'A to Z',
    defaultSort: 'Default',
    clearAll: 'Clear All',
    filteredBy: 'Filtered by:',
    noResults: 'No articles found',
    noResultsHint: 'Try adjusting your search or filters',
    emptyStateTitle: 'Explore our legal knowledge base',
    emptyStateDesc: 'Browse templates, FAQs, guides, and more',
  },
  hi: {
    pageTitle: 'ज्ञान आधार',
    pageSubtitle: 'वाहन मालिकों के लिए कानूनी गाइड, टेम्पलेट और संसाधन',
    searchPlaceholder: 'कानूनी गाइड, टेम्पलेट, FAQ खोजें...',
    all: 'सभी',
    templates: 'टेम्पलेट',
    faqs: 'FAQ',
    guides: 'गाइड',
    checklists: 'चेकलिस्ट',
    regulations: 'नियम',
    judgements: 'निर्णय',
    circulars: 'परिपत्र',
    articles: 'लेख',
    readTime: 'पढ़ें',
    updated: 'अपडेटेड',
    by: 'द्वारा',
    downloadTemplate: 'टेम्पलेट डाउनलोड करें',
    copyText: 'टेक्स्ट कॉपी करें',
    copied: 'कॉपी हो गया!',
    relatedArticles: 'संबंधित लेख',
    wasHelpful: 'क्या यह मददगार था?',
    helpful: 'मददगार',
    notHelpful: 'मददगार नहीं',
    backToKb: 'ज्ञान आधार पर वापस',
    filters: 'फ़िल्टर',
    tags: 'टैग',
    readTimeFilter: 'पढ़ने का समय',
    sortByFilter: 'क्रमबद्ध करें',
    allTags: 'सभी टैग',
    allReadTimes: 'सभी',
    quickRead: 'त्वरित (< 5 मिनट)',
    mediumRead: 'मध्यम (5-8 मिनट)',
    longRead: 'लंबा (> 8 मिनट)',
    mostPopular: 'सबसे लोकप्रिय',
    recentlyUpdated: 'हाल ही में अपडेटेड',
    alphabetical: 'A से Z',
    defaultSort: 'डिफ़ॉल्ट',
    clearAll: 'सभी हटाएं',
    filteredBy: 'फ़िल्टर:',
    noResults: 'कोई लेख नहीं मिला',
    noResultsHint: 'अपनी खोज या फ़िल्टर बदलें',
    emptyStateTitle: 'हमारा कानूनी ज्ञान आधार देखें',
    emptyStateDesc: 'टेम्पलेट, FAQ, गाइड और बहुत कुछ ब्राउज़ करें',
  },
}

// =============================================================================
// Category Config
// =============================================================================

const CATEGORY_CONFIG: Record<
  ArticleCategory,
  {
    labelKey: string
    bg: string
    text: string
    border: string
    icon: typeof FileText
    activeBg: string
    activeText: string
  }
> = {
  template: {
    labelKey: 'templates',
    bg: 'bg-stone-100 dark:bg-stone-800',
    text: 'text-stone-600 dark:text-stone-300',
    border: 'border-stone-200 dark:border-stone-700',
    icon: FileText,
    activeBg: 'bg-emerald-600 dark:bg-emerald-500',
    activeText: 'text-white dark:text-white',
  },
  faq: {
    labelKey: 'faqs',
    bg: 'bg-stone-100 dark:bg-stone-800',
    text: 'text-stone-600 dark:text-stone-300',
    border: 'border-stone-200 dark:border-stone-700',
    icon: HelpCircle,
    activeBg: 'bg-emerald-600 dark:bg-emerald-500',
    activeText: 'text-white dark:text-white',
  },
  guide: {
    labelKey: 'guides',
    bg: 'bg-stone-100 dark:bg-stone-800',
    text: 'text-stone-600 dark:text-stone-300',
    border: 'border-stone-200 dark:border-stone-700',
    icon: BookOpen,
    activeBg: 'bg-emerald-600 dark:bg-emerald-500',
    activeText: 'text-white dark:text-white',
  },
  checklist: {
    labelKey: 'checklists',
    bg: 'bg-stone-100 dark:bg-stone-800',
    text: 'text-stone-600 dark:text-stone-300',
    border: 'border-stone-200 dark:border-stone-700',
    icon: CheckSquare,
    activeBg: 'bg-emerald-600 dark:bg-emerald-500',
    activeText: 'text-white dark:text-white',
  },
  regulation: {
    labelKey: 'regulations',
    bg: 'bg-stone-100 dark:bg-stone-800',
    text: 'text-stone-600 dark:text-stone-300',
    border: 'border-stone-200 dark:border-stone-700',
    icon: Scale,
    activeBg: 'bg-emerald-600 dark:bg-emerald-500',
    activeText: 'text-white dark:text-white',
  },
  judgement: {
    labelKey: 'judgements',
    bg: 'bg-stone-100 dark:bg-stone-800',
    text: 'text-stone-600 dark:text-stone-300',
    border: 'border-stone-200 dark:border-stone-700',
    icon: Gavel,
    activeBg: 'bg-emerald-600 dark:bg-emerald-500',
    activeText: 'text-white dark:text-white',
  },
  circular: {
    labelKey: 'circulars',
    bg: 'bg-stone-100 dark:bg-stone-800',
    text: 'text-stone-600 dark:text-stone-300',
    border: 'border-stone-200 dark:border-stone-700',
    icon: ScrollText,
    activeBg: 'bg-emerald-600 dark:bg-emerald-500',
    activeText: 'text-white dark:text-white',
  },
}

const CATEGORY_TABS: (ArticleCategory | 'all')[] = [
  'all',
  'template',
  'faq',
  'guide',
  'checklist',
  'regulation',
  'judgement',
  'circular',
]

// =============================================================================
// Helpers
// =============================================================================

function getAllTags(articles: Article[]): string[] {
  const tagSet = new Set<string>()
  articles.forEach((a) => a.tags.forEach((t) => tagSet.add(t)))
  return Array.from(tagSet).sort()
}

// Simple markdown-like renderer for article content
function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: JSX.Element[] = []
  let inTable = false
  let tableRows: string[][] = []
  let tableAligns: string[] = []
  let inList = false
  let listItems: { text: string; ordered: boolean; num: number }[] = []

  function flushList() {
    if (listItems.length === 0) return
    const ordered = listItems[0].ordered
    const Tag = ordered ? 'ol' : 'ul'
    elements.push(
      <Tag
        key={`list-${elements.length}`}
        className={`mb-4 space-y-1.5 ${ordered ? 'list-decimal' : 'list-disc'} pl-6 text-stone-700 dark:text-stone-300`}
      >
        {listItems.map((li, i) => (
          <li key={i} className="leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: inlineFormat(li.text) }} />
          </li>
        ))}
      </Tag>
    )
    listItems = []
    inList = false
  }

  function flushTable() {
    if (tableRows.length === 0) return
    const header = tableRows[0]
    const body = tableRows.slice(1)
    elements.push(
      <div key={`table-${elements.length}`} className="mb-6 overflow-x-auto rounded-lg border border-stone-200 dark:border-stone-700">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-stone-50 dark:bg-stone-800/60">
              {header.map((cell, i) => (
                <th
                  key={i}
                  className="px-4 py-2.5 text-left font-semibold text-stone-900 dark:text-stone-100 border-b border-stone-200 dark:border-stone-700"
                  style={{ textAlign: (tableAligns[i] as 'left' | 'center' | 'right') || 'left' }}
                >
                  <span dangerouslySetInnerHTML={{ __html: inlineFormat(cell) }} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {body.map((row, ri) => (
              <tr key={ri} className="border-b border-stone-100 dark:border-stone-800 last:border-0 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className="px-4 py-2.5 text-stone-700 dark:text-stone-300"
                    style={{ textAlign: (tableAligns[ci] as 'left' | 'center' | 'right') || 'left' }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: inlineFormat(cell) }} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
    tableRows = []
    tableAligns = []
    inTable = false
  }

  function inlineFormat(text: string): string {
    return text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-stone-900 dark:text-stone-100">$1</strong>')
      .replace(/\[(.+?)\]/g, '<span class="text-emerald-600 dark:text-emerald-400">$1</span>')
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const trimmed = line.trim()

    // Table row
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      if (inList) flushList()
      const cells = trimmed
        .slice(1, -1)
        .split('|')
        .map((c) => c.trim())

      // Separator row
      if (cells.every((c) => /^[-:]+$/.test(c))) {
        tableAligns = cells.map((c) => {
          if (c.startsWith(':') && c.endsWith(':')) return 'center'
          if (c.endsWith(':')) return 'right'
          return 'left'
        })
        inTable = true
        continue
      }

      tableRows.push(cells)
      inTable = true
      continue
    } else if (inTable) {
      flushTable()
    }

    // Blockquote
    if (trimmed.startsWith('> ')) {
      if (inList) flushList()
      const quoteText = trimmed.slice(2)
      const isWarning = quoteText.startsWith('**Warning:')
      const isTip = quoteText.startsWith('**Tip:')
      const isImportant = quoteText.startsWith('**Important:')
      const isNote = quoteText.startsWith('**Note:')

      let bgClass = 'bg-stone-50 dark:bg-stone-800/50 border-stone-300 dark:border-stone-600'
      let iconColor = 'text-stone-500'

      if (isWarning) {
        bgClass = 'bg-amber-50 dark:bg-amber-950/30 border-amber-400 dark:border-amber-600'
        iconColor = 'text-amber-600 dark:text-amber-400'
      } else if (isTip) {
        bgClass = 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-400 dark:border-emerald-600'
        iconColor = 'text-emerald-600 dark:text-emerald-400'
      } else if (isImportant || isNote) {
        bgClass = 'bg-blue-50 dark:bg-blue-950/30 border-blue-400 dark:border-blue-600'
        iconColor = 'text-blue-600 dark:text-blue-400'
      }

      elements.push(
        <div key={`bq-${i}`} className={`mb-4 rounded-lg border-l-4 p-4 ${bgClass}`}>
          <p className={`text-sm leading-relaxed ${iconColor}`}>
            <span dangerouslySetInnerHTML={{ __html: inlineFormat(quoteText) }} />
          </p>
        </div>
      )
      continue
    }

    // Headings
    if (trimmed.startsWith('### ')) {
      if (inList) flushList()
      elements.push(
        <h3 key={`h3-${i}`} className="mt-8 mb-3 text-base font-semibold text-stone-900 dark:text-stone-100">
          {trimmed.slice(4)}
        </h3>
      )
      continue
    }
    if (trimmed.startsWith('## ')) {
      if (inList) flushList()
      elements.push(
        <h2 key={`h2-${i}`} className="mt-10 mb-4 text-lg font-bold text-stone-900 dark:text-stone-50">
          {trimmed.slice(3)}
        </h2>
      )
      continue
    }
    if (trimmed.startsWith('#### ')) {
      if (inList) flushList()
      elements.push(
        <h4 key={`h4-${i}`} className="mt-6 mb-2 text-sm font-bold text-stone-800 dark:text-stone-200">
          {trimmed.slice(5)}
        </h4>
      )
      continue
    }

    // Ordered list
    const orderedMatch = trimmed.match(/^(\d+)\.\s+(.+)$/)
    if (orderedMatch) {
      inList = true
      listItems.push({ text: orderedMatch[2], ordered: true, num: parseInt(orderedMatch[1]) })
      continue
    }

    // Unordered list
    if (trimmed.startsWith('- ')) {
      inList = true
      listItems.push({ text: trimmed.slice(2), ordered: false, num: 0 })
      continue
    }

    // Indented list continuation
    if (trimmed.startsWith('  - ') && inList) {
      listItems.push({ text: trimmed.slice(4), ordered: false, num: 0 })
      continue
    }

    if (inList) flushList()

    // Empty line
    if (trimmed === '') continue

    // Paragraph
    elements.push(
      <p key={`p-${i}`} className="mb-4 text-sm leading-relaxed text-stone-700 dark:text-stone-300">
        <span dangerouslySetInnerHTML={{ __html: inlineFormat(trimmed) }} />
      </p>
    )
  }

  if (inList) flushList()
  if (inTable) flushTable()

  return elements
}

// =============================================================================
// Sub-Components
// =============================================================================

function CategoryBadge({ category, size = 'sm' }: { category: ArticleCategory; size?: 'sm' | 'md' }) {
  const config = CATEGORY_CONFIG[category]
  const { language } = useLanguage()
  const t = translations[language]
  const Icon = config.icon
  const sizeClasses = size === 'sm'
    ? 'text-[10px] px-2 py-0.5 gap-1'
    : 'text-xs px-2.5 py-1 gap-1.5'

  return (
    <span className={`inline-flex items-center font-semibold rounded-full uppercase tracking-wider ${config.bg} ${config.text} ${sizeClasses}`}>
      <Icon className={size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} />
      {t[config.labelKey]}
    </span>
  )
}

function ArticleCard({
  article,
  onClick,
}: {
  article: Article
  onClick?: () => void
}) {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <button
      onClick={onClick}
      className="group w-full text-left bg-white dark:bg-stone-900 rounded-2xl border border-transparent shadow-sm dark:shadow-stone-950/20 p-5 sm:p-6 transition-all duration-200 hover:border-emerald-500 dark:hover:border-emerald-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
    >
      <div className="mb-3">
        <CategoryBadge category={article.category} />
      </div>

      <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-100 mb-2 leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
        {article.title}
      </h3>

      <p className="text-xs text-stone-500 dark:text-stone-400 mb-3 line-clamp-2 leading-relaxed">
        {article.excerpt}
      </p>

      <div className="flex items-center gap-1 text-[10px] text-stone-400 dark:text-stone-500">
        <Calendar className="w-3 h-3" />
        {article.lastUpdated}
      </div>
    </button>
  )
}

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(null)

  const topics = useMemo(() => {
    const topicMap = new Map<string, FaqItem[]>()
    items.forEach((item) => {
      const existing = topicMap.get(item.topic) || []
      existing.push(item)
      topicMap.set(item.topic, existing)
    })
    return Array.from(topicMap.entries())
  }, [items])

  return (
    <div className="space-y-6">
      {topics.map(([topic, topicItems]) => (
        <div key={topic}>
          <h3 className="text-sm font-bold text-stone-800 dark:text-stone-200 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            {topic}
          </h3>
          <div className="space-y-2">
            {topicItems.map((item) => {
              const isOpen = openId === item.id
              return (
                <div
                  key={item.id}
                  className="rounded-lg border border-stone-200 dark:border-stone-700 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                  >
                    <span className="text-sm font-medium text-stone-800 dark:text-stone-200">
                      {item.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-stone-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-sm text-stone-600 dark:text-stone-400 leading-relaxed border-t border-stone-100 dark:border-stone-800 pt-3">
                      <span dangerouslySetInnerHTML={{
                        __html: item.answer
                          .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-stone-800 dark:text-stone-200">$1</strong>')
                      }} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

function ChecklistView({ items }: { items: ChecklistItem[] }) {
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const sections = useMemo(() => {
    const sectionMap = new Map<string, ChecklistItem[]>()
    items.forEach((item) => {
      const existing = sectionMap.get(item.section) || []
      existing.push(item)
      sectionMap.set(item.section, existing)
    })
    return Array.from(sectionMap.entries())
  }, [items])

  const toggleItem = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const totalItems = items.length
  const checkedCount = checked.size
  const progress = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="bg-stone-50 dark:bg-stone-800/50 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
            {checkedCount} / {totalItems} completed
          </span>
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
            {progress}%
          </span>
        </div>
        <div className="w-full h-2 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 dark:bg-emerald-400 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {sections.map(([section, sectionItems]) => {
        const sectionChecked = sectionItems.filter((i) => checked.has(i.id)).length
        return (
          <div key={section}>
            <h3 className="text-sm font-bold text-stone-800 dark:text-stone-200 mb-3 flex items-center gap-2">
              <span className="text-xs text-stone-400 dark:text-stone-500">
                {sectionChecked}/{sectionItems.length}
              </span>
              {section}
            </h3>
            <div className="space-y-2">
              {sectionItems.map((item) => {
                const isChecked = checked.has(item.id)
                return (
                  <button
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`w-full text-left rounded-lg border p-3.5 transition-all duration-200 ${
                      isChecked
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700'
                        : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                          isChecked
                            ? 'bg-emerald-500 border-emerald-500 text-white'
                            : 'border-stone-300 dark:border-stone-600'
                        }`}
                      >
                        {isChecked && (
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <p
                          className={`text-sm font-medium transition-colors ${
                            isChecked
                              ? 'text-emerald-700 dark:text-emerald-400 line-through'
                              : 'text-stone-800 dark:text-stone-200'
                          }`}
                        >
                          {item.label}
                        </p>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

// =============================================================================
// Detail View
// =============================================================================

function DetailView({
  article,
  faqItems,
  checklistItems,
  relatedArticles,
  onDownloadTemplate,
  onCopyTemplate,
  onHelpful,
  onNotHelpful,
  onViewRelated,
  onBack,
}: {
  article: Article
  faqItems: FaqItem[]
  checklistItems: ChecklistItem[]
  relatedArticles: Article[]
  onDownloadTemplate?: (id: string) => void
  onCopyTemplate?: (id: string) => void
  onHelpful?: (id: string) => void
  onNotHelpful?: (id: string) => void
  onViewRelated?: (id: string) => void
  onBack?: () => void
}) {
  const { language } = useLanguage()
  const t = translations[language]
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const categoryConfig = CATEGORY_CONFIG[article.category]

  const articleFaqs = faqItems.filter((f) => f.articleId === article.id)
  const articleChecklists = checklistItems.filter((c) => c.articleId === article.id)

  const handleCopy = (id: string) => {
    onCopyTemplate?.(id)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div
      className="min-h-screen bg-stone-100 dark:bg-stone-950"
      onScroll={(e) => {
        const target = e.target as HTMLElement
        setShowBackToTop(target.scrollTop > 400)
      }}
    >
      <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-8">
        {/* Article header */}
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 mb-6">
          <div className="flex items-center gap-3 mb-5">
            <button
              onClick={onBack}
              className="p-1.5 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500 dark:text-stone-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100 truncate">
              {article.title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <CategoryBadge category={article.category} size="md" />
            <span className="flex items-center gap-1 text-xs text-stone-400 dark:text-stone-500">
              <Calendar className="w-3.5 h-3.5" />
              {t.updated} {article.lastUpdated}
            </span>
          </div>

          {/* Template actions */}
          {article.category === 'template' && (
            <div className="flex gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
              <button
                onClick={() => onDownloadTemplate?.(article.id)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white text-sm font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                {t.downloadTemplate}
              </button>
              <button
                onClick={() => handleCopy(article.id)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 text-sm font-medium transition-colors"
              >
                <Copy className="w-4 h-4" />
                {copiedId === article.id ? t.copied : t.copyText}
              </button>
            </div>
          )}
        </div>

        {/* Article body */}
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 mb-6">
          {/* FAQ content */}
          {article.category === 'faq' && articleFaqs.length > 0 && (
            <FaqAccordion items={articleFaqs} />
          )}

          {/* Checklist content */}
          {article.category === 'checklist' && articleChecklists.length > 0 && (
            <ChecklistView items={articleChecklists} />
          )}

          {/* Markdown content */}
          {article.content && (
            <div className="prose-sm">
              {renderContent(article.content)}
            </div>
          )}

          {/* Empty state for content-less articles */}
          {!article.content && article.category !== 'faq' && article.category !== 'checklist' && (
            <p className="text-sm text-stone-400 dark:text-stone-500 italic">
              Content coming soon.
            </p>
          )}
        </div>

        {/* Was this helpful? */}
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-5 sm:p-6 mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-stone-600 dark:text-stone-400">
              {t.wasHelpful}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onHelpful?.(article.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:border-emerald-300 hover:text-emerald-600 dark:hover:border-emerald-700 dark:hover:text-emerald-400 text-sm transition-colors"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{article.helpfulCount}</span>
              </button>
              <button
                onClick={() => onNotHelpful?.(article.id)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:border-rose-300 hover:text-rose-600 dark:hover:border-rose-700 dark:hover:text-rose-400 text-sm transition-colors"
              >
                <ThumbsDown className="w-4 h-4" />
                <span>{article.notHelpfulCount}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <div className="mb-8">
            <h2 className="text-base font-bold text-stone-900 dark:text-stone-100 mb-4">
              {t.relatedArticles}
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
              {relatedArticles.map((ra) => (
                <button
                  key={ra.id}
                  onClick={() => onViewRelated?.(ra.id)}
                  className="flex-none w-64 sm:w-72 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-4 text-left hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors snap-start"
                >
                  <CategoryBadge category={ra.category} />
                  <h3 className="text-sm font-semibold text-stone-800 dark:text-stone-200 mt-2 mb-1.5 line-clamp-2">
                    {ra.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 line-clamp-2">
                    {ra.excerpt}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-22 right-6 w-10 h-10 rounded-full bg-stone-700 dark:bg-stone-600 text-white shadow-lg hover:bg-stone-800 dark:hover:bg-stone-500 transition-colors flex items-center justify-center"
        >
          <ArrowUpToLine className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

// =============================================================================
// BOT247 — Types, Search, Component
// =============================================================================

type BotMessageRole = 'bot' | 'user'
interface BotMessage {
  id: string
  role: BotMessageRole
  text: string
  articles?: Article[]
  faqMatches?: { question: string; answer: string; topic: string }[]
}

function scoredSearch(query: string, articles: Article[], faqItems: FaqItem[]) {
  const terms = query.toLowerCase().split(/\s+/).filter((t) => t.length > 1)
  if (terms.length === 0) return { topArticles: [], topFaqs: [] }

  const articleScores = articles.map((a) => {
    let score = 0
    const title = a.title.toLowerCase()
    const excerpt = a.excerpt.toLowerCase()
    const content = a.content.toLowerCase()
    const tags = a.tags.map((t) => t.toLowerCase()).join(' ')
    const category = a.category.toLowerCase()
    for (const term of terms) {
      if (title.includes(term)) score += 6
      if (tags.includes(term)) score += 4
      if (category.includes(term)) score += 3
      if (excerpt.includes(term)) score += 2
      if (content.includes(term)) score += 1
    }
    return { article: a, score }
  })

  const faqScores = faqItems.map((f) => {
    let score = 0
    const q = f.question.toLowerCase()
    const a = f.answer.toLowerCase()
    const topic = f.topic.toLowerCase()
    for (const term of terms) {
      if (q.includes(term)) score += 5
      if (topic.includes(term)) score += 3
      if (a.includes(term)) score += 2
    }
    return { faq: f, score }
  })

  const topArticles = articleScores.filter((s) => s.score > 0).sort((a, b) => b.score - a.score).slice(0, 3).map((s) => s.article)
  const topFaqs = faqScores.filter((s) => s.score >= 4).sort((a, b) => b.score - a.score).slice(0, 2).map((s) => ({ question: s.faq.question, answer: s.faq.answer, topic: s.faq.topic }))
  return { topArticles, topFaqs }
}

function generateBotResponse(query: string, articles: Article[], faqItems: FaqItem[]) {
  const q = query.toLowerCase().trim()
  if (/^(hi|hello|hey|namaste)/.test(q)) {
    return { text: "Namaste! I'm BOT247. Ask me about challans, insurance, affidavits, vehicle transfers, or any legal topic.", articles: [], faqMatches: [] }
  }
  if (/^(help|what can you)/.test(q)) {
    return { text: "I can find:\n• Legal templates (affidavits, RTI)\n• Challan disputes\n• Insurance claim steps\n• Vehicle transfer guides\n• Regulations & penalties\n• Court judgements\n\nJust ask!", articles: [], faqMatches: [] }
  }
  const { topArticles, topFaqs } = scoredSearch(query, articles, faqItems)
  if (topFaqs.length > 0 || topArticles.length > 0) {
    const text = topFaqs.length > 0
      ? `Here's what I found for "${query}":`
      : topArticles.length === 1
        ? `I found a relevant resource for "${query}":`
        : `Here are the most relevant resources for "${query}":`
    return { text, articles: topArticles, faqMatches: topFaqs }
  }
  return { text: `I couldn't find a match for "${query}". Try: affidavit, challan, insurance claim, ownership transfer, penalty, or RC.`, articles: [], faqMatches: [] }
}

const SUGGESTED_QUERIES = ['I need an affidavit', 'How to dispute a challan?', 'Insurance claim documents', 'Transfer vehicle to another state']

function Bot247({
  articles,
  faqItems,
  onOpenArticle,
}: {
  articles: Article[]
  faqItems: FaqItem[]
  onOpenArticle: (id: string) => void
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSidebar, setIsSidebar] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<BotMessage[]>([
    { id: 'welcome', role: 'bot', text: "Hi! I'm BOT247, ask me anything!" },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, messages])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const userMsg: BotMessage = { id: `u-${Date.now()}`, role: 'user', text: text.trim() }
    const response = generateBotResponse(text, articles, faqItems)
    const botMsg: BotMessage = { id: `b-${Date.now()}`, role: 'bot', text: response.text, articles: response.articles, faqMatches: response.faqMatches }
    setMessages((prev) => [...prev, userMsg, botMsg])
    setInput('')
  }

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); sendMessage(input) }

  return (
    <>
      {/* Backdrop */}
      {isOpen && !isSidebar && (
        <div className="fixed inset-0 z-40 bg-stone-900/20 dark:bg-stone-950/40" onClick={() => setIsOpen(false)} />
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className={`fixed z-50 flex flex-col bg-white dark:bg-stone-900 overflow-hidden transition-all duration-200 ${
          isSidebar
            ? 'top-0 right-0 h-screen w-[360px] border-l-2 border-stone-300 dark:border-stone-600 shadow-2xl rounded-none'
            : 'bottom-20 right-6 w-[340px] sm:w-[380px] rounded-2xl border-2 border-stone-300 dark:border-stone-600 shadow-[0_8px_40px_rgba(0,0,0,0.18)] dark:shadow-[0_8px_40px_rgba(0,0,0,0.5)]'
        }`}
          style={isSidebar ? {} : { maxHeight: 'calc(100vh - 140px)' }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-emerald-600 dark:bg-emerald-700 shrink-0">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white leading-none">BOT247</p>
            </div>
            <button
              onClick={() => setIsSidebar(!isSidebar)}
              className="p-1 rounded-lg hover:bg-white/20 text-white/70 hover:text-white transition-colors"
              title={isSidebar ? 'Collapse to overlay' : 'Expand to sidebar'}
            >
              {isSidebar ? <PanelRightClose className="w-4 h-4" /> : <PanelRight className="w-4 h-4" />}
            </button>
            <button
              onClick={() => { setIsOpen(false); setIsSidebar(false) }}
              className="p-1 rounded-lg hover:bg-white/20 text-white/70 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {msg.role === 'bot' && (
                  <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                )}
                <div className={`max-w-[85%] space-y-2 ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div className={`px-3 py-2 rounded-xl text-xs leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-emerald-600 dark:bg-emerald-500 text-white rounded-tr-sm'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 rounded-tl-sm'
                  }`}>
                    {msg.text}
                  </div>

                  {/* FAQ Matches */}
                  {msg.faqMatches && msg.faqMatches.length > 0 && (
                    <div className="w-full space-y-2">
                      {msg.faqMatches.map((faq, i) => (
                        <div key={i} className="rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/60 p-3">
                          <p className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">{faq.topic}</p>
                          <p className="text-xs font-semibold text-stone-800 dark:text-stone-200 mb-1.5">{faq.question}</p>
                          <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-4">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Article Cards */}
                  {msg.articles && msg.articles.length > 0 && (
                    <div className="w-full space-y-2">
                      {msg.articles.map((article) => {
                        const config = CATEGORY_CONFIG[article.category]
                        const Icon = config.icon
                        return (
                          <button
                            key={article.id}
                            onClick={() => { onOpenArticle(article.id); setIsOpen(false) }}
                            className="w-full text-left rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-3 hover:border-emerald-400 dark:hover:border-emerald-600 hover:shadow-sm transition-all group"
                          >
                            <span className={`inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded-full uppercase tracking-wider font-semibold mb-1.5 ${config.bg} ${config.text}`}>
                              <Icon className="w-2.5 h-2.5" />
                              {article.category}
                            </span>
                            <p className="text-xs font-semibold text-stone-800 dark:text-stone-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 mb-1">{article.title}</p>
                            <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                            <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium mt-1.5">Open article →</p>
                          </button>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested queries */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 shrink-0">
              <p className="text-[10px] text-stone-400 dark:text-stone-500 mb-2 font-medium">Try asking:</p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_QUERIES.map((q) => (
                  <button key={q} onClick={() => sendMessage(q)}
                    className="text-[11px] px-2.5 py-1 rounded-full border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-3 border-t border-stone-100 dark:border-stone-800 shrink-0">
            <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-800 rounded-xl px-3 py-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about any legal topic..."
                className="flex-1 bg-transparent text-xs text-stone-800 dark:text-stone-200 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none"
              />
              <button type="submit" disabled={!input.trim()}
                className="w-7 h-7 rounded-lg bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors shrink-0">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-lg shadow-emerald-900/30 flex items-center justify-center transition-all duration-200 ${
          isSidebar ? 'opacity-0 pointer-events-none' : ''
        } ${
          isOpen
            ? 'bg-stone-700 dark:bg-stone-600 hover:bg-stone-800 dark:hover:bg-stone-500'
            : 'bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 dark:hover:bg-emerald-600 hover:scale-105'
        }`}
        title={isOpen ? 'Close BOT247' : 'Ask BOT247'}
      >
        {isOpen ? <X className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 dark:bg-emerald-300 border-2 border-white dark:border-stone-900 animate-pulse" />
        )}
      </button>
    </>
  )
}

// =============================================================================
// Filter Pill
// =============================================================================

function FilterPill({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
      {label}
      <button
        onClick={onClear}
        className="ml-0.5 p-0.5 rounded-full hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  )
}

type ReadTimeFilter = 'all' | 'quick' | 'medium' | 'long'
type SortBy = 'default' | 'popular' | 'recent' | 'alphabetical'

function parseReadTimeMinutes(readTime: string): number {
  const match = readTime.match(/(\d+)/)
  return match ? parseInt(match[1]) : 0
}

// =============================================================================
// Main Component
// =============================================================================

export function KnowledgeBase({
  articles,
  faqItems = [],
  checklistItems = [],
  onDownloadTemplate,
  onCopyTemplate,
  onHelpful,
  onNotHelpful,
}: KnowledgeBaseBrowseProps & {
  faqItems?: FaqItem[]
  checklistItems?: ChecklistItem[]
  onDownloadTemplate?: (id: string) => void
  onCopyTemplate?: (id: string) => void
  onHelpful?: (id: string) => void
  onNotHelpful?: (id: string) => void
}) {
  const { language } = useLanguage()
  const t = translations[language]

  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<ArticleCategory | 'all'>('all')
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set())
  const [showFilters, setShowFilters] = useState(false)
  const [readTimeFilter, setReadTimeFilter] = useState<ReadTimeFilter>('all')
  const [sortBy, setSortBy] = useState<SortBy>('default')

  const allTags = useMemo(() => getAllTags(articles), [articles])

  const activeFilterCount =
    (activeTags.size > 0 ? 1 : 0) +
    (readTimeFilter !== 'all' ? 1 : 0) +
    (sortBy !== 'default' ? 1 : 0)

  const filteredArticles = useMemo(() => {
    let result = articles.filter((article) => {
      // Category filter
      if (activeCategory !== 'all' && article.category !== activeCategory) return false

      // Tag filter
      if (activeTags.size > 0) {
        const hasTag = article.tags.some((tag) => activeTags.has(tag))
        if (!hasTag) return false
      }

      // Read time filter
      if (readTimeFilter !== 'all') {
        const minutes = parseReadTimeMinutes(article.readTime)
        if (readTimeFilter === 'quick' && minutes >= 5) return false
        if (readTimeFilter === 'medium' && (minutes < 5 || minutes > 8)) return false
        if (readTimeFilter === 'long' && minutes <= 8) return false
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const inTitle = article.title.toLowerCase().includes(q)
        const inExcerpt = article.excerpt.toLowerCase().includes(q)
        const inTags = article.tags.some((tag) => tag.toLowerCase().includes(q))
        const inContent = article.content.toLowerCase().includes(q)
        if (!inTitle && !inExcerpt && !inTags && !inContent) return false
      }

      return true
    })

    // Sort
    if (sortBy === 'popular') {
      result = [...result].sort((a, b) => b.helpfulCount - a.helpfulCount)
    } else if (sortBy === 'alphabetical') {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title))
    }

    return result
  }, [articles, activeCategory, activeTags, readTimeFilter, sortBy, searchQuery])

  const selectedArticle = articles.find((a) => a.id === selectedArticleId) || null

  const relatedArticles = useMemo(() => {
    if (!selectedArticle) return []
    return selectedArticle.relatedArticleIds
      .map((id) => articles.find((a) => a.id === id))
      .filter(Boolean) as Article[]
  }, [selectedArticle, articles])

  const toggleTag = (tag: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev)
      if (next.has(tag)) next.delete(tag)
      else next.add(tag)
      return next
    })
  }

  const bot247 = (
    <Bot247 articles={articles} faqItems={faqItems} onOpenArticle={(id) => setSelectedArticleId(id)} />
  )

  // Detail view
  if (selectedArticle) {
    return (
      <>
        <DetailView
          article={selectedArticle}
          faqItems={faqItems}
          checklistItems={checklistItems}
          relatedArticles={relatedArticles}
          onDownloadTemplate={onDownloadTemplate}
          onCopyTemplate={onCopyTemplate}
          onHelpful={onHelpful}
          onNotHelpful={onNotHelpful}
          onViewRelated={(id) => setSelectedArticleId(id)}
          onBack={() => setSelectedArticleId(null)}
        />
        {bot247}
      </>
    )
  }

  // Browse view
  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
      <div className="px-4 sm:px-6 lg:px-8 py-5 sm:py-7 lg:py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight mb-1">
            {t.pageTitle}
          </h1>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {t.pageSubtitle}
          </p>
        </div>

        {/* Search + Filter button */}
        <div className="flex gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-400 dark:text-stone-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-11 pr-10 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
              showFilters || activeFilterCount > 0
                ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'
                : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-100 hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:border-stone-600'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">{t.filters}</span>
            {activeFilterCount > 0 && (
              <span className="ml-1 w-5 h-5 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <div className="flex flex-wrap items-end gap-4 p-5 sm:p-6 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl mb-5">
            {/* Tags filter */}
            <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
              <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                {t.tags}
              </label>
              <div className="flex flex-wrap gap-1.5 py-1.5">
                {allTags.map((tag) => {
                  const isActive = activeTags.has(tag)
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                        isActive
                          ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                          : 'bg-stone-50 dark:bg-stone-800 text-stone-500 dark:text-stone-400 border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                      }`}
                    >
                      {tag}
                      {isActive && <X className="w-3 h-3" />}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Read Time filter */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                {t.readTimeFilter}
              </label>
              <div className="relative">
                <select
                  value={readTimeFilter}
                  onChange={(e) => setReadTimeFilter(e.target.value as ReadTimeFilter)}
                  className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                >
                  <option value="all">{t.allReadTimes}</option>
                  <option value="quick">{t.quickRead}</option>
                  <option value="medium">{t.mediumRead}</option>
                  <option value="long">{t.longRead}</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
              </div>
            </div>

            {/* Sort By filter */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                {t.sortByFilter}
              </label>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortBy)}
                  className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                >
                  <option value="default">{t.defaultSort}</option>
                  <option value="popular">{t.mostPopular}</option>
                  <option value="alphabetical">{t.alphabetical}</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
              </div>
            </div>

            {/* Clear All */}
            {activeFilterCount > 0 && (
              <button
                onClick={() => {
                  setActiveTags(new Set())
                  setReadTimeFilter('all')
                  setSortBy('default')
                }}
                className="px-3 py-2 min-h-[2.75rem] text-xs font-medium text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
              >
                {t.clearAll}
              </button>
            )}
          </div>
        )}

        {/* Active filter pills (when panel closed) */}
        {activeFilterCount > 0 && !showFilters && (
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <span className="text-xs text-stone-500 dark:text-stone-400">{t.filteredBy}</span>
            {activeTags.size > 0 && (
              <FilterPill
                label={`${t.tags}: ${Array.from(activeTags).join(', ')}`}
                onClear={() => setActiveTags(new Set())}
              />
            )}
            {readTimeFilter !== 'all' && (
              <FilterPill
                label={t[readTimeFilter === 'quick' ? 'quickRead' : readTimeFilter === 'medium' ? 'mediumRead' : 'longRead']}
                onClear={() => setReadTimeFilter('all')}
              />
            )}
            {sortBy !== 'default' && (
              <FilterPill
                label={t[sortBy === 'popular' ? 'mostPopular' : 'alphabetical']}
                onClear={() => setSortBy('default')}
              />
            )}
          </div>
        )}

        {/* Category tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 -mx-1 px-1">
          {CATEGORY_TABS.map((cat) => {
            const isActive = activeCategory === cat
            const isAll = cat === 'all'
            const config = isAll ? null : CATEGORY_CONFIG[cat]
            const count = isAll
              ? articles.length
              : articles.filter((a) => a.category === cat).length

            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900'
                    : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600'
                }`}
              >
                {!isAll && config && <config.icon className="w-3.5 h-3.5" />}
                {isAll ? t.all : t[config!.labelKey]}
                <span
                  className={`ml-0.5 text-[10px] px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-inherit'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Article grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onClick={() => setSelectedArticleId(article.id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
              <Search className="w-6 h-6 text-stone-400 dark:text-stone-500" />
            </div>
            <h3 className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-1">
              {t.noResults}
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              {t.noResultsHint}
            </p>
          </div>
        )}
      </div>
      {bot247}
    </div>
  )
}
