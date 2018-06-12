const isString = (str) => {
  return Object.prototype.toString.call(str) === '[object String]'
}

module.exports = {
  isString
}
