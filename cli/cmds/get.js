const { handleGetEntity, buildCommand } = require('../helpers')
const { LectureGroup, Lecture, File } = require('blockchain-course-db').models

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
    file: [File, { ...commonOptions }, handleGetEntity],
    group: [LectureGroup, { ...commonOptions }, handleGetEntity],
    lecture: [Lecture, { ...commonOptions }, handleGetEntity]
  }
}

const cmd = {
  command: 'get <command>',
  desc: 'Get an entity <group|lecture|file>'
}

module.exports = buildCommand(cmd, getSubCommands)
