const express = require('express')

const createControllerRoutes = (controller) => {
  const router = express.Router()
  router.get('/', (req, res) => controller.list(req, res))
  router.get('/:id(\\d+)', (req, res) => controller.read(req, res, req.params.id))

  return router
}

const createSimpleRouter = (key) => {
  const Controller = require(`../controllers/${key}`)
  const controller = new Controller()
  return createControllerRoutes(controller)
}

module.exports = {
  createSimpleRouter,
  createControllerRoutes
}
