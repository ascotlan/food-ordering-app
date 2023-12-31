-- Drop and recreate Users table

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  restaurant_admin BOOLEAN DEFAULT FALSE,
  restaurant_id INTEGER REFERENCES restaurants(id) ON DELETE CASCADE,
  phone_number VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL
);
