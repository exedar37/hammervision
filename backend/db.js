const { Pool } = require('pg');

const pool = new Pool({
  user: 'user', // your database user
  host: 'db', // name of the service in docker-compose
  database: 'hammervision', // your database name
  password: 'password', // your database password
  port: 5432, // default PostgreSQL port
});

module.exports = pool;

