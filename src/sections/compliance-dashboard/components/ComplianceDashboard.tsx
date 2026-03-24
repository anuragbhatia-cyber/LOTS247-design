import { useState, useMemo } from 'react'
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  ShieldCheck,
  FileText,
  Wind,
  CreditCard,
  IdCard,
  AlertTriangle,
  Ban,
  Lock,
  Lightbulb,
  Download,
  Calendar,
  SlidersHorizontal,
  Truck,
  Users,
  Building2,
  Wrench,
  Clock,
  Plus,
  User,
  MoreVertical,
} from 'lucide-react'
import type {
  ComplianceDashboardProps,
  ComplianceCategory,
  CategoryId,
  ComplianceStatus,
  DocumentStatus,
  UrgencyLevel,
  InsightType,
  ScopeFilter,
  DateRangePreset,
  PermitType,
  MonthlyChallanTrendPoint,
  VehicleHistoryEventType,
} from '@/../product/sections/compliance-dashboard/types'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(iso: string): string {
  const d = new Date(iso)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

function formatCurrency(amount: number): string {
  if (amount >= 100000) {
    const lakhs = amount / 100000
    return `₹${lakhs.toFixed(lakhs % 1 === 0 ? 0 : 2)}L`
  }
  return `₹${amount.toLocaleString('en-IN')}`
}

const STATUS_COLORS: Record<ComplianceStatus, { color: string; bg: string; text: string; ring: string; dot: string; bar: string }> = {
  healthy: {
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/40',
    text: 'text-emerald-700 dark:text-emerald-400',
    ring: 'text-emerald-500',
    dot: 'bg-emerald-500',
    bar: 'bg-emerald-500',
  },
  warning: {
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/40',
    text: 'text-amber-700 dark:text-amber-400',
    ring: 'text-amber-500',
    dot: 'bg-amber-500',
    bar: 'bg-amber-500',
  },
  critical: {
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-950/40',
    text: 'text-red-700 dark:text-red-400',
    ring: 'text-red-500',
    dot: 'bg-red-500',
    bar: 'bg-red-500',
  },
}

const STATUS_LABEL: Record<ComplianceStatus, string> = {
  healthy: 'Healthy',
  warning: 'Needs Attention',
  critical: 'Critical',
}

const DOC_STATUS_BADGE: Record<DocumentStatus, { bg: string; text: string; label: string }> = {
  valid: { bg: 'bg-emerald-50 dark:bg-emerald-950/40', text: 'text-emerald-700 dark:text-emerald-400', label: 'Valid' },
  expiring: { bg: 'bg-amber-50 dark:bg-amber-950/40', text: 'text-amber-700 dark:text-amber-400', label: 'Expiring' },
  expired: { bg: 'bg-red-50 dark:bg-red-950/40', text: 'text-red-700 dark:text-red-400', label: 'Expired' },
}

const URGENCY_BADGE: Record<UrgencyLevel, { bg: string; text: string; label: string }> = {
  expired: { bg: 'bg-red-100 dark:bg-red-950/50', text: 'text-red-700 dark:text-red-400', label: 'Expired' },
  critical: { bg: 'bg-red-100 dark:bg-red-950/50', text: 'text-red-700 dark:text-red-400', label: 'Expired' },
  warning: { bg: 'bg-amber-50 dark:bg-amber-950/30', text: 'text-amber-700 dark:text-amber-400', label: 'Warning' },
  notice: { bg: 'bg-amber-50 dark:bg-amber-950/30', text: 'text-amber-700 dark:text-amber-400', label: 'Warning' },
}

const INSIGHT_STYLE: Record<InsightType, { bg: string; border: string; icon: string }> = {
  positive: { bg: 'bg-emerald-50 dark:bg-emerald-950/20', border: 'border-emerald-200 dark:border-emerald-800', icon: 'text-emerald-500' },
  warning: { bg: 'bg-amber-50 dark:bg-amber-950/20', border: 'border-amber-200 dark:border-amber-800', icon: 'text-amber-500' },
  critical: { bg: 'bg-red-50 dark:bg-red-950/20', border: 'border-red-200 dark:border-red-800', icon: 'text-red-500' },
}

const CATEGORY_ICONS: Record<CategoryId, typeof ShieldCheck> = {
  rc: FileText,
  insurance: ShieldCheck,
  pucc: Wind,
  permits: Building2,
  dl: IdCard,
  challans: CreditCard,
  blacklisted: Ban,
  ntbt: Lock,
}

const HEALTH_CARD_LABEL: Record<CategoryId, string> = {
  rc: 'RC Validity',
  insurance: 'Insurance Status',
  pucc: 'PUC Status',
  permits: 'Permit Status',
  dl: 'DL Validity',
  challans: 'Challans',
  blacklisted: 'Blacklisted',
  ntbt: 'NTBT Status',
}

const PERMIT_TYPE_LABEL: Record<PermitType, string> = {
  allIndia: 'All India',
  nationwide: 'Nationwide',
  state: 'State',
}

const DATE_PRESETS: { value: DateRangePreset; label: string }[] = [
  { value: 'thisMonth', label: 'This Month' },
  { value: 'last3Months', label: 'Last 3 Months' },
  { value: 'last6Months', label: 'Last 6 Months' },
  { value: 'lastYear', label: 'Last Year' },
]

const SCOPE_OPTIONS: { value: ScopeFilter; label: string; icon: typeof Truck }[] = [
  { value: 'fleet', label: 'Fleet', icon: Truck },
  { value: 'vehicle', label: 'Vehicle', icon: Truck },
  { value: 'driver', label: 'Driver', icon: Users },
]

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ScoreRing({ score, status }: { score: number; status: ComplianceStatus }) {
  const radius = 36
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference
  const colors = STATUS_COLORS[status]

  return (
    <div className="flex items-center gap-5 sm:flex-col sm:items-center sm:gap-3 flex-shrink-0">
      <div className="relative w-24 h-24 sm:w-28 sm:h-28">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
          <circle
            cx="44" cy="44" r={radius}
            fill="none"
            strokeWidth="7"
            className="stroke-stone-100 dark:stroke-stone-800"
          />
          <circle
            cx="44" cy="44" r={radius}
            fill="none"
            strokeWidth="7"
            strokeLinecap="round"
            className={`transition-all duration-700 ${colors.ring}`}
            stroke="currentColor"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-2xl sm:text-3xl font-bold tabular-nums leading-none ${colors.color}`}>
            {score}
          </span>
          <span className="text-xs text-stone-500 dark:text-stone-400 leading-none mt-1">/ 100</span>
        </div>
      </div>
      <p className={`text-xs font-semibold sm:text-center ${colors.color}`}>
        {STATUS_LABEL[status]}
      </p>
    </div>
  )
}

function CategoryCard({
  category,
  onClick,
}: {
  category: ComplianceCategory
  onClick: () => void
}) {
  const colors = STATUS_COLORS[category.status]
  const Icon = CATEGORY_ICONS[category.id]

  return (
    <button
      onClick={onClick}
      className={`
        group relative w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200
        bg-stone-50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-800
        hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md dark:hover:shadow-stone-950/40
      `}
    >
      <div className="mb-3">
        <p className="text-sm font-medium text-stone-900 dark:text-stone-100 leading-snug">{category.fullLabel}</p>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <span className={`text-2xl font-bold ${colors.color}`}>{category.compliant}<span className="text-base font-semibold text-stone-400 dark:text-stone-500">/{category.total}</span></span>
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 group-hover:bg-stone-200 dark:group-hover:bg-stone-600 transition-colors">
          <span className="text-xs font-medium">View</span>
          <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>


    </button>
  )
}

function TrendChart({ data, extraData }: { data: { month: string; score: number }[]; extraData?: { online: number; court: number }[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const maxScore = Math.max(...data.map(d => d.score))
  const minScore = Math.min(...data.map(d => d.score))
  const range = maxScore - minScore || 1
  const padding = range * 0.2

  const chartMin = Math.max(0, minScore - padding)
  const chartMax = Math.min(100, maxScore + padding)
  const chartRange = chartMax - chartMin || 1

  const width = 600
  const height = 200
  const marginX = 30
  const marginY = 10

  const points = data.map((d, i) => ({
    x: marginX + (i / (data.length - 1)) * (width - marginX * 2),
    y: marginY + (1 - (d.score - chartMin) / chartRange) * (height - marginY * 2),
    ...d,
  }))

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height + 30}`} className="w-full" preserveAspectRatio="xMidYMid meet">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(pct => {
          const y = marginY + (1 - pct) * (height - marginY * 2)
          const val = Math.round(chartMin + pct * chartRange)
          return (
            <g key={pct}>
              <line x1={marginX} y1={y} x2={width - marginX} y2={y} stroke="currentColor" strokeDasharray="4 4" className="text-stone-200 dark:text-stone-800" />
              <text x={marginX - 6} y={y + 4} textAnchor="end" className="fill-stone-400 dark:fill-stone-500" fontSize="10">{val}</text>
            </g>
          )
        })}

        {/* Area fill */}
        <path d={areaPath} className="fill-emerald-500/10 dark:fill-emerald-400/5" />

        {/* Line */}
        <path d={linePath} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 dark:text-emerald-400" />

        {/* Hover vertical line */}
        {hoveredIndex !== null && (
          <line
            x1={points[hoveredIndex].x}
            y1={marginY}
            x2={points[hoveredIndex].x}
            y2={height}
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 4"
            className="text-stone-300 dark:text-stone-600"
          />
        )}

        {/* Data points + hover zones */}
        {points.map((p, i) => (
          <g key={i}>
            {/* Invisible wide hover zone */}
            <rect
              x={p.x - (width / data.length) / 2}
              y={0}
              width={width / data.length}
              height={height + 30}
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
            {/* Point */}
            <circle
              cx={p.x} cy={p.y}
              r={hoveredIndex === i ? 6 : 4}
              className={`transition-all duration-150 ${hoveredIndex === i ? 'fill-emerald-600 dark:fill-emerald-300' : 'fill-emerald-500 dark:fill-emerald-400'}`}
            />
            <circle cx={p.x} cy={p.y} r={hoveredIndex === i ? 3 : 2} className="fill-white dark:fill-stone-900 pointer-events-none" />
            {/* Month labels */}
            <text
              x={p.x} y={height + 20}
              textAnchor="middle"
              className={`transition-all duration-150 ${hoveredIndex === i ? 'fill-stone-900 dark:fill-stone-100 font-semibold' : 'fill-stone-400 dark:fill-stone-500'}`}
              fontSize="11"
            >
              {p.month.split(' ')[0]}
            </text>
            {/* Tooltip */}
            {hoveredIndex === i && (
              <g>
                {extraData ? (
                  <>
                    <rect
                      x={p.x - 70}
                      y={p.y - 68}
                      width="140"
                      height="58"
                      rx="8"
                      className="fill-stone-900 dark:fill-stone-100"
                    />
                    <text x={p.x} y={p.y - 48} textAnchor="middle" className="fill-white dark:fill-stone-900" fontSize="12" fontWeight="700">
                      {p.month} — {p.score} Total
                    </text>
                    <text x={p.x} y={p.y - 32} textAnchor="middle" className="fill-stone-300 dark:fill-stone-500" fontSize="11">
                      {extraData[i].online} Online · {extraData[i].court} Court
                    </text>
                  </>
                ) : (
                  <>
                    <rect
                      x={p.x - 40}
                      y={p.y - 38}
                      width="80"
                      height="28"
                      rx="8"
                      className="fill-stone-900 dark:fill-stone-100"
                    />
                    <text x={p.x} y={p.y - 20} textAnchor="middle" className="fill-white dark:fill-stone-900" fontSize="12" fontWeight="600">
                      {p.month}: {p.score}
                    </text>
                  </>
                )}
              </g>
            )}
          </g>
        ))}
      </svg>
    </div>
  )
}

