// models/observable.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Observable extends Model {}

Observable.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  category: {  // e.g., 'Host', 'Network', etc.
    type: DataTypes.STRING,
    allowNull: false
  },
  subCategory: {  // e.g., 'Mac', 'Windows', 'Flow', 'DNS', etc.
    type: DataTypes.STRING,
    allowNull: true
  },
  detailType: {  // e.g., 'log entry', 'event name', 'API name', etc.
    type: DataTypes.STRING,
    allowNull: true
  },
  dataType: {  // e.g., 'string', 'IP', 'integer', etc.
    type: DataTypes.STRING,
    allowNull: true
  },
  comparisonOperator: {  // e.g., 'regex', 'equals', 'contains', etc.
    type: DataTypes.STRING,
    allowNull: true
  },
  value: {
    type: DataTypes.TEXT,  // or DataTypes.STRING for VARCHAR
    allowNull: false
  },
  }, {
  sequelize,
  modelName: 'Observable',
  // Optional: If you want to add createdAt and updatedAt automatically
  timestamps: true,
  // Optional: Soft deletes can be enabled if needed
  paranoid: true
});
return Observable;
};

