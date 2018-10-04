'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    return queryInterface.addColumn(
      'ParameterizedAssignments',
      'solved',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('ParameterizedAssignments', 'solved')
  }
};
