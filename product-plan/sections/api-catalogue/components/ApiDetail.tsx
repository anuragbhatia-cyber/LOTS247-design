import { useState } from 'react'
import { ArrowLeft, ShieldCheck, IdCard, Truck, ExternalLink, Wallet, Upload, Key, FileText, BookOpen, ArrowDownLeft, ArrowUpRight, Copy, Check, Search, Download, Eye, EyeOff, RotateCcw, type LucideIcon } from 'lucide-react'
import type { ApiDetailProps } from '../types'
import { ContactModal } from './ContactModal'

const ICON_MAP: Record<string, LucideIcon> = {
  'shield-check': ShieldCheck,
  'id-card': IdCard,
  'truck': Truck,
}

const CATEGORY_STYLES: Record<string, string> = {
  Compliance: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
  Identity: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
  'Vehicle Data': 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
}

const METHOD_STYLES: Record<string, string> = {
  GET: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
  POST: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
  PUT: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400',
  DELETE: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400',
}

// ─── Sample Data ───────────────────────────────────────────────────────────────

const WALLET_BALANCE = 1753

const WALLET_TRANSACTIONS = [
  { id: 1, date: '2026-04-20', description: 'Credit Top-up', type: 'credit' as const, amount: 500, balance: 1753, method: 'UPI' },
  { id: 2, date: '2026-04-17', description: 'API Usage — Bulk Lookup', type: 'debit' as const, amount: 147, balance: 1253, method: null },
  { id: 3, date: '2026-04-12', description: 'Credit Top-up', type: 'credit' as const, amount: 1000, balance: 1400, method: 'Net Banking' },
  { id: 4, date: '2026-04-07', description: 'API Usage — Single Lookup', type: 'debit' as const, amount: 320, balance: 400, method: null },
  { id: 5, date: '2026-04-02', description: 'Credit Top-up', type: 'credit' as const, amount: 500, balance: 720, method: 'UPI' },
  { id: 6, date: '2026-03-28', description: 'API Usage — Detailed Info', type: 'debit' as const, amount: 280, balance: 220, method: null },
  { id: 7, date: '2026-03-20', description: 'Welcome Bonus Credits', type: 'credit' as const, amount: 500, balance: 500, method: 'Promo' },
]

const BULK_REQUESTS = [
  { id: 1, requestedAt: '2026-04-20 14:32', batchNumber: 'BLK-20260420-001', requestedBy: 'Anurag B.', status: 'Completed' as const, notes: '150 vehicles processed, 3 not found' },
  { id: 2, requestedAt: '2026-04-18 09:15', batchNumber: 'BLK-20260418-002', requestedBy: 'Rahul S.', status: 'Processing' as const, notes: 'Expected completion in 10 mins' },
  { id: 3, requestedAt: '2026-04-15 16:45', batchNumber: 'BLK-20260415-003', requestedBy: 'Anurag B.', status: 'Completed' as const, notes: '80 vehicles processed successfully' },
  { id: 4, requestedAt: '2026-04-12 11:20', batchNumber: 'BLK-20260412-004', requestedBy: 'Priya M.', status: 'Failed' as const, notes: 'Invalid file format — re-upload required' },
  { id: 5, requestedAt: '2026-04-10 08:00', batchNumber: 'BLK-20260410-005', requestedBy: 'Rahul S.', status: 'Completed' as const, notes: '200 vehicles processed, 12 not found' },
  { id: 6, requestedAt: '2026-04-05 13:55', batchNumber: 'BLK-20260405-006', requestedBy: 'Anurag B.', status: 'Completed' as const, notes: '50 vehicles processed successfully' },
]

const API_TOKENS = [
  { id: 1, name: 'Production Token', token: 'sk-prod-xxxx-xxxx-xxxx-1a2b', created: '2026-03-01', lastUsed: '2026-04-23 12:34', status: 'Active' as const },
  { id: 2, name: 'Staging Token', token: 'sk-stg-xxxx-xxxx-xxxx-3c4d', created: '2026-02-15', lastUsed: '2026-04-20 09:12', status: 'Active' as const },
  { id: 3, name: 'Old Dev Token', token: 'sk-dev-xxxx-xxxx-xxxx-5e6f', created: '2025-12-10', lastUsed: '2026-01-15 16:00', status: 'Revoked' as const },
]

