const express = require('express')
const router = express.Router()
const {LectureGroup} = require('../models')

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

module.exports = router
