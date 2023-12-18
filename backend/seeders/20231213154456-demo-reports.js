'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Reports', [{
      id: uuidv4(),
      sourceOrganization: 'Security Org',
      title: 'Monthly Threat Analysis',
      dateOfAddition: new Date(),
      publicationDate: new Date(),
      createdAt: new Date(), 
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reports', null, {});
  }
};
