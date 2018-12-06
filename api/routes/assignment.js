const { createSimpleRouter, createDownloadableRoute } = require('../utils/routes')

let { router, controller } = createSimpleRouter('AssignmentController', ':name', 'name')

router.post(
  '/:name/solution',
  (req, res, next) => { controller.solution(req, res, req.params.name).catch(next) }
)

router = createDownloadableRoute(router, controller)

module.exports = router
