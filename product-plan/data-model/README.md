# Data Model

## Overview

LOTS247 uses 10 core entities to model its legal-tech domain. The central entity is the **Subscriber** (a paying user — individual vehicle owner or fleet manager).

## Entities

### Subscriber
A paid user of the platform — a vehicle owner or fleet manager with an active subscription. Subscribers are categorized as individual (1-2 vehicles), fleet owner (10-500 vehicles), or business (company-managed vehicles). Each subscriber has an overall compliance score calculated from their vehicles and drivers.

### Vehicle
A registered vehicle belonging to a subscriber. Contains compliance information including RC details, insurance expiry, PUC expiry, and fitness certificate status. Each vehicle has its own compliance score.

### Driver
A person who drives vehicles in the subscriber's fleet. Contains driving license information, validity dates, and compliance status. Many-to-many relationship with vehicles.

### Subscription
A subscriber's active plan that determines feature access, vehicle limits, incident limits, support levels, and SLA types. Plans: Basic, Fleet, Enterprise.

### Payment
A financial transaction covering subscription payments, challan payments, legal service fees, and other charges.

### Incident
A legal issue requiring resolution — accidents, vehicle seizures, roadside stops, legal entanglements. Tracks status, assigned lawyer, resolution steps, and timeline.

### Challan
A traffic violation or fine. Tracks violation details, fine amount, payment status, and resolution method (online, Lok Adalat, court).

### Lawyer
A legal professional from the 75K+ nationwide network. Assigned to incidents for on-call or on-site resolution.

### Document
A compliance document for a vehicle or driver — RC, insurance, PUC, fitness certificates, driving licenses. Tracks validity and verification status.

### Notification
System alerts for document expiry warnings, incident status updates, compliance alerts, payment reminders. Delivered via app and WhatsApp.

## Relationships

- Subscriber -> has many -> Vehicles, Drivers, Incidents, Documents, Challans, Payments, Notifications
- Subscriber -> has one -> active Subscription
- Vehicle -> belongs to -> Subscriber
- Vehicle -> has many -> Documents, Challans
- Vehicle <-> Driver (many-to-many)
- Driver -> belongs to -> Subscriber
- Driver -> has many -> Documents
- Incident -> belongs to -> Subscriber
- Incident -> may involve -> Vehicle
- Incident -> may be assigned to -> Lawyer
- Challan -> belongs to -> Vehicle (via Subscriber)
- Challan -> may link to -> Payment
- Document -> belongs to -> Vehicle or Driver
- Notification -> belongs to -> Subscriber
