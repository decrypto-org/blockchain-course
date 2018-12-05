const util = require('util')
const { isString } = require('../helpers.js')

class BaseJudge {
  constructor (assignment, user) {
    this.assignment = assignment
    this.user = user
  }

  description (aux, user, assignment) {
    return util.format(assignment.description, aux.public)
  }

  format (value) {
    if (isString(value)) {
      return value
    }

    if (Array.isArray(value)) {
      return value.join()
    }

    return value
  }

  formatAux (aux) {
    for (let key in aux) {
      if (aux.hasOwnProperty(key)) {
        aux[key] = this.format(aux[key])
      }
    }

    return aux
  }

  /*
   * Returns false, if solution is not a valid solution
   * or integer, designating the grade of the solution
   */
  judge (solution) {
    throw new Error('Not implemented')
  }

  aux (user, assignment) {
    throw new Error('Not implemented')
  }
}

BaseJudge.type = {
  TEXT: 0,
  FILE: 1,
  CONTRACT: 2
}

module.exports = BaseJudge
