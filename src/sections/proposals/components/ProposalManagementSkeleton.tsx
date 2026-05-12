export function ProposalManagementSkeleton() {
  return (
    <div
      className="min-h-screen bg-stone-100 dark:bg-stone-950 motion-safe:animate-pulse"
      aria-busy="true"
      role="status"
    >
      <span className="sr-only">Loading proposals</span>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-6 w-44 rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-3 w-64 rounded bg-stone-200 dark:bg-stone-800" />
          </div>
          <div className="h-10 w-40 rounded-xl bg-stone-300 dark:bg-stone-700" />
        </div>

        {/* Stat tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 space-y-2"
            >
              <div className="h-3 w-24 rounded bg-stone-200 dark:bg-stone-800" />
              <div className="h-7 w-12 rounded bg-stone-200 dark:bg-stone-800" />
            </div>
          ))}
        </div>

        {/* List of proposal cards */}
        <div className="space-y-3">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-4 sm:p-5"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-2/3 rounded bg-stone-200 dark:bg-stone-800" />
                  <div className="h-3 w-1/3 rounded bg-stone-200 dark:bg-stone-800" />
                </div>
                <div className="h-6 w-20 rounded-full bg-stone-200 dark:bg-stone-800" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-stone-100 dark:border-stone-800/60">
                {[0, 1, 2, 3].map((j) => (
                  <div key={j} className="space-y-1.5">
                    <div className="h-2.5 w-16 rounded bg-stone-200 dark:bg-stone-800" />
                    <div className="h-3.5 w-24 rounded bg-stone-200 dark:bg-stone-800" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
