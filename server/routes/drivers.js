const router = require('express').Router();
const pool = require('../db');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const { status, category } = req.query;
    let query = 'SELECT * FROM drivers WHERE 1=1';
    const params = [];
    if (status) { params.push(status); query += ` AND status = $${params.length}`; }
    if (category) { params.push(category); query += ` AND license_category = $${params.length}`; }
    query += ' ORDER BY created_at DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Available drivers for dispatch — must be Available AND have a non-expired license
router.get('/available', auth, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM drivers
       WHERE status = 'Available'
       AND license_expiry > CURRENT_DATE
       ORDER BY name`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  const { name, license_number, license_category, license_expiry, contact_number, safety_score } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO drivers (name, license_number, license_category, license_expiry, contact_number, safety_score)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, license_number, license_category, license_expiry, contact_number, safety_score || 100]
    );
    res.json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') return res.status(400).json({ error: 'License number already exists' });
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  const { name, license_category, license_expiry, contact_number, safety_score, status } = req.body;
  try {
    const result = await pool.query(
      `UPDATE drivers SET name=$1, license_category=$2, license_expiry=$3, contact_number=$4, safety_score=$5, status=$6
       WHERE id=$7 RETURNING *`,
      [name, license_category, license_expiry, contact_number, safety_score, status, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM drivers WHERE id = $1', [req.params.id]);
    res.json({ message: 'Driver deleted' });
  } catch (err) {
    if (err.code === '23503') return res.status(400).json({ error: 'Driver is referenced by trips — cannot delete' });
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
