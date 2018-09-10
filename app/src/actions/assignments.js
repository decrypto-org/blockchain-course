import { buildActions } from '../utils/actions'

import types from './actionTypes'

const actions = buildActions({
  getAssignments: types.GET_ASSIGNMENTS,
  getAssignmentsSuccess: types.GET_ASSIGNMENTS_SUCCESS,
  getSingleAssignment: types.GET_SIGNLE_ASSIGNMENT,
  getSingleAssignmentSuccess: types.GET_SIGNLE_ASSIGNMENT_SUCCESS,
  postSolution: types.SUBMIT_SOLUTION,
  postSolutionSuccess: types.SUBMIT_SOLUTION_SUCCESS,
  fetchAssignments: ['getAssignments', 'getAssignmentsSuccess', 'assignment'],
  fetchSingleAssignment: ['getSingleAssignment', 'getSingleAssignmentSuccess', 'assignment/:id'],
  submitSolution: ['postSolution', 'postSolutionSuccess', 'assignment/:id/solution', 'post']
})

export default actions
