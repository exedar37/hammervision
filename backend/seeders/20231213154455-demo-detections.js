'use strict';
const { v4: uuidv4 } = require('uuid');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Detections', [{
      id: uuidv4(),
      name: 'Malware Detection',
      description: 'Detects presence of malware based on file path',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Detections', null, {});
  }
};
