import types from './actionTypes'

let hideTimeout

const closeToast = () => {
  clearTimeout(hideTimeout)
  return { type: types.CLOSE_TOAST, payload: '' }
}

const notify = message => {
  return dispatch => {
    clearTimeout(hideTimeout)
    hideTimeout = setTimeout(dispatch.bind({}, closeToast()), 7000)

    dispatch({ type: types.OPEN_TOAST, payload: { message } })
  }
}

export {
  closeToast,
  notify
}
