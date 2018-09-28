import App from 'containers/App/App'
import Profile from 'containers/Profile/Profile'

const indexRoutes = [
  { path: '/profile', component: Profile, exact: true },
  { path: '/', component: App, exact: false }
]

export default indexRoutes
