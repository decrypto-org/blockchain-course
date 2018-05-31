import {
  GET_LECTURE_GROUP_SUCCESS
} from '../actions/actionTypes'

import {createSimpleReducer} from '../utils/reducers'

const group = createSimpleReducer([], {type: GET_LECTURE_GROUP_SUCCESS, key: 'group'})

export default group
