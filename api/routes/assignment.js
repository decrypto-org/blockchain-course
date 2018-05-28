const winston = require('winston')
const express = require('express')
const router = express.Router()
const {loginRequired} = require('./auth')
const {Assignment, ParameterizedAssignment} = require('../models')
const assignments = require('../assignments')

router.get(
  '/',
  loginRequired,
  async (req, res) => {
    const assignments = await Assignment.findAll()
    return res.status(200).send(
      {
        success: true, assignments
      }
    )
  }
)

router.get(
  '/:id(\\d+)',
  loginRequired,
  async (req, res) => {

    const assignment = await Assignment.findById(req.params.id)
    if (assignment === null) {
      return res.status(404).send({success: false, msg: 'Assignment not found'})
    }

    const parameterizedAssignment = await ParameterizedAssignment.findOrCreate({
      where: {
        assignmentId: assignment.dataValues.id,
        studentId: req.user.id
      },
    })

    const paramAssignment = parameterizedAssignment[0]
    const params = {
      paramId: paramAssignment.id,
      aux: paramAssignment.auxPublic,
      solved: paramAssignment.solved
    }

    return res.status(200).send(
      {
        success: true, assignment: [{...params, ...assignment.dataValues}]
      }
    )
  }
)

router.post(
  '/:id(\\d+)/solution',
  loginRequired,
  async (req, res) => {

    const assignment = await Assignment.findById(req.params.id)

    if (assignment === null) {
      return res.status(404).send({success: false, msg: 'Assignment not found'})
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

    try {
      const grade = await judge.judge(aux, req.user, assignment, solution)

      if(grade > 0) {
        await parameterizedAssignment.update({solved: true})
      }

      return res.status(200).send(
        {
          success: true, grade
        }
      )
    } catch (e) {
      winston.log('debug', 'Error', e.message)
      return res.status(500).send(
        {
          success: false, error: e.message
        }
      )
    }
  }
)

module.exports = router