const TOKEN_ACTIVITY = [
  { id: 1, timestamp: '2026-04-23 12:34:02', token: 'sk-prod-****-1a2b', action: 'API Call', ip: '103.21.244.12', status: 'Success' as const },
  { id: 2, timestamp: '2026-04-23 12:33:58', token: 'sk-prod-****-1a2b', action: 'API Call', ip: '103.21.244.12', status: 'Success' as const },
  { id: 3, timestamp: '2026-04-22 18:15:44', token: 'sk-stg-****-3c4d', action: 'API Call', ip: '192.168.1.10', status: 'Success' as const },
  { id: 4, timestamp: '2026-04-22 14:02:11', token: 'sk-prod-****-1a2b', action: 'API Call', ip: '45.33.32.156', status: 'Rate Limited' as const },
  { id: 5, timestamp: '2026-04-21 09:30:00', token: 'sk-dev-****-5e6f', action: 'Token Revoked', ip: '—', status: 'Revoked' as const },
]

const LOGS_DATA = [
  { id: 1, timestamp: '2026-04-23 12:34:02', endpoint: '/v1/challans/DL01AB1234', method: 'GET', status: 200, latency: '142ms' },
  { id: 2, timestamp: '2026-04-23 12:33:58', endpoint: '/v1/challans/bulk-lookup', method: 'POST', status: 200, latency: '890ms' },
  { id: 3, timestamp: '2026-04-23 12:30:11', endpoint: '/v1/challans/MH02CD5678/pending', method: 'GET', status: 200, latency: '98ms' },
  { id: 4, timestamp: '2026-04-23 12:28:44', endpoint: '/v1/challans/KA03EF9012', method: 'GET', status: 404, latency: '67ms' },
  { id: 5, timestamp: '2026-04-23 12:25:30', endpoint: '/v1/challans/webhooks', method: 'POST', status: 201, latency: '215ms' },
  { id: 6, timestamp: '2026-04-23 12:20:15', endpoint: '/v1/challans/TN04GH3456', method: 'GET', status: 200, latency: '156ms' },
  { id: 7, timestamp: '2026-04-23 12:18:02', endpoint: '/v1/challans/RJ05IJ7890', method: 'GET', status: 500, latency: '3200ms' },
  { id: 8, timestamp: '2026-04-23 12:15:48', endpoint: '/v1/challans/UP06KL1234/details', method: 'GET', status: 200, latency: '178ms' },
]

const DOC_PARAMS = [
  { name: 'vehicle_number', type: 'string', required: true, description: 'Vehicle registration number (e.g. DL01AB1234)' },
  { name: 'state', type: 'string', required: false, description: 'Filter by state code (e.g. DL, MH, KA)' },
  { name: 'status', type: 'string', required: false, description: 'Filter by challan status: pending, paid, disposed' },
  { name: 'from_date', type: 'string', required: false, description: 'Start date for range filter (YYYY-MM-DD)' },
  { name: 'to_date', type: 'string', required: false, description: 'End date for range filter (YYYY-MM-DD)' },
]

const DOC_SAMPLE_REQUEST = `curl -X GET "https://api.lots247.com/v1/challans/DL01AB1234" \\
  -H "Authorization: Bearer sk-prod-xxxx-xxxx-xxxx-1a2b" \\
  -H "Content-Type: application/json"`

const DOC_SAMPLE_RESPONSE = `{
  "success": true,
  "data": {
    "vehicle_number": "DL01AB1234",
    "total_challans": 3,
    "pending_amount": 4500,
    "challans": [
      {
        "challan_id": "CH-2026-001",
        "date": "2026-03-15",
        "violation": "Over Speeding",
        "amount": 2000,
        "status": "pending",
        "location": "NH-44, Gurugram"
      },
      {
        "challan_id": "CH-2026-002",
        "date": "2026-02-28",
        "violation": "Red Light Violation",
        "amount": 1500,
        "status": "pending",
        "location": "MG Road, Delhi"
      }
    ]
  }
}`

