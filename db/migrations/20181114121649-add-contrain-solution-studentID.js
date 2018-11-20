'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    queryInterface.addConstraint('Solutions', ['studentId'], {
      type: 'foreign key',
      name: 'foreign-solution-users-id',
      references: {
        table: 'Users',
        field: 'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('users', 'foreign-solution-users-id');
  }
};
