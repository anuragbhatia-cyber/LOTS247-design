// =============================================================================
// Data Types
// =============================================================================

export interface LastRecharge {
  amount: number
  date: string
  referenceId: string
}

export interface WalletSummary {
  currentBalance: number
  currency: string
  lowBalanceThreshold: number
  lastRecharge: LastRecharge
}

export type TransactionType = 'credit' | 'debit'

export type TransactionCategory =
  | 'recharge'
  | 'subscription'
  | 'challan'
  | 'legalFee'
  | 'refund'

export type TransactionStatus = 'success' | 'pending' | 'failed'

export type RelatedEntityType =
  | 'challan'
  | 'subscription'
  | 'incident'
  | 'dispute'

export interface Transaction {
  id: string
  type: TransactionType
  category: TransactionCategory
  amount: number
  currency: string
  description: string
  referenceId: string
  status: TransactionStatus
  date: string
  runningBalance: number
  relatedEntityId: string | null
  relatedEntityType: RelatedEntityType | null
}

// =============================================================================
// Component Props
// =============================================================================

export interface WalletProps {
  /** Current wallet state -- balance, last recharge, threshold */
  walletSummary: WalletSummary
  /** All wallet transactions in reverse chronological order */
  transactions: Transaction[]
  /** Preset amounts for the Add Money modal quick-select buttons */
  quickAmounts: number[]
  /** Called when user initiates a recharge with the chosen amount */
  onAddMoney?: (amount: number) => void
  /** Called when user taps a transaction row to view details */
  onViewTransaction?: (id: string) => void
  /** Called when user taps a related entity link inside transaction detail */
  onNavigateToEntity?: (entityType: RelatedEntityType, entityId: string) => void
  /** Called when user applies filters to the transaction list */
  onFilterChange?: (filters: TransactionFilters) => void
  /** Called when user types in the search bar */
  onSearch?: (query: string) => void
}

export interface TransactionFilters {
  dateRange?: 'today' | 'thisWeek' | 'thisMonth' | 'custom'
  customDateStart?: string
  customDateEnd?: string
  type?: TransactionType | 'all'
  category?: TransactionCategory | 'all'
}