const DOC_EXAMPLES = [
  {
    title: 'Basic Lookup',
    description: 'Fetch all challans for a vehicle number',
    code: `fetch("https://api.lots247.com/v1/challans/DL01AB1234", {
  headers: { "Authorization": "Bearer YOUR_TOKEN" }
})
.then(res => res.json())
.then(data => console.log(data))`,
  },
  {
    title: 'Filtered by Status',
    description: 'Get only pending challans for a vehicle',
    code: `fetch("https://api.lots247.com/v1/challans/DL01AB1234?status=pending", {
  headers: { "Authorization": "Bearer YOUR_TOKEN" }
})
.then(res => res.json())
.then(data => console.log(data.challans))`,
  },
  {
    title: 'Bulk Lookup (POST)',
    description: 'Check challans for multiple vehicles in one request',
    code: `fetch("https://api.lots247.com/v1/challans/bulk-lookup", {
  method: "POST",
  headers: {
    "Authorization": "Bearer YOUR_TOKEN",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    vehicle_numbers: ["DL01AB1234", "MH02CD5678", "KA03EF9012"]
  })
})
.then(res => res.json())
.then(data => console.log(data))`,
  },
]

// ─── Tab Definition ────────────────────────────────────────────────────────────

export type TabId = 'wallet' | 'bulk' | 'token' | 'log' | 'docs'

export const TABS: { id: TabId; label: string; icon: LucideIcon }[] = [
  { id: 'wallet', label: 'Wallet', icon: Wallet },
  { id: 'bulk', label: 'Bulk Request', icon: Upload },
  { id: 'token', label: 'API Token', icon: Key },
  { id: 'log', label: 'Log', icon: FileText },
  { id: 'docs', label: 'Documentation', icon: BookOpen },
]

// ─── Main Component ────────────────────────────────────────────────────────────

export function ApiDetail({ api, onBack, onContactSubmit }: ApiDetailProps) {
  const [activeTab, setActiveTab] = useState<TabId>('wallet')
  const [contactOpen, setContactOpen] = useState(false)

  const Icon = ICON_MAP[api.icon] || ShieldCheck
  const categoryStyle = CATEGORY_STYLES[api.category] || 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400'

  return (
    <div className="min-h-screen">
      <div className="flex flex-col lg:flex-row">
        {/* Left Sidebar — API info */}
        <div className="lg:w-[360px] xl:w-[400px] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950/50 p-6 md:p-8">
          <button
            onClick={() => onBack?.()}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center flex-shrink-0">
              <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              {api.name}
            </h1>
          </div>

          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-5">
            {api.fullDescription}
          </p>

          <a
            href={api.documentationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors mb-6"
          >
            View documentation
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2">
              Category
            </p>
            <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${categoryStyle}`}>
              {api.category}
            </span>
          </div>

          <div className="pt-5 border-t border-stone-200 dark:border-stone-800">
            <p className="text-sm text-stone-600 dark:text-stone-400 mb-3">
              Interested in using <span className="font-medium text-stone-800 dark:text-stone-200">{api.name}</span>?
            </p>
            <button
              onClick={() => setContactOpen(true)}
              className="w-full px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl transition-colors"
            >
              Contact for Pricing
            </button>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 min-w-0 flex flex-col md:flex-row">
          {/* Vertical Tab List */}
          <div className="md:w-48 lg:w-52 flex-shrink-0 p-4 md:p-5">
            <div className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-1.5 flex md:flex-col gap-1 overflow-x-auto md:overflow-x-visible sticky top-6">
              {TABS.map((tab) => {
                const TabIcon = tab.icon
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap w-full text-left ${
                      isActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
                        : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                    }`}
                  >
                    <TabIcon className="w-4 h-4 flex-shrink-0" />
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 min-w-0 p-4 md:p-5 md:pl-0">
            {activeTab === 'wallet' && <WalletTab />}
            {activeTab === 'bulk' && <BulkRequestTab />}
            {activeTab === 'token' && <ApiTokenTab />}
            {activeTab === 'log' && <LogTab />}
            {activeTab === 'docs' && <DocumentationTab api={api} />}
          </div>
        </div>
      </div>

      <ContactModal
        apiName={api.name}
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        onSubmit={(message) => onContactSubmit?.(api.id, message)}
      />
    </div>
  )
}

// ─── Wallet Tab ────────────────────────────────────────────────────────────────

