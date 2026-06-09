import { useEffect } from 'react'
import { TourOverlay, type TourStep } from './TourOverlay'
import { useTour } from './useTour'

interface SectionTourProps {
  tourId: string
  steps: TourStep[]
  autoStart?: boolean
}

/**
 * Per-section guided tour. Auto-starts on first visit (per tourId) and replays
 * when the shell broadcasts a `replay-tour` postMessage or the
 * `lots247:replay-tour` window event (fired from the profile "Take a tour" item).
 */
export function SectionTour({ tourId, steps, autoStart = true }: SectionTourProps) {
  const tour = useTour(tourId, autoStart)

  useEffect(() => {
    const handler = () => tour.start()
    const onMessage = (e: MessageEvent) => {
      if (e.data?.type === 'replay-tour') tour.start()
    }
    window.addEventListener('lots247:replay-tour', handler)
    window.addEventListener('message', onMessage)
    return () => {
      window.removeEventListener('lots247:replay-tour', handler)
      window.removeEventListener('message', onMessage)
    }
  }, [tour])

  return (
    <TourOverlay
      isOpen={tour.isOpen}
      steps={steps}
      stepIndex={tour.stepIndex}
      onNext={() => tour.next(steps.length)}
      onBack={tour.back}
      onClose={tour.close}
    />
  )
}
