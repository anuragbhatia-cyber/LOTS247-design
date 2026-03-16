import { useState, useRef, useEffect } from 'react'
import { LogOut, ChevronUp } from 'lucide-react'

interface UserMenuProps {
  user: {
    name: string
    avatarUrl?: string
    plan?: 'Basic' | 'Fleet' | 'Enterprise'
  }
  isCollapsed: boolean
  onLogout?: () => void
}

export function UserMenu({ user, isCollapsed, onLogout }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Get initials for avatar fallback
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  const planColors = {
    Basic: 'bg-stone-700 text-stone-300',
    Fleet: 'bg-emerald-900/60 text-emerald-400',
    Enterprise: 'bg-amber-900/50 text-amber-400',
  }

  return (
    <div ref={menuRef} className="relative border-t border-stone-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center gap-3 p-3
          hover:bg-stone-800 transition-colors
          ${isCollapsed ? 'justify-center' : ''}
        `}
      >
        {/* Avatar */}
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-emerald-900/60 flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-emerald-400">
              {initials}
            </span>
          </div>
        )}

        {!isCollapsed && (
          <>
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-medium text-stone-100 truncate">
                {user.name}
              </p>
              {user.plan && (
                <span
                  className={`
                    inline-flex items-center px-1.5 py-0.5 text-[10px] font-semibold rounded
                    ${planColors[user.plan]}
                  `}
                >
                  {user.plan}
                </span>
              )}
            </div>

            <ChevronUp
              className={`
                w-4 h-4 text-stone-500 transition-transform
                ${isOpen ? '' : 'rotate-180'}
              `}
            />
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className={`
            absolute bottom-full mb-1 bg-stone-900
            border border-stone-700 rounded-lg shadow-lg
            overflow-hidden z-50
            ${isCollapsed ? 'left-full ml-2 bottom-0 mb-0' : 'left-2 right-2'}
          `}
        >
          {isCollapsed && (
            <div className="px-3 py-2 border-b border-stone-800">
              <p className="text-sm font-medium text-stone-100">
                {user.name}
              </p>
              {user.plan && (
                <span
                  className={`
                    inline-flex items-center px-1.5 py-0.5 mt-1 text-[10px] font-semibold rounded
                    ${planColors[user.plan]}
                  `}
                >
                  {user.plan}
                </span>
              )}
            </div>
          )}

          <button
            onClick={() => {
              setIsOpen(false)
              onLogout?.()
            }}
            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-stone-400 hover:text-red-400 hover:bg-stone-800 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign out</span>
          </button>
        </div>
      )}
    </div>
  )
}
