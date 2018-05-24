import axios from 'axios'

import {
  GET_ASSIGNMENTS,
  GET_ASSIGNMENTS_SUCCESS
} from './actionTypes'

const BASE_URL = process.env.API_URL || 'http://localhost:3000'

const getAssignments = () => {
  return {type: GET_ASSIGNMENTS, payload: {}}
}

const getAssignmentsSuccess = (data) => {
  return {type: GET_ASSIGNMENTS_SUCCESS, payload: {data}}
}

const fetchAssignments = () => {
  return async dispatch => {
    dispatch(getAssignments())

    const res = await axios.get(`${BASE_URL}/assignment`, {withCredentials: true})

    dispatch(getAssignmentsSuccess(res.data))
  }
}

export {
  fetchAssignments
}
