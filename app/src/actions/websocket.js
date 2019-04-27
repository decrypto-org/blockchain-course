import types from './actionTypes'
import { store } from '../store'
import ReconnectingWebSocket from 'reconnecting-websocket'

const URI = process.env.REACT_APP_WS || 'ws://localhost:3000'
let pingTimeout = null

const heartbeat = (ws) => {
  clearTimeout(pingTimeout)

  pingTimeout = setTimeout(() => {
    ws.close()
  }, 30000 + 1000) // 30 seconds
}

const initWebsocket = () => {
  const webSocket = new ReconnectingWebSocket(URI)

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
    heartbeat(webSocket)
  }

  webSocket.onclose = () => {
    console.log(` Ws: Disconnected from server`)
    clearTimeout(pingTimeout)
  }
}

export {
  initWebsocket
}
