const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '.env') })

const models = require('./models')

module.exports = {
  models
}
