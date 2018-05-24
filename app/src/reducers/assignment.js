import {
  GET_SIGNLE_ASSIGNMENT_SUCCESS
} from '../actions/actionTypes'

const assignment = (state = [], action) => {
  const { payload, type } = action

  switch (type) {
    case GET_SIGNLE_ASSIGNMENT_SUCCESS:
      if (JSON.stringify(payload.data) === JSON.stringify(state)) {
        return state
      }
      return payload.data.assignment
    default:
      return state
  }
}

export default assignment
