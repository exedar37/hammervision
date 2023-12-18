'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add 'deletedAt' column to 'Observables'
    await queryInterface.addColumn('Observables', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true
    });

    // Add 'deletedAt' column to 'Detections'
    await queryInterface.addColumn('Detections', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true
    });

    // Add 'deletedAt' column to 'ThreatStages'
    await queryInterface.addColumn('ThreatStages', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true
    });

    // Add 'deletedAt' column to 'Reports'
    await queryInterface.addColumn('Reports', 'deletedAt', {
      type: Sequelize.DATE,
      allowNull: true
    });

    // Repeat for any other tables/models that need the 'deletedAt' column
  },

  down: async (queryInterface, Sequelize) => {
    // Remove 'deletedAt' column from 'Observables'
    await queryInterface.removeColumn('Observables', 'deletedAt');

    // Remove 'deletedAt' column from 'Detections'
    await queryInterface.removeColumn('Detections', 'deletedAt');

    // Remove 'deletedAt' column from 'ThreatStages'
    await queryInterface.removeColumn('ThreatStages', 'deletedAt');

    // Remove 'deletedAt' column from 'Reports'
    await queryInterface.removeColumn('Reports', 'deletedAt');

    // Repeat for any other tables/models from which you need to remove the 'deletedAt' column
  }
};
