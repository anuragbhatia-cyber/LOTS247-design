import { useEffect, useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { X, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'

export interface TourStep {
  /** CSS selector for the element to spotlight (e.g. '[data-tour="quick-actions"]'). If unset, the tooltip centers on screen. */
  target?: string
  title: string
  body: string
  /** Where to place the tooltip relative to the target */
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'center'
}

interface TourOverlayProps {
  isOpen: boolean
  steps: TourStep[]
  stepIndex: number
  onNext: () => void
  onBack: () => void
  onClose: () => void
}

interface Rect {
  top: number
  left: number
  width: number
  height: number
}

const SPOTLIGHT_PADDING = 8
const TOOLTIP_GAP = 14
const TOOLTIP_WIDTH = 340

function getRect(selector: string | undefined): Rect | null {
  if (!selector || typeof document === 'undefined') return null
  const el = document.querySelector(selector) as HTMLElement | null
  if (!el) return null
  const r = el.getBoundingClientRect()
  return { top: r.top, left: r.left, width: r.width, height: r.height }
}

function computeTooltipPosition(
  rect: Rect | null,
  placement: TourStep['placement'] = 'bottom',
  viewport: { w: number; h: number },
): { top: number; left: number; arrow: 'top' | 'bottom' | 'left' | 'right' | 'none' } {
  if (!rect || placement === 'center') {
    return {
      top: viewport.h / 2 - 120,
      left: viewport.w / 2 - TOOLTIP_WIDTH / 2,
      arrow: 'none',
    }
  }

  let placed = placement
  // Auto-flip if no room below
  if (placed === 'bottom' && rect.top + rect.height + TOOLTIP_GAP + 200 > viewport.h) {
    placed = 'top'
  } else if (placed === 'top' && rect.top - TOOLTIP_GAP - 200 < 0) {
    placed = 'bottom'
  }

  let top = 0
  let left = 0
  let arrow: 'top' | 'bottom' | 'left' | 'right' = 'top'

  switch (placed) {
    case 'top':
      top = rect.top - TOOLTIP_GAP
      left = rect.left + rect.width / 2 - TOOLTIP_WIDTH / 2
      arrow = 'bottom'
      // Tooltip's bottom should align with the rect's top
      top = rect.top - TOOLTIP_GAP - 200
      break
    case 'bottom':
      top = rect.top + rect.height + TOOLTIP_GAP
      left = rect.left + rect.width / 2 - TOOLTIP_WIDTH / 2
      arrow = 'top'
      break
    case 'left':
      top = rect.top + rect.height / 2 - 80
      left = rect.left - TOOLTIP_GAP - TOOLTIP_WIDTH
      arrow = 'right'
      break
    case 'right':
      top = rect.top + rect.height / 2 - 80
      left = rect.left + rect.width + TOOLTIP_GAP
      arrow = 'left'
      break
  }

  // Clamp horizontally
  left = Math.max(16, Math.min(left, viewport.w - TOOLTIP_WIDTH - 16))
  // Clamp vertically
  top = Math.max(16, Math.min(top, viewport.h - 220))

  return { top, left, arrow }
}

export function TourOverlay({
  isOpen,
  steps,
  stepIndex,
  onNext,
  onBack,
  onClose,
}: TourOverlayProps) {
  const [rect, setRect] = useState<Rect | null>(null)
  const [viewport, setViewport] = useState({
    w: typeof window !== 'undefined' ? window.innerWidth : 1024,
    h: typeof window !== 'undefined' ? window.innerHeight : 768,
  })

  const step = steps[stepIndex]

  useLayoutEffect(() => {
    if (!isOpen || !step) return
    const update = () => {
      setRect(getRect(step.target))
      setViewport({ w: window.innerWidth, h: window.innerHeight })
    }
    update()
    // Re-measure on resize / scroll
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    const id = window.setInterval(update, 250) // catch layout shifts
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
      window.clearInterval(id)
    }
  }, [isOpen, step])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onBack()
    }
    window.addEventListener('keydown', onKey)
    // Ask the embedding shell (if any) to dim its sidebar/header behind the tour
    if (window.parent !== window) {
      window.parent.postMessage({ type: 'showOverlay' }, '*')
    }
    // Lock background scroll while the tour is active so the spotlight target stays put.
    // Save previous values so we can restore them on close.
    const html = document.documentElement
    const body = document.body
    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow
    html.style.overflow = 'hidden'
    body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      html.style.overflow = prevHtmlOverflow
      body.style.overflow = prevBodyOverflow
      if (window.parent !== window) {
        window.parent.postMessage({ type: 'hideOverlay' }, '*')
      }
    }
  }, [isOpen, onClose, onNext, onBack])

  // Auto-scroll target into view
  useEffect(() => {
    if (!isOpen || !step?.target) return
    const el = document.querySelector(step.target) as HTMLElement | null
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [isOpen, step])

  if (!isOpen || !step) return null

  const tooltipPos = computeTooltipPosition(rect, step.placement, viewport)
  const totalSteps = steps.length
  const isFirst = stepIndex === 0
  const isLast = stepIndex === totalSteps - 1

  return createPortal(
    <div className="fixed inset-0 z-[200] pointer-events-none">
      {/* Backdrop dimming + spotlight cutout via a single rounded box with huge outer box-shadow */}
      {rect ? (
        <>
          {/* Click-catcher behind everything */}
          <div
            className="absolute inset-0 pointer-events-auto"
            onClick={onClose}
          />
          {/* Spotlight: rounded element whose massive box-shadow dims everything outside it */}
          <div
            className="absolute ring-2 ring-emerald-400 pointer-events-none transition-all duration-300"
            style={{
              top: rect.top - SPOTLIGHT_PADDING,
              left: rect.left - SPOTLIGHT_PADDING,
              width: rect.width + SPOTLIGHT_PADDING * 2,
              height: rect.height + SPOTLIGHT_PADDING * 2,
              borderRadius: 20,
              boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.65)',
            }}
          />
        </>
      ) : (
        <div
          className="absolute inset-0 bg-black/70 pointer-events-auto"
          onClick={onClose}
        />
      )}

      {/* Tooltip card */}
      <div
        className="absolute pointer-events-auto rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden"
        style={{
          top: tooltipPos.top,
          left: tooltipPos.left,
          width: TOOLTIP_WIDTH,
        }}
        role="dialog"
        aria-modal="true"
        aria-label={step.title}
      >
        {/* Arrow */}
        {tooltipPos.arrow !== 'none' && (
          <div
            aria-hidden="true"
            className="absolute w-3 h-3 bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 rotate-45"
            style={{
              ...(tooltipPos.arrow === 'top' && {
                top: -7,
                left: '50%',
                marginLeft: -6,
                borderTop: '1px solid',
                borderLeft: '1px solid',
                borderColor: 'inherit',
              }),
              ...(tooltipPos.arrow === 'bottom' && {
                bottom: -7,
                left: '50%',
                marginLeft: -6,
                borderBottom: '1px solid',
                borderRight: '1px solid',
                borderColor: 'inherit',
              }),
              ...(tooltipPos.arrow === 'left' && {
                left: -7,
                top: '50%',
                marginTop: -6,
                borderLeft: '1px solid',
                borderBottom: '1px solid',
                borderColor: 'inherit',
              }),
              ...(tooltipPos.arrow === 'right' && {
                right: -7,
                top: '50%',
                marginTop: -6,
                borderRight: '1px solid',
                borderTop: '1px solid',
                borderColor: 'inherit',
              }),
            }}
          />
        )}

        <div className="px-5 pt-5 pb-4">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                {stepIndex + 1} / {totalSteps}
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Close tour"
              className="w-7 h-7 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 flex items-center justify-center transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <h3 className="text-base font-bold text-stone-900 dark:text-stone-50 leading-snug">
            {step.title}
          </h3>
          <p className="mt-1.5 text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
            {step.body}
          </p>
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between gap-2 px-5 py-3 border-t border-stone-100 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/30">
          <button
            onClick={onClose}
            className="text-xs font-medium text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
          >
            Skip tour
          </button>
          <div className="flex items-center gap-1.5">
            {!isFirst && (
              <button
                onClick={onBack}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
            )}
            <button
              onClick={onNext}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-sm shadow-emerald-600/20"
            >
              {isLast ? 'Finish' : 'Next'}
              {!isLast && <ArrowRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-stone-100 dark:bg-stone-800">
          <div
            className="h-full bg-emerald-500 transition-all duration-300 ease-out"
            style={{ width: `${((stepIndex + 1) / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    </div>,
    document.body,
  )
}
