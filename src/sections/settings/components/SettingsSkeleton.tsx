export function SettingsSkeleton() {
  return (
    <div
      className="min-h-screen bg-stone-100 dark:bg-stone-950 motion-safe:animate-pulse"
      aria-busy="true"
      role="status"
    >
      <span className="sr-only">Loading settings</span>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="h-6 w-28 rounded bg-stone-200 dark:bg-stone-800" />
          <div className="h-3 w-72 rounded bg-stone-200 dark:bg-stone-800" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings nav */}
          <div className="lg:col-span-1 space-y-1.5">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-10 w-full rounded-xl bg-stone-200 dark:bg-stone-800" />
            ))}
          </div>

          {/* Content panel */}
          <div className="lg:col-span-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 space-y-6">
            <div className="space-y-2">
              <div className="h-5 w-40 rounded bg-stone-200 dark:bg-stone-800" />
              <div className="h-3 w-72 rounded bg-stone-200 dark:bg-stone-800" />
            </div>

            {/* Toggle rows */}
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between py-3 border-t border-stone-100 dark:border-stone-800/60 first:border-t-0">
                <div className="space-y-1.5 flex-1">
                  <div className="h-3.5 w-48 rounded bg-stone-200 dark:bg-stone-800" />
                  <div className="h-2.5 w-72 rounded bg-stone-200 dark:bg-stone-800" />
                </div>
                <div className="h-6 w-11 rounded-full bg-stone-200 dark:bg-stone-800 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
