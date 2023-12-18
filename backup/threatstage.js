// models/threatStage.js
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class ThreatStage extends Model {}

ThreatStage.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  mitreAttackTechnique: {
    type: DataTypes.STRING,
    allowNull: true
  },
  // The relationship to Observables will be defined via associations
}, {
  sequelize,
  modelName: 'ThreatStage',
  // Optional: If you want to add createdAt and updatedAt automatically
  timestamps: true,
  // Optional: Soft deletes can be enabled if needed
  paranoid: true
});

return ThreatStage;
};
