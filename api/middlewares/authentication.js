const _ = require('lodash')
const requireAuth = ['user', 'assignment']

const loginRequired = (req, res, next) => {
  if (!_.includes(requireAuth, req.path)) {
    return next()
  }

  if (req.user) {
    return next()
  } else {
    res.status(403).json({msg: 'Login required'})
  }
}

module.exports = {
  loginRequired
}
