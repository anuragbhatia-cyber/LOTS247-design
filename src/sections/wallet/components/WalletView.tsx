import { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  Wallet,
  Plus,
  Search,
  X,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  ChevronLeft,
  CreditCard,
  Receipt,
  Scale,
  RefreshCw,
  RotateCcw,
  SlidersHorizontal,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  Banknote,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  ChevronDown,
  Calendar,
} from 'lucide-react'
import type {
  WalletProps,
  Transaction,
  TransactionType,
  TransactionCategory,
  TransactionStatus,
  TransactionFilters,
  RelatedEntityType,
} from '@/../product/sections/wallet/types'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(iso: string): string {
  const d = new Date(iso)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

function formatDateTime(iso: string): string {
  const d = new Date(iso)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const hours = d.getHours().toString().padStart(2, '0')
  const mins = d.getMinutes().toString().padStart(2, '0')
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}, ${hours}:${mins}`
}

function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

function getRelativeDate(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - d.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return formatDate(iso)
}

function formatTime(iso: string): string {
  const d = new Date(iso)
  const hours = d.getHours()
  const mins = d.getMinutes().toString().padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const h = hours % 12 || 12
  return `${h}:${mins} ${ampm}`
}

// ---------------------------------------------------------------------------
// Category config
// ---------------------------------------------------------------------------

const CATEGORY_CONFIG: Record<TransactionCategory, { label: string; icon: typeof CreditCard; color: string; bg: string; iconBg: string }> = {
  recharge: {
    label: 'Recharge',
    icon: Banknote,
    color: 'text-emerald-700 dark:text-emerald-300',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/50',
  },
  subscription: {
    label: 'Subscription',
    icon: CreditCard,
    color: 'text-blue-700 dark:text-blue-300',
    bg: 'bg-blue-50 dark:bg-blue-950/40',
    iconBg: 'bg-blue-100 dark:bg-blue-900/50',
  },
  challan: {
    label: 'Challan',
    icon: Receipt,
    color: 'text-amber-700 dark:text-amber-300',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    iconBg: 'bg-amber-100 dark:bg-amber-900/50',
  },
  legalFee: {
    label: 'Legal Fee',
    icon: Scale,
    color: 'text-purple-700 dark:text-purple-300',
    bg: 'bg-purple-50 dark:bg-purple-950/40',
    iconBg: 'bg-purple-100 dark:bg-purple-900/50',
  },
  refund: {
    label: 'Refund',
    icon: RotateCcw,
    color: 'text-teal-700 dark:text-teal-300',
    bg: 'bg-teal-50 dark:bg-teal-950/40',
    iconBg: 'bg-teal-100 dark:bg-teal-900/50',
  },
}

const STATUS_CONFIG: Record<TransactionStatus, { label: string; icon: typeof CheckCircle2; color: string; bg: string }> = {
  success: {
    label: 'Success',
    icon: CheckCircle2,
    color: 'text-emerald-700 dark:text-emerald-300',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
  },
  pending: {
    label: 'Pending',
    icon: Clock,
    color: 'text-amber-700 dark:text-amber-300',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
  },
  failed: {
    label: 'Failed',
    icon: XCircle,
    color: 'text-red-700 dark:text-red-300',
    bg: 'bg-red-50 dark:bg-red-950/40',
  },
}

const DATE_RANGE_OPTIONS: { id: TransactionFilters['dateRange']; label: string }[] = [
  { id: 'today', label: 'Today' },
  { id: 'thisWeek', label: 'This Week' },
  { id: 'thisMonth', label: 'This Month' },
]

const TYPE_OPTIONS: { id: TransactionType | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'credit', label: 'Credit' },
  { id: 'debit', label: 'Debit' },
]

const CATEGORY_OPTIONS: { id: TransactionCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'recharge', label: 'Recharge' },
  { id: 'subscription', label: 'Subscription' },
  { id: 'challan', label: 'Challan' },
  { id: 'legalFee', label: 'Legal Fee' },
  { id: 'refund', label: 'Refund' },
]

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CategoryBadge({ category }: { category: TransactionCategory }) {
  const config = CATEGORY_CONFIG[category]
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.color}`}>
      {config.label}
    </span>
  )
}

function StatusBadge({ status }: { status: TransactionStatus }) {
  const config = STATUS_CONFIG[status]
  const Icon = config.icon
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${config.bg} ${config.color}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  )
}

// ---------------------------------------------------------------------------
// Add Money Modal
// ---------------------------------------------------------------------------

