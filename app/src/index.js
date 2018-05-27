import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'typeface-roboto'

import store from './store'
import indexRoutes from 'routes/index.js'
import registerServiceWorker from './registerServiceWorker'


const hist = createBrowserHistory()

ReactDOM.render(
  <Router history={hist}>
    <Provider store={store}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} component={prop.component} key={key} />
        })}
      </Switch>
    </Provider>
  </Router>,
  document.getElementById('root')
)

registerServiceWorker()
