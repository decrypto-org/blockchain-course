import types from '../actions/actionTypes'

import { createReducer } from '../utils/reducers'

const defaultState = {
  isLoading: false
}

const request = createReducer(defaultState, {
  [types.REQUEST_STARTED]: (state) => { return { ...state, isLoading: true } },
  [types.REQUEST_FINISHED]: (state) => { return { ...state, isLoading: false } }
})

export default request
