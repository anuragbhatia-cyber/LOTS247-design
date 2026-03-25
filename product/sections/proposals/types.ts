// =============================================================================
// Data Types
// =============================================================================

export type ProposalType = 'Challan' | 'DL' | 'RC'

export type ProposalStatus = 'sent' | 'converted' | 'rejected'

export interface Proposal {
  id: string
  displayId: string
  type: ProposalType
  description: string
  quantity: number
  amount: number
  status: ProposalStatus
  linkedIncidentId: string | null
  createdAt: string
  updatedAt: string
}

export type ProposalActivityType = 'statusChange' | 'note'

export interface ProposalActivity {
  id: string
  proposalId: string
  actionType: ProposalActivityType
  performedBy: string
  notes: string
  timestamp: string
}

export interface Comment {
  id: string
  entityType: 'proposal'
  entityId: string
  authorType: 'user' | 'team'
  authorName: string
  message: string
  createdAt: string
}

// =============================================================================
// Component Props
// =============================================================================

export interface ProposalListProps {
  /** The list of proposals to display */
  proposals: Proposal[]
  /** Called when user wants to view a proposal's details */
  onView?: (id: string) => void
  /** Called when user wants to follow up on a proposal */
  onFollowUp?: (id: string) => void
  /** Called when user wants to cancel an active proposal */
  onCancel?: (id: string) => void
}

export interface ProposalDetailProps {
  /** The proposal to display */
  proposal: Proposal
  /** Timeline of activities for this proposal */
  activities: ProposalActivity[]
  /** Comments / follow-up thread for this proposal */
  comments: Comment[]
  /** Called when user posts a follow-up message */
  onAddComment?: (message: string) => void
  /** Called when user wants to cancel the proposal */
  onCancel?: () => void
  /** Called when user navigates back to the list */
  onBack?: () => void
}
