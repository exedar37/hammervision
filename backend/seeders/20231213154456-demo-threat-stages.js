'use strict';
const { v4: uuidv4 } = require('uuid');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ThreatStages', [{
      id: uuidv4(),
      name: 'Initial Access',
      description: 'The adversary is trying to get into your network.',
      mitreAttackTechnique: 'T1190',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ThreatStages', null, {});
  }
};
