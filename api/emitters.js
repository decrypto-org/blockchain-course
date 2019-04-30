const EventEmitter = require('events')

const appEmitterBus = new EventEmitter()

module.exports = { appEmitterBus }
