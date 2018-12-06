const _ = require('lodash')
const low = require('lowdb')
const path = require('path')
const FileSync = require('lowdb/adapters/FileSync')

const FileContainer = require('./FileContainer')

const LECTURE_RESOURCE_FOLDER = path.resolve(__dirname, '../../../resources/files')

const adapter = new FileSync(path.resolve(__dirname, '../../../resources/lectures.json'))
const db = low(adapter)

class Lecture extends FileContainer {
  getResourceFolderPath() {
    return LECTURE_RESOURCE_FOLDER
  }

  static findByName(name, options = {}) {
    let lecture = db.get('lectures')
      .find({ name })
      .value()

    if(_.isEmpty(lecture)) {
      return null
    }

    let instance = new Lecture()
    instance.metadata = lecture

    return instance
  }

  static findAll () {
    return db.get('lectures')
      .value()
  }
}

Lecture.name = "Lecture"
Lecture.hidden = false;


module.exports = Lecture
