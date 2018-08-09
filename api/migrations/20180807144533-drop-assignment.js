'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      'ParameterizedAssignments',
      'assignmentId_foreign_idx'
    )

    await queryInterface.changeColumn(
      'ParameterizedAssignments',
      'assignmentId',
      {
        type: Sequelize.STRING,
      }
    )

    await queryInterface.renameColumn(
      'ParameterizedAssignments',
      'assignmentId',
      'assignmentName'
    )

    await queryInterface.dropTable('Assignments', {force: true})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Assignments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.TEXT
      },
      title: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      type: {
        type: Sequelize.INTEGER
      },
      position: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.changeColumn('ParameterizedAssignments', 'assignmentName', {
      type: 'INTEGER USING CAST("assignmentName" as INTEGER)'
    });

    await queryInterface.renameColumn('ParameterizedAssignments', 'assignmentName', 'assignmentId');

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
  }
};
