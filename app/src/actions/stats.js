
import { buildActions } from '../utils/actions'

import types from './actionTypes'

const actions = buildActions({
  getTopUsers: types.GET_TOP_USER,
  getTopUsersSuccess: types.GET_TOP_USER_SUCCESS,
  topUsers: ['getTopUsers', 'getTopUsersSuccess', 'stats/top']
})

export default actions
