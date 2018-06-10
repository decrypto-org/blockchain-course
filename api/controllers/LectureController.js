const BaseController = require('./BaseController')
const {Lecture, File} = require('../models')

module.exports = class LectureController extends BaseController {
  constructor () {
    super(Lecture, 'lectures', 'lecture')
  }

  async read (req, res, id) {
    const lecture = await Lecture.findById(id)

    if (lecture === null) {
      return res.status(404).send({success: false, msg: 'Lecture group not found'})
    }

    const files = await File.findAll({
      where: {
        type: 'lecture',
        objId: id
      }
    })

    return res.status(200).send(
      {
        success: true, lecture: [{...lecture.dataValues, files}]
      }
    )
  }
}
