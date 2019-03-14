const { handleJudgement } = require('../helpers')

const judgeOptions = {
  user: {
    alias: 'u',
    default: { id: 0, username: 'fake_user' },
    describe: `A user object (Some assignments use the user.id as part of aux.public). Example: --user.id=1 --user.username=fake_user.`
  },
  solution: {
    alias: 's',
    demandOption: true,
    describe: 'A solution given as string or file path. If a file path is specified the solution will be read from the specific file. Be aware that you must specify the -f (or --file) option when provide files as solution.'
  },
  aux: {
    alias: 'a',
    default: { public: 0, private: 0 },
    describe: 'An aux. Example: --aux.public=1 --aux.private=secret.'
  },
  file: {
    alias: 'f',
    boolean: true,
    describe: 'Must be specified if the solution is provided by a file.'
  }
}

const cmd = {
  command: 'judge <id>',
  desc: 'Judge a solution for a specific assignment. Run cli.js judge --help for more information.',
  builder: { ...judgeOptions },
  handler: (argv) => handleJudgement(argv)
}

module.exports = cmd
