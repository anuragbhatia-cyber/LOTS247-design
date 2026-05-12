export function VehicleListSkeleton() {
  return (
    <div
      className="min-h-screen bg-stone-100 dark:bg-stone-950 motion-safe:animate-pulse"
      aria-busy="true"
      role="status"
    >
      <span className="sr-only">Loading fleet</span>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-6 w-40 rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-3 w-56 rounded bg-stone-200 dark:bg-stone-800" />
          </div>
          <div className="flex gap-2">
            <div className="h-10 w-36 rounded-xl bg-stone-200 dark:bg-stone-800" />
            <div className="h-10 w-36 rounded-xl bg-stone-300 dark:bg-stone-700" />
          </div>
        </div>

        {/* Search + filter pills */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="h-11 flex-1 rounded-xl bg-stone-200 dark:bg-stone-800" />
          <div className="flex gap-2">
            {[20, 28, 24].map((w, i) => (
              <div key={i} className="h-11 rounded-xl bg-stone-200 dark:bg-stone-800" style={{ width: `${w * 4}px` }} />
            ))}
          </div>
        </div>

        {/* Vehicle list — table */}
        <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden">
          <div className="hidden sm:grid grid-cols-7 gap-4 px-6 py-3 border-b border-stone-100 dark:border-stone-800/60 bg-stone-50 dark:bg-stone-900/50">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-3 w-20 rounded bg-stone-200 dark:bg-stone-800" />
            ))}
          </div>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className="grid grid-cols-2 sm:grid-cols-7 gap-4 px-4 sm:px-6 py-4 border-b border-stone-100 dark:border-stone-800/60 last:border-b-0 items-center"
            >
              <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                <div className="w-9 h-9 rounded-lg bg-stone-200 dark:bg-stone-800 flex-shrink-0" />
                <div className="h-3.5 flex-1 rounded bg-stone-200 dark:bg-stone-800" />
              </div>
              {[0, 1, 2, 3, 4, 5].map((j) => (
                <div key={j} className="h-3.5 rounded bg-stone-200 dark:bg-stone-800" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
