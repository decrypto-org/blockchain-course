import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

import appReducers from './reducers'

const loggerMiddleware = createLogger()
const store = createStore(
  appReducers,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
)

export default store
