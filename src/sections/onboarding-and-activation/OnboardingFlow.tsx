import data from '@/../product/sections/onboarding-and-activation/data.json'
import { OnboardingFlow as OnboardingFlowComponent } from './components/OnboardingFlow'
// Updated: B Safe and V Care now highlight 24/7 on-call legal support

export default function OnboardingFlow() {
  return (
    <OnboardingFlowComponent
      steps={data.onboardingSteps}
      plans={data.subscriptionPlans}
      initialProgress={data.onboardingProgress.newUser}
      onRequestOTP={(phone) => console.log('Request OTP:', phone)}
      onVerifyOTP={(otp) => console.log('Verify OTP:', otp)}
      onResendOTP={() => console.log('Resend OTP')}
      onFetchVehicleDetails={(rc) => console.log('Fetch vehicle details:', rc)}
      onAddVehicle={(vehicle) => console.log('Add vehicle:', vehicle)}
      onAddDriver={(driver) => console.log('Add driver:', driver)}
      onSkipDriver={() => console.log('Skip driver step')}
      onSelectPlan={(planId) => console.log('Select plan:', planId)}
      onComplete={() => {
        if (window.parent !== window) {
          window.parent.postMessage({ type: 'logout', target: 'shell' }, '*')
        } else {
          window.location.href = '/shell/design/fullscreen'
        }
      }}
    />
  )
}
