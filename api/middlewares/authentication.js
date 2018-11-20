const { inPath } = require('../utils/helpers')
const requireAuth = ['^/api/user/', '^/api/assignment']

const loginRequired = (req, res, next) => {
  if (!inPath(requireAuth, req.path)) {
    return next()
  }

  if (req.user) {
    return next()
  } else {
    res.status(403).json({ error: { status: 403, message: 'Unauthorized action! Please login.' } })
  }
}

module.exports = {
  loginRequired
}
