import { notify } from './notifications'
import auth from '../utils/AuthService'

import {
  UNAUTHORIZED_ACTION
} from './actionTypes'

const logout = () => {
  return dispatch => {
    dispatch({type: UNAUTHORIZED_ACTION, payload: {}})
    dispatch(notify('Unauthorized action! Please login.'))
    auth.logout()
  }
}

export {
  logout
}
