import cookies from 'js-cookie'

const getSession = () => {
  return cookies.get('connect.sid')
}

const isAuthenticated = () => {
  const sid = getSession()
  return !!sid
}

const logout = () => {
  return cookies.remove('connect.sid')
}

const logoutMiddleware = store => next => action => {
  if (action === 'LOGOUT_SUCCESS') {
    logout()
  }

  next(action)
}

export default {
  getSession,
  isAuthenticated,
  logout,
  logoutMiddleware
}
