import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import { Close } from '@material-ui/icons/'
import { Link } from 'react-router-dom'

import '../../assets/css/Profile.css'
import '../../assets/css/App.css'

import {
  userActions
} from '../../actions'

const styles = {
  root: {
    flexGrow: 1
  },
  paper: {
    padding: 16,
    textAlign: 'center'
  }
}

const fetchCurrentUser = userActions.fetchCurrentUser

class Profile extends Component {
  componentDidMount () {
    if (this.props.isAuthenticated) {
      this.props.actions.fetchCurrentUser()
    }
  }

  render () {
    if (_.isEmpty(this.props.user)) {
      return null
    }

    return (
      <div className='app user-profile'>
        <div className='icon close-icon'><Link to='/'><Close /></Link></div>
        <div className='user-profile-wrapper'>
          <Grid container spacing={24}>
            <Grid item xs={9}>
              <header className='profile-header'>
                <div className='profile-header-info'>
                  <div className='profile-avatar'>
                    <Avatar className='avatar'>{this.props.user.firstName[0]}</Avatar>
                  </div>
                  <div className='profile-full-name'>{this.props.user.firstName} {this.props.user.lastName}</div>
                </div>
              </header>
              <div className='profile-row'>
                <div className='row-header'>Personal info</div>
                <div className='row-info'>
                  <div className='row-info-wrapper'>
                    <div className='row-info-entry'>
                      <div className='label'>Full name</div>
                      <div className='text'>{this.props.user.firstName} {this.props.user.lastName}</div>
                    </div>
                    <div className='row-info-entry'>
                      <div className='label'>Email</div>
                      <div className='text'>{this.props.user.email}</div>
                    </div>
                    <div className='row-info-entry'>
                      <div className='label'>Github username</div>
                      <div className='text'>{this.props.user.username}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    notification: state.notification,
    auth: state.auth,
    user: state.user,
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ fetchCurrentUser }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Profile))
