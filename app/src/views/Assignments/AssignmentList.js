import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'

import {
  fetchAssignments
} from '../../actions'

class AssignmentsList extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {}
  }

  componentDidMount () {
    this.props.actions.fetchAssignments()
  }

  render () {
    return (
      <div>
        <Grid container>
          Assignments...
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    lectures: state.lectures
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({fetchAssignments}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentsList)
