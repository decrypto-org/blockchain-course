import store from '../store'
import { unauthorize, notify } from '../actions'

const responseThen = (res) => {
  return res
}

const responseCatch = (error) => {
  if (error.response.status === 403) {
    store.dispatch(unauthorize())
  }

  if (error.response.status === 404) {
    store.dispatch(notify('404! The page you are looking for can\'t be found'))
  }

  return Promise.reject(error)
}

export {
  responseThen,
  responseCatch
}
