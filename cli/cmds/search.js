const _ = require('lodash')
const { mainCmdbuilder, printAndExit, constructTable } = require('../helpers')

const userOptions = {
  username: {
    alias: 'u',
    describe: 'The username of the user'
  },
  email: {
    alias: 'e',
    describe: 'The email of the user'
  }
}

const searchUser = async (argv) => {
  const { User } = require('blockchain-course-db').models
  const userArguments = _.intersection(Object.keys(argv), Object.keys(userOptions))

  const whereAttributes = userArguments.reduce((prev, current) => {
    prev[current] = argv[current]
    return prev
  }, {})

  let res = await User.findAll({ where: { ...whereAttributes } })

  res = res.map(row => (
    [
      row.dataValues.id,
      row.dataValues.username,
      row.dataValues.email,
      row.dataValues.firstName,
      row.dataValues.lastName,
      row.dataValues.githubId
    ]
  ))

  const table = constructTable(
    ['User ID', 'Username', 'Email', 'First Name', 'Last Name', 'Github ID'],
    res
  )

  return table.toString()
}

const subCommands = {
  assignments: {
    command: 'user',
    desc: 'Searches for a user. All provided arguments are criteria of the WHERE clause and are combined with the AND operator. Run cli.js search --help for more information.',
    builder: { ...userOptions },
    handler: async (argv) => printAndExit(await searchUser(argv))
  }
}

module.exports = {
  command: 'search <user>',
  desc: 'Searches entities by arguments. Run cli.js search --help for more information.',
  builder: (yargs) => mainCmdbuilder(yargs, subCommands),
  handler: (argv) => {}
}
