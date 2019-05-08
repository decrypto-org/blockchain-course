import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import appReducers from './reducers'
import authService from './utils/AuthService'

const loggerMiddleware = createLogger()

const configureStore = () => {
  return createStore(
    appReducers,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
      authService.logoutMiddleware
    )
  )
}

const store = configureStore()

export { configureStore, store }
