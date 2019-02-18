import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Popover from '@material-ui/core/Popover'
import Divider from '@material-ui/core/Divider'
import RingProgress from '../../components/Progress/Ring'

import {
  userActions
} from '../../actions'

const logout = userActions.logout
const styles = {}

class Avatar extends React.Component {
  constructor () {
    super()
    this.openMenu = this.openMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.logout = this.logout.bind(this)

    this.state = {
      anchorEl: null,
      open: false
    }
  }

  openMenu (e) {
    this.setState({
      anchorEl: e.currentTarget,
      open: true
    })
  }

  closeMenu () {
    this.setState({
      anchorEl: null,
      open: false
    })
  }

  logout () {
    this.closeMenu()
    this.props.actions.logout()
  }

  getAssignmentProgress () {
    if (!this.props.user.statistics) {
      return 0
    }

    return Math.floor((this.props.user.statistics.totalSolved /
    this.props.user.statistics.totalAssignments) * 100)
  }

  render () {
    return (
      <div>
        {this.props.isAuthenticated ? (
          <div className='header-toolbar'>
            <IconButton
              aria-owns={this.state.open ? 'menu-appbar' : null}
              aria-haspopup='true'
              onClick={this.openMenu}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
            <RingProgress className='progress' radius={25} stroke={4} progress={this.getAssignmentProgress()} />
            <Popover
              id='menu-appbar'
              anchorEl={this.state.anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={this.state.open}
              onClose={this.closeMenu}
            >
              <div className='user-popover-wrapper'>
                <div className='user-popover-content user-info'>
                  <div className='title'>{this.props.user.firstName} {this.props.user.lastName}</div>
                  <div className='sub-title'>{this.props.user.username}</div>
                  <div className='sub-title'>{this.props.user.email}</div>
                </div>
                <Divider />
                <div className='user-popover-actions'>
                  <Button variant='outlined' color='primary' to='/profile' component={Link}>
                    Profile
                  </Button>
                  <Button variant='outlined' color='primary' onClick={this.logout}>
                    Sign out
                  </Button>
                </div>
              </div>
            </Popover>
          </div>
        ) : (<Button variant='outlined' color='inherit' to='/login' component={Link}>Login</Button>)
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.auth,
    user: state.user,
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ logout }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Avatar))
