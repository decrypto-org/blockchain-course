const ASSIGNMENT_FOLDER = process.env.ASSIGNMENT_FOLDER || '../../assignments'

const assignments = require(ASSIGNMENT_FOLDER)
const _ = require('lodash')
const path = require('path');

const FileContainer = require('./FileContainer')

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
