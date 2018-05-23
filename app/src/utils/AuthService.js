import cookies from 'js-cookie'

const getSession = () => {
  return cookies.get('connect.sid')
}

const isAuthenticated = () => {
  const sid = getSession()
  return !!sid
}

export {
  getSession,
  isAuthenticated
}
