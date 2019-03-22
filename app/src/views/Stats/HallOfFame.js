import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import {
  statsActions
} from '../../actions'

const topUsers = statsActions.topUsers

const styles = theme => ({
  jumbotron: {
    fontSize: '100%'
  },
  button: {
    margin: theme.spacing.unit
  },
  buttonFirst: {
    marginLeft: 0
  }
})

class HallOfFame extends React.Component {
  componentDidMount () {
    this.props.actions.topUsers().catch(e => console.log(e))
  }

  render () {
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Total Assignments Solved</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.stats.topUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell component='th' scope='row'>
                  {user.username}
                </TableCell>
                <TableCell>{user.solved}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stats: state.stats
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ topUsers }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HallOfFame))
