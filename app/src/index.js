import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import 'typeface-roboto'

import configureStore from './store'
import indexRoutes from 'routes/index.js'
import theme from './theme'
import { setupInterceptors } from './utils/interceptors'
import { unregister } from './registerServiceWorker'
import { initWebsocket } from './actions/websocket'
import Root from './containers/Root'

const history = createBrowserHistory()
const store = configureStore()

setupInterceptors(store)
initWebsocket(store)

ReactDOM.render(
  <Root history={history} store={store} routes={indexRoutes} theme={theme} />,
  document.getElementById('root')
)

unregister()
