const WebSocket = require('ws')

const logger = require('./config/winston')
const { appEmitterBus } = require('./emitters.js')
const { serialize, unserialize } = require('./utils/helpers.js')

const startPing = ({ wss, interval = 30 * 1000 }) =>
  setInterval(() => {
    wss.clients.forEach((ws) => {
      if (!ws.isAlive) {
        return ws.terminate()
      }
      ws.isAlive = false
      ws.send(serialize({ message: 'ping' }))
    })
  }, interval)

const setupWss = async (server, sessionMiddleware) => {
  const wss = new WebSocket.Server({
    server,
    verifyClient: ({ req }, done) => {
      return sessionMiddleware(req, {}, () => done(req.session.id))
    }
  })

  wss.on('connection', (ws, req) => {
    logger.info('Web client connected.')
    ws.req = req
    ws.isAlive = true

    ws.on('pong', () => (ws.isAlive = true))
    ws.on('message', (msg) => {
      msg = unserialize(msg)
      if (msg.message === 'pong') {
        ws.isAlive = true
      }
    }) // silent client message

    appEmitterBus.on('solution-judgement-available', (msg) => {
      if (ws.readyState === WebSocket.OPEN && msg) {
        ws.send(serialize({ message: 'solution', judgement: msg }))
      }
    })
  })

  startPing({ wss, interval: 30 * 1000 }) // 30 seconds
}

module.exports = { setupWss }
