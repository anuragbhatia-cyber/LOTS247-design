import { ShieldCheck, IdCard, Truck, type LucideIcon } from 'lucide-react'
import type { ApiCatalogueProps } from '@/../product/sections/api-catalogue/types'

const ICON_MAP: Record<string, LucideIcon> = {
  'shield-check': ShieldCheck,
  'id-card': IdCard,
  'truck': Truck,
}

const CATEGORY_STYLES: Record<string, string> = {
  Compliance: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
  Identity: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
  'Vehicle Data': 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
}

export function ApiCatalogue({ apis, onViewDetail }: ApiCatalogueProps) {
  return (
    <div className="p-6 md:p-8 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
          API Catalogue
        </h1>
        <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400">
          Browse available APIs to integrate vehicle compliance, challan, and licence data into your systems.
        </p>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {apis.map((api) => {
          const Icon = ICON_MAP[api.icon] || ShieldCheck
          const categoryStyle = CATEGORY_STYLES[api.category] || 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400'

          return (
            <button
              key={api.id}
              onClick={() => onViewDetail?.(api.id)}
              className="group text-left bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl p-6 transition-all duration-200 hover:border-emerald-300 dark:hover:border-emerald-800 hover:shadow-lg hover:shadow-emerald-100/40 dark:hover:shadow-emerald-950/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:ring-offset-2 dark:focus:ring-offset-stone-950"
            >
              {/* Icon + Name + Provider */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center transition-colors group-hover:bg-emerald-100 dark:group-hover:bg-emerald-950/60">
                  <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base font-semibold text-stone-900 dark:text-stone-50 leading-tight">
                    {api.name}
                  </h3>
                  <p className="text-xs text-stone-400 dark:text-stone-500 mt-0.5">
                    Built by {api.provider}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed line-clamp-3 mb-5">
                {api.shortDescription}
              </p>

              {/* Category Tag */}
              <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${categoryStyle}`}>
                {api.category}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
