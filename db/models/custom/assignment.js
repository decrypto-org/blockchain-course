const path = require('path')
const logger = require('../../config/winston')
const { loadAssignments } = require('../../helpers')
const FileContainer = require('./FileContainer')

const ASSIGNMENT_FOLDER = process.env.ASSIGNMENT_FOLDER || '../../assignments'

const assignments = {}
const validJudges = ['BaseJudge', 'SolidityJudge']

loadAssignments(ASSIGNMENT_FOLDER, (file) => {
  const assignment = require(file)

  if (!(validJudges.includes(Object.getPrototypeOf(assignment.prototype.constructor).name))) {
    logger.info('Skipping non-assignment', { file })
    return
  }
  if (typeof assignment.metadata === 'undefined' || typeof assignment.metadata.name === 'undefined') {
    logger.warn('Assignment ' + file + ' did not define metadata or name')
    return
  }
  assignments[assignment.metadata.name] = assignment
}, ['judge', 'solidity', '.git', 'node_modules'])

class Assignment extends FileContainer {
  getResourceFolderPath() {
    return path.resolve(ASSIGNMENT_FOLDER, this.metadata.name)
  }

  static findById(id, options = {}) {
    return Assignment.findByName(id, options)
  }

  static findByName(name, options = {}) {
    if (name in assignments) {
      let instance = new Assignment()
      instance.metadata = assignments[name].metadata
      instance.Judge = assignments[name];
      return instance
    }
    return null;
  }

  static getJudge(name) {
    return assignments[name]
  }

  static getInstance() {
    return new Assignment()
  }

  static findAll() {
    return Object.values(assignments).map(res => res.metadata)
  }

  static findAllByLecture(lecture) {
      return Object.values(assignments).filter(assignment => assignment.metadata.lecture === lecture).map(assignment => assignment.metadata)
  }
}

Assignment.name = "Assignment"
Assignment.hidden = false;

module.exports = Assignment
