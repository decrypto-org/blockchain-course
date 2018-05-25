import axios from 'axios'

import {
  GET_LECTURES,
  GET_LECTURES_SUCCESS
} from './actionTypes'

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000'

const getLectures = () => {
  return {type: GET_LECTURES, payload: {}}
}

const getLecturesSuccess = (data) => {
  return {type: GET_LECTURES_SUCCESS, payload: {data}}
}

const fetchLectures = () => {
  return async dispatch => {
    dispatch(getLectures())

    const res = await axios.get(`${BASE_URL}/lecture`, {withCredentials: true})

    dispatch(getLecturesSuccess(res.data))
  }
}

export {
  fetchLectures
}
