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
  return ParameterizedAssignment
}
