const logger = require('../config/winston')
const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get(
  '/github',
  passport.authenticate('github', { scope: ['profile'] })
)

router.get(
  '/github/callback',
  passport.authenticate(
    'github',
    {
      successRedirect: process.env.APP_URL || 'http://localhost:3001/loginCallback',
      failureRedirect: '/logout'
    }
  )
)

router.get('/logout', (req, res) => {
  if (req.user) {
    logger.debug(`Logging out user ${req.user}`)
    req.session.destroy()
    req.logout()
    res.clearCookie('connect.sid')
    return res.status(200).json({})
  }

  return res.status(403).json({ error: { status: 403, message: 'Unauthorized action! Please login.' } })
})

module.exports = router
