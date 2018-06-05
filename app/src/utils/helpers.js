const isString = (str) => {
  return Object.prototype.toString.call(str) === '[object String]'
}

export {
  isString
}
