const BaseController = require('./BaseController')
const {LectureGroup, Lecture} = require('../models')

module.exports = class LectureGroupController extends BaseController {
  constructor () {
    super(LectureGroup, 'groups')
  }

  /**
   * Get the specified resource.
   *
   */
  async read (req, res, id) {
    const group = await LectureGroup.findById(id, {include: [{
      model: Lecture
    }]})

    if (group === null) {
      return res.status(404).send({success: false, msg: 'Lecture group not found'})
    }

    const {Lectures: lectures, ...rest} = {...group.dataValues}
    return res.status(200).send(
      {
        success: true, group: [{...rest, lectures}]
      }
    )
  }
}
