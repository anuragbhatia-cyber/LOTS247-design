export function ChallanListSkeleton() {
  return (
    <div
      className="min-h-screen bg-stone-100 dark:bg-stone-950 motion-safe:animate-pulse"
      aria-busy="true"
      role="status"
    >
      <span className="sr-only">Loading challans</span>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-6 w-32 rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-3 w-56 rounded bg-stone-200 dark:bg-stone-800" />
          </div>
          <div className="h-10 w-32 rounded-xl bg-stone-200 dark:bg-stone-800" />
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 space-y-2"
            >
              <div className="h-3 w-24 rounded bg-stone-200 dark:bg-stone-800" />
              <div className="h-6 w-20 rounded bg-stone-200 dark:bg-stone-800" />
            </div>
          ))}
        </div>

        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="h-11 flex-1 rounded-xl bg-stone-200 dark:bg-stone-800" />
          <div className="flex gap-2">
            <div className="h-11 w-32 rounded-xl bg-stone-200 dark:bg-stone-800" />
            <div className="h-11 w-32 rounded-xl bg-stone-200 dark:bg-stone-800" />
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden">
          <div className="hidden sm:grid grid-cols-7 gap-4 px-6 py-3 border-b border-stone-100 dark:border-stone-800/60 bg-stone-50 dark:bg-stone-900/50">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-3 w-20 rounded bg-stone-200 dark:bg-stone-800" />
            ))}
          </div>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className="grid grid-cols-2 sm:grid-cols-7 gap-4 px-4 sm:px-6 py-4 border-b border-stone-100 dark:border-stone-800/60 last:border-b-0"
            >
              {[0, 1, 2, 3, 4, 5, 6].map((j) => (
                <div key={j} className="h-3.5 rounded bg-stone-200 dark:bg-stone-800" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
