import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'

import '../../assets/css/App.css'
import Header from '../../components/Header/Header.js'
import Sidebar from '../../components/Sidebar/Sidebar.js'
import { isAuthenticated } from '../../utils/AuthService'

import appRoutes from 'routes/app.js'

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
      </div>
    )
  }
}

export default App
