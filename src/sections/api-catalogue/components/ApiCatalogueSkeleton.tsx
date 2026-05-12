export function ApiCatalogueSkeleton() {
  return (
    <div
      className="min-h-screen bg-stone-100 dark:bg-stone-950 motion-safe:animate-pulse"
      aria-busy="true"
      role="status"
    >
      <span className="sr-only">Loading API catalogue</span>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="h-7 w-44 rounded bg-stone-200 dark:bg-stone-800" />
          <div className="h-3 w-80 rounded bg-stone-200 dark:bg-stone-800" />
        </div>

        {/* Search + filter pills */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="h-11 flex-1 rounded-xl bg-stone-200 dark:bg-stone-800" />
          <div className="flex gap-2">
            {[24, 20, 24, 20].map((w, i) => (
              <div key={i} className="h-11 rounded-full bg-stone-200 dark:bg-stone-800" style={{ width: `${w * 4}px` }} />
            ))}
          </div>
        </div>

        {/* API cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="w-10 h-10 rounded-lg bg-stone-200 dark:bg-stone-800" />
                <div className="h-5 w-14 rounded-full bg-stone-200 dark:bg-stone-800" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-2/3 rounded bg-stone-200 dark:bg-stone-800" />
                <div className="h-3 w-full rounded bg-stone-200 dark:bg-stone-800" />
                <div className="h-3 w-4/5 rounded bg-stone-200 dark:bg-stone-800" />
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800/60">
                <div className="flex gap-1.5">
                  <div className="h-5 w-12 rounded bg-stone-200 dark:bg-stone-800" />
                  <div className="h-5 w-14 rounded bg-stone-200 dark:bg-stone-800" />
                </div>
                <div className="h-3 w-16 rounded bg-stone-200 dark:bg-stone-800" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
