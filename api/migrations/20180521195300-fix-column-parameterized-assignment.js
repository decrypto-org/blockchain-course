'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'ParameterizedAssignments',
      'ParameterizedAssignments_parameterizedAssignmentId_fkey'
    )
    await queryInterface.renameColumn(
      'ParameterizedAssignments',
      'parameterizedAssignmentId',
      'assignmentId'
    )
    await queryInterface.changeColumn(
      'ParameterizedAssignments',
      'assignmentId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'Assignments',
          key: 'id'
        }
      }
    )
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'ParameterizedAssignments',
      'AssignmentId_foreign_idx'
    )
    await queryInterface.changeColumn(
      'ParameterizedAssignments',
      'assignmentId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'ParameterizedAssignments',
          key: 'id'
        }
      }
    )
    await queryInterface.renameColumn(
      'ParameterizedAssignments',
      'assignmentId',
      'parameterizedAssignmentId'
    )
  }
}
