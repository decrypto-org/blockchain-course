import { notify } from './notifications'
import auth from '../utils/AuthService'
import types from './actionTypes'

const logout = () => {
  return dispatch => {
    dispatch({type: types.LOGOUT_REQUEST, payload: {}})
    auth.logout()
    dispatch({type: types.LOGOUT_SUCCESS, payload: {}})
  }
}

const unauthorize = () => {
  return dispatch => {
    dispatch({type: types.UNAUTHORIZED_ACTION, payload: {}})
    dispatch(notify('Unauthorized action! Please login.'))
    dispatch(logout())
  }
}

export {
  logout,
  unauthorize
}
