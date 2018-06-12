const BaseController = require('./BaseController')
const {Lecture} = require('../models')

module.exports = class LectureController extends BaseController {
  constructor () {
    super(Lecture, 'lectures', 'lecture')
  }
}
