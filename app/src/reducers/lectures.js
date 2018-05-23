import {
  GET_LECTURES_SUCCESS
} from '../actions/actionTypes'

const lectures = (state = [], action) => {
  const { payload, type } = action

  switch (type) {
    case GET_LECTURES_SUCCESS:
      if (JSON.stringify(payload.data) === JSON.stringify(state)) {
        return state
      }
      return payload.data
    default:
      return state
  }
}

export default lectures
