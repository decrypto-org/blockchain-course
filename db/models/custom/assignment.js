const ASSIGNMENT_FOLDER = process.env.ASSIGNMENT_FOLDER || '../../assignments'

const assignments = require(ASSIGNMENT_FOLDER)
const _ = require('lodash')

const FileContainer = require('./FileContainer')

class Assignment extends FileContainer {
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

  static findAllByGroup(group) {
    return _.chain(assignments)
      .values()
      .filter(res => res.metadata.group == group)
      .value()
  }
}

Assignment.name = "Assignment"
Assignment.hidden = false;

module.exports = Assignment
