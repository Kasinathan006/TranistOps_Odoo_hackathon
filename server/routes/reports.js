const router = require('express').Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// Dashboard KPIs — vehicles, drivers, trips, fleet utilization + financials
router.get('/dashboard', auth, async (req, res) => {
  try {
    const [vehicles, drivers, trips, utilization, revenueQ, costQ] = await Promise.all([
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
      `),
      pool.query(`SELECT COALESCE(SUM(revenue), 0) as total_revenue FROM trips WHERE status='Completed'`),
      pool.query(`SELECT COALESCE(SUM(amount), 0) as total_cost FROM expenses`)
    ]);

    const totalRevenue = Number(revenueQ.rows[0].total_revenue);
    const totalCost = Number(costQ.rows[0].total_cost);
    const grossProfit = totalRevenue - totalCost;
    const profitMargin = totalRevenue > 0 ? ((grossProfit / totalRevenue) * 100).toFixed(1) : 0;

    res.json({
      vehicles: vehicles.rows[0],
      drivers: drivers.rows[0],
      trips: trips.rows[0],
      fleet_utilization: utilization.rows[0].fleet_utilization || 0,
      financials: {
        total_revenue: totalRevenue,
        total_cost: totalCost,
        gross_profit: grossProfit,
        profit_margin: Number(profitMargin)
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Analytics — per-vehicle ROI, fuel efficiency + trips/revenue/cost by month
router.get('/analytics', auth, async (req, res) => {
  try {
    const vehicleAnalytics = await pool.query(`
      SELECT
        v.name as vehicle_name,
        v.registration_number,
        COALESCE(t.total_distance, 0) as total_distance,
        COALESCE(f.total_fuel, 0) as total_fuel,
        CASE WHEN f.total_fuel > 0
          THEN ROUND(COALESCE(t.total_distance, 0) / f.total_fuel, 2)
          ELSE 0 END as fuel_efficiency,
        COALESCE(e.fuel_cost, 0) as fuel_cost,
        COALESCE(e.maintenance_cost, 0) as maintenance_cost,
        COALESCE(e.total_operational_cost, 0) as total_operational_cost,
        v.acquisition_cost,
        COALESCE(t.total_revenue, 0) as total_revenue,
        COALESCE(t.total_revenue, 0) - COALESCE(e.total_operational_cost, 0) as net_profit,
        CASE WHEN v.acquisition_cost > 0
          THEN ROUND(
            (COALESCE(t.total_revenue, 0) - COALESCE(e.total_operational_cost, 0)) /
            v.acquisition_cost * 100, 2)
          ELSE 0 END as roi
      FROM vehicles v
      LEFT JOIN (
        SELECT vehicle_id, SUM(actual_distance) as total_distance, SUM(revenue) as total_revenue
        FROM trips WHERE status = 'Completed' GROUP BY vehicle_id
      ) t ON t.vehicle_id = v.id
      LEFT JOIN (
        SELECT vehicle_id, SUM(liters) as total_fuel
        FROM fuel_logs GROUP BY vehicle_id
      ) f ON f.vehicle_id = v.id
      LEFT JOIN (
        SELECT vehicle_id,
               SUM(CASE WHEN type = 'Fuel' THEN amount ELSE 0 END) as fuel_cost,
               SUM(CASE WHEN type = 'Maintenance' THEN amount ELSE 0 END) as maintenance_cost,
               SUM(amount) as total_operational_cost
        FROM expenses GROUP BY vehicle_id
      ) e ON e.vehicle_id = v.id
      ORDER BY v.name
    `);

    const tripsByMonth = await pool.query(`
      SELECT
        TO_CHAR(created_at, 'Mon YYYY') as month,
        TO_CHAR(created_at, 'YYYY-MM') as month_sort,
        COUNT(*) as trips,
        COALESCE(SUM(revenue), 0) as revenue
      FROM trips
      WHERE created_at > NOW() - INTERVAL '6 months'
      GROUP BY TO_CHAR(created_at, 'Mon YYYY'), TO_CHAR(created_at, 'YYYY-MM')
      ORDER BY TO_CHAR(created_at, 'YYYY-MM')
    `);

    const expensesByMonth = await pool.query(`
      SELECT
        TO_CHAR(date, 'Mon YYYY') as month,
        TO_CHAR(date, 'YYYY-MM') as month_sort,
        COALESCE(SUM(amount), 0) as cost
      FROM expenses
      WHERE date > NOW() - INTERVAL '6 months'
      GROUP BY TO_CHAR(date, 'Mon YYYY'), TO_CHAR(date, 'YYYY-MM')
      ORDER BY TO_CHAR(date, 'YYYY-MM')
    `);

    // Merge revenue + cost into one array by month for chart
    const monthMap = {};
    for (const r of tripsByMonth.rows) {
      monthMap[r.month_sort] = { month: r.month, trips: Number(r.trips), revenue: Number(r.revenue), cost: 0 };
    }
    for (const e of expensesByMonth.rows) {
      if (monthMap[e.month_sort]) {
        monthMap[e.month_sort].cost = Number(e.cost);
      } else {
        monthMap[e.month_sort] = { month: e.month, trips: 0, revenue: 0, cost: Number(e.cost) };
      }
    }
    const revenueVsCost = Object.values(monthMap).sort((a, b) => a.month_sort < b.month_sort ? -1 : 1);

    res.json({
      vehicle_analytics: vehicleAnalytics.rows,
      trips_by_month: tripsByMonth.rows,
      revenue_vs_cost: revenueVsCost
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CSV helper — properly quotes fields
function toCsv(rows) {
  if (!rows.length) return 'No data';
  const headers = Object.keys(rows[0]);
  const escape = (val) => `"${String(val ?? '').replace(/"/g, '""')}"`;
  return [headers.join(','), ...rows.map(r => headers.map(h => escape(r[h])).join(','))].join('\n');
}

router.get('/export/vehicles', auth, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, registration_number, type, status, acquisition_cost, odometer, fuel_type, created_at
      FROM vehicles ORDER BY name
    `);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=vehicles.csv');
    res.send(toCsv(result.rows));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/export/trips', auth, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT t.id, t.status, t.origin, t.destination, t.scheduled_at, t.completed_at,
             t.actual_distance, t.revenue, t.notes,
             v.name as vehicle_name, v.registration_number,
             d.name as driver_name
      FROM trips t
      LEFT JOIN vehicles v ON t.vehicle_id = v.id
      LEFT JOIN drivers d ON t.driver_id = d.id
      ORDER BY t.created_at DESC
    `);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=trips.csv');
    res.send(toCsv(result.rows));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/export/expenses', auth, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.id, e.type, e.amount, e.description, e.date,
             v.name as vehicle_name, v.registration_number
      FROM expenses e
      LEFT JOIN vehicles v ON e.vehicle_id = v.id
      ORDER BY e.date DESC
    `);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=expenses.csv');
    res.send(toCsv(result.rows));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/export/analytics', auth, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        v.name as vehicle_name,
        v.registration_number,
        COALESCE(t.total_distance, 0) as total_distance_km,
        COALESCE(f.total_fuel, 0) as total_fuel_liters,
        CASE WHEN f.total_fuel > 0
          THEN ROUND(COALESCE(t.total_distance, 0) / f.total_fuel, 2)
          ELSE 0 END as fuel_efficiency_km_per_liter,
        COALESCE(e.fuel_cost, 0) as fuel_cost,
        COALESCE(e.maintenance_cost, 0) as maintenance_cost,
        COALESCE(e.total_operational_cost, 0) as total_operational_cost,
        v.acquisition_cost,
        COALESCE(t.total_revenue, 0) as total_revenue,
        COALESCE(t.total_revenue, 0) - COALESCE(e.total_operational_cost, 0) as net_profit,
        CASE WHEN v.acquisition_cost > 0
          THEN ROUND(
            (COALESCE(t.total_revenue, 0) - COALESCE(e.total_operational_cost, 0)) /
            v.acquisition_cost * 100, 2)
          ELSE 0 END as roi_percent
      FROM vehicles v
      LEFT JOIN (
        SELECT vehicle_id, SUM(actual_distance) as total_distance, SUM(revenue) as total_revenue
        FROM trips WHERE status = 'Completed' GROUP BY vehicle_id
      ) t ON t.vehicle_id = v.id
      LEFT JOIN (
        SELECT vehicle_id, SUM(liters) as total_fuel
        FROM fuel_logs GROUP BY vehicle_id
      ) f ON f.vehicle_id = v.id
      LEFT JOIN (
        SELECT vehicle_id,
               SUM(CASE WHEN type = 'Fuel' THEN amount ELSE 0 END) as fuel_cost,
               SUM(CASE WHEN type = 'Maintenance' THEN amount ELSE 0 END) as maintenance_cost,
               SUM(amount) as total_operational_cost
        FROM expenses GROUP BY vehicle_id
      ) e ON e.vehicle_id = v.id
      ORDER BY v.name
    `);
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=vehicle_analytics.csv');
    res.send(toCsv(result.rows));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
