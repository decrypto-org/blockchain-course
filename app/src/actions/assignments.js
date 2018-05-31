import {createSimpleAction, createDispatchAPIAction} from '../utils/actions'
import config from '../config'

import {
  GET_ASSIGNMENTS,
  GET_ASSIGNMENTS_SUCCESS,
  GET_SIGNLE_ASSIGNMENT,
  GET_SIGNLE_ASSIGNMENT_SUCCESS,
  SUBMIT_SOLUTION,
  SUBMIT_SOLUTION_SUCCESS
} from './actionTypes'

const getAssignments = createSimpleAction(GET_ASSIGNMENTS)
const getAssignmentsSuccess = createSimpleAction(GET_ASSIGNMENTS_SUCCESS)
const getSingleAssignment = createSimpleAction(GET_SIGNLE_ASSIGNMENT)
const getSingleAssignmentSuccess = createSimpleAction(GET_SIGNLE_ASSIGNMENT_SUCCESS)
const postSolution = createSimpleAction(SUBMIT_SOLUTION)
const postSolutionSuccess = createSimpleAction(SUBMIT_SOLUTION_SUCCESS)

const fetchAssignments = createDispatchAPIAction(getAssignments, getAssignmentsSuccess, `${config.BASE_URL}/assignment`)
const fetchSingleAssignment = createDispatchAPIAction(getSingleAssignment, getSingleAssignmentSuccess, `${config.BASE_URL}/assignment/:id`)
const submitSolution = createDispatchAPIAction(postSolution, postSolutionSuccess, `${config.BASE_URL}/assignment/:id/solution`, 'post')

export {
  fetchAssignments,
  fetchSingleAssignment,
  submitSolution
}
