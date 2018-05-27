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

export default {
  getSession,
  isAuthenticated,
  logout
}
