export function KnowledgeBaseSkeleton() {
  return (
    <div
      className="min-h-screen bg-stone-100 dark:bg-stone-950 motion-safe:animate-pulse"
      aria-busy="true"
      role="status"
    >
      <span className="sr-only">Loading knowledge base</span>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="h-7 w-56 rounded bg-stone-200 dark:bg-stone-800" />
          <div className="h-3 w-80 rounded bg-stone-200 dark:bg-stone-800" />
        </div>

        {/* Search bar */}
        <div className="h-12 w-full max-w-2xl rounded-xl bg-stone-200 dark:bg-stone-800" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Category sidebar */}
          <div className="lg:col-span-1 space-y-2">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-10 w-full rounded-xl bg-stone-200 dark:bg-stone-800" />
            ))}
          </div>

          {/* Article grid */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 space-y-3"
              >
                <div className="w-10 h-10 rounded-lg bg-stone-200 dark:bg-stone-800" />
                <div className="space-y-2">
                  <div className="h-4 w-3/4 rounded bg-stone-200 dark:bg-stone-800" />
                  <div className="h-3 w-full rounded bg-stone-200 dark:bg-stone-800" />
                  <div className="h-3 w-5/6 rounded bg-stone-200 dark:bg-stone-800" />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-2.5 w-16 rounded bg-stone-200 dark:bg-stone-800" />
                  <div className="h-2.5 w-20 rounded bg-stone-200 dark:bg-stone-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
