const { createSimpleRouter, createDownloadableRoute } = require('../utils/routes')

const opts = {
  controllerName: 'LectureController',
  path: ':name',
  param: 'name'
}

let { router, controller } = createSimpleRouter({ ...opts })

router = createDownloadableRoute(router, controller)

module.exports = router
