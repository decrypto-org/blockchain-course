const assignments = require('../../assignments')
const _ = require('lodash')

class Assignment {
  static findByName(name) {
    if (name in assignments) {
      return assignments[name]
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
