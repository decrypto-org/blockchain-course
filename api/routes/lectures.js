const { createSimpleRouter } = require('../utils/routes')

const { router, controller } = createSimpleRouter('LectureController')

router.get(
  '/:id(\\d+)/material/:hash([0-9A-Fa-f]{64})',
  (req, res) => { controller.download(req, res, req.params.id, req.params.hash) }
)

module.exports = router
