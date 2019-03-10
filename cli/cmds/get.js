const { handleGetEntity, buildCommand } = require('../helpers')

const commonOptions = {
  all: {
    alias: 'a',
    describe: 'All groups',
    boolean: true
  }
}

const getSubCommands = {
  options: { cmd: ':key [id]', desc: 'Get :key(s)' },
  entries: {
    assignment: ['Assignment', { ...commonOptions }, handleGetEntity],
    user: ['User', { ...commonOptions }, handleGetEntity]
  }
}

const cmd = {
  command: 'get <command>',
  desc: 'Get an entity <assignment>'
}

module.exports = buildCommand(cmd, getSubCommands)
