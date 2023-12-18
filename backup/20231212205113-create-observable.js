'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Observables', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      category: {
        type: Sequelize.STRING
      },
      subCategory: {
        type: Sequelize.STRING
      },
      detailType: {
        type: Sequelize.STRING
      },
      dataType: {
        type: Sequelize.STRING
      },
      comparisonOperator: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Observables');
  }
};
