const { HTTPError } = require('../errors')

const HTTPErrorHandler = (err, req, res, next) => {
  if (err instanceof HTTPError) {
    return res.status(err.statusCode).json({
      success: false,
      msg: err.message
    })
  }

  next(err)
}

module.exports = {
  HTTPErrorHandler
}
