import types from './actionTypes'

const requestStart = () => {
  return { type: types.REQUEST_STARTED, payload: '' }
}

const requestFinish = () => {
  return { type: types.REQUEST_FINISHED, payload: '' }
}

export {
  requestStart,
  requestFinish
}
