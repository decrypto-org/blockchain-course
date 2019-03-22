import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import withWidth from '@material-ui/core/withWidth'
import compose from 'recompose/compose'

import '../../assets/scss/main.scss'
import Header from '../../components/Header/Header.js'
import Sidebar from '../../components/Sidebar/Sidebar.js'
import Messenger from '../../views/Messenger/Messenger.js'
import Avatar from '../../views/Avatar/Avatar.js'
import Spinner from '../../views/Spinner/Spinner.js'

import appRoutes from 'routes/app.js'

import {
  userActions,
  notify
} from '../../actions'

const fetchCurrentUser = userActions.fetchCurrentUser

const switchRoutes = (
  <Switch>
    {appRoutes.map((prop, key) => {
      if (prop.redirect) {
        return <Redirect from={prop.path} to={prop.to} key={key} />
      }
      return <Route path={prop.path} component={prop.component} key={key} exact />
    })}
  </Switch>
)

const styles = {}

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mobile: false,
      mobileDrawerOpen: false,
      mobileWidths: ['xs', 'sm', 'md']
    }

    this.onMenuIconClick = this.onMenuIconClick.bind(this)
    this.closeMobileDrawer = this.closeMobileDrawer.bind(this)
  }

  componentDidMount () {
    if (this.props.isAuthenticated) {
      this.props.actions.fetchCurrentUser()
    }
  }

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (this.state.mobileWidths.includes(this.props.width) && !prevState.mobile) { // Mobile
      this.setState({
        mobile: true
      })

      return
    }

    if (!this.state.mobileWidths.includes(this.props.width) && prevState.mobile) { // Desktop
      this.setState({
        mobile: false,
        mobileDrawerOpen: false
      })
    }
  }

  onMenuIconClick () {
    if (!this.state.mobile) {
      return
    }

    this.setState({
      mobileDrawerOpen: true
    })
  }

  closeMobileDrawer () {
    this.setState({
      mobileDrawerOpen: false
    })
  }

  render () {
    return (
      <div className='app'>
        <CssBaseline />
        <Grid className='wrapper' container spacing={0} direction='row' alignItems='flex-start' justify='flex-start'>
          <Header routes={appRoutes} {...this.props} Avatar={Avatar} onMenuIconClick={this.onMenuIconClick} />
          <Sidebar routes={appRoutes} {...this.props} mobileDrawerOpen={this.state.mobileDrawerOpen} closeMobileDrawer={this.closeMobileDrawer} />
          <main className='container'>
            {switchRoutes}
          </main>
        </Grid>
        <Messenger />
        <Spinner />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    notification: state.notification,
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({ fetchCurrentUser, notify }, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(compose(withStyles(styles), withWidth())(App))
