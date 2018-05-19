const GitHubStrategy = require('passport-github')

const strategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  (authToken, refreshToken, profile, cb) => {
    /*
      console.log('GitHub profile:')
      console.log('===============')
      console.log(profile)
      console.log('===============')
    */
    /*
      User.findOrCreate({githubId: profile.id}, (err, user) => {
        return cb(err, user)
      })
    */
  }
)

module.exports = strategy
