import store from '../store'
import { unauthorize } from '../actions'

const responseThen = (res) => {
  return res
}

const responseCatch = (error) => {
  if (error.response.status === 403) {
    store.dispatch(unauthorize())
  }
  return Promise.reject(error)
}

export {
  responseThen,
  responseCatch
}
