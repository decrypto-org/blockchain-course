import io from 'socket.io-client'
import types from './actionTypes'
import { store } from '../store'

const URI = process.env.REACT_APP_WS || 'ws://localhost:3000'

const initWebsocket = () => {
  /* eslint-disable-next-line new-cap */
  const webSocket = new io(URI)

  webSocket.on('solution-judgement-available', (data) => {
    const message = { title: data.judgement.assignment.title, content: data.judgement.msg }
    store.dispatch({ type: types.OPEN_TOAST, payload: { message } })
  })

  webSocket.on('connect', () => {
    console.log(` Ws: Connected to ${URI}`)
  })

  webSocket.on('disconnect', () => {
    console.log(` Ws: Disconnected from server`)
  })
}

export {
  initWebsocket
}
