'use strict'
module.exports = (sequelize, DataTypes) => {
  var ParameterizedAssignment = sequelize.define('ParameterizedAssignment', {
    assignmentId: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER,
    auxPublic: DataTypes.TEXT,
    auxPrivate: DataTypes.TEXT
  }, {})
  ParameterizedAssignment.associate = function(models) {
    ParameterizedAssignment.belongsTo(
      models.Assignment, {foreignKey: 'assignmentId'}
    )
    ParameterizedAssignment.belongsTo(models.User, {as: 'student'})
    ParameterizedAssignment.hasMany(models.Solution)
  }
  ParameterizedAssignment.beforeCreate(async (parameterizedAssignment, options) => {
    const {Assignment} = require('.')
    const assignment = await Assignment.findById(parameterizedAssignment.assignmentId)
    const assignmentName = assignment.name
    const assignmentPath = '../assignments/' + assignmentName
    const AssignmentJudge = require(assignmentPath)
    const assignmentJudge = new AssignmentJudge()

    const aux = assignmentJudge.aux()
    parameterizedAssignment.auxPrivate = aux.private
    parameterizedAssignment.auxPublic = aux.public
  })
  return ParameterizedAssignment
}
