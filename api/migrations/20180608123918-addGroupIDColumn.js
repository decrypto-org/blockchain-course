module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Assignments',
      'groupId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'LectureGroups',
          key: 'id'
        }
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Assignments', 'groupId')
  }
}
