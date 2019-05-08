const Server = require('socket.io')
const passportSocketIo = require('passport.socketio')

const passport = require('./auth')
const logger = require('./config/winston')
const { appEmitterBus } = require('./emitters.js')

const setupWss = async (server, sessionStore) => {
  const io = new Server(server)


  io.use(passportSocketIo.authorize({
    cookieParser: require('cookie-parser'),
    secret: process.env.APP_SECRET || 'blockchain course default session secret',
    store: sessionStore,
    passport
  }))

  io.on('connection', (ws) => {
    logger.info('Web client connected.')

    appEmitterBus.on('solution-judgement-available', (msg) => {
      if (msg) {
        ws.emit('solution-judgement-available', { message: 'solution', judgement: msg })
      }
    })
  })
}

module.exports = { setupWss }
