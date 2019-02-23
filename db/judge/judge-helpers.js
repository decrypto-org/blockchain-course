const isString = (str) => {
  return Object.prototype.toString.call(str) === '[object String]'
}


const sha256 = (data) => {
  const hash = crypto.createHash('sha256')
  hash.update(data)
  return hash.digest('hex')
}

module.exports = {
  isString,
  sha256
}
