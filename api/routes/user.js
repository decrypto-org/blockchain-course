const winston = require('winston')
const express = require('express')
const {loginRequired} = require('./auth')
const router = express.Router()

router.get(
  '/current',
  loginRequired,
  (req, res) => {
    const user = req.user
    res.json({success: 200, user: user})
  }
)

module.exports = router
