const {createControllerRoutes} = require('../utils/routes')
const LectureGroupController = require('../controllers/LectureGroupController')

const controller = new LectureGroupController()
const router = createControllerRoutes(controller)

module.exports = router
