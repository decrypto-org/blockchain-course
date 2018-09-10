import types from '../actions/actionTypes'

import { createSimpleReducer } from '../utils/reducers'

const group = createSimpleReducer([], { type: types.GET_LECTURE_GROUP_SUCCESS, key: 'group' })

export default group
