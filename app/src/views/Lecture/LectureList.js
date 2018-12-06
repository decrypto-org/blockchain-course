import React from 'react'
import withList from '../../containers/HOC/withList'
import ListItem from '../../components/List/ListItem'

import {
  lectureActions
} from '../../actions'

const fetchLectures = lectureActions.fetchLectures

const Lectures = withList(ListItem, 'lectures', { getList: fetchLectures }, '/lecture/', 'name')

export default class LectureList extends React.Component {
  render () {
    return (
      <Lectures />
    )
  }
}
