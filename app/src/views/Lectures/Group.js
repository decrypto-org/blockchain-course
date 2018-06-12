import React from 'react'
import withSingleItem from '../../containers/HOC/withSingleItem'
import GroupDetails from './GroupDetails'

import {
  lectureGroupsActions
} from '../../actions'

const fetchSingleLectureGroup = lectureGroupsActions.fetchSingleLectureGroup

const SingleGroup = withSingleItem(GroupDetails, 'group', {getItem: fetchSingleLectureGroup}, '/lecture/')

export default class LecturesList extends React.Component {
  render () {
    return (
      <SingleGroup id={this.props.match.params.id} />
    )
  }
}
