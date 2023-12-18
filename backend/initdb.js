const { Pool } = require('pg');

// PostgreSQL pool connection
const pool = new Pool({
  user: 'user', // Replace with your DB user
  host: 'localhost', // Replace with your DB host, use 'db' if using Docker Compose
  database: 'hammervision', // Replace with your DB name
  password: 'password', // Replace with your DB password
  port: 5432, // Default PostgreSQL port
});

// SQL queries for table creation
const createTables = `
CREATE TABLE IF NOT EXISTS reports (
    id SERIAL PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS observables (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255),
    value TEXT,
    report_id INTEGER REFERENCES reports(id)
);

CREATE TABLE IF NOT EXISTS detections (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ttps (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    details TEXT,
    detection_id INTEGER REFERENCES detections(id)
);
`;

// Function to run the query
async function createDbTables() {
  try {
    await pool.query(createTables);
    console.log('Tables created successfully');
  } catch (err) {
    console.error('Error creating tables', err);
    throw err;
  } finally {
    await pool.end();
  }
}

// Run the function
createDbTables();

