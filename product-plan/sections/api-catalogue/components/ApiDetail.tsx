import { useState } from 'react'
import { ArrowLeft, ShieldCheck, IdCard, Truck, ExternalLink, type LucideIcon } from 'lucide-react'
import type { ApiDetailProps } from '../types'
import { ContactModal } from './ContactModal'

const ICON_MAP: Record<string, LucideIcon> = {
  'shield-check': ShieldCheck,
  'id-card': IdCard,
  'truck': Truck,
}

const METHOD_STYLES: Record<string, string> = {
  GET: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400',
  POST: 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400',
  PUT: 'bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400',
  DELETE: 'bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-400',
}

const CATEGORY_STYLES: Record<string, string> = {
  Compliance: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400',
  Identity: 'bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400',
  'Vehicle Data': 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400',
}

export function ApiDetail({ api, onBack, onContactSubmit }: ApiDetailProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'endpoints'>('description')
  const [contactOpen, setContactOpen] = useState(false)

  const Icon = ICON_MAP[api.icon] || ShieldCheck
  const categoryStyle = CATEGORY_STYLES[api.category] || 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400'

  const tabs = [
    { id: 'description' as const, label: 'Description' },
    { id: 'endpoints' as const, label: 'Endpoints' },
  ]

  return (
    <div className="min-h-screen">
      <div className="flex flex-col lg:flex-row">
        {/* Left Sidebar */}
        <div className="lg:w-[360px] xl:w-[400px] flex-shrink-0 border-b lg:border-b-0 lg:border-r border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950/50 p-6 md:p-8">
          {/* Back Button */}
          <button
            onClick={() => onBack?.()}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {/* API Icon + Name */}
          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center flex-shrink-0">
              <Icon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h1 className="text-xl font-bold text-stone-900 dark:text-stone-50 tracking-tight">
              {api.name}
            </h1>
          </div>

          {/* Full Description */}
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed mb-5">
            {api.fullDescription}
          </p>

          {/* Documentation Link */}
          <a
            href={api.documentationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors mb-6"
          >
            View documentation
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* Category */}
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500 mb-2">
              Category
            </p>
            <span className={`inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${categoryStyle}`}>
              {api.category}
            </span>
          </div>

          {/* CTA */}
          <div className="pt-5 border-t border-stone-100 dark:border-stone-800">
            <p className="text-sm text-stone-600 dark:text-stone-400 mb-3">
              Interested in using <span className="font-medium text-stone-800 dark:text-stone-200">{api.name}</span>?
            </p>
            <button
              onClick={() => setContactOpen(true)}
              className="w-full px-5 py-2.5 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500 rounded-xl transition-colors"
            >
              Contact for Pricing
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="flex-1 min-w-0">
          {/* Tabs */}
          <div className="border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950/50 px-6 md:px-8">
            <div className="flex gap-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative py-4 text-sm font-medium transition-colors
                    ${activeTab === tab.id
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300'
                    }
                  `}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            {activeTab === 'description' ? (
              <div className="max-w-2xl space-y-8">
                {api.features.map((feature, idx) => (
                  <div key={idx}>
                    <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-50 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="max-w-3xl">
                <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
                  <div className="px-5 py-3.5 border-b border-stone-100 dark:border-stone-800">
                    <p className="text-xs font-semibold uppercase tracking-wider text-stone-400 dark:text-stone-500">
                      {api.endpoints.length} Endpoints
                    </p>
                  </div>
                  <div className="divide-y divide-stone-100 dark:divide-stone-800">
                    {api.endpoints.map((endpoint, idx) => {
                      const methodStyle = METHOD_STYLES[endpoint.method] || METHOD_STYLES.GET
                      return (
                        <div key={idx} className="px-5 py-4 flex items-start gap-3">
                          <span className={`flex-shrink-0 mt-0.5 text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${methodStyle}`}>
                            {endpoint.method}
                          </span>
                          <div className="min-w-0">
                            <code className="text-sm font-mono text-stone-800 dark:text-stone-200">
                              {endpoint.path}
                            </code>
                            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                              {endpoint.description}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      <ContactModal
        apiName={api.name}
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
        onSubmit={(message) => onContactSubmit?.(api.id, message)}
      />
    </div>
  )
}
