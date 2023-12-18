const Sequelize = require('sequelize');

// Database connection
const sequelize = new Sequelize('hammervision', 'username', 'password', {
  host: 'localhost', // or the host where your DB is running
  dialect: 'postgres',
});

module.exports = sequelize;

