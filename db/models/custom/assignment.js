const ASSIGNMENT_FOLDER = process.env.ASSIGNMENT_FOLDER || '../../assignments'

const assignments = require(ASSIGNMENT_FOLDER)
const _ = require('lodash')
const path = require('path');

const FileContainer = require('./FileContainer')

class Assignment extends FileContainer {
  getResourceFolderPath() {
    return path.resolve(ASSIGNMENT_FOLDER, this.metadata.name)
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

  static findAll() {
    return Object.values(assignments).map(res => res.metadata)
  }

  static findAllByLecture(lecture) {
    return _.chain(assignments)
      .values()
      .filter(res => res.metadata.lecture == lecture)
      .value()
  }
}

Assignment.name = "Assignment"
Assignment.hidden = false;

module.exports = Assignment
