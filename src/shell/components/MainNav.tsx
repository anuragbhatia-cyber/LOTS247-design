import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import type { NavigationItem } from './AppShell'

interface MainNavProps {
  items: NavigationItem[]
  isCollapsed: boolean
  onNavigate?: (href: string) => void
}

export function MainNav({ items, isCollapsed, onNavigate }: MainNavProps) {
  // Track which parent items are expanded
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    // Auto-expand parents that have an active child
    const initial = new Set<string>()
    for (const item of items) {
      if (item.children?.some((child) => child.isActive)) {
        initial.add(item.href)
      }
    }
    return initial
  })

  const toggleExpand = (href: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(href)) {
        next.delete(href)
      } else {
        next.add(href)
      }
      return next
    })
  }

  return (
    <nav className="px-3">
      <ul className="space-y-1">
        {items.map((item) => {
          const hasChildren = item.children && item.children.length > 0
          const isExpanded = expanded.has(item.href)
          const hasActiveChild = item.children?.some((child) => child.isActive)
          const isParentActive = item.isActive || hasActiveChild

          return (
            <li key={item.href}>
              {/* Parent / regular item */}
              <button
                onClick={() => {
                  if (hasChildren) {
                    toggleExpand(item.href)
                    // Also navigate to the first child if not already in this section
                    if (!isExpanded && !hasActiveChild && item.children![0]) {
                      onNavigate?.(item.children![0].href)
                    }
                  } else {
                    onNavigate?.(item.href)
                  }
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 min-h-11 rounded-lg text-[13px] font-medium
                  transition-all duration-150
                  ${isCollapsed ? 'justify-center px-2' : ''}
                  ${
                    isParentActive
                      ? hasChildren
                        ? 'text-emerald-400'
                        : 'bg-emerald-950/60 text-emerald-400'
                      : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800/60'
                  }
                `}
                title={isCollapsed ? item.label : undefined}
              >
                <span
                  className={`
                    flex-shrink-0 w-5 h-5
                    ${isParentActive ? 'text-emerald-400' : ''}
                  `}
                >
                  {item.icon}
                </span>

                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>

                    {item.badge !== undefined && !hasChildren && (
                      <span
                        className={`
                          min-w-[1.25rem] h-5 px-1.5 flex items-center justify-center
                          text-xs font-semibold rounded-full
                          ${
                            isParentActive
                              ? 'bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'
                              : 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400'
                          }
                        `}
                      >
                        {item.badge}
                      </span>
                    )}

                    {hasChildren && (
                      <ChevronDown
                        className={`w-4 h-4 text-stone-500 transition-transform duration-200 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </>
                )}
              </button>

              {/* Children */}
              {hasChildren && isExpanded && !isCollapsed && (
                <ul className="mt-1.5 ml-4 pl-4 border-l border-stone-800/50 space-y-0.5">
                  {item.children!.map((child) => (
                    <li key={child.href}>
                      <button
                        onClick={() => onNavigate?.(child.href)}
                        className={`
                          w-full flex items-center gap-2.5 px-3 py-2 min-h-11 rounded-lg text-sm
                          transition-all duration-150
                          ${
                            child.isActive
                              ? 'bg-emerald-950/60 text-emerald-400 font-medium'
                              : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800 font-normal'
                          }
                        `}
                      >
                        {child.icon && (
                          <span
                            className={`flex-shrink-0 w-4 h-4 ${
                              child.isActive ? 'text-emerald-400' : ''
                            }`}
                          >
                            {child.icon}
                          </span>
                        )}
                        <span className="flex-1 text-left">{child.label}</span>

                        {child.badge !== undefined && (
                          <span
                            className={`
                              px-1.5 py-0.5 flex items-center justify-center
                              text-[10px] font-semibold rounded-full whitespace-nowrap
                              ${
                                child.isActive
                                  ? 'bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200'
                                  : 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-400'
                              }
                            `}
                          >
                            {child.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              {/* Collapsed: show tooltip flyout on hover? For now, just show parent */}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
