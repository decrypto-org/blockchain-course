/* global WebSocket */
import types from './actionTypes'
import { store } from '../store'

const URI = process.env.REACT_APP_WS || 'ws://localhost:3000'
let webSocket = null

let pingTimeout = null

const heartbeat = () => {
  clearTimeout(pingTimeout)

  pingTimeout = setTimeout(() => {
    webSocket.close()
  }, 30000 + 1000) // 30 seconds
}

const check = () => {
  if (!webSocket || webSocket.readyState === WebSocket.CLOSED) initWebsocket()
}

const initWebsocket = () => {
  webSocket = new WebSocket(URI)

  webSocket.onmessage = (event) => {
    const data = JSON.parse(event.data)

    if (data.message && data.message === 'ping') {
      webSocket.send(JSON.stringify({ message: 'pong' }))
      heartbeat()
      return
    }

    store.dispatch({ type: types.OPEN_TOAST, payload: { message: data.judgement.msg } })
  }

  webSocket.onopen = () => {
    console.log(` Ws: Connected to ${URI}`)
    heartbeat()
  }
  webSocket.onclose = () => {
    console.log(` Ws: Disconnected from server`)
    webSocket = null
    clearTimeout(pingTimeout)
    check()
  }
}

const emit = (type, payload) => webSocket.send(JSON.stringify({ type, payload }))

export {
  initWebsocket,
  emit
}
