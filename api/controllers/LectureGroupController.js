const BaseController = require('./BaseController')
const { LectureGroup, Lecture, Assignment } = require('../models')

module.exports = class LectureGroupController extends BaseController {
  constructor () {
    super(LectureGroup, 'groups', 'group')
  }

  /**
   * Get the specified resource.
   *
   */
  async read (req, res, id) {
    const group = await LectureGroup.findById(id, { include: [
      { model: Lecture },
      { model: Assignment, attributes: ['id', 'title', 'position'] }
    ] })

    /* throws an HTTPError if the resource is not found */
    this.requireResourceFound(group)

    let { Lectures: lectures, Assignments: assignments, ...rest } = { ...group.dataValues }
    return res.status(200).json(
      {
        success: true, group: [{ ...rest, lectures, assignments }]
      }
    )
  }
}
