const { Model, DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  class Report extends Model {}

Report.init({
  // Unique ID with UUID
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  sourceOrganization: {
    type: DataTypes.STRING,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateOfAddition: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  publicationDate: {
    type: DataTypes.DATE
  },
  updatedDate: {
    type: DataTypes.DATE
  },
  // The column for links to ThreatStage objects will be handled via associations
}, {
  sequelize,
  modelName: 'Report',
  // Optional: If you want to add createdAt and updatedAt automatically
  timestamps: true,
  // Optional: Soft deletes can be enabled if needed
  paranoid: true
});

return Report;
};
