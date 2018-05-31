import React from 'react'
import withList from '../../containers/HOC/withList'
import ListItem from '../../components/List/ListItem'

import {
  fetchLectureGroups
} from '../../actions'

const Groups = withList(ListItem, 'groups', {getList: fetchLectureGroups}, '/lectureGroups/')

export default class LectureGroups extends React.Component {
  render () {
    return (
      <Groups />
    )
  }
}
