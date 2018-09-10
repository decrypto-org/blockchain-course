const winston = require('winston')
const passport = require('passport')
const GitHubStrategy = require('./github')
const { User } = require('../models')

passport.serializeUser((user, done) => {
  winston.log('debug', 'Serializing user', { user })
  done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
  winston.log('debug', 'Deserializing user', { id })
  done(null, await User.findById(id))
})

passport.use(GitHubStrategy)

module.exports = passport
