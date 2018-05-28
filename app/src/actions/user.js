import { notify } from './notifications'
import auth from '../utils/AuthService'

import {
  UNAUTHORIZED_ACTION,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST
} from './actionTypes'

const logout = () => {
  return dispatch => {
    dispatch({type: LOGOUT_REQUEST, payload: {}})
    auth.logout()
    dispatch({type: LOGOUT_SUCCESS, payload: {}})
  }
}

const unauthorize = () => {
  return dispatch => {
    dispatch({type: UNAUTHORIZED_ACTION, payload: {}})
    dispatch(notify('Unauthorized action! Please login.'))
    dispatch(logout())
  }
}

export {
  logout,
  unauthorize
}
