# TransitOps — Smart Transport Operations Platform

Full-stack fleet & logistics management system. React + Vite frontend, Node/Express API,
PostgreSQL database. Built end-to-end from `TransitOps_Build_Playbook.md`.

## Features

- JWT auth (seeded Fleet Manager account)
- Vehicle registry (CRUD, filters, status lifecycle)
- Driver management (CRUD, license-expiry highlighting)
- Trip lifecycle: Draft → Dispatched → Completed / Cancelled with **all business rules enforced server-side inside transactions**
- Maintenance service scheduler (opens → In Shop, closes → Available)
- Fuel logs + operational expenses
- Dashboard KPIs (auto-refresh) + Reports with charts and CSV export

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL 13+ running locally (or a hosted Postgres URL)

## 1. Database setup

```bash
createdb transitops
psql -d transitops -f server/db/schema.sql
```

The schema seeds an admin login: **admin@transitops.com / admin123**

## 2. Backend

```bash
cd server
cp .env.example .env          # then edit DATABASE_URL to match your Postgres
npm install
npm run dev                   # http://localhost:5000
```

## 3. Frontend

```bash
cd client
npm install
npm run dev                   # http://localhost:5173
```

`client/.env.local` already points to `http://localhost:5000/api`.

## Deployment

- **Backend** → Render Web Service (`npm install` / `node index.js`), set `DATABASE_URL`,
  `JWT_SECRET`, `NODE_ENV=production`, `CLIENT_URL`.
- **Postgres** → Render PostgreSQL; run `schema.sql` against it once.
- **Frontend** → Vercel, root `client`, env `VITE_API_URL=https://<backend>/api`.

## Business rules enforced

1. Unique registration number / license number
2. Retired / In Shop / On Trip vehicles hidden from dispatch
3. Expired or suspended drivers blocked from dispatch
4. Cargo weight cannot exceed vehicle capacity
5. Dispatch flips vehicle + driver to On Trip (atomic)
6. Complete / cancel restore both to Available (atomic)
7. Maintenance open → In Shop; close → Available (unless Retired)
8. On-trip vehicles cannot enter maintenance

See `../BUILD_SUMMARY.md` for the full breakdown of what was built.
