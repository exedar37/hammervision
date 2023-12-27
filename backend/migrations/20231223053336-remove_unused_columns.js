'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Reports', 'dateOfAddition');
    await queryInterface.removeColumn('Reports', 'updatedDate');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Reports', 'dateOfAddition', {
      type: Sequelize.DATE,
      allowNull: true
    });
    await queryInterface.addColumn('Reports', 'updatedDate', {
      type: Sequelize.DATE,
      allowNull: true
    });
  }
};
