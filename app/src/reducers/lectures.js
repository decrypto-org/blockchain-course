import types from '../actions/actionTypes'

import { createSimpleReducer } from '../utils/reducers'

const lectures = createSimpleReducer([], { type: types.GET_LECTURES_SUCCESS, key: 'lectures' })

export default lectures
