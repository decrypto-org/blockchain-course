import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '../../components/List/ListItem'

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
    if (!this.props.assignments) {
      return null
    }

    return (
      <div>
        <Grid container>
          <List component='nav' className='assignments'>
            {this.props.assignments.map((item, index) => <ListItem key={index} {...item} to={'/assignment/' + item.id} />)}
          </List>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    assignments: state.assignments.assignments
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({fetchAssignments}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentsList)
