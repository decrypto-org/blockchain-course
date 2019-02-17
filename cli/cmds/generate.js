const { handleAuxGeneration, buildCommand } = require('../helpers')
const { Assignment } = require('blockchain-course-db').models

const userOptions = {
  user: {
    alias: 'u',
    default: { id: 1, username: 'fake_user' },
    describe: `A user object (Some assignments use the user.id as part of aux.public). Example: --user.id=1 --user.username=fake_user`
  }
}

const getSubCommands = {
  options: { cmd: ':key <id>', desc: 'Generate an aux for a specific assignment' },
  entries: {
    aux: [Assignment, { ...userOptions }, handleAuxGeneration]
  }
}

const cmd = {
  command: 'generate <command>',
  desc: 'Generate <aux>'
}

module.exports = buildCommand(cmd, getSubCommands)
