import React from 'react'
import withList from '../../containers/HOC/withList'
import CardListItem from '../../components/List/CardListItem'
import Front from './LectureFrontCard.js'
import Back from './LectureBackCard.js'

import {
  lectureActions
} from '../../actions'

const fetchLectures = lectureActions.fetchLectures

const Lectures = withList(CardListItem, 'lectures', { getList: fetchLectures }, '/lecture/', 'name')

export default class LectureList extends React.Component {
  render () {
    return (
      <Lectures Front={Front} Back={Back} />
    )
  }
}
