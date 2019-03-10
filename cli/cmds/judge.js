const { handleJudgement } = require('../helpers')

const judgeOptions = {
  user: {
    alias: 'u',
    default: { id: 0, username: 'fake_user' },
    describe: `A user object (Some assignments use the user.id as part of aux.public). Example: --user.id=1 --user.username=fake_user`
  },
  solution: {
    alias: 's',
    demandOption: true,
    describe: 'A solution'
  },
  aux: {
    alias: 'a',
    default: { public: 0, private: 0 },
    describe: 'An aux. Example: --aux.public=1 --aux.private=secret'
  },
  file: {
    alias: 'f',
    boolean: true,
    describe: 'Use if the solution is a file path'
  }
}

const cmd = {
  command: 'judge <id>',
  desc: 'Judge a solution for a specific assignment',
  builder: { ...judgeOptions },
  handler: (argv) => handleJudgement(argv)
}

module.exports = cmd
