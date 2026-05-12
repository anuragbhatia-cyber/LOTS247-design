export function MyProfileSkeleton() {
  return (
    <div
      className="min-h-screen bg-stone-100 dark:bg-stone-950 motion-safe:animate-pulse"
      aria-busy="true"
      role="status"
    >
      <span className="sr-only">Loading profile</span>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="h-6 w-32 rounded bg-stone-200 dark:bg-stone-800" />
          <div className="h-3 w-56 rounded bg-stone-200 dark:bg-stone-800" />
        </div>

        {/* Profile hero card */}
        <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-stone-200 dark:bg-stone-800 flex-shrink-0" />
          <div className="flex-1 space-y-2.5">
            <div className="h-5 w-48 rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-3 w-64 rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-3 w-32 rounded bg-stone-200 dark:bg-stone-800" />
          </div>
          <div className="hidden sm:block h-10 w-24 rounded-xl bg-stone-200 dark:bg-stone-800" />
        </div>

        {/* Form sections */}
        {[0, 1, 2].map((section) => (
          <div
            key={section}
            className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 p-6 space-y-5"
          >
            <div className="space-y-1.5">
              <div className="h-4 w-44 rounded bg-stone-200 dark:bg-stone-800" />
              <div className="h-3 w-64 rounded bg-stone-200 dark:bg-stone-800" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((field) => (
                <div key={field} className="space-y-2">
                  <div className="h-3 w-24 rounded bg-stone-200 dark:bg-stone-800" />
                  <div className="h-11 w-full rounded-xl bg-stone-200 dark:bg-stone-800" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
