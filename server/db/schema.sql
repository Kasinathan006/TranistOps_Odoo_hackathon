-- TransitOps schema — run once against a fresh `transitops` database:
--   createdb transitops
--   psql -d transitops -f db/schema.sql

-- Users and roles
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'Driver',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Vehicles
CREATE TABLE IF NOT EXISTS vehicles (
  id SERIAL PRIMARY KEY,
  registration_number VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL,
  max_load_capacity DECIMAL(10,2) NOT NULL,
  odometer DECIMAL(10,2) DEFAULT 0,
  acquisition_cost DECIMAL(12,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'Available',
  region VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Drivers
CREATE TABLE IF NOT EXISTS drivers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  license_number VARCHAR(50) UNIQUE NOT NULL,
  license_category VARCHAR(20) NOT NULL,
  license_expiry DATE NOT NULL,
  contact_number VARCHAR(20),
  safety_score INTEGER DEFAULT 100,
  status VARCHAR(20) DEFAULT 'Available',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Trips
CREATE TABLE IF NOT EXISTS trips (
  id SERIAL PRIMARY KEY,
  source VARCHAR(200) NOT NULL,
  destination VARCHAR(200) NOT NULL,
  vehicle_id INTEGER REFERENCES vehicles(id),
  driver_id INTEGER REFERENCES drivers(id),
  cargo_weight DECIMAL(10,2) NOT NULL,
  planned_distance DECIMAL(10,2) NOT NULL,
  actual_distance DECIMAL(10,2),
  fuel_consumed DECIMAL(10,2),
  final_odometer DECIMAL(10,2),
  status VARCHAR(20) DEFAULT 'Draft',
  revenue DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  dispatched_at TIMESTAMP,
  completed_at TIMESTAMP
);

-- Maintenance
CREATE TABLE IF NOT EXISTS maintenance_logs (
  id SERIAL PRIMARY KEY,
  vehicle_id INTEGER REFERENCES vehicles(id),
  description TEXT NOT NULL,
  cost DECIMAL(12,2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'Active',
  started_at TIMESTAMP DEFAULT NOW(),
  closed_at TIMESTAMP
);

-- Fuel logs
CREATE TABLE IF NOT EXISTS fuel_logs (
  id SERIAL PRIMARY KEY,
  vehicle_id INTEGER REFERENCES vehicles(id),
  trip_id INTEGER REFERENCES trips(id),
  liters DECIMAL(10,2) NOT NULL,
  cost DECIMAL(12,2) NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Expenses
CREATE TABLE IF NOT EXISTS expenses (
  id SERIAL PRIMARY KEY,
  vehicle_id INTEGER REFERENCES vehicles(id),
  trip_id INTEGER REFERENCES trips(id),
  type VARCHAR(50) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Seed admin user (email: admin@transitops.com / password: admin123)
INSERT INTO users (name, email, password, role)
VALUES ('Admin', 'admin@transitops.com', '$2a$10$whqu4h6R9qX8IjRxupxaVuCCWjz90MekQ.qIUFxNggNNBuBiREmsq', 'Fleet Manager')
ON CONFLICT (email) DO NOTHING;
