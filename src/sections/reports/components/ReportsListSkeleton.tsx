export function ReportsListSkeleton() {
  return (
    <div
      className="min-h-screen bg-stone-100 dark:bg-stone-950 motion-safe:animate-pulse"
      aria-busy="true"
      role="status"
    >
      <span className="sr-only">Loading reports</span>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="h-6 w-40 rounded bg-stone-200 dark:bg-stone-800" />
          <div className="h-3 w-64 rounded bg-stone-200 dark:bg-stone-800" />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-stone-200 dark:border-stone-800">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-9 w-28 rounded-t-lg bg-stone-200 dark:bg-stone-800 mb-[-1px]" />
          ))}
        </div>

        {/* Search bar */}
        <div className="h-11 w-full sm:max-w-md rounded-xl bg-stone-200 dark:bg-stone-800" />

        {/* Reports grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-12 h-12 rounded-xl bg-stone-200 dark:bg-stone-800 flex-shrink-0" />
                <div className="h-6 w-16 rounded bg-stone-200 dark:bg-stone-800" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-3/4 rounded bg-stone-200 dark:bg-stone-800" />
                <div className="h-3 w-full rounded bg-stone-200 dark:bg-stone-800" />
                <div className="h-3 w-5/6 rounded bg-stone-200 dark:bg-stone-800" />
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800/60">
                <div className="h-3 w-24 rounded bg-stone-200 dark:bg-stone-800" />
                <div className="flex gap-1.5">
                  <div className="w-7 h-7 rounded-lg bg-stone-200 dark:bg-stone-800" />
                  <div className="w-7 h-7 rounded-lg bg-stone-200 dark:bg-stone-800" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
