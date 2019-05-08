const Server = require('socket.io')

const logger = require('./config/winston')
const { appEmitterBus } = require('./emitters.js')

const setupWss = async (server, sessionMiddleware) => {
  const io = new Server(server)



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
