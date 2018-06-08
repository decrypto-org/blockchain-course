const {createControllerRoutes} = require('../utils/routes')
const AssignmentController = require('../controllers/AssignmentController')

const controller = new AssignmentController()
const router = createControllerRoutes(controller)

router.post(
  '/:id(\\d+)/solution',
  (req, res) => { controller.solution(req, res, req.params.id) }
)

module.exports = router
