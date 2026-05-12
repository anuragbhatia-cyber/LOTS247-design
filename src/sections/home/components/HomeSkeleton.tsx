export function HomeSkeleton() {
  return (
    <div
      className="min-h-screen bg-stone-100 dark:bg-stone-950 motion-safe:animate-pulse"
      aria-busy="true"
      role="status"
    >
      <span className="sr-only">Loading home</span>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Greeting */}
        <div className="space-y-2">
          <div className="h-7 w-72 rounded bg-stone-200 dark:bg-stone-800" />
          <div className="h-4 w-56 rounded bg-stone-200 dark:bg-stone-800" />
        </div>

        {/* 4 quick-action cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-5 space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-stone-200 dark:bg-stone-800" />
              <div className="h-4 w-3/4 rounded bg-stone-200 dark:bg-stone-800" />
              <div className="h-3 w-full rounded bg-stone-200 dark:bg-stone-800" />
            </div>
          ))}
        </div>

        {/* Score + alerts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 space-y-4">
            <div className="h-3 w-40 rounded bg-stone-200 dark:bg-stone-800" />
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-stone-200 dark:bg-stone-800" />
              <div className="flex-1 space-y-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-2 w-full rounded-full bg-stone-200 dark:bg-stone-800" />
                ))}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 space-y-3">
            <div className="h-4 w-32 rounded bg-stone-200 dark:bg-stone-800" />
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-stone-50 dark:bg-stone-900/40">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-8 h-8 rounded-lg bg-stone-200 dark:bg-stone-800" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 w-3/4 rounded bg-stone-200 dark:bg-stone-800" />
                    <div className="h-2.5 w-1/2 rounded bg-stone-200 dark:bg-stone-800" />
                  </div>
                </div>
                <div className="h-6 w-16 rounded-lg bg-stone-200 dark:bg-stone-800" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
