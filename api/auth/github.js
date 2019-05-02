const logger = require('../config/winston')
const GitHubStrategy = require('passport-github')
const { User } = require('blockchain-course-db').models

const strategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  async (authToken, refreshToken, profile, cb) => {
    logger.debug(`Received profile from GitHub ${profile}`)
    const defaults = {
      username: profile.username,
      email: '',
      firstName: '',
      lastName: ''
    }

    if (profile.emails && profile.emails.length > 0) {
      defaults.email = profile.emails[0].value
    }

    if (profile.displayName) {
      defaults.firstName = profile.displayName.split(' ')[0]
      defaults.lastName = profile.displayName.split(' ').slice(1).join(' ')
    }

    let [user, created] = await User.findOrCreate(
      {
        where: { githubId: profile.id },
        defaults
      }
    )
    if (created) {
      logger.debug(`Registered new user ${user}`)
    } else {
      logger.debug(`Logged in existing user ${user}`)
    }
    return cb(null, user)
  }
)

module.exports = strategy
