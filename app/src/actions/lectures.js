import {buildActions} from '../utils/actions'

import * as types from './actionTypes'

const actions = buildActions({
  getLectures: types.GET_LECTURES,
  getLecturesSuccess: types.GET_LECTURES_SUCCESS,
  getSingleLecture: types.GET_SINGLE_LECTURE,
  getSingleLectureSuccess: types.GET_SINGLE_LECTURE_SUCCESS,
  fetchLectures: ['getLectures', 'getLecturesSuccess', 'lecture'],
  fetchSingleLecture: ['getSingleLecture', 'getSingleLectureSuccess', 'lecture/:id']
})

export default actions
