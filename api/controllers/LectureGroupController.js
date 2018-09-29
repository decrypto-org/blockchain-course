const OrderedDataController = require('./OrderedDataController')
const { LectureGroup, Lecture, Assignment } = require('../models')
const _ = require('lodash')

module.exports = class LectureGroupController extends OrderedDataController {
  constructor () {
    super(LectureGroup, 'groups', 'group')
  }

  /**
   * Get the specified resource.
   *
   */
  async read (req, res, id) {
    const group = await LectureGroup.findById(id, {
      include: [
        { model: Lecture }
      ],
      order: [ [ Lecture, 'position', 'ASC' ] ]
    })

    /* throws an HTTPError if the resource is not found */
    this.requireResourceFound(group)

    const { Lectures: lectures, ...rest } = { ...group.dataValues }

    const assignments = Assignment.findAllByGroup(group.name).map(assignment => {
      return _.pick(assignment.metadata, ['name', 'title', 'position'])
    })

    return res.status(200).send({
      success: true, group: [{ ...rest, lectures, assignments: assignments }]
    })
  }
}
