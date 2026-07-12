# Hour 8 - Deployment Guide (Render & Vercel)

This guide walks you through deploying the TransitOps application end-to-end. The backend is deployed on Render and the frontend is deployed on Vercel.

## 1. Backend Deployment (Render)

1. Sign up / Log in to [Render.com](https://render.com).
2. Click **New** -> **Web Service**.
3. Connect your GitHub account and select your `TranistOps_Odoo_hackathon` repository.
4. **Configuration**:
   - **Name**: `transitops-api` (or any name you prefer)
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. **Environment Variables**:
   Under the Advanced section, add the following variables:
   - `PORT`: `5000`
   - `DB_USER`: `<your_db_user>`
   - `DB_PASSWORD`: `<your_db_password>`
   - `DB_HOST`: `<your_db_host>`
   - `DB_PORT`: `5432`
   - `DB_NAME`: `<your_db_name>`
   - `JWT_SECRET`: `<your_jwt_secret>`
6. Click **Create Web Service**. Wait for the build to finish.
7. Copy the deployed URL (e.g., `https://transitops-api.onrender.com`).

---

## 2. Frontend Deployment (Vercel)

1. Sign up / Log in to [Vercel.com](https://vercel.com).
2. Click **Add New** -> **Project**.
3. Import your `TranistOps_Odoo_hackathon` repository.
4. **Configuration**:
   - **Project Name**: `transitops-client`
   - **Framework Preset**: `Vite`
   - **Root Directory**: `client`
5. **Environment Variables**:
   Add the following variable to point to your live backend:
   - `VITE_API_URL`: `https://transitops-api.onrender.com/api` (Replace with your actual Render URL, making sure to append `/api`)
6. Click **Deploy**.
7. Wait for the build to complete and click **Go to Dashboard** to view your live app.

## 3. Post-Deployment Verification

1. Open your Vercel URL.
2. Log in using your admin credentials.
3. Verify that the Dashboard, Vehicles, Drivers, and Trips pages load correctly.
4. Test the CSV export on the Reports page to ensure it downloads properly.
