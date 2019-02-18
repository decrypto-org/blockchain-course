import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithubAlt } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
import Popover from '@material-ui/core/Popover'
import Divider from '@material-ui/core/Divider'

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

  render () {
    return (
      <div className='avatar'>
        {this.props.isAuthenticated ? (
          <div className='avatar-wrapper'>
            <div className='avatar-button' onClick={this.openMenu}>
              <FontAwesomeIcon icon={faGithubAlt} size='2x' />
            </div>
            <div className='avatar-username'>{this.props.user.username}</div>
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