function AddMoneyModal({
  quickAmounts,
  onAddMoney,
  onClose,
}: {
  quickAmounts: number[]
  onAddMoney?: (amount: number) => void
  onClose: () => void
}) {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [error, setError] = useState('')

  const effectiveAmount = selectedAmount ?? (customAmount ? parseInt(customAmount, 10) : 0)

  function handleCustomChange(value: string) {
    const num = value.replace(/[^0-9]/g, '')
    setCustomAmount(num)
    setSelectedAmount(null)
    setError('')
  }

  function handleQuickSelect(amount: number) {
    setSelectedAmount(amount)
    setCustomAmount('')
    setError('')
  }

  function handleProceed() {
    if (!effectiveAmount || effectiveAmount < 100) {
      setError('Minimum amount is ₹100')
      return
    }
    if (effectiveAmount > 100000) {
      setError('Maximum amount is ₹1,00,000')
      return
    }
    onAddMoney?.(effectiveAmount)
    onClose()
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl shadow-2xl dark:shadow-stone-950/50 overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-5 sm:p-6 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50 tracking-tight">Add Money</h3>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">Top up your LOTS247 wallet</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4">
          {/* Amount input */}
          <div>
            <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5">
              Enter Amount
            </label>
            <div className="flex items-center gap-1.5 border border-stone-200 dark:border-stone-700 rounded-lg bg-white dark:bg-stone-900 focus-within:ring-2 focus-within:ring-emerald-500/30 focus-within:border-emerald-400 dark:focus-within:border-emerald-600 transition-colors px-3 py-2.5">
              <span className="text-base font-semibold text-stone-400 dark:text-stone-500 select-none">₹</span>
              <input
                type="text"
                inputMode="numeric"
                value={selectedAmount ? selectedAmount.toLocaleString('en-IN') : customAmount ? parseInt(customAmount).toLocaleString('en-IN') : ''}
                onChange={(e) => handleCustomChange(e.target.value.replace(/,/g, ''))}
                placeholder="0"
                className="flex-1 text-lg font-bold bg-transparent text-stone-900 dark:text-stone-100 placeholder:text-stone-300 dark:placeholder:text-stone-600 focus:outline-none"
              />
            </div>
            {error && (
              <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                {error}
              </p>
            )}
          </div>

          {/* Quick amounts */}
          <div>
            <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1.5">
              Quick Select
            </label>
            <div className="grid grid-cols-2 gap-2">
              {quickAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleQuickSelect(amount)}
                  className={`py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    selectedAmount === amount
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
                  }`}
                >
                  ₹{amount.toLocaleString('en-IN')}
                </button>
              ))}
            </div>
          </div>

          {/* Proceed button */}
          <button
            onClick={handleProceed}
            disabled={!effectiveAmount}
            className="w-full px-4 py-2.5 min-h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-200 dark:disabled:bg-stone-800 disabled:text-stone-400 dark:disabled:text-stone-500 text-white font-semibold text-sm transition-colors disabled:cursor-not-allowed"
          >
            {effectiveAmount
              ? `Pay ${formatCurrency(effectiveAmount)} via Razorpay`
              : 'Enter an amount to proceed'}
          </button>

          <p className="text-center text-xs text-stone-400 dark:text-stone-500">
            Secured by Razorpay &middot; UPI, Cards, Net Banking accepted
          </p>
        </div>
      </div>
    </div>,
    document.body
  )
}

// ---------------------------------------------------------------------------
// Transaction Detail Modal
// ---------------------------------------------------------------------------

