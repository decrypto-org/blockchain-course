const express = require('express')

const createControllerRoutes = (controller, path, param) => {
  const router = express.Router()
  router.get('/', (req, res, next) => controller.list(req, res).catch(next))
  router.get(`/${path}`, (req, res, next) => controller.read(req, res, req.params[param]).catch(next))

  return router
}

const createSimpleRouter = (controllerName, path = ':id(\\d+)', param = 'id') => {
  const Controller = require(`../controllers/${controllerName}`)
  const controller = new Controller()
  return { router: createControllerRoutes(controller, path, param), controller }
}

module.exports = {
  createSimpleRouter,
  createControllerRoutes
}
