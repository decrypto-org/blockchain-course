const logger = require('../config/winston')
const passport = require('passport')
const GitHubStrategy = require('./github')
const { User } = require('blockchain-course-db').models

passport.serializeUser((user, done) => {
  logger.debug(`Serializing user ${user}`)
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  logger.debug(`Deserializing user ${id}`)
  done(null, await User.findByPk(id))
})

passport.use(GitHubStrategy)

module.exports = passport
