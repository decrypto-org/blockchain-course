import {createSimpleAction, createDispatchAPIAction} from '../utils/actions'
import config from '../config'

import {
  GET_LECTURE_GROUPS,
  GET_LECTURE_GROUPS_SUCCESS
} from './actionTypes'

const getLectureGroups = createSimpleAction(GET_LECTURE_GROUPS)
const getLectureGroupsSuccess = createSimpleAction(GET_LECTURE_GROUPS_SUCCESS)

const fetchLectureGroups = createDispatchAPIAction(getLectureGroups, getLectureGroupsSuccess, `${config.BASE_URL}/lectureGroup`)

export {
  fetchLectureGroups
}
