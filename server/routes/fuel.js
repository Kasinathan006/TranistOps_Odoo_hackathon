const router = require('express').Router();
const pool = require('../db');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT f.*, v.name as vehicle_name
      FROM fuel_logs f
      LEFT JOIN vehicles v ON f.vehicle_id = v.id
      ORDER BY f.date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  const { vehicle_id, trip_id, liters, cost, date } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO fuel_logs (vehicle_id, trip_id, liters, cost, date) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [vehicle_id, trip_id || null, liters, cost, date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add expense
router.post('/expense', auth, async (req, res) => {
  const { vehicle_id, trip_id, type, amount, description, date } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO expenses (vehicle_id, trip_id, type, amount, description, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [vehicle_id, trip_id || null, type, amount, description, date]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/expenses', auth, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.*, v.name as vehicle_name
      FROM expenses e
      LEFT JOIN vehicles v ON e.vehicle_id = v.id
      ORDER BY e.date DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
