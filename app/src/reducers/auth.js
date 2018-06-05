import authService from '../utils/AuthService'

import * as types from '../actions/actionTypes'

import {createReducer} from '../utils/reducers'

const defaultState = {
  isAuthenticated: authService.isAuthenticated()
}

const auth = createReducer(defaultState, {
  [types.USER_LOGGED_IN]: (state) => { return {...state, isAuthenticated: true} },
  [types.UNAUTHORIZED_ACTION]: (state) => { return {...state, isAuthenticated: false} },
  [types.USER_LOGGED_OUT]: (state) => { return {...state, isAuthenticated: false} }
})

export default auth
