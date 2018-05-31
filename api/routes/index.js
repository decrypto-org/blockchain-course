const express = require('express')
const auth = require('./auth')
const assignment = require('./assignment')
const user = require('./user')
const router = express.Router()

router.get('/', (req, res) => {
  if (req.user) {
    res.send(`Hello, ${req.user.username}!`)
  } else {
    res.send('Hello, world!')
  }
})

module.exports = {
  '/': router,
  '/auth': auth,
  '/assignment': assignment,
  '/user': user
}
