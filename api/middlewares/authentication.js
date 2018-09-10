const { inPath } = require('../utils/helpers')
const requireAuth = ['^/user/', '^/assignment']

const loginRequired = (req, res, next) => {
  if (!inPath(requireAuth, req.path)) {
    return next()
  }

  if (req.user) {
    return next()
  } else {
    res.status(403).json({ msg: 'Login required' })
  }
}

module.exports = {
  loginRequired
}
