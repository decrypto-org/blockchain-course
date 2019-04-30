import React from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import 'typeface-roboto'

import { store } from './store'
import indexRoutes from 'routes/index.js'
import theme from './theme'
import { setupInterceptors } from './utils/interceptors'
import { unregister } from './registerServiceWorker'
import { initWebsocket } from './actions/websocket'
import Root from './containers/Root'

const history = createBrowserHistory()

setupInterceptors(store)
initWebsocket()

ReactDOM.render(
  <Root history={history} store={store} routes={indexRoutes} theme={theme} />,
  document.getElementById('root')
)

unregister()
