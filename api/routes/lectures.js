const { createSimpleRouter, createDownloadableRoute } = require('../utils/routes')

let { router, controller } = createSimpleRouter('LectureController', ':name', 'name')

router = createDownloadableRoute(router, controller)

module.exports = router
