const router = require('express').Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// Get all vehicles (with optional filters)
router.get('/', auth, async (req, res) => {
  try {
    const { type, status, region } = req.query;
    let query = 'SELECT * FROM vehicles WHERE 1=1';
    const params = [];
    if (type) { params.push(type); query += ` AND type = $${params.length}`; }
    if (status) { params.push(status); query += ` AND status = $${params.length}`; }
    if (region) { params.push(region); query += ` AND region = $${params.length}`; }
    query += ' ORDER BY created_at DESC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get available vehicles for dispatch (excludes On Trip, In Shop, Retired)
router.get('/available', auth, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM vehicles WHERE status = 'Available' ORDER BY name"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create vehicle
router.post('/', auth, async (req, res) => {
  const { registration_number, name, type, max_load_capacity, odometer, acquisition_cost, region } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO vehicles (registration_number, name, type, max_load_capacity, odometer, acquisition_cost, region)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [registration_number, name, type, max_load_capacity, odometer || 0, acquisition_cost, region]
    );
    res.json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(400).json({ error: 'Registration number already exists' });
    res.status(500).json({ error: err.message });
  }
});

// Update vehicle
router.put('/:id', auth, async (req, res) => {
  const { name, type, max_load_capacity, acquisition_cost, region, status } = req.body;
  try {
    const result = await pool.query(
      `UPDATE vehicles SET name=$1, type=$2, max_load_capacity=$3, acquisition_cost=$4, region=$5, status=$6
       WHERE id=$7 RETURNING *`,
      [name, type, max_load_capacity, acquisition_cost, region, status, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete vehicle
router.delete('/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM vehicles WHERE id = $1', [req.params.id]);
    res.json({ message: 'Vehicle deleted' });
  } catch (err) {
    if (err.code === '23503') return res.status(400).json({ error: 'Vehicle is referenced by trips/logs — cannot delete' });
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
