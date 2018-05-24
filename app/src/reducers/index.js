import { combineReducers } from 'redux'
import user from './user'
import lectures from './lectures'
import assignments from './assignments'

const app = combineReducers({
  user,
  lectures,
  assignments
})

export default app
