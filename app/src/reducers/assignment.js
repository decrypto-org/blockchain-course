import {
  GET_SIGNLE_ASSIGNMENT_SUCCESS
} from '../actions/actionTypes'

import {createSimpleReducer} from '../utils/reducers'

const assignment = createSimpleReducer([], {type: GET_SIGNLE_ASSIGNMENT_SUCCESS, key: 'assignment'})

export default assignment
