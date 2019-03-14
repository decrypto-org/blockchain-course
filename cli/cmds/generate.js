const { handleAuxGeneration, buildCommand } = require('../helpers')

const userOptions = {
  user: {
    alias: 'u',
    default: { id: 1, username: 'fake_user' },
    describe: `A user object (Some assignments use the user.id as part of aux.public). Example: --user.id=1 --user.username=fake_user`
  }
}

const getSubCommands = {
  options: { cmd: ':key <assignment>', desc: 'Generate aux data for an assignment' },
  entries: {
    aux: ['Assignment', { ...userOptions }, handleAuxGeneration]
  }
}

const cmd = {
  command: 'generate aux <assignment>',
  desc: 'Generate aux data for assignment <assignment>. Run cli.js generate aux --help for more information.'
}

module.exports = buildCommand(cmd, getSubCommands)
