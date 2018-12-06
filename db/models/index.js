'use strict'

const CUSTOM_MODELS_PATH = __dirname + '/custom'

const path = require('path')
const Sequelize = require('sequelize')
const basename = path.basename(__filename)
const { mapJSFiles } = require('../helpers.js')
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/../config/config.js')[env]
const models = {}

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config)
}

mapJSFiles(__dirname, (file) => {
  const model = sequelize['import'](path.join(__dirname, file))
  models[model.name] = model
}, [basename])

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

// Map custom models
mapJSFiles(CUSTOM_MODELS_PATH, (file) => {
  const model = require(path.join(CUSTOM_MODELS_PATH, file))
  if(!model.hidden) {
    models[model.name] = model
  }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

module.exports = models
