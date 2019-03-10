const { mainCmdbuilder, printAndExit, constructTable } = require('../helpers')

const getRanking = async (argv, order = 'ASC') => {
  const { User, sequelize, ParameterizedAssignment } = require('blockchain-course-db').models

  let res = await ParameterizedAssignment.findAll({
    include: [{
      model: User,
      as: 'student'
    }],
    attributes: ['ParameterizedAssignment.studentId', 'student.id', [sequelize.fn('COUNT', 'solved'), 'solved']],
    where: { solved: true },
    group: ['ParameterizedAssignment.studentId', 'student.id', 'ParameterizedAssignment.solved'],
    limit: argv.n,
    order: [[sequelize.fn('count', sequelize.col('solved')), order]]
  })

  res = res.map(row => (
    [
      row.dataValues.student.id,
      row.dataValues.student.username,
      row.dataValues.student.email,
      row.dataValues.solved
    ]
  ))

  const table = constructTable(
    ['User ID', 'Username', 'Email', 'Total Solved'],
    res
  )

  return table.toString()
}

const getScore = async (argv) => {
  const { ParameterizedAssignment } = require('blockchain-course-db').models
  
  const totalSolved = await ParameterizedAssignment.count(
    {
      where: { studentId: argv.id, solved: true }
    }
  )

  const totalAssignments = Assignment.findAll().length
  const table = constructTable(
    ['User ID', 'Total Solved', 'Total Assignments'],
    [[argv.id, totalSolved, totalAssignments]]
  )

  return table.toString()
}

const orderOptions = {
  number: {
    alias: 'n',
    describe: 'Number of users',
    default: 10,
    number: true
  }
}

const subCommands = {
  top: {
    command: 'top',
    desc: 'Get top users',
    builder: { ...orderOptions },
    handler: async (argv) => printAndExit(await getRanking(argv, 'DESC'))
  },
  last: {
    command: 'last',
    desc: 'Get last users',
    builder: { ...orderOptions },
    handler: async (argv) => printAndExit(await getRanking(argv, 'ASC'))
  },
  score: {
    command: 'score <id>',
    desc: 'Get the score of a user',
    builder: {},
    handler: async (argv) => printAndExit(await getScore(argv, 'DESC'))
  }
}

module.exports = {
  command: 'stats <command>',
  desc: 'Get user stats <top|last|score>',
  builder: (yargs) => mainCmdbuilder(yargs, subCommands),
  handler: (argv) => {}
}
