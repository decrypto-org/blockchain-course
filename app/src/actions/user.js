import { notify } from './notifications'
import auth from '../utils/AuthService'
import types from './actionTypes'
import { buildActions } from '../utils/actions'

const unauthorize = () => {
  return dispatch => {
    dispatch({ type: types.UNAUTHORIZED_ACTION, payload: {} })
    dispatch(notify({ content: 'Unauthorized action! Please login.' }))
    dispatch(auth.logout())
  }
}

let actions = buildActions({
  getCurrentUser: types.GET_CURRENT_USER,
  getCurrentUserSuccess: types.GET_CURRENT_USER_SUCCESS,
  requestLogout: types.LOGOUT_REQUEST,
  requestLogoutSuccess: types.LOGOUT_SUCCESS,
  fetchCurrentUser: ['getCurrentUser', 'getCurrentUserSuccess', 'user/current'],
  logout: ['requestLogout', 'requestLogoutSuccess', 'auth/logout']
})

actions.unauthorize = unauthorize

export default actions
