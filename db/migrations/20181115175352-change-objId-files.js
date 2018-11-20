'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.changeColumn('Files', 'objId', { type: Sequelize.STRING })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Files', 'objId', { type: Sequelize.INTEGER })
  }
};
