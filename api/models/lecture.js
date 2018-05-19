'use strict';
module.exports = (sequelize, DataTypes) => {
  var Lecture = sequelize.define('Lecture', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    videourl: DataTypes.STRING,
    position: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER
  }, {});
  Lecture.associate = function(models) {
    Lecture.belongsTo(
      models.LectureGroup, {as: 'group'}
    )
  };
  return Lecture;
};
