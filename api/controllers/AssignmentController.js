const winston = require('winston')
const BaseController = require('./BaseController')
const { Assignment, ParameterizedAssignment } = require('../models')
const assignments = require('../assignments')

module.exports = class AssignmentController extends BaseController {
  constructor () {
    super(Assignment, 'assignments', 'assignments')
  }

  /**
   * Get the specified resource.
   *
   */
  async read (req, res, id) {
    const assignment = await Assignment.findById(id)
    if (assignment === null) {
      return res.status(404).send({ success: false, msg: 'Assignment not found' })
    }

    const parameterizedAssignment = await ParameterizedAssignment.findOrCreate({
      where: {
        assignmentId: assignment.dataValues.id,
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
        success: true, assignment: [{ ...params, ...assignment.dataValues }]
      }
    )
  }

  async solution (req, res, id) {
    const assignment = await Assignment.findById(id)

    if (assignment === null) {
      return res.status(404).send({ success: false, msg: 'Assignment not found' })
    }

    const key = assignment.dataValues.name
    const judge = new assignments[key](assignment, req.user)

    const solution = req.body.solution
    const paramId = req.body.paramId

    const parameterizedAssignment = await ParameterizedAssignment.findById(paramId)
    const aux = {
      public: parameterizedAssignment.dataValues.auxPublic,
      private: parameterizedAssignment.dataValues.auxPrivate
    }

    let grade = 0

    try {
      grade = await judge.judge(aux, req.user, assignment, solution)
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
