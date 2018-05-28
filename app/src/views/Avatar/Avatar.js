import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import VerifiedUser from '@material-ui/icons/VerifiedUser'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

import {
  logout
} from '../../actions'

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
      <div>
        {this.props.isAuthenticated ? (
          <div>
            <IconButton
              aria-owns={this.state.open ? 'menu-appbar' : null}
              aria-haspopup='true'
              onClick={this.openMenu}
              color='inherit'
            >
              <VerifiedUser />
            </IconButton>
            <Menu
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
              <MenuItem onClick={this.logout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (<Button color='inherit' to='/login' component={Link}>Login</Button>)
        }
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
