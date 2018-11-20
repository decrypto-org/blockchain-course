import store from '../store'

import { userActions, notify } from '../actions'

const unauthorize = userActions.unauthorize

const responseThen = (res) => {
  return res
}

const responseCatch = (error) => {
  if (!error.hasOwnProperty('response')) {
    store.dispatch(notify(`Error: ${error.message}`))
    return Promise.reject(error)
  }

  if (error.response.status === 403) {
    store.dispatch(unauthorize())
  }

  if (error.response.status === 404) {
    store.dispatch(notify('404! The page you are looking for can\'t be found'))
  }

  if (error.response.status === 500) {
    store.dispatch(notify(`Request failed with status code 500: ${error.message}`))
  }

  return Promise.reject(error)
}

export {
  responseThen,
  responseCatch
}
