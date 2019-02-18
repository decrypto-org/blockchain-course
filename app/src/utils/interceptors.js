import axios from 'axios'

import { userActions, notify, requestStart, requestFinish } from '../actions'

const unauthorize = userActions.unauthorize

const setupInterceptors = (store) => {
  const requestThen = (config) => {
    store.dispatch(requestStart())
    return config
  }

  const requestCatch = (error) => {
    store.dispatch(requestFinish())
    return Promise.reject(error)
  }

  const responseThen = (res) => {
    store.dispatch(requestFinish())
    return res
  }

  const responseCatch = (error) => {
    console.log(error)
    store.dispatch(requestFinish())

    if (!error.hasOwnProperty('response')) {
      store.dispatch(notify(`Error: ${error.message}`))
      return Promise.reject(error)
    }

    if (error.response.status === 403) {
      store.dispatch(unauthorize())
    }

    if (error.response.data && error.response.data.error) {
      const e = error.response.data.error
      store.dispatch(notify(e.message))
      return Promise.reject(error)
    }

    if (error.response.status === 404) {
      store.dispatch(notify('404! The page you are looking for can\'t be found'))
    }

    if (error.response.status === 500) {
      store.dispatch(notify(`Request failed with status code 500: ${error.message}`))
    }

    return Promise.reject(error)
  }

  axios.interceptors.request.use(requestThen, requestCatch)
  axios.interceptors.response.use(responseThen, responseCatch)
}

export {
  setupInterceptors
}
