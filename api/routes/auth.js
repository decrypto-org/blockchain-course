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
      successRedirect: '/',
      failureRedirect: '/login'
    }
  )
)
router.get('/logout', (req, res) => {
  if (req.user) {
    winston.debug('Logging out user:', req.user)
    req.session.destroy()
    res.clearCookie('connect.sid')
    return res.json({msg: 'Logged out'})
  }
  return res.json({msg: 'You are not logged in'})
})

module.exports = router
