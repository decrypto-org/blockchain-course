const Server = require('socket.io')
const passportSocketIo = require('passport.socketio')

const passport = require('./auth')
const logger = require('./config/winston')
const { appEmitterBus } = require('./emitters.js')

const clients = {}

const setupWss = async (server, sessionStore) => {
  const io = new Server(server)

  io.use(passportSocketIo.authorize({
    cookieParser: require('cookie-parser'),
    secret: process.env.APP_SECRET || 'blockchain course default session secret',
    store: sessionStore,
    passport
  }))

  io.on('connection', (client) => {
    logger.info(`Web client connected: ID: ${client.id}`)
    const user = { ...client.request.user.dataValues }
    clients[user.id] = { socketID: client.id, user }

    client.on('disconnect', (reason) => {
      logger.info(`Web client disconnected: ${reason}`)
      delete clients[user.id]
    })
  })
}

module.exports = { setupWss }
