import {createSimpleAction, createDispatchAPIAction} from '../utils/actions'

import {
  GET_LECTURES,
  GET_LECTURES_SUCCESS
} from './actionTypes'

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'

const getLectures = createSimpleAction(GET_LECTURES)
const getLecturesSuccess = createSimpleAction(GET_LECTURES_SUCCESS)

const fetchLectures = createDispatchAPIAction(getLectures, getLecturesSuccess, `${BASE_URL}/lecture`)

export {
  fetchLectures
}
