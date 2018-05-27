import { combineReducers } from 'redux'
import user from './user'
import lectures from './lectures'
import assignments from './assignments'
import singleAssignment from './assignment'
import notification from './notifications'
import auth from './auth'

const app = combineReducers({
  user,
  lectures,
  assignments,
  singleAssignment,
  notification,
  auth
})

export default app
