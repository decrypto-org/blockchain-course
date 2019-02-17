const express = require('express')
const router = express.Router()

const UserController = require('../controllers/UserController')
const controller = new UserController()

router.get('/current', (req, res, next) => controller.read(req, res, req.user.username).catch(next))

module.exports = router
