import { notify } from './notifications'
import auth from '../utils/AuthService'
import types from './actionTypes'
import { buildActions } from '../utils/actions'

const logout = () => {
  return dispatch => {
    dispatch({ type: types.LOGOUT_REQUEST, payload: {} })
    auth.logout()
    dispatch({ type: types.LOGOUT_SUCCESS, payload: {} })
    dispatch({ type: types.USER_LOGGED_OUT, payload: {} })
  }
}

const unauthorize = () => {
  return dispatch => {
    dispatch({ type: types.UNAUTHORIZED_ACTION, payload: {} })
    dispatch(notify('Unauthorized action! Please login.'))
    dispatch(logout())
  }
}

let actions = buildActions({
  getCurrentUser: types.GET_CURRENT_USER,
  getCurrentUserSuccess: types.GET_CURRENT_USER_SUCCESS,
  fetchCurrentUser: ['getCurrentUser', 'getCurrentUserSuccess', 'user/current']
})

actions.logout = logout
actions.unauthorize = unauthorize

export default actions
