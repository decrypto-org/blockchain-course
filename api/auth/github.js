const winston = require('winston')
const GitHubStrategy = require('passport-github')
const {User} = require('../models')

const strategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  async (authToken, refreshToken, profile, cb) => {
    winston.log('debug', 'Received profile from GitHub', {profile})

    let email = ''

    if(profile.emails && profile.emails.length > 0) {
      email = profile.emails[0].value
    }

    let [user, created] = await User.findOrCreate(
      {
        where: {githubId: profile.id},
        defaults: {
          username: profile.username,
          email,
          firstName: profile.displayName.split(' ')[0],
          lastName: profile.displayName.split(' ').slice(1).join(' ')
        }
      }
    )
    if (created) {
      winston.log('debug', 'Registered new user', {user})
    }
    else {
      winston.log('debug', 'Logged in existing user', {user})
    }
    return cb(null, user)
  }
)

module.exports = strategy
