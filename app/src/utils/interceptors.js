import store from '../store'
import { logout } from '../actions/user.js'

const responseThen = (res) => {
  return res
}

const responseCatch = (error) => {
  if (error.response.status === 403) {
    store.dispatch(logout())
  }
  return Promise.reject(error)
}

export {
  responseThen,
  responseCatch
}
