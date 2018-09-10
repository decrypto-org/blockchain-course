import types from '../actions/actionTypes'

import { createSimpleReducer } from '../utils/reducers'

const lectures = createSimpleReducer([], { type: types.GET_SINGLE_LECTURE_SUCCESS, key: 'lecture' })

export default lectures
