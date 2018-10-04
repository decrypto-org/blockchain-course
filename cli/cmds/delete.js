const { handleDeleteEntity, buildCommand } = require('../helpers')
const { LectureGroup, Lecture, File } = require('blockchain-course-db').models

const deleteSubCommands = {
  options: { cmd: ':key <id>', desc: 'Delete :key' },
  entries: {
    file: [File, {}, handleDeleteEntity],
    group: [LectureGroup, {}, handleDeleteEntity],
    lecture: [Lecture, {}, handleDeleteEntity]
  }
}

const cmd = {
  command: 'delete <command>',
  desc: 'Delete an entity <group|lecture|file>'
}

module.exports = buildCommand(cmd, deleteSubCommands)
