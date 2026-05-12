/**
 * Skeleton for the split-panel auth screens (Login, Registration, Vehicle, Driver).
 * Mirrors the real layout so the moment the real form mounts there's minimal layout shift.
 *
 * Use as a Suspense fallback or while a session check is in flight.
 */
export function AuthShellSkeleton() {
  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row motion-safe:animate-pulse"
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      <span className="sr-only">Loading</span>

      {/* Left Panel — branding */}
      <div className="hidden lg:flex lg:w-[30%] bg-white dark:bg-stone-900 flex-col relative border-r border-stone-200 dark:border-stone-800">
        <div className="p-8">
          <div className="h-20 w-44 rounded bg-stone-200 dark:bg-stone-800" />
        </div>
        <div className="mt-auto flex justify-center px-10 pb-10">
          <div className="w-full max-w-xs aspect-[4/3] rounded-xl bg-stone-200 dark:bg-stone-800" />
        </div>
      </div>

      {/* Right Panel — form skeleton */}
      <div className="flex-1 bg-stone-100 dark:bg-stone-950 px-6 py-10 lg:py-12">
        <div className="w-full max-w-md mx-auto">
          {/* Mobile logo */}
          <div className="lg:hidden mb-10 flex justify-center">
            <div className="h-16 w-36 rounded bg-stone-200 dark:bg-stone-800" />
          </div>

          {/* Heading */}
          <div className="mb-8 space-y-2">
            <div className="h-7 w-3/5 rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-4 w-4/5 rounded bg-stone-200 dark:bg-stone-800" />
          </div>

          {/* Form fields */}
          <div className="space-y-4">
            {[0, 1, 2].map((i) => (
              <div key={i}>
                <div className="h-3 w-24 rounded bg-stone-200 dark:bg-stone-800 mb-2" />
                <div className="h-12 w-full rounded-xl bg-stone-200 dark:bg-stone-800" />
              </div>
            ))}

            {/* CTA button */}
            <div className="h-12 w-full rounded-xl bg-stone-300 dark:bg-stone-700 mt-6" />

            {/* Footer link */}
            <div className="h-4 w-2/3 mx-auto rounded bg-stone-200 dark:bg-stone-800 mt-4" />
          </div>
        </div>
      </div>
    </div>
  )
}
