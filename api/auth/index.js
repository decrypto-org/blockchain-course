const winston = require('winston')
const passport = require('passport')
const GitHubStrategy = require('./github')

passport.serializeUser((user, done) => {
  winston.debug('Serializing user:', user)
  done(null, {_id: user._id})
})

passport.deserializeUser((id, done) => {
  winston.debug('Deserializing user ', id)
  done(null, null)
})

passport.use(GitHubStrategy)

module.exports = passport
