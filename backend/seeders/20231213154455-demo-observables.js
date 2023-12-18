'use strict';
const { v4: uuidv4 } = require('uuid');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Observables', [{
      id: uuidv4(),
      category: 'Host',
      subCategory: 'Windows',
      detailType: 'file path',
      dataType: 'string',
      comparisonOperator: 'equals',
      value: 'C:\\Program Files\\Example\\example.exe',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Observables', null, {});
  }
};
