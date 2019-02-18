import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import axios from 'axios'
import 'typeface-roboto'

import store from './store'
import indexRoutes from 'routes/index.js'
import { requestThen, requestCatch, responseThen, responseCatch } from './utils/interceptors'
import { unregister } from './registerServiceWorker'

import { loadIcons } from './utils/favicons.js'

axios.interceptors.request.use(requestThen, requestCatch)
axios.interceptors.response.use(responseThen, responseCatch)

const hist = createBrowserHistory()
loadIcons()

ReactDOM.render(
  <Router history={hist}>
    <Provider store={store}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} component={prop.component} key={key} exact={prop.exact} />
        })}
      </Switch>
    </Provider>
  </Router>,
  document.getElementById('root')
)

unregister()
