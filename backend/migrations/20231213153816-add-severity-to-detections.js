'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Detections', 'severity', {
      type: Sequelize.ENUM('low', 'medium', 'high'),
      defaultValue: 'low'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Detections', 'severity');
  }
};
