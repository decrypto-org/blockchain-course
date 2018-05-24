import axios from 'axios'

import {
  GET_ASSIGNMENTS,
  GET_ASSIGNMENTS_SUCCESS,
  GET_SIGNLE_ASSIGNMENT,
  GET_SIGNLE_ASSIGNMENT_SUCCESS
} from './actionTypes'

const BASE_URL = process.env.API_URL || 'http://localhost:3000'

const getAssignments = () => {
  return {type: GET_ASSIGNMENTS, payload: {}}
}

const getAssignmentsSuccess = (data) => {
  return {type: GET_ASSIGNMENTS_SUCCESS, payload: {data}}
}

const getSingleAssignment = () => {
  return {type: GET_SIGNLE_ASSIGNMENT, payload: {}}
}

const getSingleAssignmentSuccess = (data) => {
  return {type: GET_SIGNLE_ASSIGNMENT_SUCCESS, payload: {data}}
}

const fetchAssignments = () => {
  return async dispatch => {
    dispatch(getAssignments())

    const res = await axios.get(`${BASE_URL}/assignment`, {withCredentials: true})

    dispatch(getAssignmentsSuccess(res.data))
  }
}

const fetchSingleAssignment = (id) => {
  return async dispatch => {
    dispatch(getSingleAssignment())

    const res = await axios.get(`${BASE_URL}/assignment/${id}`, {withCredentials: true})

    dispatch(getSingleAssignmentSuccess(res.data))
  }
}

export {
  fetchAssignments,
  fetchSingleAssignment
}
