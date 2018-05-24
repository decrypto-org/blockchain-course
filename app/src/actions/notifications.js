import {
  OPEN_TOAST,
  CLOSE_TOAST
} from './actionTypes'

let hideTimeout

const closeToast = () => {
  clearTimeout(hideTimeout)
  return { type: CLOSE_TOAST, payload: '' }
}

const notify = message => {
  return dispatch => {
    clearTimeout(hideTimeout)
    hideTimeout = setTimeout(dispatch.bind({}, closeToast()), 7000)

    dispatch({ type: OPEN_TOAST, payload: {message} })
  }
}

export {
  closeToast,
  notify
}
