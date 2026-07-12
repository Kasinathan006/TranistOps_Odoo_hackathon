const router = require('express').Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// Dashboard KPIs
router.get('/dashboard', auth, async (req, res) => {
  try {
    const [vehicles, drivers, trips, utilization] = await Promise.all([
      pool.query(`
        SELECT
          COUNT(*) as total,
          COUNT(CASE WHEN status='Available' THEN 1 END) as available,
          COUNT(CASE WHEN status='On Trip' THEN 1 END) as on_trip,
          COUNT(CASE WHEN status='In Shop' THEN 1 END) as in_shop,
          COUNT(CASE WHEN status='Retired' THEN 1 END) as retired
        FROM vehicles
      `),
      pool.query(`
        SELECT
          COUNT(*) as total,
          COUNT(CASE WHEN status='Available' THEN 1 END) as available,
          COUNT(CASE WHEN status='On Trip' THEN 1 END) as on_trip,
          COUNT(CASE WHEN status='Suspended' THEN 1 END) as suspended
        FROM drivers
      `),
      pool.query(`
        SELECT
          COUNT(*) as total,
          COUNT(CASE WHEN status='Dispatched' THEN 1 END) as active,
          COUNT(CASE WHEN status='Draft' THEN 1 END) as pending,
          COUNT(CASE WHEN status='Completed' THEN 1 END) as completed
        FROM trips
      `),
      pool.query(`
        SELECT
          ROUND(
            COUNT(CASE WHEN status IN ('On Trip','In Shop') THEN 1 END)::DECIMAL /
            NULLIF(COUNT(*),0) * 100, 1
          ) as fleet_utilization
        FROM vehicles
      `)
    ]);

    res.json({
      vehicles: vehicles.rows[0],
      drivers: drivers.rows[0],
      trips: trips.rows[0],
      fleet_utilization: utilization.rows[0].fleet_utilization || 0
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Analytics: fuel efficiency, cost, ROI per vehicle + trips by month
router.get('/analytics', auth, async (req, res) => {
  try {
    const fuelEfficiency = await pool.query(`
      SELECT
        v.name as vehicle_name,
        v.registration_number,
        COALESCE(SUM(t.actual_distance), 0) as total_distance,
        COALESCE(SUM(f.liters), 0) as total_fuel,
        CASE WHEN SUM(f.liters) > 0
          THEN ROUND(SUM(t.actual_distance) / SUM(f.liters), 2)
          ELSE 0 END as fuel_efficiency,
        COALESCE(SUM(f.cost), 0) as fuel_cost,
        COALESCE(SUM(m.cost), 0) as maintenance_cost,
        COALESCE(SUM(f.cost), 0) + COALESCE(SUM(m.cost), 0) as total_operational_cost,
        v.acquisition_cost,
        COALESCE(SUM(t.revenue), 0) as total_revenue,
        CASE WHEN v.acquisition_cost > 0
          THEN ROUND(
            (COALESCE(SUM(t.revenue), 0) - (COALESCE(SUM(f.cost), 0) + COALESCE(SUM(m.cost), 0))) /
            v.acquisition_cost * 100, 2)
          ELSE 0 END as roi
      FROM vehicles v
      LEFT JOIN trips t ON t.vehicle_id = v.id AND t.status = 'Completed'
      LEFT JOIN fuel_logs f ON f.vehicle_id = v.id
      LEFT JOIN maintenance_logs m ON m.vehicle_id = v.id AND m.status = 'Closed'
      GROUP BY v.id, v.name, v.registration_number, v.acquisition_cost
      ORDER BY v.name
    `);

    const tripsByMonth = await pool.query(`
      SELECT
        TO_CHAR(created_at, 'Mon') as month,
        COUNT(*) as trips,
        COALESCE(SUM(revenue), 0) as revenue
      FROM trips
      WHERE created_at > NOW() - INTERVAL '6 months'
      GROUP BY TO_CHAR(created_at, 'Mon'), EXTRACT(MONTH FROM created_at)
      ORDER BY EXTRACT(MONTH FROM created_at)
    `);

    res.json({
      vehicle_analytics: fuelEfficiency.rows,
      trips_by_month: tripsByMonth.rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CSV export helper
function toCsv(rows) {
  const headers = Object.keys(rows[0] || {});
  return [
    headers.join(','),
    ...rows.map(row => headers.map(h => `"${row[h] ?? ''}"`).join(','))
  ].join('\n');
}

router.get('/export/vehicles', auth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vehicles ORDER BY name');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=vehicles.csv');
    res.send(toCsv(result.rows));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/export/trips', auth, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT t.*, v.name as vehicle_name, d.name as driver_name
      FROM trips t
      LEFT JOIN vehicles v ON t.vehicle_id = v.id
      LEFT JOIN drivers d ON t.driver_id = d.id
      ORDER BY t.created_at DESC
    `);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=trips.csv');
    res.send(toCsv(result.rows));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
