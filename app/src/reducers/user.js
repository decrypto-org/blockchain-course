import types from '../actions/actionTypes'

import { createSimpleReducer } from '../utils/reducers'

const user = createSimpleReducer({}, { type: types.GET_CURRENT_USER_SUCCESS, key: 'user' })

export default user
