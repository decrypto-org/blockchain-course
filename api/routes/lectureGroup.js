const express = require('express')
const router = express.Router()
const {LectureGroup, Lecture} = require('../models')

router.get(
  '/',
  async (req, res) => {
    const groups = await LectureGroup.findAll()
    return res.status(200).send(
      {
        success: true, groups
      }
    )
  }
)

router.get(
  '/:id(\\d+)',
  async (req, res) => {
    const group = await LectureGroup.findById(req.params.id, {include: [{
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
)

module.exports = router
