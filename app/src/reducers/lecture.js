import {
  GET_SINGLE_LECTURE_SUCCESS
} from '../actions/actionTypes'

import {createSimpleReducer} from '../utils/reducers'

const lectures = createSimpleReducer([], {type: GET_SINGLE_LECTURE_SUCCESS, key: 'lecture'})

export default lectures
