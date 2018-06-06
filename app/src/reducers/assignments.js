import {
  GET_ASSIGNMENTS_SUCCESS
} from '../actions/actionTypes'

import {createSimpleReducer} from '../utils/reducers'

const assignments = createSimpleReducer([], {type: GET_ASSIGNMENTS_SUCCESS, key: 'assignments'})

export default assignments
