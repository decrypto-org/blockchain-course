const BaseController = require('./BaseController')
const {LectureGroup, Lecture, Assignment} = require('../models')

module.exports = class LectureGroupController extends BaseController {
  constructor () {
    super(LectureGroup, 'groups')
  }

  /**
   * Get the specified resource.
   *
   */
  async read (req, res, id) {
    const group = await LectureGroup.findById(id, {include: [
      {model: Lecture},
      {model: Assignment, attributes: ['id', 'title', 'position']}
    ]})

    if (group === null) {
      return res.status(404).send({success: false, msg: 'Lecture group not found'})
    }

    let {Lectures: lectures, Assignments: assignments, ...rest} = {...group.dataValues}
    return res.status(200).send(
      {
        success: true, group: [{...rest, lectures, assignments}]
      }
    )
  }
}
