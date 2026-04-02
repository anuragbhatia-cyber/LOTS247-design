# Onboarding & Activation Section

The Onboarding & Activation section handles the user registration and setup flow for new LOTS247 users. It guides them through phone verification, vehicle registration, optional driver addition, and subscription plan selection.

## Components

| Component | Description |
|---|---|
| `OnboardingFlow` | Main flow controller managing the multi-step onboarding process with animated truck illustration |
| `LoginStep` | Phone number + OTP login form for returning users |
| `RegistrationStep` | Registration form with business name, type, state, pincode, and terms acceptance |
| `PhoneVerificationStep` | Phone number entry + OTP verification with countdown timer |
| `VehicleAdditionStep` | RC number input with auto-fetch from government API or manual entry |
| `DriverAdditionStep` | Optional driver details form (name, license number, expiry) |
| `PlanSelectionStep` | Subscription plan cards grid (Free, U Drive, B Safe, V Care) with feature comparison |
| `ProgressIndicator` | Step progress bar showing current position in the onboarding flow |

## Data Requirements

- **SubscriptionPlan[]**: Available plans with features, pricing, and highlights
- **OnboardingStep[]**: Step definitions (id, name, title, description, isRequired, canSkip)
- **OnboardingProgress**: Current progress state tracking completed steps

## External Dependencies

- `lucide-react` - Icon library
- `lottie-react` - Animation library (used for truck animation in OnboardingFlow)
- `truck.json` - Lottie animation data file (must be provided alongside components)
- Tailwind CSS v4 with `dark:` variant support

## Flow Sequence

1. **Login / Registration** - User enters phone number and verifies via OTP
2. **Add Vehicle** - User enters RC number; system fetches details from government API
3. **Add Driver** (optional) - User can add a driver or skip
4. **Choose Plan** - User selects a subscription plan (Free, U Drive, B Safe, V Care)

## Key Patterns

- OnboardingFlow uses internal state machine (`step`) to navigate between steps
- VehicleAdditionStep simulates API fetch with timeout for demo purposes
- PlanSelectionStep displays plan comparison with feature matrix
- All forms validate input before allowing progression
- The flow supports both new user registration and returning user login
