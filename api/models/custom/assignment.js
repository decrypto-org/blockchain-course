const assignments = require('../../assignments')

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
}

Assignment.name = "Assignment"

module.exports = Assignment
