import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'

import '../../assets/css/App.css'
import Header from '../../components/Header/Header.js'
import Sidebar from '../../components/Sidebar/Sidebar.js'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import Close from '@material-ui/icons/Close'
import { isAuthenticated } from '../../utils/AuthService'

import appRoutes from 'routes/app.js'

import {
  closeToast,
  notify
} from '../../actions'

const switchRoutes = (
  <Switch>
    {appRoutes.map((prop, key) => {
      if (prop.redirect) {
        return <Redirect from={prop.path} to={prop.to} key={key} />
      }
      return <Route path={prop.path} component={prop.component} key={key} />
    })}
  </Switch>
)

const styles = {}

class App extends Component {
  render () {
    return (
      <div className='app'>
        <CssBaseline />
        <Grid className='wrapper' container spacing={0} direction='row' alignItems='flex-start' justify='flex-start'>
          <Header routes={appRoutes} {...this.props} />
          <Sidebar routes={appRoutes} {...this.props} />
          <main className='container'>
            {switchRoutes}
          </main>
        </Grid>
        <Snackbar
          open={this.props.notification.open}
          onClose={this.props.actions.closeToast}
          message={this.props.notification.message}
          action={[
            <IconButton
              key='close'
              aria-label='Close'
              color='inherit'
              onClick={this.props.actions.closeToast}
            >
              <Close />
            </IconButton>
          ]}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    notification: state.notification
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators({closeToast, notify}, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App))
