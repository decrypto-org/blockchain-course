const { sequelize } = require('blockchain-course-db').models
const crypto = require('crypto')
const fs = require('fs')

const slugify = (string) => {
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

const printAndExit = (data, exitCode = 0) => {
  console.log(data)
  sequelize.close()
}

const hashFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const frs = fs.createReadStream(filePath)
    const hash = crypto.createHash('sha256')

    frs.on('error', reject)
    frs.on('data', chunk => hash.update(chunk))
    frs.on('end', () => resolve(hash.digest('hex')))
  })
}

module.exports = {
  hashFile
}
