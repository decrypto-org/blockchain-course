import React from 'react'
import withSingleItem from '../../containers/HOC/withSingleItem'
import LectureDetails from './LectureDetails'

import {
  lectureActions
} from '../../actions'

const fetchSingleLecture = lectureActions.fetchSingleLecture

const SingleLecture = withSingleItem(LectureDetails, 'lecture', { getItem: fetchSingleLecture }, '/lecture/')

export default class Lecture extends React.Component {
  constructor () {
    super()
    this.dowloadFile = this.dowloadFile.bind(this)
  }

  dowloadFile (hash) {
    window.location = `${process.env.REACT_APP_API_URL}/lecture/${this.props.match.params.id}/material/${hash}`
  }

  render () {
    return (
      <SingleLecture id={this.props.match.params.id} dowloadFile={this.dowloadFile} />
    )
  }
}
