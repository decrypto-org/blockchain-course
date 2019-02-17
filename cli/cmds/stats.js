const { mainCmdbuilder } = require('../helpers')
const { Assignment, User } = require('blockchain-course-db').models

const orderOptions = {
  number: {
    alias: 'n',
    describe: 'Number of users',
    number: true
  }
}

const subCommands = {
  top: {
    command: 'top',
    desc: 'Get top users',
    builder: { ...orderOptions },
    handler: async (argv) => {}
  },
  last: {
    command: 'last',
    desc: 'Get last users',
    builder: { ...orderOptions },
    handler: async (argv) => {}
  },
  score: {
    command: 'score <id>',
    desc: 'Get the score of a user',
    builder: {},
    handler: async (argv) => {
      const totalSolved = await ParameterizedAssignment.count(
        {
          where: { studentId: argv.id, solved: true }
        })
      const totalAssignments = Assignment.findAll().length
      const table = constructTable(
        ['User ID', 'Total Solved', 'Total Assignments'],
        [[argv.id, totalSolved, totalAssignments]]
      )
      printAndExit(table.toString())
    }
  }
}

module.exports = {
  command: 'stats <command>',
  desc: 'Get user stats <top|last|score>',
  builder: (yargs) => mainCmdbuilder(yargs, subCommands),
  handler: (argv) => {}
}
