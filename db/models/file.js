'use strict'
module.exports = (sequelize, DataTypes) => {
  var File = sequelize.define('File', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    hash: DataTypes.STRING,
    fileType: DataTypes.STRING,
    type: DataTypes.STRING,
    objId: DataTypes.INTEGER
  }, {})

  return File
}
