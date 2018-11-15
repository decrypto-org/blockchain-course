require('dotenv').config()

const LISTEN_PORT = process.env.PORT || 3000
const express = require('express')
const bodyParser = require('body-parser')
const routes = require('./routes')
const passport = require('./auth')
const logger = require('./config/winston')
const app = express()
const helmet = require('helmet')
const cors = require('cors')
const session = require('express-session')
const { loginRequired } = require('./middlewares/authentication')
const { HTTPErrorHandler } = require('./middlewares/error')

;(async () => {
  app.set('trust proxy', '127.0.0.1')
  app.use(helmet())
  app.use(cors({ credentials: true, origin: process.env.APP_URL, methods: ['GET', 'PUT', 'POST'] }))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use(session({
    secret: process.env.APP_SECRET || 'blockchain course default session secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      secure: false
    }
  }))
  app.use(passport.initialize())
  app.use(passport.session())

  app.use(loginRequired)

  for (const url in routes) {
    app.use(url, routes[url])
  }

  app.use(HTTPErrorHandler)

  app.listen(LISTEN_PORT, () => {
    logger.info('Blockchain Course API server running on port %d', LISTEN_PORT)
  })
})()
