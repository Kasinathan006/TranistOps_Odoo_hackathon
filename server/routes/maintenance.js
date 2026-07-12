const router = require('express').Router();
const pool = require('../db');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT m.*, v.name as vehicle_name, v.registration_number
      FROM maintenance_logs m
      LEFT JOIN vehicles v ON m.vehicle_id = v.id
      ORDER BY m.started_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create maintenance — auto sets vehicle to In Shop
router.post('/', auth, async (req, res) => {
  const { vehicle_id, description, cost } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const vehicle = (await client.query('SELECT * FROM vehicles WHERE id = $1', [vehicle_id])).rows[0];
    if (!vehicle) throw new Error('Vehicle not found');
    if (vehicle.status === 'On Trip') throw new Error('Vehicle is on a trip — cannot add to maintenance');
    if (vehicle.status === 'Retired') throw new Error('Vehicle is retired');

    const result = await client.query(
      `INSERT INTO maintenance_logs (vehicle_id, description, cost, status) VALUES ($1, $2, $3, 'Active') RETURNING *`,
      [vehicle_id, description, cost || 0]
    );

    await client.query("UPDATE vehicles SET status='In Shop' WHERE id=$1", [vehicle_id]);

    await client.query('COMMIT');
    res.json(result.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
});

// Close maintenance — restores vehicle to Available (unless Retired)
router.patch('/:id/close', auth, async (req, res) => {
  const { cost } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const maintRes = await client.query('SELECT * FROM maintenance_logs WHERE id = $1', [req.params.id]);
    const maint = maintRes.rows[0];
    if (!maint) throw new Error('Maintenance record not found');
    if (maint.status === 'Closed') throw new Error('Already closed');

    const updatedMaint = await client.query(
      `UPDATE maintenance_logs SET status='Closed', closed_at=NOW(), cost=COALESCE($1, cost) WHERE id=$2 RETURNING *`,
      [cost, req.params.id]
    );
    const finalCost = updatedMaint.rows[0].cost;

    if (finalCost && finalCost > 0) {
      await client.query(
        `INSERT INTO expenses (vehicle_id, trip_id, type, amount, description, date) VALUES ($1, $2, $3, $4, $5, NOW())`,
        [maint.vehicle_id, null, 'Maintenance', finalCost, maint.description]
      );
    }

    const vehicle = (await client.query('SELECT * FROM vehicles WHERE id = $1', [maint.vehicle_id])).rows[0];
    if (vehicle.status !== 'Retired') {
      await client.query("UPDATE vehicles SET status='Available' WHERE id=$1", [maint.vehicle_id]);
    }

    await client.query('COMMIT');
    res.json({ message: 'Maintenance closed' });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
});

module.exports = router;
