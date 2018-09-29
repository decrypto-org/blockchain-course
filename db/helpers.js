const crypto = require('crypto')
const fs = require('fs')

const isString = (str) => {
  return Object.prototype.toString.call(str) === '[object String]'
}

const mapJSFiles = (dirname, mapFn, exclude = []) => {
  fs
    .readdirSync(dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && !exclude.includes(file) && (file.slice(-3) === '.js')
    })
    .forEach(mapFn)
}

const sha256 = (data) => {
  const hash = crypto.createHash('sha256')
  hash.update(data)
  return hash.digest('hex')
}

module.exports = {
  isString,
  mapJSFiles,
  sha256
}
