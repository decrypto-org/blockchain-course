const { sequelize } = require('blockchain-course-db').models

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

module.exports = {}
