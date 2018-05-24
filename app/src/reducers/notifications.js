import {
  OPEN_TOAST,
  CLOSE_TOAST
} from '../actions/actionTypes'

const defaultState = {
  open: false,
  message: ''
}

const notification = (state = defaultState, action) => {
  const { payload, type } = action

  switch (type) {
    case CLOSE_TOAST:
      return {...state, open: false}
    case OPEN_TOAST:
      return {...state, open: true, message: payload.message}
    default:
      return state
  }
}

export default notification
