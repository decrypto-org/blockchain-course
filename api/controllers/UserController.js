const BaseController = require('./BaseController')
const { User, Assignment, ParameterizedAssignment, Solution } = require('blockchain-course-db').models

module.exports = class UserController extends BaseController {
  constructor () {
    super(User, 'users', 'users')
  }

  async list (req, res) {}

  async getStatistics (user) {
    const totalSolved = await ParameterizedAssignment.count(
      {
        where: { studentId: user.id, solved: true }
      })
    const totalAssignments = Assignment.findAll().length

    return { totalSolved, totalAssignments }
  }

  async getSolutions (user) {
    let res = await Solution.findAll({
      include: [
        {
          model: ParameterizedAssignment,
          where: { studentId: user.id },
          attributes: [
            ['studentId', 'user'],
            ['assignmentName', 'name'],
            'solved'
          ]
        }
      ],
      attributes: [
        ['data', 'solution']
      ],
      where: { studentId: user.id },
      raw: true
    })

    res = res.map(item => ({
      solution: item.solution,
      user: item['ParameterizedAssignment.user'],
      name: item['ParameterizedAssignment.name'],
      solved: item['ParameterizedAssignment.solved']
    }))

    return res
  }

  async read (req, res, name) {
    const user = req.user
    const statistics = await this.getStatistics(user)
    const solutions = await this.getSolutions(user)

    res.json({ success: 200, user: { ...user.dataValues, statistics, solutions } })
  }
}
