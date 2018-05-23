import { combineReducers } from 'redux'
import user from './user'
import assignments from './assignments'

const app = combineReducers({
  user,
  assignments
})

export default app
