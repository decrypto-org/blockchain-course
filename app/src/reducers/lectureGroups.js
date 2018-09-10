import types from '../actions/actionTypes'

import { createSimpleReducer } from '../utils/reducers'

const groups = createSimpleReducer([], { type: types.GET_LECTURE_GROUPS_SUCCESS, key: 'groups' })

export default groups
