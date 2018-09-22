const isString = (str) => {
  return Object.prototype.toString.call(str) === '[object String]'
}

const inPath = (arr, str) => {
  return arr.some(regexp => str.match(regexp))
}

module.exports = {
  isString,
  inPath
}
