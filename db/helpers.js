const fs = require('fs')
const path = require('path')

const mapJSFiles = (dirname, mapFn, exclude = []) => {
  fs
    .readdirSync(dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && !exclude.includes(file) && (file.slice(-3) === '.js')
    })
    .forEach(mapFn)
}

const loadAssignments = (dirname, cb, exclude = []) => {
  let dirs = fs.readdirSync(dirname).filter(
    dirent => fs.statSync(path.join(dirname, dirent)).isDirectory() && !exclude.includes(dirent)
  )

  return dirs.forEach(dir => {
    fs.readdirSync(path.join(dirname, dir))
      .filter(file => {
        return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js' && !exclude.includes(file))
      })
      .forEach(file => cb(path.join(dirname, dir, file)))
  })
}

module.exports = {
  mapJSFiles,
  loadAssignments
}
