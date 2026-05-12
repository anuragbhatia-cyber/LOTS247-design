export function IncidentManagementSkeleton() {
  return (
    <div
      className="min-h-screen bg-stone-100 dark:bg-stone-950 motion-safe:animate-pulse"
      aria-busy="true"
      role="status"
    >
      <span className="sr-only">Loading incidents</span>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-6 w-48 rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-3 w-72 rounded bg-stone-200 dark:bg-stone-800" />
          </div>
          <div className="flex gap-2">
            <div className="h-9 w-32 rounded-xl bg-stone-200 dark:bg-stone-800" />
            <div className="h-9 w-36 rounded-xl bg-stone-200 dark:bg-stone-800" />
          </div>
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 space-y-2"
            >
              <div className="h-3 w-24 rounded bg-stone-200 dark:bg-stone-800" />
              <div className="h-6 w-16 rounded bg-stone-200 dark:bg-stone-800" />
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-stone-200 dark:border-stone-800">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-9 w-24 rounded-t-lg bg-stone-200 dark:bg-stone-800 mb-[-1px]" />
          ))}
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden">
          <div className="hidden sm:grid grid-cols-6 gap-4 px-6 py-3 border-b border-stone-100 dark:border-stone-800/60 bg-stone-50 dark:bg-stone-900/50">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-3 w-20 rounded bg-stone-200 dark:bg-stone-800" />
            ))}
          </div>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="grid grid-cols-2 sm:grid-cols-6 gap-4 px-4 sm:px-6 py-4 border-b border-stone-100 dark:border-stone-800/60 last:border-b-0"
            >
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
