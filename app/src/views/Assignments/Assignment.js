/* global FormData */

import React from 'react'
import withSingleItem from '../../containers/HOC/withSingleItem'
import AssignmentDetails from './AssignmentDetails'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  assignmentActions,
  notify
} from '../../actions'

const styles = {
  card: {
    width: 800
  },
  media: {
    height: 0,
    paddingTop: '56.25%'
  }
}

const fetchSingleAssignment = assignmentActions.fetchSingleAssignment
const submitSolution = assignmentActions.submitSolution

const SingleAssignment = withSingleItem(AssignmentDetails, 'singleAssignment', { getItem: fetchSingleAssignment }, '/assignment/', styles)

class Assignment extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      solution: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.submitSolution = this.submitSolution.bind(this)
    this.dowloadFile = this.dowloadFile.bind(this)
  }

  dowloadFile (hash) {
    window.location = `${process.env.REACT_APP_API_URL}/assignment/${this.props.match.params.id}/material/${hash}`
  }

  handleInputChange (event) {
    const target = event.target
    const value = target.value
    const name = target.name

    this.setState({
      [name]: value
    })
  }

  submitSolution (e) {
    e.preventDefault()
    const data = new FormData(e.target)
    let objData = {}

    data.forEach(function (value, key) {
      objData[key] = value
    })

    this.props.actions.submitSolution({ id: this.props.match.params.id }, objData)
      .then((value) => {
        const msg = value.grade === 0 ? 'Wrong! Please try again.' : 'Congratulations! You found the solution'
        this.props.actions.notify(msg)
      })
  }

  render () {
    return (
      <SingleAssignment submitSolution={this.submitSolution} id={this.props.match.params.id} handleInputChange={this.handleInputChange} solution={this.setState.solution} dowloadFile={this.dowloadFile} />
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ submitSolution, notify }, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Assignment)
