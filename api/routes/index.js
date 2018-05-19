const express = require('express')
const auth = require('./auth')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello, world!')
})

module.exports = {
  '/': router,
  '/auth': auth
}
