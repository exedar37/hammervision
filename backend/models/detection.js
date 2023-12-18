const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Detection extends Model {}

  Detection.init({
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
      type: DataTypes.TEXT
    },
    // Add additional fields as needed
    // Example: Severity level of the detection
    severity: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'low'
    }
    // Timestamps can be enabled if needed
  }, {
    sequelize,
    modelName: 'Detection',
    // Optional: If you want to add createdAt and updatedAt automatically
    timestamps: true,
    // Optional: Soft deletes can be enabled if needed
    paranoid: true
  });

  return Detection;
};
