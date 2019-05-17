const { createSimpleRouter } = require('../utils/routes')

const opts = {
  controllerName: 'LectureGroupController'
}

const { router } = createSimpleRouter({ ...opts })

module.exports = router
