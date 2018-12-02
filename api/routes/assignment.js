const { createSimpleRouter } = require('../utils/routes')

const { router, controller } = createSimpleRouter('AssignmentController', ':name', 'name')

router.post(
  '/:name/solution',
  (req, res, next) => { controller.solution(req, res, req.params.name).catch(next) }
)

router.get(
  '/:name/material/:hash([0-9A-Fa-f]{64})',
  (req, res) => { controller.download(req, res, req.params.name, req.params.hash) }
)

module.exports = router
