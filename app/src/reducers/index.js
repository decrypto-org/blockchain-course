import { combineReducers } from 'redux'
import user from './user'
import lectures from './lectures'
import groups from './lectureGroups'
import group from './lectureGroup'
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
  auth,
  groups,
  group
})

export default app
