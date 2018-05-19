'use strict';
module.exports = (sequelize, DataTypes) => {
  var Assignment = sequelize.define('Assignment', {
    name: DataTypes.TEXT,
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    type: DataTypes.INTEGER,
    position: DataTypes.INTEGER
  }, {});
  Assignment.associate = function(models) {
  };
  return Assignment;
};
