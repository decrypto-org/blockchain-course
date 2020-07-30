const _ = require('lodash')
const { mainCmdbuilder, printAndExit, constructTable } = require('../helpers')

const getAssignments = async (argv) => {
  const { ParameterizedAssignment } = require('blockchain-course-db').models

  let res = await ParameterizedAssignment.findAll({
    attributes: ['assignmentName', 'solved'],
    where: { studentId: argv.id }
  })

  res = res.map(row => (
    [
      row.dataValues.assignmentName,
      row.dataValues.solved ? 'Yes' : 'No'
    ]
  ))
    .sort()

  const table = constructTable(
    ['Assignment Name', 'Solved'],
    res
  )

  return table.toString()
}

const getSolutions = async (argv) => {
  const { ParameterizedAssignment, Solution } = require('blockchain-course-db').models
  const solvedOnly = argv['solved-only'] === 'undefined'? false: argv.solvedOnly

  let res = await ParameterizedAssignment.findAll({
    include: [{
      model: Solution,
      attributes: ['data']
    }],
    attributes: ['assignmentName', 'solved'],
    where: { studentId: argv.id }
  })

  res = res.map(row => {
    const ret = [row.dataValues.assignmentName, row.dataValues.solved]
    if (!solvedOnly) {
      ret.push(_.isEmpty(row.dataValues.Solutions) ? '' : row.dataValues.Solutions[0].dataValues.data)
    }
    return ret
  })

  const columnNames = ['Assignment Name', 'Solved']
  if (!solvedOnly) {
    columnNames.push('Solution')
  }

  const table = constructTable(
    columnNames,
    res
  )

  return table.toString()
}

const subCommands = {
  assignments: {
    command: 'assignments [id]',
    desc: 'Get all assignments of a specific user whose id is [id].',
    builder: {},
    handler: async (argv) => printAndExit(await getAssignments(argv))
  },
  solutions: {
    command: 'solutions [id]',
    desc: 'Get all assignment\'s solutions of a specific user whose id is [id].',
    builder: {},
    handler: async (argv) => printAndExit(await getSolutions(argv))
  }
}

module.exports = {
  command: 'user <assignments|solutions> [id]',
  desc: 'Get user specific information. Run cli.js user --help for more information.',
  builder: (yargs) => mainCmdbuilder(yargs, subCommands),
  handler: (argv) => {}
}
