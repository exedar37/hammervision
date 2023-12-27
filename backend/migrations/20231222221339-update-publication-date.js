'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Reports', 'publicationDate', {
      type: Sequelize.DATEONLY,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Reports', 'publicationDate', {
      type: Sequelize.DATE,
    });
  },
};
