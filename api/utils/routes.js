const express = require('express')

const createControllerRoutes = (controller) => {
  const router = express.Router()
  router.get('/', (req, res, next) => controller.list(req, res).catch(next))
  router.get('/:id(\\d+)', (req, res, next) => controller.read(req, res, req.params.id).catch(next))

  return router
}

const createSimpleRouter = (key) => {
  const Controller = require(`../controllers/${key}`)
  const controller = new Controller()
  return { router: createControllerRoutes(controller), controller }
}

module.exports = {
  createSimpleRouter,
  createControllerRoutes
}
