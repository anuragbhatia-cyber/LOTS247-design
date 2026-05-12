export function WalletSkeleton() {
  return (
    <div
      className="min-h-screen bg-stone-100 dark:bg-stone-950 motion-safe:animate-pulse"
      aria-busy="true"
      role="status"
    >
      <span className="sr-only">Loading wallet</span>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="h-6 w-32 rounded bg-stone-200 dark:bg-stone-800" />
          <div className="h-3 w-56 rounded bg-stone-200 dark:bg-stone-800" />
        </div>

        {/* Balance hero card */}
        <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 sm:p-8 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-3 flex-1">
              <div className="h-3 w-32 rounded bg-stone-200 dark:bg-stone-800" />
              <div className="h-10 w-48 rounded bg-stone-200 dark:bg-stone-800" />
              <div className="h-3 w-40 rounded bg-stone-200 dark:bg-stone-800" />
            </div>
            <div className="hidden sm:block w-16 h-16 rounded-2xl bg-stone-200 dark:bg-stone-800" />
          </div>
          <div className="flex gap-2 pt-2">
            <div className="h-10 w-32 rounded-xl bg-stone-300 dark:bg-stone-700" />
            <div className="h-10 w-32 rounded-xl bg-stone-200 dark:bg-stone-800" />
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 border-b border-stone-200 dark:border-stone-800">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-9 w-24 rounded-t-lg bg-stone-200 dark:bg-stone-800 mb-[-1px]" />
          ))}
        </div>

        {/* Transaction list */}
        <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 overflow-hidden">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-5 sm:px-6 py-4 border-b border-stone-100 dark:border-stone-800/60 last:border-b-0"
            >
              <div className="w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-800 flex-shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="h-3.5 w-2/3 rounded bg-stone-200 dark:bg-stone-800" />
                <div className="h-2.5 w-1/3 rounded bg-stone-200 dark:bg-stone-800" />
              </div>
              <div className="text-right space-y-1.5">
                <div className="h-4 w-24 rounded bg-stone-200 dark:bg-stone-800 ml-auto" />
                <div className="h-2.5 w-16 rounded bg-stone-200 dark:bg-stone-800 ml-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
