'use strict'
module.exports = (sequelize, DataTypes) => {
  let ParameterizedAssignment = sequelize.define('ParameterizedAssignment', {
    assignmentName: DataTypes.STRING,
    studentId: DataTypes.INTEGER,
    auxPublic: DataTypes.TEXT,
    auxPrivate: DataTypes.TEXT,
    solved: DataTypes.BOOLEAN
  }, {})
  ParameterizedAssignment.associate = function (models) {
    ParameterizedAssignment.belongsTo(models.User, {as: 'student', foreignKey: 'studentId', targetKey: 'id'})
    ParameterizedAssignment.hasMany(models.Solution, {foreignKey: 'parameterizedAssignmentId', sourceKey: 'id'})
  }
  ParameterizedAssignment.beforeCreate(async (parameterizedAssignment, options) => {
    const {User, Assignment} = require('.')

    const assignment = Assignment.findByName(parameterizedAssignment.assignmentName)
    const user = await User.findById(parameterizedAssignment.studentId)

    const assignmentJudge = new assignment.Judge()

    const aux = assignmentJudge.formatAux(assignmentJudge.aux(user, assignment))
    parameterizedAssignment.auxPrivate = aux.private
    parameterizedAssignment.auxPublic = aux.public
  })
  return ParameterizedAssignment
}
