const { handleAddEntity, buildCommand } = require('../helpers')
const { LectureGroup, Lecture, File } = require('blockchain-course-db').models

const getCommonCmdOptions = (entityName) => {
  return {
    title: {
      alias: 't',
      describe: `The title of the ${entityName}`,
      demandOption: true
    },
    description: {
      alias: 'd',
      default: '',
      describe: `The description of the ${entityName}`
    },
    position: {
      alias: 'p',
      default: 0,
      describe: `The position of the ${entityName}`
    }
  }
}

const fileCmdOptions = {
  file: {
    alias: 'f',
    describe: `File path`,
    demandOption: true
  },
  type: {
    alias: 'y',
    describe: `The type name`,
    demandOption: true
  },
  objId: {
    alias: 'o',
    describe: `The object id`,
    demandOption: true
  }
}

const lectureCmdOptions = {
  groupId: {
    alias: 'g',
    describe: `The group id`,
    demandOption: true
  }
}

const addSubCommands = {
  options: { cmd: ':key', desc: 'Add :key' },
  entries: {
    file: [File, { ...getCommonCmdOptions('file'), ...fileCmdOptions }, handleAddEntity],
    group: [LectureGroup, { ...getCommonCmdOptions('group') }, handleAddEntity],
    lecture: [Lecture, { ...getCommonCmdOptions('lecture'), ...lectureCmdOptions }, handleAddEntity]
  }
}

const cmd = {
  command: 'add <command>',
  desc: 'Add an entity <group|lecture|file>'
}

module.exports = buildCommand(cmd, addSubCommands)
