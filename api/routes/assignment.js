const { createSimpleRouter, createDownloadableRoute } = require('../utils/routes')

const opts = {
  controllerName: 'AssignmentController',
  path: ':name',
  param: 'name'
}

let { router, controller } = createSimpleRouter({ ...opts })

router.post(
  '/:name/solution',
  (req, res, next) => { controller.solution(req, res, req.params.name).catch(next) }
)

router = createDownloadableRoute(router, controller)

module.exports = router
