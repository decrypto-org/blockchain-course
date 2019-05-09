const logger = require('../config/winston')
const OrderedDataController = require('./OrderedDataController')
const Downloadable = require('./Downloadable')
const { classMixin } = require('../utils/helpers')
const { Assignment, ParameterizedAssignment, Solution, Sequelize } = require('blockchain-course-db').models
const { appEmitterBus } = require('../emitters.js')
const { HTTPError } = require('../errors')

module.exports = class AssignmentController extends classMixin(OrderedDataController, Downloadable) {
  constructor () {
    super(Assignment, 'assignments', 'assignments')
  }

  async list (req, res, name) {
    let assignments = Assignment.findAll()
    const paramAssignments = await ParameterizedAssignment.findAll({ where: { studentId: req.user.id }, raw: true })
    const indexedParamAssignments = paramAssignments.reduce((prev, cur) => ({ ...prev, [cur.assignmentName]: cur }), {})

    assignments = assignments.map(item => {
      let solved = false

      if (indexedParamAssignments.hasOwnProperty(item.name)) {
        solved = indexedParamAssignments[item.name].solved
      }

      return { ...item, solved }
    })

    return res.status(200).send(
      {
        success: true, assignments
      }
    )
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

    const solution = req.body.solution

    const parameterizedAssignment = await ParameterizedAssignment.findByPk(req.body.paramId)

    /* throws an HTTPError if the resource is not found */
    this.requireResourceFound(parameterizedAssignment)

    const aux = {
      public: parameterizedAssignment.dataValues.auxPublic,
      private: parameterizedAssignment.dataValues.auxPrivate
    }

    return this.processSolution({ req, res, aux, assignment, solution, parameterizedAssignment })
  }

  async evaluateSolution (params) {
    const { req, aux, assignment, solution, parameterizedAssignment } = params
    let judgement = { grade: 0, msg: 'Wrong! Please try again.' }
    const judge = new assignment.Judge(assignment.judge, req.user)

    try {
      judgement = await judge.performJudgement(aux, req.user, assignment.Judge, solution)
      await this.updateSolution(req, parameterizedAssignment, solution)
      await this.updateSolved(judgement, parameterizedAssignment)
      return judgement
    } catch (e) {
      logger.error(e)
      if (e instanceof Sequelize.Error) {
        throw new HTTPError(500, `Server error: ${e.message}`)
      }

      throw e
    }
  }

  async processSolution (params) {
    if (params.assignment.Judge.isAsync) {
      const assignmentDescription = { name: params.assignment.metadata.name, title: params.assignment.metadata.title, userId: params.parameterizedAssignment.dataValues.studentId }
      params.res.status(202).send({ code: 202, judgement: { grade: 0, msg: 'Solution is being processed. Please wait!' } })

      try {
        let judgement = await this.evaluateSolution(params)
        appEmitterBus.emit('solution-judgement-available', { judgement, assignment: assignmentDescription, currentUser: { ...params.req.user.dataValues } })
      } catch (err) {
        let judgement = { grade: 0, msg: err.message }
        appEmitterBus.emit('solution-judgement-available', { judgement, assignment: assignmentDescription, currentUser: { ...params.req.user.dataValues } })
      }
    } else {
      try {
        const judgement = await this.evaluateSolution(params)
        params.res.status(200).send({ success: true, judgement })
      } catch (err) {
        params.res.status(500).send({ error: { code: 500, message: err.message } })
      }
    }
  }

  async updateSolution (req, parameterizedAssignment, solution) {
    const [solutionModel] = await Solution.findOrCreate(
      {
        where: { studentId: req.user.id, parameterizedAssignmentId: req.body.paramId },
        defaults: {
          studentId: req.user.id,
          parameterizedAssignmentId: req.body.paramId
        }
      })

    if (!parameterizedAssignment.dataValues.solved) {
      await solutionModel.update({ data: solution })
    }
  }

  async updateSolved (judgement, parameterizedAssignment) {
    if (judgement && judgement.grade && judgement.grade > 0 && !parameterizedAssignment.dataValues.solved) {
      await parameterizedAssignment.update({ solved: true })
    }
  }
}
