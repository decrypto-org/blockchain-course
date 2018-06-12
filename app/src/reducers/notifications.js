import types from '../actions/actionTypes'

import {createReducer} from '../utils/reducers'

const defaultState = {
  open: false,
  message: ''
}

const notification = createReducer(defaultState, {
  [types.CLOSE_TOAST]: (state) => { return {...state, open: false} },
  [types.OPEN_TOAST]: (state, action) => { return {...state, open: true, message: action.payload.message} }
})

export default notification
