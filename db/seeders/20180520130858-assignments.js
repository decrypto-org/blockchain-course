const {Assignment} = require('../models')
const assignments = require('../assignments')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    for (const assignment in assignments) {
      await Assignment.create(assignments[assignment].metadata)
    }
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete(
      'Assignments',
      null,
      {}
    )
  }
}
