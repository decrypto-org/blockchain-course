const express = require('express')
const router = express.Router()

const { User, ParameterizedAssignment, sequelize } = require('blockchain-course-db').models

const getRanking = async (limit = 10, order = 'ASC') => {
  let res = await ParameterizedAssignment.findAll({
    include: [{
      model: User,
      as: 'student'
    }],
    attributes: ['ParameterizedAssignment.studentId', 'student.id', [sequelize.fn('COUNT', 'solved'), 'solved']],
    where: { solved: true },
    group: ['ParameterizedAssignment.studentId', 'student.id', 'ParameterizedAssignment.solved'],
    limit,
    order: [[sequelize.fn('count', sequelize.col('solved')), order]]
  })

  return res.map(row => (
    {
      id: row.dataValues.student.id,
      username: row.dataValues.student.username,
      email: row.dataValues.student.email,
      solved: row.dataValues.solved
    }
  ))
}

router.get('/top', async (req, res, next) => {
  try {
    const users = await getRanking(10, 'DESC')
    return res.json({ success: true, users })
  } catch (err) {
    next(err)
  }
})

module.exports = router
