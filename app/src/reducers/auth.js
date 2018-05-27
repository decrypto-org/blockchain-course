import authService from '../utils/AuthService'

import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  UNAUTHORIZED_ACTION
} from '../actions/actionTypes'

const defaultState = {
  isAuthenticated: authService.isAuthenticated()
}

const auth = (state = defaultState, action) => {
  const { type } = action

  switch (type) {
    case USER_LOGGED_IN:
      return {...state, isAuthenticated: true}
    case UNAUTHORIZED_ACTION:
      return {...state, isAuthenticated: false}
    case USER_LOGGED_OUT:
      return {...state, isAuthenticated: false}
    default:
      return state
  }
}

export default auth
