# Data Model

## Entities

### Subscriber
A paid user of the platform — a vehicle owner or fleet manager with an active subscription. Subscribers are categorized as individual (1-2 vehicles), fleet owner (10-500 vehicles), or business (company-managed vehicles). Each subscriber has an overall compliance score calculated from their vehicles and drivers. A subscriber owns vehicles, incidents, documents, and challans.

### Vehicle
A registered vehicle belonging to a subscriber. Contains compliance information including RC details, insurance expiry, PUC expiry, and fitness certificate status. Each vehicle has its own compliance score based on document validity.

### Driver
A person who drives vehicles in the subscriber's fleet. Contains driving license information, validity dates, and compliance status. Drivers can be assigned to multiple vehicles, and vehicles can have multiple drivers.

### Subscription
A subscriber's active plan that determines feature access, vehicle limits, incident limits, support levels, and SLA types. Plans include Basic (individuals), Fleet (fleet owners), and Enterprise (businesses).

### Payment
A financial transaction in the system. Covers subscription payments, challan payments, legal service fees, and other charges. Tracks amount, payment gateway reference, and status.

### Incident
A legal issue requiring resolution. Includes accidents, vehicle seizures, roadside stops, and other legal entanglements. Tracks incident type, status, assigned lawyer, resolution steps, and timeline.

### Challan
A traffic violation or fine issued against a vehicle. Tracks violation details, fine amount, payment status, and resolution method (online payment, Lok Adalat, court). Can be resolved individually or in bulk.

### Lawyer
A legal professional from the 75K+ nationwide network. Contains location/pin code coverage, specialization, availability status, and case history. Lawyers are assigned to incidents for on-call or on-site resolution.

### Document
A compliance document associated with a vehicle or driver. Includes RC certificates, insurance policies, PUC certificates, fitness certificates, and driving licenses. Tracks document type, validity dates, and verification status.

### Notification
A system alert sent to subscribers. Covers document expiry warnings, incident status updates, compliance alerts, payment reminders, and general announcements. Delivered via app and WhatsApp.

## Relationships

- Subscriber has many Vehicles
- Subscriber has many Drivers
- Subscriber has many Incidents
- Subscriber has many Documents
- Subscriber has many Challans
- Subscriber has one active Subscription
- Subscriber has many Payments
- Subscriber has many Notifications
- Vehicle belongs to Subscriber
- Vehicle has many Documents
- Vehicle has many Challans
- Vehicle has many Drivers (many-to-many)
- Driver belongs to Subscriber
- Driver has many Vehicles (many-to-many)
- Driver has many Documents
- Incident belongs to Subscriber
- Incident may involve a Vehicle
- Incident may be assigned to a Lawyer
- Challan belongs to Subscriber (via Vehicle)
- Challan may link to a Payment
- Document belongs to Subscriber (via Vehicle or Driver)
- Notification belongs to Subscriber
