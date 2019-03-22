import types from '../actions/actionTypes'

import { createReducer } from '../utils/reducers'

const defaultState = {
  topUsers: []
}

const auth = createReducer(defaultState, {
  [types.GET_TOP_USER_SUCCESS]: (state, action) => { return { ...state, topUsers: [ ...action.payload.data.users ] } }
})

export default auth
