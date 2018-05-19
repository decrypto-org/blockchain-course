'use strict';
module.exports = (sequelize, DataTypes) => {
  var Solution = sequelize.define('Solution', {
    parameterizedAssignmentId: DataTypes.INTEGER,
    data: DataTypes.TEXT
  }, {});
  Solution.associate = function(models) {
    Solution.belongsTo(models.ParameterizedAssignment)
    Solution.belongsTo(models.User, {as: 'student'})
  };
  return Solution;
};
