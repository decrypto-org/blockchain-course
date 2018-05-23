const winston = require('winston')
const express = require('express')
const router = express.Router()
const {loginRequired} = require('./auth')
const {Assignment, ParameterizedAssignment} = require('../models')

router.get(
  '/:id(\\d+)',
  loginRequired,
  async (req, res) => {
    const assignment = await Assignment.findById(req.params.id)
    if (assignment === null) {
      return res.status(404).send({success: false, msg: 'Assignment not found'})
    }
    const parameterizedAssignment = ParameterizedAssignment.findOrCreate({
      where: {
        assignmentId: assignment.id,
        studentId: req.user.id
      }
    })
    return res.status(200).send(
      {
        success: true, assignment: parameterizedAssignment
      }
    )
  }
)

module.exports = router
