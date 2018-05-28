import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import VerifiedUser from '@material-ui/icons/VerifiedUser'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

import {
  logout
} from '../../actions'

const styles = {}

class Avatar extends React.Component {
  render () {
    const avatar = this.props.isAuthenticated ? <VerifiedUser /> : <Button color='inherit' to='/login' component={Link}>Login</Button>
    return (
      <div>
        {avatar}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({logout}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Avatar))
