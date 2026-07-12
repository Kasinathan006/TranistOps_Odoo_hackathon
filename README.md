# TransitOps 🚚

fleet management thing we built for the odoo hackathon. tracks vehicles, drivers, trips, fuel, maintenance — basically a mini TMS.

stack is react + vite on the front, express + pglite on the back (pglite = embedded postgres so you dont need to install anything externally, just npm install and go)

---

## what works

**login / auth**
- jwt based, admin creds are `admin@transitops.com` / `admin123`

**vehicles**
- add vehicles with reg number, type, max load capacity, region etc
- filter by status and type
- statuses: Available, On Trip, In Shop, Retired

**drivers**
- add drivers with license number, category, expiry date
- `/available` endpoint filters out suspended drivers and expired licenses automatically

**trips — this is the main one**

whole thing runs inside db transactions so nothing gets into a weird state. validations on trip creation:
- cargo weight cant exceed the vehicles max load capacity
- vehicle has to be Available (not already on a trip or in the shop)
- driver has to be Available and not suspended
- driver license cant be expired

when you dispatch a trip, vehicle and driver both flip to "On Trip" atomically. when you complete it they both go back to Available. if the trip gets cancelled while dispatched, same thing — both get released.

also auto creates a fuel log entry when a trip is completed (liters * 1.5 per unit as a rough cost estimate)

**maintenance**
- log a vehicle for maintenance → status goes to In Shop
- close it → goes back to Available

**reports**
- dashboard with fleet utilization, trip counts etc
- fuel efficiency per vehicle (km/l)
- vehicle roi (revenue vs what the vehicle cost)
- csv export for vehicles and trips

---

## running it

no database setup needed, pglite handles everything. schema applies automatically on first start.

```bash
# backend
cd server
npm install
npm run dev
# runs on localhost:5000
```

```bash
# frontend
cd client
npm install
npm run dev
# runs on localhost:5173
```

---

## api routes

```
POST   /api/auth/login

GET    /api/vehicles
POST   /api/vehicles
GET    /api/vehicles/available

GET    /api/drivers
POST   /api/drivers
GET    /api/drivers/available

GET    /api/trips
POST   /api/trips              ← validates everything before creating
PATCH  /api/trips/:id/dispatch ← locks vehicle + driver
PATCH  /api/trips/:id/complete ← releases both, logs fuel
PATCH  /api/trips/:id/cancel

GET    /api/fuel
POST   /api/fuel

GET    /api/maintenance
POST   /api/maintenance
PATCH  /api/maintenance/:id/close

GET    /api/reports/dashboard
GET    /api/reports/fuel-efficiency
GET    /api/reports/vehicle-roi
GET    /api/reports/export/vehicles
GET    /api/reports/export/trips
```
