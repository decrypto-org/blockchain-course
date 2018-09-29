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

module.exports = router
