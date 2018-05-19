'use strict';
module.exports = (sequelize, DataTypes) => {
  var ParameterizedAssignment = sequelize.define('ParameterizedAssignment', {
    assignmentId: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER,
    auxPublic: DataTypes.TEXT,
    auxPrivate: DataTypes.TEXT
  }, {});
  ParameterizedAssignment.associate = function(models) {
    ParameterizedAssignment.belongsTo(models.Assignment)
    ParameterizedAssignment.belongsTo(models.User, {as: 'student'})
  };
  return ParameterizedAssignment;
};
