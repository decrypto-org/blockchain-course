const { handleJudgement } = require('../helpers')
const { Assignment } = require('blockchain-course-db').models

const judgeOptions = {
  user: {
    alias: 'u',
    default: { id: 1, username: 'fake_user' },
    describe: `A user object (Some assignments use the user.id as part of aux.public). Example: --user.id=1 --user.username=fake_user`
  },
  solution: {
    alias: 's',
    demandOption: true,
    describe: 'A solution'
  },
  aux: {
    alias: 'a',
    demandOption: true,
    describe: 'An aux. Example: --aux.public=1 --aux.private=secret'
  }
}

const cmd = {
  command: 'judge <id>',
  desc: 'Judge a solution for a specific assignment',
  builder: { ...judgeOptions },
  handler: (argv) => handleJudgement(argv, Assignment)
}

module.exports = cmd
