import axios from 'axios'

import {
  GET_ASSIGNMENTS,
  GET_ASSIGNMENTS_SUCCESS,
  GET_SIGNLE_ASSIGNMENT,
  GET_SIGNLE_ASSIGNMENT_SUCCESS,
  SUBMIT_SOLUTION,
  SUBMIT_SOLUTION_SUCCESS
} from './actionTypes'

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'

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

const postSolution = (data) => {
  return {type: SUBMIT_SOLUTION, payload: {data}}
}

const postSolutionSuccess = (data) => {
  return {type: SUBMIT_SOLUTION_SUCCESS, payload: {data}}
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

const submitSolution = (id, data) => {
  return async dispatch => {
    dispatch(postSolution(data))

    const res = await axios.post(`${BASE_URL}/assignment/${id}/solution`, {...data}, {withCredentials: true})
    dispatch(postSolutionSuccess(res.data))
    return res.data
  }
}

export {
  fetchAssignments,
  fetchSingleAssignment,
  submitSolution
}
