const { createControllerRoutes } = require('../utils/routes')
const AssignmentController = require('../controllers/AssignmentController')

const controller = new AssignmentController()
const router = createControllerRoutes(controller)

router.post(
  '/:name/solution',
  (req, res, next) => { controller.solution(req, res, req.params.name).catch(next) }
)

router.get(
  '/:name',
  (req, res, next) => { controller.read(req, res, req.params.name).catch(next) }
)

router.get(
  '/:name/material/:hash([0-9A-Fa-f]{64})',
  (req, res) => { controller.download(req, res, req.params.id, req.params.hash) }
)

module.exports = router
