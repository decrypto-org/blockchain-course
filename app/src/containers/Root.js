import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { MuiThemeProvider } from '@material-ui/core/styles'

const Root = ({ store, history, routes, theme }) => {
  return (
    <Router history={history}>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Switch>
            {routes.map((prop, key) => {
              return <Route path={prop.path} component={prop.component} key={key} exact={prop.exact} />
            })}
          </Switch>
        </MuiThemeProvider>
      </Provider>
    </Router>
  )
}

export default Root
