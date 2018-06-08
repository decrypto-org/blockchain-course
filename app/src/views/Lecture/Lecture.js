import React from 'react'
import withSingleItem from '../../containers/HOC/withSingleItem'
import LectureDetails from './LectureDetails'

import {
  lectureActions
} from '../../actions'

const fetchSingleLecture = lectureActions.fetchSingleLecture

const SingleLecture = withSingleItem(LectureDetails, 'lecture', {getItem: fetchSingleLecture}, '/lecture/')

export default class Lecture extends React.Component {
  render () {
    return (
      <SingleLecture id={this.props.match.params.id} />
    )
  }
}
