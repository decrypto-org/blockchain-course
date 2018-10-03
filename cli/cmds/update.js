const { handleUpdateEntity, buildCommand } = require('../helpers')
const { LectureGroup, Lecture, File } = require('blockchain-course-db').models

const getCommonCmdOptions = (entityName) => {
  return {
    title: {
      alias: 't',
      describe: `The title of the ${entityName}`
    },
    description: {
      alias: 'd',
      describe: `The description of the ${entityName}`
    },
    position: {
      alias: 'p',
      describe: `The position of the ${entityName}`
    }
  }
}

const fileCmdOptions = {
  file: {
    alias: 'f',
    describe: `File path`
  },
  type: {
    alias: 'y',
    describe: `The type name`
  },
  objId: {
    alias: 'o',
    describe: `The object id`
  }
}

const lectureCmdOptions = {
  groupId: {
    alias: 'g',
    describe: `The group id`
  }
}

const updateSubCommands = {
  options: { cmd: ':key <id>', desc: 'Update :key' },
  entries: {
    file: [File, { ...getCommonCmdOptions('file'), ...fileCmdOptions }, handleUpdateEntity],
    group: [LectureGroup, { ...getCommonCmdOptions('group') }, handleUpdateEntity],
    lecture: [Lecture, { ...getCommonCmdOptions('lecture'), ...lectureCmdOptions }, handleUpdateEntity]
  }
}

const cmd = {
  command: 'update <command>',
  desc: 'Update an entity <group|lecture|file>'
}

module.exports = buildCommand(cmd, updateSubCommands)
