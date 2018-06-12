const express = require('express')
const auth = require('./auth')
const assignment = require('./assignment')
const user = require('./user')
const groups = require('./lectureGroup')
const lectures = require('./lectures')
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
  '/user': user,
  '/lectureGroup': groups,
  '/lecture': lectures
}
