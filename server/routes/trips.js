const router = require('express').Router();
const pool = require('../db');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT t.*,
        v.name as vehicle_name, v.registration_number,
        d.name as driver_name
      FROM trips t
      LEFT JOIN vehicles v ON t.vehicle_id = v.id
      LEFT JOIN drivers d ON t.driver_id = d.id
      ORDER BY t.created_at DESC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create trip (Draft) — validates capacity, driver status, license expiry
router.post('/', auth, async (req, res) => {
  const { source, destination, vehicle_id, driver_id, cargo_weight, planned_distance, revenue } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Validate vehicle
    const vehicleRes = await client.query('SELECT * FROM vehicles WHERE id = $1', [vehicle_id]);
    const vehicle = vehicleRes.rows[0];
    if (!vehicle) throw new Error('Vehicle not found');
    if (vehicle.status !== 'Available') throw new Error(`Vehicle is ${vehicle.status} — cannot assign`);
    if (parseFloat(cargo_weight) > parseFloat(vehicle.max_load_capacity)) {
      throw new Error(`Cargo weight (${cargo_weight}kg) exceeds vehicle capacity (${vehicle.max_load_capacity}kg)`);
    }

    // Validate driver
    const driverRes = await client.query('SELECT * FROM drivers WHERE id = $1', [driver_id]);
    const driver = driverRes.rows[0];
    if (!driver) throw new Error('Driver not found');
    if (driver.status === 'Suspended') throw new Error('Driver is suspended — cannot assign');
    if (driver.status === 'On Trip') throw new Error('Driver is already on a trip');
    if (new Date(driver.license_expiry) <= new Date()) {
      throw new Error(`Driver license expired on ${driver.license_expiry}`);
    }

    const result = await client.query(
      `INSERT INTO trips (source, destination, vehicle_id, driver_id, cargo_weight, planned_distance, revenue, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'Draft') RETURNING *`,
      [source, destination, vehicle_id, driver_id, cargo_weight, planned_distance, revenue || 0]
    );

    await client.query('COMMIT');
    res.json(result.rows[0]);
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
});

// Dispatch trip — re-validate then flip vehicle + driver to On Trip
router.patch('/:id/dispatch', auth, async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const tripRes = await client.query('SELECT * FROM trips WHERE id = $1', [req.params.id]);
    const trip = tripRes.rows[0];
    if (!trip) throw new Error('Trip not found');
    if (trip.status !== 'Draft') throw new Error('Only Draft trips can be dispatched');

    const vehicle = (await client.query('SELECT * FROM vehicles WHERE id = $1', [trip.vehicle_id])).rows[0];
    const driver = (await client.query('SELECT * FROM drivers WHERE id = $1', [trip.driver_id])).rows[0];

    if (vehicle.status !== 'Available') throw new Error(`Vehicle is now ${vehicle.status}`);
    if (driver.status !== 'Available') throw new Error(`Driver is now ${driver.status}`);
    if (new Date(driver.license_expiry) <= new Date()) throw new Error('Driver license expired');

    await client.query("UPDATE trips SET status='Dispatched', dispatched_at=NOW() WHERE id=$1", [req.params.id]);
    await client.query("UPDATE vehicles SET status='On Trip' WHERE id=$1", [trip.vehicle_id]);
    await client.query("UPDATE drivers SET status='On Trip' WHERE id=$1", [trip.driver_id]);

    await client.query('COMMIT');
    res.json({ message: 'Trip dispatched' });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
});

// Complete trip — restore vehicle/driver to Available, update odometer, auto-log fuel
router.patch('/:id/complete', auth, async (req, res) => {
  const { final_odometer, fuel_consumed, actual_distance } = req.body;
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const tripRes = await client.query('SELECT * FROM trips WHERE id = $1', [req.params.id]);
    const trip = tripRes.rows[0];
    if (!trip) throw new Error('Trip not found');
    if (trip.status !== 'Dispatched') throw new Error('Only Dispatched trips can be completed');

    await client.query(
      `UPDATE trips SET status='Completed', completed_at=NOW(), final_odometer=$1, fuel_consumed=$2, actual_distance=$3
       WHERE id=$4`,
      [final_odometer, fuel_consumed, actual_distance, req.params.id]
    );

    await client.query("UPDATE vehicles SET status='Available', odometer=$1 WHERE id=$2", [final_odometer, trip.vehicle_id]);
    await client.query("UPDATE drivers SET status='Available' WHERE id=$1", [trip.driver_id]);

    // Auto-create fuel log (estimated cost @ 1.5/liter unit)
    if (fuel_consumed && fuel_consumed > 0) {
      const fuelCostEstimate = parseFloat(fuel_consumed) * 1.5;
      await client.query(
        `INSERT INTO fuel_logs (vehicle_id, trip_id, liters, cost, date) VALUES ($1, $2, $3, $4, CURRENT_DATE)`,
        [trip.vehicle_id, trip.id, fuel_consumed, fuelCostEstimate]
      );
    }

    await client.query('COMMIT');
    res.json({ message: 'Trip completed' });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
});

// Cancel trip — release vehicle/driver if it was dispatched
router.patch('/:id/cancel', auth, async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const tripRes = await client.query('SELECT * FROM trips WHERE id = $1', [req.params.id]);
    const trip = tripRes.rows[0];
    if (!trip) throw new Error('Trip not found');
    if (trip.status === 'Completed') throw new Error('Completed trips cannot be cancelled');

    await client.query("UPDATE trips SET status='Cancelled' WHERE id=$1", [req.params.id]);

    if (trip.status === 'Dispatched') {
      await client.query("UPDATE vehicles SET status='Available' WHERE id=$1", [trip.vehicle_id]);
      await client.query("UPDATE drivers SET status='Available' WHERE id=$1", [trip.driver_id]);
    }

    await client.query('COMMIT');
    res.json({ message: 'Trip cancelled' });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
});

module.exports = router;
