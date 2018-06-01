import {createSimpleAction, createDispatchAPIAction} from '../utils/actions'
import config from '../config'

import {
  GET_LECTURES,
  GET_LECTURES_SUCCESS
} from './actionTypes'

const getLectures = createSimpleAction(GET_LECTURES)
const getLecturesSuccess = createSimpleAction(GET_LECTURES_SUCCESS)

const fetchLectures = createDispatchAPIAction(getLectures, getLecturesSuccess, `${config.BASE_URL}/lecture`)

export {
  fetchLectures
}
