const fs = require('fs')

const isString = (str) => {
  return Object.prototype.toString.call(str) === '[object String]'
}

const inPath = (arr, str) => {
  return arr.some(regexp => str.match(regexp))
}

const mapJSFiles = (dirname, mapFn, exclude = []) => {
  fs
    .readdirSync(dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && !exclude.includes(file) && (file.slice(-3) === '.js')
    })
    .forEach(mapFn)
}

const classMixin = (A, B) => class A extends B {}

module.exports = {
  isString,
  inPath,
  mapJSFiles,
  classMixin
}