function TransactionDetail({
  transaction,
  onClose,
  onNavigateToEntity,
}: {
  transaction: Transaction
  onClose: () => void
  onNavigateToEntity?: (entityType: RelatedEntityType, entityId: string) => void
}) {
  const catConfig = CATEGORY_CONFIG[transaction.category]
  const CatIcon = catConfig.icon
  const isCredit = transaction.type === 'credit'

  useEffect(() => {
    window.parent.postMessage({ type: 'showOverlay' }, '*')
    return () => { window.parent.postMessage({ type: 'hideOverlay' }, '*') }
  }, [])

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/50 dark:bg-black/70" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-2xl shadow-2xl dark:shadow-stone-950/50 overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-5 sm:p-6 border-b border-stone-200 dark:border-stone-800">
          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50 tracking-tight">Transaction Details</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5">
          {/* Amount hero */}
          <div className="text-center py-2">
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-3 ${catConfig.iconBg}`}>
              <CatIcon className={`w-5 h-5 ${catConfig.color}`} />
            </div>
            <p className={`text-3xl font-bold tabular-nums tracking-tight ${isCredit ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-900 dark:text-stone-50'}`}>
              {isCredit ? '+' : '−'}{formatCurrency(transaction.amount)}
            </p>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">{transaction.description}</p>
          </div>

          {/* Details */}
          <div className="rounded-xl border border-stone-200 dark:border-stone-800 divide-y divide-stone-200 dark:divide-stone-800">
            <DetailRow label="Date & Time" value={formatDateTime(transaction.date)} />
            <DetailRow label="Category">
              <CategoryBadge category={transaction.category} />
            </DetailRow>
            <DetailRow label="Type" value={isCredit ? 'Credit' : 'Debit'} />
            <DetailRow label="Reference ID">
              <span className="font-mono text-xs text-stone-700 dark:text-stone-300 bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded">
                {transaction.referenceId}
              </span>
            </DetailRow>
            <DetailRow label="Status">
              <StatusBadge status={transaction.status} />
            </DetailRow>
            <DetailRow label="Balance After" value={formatCurrency(transaction.runningBalance)} />
          </div>

          {/* Related entity link */}
          {transaction.relatedEntityId && transaction.relatedEntityType && (
            <button
              onClick={() => onNavigateToEntity?.(transaction.relatedEntityType!, transaction.relatedEntityId!)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <ExternalLink className="w-4 h-4 text-stone-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors" />
                <span className="text-sm font-medium text-stone-700 dark:text-stone-300 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  View related {transaction.relatedEntityType}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400" />
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

function DetailRow({ label, value, children }: { label: string; value?: string; children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <span className="text-xs font-medium text-stone-500 dark:text-stone-400">{label}</span>
      {children || <span className="text-sm font-semibold text-stone-900 dark:text-stone-50">{value}</span>}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Empty State
// ---------------------------------------------------------------------------

function EmptyState({ onAddMoney }: { onAddMoney?: () => void }) {
  return (
    <div className="py-16 text-center">
      <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto mb-3">
        <Wallet className="w-5 h-5 text-stone-400 dark:text-stone-500" />
      </div>
      <p className="text-sm font-medium text-stone-600 dark:text-stone-300">Your wallet is empty</p>
      <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">Add money to get started with LOTS247 services</p>
      <button
        onClick={onAddMoney}
        className="inline-flex items-center gap-2 px-4 py-2.5 min-h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors mt-5"
      >
        <Plus className="w-4 h-4" />
        Add Money
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function WalletView({
  walletSummary,
  transactions,
  quickAmounts,
  onAddMoney,
  onViewTransaction,
  onNavigateToEntity,
  onFilterChange,
  onSearch,
}: WalletProps) {
  const [showAddMoney, setShowAddMoney] = useState(false)
  const [selectedTxnId, setSelectedTxnId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<TransactionFilters>({
    dateRange: undefined,
    type: 'all',
    category: 'all',
  })

  const isLowBalance = walletSummary.currentBalance <= walletSummary.lowBalanceThreshold

  // Filter & search
  const filteredTransactions = useMemo(() => {
    let result = [...transactions]

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.referenceId.toLowerCase().includes(q)
      )
    }

    if (filters.type && filters.type !== 'all') {
      result = result.filter((t) => t.type === filters.type)
    }

    if (filters.category && filters.category !== 'all') {
      result = result.filter((t) => t.category === filters.category)
    }

    if (filters.dateRange) {
      const now = new Date()
      let start: Date
      switch (filters.dateRange) {
        case 'today':
          start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
          break
        case 'thisWeek':
          start = new Date(now)
          start.setDate(now.getDate() - now.getDay())
          start.setHours(0, 0, 0, 0)
          break
        case 'thisMonth':
          start = new Date(now.getFullYear(), now.getMonth(), 1)
          break
        default:
          start = new Date(0)
      }
      result = result.filter((t) => new Date(t.date) >= start)
    }

    return result
  }, [transactions, searchQuery, filters])

  const ITEMS_PER_PAGE = 8
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE)
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  // Group by date (for mobile, based on paginated results)
  const groupedTransactions = useMemo(() => {
    const groups: { date: string; label: string; transactions: Transaction[] }[] = []
    const dateMap = new Map<string, Transaction[]>()

    for (const txn of paginatedTransactions) {
      const dateKey = new Date(txn.date).toDateString()
      if (!dateMap.has(dateKey)) dateMap.set(dateKey, [])
      dateMap.get(dateKey)!.push(txn)
    }

    for (const [dateKey, txns] of dateMap) {
      groups.push({ date: dateKey, label: getRelativeDate(txns[0].date), transactions: txns })
    }

    return groups
  }, [paginatedTransactions])

  const selectedTransaction = selectedTxnId ? transactions.find((t) => t.id === selectedTxnId) ?? null : null

  const activeFilterCount =
    (filters.dateRange ? 1 : 0) +
    (filters.type && filters.type !== 'all' ? 1 : 0) +
    (filters.category && filters.category !== 'all' ? 1 : 0)

  function updateFilter(update: Partial<TransactionFilters>) {
    const next = { ...filters, ...update }
    setFilters(next)
    onFilterChange?.(next)
    setCurrentPage(1)
  }

  function clearFilters() {
    const cleared: TransactionFilters = { dateRange: undefined, type: 'all', category: 'all' }
    setFilters(cleared)
    onFilterChange?.(cleared)
  }

  // Stats
  const totalCredits = transactions.filter((t) => t.type === 'credit' && t.status === 'success').reduce((s, t) => s + t.amount, 0)
  const totalDebits = transactions.filter((t) => t.type === 'debit' && t.status === 'success').reduce((s, t) => s + t.amount, 0)

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* ----------------------------------------------------------------- */}
        {/* Page Header                                                       */}
        {/* ----------------------------------------------------------------- */}
        <div className="pt-5 sm:pt-7 pb-5 sm:pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">Wallet</h1>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">Manage your balance and transaction history</p>
            </div>
            <div className="flex items-center gap-3 self-start sm:self-auto">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                <select
                  value={filters.dateRange ?? 'all'}
                  onChange={(e) => updateFilter({ dateRange: e.target.value === 'all' ? undefined : e.target.value as TransactionFilters['dateRange'] })}
                  className="appearance-none pl-9 pr-8 py-2.5 min-h-11 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm font-medium text-stone-700 dark:text-stone-300 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
                >
                  <option value="all">All Time</option>
                  {DATE_RANGE_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
              </div>
              <button
                onClick={() => {
                  setShowAddMoney(true)
                  window.parent.postMessage({ type: 'showOverlay' }, '*')
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 min-h-11 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Money
              </button>
            </div>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Stats Cards                                                       */}
        {/* ----------------------------------------------------------------- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
          {/* Balance */}
          <div className={`col-span-2 rounded-xl bg-white dark:bg-stone-900 shadow-sm dark:shadow-stone-950/20 p-5 sm:p-6`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-widest">Current Balance</p>
                <p className={`text-2xl sm:text-3xl font-bold tabular-nums tracking-tight mt-1 ${
                  isLowBalance ? 'text-amber-600 dark:text-amber-400' : 'text-stone-900 dark:text-stone-50'
                }`}>
                  {formatCurrency(walletSummary.currentBalance)}
                </p>
                {isLowBalance && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-xs font-medium text-amber-600 dark:text-amber-400">Low balance</span>
                  </div>
                )}
              </div>
              <div className="p-2 sm:p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40">
                <Wallet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-stone-200 dark:border-stone-800">
              <RefreshCw className="w-3.5 h-3.5 text-stone-400" />
              <span className="text-xs text-stone-500 dark:text-stone-400">
                Last recharge {formatCurrency(walletSummary.lastRecharge.amount)} on {formatDate(walletSummary.lastRecharge.date)}
              </span>
            </div>
          </div>

          {/* Total In */}
          <div className="rounded-xl bg-white dark:bg-stone-900 shadow-sm dark:shadow-stone-950/20 p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-widest">Total In</p>
                <p className="text-2xl sm:text-3xl font-bold tabular-nums tracking-tight mt-1 text-stone-900 dark:text-stone-50">
                  {formatCurrency(totalCredits)}
                </p>
              </div>
              <div className="p-2 sm:p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40">
                <TrendingDown className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
            </div>
            <p className="text-xs text-stone-400 dark:text-stone-500 mt-3 pt-3 border-t border-stone-200 dark:border-stone-800">
              {transactions.filter((t) => t.type === 'credit' && t.status === 'success').length} credit transactions
            </p>
          </div>

          {/* Total Out */}
          <div className="rounded-xl bg-white dark:bg-stone-900 shadow-sm dark:shadow-stone-950/20 p-5 sm:p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-widest">Total Out</p>
                <p className="text-2xl sm:text-3xl font-bold tabular-nums tracking-tight mt-1 text-stone-900 dark:text-stone-50">
                  {formatCurrency(totalDebits)}
                </p>
              </div>
              <div className="p-2 sm:p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40">
                <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <p className="text-xs text-stone-400 dark:text-stone-500 mt-3 pt-3 border-t border-stone-200 dark:border-stone-800">
              {transactions.filter((t) => t.type === 'debit' && t.status === 'success').length} debit transactions
            </p>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* Search & Filter Bar (standalone, outside table card)              */}
        {/* ----------------------------------------------------------------- */}
        <div className="flex items-center gap-3 mb-4">
          {/* Search — takes remaining width */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                onSearch?.(e.target.value)
                setCurrentPage(1)
              }}
              placeholder="Search by description or reference ID..."
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(''); onSearch?.('') }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Filters button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-colors shrink-0 ${
              showFilters || activeFilterCount > 0
                ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'
                : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-100 hover:border-stone-300 dark:hover:bg-stone-800 dark:hover:border-stone-600'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="ml-1 w-5 h-5 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter dropdown panel */}
        {showFilters && (
          <div className="flex flex-wrap items-end gap-4 p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl mb-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                Date Range
              </label>
              <div className="relative">
                <select
                  value={filters.dateRange ?? 'all'}
                  onChange={(e) => updateFilter({ dateRange: e.target.value === 'all' ? undefined : e.target.value as TransactionFilters['dateRange'] })}
                  className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                >
                  <option value="all">All Time</option>
                  {DATE_RANGE_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                Type
              </label>
              <div className="relative">
                <select
                  value={filters.type ?? 'all'}
                  onChange={(e) => updateFilter({ type: e.target.value as TransactionType | 'all' })}
                  className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                >
                  {TYPE_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                Category
              </label>
              <div className="relative">
                <select
                  value={filters.category ?? 'all'}
                  onChange={(e) => updateFilter({ category: e.target.value as TransactionCategory | 'all' })}
                  className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600"
                >
                  {CATEGORY_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400 pointer-events-none" />
              </div>
            </div>

            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 text-xs font-medium text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        )}

        {/* ----------------------------------------------------------------- */}
        {/* Transaction History Card                                          */}
        {/* ----------------------------------------------------------------- */}
        <div className="rounded-xl bg-white dark:bg-stone-900 shadow-sm dark:shadow-stone-950/20 mb-6">
          {/* Card header */}
          <div className="px-5 py-3.5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-50">Transaction History</h2>
            <span className="text-xs text-stone-400 dark:text-stone-500">{filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}</span>
          </div>

          {/* Transaction list */}
          {filteredTransactions.length === 0 ? (
            transactions.length === 0 ? (
              <EmptyState onAddMoney={() => {
                setShowAddMoney(true)
                window.parent.postMessage({ type: 'showOverlay' }, '*')
              }} />
            ) : (
              <div className="py-16 text-center">
                <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto mb-3">
                  <Search className="w-5 h-5 text-stone-400 dark:text-stone-500" />
                </div>
                <p className="text-sm font-medium text-stone-600 dark:text-stone-300">No matching transactions</p>
                <p className="text-xs text-stone-400 dark:text-stone-500 mt-1">Try adjusting your search or filters</p>
                <button
                  onClick={() => { clearFilters(); setSearchQuery(''); onSearch?.('') }}
                  className="mt-4 text-xs text-emerald-600 dark:text-emerald-400 hover:underline font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-hidden">
                <table className="w-full table-fixed">
                  <colgroup>
                    <col className="w-[35%]" />
                    <col className="w-[20%]" />
                    <col className="w-[15%]" />
                    <col className="w-[15%]" />
                    <col className="w-[15%]" />
                  </colgroup>
                  <thead>
                    <tr className="bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800">
                      <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3">
                        Transaction
                      </th>
                      <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3">
                        Date
                      </th>
                      <th className="text-left text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3">
                        Category
                      </th>
                      <th className="text-right text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3">
                        Amount
                      </th>
                      <th className="text-right text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider px-5 py-3">
                        Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 dark:divide-stone-800/60">
                    {paginatedTransactions.map((txn) => {
                      const catConfig = CATEGORY_CONFIG[txn.category]
                      const CatIcon = catConfig.icon
                      const isCredit = txn.type === 'credit'

                      return (
                        <tr
                          key={txn.id}
                          onClick={() => { setSelectedTxnId(txn.id); onViewTransaction?.(txn.id) }}
                          className="group cursor-pointer hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
                        >
                          {/* Transaction */}
                          <td className="px-5 py-3.5">
                            <p className="text-sm font-medium text-stone-900 dark:text-stone-50 font-mono">
                              {txn.referenceId}
                            </p>
                          </td>

                          {/* Date */}
                          <td className="px-5 py-3.5">
                            <p className="text-sm text-stone-700 dark:text-stone-300">
                              {formatDate(txn.date)}
                            </p>
                            <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                              {formatTime(txn.date)}
                            </p>
                          </td>

                          {/* Category */}
                          <td className="px-5 py-3.5">
                            <CategoryBadge category={txn.category} />
                          </td>

                          {/* Amount */}
                          <td className="px-5 py-3.5 text-right">
                            <p className={`text-sm font-semibold tabular-nums ${
                              txn.status === 'failed'
                                ? 'text-stone-400 dark:text-stone-500 line-through'
                                : isCredit
                                  ? 'text-emerald-600 dark:text-emerald-400'
                                  : 'text-stone-900 dark:text-stone-50'
                            }`}>
                              {isCredit ? '+' : '−'}{formatCurrency(txn.amount)}
                            </p>
                            {txn.status === 'failed' && (
                              <span className="inline-flex items-center gap-1 text-xs text-red-600 dark:text-red-400 font-medium mt-0.5">
                                <XCircle className="w-3 h-3" /> Failed
                              </span>
                            )}
                          </td>

                          {/* Balance */}
                          <td className="px-5 py-3.5 text-right">
                            <p className="text-sm text-stone-600 dark:text-stone-300 tabular-nums">
                              {formatCurrency(txn.runningBalance)}
                            </p>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden divide-y divide-stone-200 dark:divide-stone-800/60">
                {groupedTransactions.map((group) => (
                  <div key={group.date}>
                    <div className="px-5 py-2.5 bg-stone-50 dark:bg-stone-800/30">
                      <span className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                        {group.label}
                      </span>
                    </div>
                    <div className="divide-y divide-stone-200 dark:divide-stone-800/60">
                      {group.transactions.map((txn) => {
                        const isCredit = txn.type === 'credit'

                        return (
                          <button
                            key={txn.id}
                            onClick={() => { setSelectedTxnId(txn.id); onViewTransaction?.(txn.id) }}
                            className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors text-left"
                          >
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-semibold text-stone-900 dark:text-stone-50 truncate">
                                {txn.description}
                              </p>
                              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                                {formatTime(txn.date)}
                                {txn.status === 'failed' && (
                                  <span className="ml-2 inline-flex items-center gap-1 text-red-600 dark:text-red-400 font-medium">
                                    <XCircle className="w-3 h-3" /> Failed
                                  </span>
                                )}
                              </p>
                            </div>
                            <div className="flex-shrink-0 text-right">
                              <p className={`text-sm font-semibold tabular-nums ${
                                txn.status === 'failed'
                                  ? 'text-stone-400 dark:text-stone-500 line-through'
                                  : isCredit
                                    ? 'text-emerald-600 dark:text-emerald-400'
                                    : 'text-stone-900 dark:text-stone-50'
                              }`}>
                                {isCredit ? '+' : '−'}{formatCurrency(txn.amount)}
                              </p>
                              <p className="text-[11px] text-stone-400 dark:text-stone-500 tabular-nums mt-0.5">
                                Bal {formatCurrency(txn.runningBalance)}
                              </p>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-5 py-3.5 border-t border-stone-200 dark:border-stone-800">
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredTransactions.length)} of {filteredTransactions.length}
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-2 rounded-xl text-stone-500 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-800 hover:text-stone-700 dark:hover:text-stone-200 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`min-w-[32px] h-8 rounded-xl text-xs font-medium transition-colors ${
                          page === currentPage
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'text-stone-600 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-800'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-2 rounded-xl text-stone-500 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-800 hover:text-stone-700 dark:hover:text-stone-200 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      {showAddMoney && (
        <AddMoneyModal
          quickAmounts={quickAmounts}
          onAddMoney={onAddMoney}
          onClose={() => {
            setShowAddMoney(false)
            window.parent.postMessage({ type: 'hideOverlay' }, '*')
          }}
        />
      )}

      {selectedTransaction && (
        <TransactionDetail
          transaction={selectedTransaction}
          onClose={() => setSelectedTxnId(null)}
          onNavigateToEntity={onNavigateToEntity}
        />
      )}
    </div>
  )
}
