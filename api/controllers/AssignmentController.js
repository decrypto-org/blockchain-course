const winston = require('winston')
const OrderedDataController = require('./OrderedDataController')
const { Assignment, ParameterizedAssignment } = require('../models')

module.exports = class AssignmentController extends OrderedDataController {
  constructor () {
    super(Assignment, 'assignments', 'assignments')
  }

  /**
   * Get the specified resource.
   *
   */
  async read (req, res, name) {
    const assignment = Assignment.findByName(name)

    /* throws an HTTPError if the resource is not found */
    this.requireResourceFound(assignment)

    const parameterizedAssignment = await ParameterizedAssignment.findOrCreate({
      where: {
        assignmentName: assignment.metadata.name,
        studentId: req.user.id
      }
    })

    const paramAssignment = parameterizedAssignment[0]
    const params = {
      paramId: paramAssignment.id,
      aux: paramAssignment.auxPublic,
      solved: paramAssignment.solved
    }

    return res.status(200).send(
      {
        success: true, assignment: [{ ...params, ...assignment.metadata }]
      }
    )
  }

  async solution (req, res, name) {
    const AssignmentClass = await Assignment.findByName(name)

    /* throws an HTTPError if the resource is not found */
    this.requireResourceFound(AssignmentClass)

    const judge = new AssignmentClass(AssignmentClass, req.user)

    const solution = req.body.solution
    const paramId = req.body.paramId

    const parameterizedAssignment = await ParameterizedAssignment.findById(paramId)

    /* throws an HTTPError if the resource is not found */
    this.requireResourceFound(parameterizedAssignment)

    const aux = {
      public: parameterizedAssignment.dataValues.auxPublic,
      private: parameterizedAssignment.dataValues.auxPrivate
    }

    let grade = 0

    try {
      grade = await judge.judge(aux, req.user, AssignmentClass, solution)
    } catch (e) {
      winston.log('debug', 'Error', e.message)
      return res.status(500).send(
        {
          success: false, error: e.message
        }
      )
    }

    if (grade > 0) {
      await parameterizedAssignment.update({ solved: true })
    }

    return res.status(200).send(
      {
        success: true, grade
      }
    )
  }
}
