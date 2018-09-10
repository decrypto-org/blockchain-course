import types from '../actions/actionTypes'

import { createSimpleReducer } from '../utils/reducers'

const assignment = createSimpleReducer([], { type: types.GET_SIGNLE_ASSIGNMENT_SUCCESS, key: 'assignment' })

export default assignment
