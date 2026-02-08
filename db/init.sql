-- 1. Create Enums
CREATE TYPE complaints_status AS ENUM (
  'IN_PROGRESS',
  'COMPLETED',
  'CANCELLED',
  'REJECTED'
);

-- 2. Master Tables (Tables with no dependencies)
CREATE TABLE complaint_types (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL
);

CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- 3. Dependent Tables (Level 1)
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role_id INTEGER NOT NULL REFERENCES roles(id)
);

CREATE TABLE canteens (
  id SERIAL PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  position_id INTEGER NOT NULL REFERENCES departments(id)
);

-- 4. Dependent Tables (Level 2)
CREATE TABLE stalls (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  canteen_id INTEGER NOT NULL REFERENCES canteens(id)
);

-- 5. Transaction Tables
CREATE TABLE complaints (
  id UUID PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  user_id UUID REFERENCES users(id),
  canteen_id INTEGER NOT NULL REFERENCES canteens(id),
  stall_id INTEGER REFERENCES stalls(id),
  type_id INTEGER NOT NULL REFERENCES complaint_types(id),
  details TEXT,
  status complaints_status DEFAULT 'IN_PROGRESS',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE responses (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  complaint_id UUID REFERENCES complaints(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);