import types from '../actions/actionTypes'

import {createSimpleReducer} from '../utils/reducers'

const assignments = createSimpleReducer([], {type: types.GET_ASSIGNMENTS_SUCCESS, key: 'assignments'})

export default assignments
