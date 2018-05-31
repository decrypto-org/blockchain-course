'use strict'
module.exports = (sequelize, DataTypes) => {
  var LectureGroup = sequelize.define('LectureGroup', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    position: DataTypes.INTEGER
  }, {})
  LectureGroup.associate = function (models) {
    LectureGroup.hasMany(
      models.Lecture, {foreignKey: 'groupId'}
    )
  }
  return LectureGroup
}
