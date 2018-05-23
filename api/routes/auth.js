const winston = require('winston')
const express = require('express')
const passport = require('passport')
const router = express.Router()

router.get(
  '/github',
  passport.authenticate('github', {scope: ['profile']})
)
router.get(
  '/github/callback',
  passport.authenticate(
    'github',
    {
      successRedirect: process.env.APP_URL || 'http://localhost:3001/',
      failureRedirect: '/logout'
    }
  )
)
router.get('/logout', (req, res) => {
  if (req.user) {
    winston.log('debug', 'Logging out user', req.user)
    req.session.destroy()
    res.clearCookie('connect.sid')
    return res.json({msg: 'Logged out'})
  }
  return res.json({msg: 'You are not logged in'})
})
router.loginRequired = (req, res, next) => {
  if (req.user) {
    next()
  }
  else {
    res.status(403).json({msg: 'Login required'})
  }
}

module.exports = router
