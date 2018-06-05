import {
  GET_LECTURE_GROUPS_SUCCESS
} from '../actions/actionTypes'

import {createSimpleReducer} from '../utils/reducers'

const groups = createSimpleReducer([], {type: GET_LECTURE_GROUPS_SUCCESS, key: 'groups'})

export default groups
