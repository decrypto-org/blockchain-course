'use strict'
module.exports = (sequelize, DataTypes) => {
  var Assignment = sequelize.define('Assignment', {
    name: DataTypes.TEXT,
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    type: DataTypes.INTEGER,
    position: DataTypes.INTEGER
  }, {})
  Assignment.associate = function(models) {
    Assignment.hasMany(
      models.ParameterizedAssignment,
      {foreignKey: 'assignmentId'}
    )
  }
  return Assignment
}
