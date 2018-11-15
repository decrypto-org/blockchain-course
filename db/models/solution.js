'use strict'
module.exports = (sequelize, DataTypes) => {
  var Solution = sequelize.define('Solution', {
    parameterizedAssignmentId: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER,
    data: DataTypes.TEXT
  }, {})
  Solution.associate = function (models) {
    Solution.belongsTo(models.ParameterizedAssignment, {foreignKey: 'parameterizedAssignmentId', targetKey: 'id'})
    Solution.belongsTo(models.User, {as: 'student', foreignKey: 'studentId', targetKey: 'id'})
  }
  return Solution
}