function ChallanTrendChart({ data }: { data: MonthlyChallanTrendPoint[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const maxCount = Math.max(...data.map(d => d.count))

  return (
    <div className="w-full">
      <div className="flex items-end gap-3 sm:gap-5 h-48">
        {data.map((d, i) => {
          const heightPct = maxCount > 0 ? (d.count / maxCount) * 100 : 0
          return (
            <div
              key={i}
              className="flex-1 flex flex-col items-center gap-2 h-full justify-end cursor-pointer"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {hoveredIndex === i && (
                <div className="px-3 py-1.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold whitespace-nowrap">
                  {d.count} challans &middot; {formatCurrency(d.amount)}
                </div>
              )}
              <div className="text-xs font-semibold text-stone-600 dark:text-stone-400 tabular-nums">{d.count}</div>
              <div
                className={`w-full rounded-t-lg transition-all duration-300 ${
                  hoveredIndex === i
                    ? 'bg-red-500 dark:bg-red-400'
                    : 'bg-red-400/70 dark:bg-red-500/50'
                }`}
                style={{ height: `${Math.max(heightPct, 4)}%` }}
              />
              <span className={`text-xs transition-colors ${
                hoveredIndex === i ? 'text-stone-900 dark:text-stone-100 font-semibold' : 'text-stone-400 dark:text-stone-500'
              }`}>
                {d.month.split(' ')[0]}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Drill-down Views
// ---------------------------------------------------------------------------

function DrilldownTable({ headers, children }: { headers: string[]; children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-stone-200 dark:border-stone-800">
            {headers.map(h => (
              <th key={h} className="text-left py-3 px-3 text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">{children}</tbody>
      </table>
    </div>
  )
}

function StatusBadge({ status }: { status: DocumentStatus }) {
  const s = DOC_STATUS_BADGE[status]
  return <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>{s.label}</span>
}

function CategoryDrilldownView({
  categoryId,
  category,
  drilldowns,
  drivers,
  onBack,
}: {
  categoryId: CategoryId
  category: ComplianceCategory
  drilldowns: ComplianceDashboardProps['categoryDrilldowns']
  drivers: ComplianceDashboardProps['drivers']
  onBack: () => void
}) {
  const colors = STATUS_COLORS[category.status]
  const Icon = CATEGORY_ICONS[categoryId]

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-lg flex items-center justify-center border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-stone-600 dark:text-stone-400" />
        </button>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${colors.bg}`}>
          <Icon className={`w-4.5 h-4.5 ${colors.text}`} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-stone-900 dark:text-stone-50">{category.fullLabel}</h2>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {category.compliant}/{category.total} compliant &middot; <span className={colors.text}>{category.percentage}%</span>
          </p>
        </div>
      </div>

      {/* Permits sub-breakdown cards */}
      {categoryId === 'permits' && category.subBreakdown && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          {(Object.entries(category.subBreakdown) as [PermitType, { compliant: number; total: number }][]).map(
            ([type, data]) => {
              const pct = data.total > 0 ? Math.round((data.compliant / data.total) * 100) : 100
              return (
                <div key={type} className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900">
                  <p className="text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-1">{PERMIT_TYPE_LABEL[type]}</p>
                  <p className="text-xl font-bold text-stone-900 dark:text-stone-50">{pct}%</p>
                  <p className="text-xs text-stone-400 dark:text-stone-500">{data.compliant}/{data.total}</p>
                </div>
              )
            }
          )}
        </div>
      )}

      {/* Table */}
      <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden">
        {categoryId === 'rc' && (
          <DrilldownTable headers={['Vehicle', 'Status', 'Issue Date', 'Expiry Date', 'RTO Office']}>
            {drilldowns.rc.map(row => (
              <tr key={row.vehicleNumber} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                <td className="py-3 px-3 font-mono text-xs font-semibold text-stone-900 dark:text-stone-100">{row.vehicleNumber}</td>
                <td className="py-3 px-3"><StatusBadge status={row.status} /></td>
                <td className="py-3 px-3 text-stone-600 dark:text-stone-400">{formatDate(row.issueDate)}</td>
                <td className="py-3 px-3 text-stone-600 dark:text-stone-400">{formatDate(row.expiryDate)}</td>
                <td className="py-3 px-3 text-stone-600 dark:text-stone-400">{row.rtoOffice}</td>
              </tr>
            ))}
          </DrilldownTable>
        )}

        {categoryId === 'insurance' && (
          <DrilldownTable headers={['Vehicle', 'Status', 'Provider', 'Policy No.', 'Expiry Date']}>
            {drilldowns.insurance.map(row => (
              <tr key={row.vehicleNumber} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                <td className="py-3 px-3 font-mono text-xs font-semibold text-stone-900 dark:text-stone-100">{row.vehicleNumber}</td>
                <td className="py-3 px-3"><StatusBadge status={row.status} /></td>
                <td className="py-3 px-3 text-stone-600 dark:text-stone-400">{row.provider}</td>
                <td className="py-3 px-3 font-mono text-xs text-stone-500 dark:text-stone-400">{row.policyNumber}</td>
                <td className="py-3 px-3 text-stone-600 dark:text-stone-400">{formatDate(row.expiryDate)}</td>
              </tr>
            ))}
          </DrilldownTable>
        )}

        {categoryId === 'pucc' && (
          <DrilldownTable headers={['Vehicle', 'Status', 'Test Centre', 'Expiry Date']}>
            {drilldowns.pucc.map(row => (
              <tr key={row.vehicleNumber} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                <td className="py-3 px-3 font-mono text-xs font-semibold text-stone-900 dark:text-stone-100">{row.vehicleNumber}</td>
                <td className="py-3 px-3"><StatusBadge status={row.status} /></td>
                <td className="py-3 px-3 text-stone-600 dark:text-stone-400">{row.testCenter}</td>
                <td className="py-3 px-3 text-stone-600 dark:text-stone-400">{formatDate(row.expiryDate)}</td>
              </tr>
            ))}
          </DrilldownTable>
        )}

        {categoryId === 'permits' && (
          <DrilldownTable headers={['Vehicle', 'Status', 'Type', 'Permit No.', 'Expiry Date']}>
            {drilldowns.permits.map(row => (
              <tr key={row.vehicleNumber + row.permitNumber} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                <td className="py-3 px-3 font-mono text-xs font-semibold text-stone-900 dark:text-stone-100">{row.vehicleNumber}</td>
                <td className="py-3 px-3"><StatusBadge status={row.status} /></td>
                <td className="py-3 px-3">
                  <span className="inline-flex px-2 py-0.5 rounded-full text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                    {PERMIT_TYPE_LABEL[row.permitType]}
                  </span>
                </td>
                <td className="py-3 px-3 font-mono text-xs text-stone-500 dark:text-stone-400">{row.permitNumber}</td>
                <td className="py-3 px-3 text-stone-600 dark:text-stone-400">{formatDate(row.expiryDate)}</td>
              </tr>
            ))}
          </DrilldownTable>
        )}

        {categoryId === 'dl' && (
          <DrilldownTable headers={['Driver', 'License Number', 'License Expiry', 'Assigned Vehicles', 'Status']}>
            {drilldowns.dl.map(row => {
              const driver = drivers.find(d => d.licenseNumber === row.licenseNumber)
              const isValid = row.status === 'valid'

              return (
                <tr key={row.licenseNumber} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center flex-shrink-0">
                        <User className="w-4.5 h-4.5 text-stone-400 dark:text-stone-500" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{row.driverName}</p>
                        <p className="text-xs text-stone-400 dark:text-stone-500">{driver?.phone || '—'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-3 font-mono text-xs text-stone-600 dark:text-stone-400">{row.licenseNumber}</td>
                  <td className="py-4 px-3 text-sm text-stone-600 dark:text-stone-400">{formatDate(row.expiryDate)}</td>
                  <td className="py-4 px-3">
                    <div className="flex flex-wrap gap-1.5">
                      {row.vehiclesAssigned.map(v => (
                        <span key={v} className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-mono font-medium bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                          <Truck className="w-3 h-3 text-stone-400" />
                          {v}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                      isValid
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                        : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400'
                    }`}>
                      {isValid ? 'Valid' : 'Not Valid'}
                    </span>
                  </td>
                </tr>
              )
            })}
          </DrilldownTable>
        )}

        {categoryId === 'challans' && (
          <DrilldownTable headers={['Vehicle', 'Pending Challans', 'Amount']}>
            {drilldowns.challans.map(row => (
              <tr key={row.vehicleNumber} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                <td className="py-3 px-3 font-mono text-xs font-semibold text-stone-900 dark:text-stone-100">{row.vehicleNumber}</td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-3">
                    {row.outstandingCount > 0 ? (
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400">{row.outstandingCount}</span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500">0</span>
                    )}
                    <div className="text-xs text-stone-500 dark:text-stone-400">
                      <p>Court <span className="font-semibold text-stone-700 dark:text-stone-300">{row.courtCount}</span></p>
                      <p>Online <span className="font-semibold text-stone-700 dark:text-stone-300">{row.onlineCount}</span></p>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-3 font-semibold text-stone-900 dark:text-stone-100">
                  {row.totalAmount > 0 ? formatCurrency(row.totalAmount) : '—'}
                </td>
              </tr>
            ))}
          </DrilldownTable>
        )}

        {categoryId === 'blacklisted' && (
          <DrilldownTable headers={['Vehicle', 'Flag Reason', 'Authority', 'Date', 'Status']}>
            {drilldowns.blacklisted.map(row => (
              <tr key={row.vehicleNumber} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                <td className="py-3 px-3 font-mono text-xs font-semibold text-stone-900 dark:text-stone-100">{row.vehicleNumber}</td>
                <td className="py-3 px-3 text-stone-600 dark:text-stone-400 max-w-[250px]">{row.flagReason}</td>
                <td className="py-3 px-3 text-stone-600 dark:text-stone-400">{row.flaggingAuthority}</td>
                <td className="py-3 px-3 text-stone-600 dark:text-stone-400">{formatDate(row.flagDate)}</td>
                <td className="py-3 px-3">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                    row.status === 'active' ? 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400' : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                  }`}>{row.status === 'active' ? 'Active' : 'Resolved'}</span>
                </td>
              </tr>
            ))}
          </DrilldownTable>
        )}

        {categoryId === 'ntbt' && (
          <DrilldownTable headers={['Vehicle', 'Hold Reason', 'Authority', 'Date', 'Case Ref', 'Status']}>
            {drilldowns.ntbt.map(row => (
              <tr key={row.vehicleNumber} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                <td className="py-3 px-3 font-mono text-xs font-semibold text-stone-900 dark:text-stone-100">{row.vehicleNumber}</td>
                <td className="py-3 px-3 text-stone-600 dark:text-stone-400 max-w-[250px]">{row.holdReason}</td>
                <td className="py-3 px-3 text-stone-600 dark:text-stone-400">{row.issuingAuthority}</td>
                <td className="py-3 px-3 text-stone-600 dark:text-stone-400">{formatDate(row.holdDate)}</td>
                <td className="py-3 px-3 font-mono text-xs text-stone-500 dark:text-stone-400">{row.caseReference}</td>
                <td className="py-3 px-3">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold ${
                    row.status === 'active' ? 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400' : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                  }`}>{row.status === 'active' ? 'Active' : 'Resolved'}</span>
                </td>
              </tr>
            ))}
          </DrilldownTable>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function ComplianceDashboard({
  complianceScore,
  categories,
  insights,
  monthlyTrend,
  monthlyChallanTrend,
  historicalStats,
  expiryUrgencyItems,
  categoryDrilldowns,
  vehicles,
  drivers,
  vehicleHistory,
  onCategorySelect,
  onBackToOverview,
  onDateRangeChange,
  onScopeChange,
}: ComplianceDashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null)
  const [datePreset, setDatePreset] = useState<DateRangePreset>('last6Months')
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false)
  const [scope, setScope] = useState<ScopeFilter>('fleet')
  const [scopeSearch, setScopeSearch] = useState('')
  const [scopeDropdownOpen, setScopeDropdownOpen] = useState(false)
  const [selectedScopeId, setSelectedScopeId] = useState<string | null>(null)
  const [scopeApplied, setScopeApplied] = useState(false)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [urgencyPage, setUrgencyPage] = useState(0)
  const URGENCY_PAGE_SIZE = 5

  const activeCategory = useMemo(
    () => selectedCategory ? categories.find(c => c.id === selectedCategory) : null,
    [selectedCategory, categories]
  )

  const filteredScopeItems = useMemo(() => {
    const search = scopeSearch.toLowerCase()
    if (scope === 'vehicle') {
      return vehicles.filter(v => v.vehicleNumber.toLowerCase().includes(search) || v.make.toLowerCase().includes(search))
    }
    if (scope === 'driver') {
      return drivers.filter(d => d.name.toLowerCase().includes(search) || d.licenseNumber.toLowerCase().includes(search))
    }
    return []
  }, [scope, scopeSearch, vehicles, drivers])

  const urgencyTotalPages = Math.ceil(expiryUrgencyItems.length / URGENCY_PAGE_SIZE)
  const paginatedUrgencyItems = useMemo(
    () => expiryUrgencyItems.slice(urgencyPage * URGENCY_PAGE_SIZE, (urgencyPage + 1) * URGENCY_PAGE_SIZE),
    [expiryUrgencyItems, urgencyPage]
  )

  const handleCategoryClick = (id: CategoryId) => {
    setSelectedCategory(id)
    onCategorySelect?.(id)
  }

  const handleBack = () => {
    setSelectedCategory(null)
    onBackToOverview?.()
  }

  const handleDateChange = (preset: DateRangePreset) => {
    setDatePreset(preset)
    setDateDropdownOpen(false)
    onDateRangeChange?.(preset)
  }

  const handleScopeChange = (newScope: ScopeFilter) => {
    setScope(newScope)
    setSelectedScopeId(null)
    setScopeSearch('')
    setScopeApplied(false)
    if (newScope === 'fleet') {
      setScopeApplied(true)
      onScopeChange?.(newScope)
    }
  }

  const handleScopeSelect = (id: string) => {
    setSelectedScopeId(id)
    setScopeDropdownOpen(false)
    setScopeSearch('')
  }

  const handleScopeApply = () => {
    if (selectedScopeId) {
      setScopeApplied(true)
      onScopeChange?.(scope, selectedScopeId)
    }
  }

  const changeIsPositive = complianceScore.change >= 0

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* ---------------------------------------------------------------- */}
        {/* Top Bar: Filters                                                 */}
        {/* ---------------------------------------------------------------- */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50">Compliance</h1>
            <p className="text-sm text-stone-500 dark:text-stone-400 mt-0.5">Fleet compliance health at a glance</p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
          {/* Download PDF */}
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-stone-300 dark:hover:border-stone-600 transition-colors text-sm font-medium text-stone-700 dark:text-stone-300"
            >
              <Download className="w-4 h-4 text-stone-400" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>

          {/* Date Range Filter */}
            <div className="relative">
              <button
                onClick={() => { setDateDropdownOpen(!dateDropdownOpen); setScopeDropdownOpen(false) }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-stone-300 dark:hover:border-stone-600 transition-colors text-sm"
              >
                <Calendar className="w-4 h-4 text-stone-400" />
                <span className="font-medium text-stone-700 dark:text-stone-300">
                  {DATE_PRESETS.find(d => d.value === datePreset)?.label}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${dateDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {dateDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 shadow-xl shadow-stone-200/40 dark:shadow-stone-950/60 overflow-hidden z-20">
                  {DATE_PRESETS.map(preset => (
                    <button
                      key={preset.value}
                      onClick={() => handleDateChange(preset.value)}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                        datePreset === preset.value
                          ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 font-semibold'
                          : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800/50'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scope Toggle + Selector */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <div className="flex items-center gap-1 rounded-lg bg-stone-200/40 dark:bg-stone-900 p-1">
            {SCOPE_OPTIONS.map(opt => {
              const ScopeIcon = opt.icon
              const isActive = scope === opt.value
              return (
                <button
                  key={opt.value}
                  onClick={() => handleScopeChange(opt.value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                  }`}
                >
                  <ScopeIcon className={`w-4 h-4 ${isActive ? 'text-stone-700 dark:text-stone-300' : ''}`} />
                  <span>{opt.label}</span>
                </button>
              )
            })}
          </div>

        </div>

        {scope === 'vehicle' && (
          <div className="flex items-center gap-3 mb-8">
            <div className="relative flex-1 max-w-md">
              <button
                onClick={() => { setScopeDropdownOpen(!scopeDropdownOpen); setDateDropdownOpen(false) }}
                className="flex items-center gap-2.5 w-full px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-stone-300 dark:hover:border-stone-600 transition-colors text-sm"
              >
                <Search className="w-4 h-4 text-stone-400" />
                <span className="text-stone-500 dark:text-stone-400 truncate">
                  {selectedScopeId
                    ? scope === 'vehicle'
                      ? vehicles.find(v => v.id === selectedScopeId)?.vehicleNumber
                      : drivers.find(d => d.id === selectedScopeId)?.name
                    : `Select ${scope}...`}
                </span>
                <ChevronDown className={`w-4 h-4 text-stone-400 ml-auto transition-transform ${scopeDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {scopeDropdownOpen && (
                <div className="absolute left-0 top-full mt-1 w-full bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 shadow-xl shadow-stone-200/40 dark:shadow-stone-950/60 overflow-hidden z-20">
                  <div className="p-2 border-b border-stone-100 dark:border-stone-800">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-800">
                      <Search className="w-4 h-4 text-stone-400" />
                      <input
                        type="text"
                        value={scopeSearch}
                        onChange={e => setScopeSearch(e.target.value)}
                        placeholder={`Search ${scope}s...`}
                        className="flex-1 bg-transparent text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 outline-none"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {filteredScopeItems.map(item => (
                      <button
                        key={item.id}
                        onClick={() => handleScopeSelect(item.id)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors hover:bg-stone-50 dark:hover:bg-stone-800/50 ${
                          selectedScopeId === item.id ? 'bg-emerald-50 dark:bg-emerald-950/30' : ''
                        }`}
                      >
                        <span className="font-medium text-stone-900 dark:text-stone-100">
                          {'vehicleNumber' in item ? item.vehicleNumber : item.name}
                        </span>
                        <span className="text-xs text-stone-400 dark:text-stone-500 ml-2">
                          {'make' in item ? item.make : item.licenseNumber}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleScopeApply}
              disabled={!selectedScopeId}
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:bg-stone-200 dark:disabled:bg-stone-700 text-white disabled:text-stone-400 dark:disabled:text-stone-500 text-sm font-semibold transition-colors disabled:cursor-not-allowed"
            >
              Apply
            </button>
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Drill-down View                                                  */}
        {/* ---------------------------------------------------------------- */}
        {scope === 'vehicle' && !scopeApplied ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <Search className="w-12 h-12 text-stone-300 dark:text-stone-600 mb-4" />
            <h3 className="text-lg font-semibold text-stone-700 dark:text-stone-300 mb-1">
              Select a vehicle to view report
            </h3>
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Choose a vehicle from the dropdown above and click Apply
            </p>
          </div>
        ) : scope === 'driver' ? (
          <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden">
            <DrilldownTable headers={['Driver', 'License Number', 'License Expiry', 'Assigned Vehicles', 'Status']}>
              {categoryDrilldowns.dl.map(row => {
                const driver = drivers.find(d => d.licenseNumber === row.licenseNumber)
                const isValid = row.status === 'valid'

                return (
                  <tr key={row.licenseNumber} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center flex-shrink-0">
                          <User className="w-4.5 h-4.5 text-stone-400 dark:text-stone-500" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">{row.driverName}</p>
                          <p className="text-xs text-stone-400 dark:text-stone-500">{driver?.phone || '—'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-3 font-mono text-xs text-stone-600 dark:text-stone-400">{row.licenseNumber}</td>
                    <td className="py-4 px-3 text-sm text-stone-600 dark:text-stone-400">{formatDate(row.expiryDate)}</td>
                    <td className="py-4 px-3">
                      <div className="flex flex-wrap gap-1.5">
                        {row.vehiclesAssigned.map(v => (
                          <span key={v} className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-mono font-medium bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                            <Truck className="w-3 h-3 text-stone-400" />
                            {v}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-3">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                        isValid
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                          : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400'
                      }`}>
                        {isValid ? 'Valid' : 'Not Valid'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </DrilldownTable>
          </div>
        ) : selectedCategory && activeCategory ? (
          <CategoryDrilldownView
            categoryId={selectedCategory}
            category={activeCategory}
            drilldowns={categoryDrilldowns}
            drivers={drivers}
            onBack={handleBack}
          />
        ) : (
          <>
            {scope === 'fleet' ? (
              <>
              {/* -------------------------------------------------------------- */}
              {/* Hero Row: Compliance Health + Insights side by side              */}
              {/* -------------------------------------------------------------- */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
                {/* Compliance Health Card */}
                <div className="rounded-2xl bg-white dark:bg-stone-900 shadow-md shadow-stone-200/60 dark:shadow-stone-950/40 overflow-hidden">
                  {/* Header */}
                  <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4 flex items-center justify-between">
                    <h2 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
                      Compliance Health
                    </h2>
                    <span className={`text-sm font-bold ${changeIsPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      {changeIsPositive ? '+' : ''}{complianceScore.change}% from last month
                    </span>
                  </div>

                  {/* Score + Categories */}
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 flex flex-col sm:flex-row gap-5 sm:gap-8">
                    {/* Circular score */}
                    <ScoreRing score={complianceScore.overall} status={complianceScore.status} />

                    {/* Category breakdown with progress bars */}
                    <div className="flex-1 flex flex-col gap-3.5">
                      {categories.slice(0, 5).map(cat => {
                        const cfg = STATUS_COLORS[cat.status]
                        return (
                          <div key={cat.id}>
                            <div className="flex items-center justify-between mb-1.5">
                              <div className="flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
                                <span className="text-sm text-stone-700 dark:text-stone-300">{HEALTH_CARD_LABEL[cat.id]}</span>
                              </div>
                              <span className={`text-sm font-semibold tabular-nums ${cfg.color}`}>
                                {cat.percentage}%
                              </span>
                            </div>
                            <div className="h-1.5 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-500 ${cfg.bar}`}
                                style={{ width: `${cat.percentage}%` }}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                </div>

                {/* Insights Card */}
                <div className="rounded-2xl bg-white dark:bg-stone-900 shadow-md shadow-stone-200/60 dark:shadow-stone-950/40 overflow-hidden p-5 sm:p-6">
                  <h3 className="text-sm font-bold text-stone-900 dark:text-stone-50 uppercase tracking-wider mb-4">Insights</h3>
                  <div className="space-y-3">
                    {insights.map(insight => {
                      const style = INSIGHT_STYLE[insight.type]
                      return (
                        <div key={insight.id} className={`px-4 py-3 rounded-lg border ${style.bg} ${style.border}`}>
                          <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">{insight.message}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              </>
            ) : (
              /* Vehicle/Driver Info Card */
              <div className="mb-6 rounded-2xl bg-white dark:bg-stone-900 shadow-md shadow-stone-200/60 dark:shadow-stone-950/40 p-5 sm:p-6">
                {scope === 'vehicle' && selectedScopeId && (() => {
                  const v = vehicles.find(v => v.id === selectedScopeId)
                  if (!v) return null
                  const assignedDriver = categoryDrilldowns.dl.find(d => d.vehiclesAssigned.includes(v.vehicleNumber))
                  return (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
                          <Truck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50 font-mono">{v.vehicleNumber}</h3>
                          <p className="text-sm text-stone-500 dark:text-stone-400">{v.make} &middot; {v.vehicleType}</p>
                        </div>
                      </div>
                      {assignedDriver && (
                        <div className="text-right">
                          <p className="text-xs text-stone-400 dark:text-stone-500 uppercase tracking-wider">Assigned Driver</p>
                          <p className="text-sm font-semibold text-stone-800 dark:text-stone-200">{assignedDriver.driverName}</p>
                        </div>
                      )}
                    </div>
                  )
                })()}
                {scope === 'driver' && selectedScopeId && (() => {
                  const d = drivers.find(d => d.id === selectedScopeId)
                  if (!d) return null
                  return (
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
                        <Users className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-stone-900 dark:text-stone-50">{d.name}</h3>
                        <p className="text-sm text-stone-500 dark:text-stone-400 font-mono">{d.licenseNumber}</p>
                      </div>
                    </div>
                  )
                })()}
              </div>
            )}

            {/* Vehicle/Driver scope: compliance status + history */}
            {scope !== 'fleet' && selectedScopeId && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
                {/* Compliance Status — 2 cols */}
                <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-stone-900 shadow-md shadow-stone-200/60 dark:shadow-stone-950/40 p-5 sm:p-6">
                  <h3 className="text-sm font-bold text-stone-900 dark:text-stone-50 uppercase tracking-wider mb-4">Compliance Status</h3>
                  <div className="space-y-1">
                    {categories.filter(c => scope !== 'vehicle' || (c.id !== 'dl' && c.id !== 'blacklisted' && c.id !== 'ntbt')).map(cat => {
                      const isCompliant = cat.status === 'healthy'
                      const isExpanded = expandedCategories.has(cat.id)
                      const selectedVehicleNum = scope === 'vehicle'
                        ? vehicles.find(v => v.id === selectedScopeId)?.vehicleNumber
                        : null

                      const toggleExpand = () => {
                        setExpandedCategories(prev => {
                          const next = new Set(prev)
                          if (next.has(cat.id)) next.delete(cat.id)
                          else next.add(cat.id)
                          return next
                        })
                      }

                      const getDetail = () => {
                        if (!selectedVehicleNum) return null
                        switch (cat.id) {
                          case 'rc': {
                            const row = categoryDrilldowns.rc.find(r => r.vehicleNumber === selectedVehicleNum)
                            return row ? [
                              { label: 'RTO Office', value: row.rtoOffice },
                              { label: 'Issue Date', value: row.issueDate },
                              { label: 'Expiry Date', value: row.expiryDate },
                            ] : null
                          }
                          case 'insurance': {
                            const row = categoryDrilldowns.insurance.find(r => r.vehicleNumber === selectedVehicleNum)
                            return row ? [
                              { label: 'Provider', value: row.provider },
                              { label: 'Policy No.', value: row.policyNumber },
                              { label: 'Expiry Date', value: row.expiryDate },
                            ] : null
                          }
                          case 'pucc': {
                            const row = categoryDrilldowns.pucc.find(r => r.vehicleNumber === selectedVehicleNum)
                            return row ? [
                              { label: 'Test Center', value: row.testCenter },
                              { label: 'Expiry Date', value: row.expiryDate },
                            ] : null
                          }
                          case 'permits': {
                            const row = categoryDrilldowns.permits.find(r => r.vehicleNumber === selectedVehicleNum)
                            return row ? [
                              { label: 'Permit Type', value: row.permitType === 'allIndia' ? 'All India' : row.permitType === 'nationwide' ? 'Nationwide' : 'State' },
                              { label: 'Permit No.', value: row.permitNumber },
                              { label: 'Expiry Date', value: row.expiryDate },
                            ] : null
                          }
                          case 'dl': {
                            const row = categoryDrilldowns.dl[0]
                            return row ? [
                              { label: 'Driver', value: row.driverName },
                              { label: 'License No.', value: row.licenseNumber },
                              { label: 'Expiry Date', value: row.expiryDate },
                            ] : null
                          }
                          case 'challans': {
                            const row = categoryDrilldowns.challans.find(r => r.vehicleNumber === selectedVehicleNum)
                            return row ? [
                              { label: 'Pending', value: `${row.outstandingCount} (Court: ${row.courtCount}, Online: ${row.onlineCount})` },
                              { label: 'Total Amount', value: `₹${row.totalAmount.toLocaleString('en-IN')}` },
                            ] : null
                          }
                          case 'blacklisted': {
                            const row = categoryDrilldowns.blacklisted.find(r => r.vehicleNumber === selectedVehicleNum)
                            return row ? [
                              { label: 'Reason', value: row.flagReason },
                              { label: 'Authority', value: row.flaggingAuthority },
                              { label: 'Flag Date', value: row.flagDate },
                            ] : null
                          }
                          case 'ntbt': {
                            const row = categoryDrilldowns.ntbt.find(r => r.vehicleNumber === selectedVehicleNum)
                            return row ? [
                              { label: 'Reason', value: row.holdReason },
                              { label: 'Authority', value: row.issuingAuthority },
                              { label: 'Case Ref', value: row.caseReference },
                            ] : null
                          }
                          default: return null
                        }
                      }

                      const detail = getDetail()

                      return (
                        <div
                          key={cat.id}
                          className={`rounded-xl transition-colors ${isExpanded ? 'bg-stone-100 dark:bg-stone-800/60' : 'bg-stone-50 dark:bg-stone-800/30 hover:bg-stone-100/80 dark:hover:bg-stone-800/50'}`}
                        >
                          <button
                            onClick={toggleExpand}
                            className="w-full flex items-center justify-between px-4 py-3.5 cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <ChevronDown className={`w-4 h-4 text-stone-400 dark:text-stone-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : '-rotate-90'}`} />
                              <p className="text-sm font-medium text-stone-800 dark:text-stone-200">{cat.fullLabel}</p>
                            </div>
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                              isCompliant
                                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                                : cat.status === 'warning'
                                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400'
                                  : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400'
                            }`}>
                              {isCompliant ? 'Valid' : cat.status === 'warning' ? 'Expiring' : 'Not Valid'}
                            </span>
                          </button>
                          {isExpanded && detail && (
                            <div className="px-4 pb-4 pt-0.5 ml-7">
                              <div className="border-l-2 border-stone-200 dark:border-stone-700 pl-4 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
                                {detail.map(d => (
                                  <div key={d.label}>
                                    <p className="text-[11px] uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-0.5">{d.label}</p>
                                    <p className="text-sm font-medium text-stone-700 dark:text-stone-300">{d.value}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {isExpanded && !detail && (
                            <div className="px-4 pb-4 pt-0.5 ml-7">
                              <div className="border-l-2 border-stone-200 dark:border-stone-700 pl-4">
                                <p className="text-xs text-stone-400 dark:text-stone-500">No data available</p>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Vehicle History — 1 col */}
                <div className="rounded-2xl bg-white dark:bg-stone-900 shadow-md shadow-stone-200/60 dark:shadow-stone-950/40 p-5 sm:p-6">
                  <h3 className="text-sm font-bold text-stone-900 dark:text-stone-50 uppercase tracking-wider mb-5">Vehicle History</h3>
                  {(() => {
                    const selectedVehicle = scope === 'vehicle'
                      ? vehicles.find(v => v.id === selectedScopeId)?.vehicleNumber
                      : null
                    const events = selectedVehicle && vehicleHistory ? vehicleHistory[selectedVehicle] ?? [] : []
                    const EVENT_STYLES: Record<VehicleHistoryEventType, { bg: string; text: string; icon: typeof CreditCard }> = {
                      challan: { bg: 'bg-red-50 dark:bg-red-950/40', text: 'text-red-600 dark:text-red-400', icon: CreditCard },
                      insurance: { bg: 'bg-blue-50 dark:bg-blue-950/40', text: 'text-blue-600 dark:text-blue-400', icon: ShieldCheck },
                      pucc: { bg: 'bg-green-50 dark:bg-green-950/40', text: 'text-green-600 dark:text-green-400', icon: Wind },
                      permit: { bg: 'bg-purple-50 dark:bg-purple-950/40', text: 'text-purple-600 dark:text-purple-400', icon: FileText },
                      rc: { bg: 'bg-amber-50 dark:bg-amber-950/40', text: 'text-amber-600 dark:text-amber-400', icon: FileText },
                      service: { bg: 'bg-stone-100 dark:bg-stone-800', text: 'text-stone-600 dark:text-stone-400', icon: Wrench },
                    }

                    if (events.length === 0) {
                      return <p className="text-sm text-stone-400 dark:text-stone-500">No history available</p>
                    }

                    return (
                      <div className="relative">
                        <div className="absolute left-[5px] top-2 bottom-2 w-px bg-stone-200 dark:bg-stone-700" />
                        <div className="space-y-4">
                          {events.slice(0, 6).map((event, i) => {
                            const style = EVENT_STYLES[event.type]
                            return (
                              <div key={i} className="relative flex gap-3 pl-0">
                                <div className="w-[10px] h-[10px] rounded-full flex-shrink-0 z-10 mt-1.5 bg-emerald-500 dark:bg-emerald-400" />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-2">
                                    <p className="text-sm font-medium text-stone-800 dark:text-stone-200 truncate">{event.title}</p>
                                    {event.amount !== null && (
                                      <span className="text-xs font-semibold text-stone-600 dark:text-stone-300 tabular-nums flex-shrink-0">{formatCurrency(event.amount)}</span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-0.5">{formatDate(event.date)}</p>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )
                  })()}
                </div>
              </div>
            )}

            {/* Vehicle Details Card — full width below compliance status + history */}
            {scope === 'vehicle' && selectedScopeId && scopeApplied && (() => {
              const v = vehicles.find(v => v.id === selectedScopeId)
              if (!v) return null
              const details = [
                { label: 'RC Number', value: v.vehicleNumber },
                { label: 'Vehicle Type', value: v.vehicleType },
                { label: 'Make', value: v.make },
                { label: 'Model', value: v.model },
                { label: 'Year', value: String(v.year) },
                { label: 'Category', value: v.category, badge: true, badgeColor: 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400' },
                { label: 'Status', value: v.status, badge: true, badgeColor: v.status === 'Active' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400' : v.status === 'Maintenance' ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400' },
              ]
              return (
                <div className="mb-6 rounded-2xl bg-white dark:bg-stone-900 shadow-md shadow-stone-200/60 dark:shadow-stone-950/40 p-5 sm:p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {details.map(d => (
                      <div key={d.label} className="rounded-xl bg-stone-50 dark:bg-stone-800/40 p-4">
                        <p className="text-[11px] uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-1.5">{d.label}</p>
                        {d.badge ? (
                          <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${d.badgeColor}`}>{d.value}</span>
                        ) : (
                          <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{d.value}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })()}

            {/* Fleet-only sections below */}
            {scope === 'fleet' && (<>
            {/* -------------------------------------------------------------- */}
            {/* Category Cards Grid                                             */}
            {/* -------------------------------------------------------------- */}
            <div className="mb-6 rounded-2xl bg-white dark:bg-stone-900 shadow-md shadow-stone-200/60 dark:shadow-stone-950/40 p-5 sm:p-6">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-50 uppercase tracking-wider mb-4">Compliance Categories</h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {categories.map(cat => (
                  <CategoryCard key={cat.id} category={cat} onClick={() => handleCategoryClick(cat.id)} />
                ))}
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* Trend Chart + Historical Data side by side                       */}
            {/* -------------------------------------------------------------- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
              {/* Challans Trend Chart — takes 2 cols */}
              <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-white dark:bg-stone-900 shadow-md shadow-stone-200/60 dark:shadow-stone-950/40">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-stone-900 dark:text-stone-50 uppercase tracking-wider">Monthly Challans Trend</h3>
                  <span className="text-xs text-stone-400 dark:text-stone-500">
                    {(monthlyChallanTrend ?? monthlyTrend)[0]?.month} — {(monthlyChallanTrend ?? monthlyTrend)[(monthlyChallanTrend ?? monthlyTrend).length - 1]?.month}
                  </span>
                </div>
                <TrendChart
                  data={monthlyChallanTrend ? monthlyChallanTrend.map(d => ({ month: d.month, score: d.count })) : monthlyTrend}
                  extraData={monthlyChallanTrend?.map(d => ({ online: d.online, court: d.court }))}
                />
              </div>

              {/* Fleet Snapshot */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-stone-900 shadow-md shadow-stone-200/60 dark:shadow-stone-950/40 flex flex-col">
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-50 uppercase tracking-wider mb-5">Fleet Snapshot</h3>
                <div className="grid grid-cols-2 gap-3 flex-1">
                  <div className="rounded-xl bg-stone-100 dark:bg-stone-800 p-3.5">
                    <div className="flex items-center gap-2 mb-2">
                      <Truck className="w-4 h-4 text-stone-500 dark:text-stone-400" />
                      <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Vehicles</span>
                    </div>
                    <p className="text-2xl font-bold text-stone-900 dark:text-stone-100 tabular-nums">{historicalStats.totalVehiclesTracked}</p>
                  </div>
                  <div className="rounded-xl bg-stone-100 dark:bg-stone-800 p-3.5">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-stone-500 dark:text-stone-400" />
                      <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Drivers</span>
                    </div>
                    <p className="text-2xl font-bold text-stone-900 dark:text-stone-100 tabular-nums">{historicalStats.totalDriversTracked}</p>
                  </div>
                  <div className="rounded-xl bg-stone-100 dark:bg-stone-800 p-3.5">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="w-4 h-4 text-stone-500 dark:text-stone-400" />
                      <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Renewals</span>
                    </div>
                    <p className="text-2xl font-bold text-stone-900 dark:text-stone-100 tabular-nums">{historicalStats.documentsRenewed}</p>
                  </div>
                  <div className="rounded-xl bg-stone-100 dark:bg-stone-800 p-3.5">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-4 h-4 text-stone-500 dark:text-stone-400" />
                      <span className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Challans</span>
                    </div>
                    <p className="text-2xl font-bold text-stone-900 dark:text-stone-100 tabular-nums">{historicalStats.challansPaid}</p>
                    <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">{formatCurrency(historicalStats.totalChallanAmount)}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <div className="text-center flex-1">
                    <p className="text-[11px] text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1">Avg Score</p>
                    <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">{historicalStats.avgComplianceScore}</p>
                  </div>
                  <div className="w-px h-8 bg-stone-200 dark:bg-stone-700" />
                  <div className="text-center flex-1">
                    <p className="text-[11px] text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1">Best</p>
                    <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">{historicalStats.bestMonth}</p>
                  </div>
                  <div className="w-px h-8 bg-stone-200 dark:bg-stone-700" />
                  <div className="text-center flex-1">
                    <p className="text-[11px] text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-1">Worst</p>
                    <p className="text-sm font-bold text-red-600 dark:text-red-400">{historicalStats.worstMonth}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* Expiry Urgency Table                                            */}
            {/* -------------------------------------------------------------- */}
            <div className="rounded-2xl bg-white dark:bg-stone-900 shadow-md shadow-stone-200/60 dark:shadow-stone-950/40 overflow-hidden">
              <div className="px-5 sm:px-6 py-4 border-b border-stone-100 dark:border-stone-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-50 uppercase tracking-wider">Documents Expiry</h3>
                <span className="text-xs text-stone-400 dark:text-stone-500">{expiryUrgencyItems.length} items</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-stone-200 dark:border-stone-800">
                      <th className="text-left py-3 px-4 sm:px-6 text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider w-[18%]">Vehicle</th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider w-[14%]">Document</th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider w-[16%]">Expiry Date</th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider w-[10%]">Days</th>
                      <th className="text-left py-3 px-3 text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider w-[12%]">Urgency</th>
                      <th className="text-right py-3 px-4 sm:px-6 text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
                    {paginatedUrgencyItems.map(item => {
                      const badge = URGENCY_BADGE[item.urgency]
                      return (
                        <tr key={item.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                          <td className="py-3 px-4 sm:px-6 font-mono text-xs font-semibold text-stone-900 dark:text-stone-100">{item.vehicleNumber}</td>
                          <td className="py-3 px-3 text-stone-600 dark:text-stone-400">{item.documentType}</td>
                          <td className="py-3 px-3 text-stone-600 dark:text-stone-400">{formatDate(item.expiryDate)}</td>
                          <td className="py-3 px-3">
                            <span className={`font-semibold ${item.daysRemaining < 0 ? 'text-red-600 dark:text-red-400' : item.daysRemaining <= 7 ? 'text-red-500 dark:text-red-400' : item.daysRemaining <= 15 ? 'text-amber-600 dark:text-amber-400' : 'text-stone-600 dark:text-stone-400'}`}>
                              {Math.abs(item.daysRemaining)} Days
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>{badge.label}</span>
                          </td>
                          <td className="py-3 px-4 sm:px-6 text-right">
                            <button
                              onClick={() => {
                                if (window.parent !== window) {
                                  window.parent.postMessage({ type: 'navigate', href: '/incidents', params: { vehicle: item.vehicleNumber, document: item.documentType } }, '*')
                                }
                              }}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors whitespace-nowrap"
                            >
                              Create Incident
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              {urgencyTotalPages > 1 && (
                <div className="px-5 sm:px-6 py-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    Showing {urgencyPage * URGENCY_PAGE_SIZE + 1}–{Math.min((urgencyPage + 1) * URGENCY_PAGE_SIZE, expiryUrgencyItems.length)} of {expiryUrgencyItems.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setUrgencyPage(p => Math.max(0, p - 1))}
                      disabled={urgencyPage === 0}
                      className="w-8 h-8 rounded-lg flex items-center justify-center border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4 text-stone-600 dark:text-stone-400" />
                    </button>
                    {Array.from({ length: urgencyTotalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setUrgencyPage(i)}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold transition-colors ${
                          urgencyPage === i
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                            : 'text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => setUrgencyPage(p => Math.min(urgencyTotalPages - 1, p + 1))}
                      disabled={urgencyPage === urgencyTotalPages - 1}
                      className="w-8 h-8 rounded-lg flex items-center justify-center border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-4 h-4 text-stone-600 dark:text-stone-400" />
                    </button>
                  </div>
                </div>
              )}
            </div>
            </>)}
          </>
        )}
      </div>
    </div>
  )
}
