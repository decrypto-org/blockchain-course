const util = require('util')
const { isString } = require('./judge-helpers')

const FAIL = {
  grade: 0,
  msg: 'Wrong! Please try again.'
}

const PASS = {
  grade: 1,
  msg: 'Congratulations! Solution correct.'
}

class IncorrectSolutionError extends Error {
  constructor (msg) {
    super(msg)
    this.message = msg
  }
}

class BaseJudge {
  constructor (assignment, user) {
    this.assignment = assignment
    this.user = user
  }

  static get FAIL () {
    return FAIL
  }

  static get PASS () {
    return PASS
  }

  description (aux, user, assignment) {
    return util.format(assignment.description, aux.public)
  }

  parseErrorMessage (msg) {
    if (msg.includes('VM Exception')) {
      return msg
    }

    return `Error: ${msg.split(':')[0]}`
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

  fail (msg) {
    throw new IncorrectSolutionError(msg)
  }

  /*
   * Returns false, if solution is not a valid solution
   * or integer, designating the grade of the solution
   */
  async performJudgement (...params) {
    try {
      return await this.judge(...params)
    }
    catch (e) {
      if (e instanceof IncorrectSolutionError) {
        return { grade: 0, msg: e.message }
      }
    }
  }

  async judge (aux, user, assignment, solution) {
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

BaseJudge.difficulty = {
  VERY_EASY: 0,
  EASY: 1,
  MEDIUM: 2,
  HARD: 3
}

BaseJudge.isAsync = false

module.exports = BaseJudge
