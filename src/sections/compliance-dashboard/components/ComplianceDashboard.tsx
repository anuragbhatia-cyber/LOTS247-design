import { useState, useMemo, useEffect } from 'react'
import { createPortal } from 'react-dom'
import {
  ArrowLeft,
  ArrowUpDown,
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
  X,
  RefreshCw,
  MapPin,
  Copy,
  Info,
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
  expired: { bg: 'bg-red-50 dark:bg-red-950/40', text: 'text-red-700 dark:text-red-400', label: 'Expired' },
  critical: { bg: 'bg-red-50 dark:bg-red-950/40', text: 'text-red-700 dark:text-red-400', label: 'Expired' },
  warning: { bg: 'bg-amber-50 dark:bg-amber-950/30', text: 'text-amber-700 dark:text-amber-400', label: 'Expiring Soon' },
  notice: { bg: 'bg-amber-50 dark:bg-amber-950/30', text: 'text-amber-700 dark:text-amber-400', label: 'Expiring Soon' },
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
// Proposal Toast
// ---------------------------------------------------------------------------

function ProposalToast({ show, onClose }: { show: boolean; onClose: () => void }) {
  useEffect(() => {
    if (show) {
      const t = setTimeout(onClose, 3000)
      return () => clearTimeout(t)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl bg-stone-900 dark:bg-stone-100 shadow-xl shadow-stone-900/20 dark:shadow-stone-100/20">
        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="w-4.5 h-4.5 text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white dark:text-stone-900">Proposal Submitted</p>
          <p className="text-xs text-stone-400 dark:text-stone-500">Your proposal request has been submitted successfully</p>
        </div>
        <button onClick={onClose} className="ml-2 p-1 rounded-xl text-stone-500 hover:text-stone-300 dark:hover:text-stone-700 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

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
        group relative w-full h-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col
        bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800
        hover:border-emerald-500 dark:hover:border-emerald-500 hover:shadow-md dark:hover:shadow-stone-950/40
      `}
    >
      <div className="flex items-start justify-between gap-2 mb-3 min-h-[40px]">
        <p className="text-sm font-medium text-stone-500 dark:text-stone-400 leading-snug min-w-0">{category.fullLabel}</p>
        <div className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 group-hover:bg-stone-200 dark:group-hover:bg-stone-600 transition-colors flex-shrink-0">
          <span className="text-xs font-medium">View</span>
          <ArrowUpRight className="w-3 h-3" />
        </div>
      </div>

      <div className="mb-3">
        <span className="text-2xl font-bold text-stone-900 dark:text-stone-100">{category.compliant}<span className="text-base font-semibold text-stone-400 dark:text-stone-500">/{category.total}</span></span>
      </div>

      {category.id !== 'challans' && category.id !== 'blacklisted' && category.id !== 'ntbt' && (
        <div className="flex items-center gap-2 flex-wrap mt-auto">
          <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400">
            {category.compliant} Valid
          </span>
          {(category.expiring ?? 0) > 0 && (
            <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400">
              {category.expiring} Expiring
            </span>
          )}
          {(category.total - category.compliant - (category.expiring ?? 0)) > 0 && (
            <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400">
              {category.total - category.compliant - (category.expiring ?? 0)} Expired
            </span>
          )}
        </div>
      )}


    </button>
  )
}

function TrendChart({ data, extraData, secondaryData }: { data: { month: string; score: number }[]; extraData?: { online: number; court: number; amount?: number }[]; secondaryData?: { month: string; score: number }[] }) {
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
  const marginLeft = 30
  const marginRight = secondaryData ? 50 : 30
  const marginY = 10

  const points = data.map((d, i) => ({
    x: marginLeft + (i / (data.length - 1)) * (width - marginLeft - marginRight),
    y: marginY + (1 - (d.score - chartMin) / chartRange) * (height - marginY * 2),
    ...d,
  }))

  // Secondary line (amount) — uses its own scale, offset to always appear above the count line
  const secPoints = useMemo(() => {
    if (!secondaryData) return null
    const secMax = Math.max(...secondaryData.map(d => d.score))
    const secMin = Math.min(...secondaryData.map(d => d.score))
    const secRange = secMax - secMin || 1
    const secPadding = secRange * 0.2
    const secChartMin = Math.max(0, secMin - secPadding)
    const secChartMax = secMax + secPadding
    const secChartRange = secChartMax - secChartMin || 1

    // Map amount line to top 60% of chart so it stays visually above the count line
    const usableHeight = (height - marginY * 2) * 0.6
    const topOffset = marginY

    return {
      chartMin: secChartMin,
      chartMax: secChartMax,
      chartRange: secChartRange,
      points: secondaryData.map((d, i) => ({
        x: marginLeft + (i / (secondaryData.length - 1)) * (width - marginLeft - marginRight),
        y: topOffset + (1 - (d.score - secChartMin) / secChartRange) * usableHeight,
        ...d,
      })),
    }
  }, [secondaryData, width, height, marginLeft, marginRight, marginY])

  // Smooth cubic bezier path helper
  function smoothPath(pts: { x: number; y: number }[]): string {
    if (pts.length < 2) return ''
    let d = `M ${pts[0].x} ${pts[0].y}`
    for (let i = 0; i < pts.length - 1; i++) {
      const curr = pts[i]
      const next = pts[i + 1]
      const cpx = (curr.x + next.x) / 2
      d += ` C ${cpx} ${curr.y}, ${cpx} ${next.y}, ${next.x} ${next.y}`
    }
    return d
  }

  const linePath = smoothPath(points)
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`

  const secLinePath = secPoints ? smoothPath(secPoints.points) : ''
  const secAreaPath = secPoints ? `${secLinePath} L ${secPoints.points[secPoints.points.length - 1].x} ${height} L ${secPoints.points[0].x} ${height} Z` : ''

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${width} ${height + 30}`} className="w-full" preserveAspectRatio="xMidYMid meet">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map(pct => {
          const y = marginY + (1 - pct) * (height - marginY * 2)
          const val = Math.round(chartMin + pct * chartRange)
          return (
            <g key={pct}>
              <line x1={marginLeft} y1={y} x2={width - marginRight} y2={y} stroke="currentColor" strokeDasharray="4 4" className="text-stone-200 dark:text-stone-800" />
              <text x={marginLeft - 6} y={y + 4} textAnchor="end" className="fill-stone-400 dark:fill-stone-500" fontSize="10">{val}</text>
              {/* Right Y-axis labels for secondary data */}
              {secPoints && (
                <text x={width - marginRight + 6} y={y + 4} textAnchor="start" className="fill-red-400 dark:fill-red-500" fontSize="9">
                  {formatCurrency(Math.round(secPoints.chartMin + pct * secPoints.chartRange))}
                </text>
              )}
            </g>
          )
        })}

        {/* Secondary area fill (red, behind primary) */}
        {secPoints && <path d={secAreaPath} className="fill-red-500/8 dark:fill-red-400/5" />}

        {/* Secondary line (red) */}
        {secPoints && <path d={secLinePath} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 dark:text-red-400" />}

        {/* Primary area fill */}
        <path d={areaPath} className="fill-teal-500/10 dark:fill-teal-400/5" />

        {/* Primary line */}
        <path d={linePath} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500 dark:text-teal-400" />

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
            {/* Secondary point (red) */}
            {secPoints && (
              <>
                <circle
                  cx={secPoints.points[i].x} cy={secPoints.points[i].y}
                  r={hoveredIndex === i ? 5 : 3.5}
                  className={`transition-all duration-150 ${hoveredIndex === i ? 'fill-red-600 dark:fill-red-300' : 'fill-red-500 dark:fill-red-400'}`}
                />
                <circle cx={secPoints.points[i].x} cy={secPoints.points[i].y} r={hoveredIndex === i ? 2.5 : 1.5} className="fill-white dark:fill-stone-900 pointer-events-none" />
              </>
            )}
            {/* Primary point (teal) */}
            <circle
              cx={p.x} cy={p.y}
              r={hoveredIndex === i ? 6 : 4}
              className={`transition-all duration-150 ${hoveredIndex === i ? 'fill-teal-600 dark:fill-teal-300' : 'fill-teal-500 dark:fill-teal-400'}`}
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
                      x={p.x - 80}
                      y={Math.min(p.y, secPoints ? secPoints.points[i].y : p.y) - 80}
                      width="160"
                      height={extraData[i].amount !== undefined ? 70 : 58}
                      rx="8"
                      className="fill-stone-900 dark:fill-stone-100"
                    />
                    <text x={p.x} y={Math.min(p.y, secPoints ? secPoints.points[i].y : p.y) - 60} textAnchor="middle" className="fill-white dark:fill-stone-900" fontSize="12" fontWeight="700">
                      {p.month} — {p.score} Challans
                    </text>
                    <text x={p.x} y={Math.min(p.y, secPoints ? secPoints.points[i].y : p.y) - 44} textAnchor="middle" className="fill-stone-300 dark:fill-stone-500" fontSize="11">
                      {extraData[i].online} Online · {extraData[i].court} Court
                    </text>
                    {extraData[i].amount !== undefined && (
                      <text x={p.x} y={Math.min(p.y, secPoints ? secPoints.points[i].y : p.y) - 28} textAnchor="middle" className="fill-red-400 dark:fill-red-500" fontSize="11" fontWeight="600">
                        Amount: {formatCurrency(extraData[i].amount!)}
                      </text>
                    )}
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
          <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60">
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
  return <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>{s.label}</span>
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
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<string>('default')
  const [showFilterDropdown, setShowFilterDropdown] = useState(false)
  const [showSortDropdown, setShowSortDropdown] = useState(false)

  // Filter options per category
  const filterOptions = useMemo(() => {
    if (['rc', 'insurance', 'pucc', 'permits'].includes(categoryId)) {
      return [
        { value: 'all', label: 'All' },
        { value: 'valid', label: 'Valid' },
        { value: 'expiring', label: 'Expiring' },
        { value: 'expired', label: 'Expired' },
      ]
    }
    if (categoryId === 'dl') {
      return [
        { value: 'all', label: 'All' },
        { value: 'valid', label: 'Valid' },
        { value: 'expired', label: 'Expired' },
        { value: 'expiring', label: 'Expiring' },
      ]
    }
    if (categoryId === 'challans') {
      return [
        { value: 'all', label: 'All' },
        { value: 'pending', label: 'With Pending' },
        { value: 'clear', label: 'No Pending' },
      ]
    }
    return [
      { value: 'all', label: 'All' },
      { value: 'active', label: 'Active' },
      { value: 'resolved', label: 'Resolved' },
    ]
  }, [categoryId])

  // Search + status filtered rows
  const sq = searchQuery.toLowerCase()
  const matchesSearch = (vehicleNumber: string) => !sq || vehicleNumber.toLowerCase().includes(sq)
  const matchesDriverSearch = (name: string, license: string) => !sq || name.toLowerCase().includes(sq) || license.toLowerCase().includes(sq)
  const filteredRc = useMemo(() => drilldowns.rc.filter(r => (statusFilter === 'all' || r.status === statusFilter) && matchesSearch(r.vehicleNumber)), [drilldowns.rc, statusFilter, sq])
  const filteredInsurance = useMemo(() => drilldowns.insurance.filter(r => (statusFilter === 'all' || r.status === statusFilter) && matchesSearch(r.vehicleNumber)), [drilldowns.insurance, statusFilter, sq])
  const filteredPucc = useMemo(() => drilldowns.pucc.filter(r => (statusFilter === 'all' || r.status === statusFilter) && matchesSearch(r.vehicleNumber)), [drilldowns.pucc, statusFilter, sq])
  const filteredPermits = useMemo(() => drilldowns.permits.filter(r => (statusFilter === 'all' || r.status === statusFilter) && matchesSearch(r.vehicleNumber)), [drilldowns.permits, statusFilter, sq])
  const filteredDl = useMemo(() => drilldowns.dl.filter(r => (statusFilter === 'all' || r.status === statusFilter) && matchesDriverSearch(r.driverName, r.licenseNumber)), [drilldowns.dl, statusFilter, sq])
  const filteredChallans = useMemo(() => {
    return drilldowns.challans.filter(r => {
      const statusMatch = statusFilter === 'all' || (statusFilter === 'pending' ? r.outstandingCount > 0 : r.outstandingCount === 0)
      return statusMatch && matchesSearch(r.vehicleNumber)
    })
  }, [drilldowns.challans, statusFilter, sq])
  const filteredBlacklisted = useMemo(() => drilldowns.blacklisted.filter(r => (statusFilter === 'all' || r.status === statusFilter) && matchesSearch(r.vehicleNumber)), [drilldowns.blacklisted, statusFilter, sq])
  const filteredNtbt = useMemo(() => drilldowns.ntbt.filter(r => (statusFilter === 'all' || r.status === statusFilter) && matchesSearch(r.vehicleNumber)), [drilldowns.ntbt, statusFilter, sq])

  // Sort helper
  const applySort = <T extends { vehicleNumber?: string; expiryDate?: string; driverName?: string; licenseNumber?: string }>(rows: T[]) => {
    if (sortBy === 'default') return rows
    const sorted = [...rows]
    if (sortBy === 'az') sorted.sort((a, b) => (a.vehicleNumber || a.driverName || '').localeCompare(b.vehicleNumber || b.driverName || ''))
    if (sortBy === 'za') sorted.sort((a, b) => (b.vehicleNumber || b.driverName || '').localeCompare(a.vehicleNumber || a.driverName || ''))
    if (sortBy === 'date-asc') sorted.sort((a, b) => new Date(a.expiryDate || '').getTime() - new Date(b.expiryDate || '').getTime())
    if (sortBy === 'date-desc') sorted.sort((a, b) => new Date(b.expiryDate || '').getTime() - new Date(a.expiryDate || '').getTime())
    return sorted
  }

  const sortedRc = useMemo(() => applySort(filteredRc), [filteredRc, sortBy])
  const sortedInsurance = useMemo(() => applySort(filteredInsurance), [filteredInsurance, sortBy])
  const sortedPucc = useMemo(() => applySort(filteredPucc), [filteredPucc, sortBy])
  const sortedPermits = useMemo(() => applySort(filteredPermits), [filteredPermits, sortBy])
  const sortedDl = useMemo(() => applySort(filteredDl), [filteredDl, sortBy])
  const sortedChallans = useMemo(() => applySort(filteredChallans), [filteredChallans, sortBy])
  const sortedBlacklisted = useMemo(() => applySort(filteredBlacklisted), [filteredBlacklisted, sortBy])
  const sortedNtbt = useMemo(() => applySort(filteredNtbt), [filteredNtbt, sortBy])

  const getRows = () => {
    switch (categoryId) {
      case 'rc': return { filtered: filteredRc.length, total: drilldowns.rc.length }
      case 'insurance': return { filtered: filteredInsurance.length, total: drilldowns.insurance.length }
      case 'pucc': return { filtered: filteredPucc.length, total: drilldowns.pucc.length }
      case 'permits': return { filtered: filteredPermits.length, total: drilldowns.permits.length }
      case 'dl': return { filtered: filteredDl.length, total: drilldowns.dl.length }
      case 'challans': return { filtered: filteredChallans.length, total: drilldowns.challans.length }
      case 'blacklisted': return { filtered: filteredBlacklisted.length, total: drilldowns.blacklisted.length }
      case 'ntbt': return { filtered: filteredNtbt.length, total: drilldowns.ntbt.length }
      default: return { filtered: 0, total: 0 }
    }
  }
  const rowCounts = getRows()

  const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'az', label: categoryId === 'dl' ? 'Name (A-Z)' : 'Vehicle (A-Z)' },
    { value: 'za', label: categoryId === 'dl' ? 'Name (Z-A)' : 'Vehicle (Z-A)' },
    { value: 'date-asc', label: 'Expiry (Soonest)' },
    { value: 'date-desc', label: 'Expiry (Latest)' },
  ]

  const activeFilterCount = (statusFilter !== 'all' ? 1 : 0)

  const emptyRow = (cols: number) => (
    <tr><td colSpan={cols} className="py-8 text-center text-sm text-stone-400 dark:text-stone-500">No records match this filter</td></tr>
  )

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="w-9 h-9 rounded-xl flex items-center justify-center border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-stone-600 dark:text-stone-400" />
        </button>
        <h2 className="text-lg font-bold text-stone-900 dark:text-stone-50">{category.fullLabel}</h2>
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

      {/* Search + Filter + Sort */}
      <div className="mb-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500" />
            <input
              type="text"
              placeholder={categoryId === 'dl' ? 'Search driver or license...' : 'Search vehicle number...'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
            />
          </div>

          {/* Filter button */}
          <div className="relative">
            <button
              onClick={() => { setShowFilterDropdown(!showFilterDropdown); setShowSortDropdown(false) }}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                activeFilterCount > 0
                  ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'
                  : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="ml-0.5 w-5 h-5 rounded-full bg-emerald-600 text-white text-xs flex items-center justify-center">{activeFilterCount}</span>
              )}
            </button>
            {showFilterDropdown && (
              <div className="absolute right-0 top-full mt-1.5 w-48 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 shadow-xl shadow-stone-200/40 dark:shadow-stone-950/60 overflow-hidden z-20">
                {filterOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => { setStatusFilter(opt.value); setShowFilterDropdown(false) }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      statusFilter === opt.value
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 font-semibold'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800/50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sort button */}
          <div className="relative">
            <button
              onClick={() => { setShowSortDropdown(!showSortDropdown); setShowFilterDropdown(false) }}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                sortBy !== 'default'
                  ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'
                  : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
              }`}
            >
              <ArrowUpDown className="w-4 h-4" />
              <span className="hidden sm:inline">Sort</span>
            </button>
            {showSortDropdown && (
              <div className="absolute right-0 top-full mt-1.5 w-48 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-700 shadow-xl shadow-stone-200/40 dark:shadow-stone-950/60 overflow-hidden z-20">
                {sortOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => { setSortBy(opt.value); setShowSortDropdown(false) }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                      sortBy === opt.value
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 font-semibold'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800/50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {(statusFilter !== 'all' || sortBy !== 'default' || searchQuery) && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-stone-500 dark:text-stone-400">
              Showing {rowCounts.filtered} of {rowCounts.total}
            </span>
            {statusFilter !== 'all' && (
              <button
                onClick={() => setStatusFilter('all')}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-950/50 transition-colors"
              >
                {filterOptions.find(o => o.value === statusFilter)?.label}
                <X className="w-3 h-3" />
              </button>
            )}
            {sortBy !== 'default' && (
              <button
                onClick={() => setSortBy('default')}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              >
                {sortOptions.find(o => o.value === sortBy)?.label}
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden">
        {categoryId === 'rc' && (
          <DrilldownTable headers={['Vehicle', 'Status', 'Issue Date', 'Expiry Date', 'RTO Office']}>
            {sortedRc.length === 0 ? emptyRow(5) : sortedRc.map(row => (
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
            {sortedInsurance.length === 0 ? emptyRow(5) : sortedInsurance.map(row => (
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
            {sortedPucc.length === 0 ? emptyRow(4) : sortedPucc.map(row => (
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
            {sortedPermits.length === 0 ? emptyRow(5) : sortedPermits.map(row => (
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
            {sortedDl.length === 0 ? emptyRow(5) : sortedDl.map(row => {
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
            {sortedChallans.length === 0 ? emptyRow(3) : sortedChallans.map(row => (
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
            {sortedBlacklisted.length === 0 ? emptyRow(5) : sortedBlacklisted.map(row => (
              <tr key={row.vehicleNumber} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                <td className="py-3 px-3 font-mono text-xs font-semibold text-stone-900 dark:text-stone-100">{row.vehicleNumber}</td>
                <td className="py-3 px-3 text-stone-600 dark:text-stone-400 max-w-[250px]">{row.flagReason}</td>
                <td className="py-3 px-3 text-stone-600 dark:text-stone-400">{row.flaggingAuthority}</td>
                <td className="py-3 px-3 text-stone-600 dark:text-stone-400">{formatDate(row.flagDate)}</td>
                <td className="py-3 px-3">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                    row.status === 'active' ? 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-400' : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400'
                  }`}>{row.status === 'active' ? 'Active' : 'Resolved'}</span>
                </td>
              </tr>
            ))}
          </DrilldownTable>
        )}

        {categoryId === 'ntbt' && (
          <DrilldownTable headers={['Vehicle', 'Hold Reason', 'Authority', 'Date', 'Case Ref', 'Status']}>
            {sortedNtbt.length === 0 ? emptyRow(6) : sortedNtbt.map(row => (
              <tr key={row.vehicleNumber} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                <td className="py-3 px-3 font-mono text-xs font-semibold text-stone-900 dark:text-stone-100">{row.vehicleNumber}</td>
                <td className="py-3 px-3 text-stone-600 dark:text-stone-400 max-w-[250px]">{row.holdReason}</td>
                <td className="py-3 px-3 text-stone-600 dark:text-stone-400">{row.issuingAuthority}</td>
                <td className="py-3 px-3 text-stone-600 dark:text-stone-400">{formatDate(row.holdDate)}</td>
                <td className="py-3 px-3 font-mono text-xs text-stone-500 dark:text-stone-400">{row.caseReference}</td>
                <td className="py-3 px-3">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
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
// Fleet Card Drilldown Views
// ---------------------------------------------------------------------------

const CHALLAN_VIOLATIONS: { violation: string; location: string }[] = [
  { violation: 'Overspeeding', location: 'NH-48, Gurugram Toll Plaza' },
  { violation: 'Red Light Violation', location: 'Mahipalpur Junction, Delhi' },
  { violation: 'Overloading', location: 'Yamuna Expressway, KM 45' },
  { violation: 'No Parking', location: 'Connaught Place, New Delhi' },
  { violation: 'Lane Violation', location: 'Ring Road, Delhi' },
  { violation: 'Wrong Way Driving', location: 'NH-24, Lucknow' },
  { violation: 'Document Not Carried', location: 'Outer Ring Road, Bangalore' },
  { violation: 'Using Phone While Driving', location: 'Eastern Express Highway, Mumbai' },
]

type IndividualChallan = {
  id: string
  vehicleNumber: string
  violation: string
  challanNumber: string
  amount: number
  date: string
  location: string
  challanType: 'court' | 'online'
  status: 'pending' | 'paid'
}

function FleetChallanView({
  challanRows,
  vehicles,
  onBack,
}: {
  challanRows: ChallanDrilldownRow[]
  vehicles: Vehicle[]
  onBack: () => void
}) {
  const [filter, setFilter] = useState<'pending' | 'paid'>('pending')
  const [expandedVehicles, setExpandedVehicles] = useState<Set<string>>(new Set())
  const [showProposalToast, setShowProposalToast] = useState(false)
  const [selectedVehiclesInit, setSelectedVehiclesInit] = useState(false)
  const [selectedVehicles, setSelectedVehicles] = useState<Set<string>>(new Set())
  const [selectedChallans, setSelectedChallans] = useState<Set<string>>(new Set())
  const [searchVehicle, setSearchVehicle] = useState('')
  const [challanTypeFilter, setChallanTypeFilter] = useState<'all' | 'court' | 'online'>('all')

  const toggleSelectChallan = (challanId: string) => {
    setSelectedChallans(prev => {
      const next = new Set(prev)
      if (next.has(challanId)) next.delete(challanId)
      else next.add(challanId)
      return next
    })
  }

  const toggleSelectVehicle = (vehNum: string) => {
    setSelectedVehicles(prev => {
      const next = new Set(prev)
      if (next.has(vehNum)) next.delete(vehNum)
      else next.add(vehNum)
      return next
    })
  }

  const toggleSelectAll = () => {
    if (selectedVehicles.size === grouped.length) {
      setSelectedVehicles(new Set())
    } else {
      setSelectedVehicles(new Set(grouped.map(([vehNum]) => vehNum)))
    }
  }

  const toggleVehicle = (vehNum: string) => {
    setExpandedVehicles(prev => {
      const next = new Set(prev)
      if (next.has(vehNum)) next.delete(vehNum)
      else next.add(vehNum)
      return next
    })
  }

  const allChallans = useMemo<IndividualChallan[]>(() => {
    const result: IndividualChallan[] = []
    let idx = 0
    const paidAmounts = [2000, 3500, 5000, 1500, 4000, 8000, 2500, 6000]
    for (const row of challanRows) {
      if (row.outstandingCount > 0) {
        const baseAmt = Math.round(row.totalAmount / row.outstandingCount / 500) * 500 || 2000
        for (let i = 0; i < row.outstandingCount; i++) {
          const m = CHALLAN_VIOLATIONS[idx % CHALLAN_VIOLATIONS.length]
          const isLast = i === row.outstandingCount - 1
          const amount = isLast ? row.totalAmount - baseAmt * (row.outstandingCount - 1) : baseAmt
          const base = new Date(row.latestDate || '2026-02-15')
          base.setDate(base.getDate() - i * 12)
          result.push({
            id: `pend-${idx}`,
            vehicleNumber: row.vehicleNumber,
            violation: m.violation,
            challanNumber: `CH${row.vehicleNumber.replace(/[^0-9]/g, '').slice(0, 8)}${String(idx + 100)}`,
            amount: Math.max(500, amount),
            date: base.toISOString().split('T')[0],
            location: m.location,
            challanType: i < row.courtCount ? 'court' : 'online',
            status: 'pending',
          })
          idx++
        }
        const paidCount = Math.max(1, Math.floor(row.outstandingCount * 0.4))
        for (let i = 0; i < paidCount; i++) {
          const m = CHALLAN_VIOLATIONS[(idx + 3) % CHALLAN_VIOLATIONS.length]
          result.push({
            id: `paid-${idx}`,
            vehicleNumber: row.vehicleNumber,
            violation: m.violation,
            challanNumber: `CH${row.vehicleNumber.replace(/[^0-9]/g, '').slice(0, 8)}${String(idx + 200)}`,
            amount: paidAmounts[idx % paidAmounts.length],
            date: `2025-${String(7 + (i % 5)).padStart(2, '0')}-${String(5 + ((idx * 3) % 23)).padStart(2, '0')}`,
            location: m.location,
            challanType: i % 2 === 0 ? 'court' : 'online',
            status: 'paid',
          })
          idx++
        }
      }
    }
    return result
  }, [challanRows])

  const filtered = useMemo(() => {
    let result = allChallans.filter(c => c.status === filter)
    if (challanTypeFilter !== 'all') {
      result = result.filter(c => c.challanType === challanTypeFilter)
    }
    return result
  }, [allChallans, filter, challanTypeFilter])

  const grouped = useMemo(() => {
    const map = new Map<string, IndividualChallan[]>()
    for (const c of filtered) {
      const arr = map.get(c.vehicleNumber) || []
      arr.push(c)
      map.set(c.vehicleNumber, arr)
    }
    let entries = Array.from(map.entries())
    if (searchVehicle.trim()) {
      const q = searchVehicle.toLowerCase()
      entries = entries.filter(([vehNum]) => vehNum.toLowerCase().includes(q))
    }
    return entries
  }, [filtered, searchVehicle])

  // Select all vehicles by default on first render
  useEffect(() => {
    if (!selectedVehiclesInit && filter === 'pending' && grouped.length > 0) {
      setSelectedVehicles(new Set(grouped.map(([vehNum]) => vehNum)))
      setSelectedVehiclesInit(true)
    }
  }, [grouped, filter, selectedVehiclesInit])

  const pendingCount = allChallans.filter(c => c.status === 'pending').length
  const paidCount = allChallans.filter(c => c.status === 'paid').length

  const selectedAmount = useMemo(() => {
    if (selectedVehicles.size === 0) return 0
    return filtered
      .filter(c => selectedVehicles.has(c.vehicleNumber))
      .reduce((s, c) => s + c.amount, 0)
  }, [filtered, selectedVehicles])

  const showBottomBar = filter === 'pending' && selectedVehicles.size > 0

  return (
    <div className={`${showBottomBar ? 'pb-20' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-50">All Vehicle Challans</h2>
        <button className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm font-medium text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800 hover:border-stone-300 dark:hover:border-stone-600 transition-colors">
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

      {/* Mobile filter tabs */}
      <div className="flex md:hidden gap-2 mb-5">
        {(['pending', 'paid'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
                : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400'
            }`}
          >
            {f === 'pending' ? `Pending (${pendingCount})` : `Paid (${paidCount})`}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-56 shrink-0 hidden md:block">
          <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-2 space-y-1 sticky top-6">
            {([
              { key: 'pending' as const, label: 'Pending', count: pendingCount, icon: FileText, countColor: 'bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400' },
              { key: 'paid' as const, label: 'Paid', count: paidCount, icon: ShieldCheck, countColor: 'bg-stone-100 dark:bg-stone-800 text-stone-500' },
            ]).map(item => {
              const Icon = item.icon
              const active = filter === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => setFilter(item.key)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  <span className={`inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-bold ${
                    'bg-stone-100 dark:bg-stone-800 text-stone-500'
                  }`}>{item.count}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Search + Type filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 dark:text-stone-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by vehicle number..."
                value={searchVehicle}
                onChange={(e) => setSearchVehicle(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
              />
              {searchVehicle && (
                <button
                  onClick={() => setSearchVehicle('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-1 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg p-1 self-start sm:self-auto shrink-0">
              {(['all', 'court', 'online'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setChallanTypeFilter(type)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                    challanTypeFilter === type
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  {type === 'all' ? 'All Types' : type === 'court' ? 'Court' : 'Online'}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
          {/* Select All — only on pending tab */}
          {filter === 'pending' && grouped.length > 0 && (
            <div className="flex items-center gap-3 px-1">
              <button
                onClick={toggleSelectAll}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                  selectedVehicles.size === grouped.length
                    ? 'bg-emerald-600 border-emerald-600'
                    : selectedVehicles.size > 0
                      ? 'bg-emerald-600/50 border-emerald-600'
                      : 'border-stone-300 dark:border-stone-600 hover:border-stone-400 dark:hover:border-stone-500'
                }`}
              >
                {selectedVehicles.size > 0 && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    {selectedVehicles.size === grouped.length
                      ? <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      : <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                    }
                  </svg>
                )}
              </button>
              <span className="text-sm font-medium text-stone-600 dark:text-stone-400">
                {selectedVehicles.size === 0
                  ? 'Select vehicles to request proposal'
                  : `${selectedVehicles.size} of ${grouped.length} selected`}
              </span>
            </div>
          )}

          {grouped.map(([vehNum, challans]) => {
            const vehicle = vehicles.find(v => v.vehicleNumber === vehNum)
            const isExpanded = expandedVehicles.has(vehNum)
            const vehicleTotal = challans.reduce((s, c) => s + c.amount, 0)
            const isSelected = selectedVehicles.has(vehNum)
            return (
              <div key={vehNum} className={`rounded-2xl bg-white dark:bg-stone-900 shadow-sm border overflow-hidden transition-colors ${
                isSelected && filter === 'pending' ? 'border-emerald-400 dark:border-emerald-600' : 'border-stone-200 dark:border-stone-800'
              }`}>
                <div className="flex items-center p-4 hover:bg-stone-50 dark:hover:bg-stone-800/30 transition-colors">
                  {/* Checkbox — only on pending tab */}
                  {filter === 'pending' && (
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleSelectVehicle(vehNum) }}
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mr-3 transition-colors ${
                        isSelected
                          ? 'bg-emerald-600 border-emerald-600'
                          : 'border-stone-300 dark:border-stone-600 hover:border-stone-400 dark:hover:border-stone-500'
                      }`}
                    >
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  )}
                  <button
                    onClick={() => toggleVehicle(vehNum)}
                    className="flex-1 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center flex-shrink-0">
                        <Truck className="w-5 h-5 text-stone-400" />
                      </div>
                      <div className="text-left">
                        <p className="font-mono font-bold text-stone-900 dark:text-stone-100">{vehNum}</p>
                        <p className="text-sm text-stone-500 dark:text-stone-400">
                          {vehicle ? `${vehicle.make} ${vehicle.model} · Reg. ${vehicle.year}` : '—'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className={`text-sm font-bold tabular-nums ${filter === 'pending' ? 'text-amber-700 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                          {formatCurrency(vehicleTotal)}
                        </p>
                        <p className="text-xs text-stone-400 dark:text-stone-500">{challans.length} {filter === 'pending' ? 'pending' : 'paid'}</p>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-stone-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                    </div>
                  </button>
                </div>
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-stone-200 dark:border-stone-800">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 pt-4">
                      {challans.map(c => (
                        <div key={c.id} className={`rounded-xl border bg-white dark:bg-stone-900 p-5 transition-colors ${
                          selectedChallans.has(c.id) && filter === 'pending' ? 'border-emerald-400 dark:border-emerald-600' : 'border-stone-200 dark:border-stone-800'
                        }`}>
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2.5">
                              {filter === 'pending' && (
                                <button
                                  onClick={(e) => { e.stopPropagation(); toggleSelectChallan(c.id) }}
                                  className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                    selectedChallans.has(c.id)
                                      ? 'bg-emerald-600 border-emerald-600'
                                      : 'border-stone-300 dark:border-stone-600 hover:border-stone-400 dark:hover:border-stone-500'
                                  }`}
                                >
                                  {selectedChallans.has(c.id) && (
                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </button>
                              )}
                              <div className="flex items-center gap-1.5">
                                <p className="text-sm font-mono font-bold text-stone-900 dark:text-stone-100">{c.challanNumber}</p>
                                <button
                                  onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(c.challanNumber) }}
                                  className="p-1 rounded hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors"
                                >
                                  <Copy className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                            <span className="text-lg font-bold tabular-nums text-red-600 dark:text-red-400">
                              {formatCurrency(c.amount)}
                            </span>
                          </div>
                          <p className="text-sm text-stone-500 dark:text-stone-400 mt-2">{c.violation}</p>
                          <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-stone-500 dark:text-stone-400 mt-2 mb-4">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatDate(c.date)}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5" />
                              {c.location}
                            </span>
                          </div>
                          <div className="border-t border-stone-200 dark:border-stone-700 pt-3 flex items-center justify-between">
                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                              c.challanType === 'court'
                                ? 'bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400'
                                : 'bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400'
                            }`}>
                              {c.challanType === 'court' ? 'Court Challans' : 'Online Challans'}
                            </span>
                            {filter === 'pending' && (
                              <button className="px-5 py-2 rounded-full text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors shadow-sm">
                                Pay Now
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
          {grouped.length === 0 && (
            <div className="text-center py-16">
              <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto mb-3">
                <CreditCard className="w-5 h-5 text-stone-400 dark:text-stone-500" />
              </div>
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">No {filter} challans</p>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">No {filter} challans found for any vehicle</p>
            </div>
          )}
          </div>
        </div>
      </div>

      {showBottomBar && (
        <div className="fixed bottom-0 left-0 right-0 z-30 px-4 sm:px-6 lg:px-8 py-4 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div>
              <p className="text-xs font-medium text-amber-700 dark:text-amber-400">
                {selectedVehicles.size} {selectedVehicles.size === 1 ? 'vehicle' : 'vehicles'} selected
              </p>
              <p className="text-xl font-bold text-stone-900 dark:text-stone-100">{formatCurrency(selectedAmount)} <span className="text-sm font-medium text-stone-500 dark:text-stone-400">+ GST</span></p>
            </div>
            <button
              onClick={() => setShowProposalToast(true)}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-sm font-medium text-white transition-colors shadow-sm"
            >
              Request Proposal
            </button>
          </div>
        </div>
      )}

      <ProposalToast show={showProposalToast} onClose={() => setShowProposalToast(false)} />
    </div>
  )
}

function FleetRcView({
  rcRows,
  vehicles,
  onBack,
}: {
  rcRows: RcDrilldownRow[]
  vehicles: Vehicle[]
  onBack: () => void
}) {
  const [filter, setFilter] = useState<'valid' | 'expiring' | 'invalid'>('expiring')
  const [showProposalToast, setShowProposalToast] = useState(false)

  const validItems = rcRows.filter(r => r.status === 'valid')
  const expiringItems = rcRows.filter(r => r.status === 'expiring')
  const invalidItems = rcRows.filter(r => r.status === 'expired')
  const filtered = filter === 'valid' ? validItems : filter === 'expiring' ? expiringItems : invalidItems

  return (
    <div className={`${(filter === 'expiring' && expiringItems.length > 0) || (filter === 'invalid' && invalidItems.length > 0) ? 'pb-20' : ''}`}>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-50">Registration Certificates</h2>
      </div>

      {/* Mobile tabs */}
      <div className="flex md:hidden gap-2 mb-5">
        {(['expiring', 'valid', 'invalid'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
                : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400'
            }`}
          >
            {f === 'valid' ? `Valid (${validItems.length})` : f === 'invalid' ? `Invalid (${invalidItems.length})` : `Expiring (${expiringItems.length})`}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-56 shrink-0 hidden md:block">
          <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-2 space-y-1 sticky top-6">
            {([
              { key: 'expiring' as const, label: 'Expiring', count: expiringItems.length, countColor: 'bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400' },
              { key: 'valid' as const, label: 'Valid', count: validItems.length, countColor: 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400' },
              { key: 'invalid' as const, label: 'Invalid', count: invalidItems.length, countColor: 'bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400' },
            ]).map(item => {
              const active = filter === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => setFilter(item.key)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className={`inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-bold ${
                    'bg-stone-100 dark:bg-stone-800 text-stone-500'
                  }`}>{item.count}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filtered.map(row => {
              const vehicle = vehicles.find(v => v.vehicleNumber === row.vehicleNumber)
              const badge = DOC_STATUS_BADGE[row.status]
              return (
                <div key={row.vehicleNumber} className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                        <Truck className="w-4 h-4 text-stone-400" />
                      </div>
                      <div>
                        <p className="font-mono font-bold text-sm text-stone-900 dark:text-stone-100">{row.vehicleNumber}</p>
                        <p className="text-xs text-stone-400 dark:text-stone-500">{vehicle ? `${vehicle.make} ${vehicle.model}` : '—'}</p>
                      </div>
                    </div>
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
                      {badge.label}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-stone-400 dark:text-stone-500 mb-0.5">Issue Date</p>
                      <p className="text-sm font-medium text-stone-700 dark:text-stone-300">{formatDate(row.issueDate)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-stone-400 dark:text-stone-500 mb-0.5">Expiry Date</p>
                      <p className="text-sm font-medium text-stone-700 dark:text-stone-300">{formatDate(row.expiryDate)}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-stone-400 dark:text-stone-500 mb-0.5">RTO Office</p>
                      <p className="text-sm font-medium text-stone-700 dark:text-stone-300">{row.rtoOffice}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto mb-3">
                <FileText className="w-5 h-5 text-stone-400 dark:text-stone-500" />
              </div>
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">No {filter} certificates</p>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">No {filter} registration certificates found</p>
            </div>
          )}
        </div>
      </div>

      {filter === 'expiring' && expiringItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 px-4 sm:px-6 lg:px-8 py-4 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div>
              <p className="text-xs font-medium text-amber-600 dark:text-amber-400">Expiring Registration Certificates</p>
              <p className="text-xl font-bold text-stone-900 dark:text-stone-100">{expiringItems.length} vehicles</p>
            </div>
            <button
              onClick={() => setShowProposalToast(true)}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-sm font-medium text-white transition-colors shadow-sm"
            >
              Request Proposal
            </button>
          </div>
        </div>
      )}
      {filter === 'invalid' && invalidItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 px-4 sm:px-6 lg:px-8 py-4 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div>
              <p className="text-xs font-medium text-red-600 dark:text-red-400">Invalid Registration Certificates</p>
              <p className="text-xl font-bold text-stone-900 dark:text-stone-100">{invalidItems.length} vehicles</p>
            </div>
            <button
              onClick={() => setShowProposalToast(true)}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-sm font-medium text-white transition-colors shadow-sm"
            >
              Request Proposal
            </button>
          </div>
        </div>
      )}
      <ProposalToast show={showProposalToast} onClose={() => setShowProposalToast(false)} />
    </div>
  )
}

function FleetDlView({
  dlRows,
  drivers,
  onBack,
}: {
  dlRows: DlDrilldownRow[]
  drivers: Driver[]
  onBack: () => void
}) {
  const [filter, setFilter] = useState<'valid' | 'invalid' | 'expiring'>('expiring')
  const [showProposalToast, setShowProposalToast] = useState(false)

  const validItems = dlRows.filter(r => r.status === 'valid')
  const expiringItems = dlRows.filter(r => r.status === 'expiring')
  const invalidItems = dlRows.filter(r => r.status === 'expired')
  const filtered = filter === 'valid' ? validItems : filter === 'invalid' ? invalidItems : expiringItems

  return (
    <div className={`${(filter === 'expiring' && expiringItems.length > 0) || (filter === 'invalid' && invalidItems.length > 0) ? 'pb-20' : ''}`}>
      <div className="mb-6">
        <h2 className="text-xl font-bold text-stone-900 dark:text-stone-50">Driving Licenses</h2>
      </div>

      {/* Mobile tabs */}
      <div className="flex md:hidden gap-2 mb-5">
        {(['expiring', 'valid', 'invalid'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
                : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400'
            }`}
          >
            {f === 'valid' ? `Valid (${validItems.length})` : f === 'invalid' ? `Invalid (${invalidItems.length})` : `Expiring (${expiringItems.length})`}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-56 shrink-0 hidden md:block">
          <div className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-2 space-y-1 sticky top-6">
            {([
              { key: 'expiring' as const, label: 'Expiring', count: expiringItems.length, countColor: 'bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400' },
              { key: 'valid' as const, label: 'Valid', count: validItems.length, countColor: 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400' },
              { key: 'invalid' as const, label: 'Invalid', count: invalidItems.length, countColor: 'bg-red-100 dark:bg-red-950/50 text-red-600 dark:text-red-400' },
            ]).map(item => {
              const active = filter === item.key
              return (
                <button
                  key={item.key}
                  onClick={() => setFilter(item.key)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    active
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400'
                      : 'text-stone-600 dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className={`inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full text-xs font-bold ${
                    'bg-stone-100 dark:bg-stone-800 text-stone-500'
                  }`}>{item.count}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filtered.map(row => {
              const driver = drivers.find(d => d.licenseNumber === row.licenseNumber)
              const badge = DOC_STATUS_BADGE[row.status]
              return (
                <div key={row.licenseNumber} className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                        <User className="w-4 h-4 text-stone-400 dark:text-stone-500" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-stone-900 dark:text-stone-100">{row.driverName}</p>
                        <p className="text-xs text-stone-400 dark:text-stone-500">{driver?.phone ? `+${driver.phone}` : '—'}</p>
                      </div>
                    </div>
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
                      {badge.label}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-stone-400 dark:text-stone-500 mb-0.5">License Number</p>
                      <p className="text-sm font-mono font-medium text-stone-700 dark:text-stone-300">{row.licenseNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-stone-400 dark:text-stone-500 mb-0.5">Expiry Date</p>
                      <p className="text-sm font-medium text-stone-700 dark:text-stone-300">{formatDate(row.expiryDate)}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="w-12 h-12 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto mb-3">
                <IdCard className="w-5 h-5 text-stone-400 dark:text-stone-500" />
              </div>
              <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">No {filter} licenses</p>
              <p className="text-sm text-stone-500 dark:text-stone-400 mt-1">No {filter} driving licenses found</p>
            </div>
          )}
        </div>
      </div>

      {filter === 'expiring' && expiringItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 px-4 sm:px-6 lg:px-8 py-4 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div>
              <p className="text-xs font-medium text-amber-600 dark:text-amber-400">Expiring Driving Licenses</p>
              <p className="text-xl font-bold text-stone-900 dark:text-stone-100">{expiringItems.length} drivers</p>
            </div>
            <button
              onClick={() => setShowProposalToast(true)}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-sm font-medium text-white transition-colors shadow-sm"
            >
              Request Proposal
            </button>
          </div>
        </div>
      )}
      {filter === 'invalid' && invalidItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-30 px-4 sm:px-6 lg:px-8 py-4 bg-white dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div>
              <p className="text-xs font-medium text-red-600 dark:text-red-400">Invalid Driving Licenses</p>
              <p className="text-xl font-bold text-stone-900 dark:text-stone-100">{invalidItems.length} drivers</p>
            </div>
            <button
              onClick={() => setShowProposalToast(true)}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-sm font-medium text-white transition-colors shadow-sm"
            >
              Request Proposal
            </button>
          </div>
        </div>
      )}
      <ProposalToast show={showProposalToast} onClose={() => setShowProposalToast(false)} />
    </div>
  )
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export function ComplianceDashboard({
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
  initialView,
}: ComplianceDashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | null>(null)
  const [datePreset, setDatePreset] = useState<DateRangePreset>('last6Months')
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false)
  const [scope, setScope] = useState<ScopeFilter>(initialView === 'vehicle' ? 'vehicle' : 'fleet')
  const [scopeSearch, setScopeSearch] = useState('')
  const [scopeDropdownOpen, setScopeDropdownOpen] = useState(false)
  const [selectedScopeId, setSelectedScopeId] = useState<string | null>(initialView === 'vehicle' ? vehicles[0]?.id || null : null)
  const [scopeApplied, setScopeApplied] = useState(initialView === 'vehicle')
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set())
  const [urgencyPage, setUrgencyPage] = useState(0)
  const [urgencySortKey, setUrgencySortKey] = useState<'vehicleNumber' | 'documentType' | 'expiryDate' | null>(null)
  const [urgencySortDir, setUrgencySortDir] = useState<'asc' | 'desc'>('asc')
  const [checkVehicleOpen, setCheckVehicleOpen] = useState(false)
  const [checkVehicleNumber, setCheckVehicleNumber] = useState('')
  const [activeCardView, setActiveCardView] = useState<'dl' | 'rc' | 'challan' | null>(
    initialView === 'dl' || initialView === 'rc' || initialView === 'challan' ? initialView : null
  )
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

  const sortedUrgencyItems = useMemo(() => {
    if (!urgencySortKey) return expiryUrgencyItems
    const sorted = [...expiryUrgencyItems].sort((a, b) => {
      let cmp = 0
      if (urgencySortKey === 'vehicleNumber') cmp = a.vehicleNumber.localeCompare(b.vehicleNumber)
      else if (urgencySortKey === 'documentType') cmp = a.documentType.localeCompare(b.documentType)
      else if (urgencySortKey === 'expiryDate') cmp = new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
      return urgencySortDir === 'asc' ? cmp : -cmp
    })
    return sorted
  }, [expiryUrgencyItems, urgencySortKey, urgencySortDir])

  const urgencyTotalPages = Math.ceil(sortedUrgencyItems.length / URGENCY_PAGE_SIZE)
  const paginatedUrgencyItems = useMemo(
    () => sortedUrgencyItems.slice(urgencyPage * URGENCY_PAGE_SIZE, (urgencyPage + 1) * URGENCY_PAGE_SIZE),
    [sortedUrgencyItems, urgencyPage]
  )

  function handleUrgencySort(key: 'vehicleNumber' | 'documentType' | 'expiryDate') {
    if (urgencySortKey === key) {
      setUrgencySortDir(d => d === 'asc' ? 'desc' : 'asc')
    } else {
      setUrgencySortKey(key)
      setUrgencySortDir('asc')
    }
    setUrgencyPage(0)
  }

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

  const handleCheckVehicle = () => {
    if (!checkVehicleNumber) return
    const cleaned = checkVehicleNumber.replace(/[^a-zA-Z0-9]/g, '').toUpperCase()
    const found = vehicles.find(v => v.vehicleNumber.replace(/[^a-zA-Z0-9]/g, '').toUpperCase() === cleaned)
    const target = found ?? vehicles[0]
    if (!target) return
    setCheckVehicleOpen(false)
    setCheckVehicleNumber('')
    setScope('vehicle')
    setSelectedScopeId(target.id)
    setScopeApplied(true)
    onScopeChange?.('vehicle', target.id)
  }

  // Compute compliance health score from categories
  const complianceScore = useMemo(() => {
    if (categories.length === 0) return { overall: 0, change: 0, status: 'critical' as ComplianceStatus }
    const overall = Math.round(categories.reduce((sum, cat) => sum + cat.percentage, 0) / categories.length)
    const status: ComplianceStatus = overall >= 70 ? 'healthy' : overall >= 50 ? 'warning' : 'critical'
    // change would come from comparing with previous month data — for now derived from monthlyTrend
    const trendLen = monthlyTrend.length
    const previousMonth = trendLen >= 2 ? monthlyTrend[trendLen - 2].score : overall
    const change = overall - previousMonth
    return { overall, change, status }
  }, [categories, monthlyTrend])

  const changeIsPositive = complianceScore.change >= 0

  return (
    <div className="bg-stone-100 dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* ---------------------------------------------------------------- */}
        {/* Top Bar: Filters — hidden during card drilldowns                 */}
        {/* ---------------------------------------------------------------- */}
        {!activeCardView && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">Fleet Overview</h1>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
          {/* Refresh */}
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-stone-300 dark:hover:border-stone-600 transition-colors text-sm font-medium text-stone-700 dark:text-stone-300"
            >
              <RefreshCw className="w-4 h-4 text-stone-400" />
              <span className="hidden sm:inline">Refresh</span>
            </button>

          {/* Download PDF */}
            <button
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-stone-300 dark:hover:border-stone-600 transition-colors text-sm font-medium text-stone-700 dark:text-stone-300"
            >
              <Download className="w-4 h-4 text-stone-400" />
              <span className="hidden sm:inline">Download PDF</span>
            </button>

          {/* Date Range Filter */}
            <div className="relative">
              <button
                onClick={() => { setDateDropdownOpen(!dateDropdownOpen); setScopeDropdownOpen(false) }}
                className="flex items-center gap-2 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 hover:border-stone-300 dark:hover:border-stone-600 transition-colors text-sm"
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
        )}


        {/* Back button — vehicle view */}
        {scope === 'vehicle' && (
        <button
          onClick={() => {
            setScope('fleet')
            setSelectedScopeId(null)
            setScopeApplied(false)
          }}
          className="inline-flex items-center gap-1.5 mb-5 px-3 py-1.5 rounded-xl text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Fleet
        </button>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* Drill-down View                                                  */}
        {/* ---------------------------------------------------------------- */}
        {activeCardView ? (
          activeCardView === 'challan' ? (
            <FleetChallanView challanRows={categoryDrilldowns.challans} vehicles={vehicles} onBack={() => setActiveCardView(null)} />
          ) : activeCardView === 'rc' ? (
            <FleetRcView rcRows={categoryDrilldowns.rc} vehicles={vehicles} onBack={() => setActiveCardView(null)} />
          ) : (
            <FleetDlView dlRows={categoryDrilldowns.dl} drivers={drivers} onBack={() => setActiveCardView(null)} />
          )
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
                <div className="rounded-2xl bg-white dark:bg-stone-900 shadow-md shadow-stone-200/60 dark:shadow-stone-950/40">
                  {/* Header */}
                  <div className="px-5 sm:px-6 pt-5 sm:pt-6 pb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-widest">
                        Fleet Compliance Score
                      </h2>
                      <div className="relative group">
                        <Info className="w-3.5 h-3.5 text-stone-400 cursor-help" />
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 px-3 py-2.5 rounded-lg bg-stone-900 dark:bg-stone-100 text-xs text-stone-200 dark:text-stone-700 leading-relaxed shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-30 pointer-events-none">
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-stone-900 dark:border-b-stone-100" />
                          <p className="font-semibold text-white dark:text-stone-900 mb-1">How is this calculated?</p>
                          <p>Average of compliance % across all {categories.length} categories: RC, Insurance, PUCC, Permits, DL, Challans, Blacklisted & NTBT.</p>
                        </div>
                      </div>
                    </div>
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
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
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
                { label: 'Status', value: v.status, badge: true, badgeColor: v.status === 'Active' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400' : v.status === 'Maintenance' ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400' : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400' },
              ]
              return (
                <div className="mb-6 rounded-2xl bg-white dark:bg-stone-900 shadow-md shadow-stone-200/60 dark:shadow-stone-950/40 p-5 sm:p-6">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {details.map(d => (
                      <div key={d.label} className="rounded-xl bg-stone-50 dark:bg-stone-800/40 p-4">
                        <p className="text-[11px] uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-1.5">{d.label}</p>
                        {d.badge ? (
                          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${d.badgeColor}`}>{d.value}</span>
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
                  <div className="flex items-center gap-5">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-0.5 rounded-full bg-teal-500 dark:bg-teal-400 inline-block" />
                      <span className="text-xs text-stone-500 dark:text-stone-400">Challan Count</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-0.5 rounded-full bg-red-500 dark:bg-red-400 inline-block" />
                      <span className="text-xs text-stone-500 dark:text-stone-400">Total Amount</span>
                    </div>
                  </div>
                </div>
                <TrendChart
                  data={monthlyChallanTrend ? monthlyChallanTrend.map(d => ({ month: d.month, score: d.count })) : monthlyTrend}
                  extraData={monthlyChallanTrend?.map(d => ({ online: d.online, court: d.court, amount: d.amount }))}
                  secondaryData={monthlyChallanTrend?.map(d => ({ month: d.month, score: d.amount }))}
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
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* Expiry Urgency Table                                            */}
            {/* -------------------------------------------------------------- */}
            <div className="rounded-2xl bg-white dark:bg-stone-900 shadow-md shadow-stone-200/60 dark:shadow-stone-950/40 overflow-hidden">
              <div className="px-5 sm:px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-900 dark:text-stone-50 uppercase tracking-wider">Documents Expiry</h3>
                <span className="text-xs text-stone-400 dark:text-stone-500">{expiryUrgencyItems.length} items</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60">
                      <th
                        onClick={() => handleUrgencySort('vehicleNumber')}
                        className="text-left py-3 px-4 sm:px-6 text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider w-[18%] cursor-pointer select-none hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
                      >
                        Vehicle
                        <span className="ml-1 text-[10px]">{urgencySortKey === 'vehicleNumber' ? (urgencySortDir === 'asc' ? '▲' : '▼') : '⇅'}</span>
                      </th>
                      <th
                        onClick={() => handleUrgencySort('documentType')}
                        className="text-left py-3 px-3 text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider w-[14%] cursor-pointer select-none hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
                      >
                        Document
                        <span className="ml-1 text-[10px]">{urgencySortKey === 'documentType' ? (urgencySortDir === 'asc' ? '▲' : '▼') : '⇅'}</span>
                      </th>
                      <th
                        onClick={() => handleUrgencySort('expiryDate')}
                        className="text-left py-3 px-3 text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider w-[16%] cursor-pointer select-none hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
                      >
                        Expiry Date
                        <span className="ml-1 text-[10px]">{urgencySortKey === 'expiryDate' ? (urgencySortDir === 'asc' ? '▲' : '▼') : '⇅'}</span>
                      </th>
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
                            <span className="font-semibold text-stone-900 dark:text-stone-100">
                              {Math.abs(item.daysRemaining)} Days
                            </span>
                          </td>
                          <td className="py-3 px-3">
                            <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>{badge.label}</span>
                          </td>
                          <td className="py-3 px-4 sm:px-6 text-right">
                            <button
                              onClick={() => {
                                if (window.parent !== window) {
                                  window.parent.postMessage({ type: 'navigate', href: '/incidents', params: { vehicle: item.vehicleNumber, document: item.documentType } }, '*')
                                }
                              }}
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors whitespace-nowrap"
                            >
                              Create Request
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
                <div className="px-5 sm:px-6 py-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    Showing {urgencyPage * URGENCY_PAGE_SIZE + 1}–{Math.min((urgencyPage + 1) * URGENCY_PAGE_SIZE, expiryUrgencyItems.length)} of {expiryUrgencyItems.length}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setUrgencyPage(p => Math.max(0, p - 1))}
                      disabled={urgencyPage === 0}
                      className="w-8 h-8 rounded-xl flex items-center justify-center border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4 text-stone-600 dark:text-stone-400" />
                    </button>
                    {Array.from({ length: urgencyTotalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setUrgencyPage(i)}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-semibold transition-colors ${
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
                      className="w-8 h-8 rounded-xl flex items-center justify-center border border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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

      {/* Check Vehicle Modal */}
      {checkVehicleOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4">
          <div className="fixed inset-0 bg-black/50 dark:bg-black/70" onClick={() => { setCheckVehicleOpen(false); setCheckVehicleNumber(''); setCheckVehicleError('') }} />
          <div className="relative w-full max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl my-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
              <div>
                <h2 className="text-base font-bold text-stone-900 dark:text-stone-50">Check Vehicle</h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">Enter a vehicle number to view its compliance report</p>
              </div>
              <button
                onClick={() => { setCheckVehicleOpen(false); setCheckVehicleNumber(''); setCheckVehicleError('') }}
                className="p-2 rounded-xl text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-6 py-5">
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 uppercase tracking-wider mb-2">
                Vehicle Number
              </label>
              <input
                type="text"
                value={checkVehicleNumber}
                onChange={e => {
                  setCheckVehicleNumber(e.target.value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 10))
                  setCheckVehicleError('')
                }}
                onKeyDown={e => { if (e.key === 'Enter') handleCheckVehicle() }}
                placeholder="Enter vehicle number"
                maxLength={10}
                className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm text-stone-900 dark:text-stone-100 placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-400 dark:focus:border-emerald-600 transition-colors"
                autoFocus
              />
            </div>
            <div className="flex items-center justify-end gap-2 px-6 py-4 border-t border-stone-200 dark:border-stone-800">
              <button
                onClick={() => { setCheckVehicleOpen(false); setCheckVehicleNumber(''); setCheckVehicleError('') }}
                className="px-4 py-2 rounded-xl text-sm font-medium text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCheckVehicle}
                className="px-5 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Check
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