export function WalletTab() {
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  return (
    <div className="space-y-5">
      {/* Date Range Filter */}
      <div className="flex flex-wrap items-end gap-3">
        <div>
          <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-1">From</label>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-stone-500 dark:text-stone-400 mb-1">To</label>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
          />
        </div>
        <button className="px-4 py-2 text-sm font-medium rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors">
          Apply
        </button>
      </div>

      {/* Balance Card */}
      <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-1">Current Balance</p>
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-50 tabular-nums">{WALLET_BALANCE.toLocaleString()} <span className="text-sm font-medium text-stone-500 dark:text-stone-400">credits</span></p>
        </div>
        <button className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors">
          <Wallet className="w-4 h-4" />
          Top-up
        </button>
      </div>

      {/* Transaction History */}
      <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Transaction History</p>
          <span className="text-xs text-stone-400 dark:text-stone-500">{WALLET_TRANSACTIONS.length} entries</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60">
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Date</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Description</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Type</th>
                <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Amount</th>
                <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {WALLET_TRANSACTIONS.map((txn) => {
                const isCredit = txn.type === 'credit'
                return (
                  <tr key={txn.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                    <td className="px-5 py-3.5 text-xs text-stone-500 dark:text-stone-400 tabular-nums font-mono whitespace-nowrap">{txn.date}</td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          isCredit ? 'bg-emerald-50 dark:bg-emerald-950/40' : 'bg-stone-100 dark:bg-stone-800'
                        }`}>
                          {isCredit
                            ? <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            : <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 dark:text-stone-500" />
                          }
                        </div>
                        <span className="text-sm text-stone-700 dark:text-stone-300">{txn.description}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        isCredit
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                      }`}>
                        {isCredit ? 'Credit' : 'Debit'}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className={`text-sm font-semibold tabular-nums ${
                        isCredit ? 'text-emerald-600 dark:text-emerald-400' : 'text-stone-500 dark:text-stone-400'
                      }`}>
                        {isCredit ? '+' : '−'}{txn.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="text-sm font-medium text-stone-900 dark:text-stone-50 tabular-nums">{txn.balance.toLocaleString()}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─── Bulk Request Tab ──────────────────────────────────────────────────────────

const BULK_STATUS_STYLES: Record<string, string> = {
  Processing: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
  Completed: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
  Failed: 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400',
}

export function BulkRequestTab() {
  return (
    <div className="space-y-5">
      {/* Action Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <button className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors">
          <Upload className="w-4 h-4" />
          Submit Bulk Request
        </button>
        <button className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm font-medium text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors">
          <Upload className="w-4 h-4" />
          Upload Excel
        </button>
        <button className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
          <Download className="w-4 h-4" />
          Download Sample
        </button>
      </div>

      {/* Requests Table */}
      <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Bulk Requests</p>
          <span className="text-xs text-stone-400 dark:text-stone-500">{BULK_REQUESTS.length} requests</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60">
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Requested At</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Batch Number</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Requested By</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Notes</th>
                <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {BULK_REQUESTS.map((req) => (
                <tr key={req.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                  <td className="px-5 py-3.5 text-xs text-stone-500 dark:text-stone-400 tabular-nums font-mono whitespace-nowrap">{req.requestedAt}</td>
                  <td className="px-5 py-3.5 text-sm font-mono text-stone-700 dark:text-stone-300">{req.batchNumber}</td>
                  <td className="px-5 py-3.5 text-sm text-stone-700 dark:text-stone-300">{req.requestedBy}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${BULK_STATUS_STYLES[req.status]}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-stone-500 dark:text-stone-400 max-w-[200px] truncate">{req.notes}</td>
                  <td className="px-5 py-3.5 text-right">
                    <button className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                      <Eye className="w-3.5 h-3.5" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─── API Token Tab ─────────────────────────────────────────────────────────────

export function ApiTokenTab() {
  const [generatedToken, setGeneratedToken] = useState<string | null>(null)
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [showTokenId, setShowTokenId] = useState<number | null>(null)

  function handleGenerate() {
    const token = `sk-new-${Math.random().toString(36).slice(2, 6)}-${Math.random().toString(36).slice(2, 6)}-${Math.random().toString(36).slice(2, 6)}-${Math.random().toString(36).slice(2, 6)}`
    setGeneratedToken(token)
  }

  function handleCopy(text: string, id: number) {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-5">
      {/* Generate Token */}
      <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 p-5">
        <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-50 mb-3">Generate New Token</h3>
        {generatedToken ? (
          <div className="flex items-center gap-2">
            <code className="flex-1 px-3 py-2 text-sm font-mono bg-stone-50 dark:bg-stone-800 rounded-lg text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 truncate">
              {generatedToken}
            </code>
            <button
              onClick={() => handleCopy(generatedToken, -1)}
              className="flex-shrink-0 p-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
            >
              {copiedId === -1 ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-stone-500" />}
            </button>
            <button
              onClick={() => setGeneratedToken(null)}
              className="flex-shrink-0 p-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
            >
              <RotateCcw className="w-4 h-4 text-stone-500" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleGenerate}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium transition-colors"
          >
            <Key className="w-4 h-4" />
            Generate Token
          </button>
        )}
        {generatedToken && (
          <p className="mt-2 text-xs text-amber-600 dark:text-amber-400">Copy this token now. It won't be shown again.</p>
        )}
      </div>

      {/* Active Tokens */}
      <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-stone-200 dark:border-stone-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Active Tokens</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60">
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Name</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Token</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Created</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Last Used</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Status</th>
                <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {API_TOKENS.map((t) => (
                <tr key={t.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                  <td className="px-5 py-3.5 text-sm font-medium text-stone-800 dark:text-stone-200">{t.name}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <code className="text-xs font-mono text-stone-500 dark:text-stone-400">
                        {showTokenId === t.id ? t.token : t.token.replace(/^(sk-\w+-).*(-\w+)$/, '$1****$2')}
                      </code>
                      <button onClick={() => setShowTokenId(showTokenId === t.id ? null : t.id)} className="p-0.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300">
                        {showTokenId === t.id ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                      <button onClick={() => handleCopy(t.token, t.id)} className="p-0.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300">
                        {copiedId === t.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-stone-500 dark:text-stone-400 tabular-nums">{t.created}</td>
                  <td className="px-5 py-3.5 text-xs text-stone-500 dark:text-stone-400 tabular-nums whitespace-nowrap">{t.lastUsed}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      t.status === 'Active'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    {t.status === 'Active' && (
                      <button className="text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors">
                        Revoke
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Token Activity Log */}
      <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-stone-200 dark:border-stone-800">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Token Activity Log</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60">
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Timestamp</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Token</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Action</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">IP Address</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {TOKEN_ACTIVITY.map((log) => (
                <tr key={log.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                  <td className="px-5 py-3 text-xs text-stone-500 dark:text-stone-400 tabular-nums font-mono whitespace-nowrap">{log.timestamp}</td>
                  <td className="px-5 py-3 text-xs font-mono text-stone-500 dark:text-stone-400">{log.token}</td>
                  <td className="px-5 py-3 text-xs text-stone-700 dark:text-stone-300">{log.action}</td>
                  <td className="px-5 py-3 text-xs font-mono text-stone-500 dark:text-stone-400">{log.ip}</td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      log.status === 'Success' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                        : log.status === 'Rate Limited' ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
                        : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─── Log Tab ───────────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<string, string> = {
  '2xx': 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
  '3xx': 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
  '4xx': 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
  '5xx': 'bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-400',
}

function getStatusStyle(status: number) {
  if (status >= 500) return STATUS_STYLES['5xx']
  if (status >= 400) return STATUS_STYLES['4xx']
  if (status >= 300) return STATUS_STYLES['3xx']
  return STATUS_STYLES['2xx']
}

export function LogTab() {
  const [search, setSearch] = useState('')

  const filtered = LOGS_DATA.filter((log) =>
    log.endpoint.toLowerCase().includes(search.toLowerCase()) ||
    log.method.toLowerCase().includes(search.toLowerCase()) ||
    String(log.status).includes(search)
  )

  return (
    <div className="space-y-4">
      {/* Search/Filter */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500" />
        <input
          type="text"
          placeholder="Search by endpoint, method, or status..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
        />
      </div>

      {/* Logs Table */}
      <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        <div className="px-5 py-3.5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Recent API Calls</p>
          <span className="text-xs text-stone-400 dark:text-stone-500">{filtered.length} entries</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px]">
            <thead>
              <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60">
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Timestamp</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Method</th>
                <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Endpoint</th>
                <th className="text-center px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Status</th>
                <th className="text-right px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                  <td className="px-5 py-3 text-xs text-stone-500 dark:text-stone-400 tabular-nums font-mono whitespace-nowrap">{log.timestamp}</td>
                  <td className="px-5 py-3">
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${METHOD_STYLES[log.method] || METHOD_STYLES.GET}`}>
                      {log.method}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-xs text-stone-700 dark:text-stone-300 font-mono truncate max-w-[280px]">{log.endpoint}</td>
                  <td className="px-5 py-3 text-center">
                    <span className={`text-xs font-bold tabular-nums px-2 py-0.5 rounded-full ${getStatusStyle(log.status)}`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right text-xs text-stone-500 dark:text-stone-400 tabular-nums font-mono">{log.latency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// ─── Documentation Tab ─────────────────────────────────────────────────────────

export function DocumentationTab({ api }: { api: ApiDetailProps['api'] }) {
  const [copiedBlock, setCopiedBlock] = useState<string | null>(null)

  function copyBlock(text: string, id: string) {
    navigator.clipboard.writeText(text)
    setCopiedBlock(id)
    setTimeout(() => setCopiedBlock(null), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Parameters */}
      <div>
        <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-50 mb-3">Parameters</h3>
        <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60">
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Name</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Type</th>
                  <th className="text-center px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Required</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 dark:divide-stone-800">
                {DOC_PARAMS.map((p) => (
                  <tr key={p.name} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                    <td className="px-5 py-3">
                      <code className="text-xs font-mono font-medium text-stone-800 dark:text-stone-200 bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded">{p.name}</code>
                    </td>
                    <td className="px-5 py-3 text-xs text-stone-500 dark:text-stone-400 font-mono">{p.type}</td>
                    <td className="px-5 py-3 text-center">
                      {p.required ? (
                        <span className="text-xs font-medium text-red-600 dark:text-red-400">Required</span>
                      ) : (
                        <span className="text-xs text-stone-400 dark:text-stone-500">Optional</span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-xs text-stone-600 dark:text-stone-400">{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Endpoints */}
      {api.endpoints.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-50 mb-3">Endpoints</h3>
          <div className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 divide-y divide-stone-200 dark:divide-stone-800">
            {api.endpoints.map((endpoint, idx) => (
              <div key={idx} className="px-5 py-4 flex items-start gap-3">
                <span className={`flex-shrink-0 mt-0.5 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${METHOD_STYLES[endpoint.method] || METHOD_STYLES.GET}`}>
                  {endpoint.method}
                </span>
                <div className="min-w-0">
                  <code className="text-sm font-mono text-stone-800 dark:text-stone-200">{endpoint.path}</code>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{endpoint.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sample Request */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-50">Sample Request</h3>
          <button
            onClick={() => copyBlock(DOC_SAMPLE_REQUEST, 'request')}
            className="inline-flex items-center gap-1 text-xs font-medium text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
          >
            {copiedBlock === 'request' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedBlock === 'request' ? 'Copied' : 'Copy'}
          </button>
        </div>
        <pre className="bg-stone-900 dark:bg-stone-950 text-stone-100 rounded-xl p-5 text-xs font-mono leading-relaxed overflow-x-auto border border-stone-800">
          {DOC_SAMPLE_REQUEST}
        </pre>
      </div>

      {/* Sample Response */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-50">Sample Response</h3>
          <button
            onClick={() => copyBlock(DOC_SAMPLE_RESPONSE, 'response')}
            className="inline-flex items-center gap-1 text-xs font-medium text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
          >
            {copiedBlock === 'response' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedBlock === 'response' ? 'Copied' : 'Copy'}
          </button>
        </div>
        <pre className="bg-stone-900 dark:bg-stone-950 text-stone-100 rounded-xl p-5 text-xs font-mono leading-relaxed overflow-x-auto border border-stone-800">
          {DOC_SAMPLE_RESPONSE}
        </pre>
      </div>

      {/* Examples */}
      <div>
        <h3 className="text-sm font-semibold text-stone-900 dark:text-stone-50 mb-4">Usage Examples</h3>
        <div className="space-y-4">
          {DOC_EXAMPLES.map((example, idx) => (
            <div key={idx} className="bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden">
              <div className="px-5 py-3.5 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-800 dark:text-stone-200">{example.title}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{example.description}</p>
                </div>
                <button
                  onClick={() => copyBlock(example.code, `example-${idx}`)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors flex-shrink-0"
                >
                  {copiedBlock === `example-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedBlock === `example-${idx}` ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="bg-stone-900 dark:bg-stone-950 text-stone-100 p-5 text-xs font-mono leading-relaxed overflow-x-auto">
                {example.code}
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
