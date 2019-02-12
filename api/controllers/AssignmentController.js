const logger = require('../config/winston')
const OrderedDataController = require('./OrderedDataController')
const Downloadable = require('./Downloadable')
const { classMixin } = require('../utils/helpers')
const { Assignment, ParameterizedAssignment, Solution } = require('blockchain-course-db').models

module.exports = class AssignmentController extends classMixin(OrderedDataController, Downloadable) {
  constructor () {
    super(Assignment, 'assignments', 'assignments')
  }

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
    const assignment = await Assignment.findByName(name)

    /* throws an HTTPError if the resource is not found */
    this.requireResourceFound(assignment)

    const judge = new assignment.Judge(assignment.judge, req.user)

    const solution = req.body.solution
    const paramId = req.body.paramId

    const parameterizedAssignment = await ParameterizedAssignment.findById(paramId)

    /* throws an HTTPError if the resource is not found */
    this.requireResourceFound(parameterizedAssignment)

    const aux = {
      public: parameterizedAssignment.dataValues.auxPublic,
      private: parameterizedAssignment.dataValues.auxPrivate
    }

    let judgement = { grade: 0, msg: 'Wrong! Please try again.' }

    try {
      judgement = await judge.judge(aux, req.user, assignment.Judge, solution)
      const [solutionModel] = await Solution.findOrCreate(
        {
          where: { studentId: req.user.id, parameterizedAssignmentId: paramId },
          defaults: {
            studentId: req.user.id,
            parameterizedAssignmentId: paramId
          }
        }
      )

      await solutionModel.update({ data: solution })
    } catch (e) {
      logger.error(`${e.constructor.name}: ${e.message}`)
      const errorType = e.constructor.name

      if (
        errorType === 'CompilationError' ||
        errorType === 'AssertionError' ||
        errorType === 'MissingMethodError'
      ) {
        return res.status(200).send(
          {
            code: 200, judgement: { grade: 0, msg: e.message }
          }
        )
      }

      return res.status(500).send(
        {
          error: { code: 500, message: e.message }
        }
      )
    }

    if (judgement.grade > 0) {
      await parameterizedAssignment.update({ solved: true })
    }

    return res.status(200).send(
      {
        success: true, judgement
      }
    )
  }
}
