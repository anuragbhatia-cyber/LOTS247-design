/**
 * Skeleton for the Fleet Overview view of ComplianceDashboard.
 * Mirrors the major layout chunks so the real dashboard mount is a low-flash transition.
 *
 * Use as a loading placeholder while category/insight/urgency data fetches.
 */
export function ComplianceDashboardSkeleton() {
  return (
    <div className="bg-stone-100 dark:bg-stone-950 motion-safe:animate-pulse" aria-busy="true" role="status">
      <span className="sr-only">Loading fleet dashboard</span>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Top bar: heading + filter buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="h-6 w-40 rounded bg-stone-200 dark:bg-stone-800" />
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="h-9 w-9 sm:w-28 rounded-xl bg-stone-200 dark:bg-stone-800" />
            <div className="h-9 w-9 sm:w-36 rounded-xl bg-stone-200 dark:bg-stone-800" />
            <div className="h-9 w-32 sm:w-40 rounded-xl bg-stone-200 dark:bg-stone-800" />
          </div>
        </div>

        {/* Hero: Compliance Score card */}
        <div className="mb-8 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="h-3 w-40 rounded bg-stone-200 dark:bg-stone-800" />
              <div className="h-10 w-32 rounded bg-stone-200 dark:bg-stone-800" />
              <div className="h-3 w-48 rounded bg-stone-200 dark:bg-stone-800" />
            </div>
            {/* Score ring placeholder */}
            <div className="w-32 h-32 rounded-full bg-stone-200 dark:bg-stone-800 flex-shrink-0" />
          </div>
        </div>

        {/* Categories grid — 4 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-stone-200 dark:bg-stone-800" />
                <div className="h-5 w-12 rounded bg-stone-200 dark:bg-stone-800" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-24 rounded bg-stone-200 dark:bg-stone-800" />
                <div className="h-7 w-16 rounded bg-stone-200 dark:bg-stone-800" />
              </div>
              {/* Progress bar */}
              <div className="h-2 w-full rounded-full bg-stone-200 dark:bg-stone-800" />
              <div className="h-3 w-28 rounded bg-stone-200 dark:bg-stone-800" />
            </div>
          ))}
        </div>

        {/* Two-up: trend chart + side card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div className="lg:col-span-2 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="h-4 w-44 rounded bg-stone-200 dark:bg-stone-800" />
              <div className="h-3 w-20 rounded bg-stone-200 dark:bg-stone-800" />
            </div>
            {/* Bar chart placeholder — 6 columns */}
            <div className="flex items-end gap-3 h-40">
              {[60, 80, 50, 90, 70, 85].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-stone-200 dark:bg-stone-800"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 sm:p-6 space-y-4">
            <div className="h-4 w-36 rounded bg-stone-200 dark:bg-stone-800" />
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-stone-200 dark:bg-stone-800" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3 w-3/4 rounded bg-stone-200 dark:bg-stone-800" />
                  <div className="h-2.5 w-1/2 rounded bg-stone-200 dark:bg-stone-800" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expiry Urgency table */}
        <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden">
          <div className="px-5 sm:px-6 py-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div className="h-4 w-44 rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-3 w-16 rounded bg-stone-200 dark:bg-stone-800" />
          </div>
          {/* Table header */}
          <div className="hidden sm:grid grid-cols-5 gap-4 px-6 py-3 border-b border-stone-100 dark:border-stone-800/60 bg-stone-50 dark:bg-stone-900/50">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-3 w-20 rounded bg-stone-200 dark:bg-stone-800" />
            ))}
          </div>
          {/* Rows */}
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="grid grid-cols-2 sm:grid-cols-5 gap-4 px-5 sm:px-6 py-4 border-b border-stone-100 dark:border-stone-800/60 last:border-b-0"
            >
              {[0, 1, 2, 3, 4].map((j) => (
                <div key={j} className="h-3.5 rounded bg-stone-200 dark:bg-stone-800" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
