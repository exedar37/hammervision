'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Add the associations manually here
db.Detection.belongsToMany(db.Observable, { through: 'DetectionObservables' });
db.Observable.belongsToMany(db.Detection, { through: 'DetectionObservables' });

db.ThreatStage.belongsToMany(db.Observable, { through: 'ThreatStageObservables' });
db.Observable.belongsToMany(db.ThreatStage, { through: 'ThreatStageObservables' });

db.Report.belongsToMany(db.ThreatStage, { through: 'ReportThreatStages' });
db.ThreatStage.belongsToMany(db.Report, { through: 'ReportThreatStages' });

// Check if any model has an associate method and execute it
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
