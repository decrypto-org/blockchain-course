const fs = require('fs')
const path = require('path')
const BaseJudge = require('./judge/BaseJudge')
const logger = require('../config/winston')
const assignments = {}

const loadAssignments = (dirname, cb, exclude = []) => {
  let dirs = fs.readdirSync(dirname).filter(
    dirent => fs.statSync(path.join(__dirname, dirent)).isDirectory() && !exclude.includes(dirent)
  )

  return dirs.forEach(dir => {
    fs.readdirSync(path.join(__dirname, dir))
      .filter(file => {
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js')
      })
      .forEach(file => cb(path.join(__dirname, dir, file)))
  })
}

loadAssignments(__dirname, (file) => {
  const assignment = require(file)

  if (!(assignment.prototype instanceof BaseJudge)) {
    logger.info('Skipping non-assignment', { file })
    return
  }
  if (typeof assignment.metadata === 'undefined' || typeof assignment.metadata.name === 'undefined') {
    logger.warn('Assignment ' + file + ' did not define metadata or name')
    return
  }
  assignments[assignment.metadata.name] = assignment
}, ['judge', 'solidity', '.git'])

module.exports = assignments
