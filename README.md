# transitops 🚚

building a smart transport operations platform for the odoo hackathon!
stack: react + vite + node/express + postgres

we're building this overnight so the code is a bit messy but it works 🚀

## what it does so far
- **auth:** jwt based login (admin: admin@transitops.com / admin123)
- **vehicles & drivers:** full crud, tracks if a vehicle is in shop or a driver's license is expired
- **trips (wip):** dispatching logic that checks if the driver/vehicle is available and locks them
- **maintenance & fuel logs (wip):** tracking expenses and taking trucks out of service for repairs
- **dashboard:** tracking the main KPIs

## how to run this locally

you'll need node 18+ and postgres.

1. **database setup**
```bash
createdb transitops
psql -d transitops -f server/db/schema.sql
```
*(this creates the tables and sets up the default admin user)*

2. **backend**
```bash
cd server
cp .env.example .env # don't forget to add your db credentials!
npm install
npm run dev
```
*(api runs on localhost:5000)*

3. **frontend**
```bash
cd client
npm install
npm run dev
```
*(app runs on localhost:5173)*

## deployment notes
- backend goes to render (needs `DATABASE_URL` and `JWT_SECRET`)
- frontend can just be tossed on vercel (make sure to set `VITE_API_URL`)
