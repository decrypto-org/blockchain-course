import {
  GET_LECTURES_SUCCESS
} from '../actions/actionTypes'

import {createSimpleReducer} from '../utils/reducers'

const lectures = createSimpleReducer([], {type: GET_LECTURES_SUCCESS, key: 'lectures'})

export default lectures
