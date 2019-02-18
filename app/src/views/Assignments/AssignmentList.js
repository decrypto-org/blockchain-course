import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import withList from '../../containers/HOC/withList'
import CardListItem from '../../components/List/CardListItem'
import Front from './AssignmentFrontCard.js'
import Back from './AssignmentBackCard.js'

import {
  assignmentActions,
  notify
} from '../../actions'

const fetchAssignments = assignmentActions.fetchAssignments

const Assignments = withList(CardListItem, 'assignments', { getList: fetchAssignments }, '/assignment/', 'name')

class AssignmentsList extends React.Component {
  componentDidMount () {
    if (!this.props.isAuthenticated) {
      this.props.actions.notify('Unauthorized action! Please login.')
    }
  }

  render () {
    return (
      this.props.isAuthenticated ? <Assignments Front={Front} Back={Back} /> : null
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ fetchAssignments, notify }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentsList)
