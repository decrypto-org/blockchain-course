const passport = require('passport')
const GitHubStrategy = require('./github')

passport.serializeUser((user, done) => {
  console.log('Serializing user:')
  console.log(user)
  done(null, {_id: user._id})
})

passport.deserializeUser((id, done) => {
  console.log('Deserializing user ', id)
})

passport.use(GitHubStrategy)

module.exports = passport
