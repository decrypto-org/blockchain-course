require('dotenv').config()

const LISTEN_PORT = process.env.PORT || 3000
const winston = require('winston')
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const app = express()
const session = require('express-session')

app.use(session({
  secret: process.env.APP_SECRET || 'blockchain course default session secret',
  resave: false,
  saveUninitialized: false
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

for (url in routes) {
  app.use(url, routes[url])
}

const server = app.listen(LISTEN_PORT, () => {
  winston.info('Blockchain Course API server running on port ' + LISTEN_PORT)
})
