import {
  GET_ASSIGNMENTS_SUCCESS
} from '../actions/actionTypes'

const assignments = (state = [], action) => {
  const { payload, type } = action

  switch (type) {
    case GET_ASSIGNMENTS_SUCCESS:
      if (JSON.stringify(payload.data) === JSON.stringify(state)) {
        return state
      }
      return payload.data
    default:
      return state
  }
}

export default assignments
