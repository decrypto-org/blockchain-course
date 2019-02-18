import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

import 'bootstrap/dist/css/bootstrap.min.css'
import '../../assets/scss/main.scss'

import Header from '../../components/Header/Header.js'
import ToolBar from '../../components/ToolBar/ToolBar.js'
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
  componentDidMount () {
    if (this.props.isAuthenticated) {
      this.props.actions.fetchCurrentUser()
    }
  }

  render () {
    return (
      <div className='app container-fluid'>
        <Header routes={appRoutes} {...this.props} Avatar={Avatar} ToolBar={ToolBar} />
        <main className='container-fluid'>
          {switchRoutes}
        </main>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App))
