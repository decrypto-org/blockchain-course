import {buildActions} from '../utils/actions'

import types from './actionTypes'

const actions = buildActions({
  getLectureGroups: types.GET_LECTURE_GROUPS,
  getLectureGroupsSuccess: types.GET_LECTURE_GROUPS_SUCCESS,
  getSigleLectureGroup: types.GET_LECTURE_GROUP,
  getSigleLectureGroupSuccess: types.GET_LECTURE_GROUP_SUCCESS,
  fetchLectureGroups: ['getLectureGroups', 'getLectureGroupsSuccess', 'lectureGroup'],
  fetchSingleLectureGroup: ['getSigleLectureGroup', 'getSigleLectureGroupSuccess', 'lectureGroup/:id']
})

export default actions
