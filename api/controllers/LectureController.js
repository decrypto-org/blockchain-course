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

  async download (req, res, id, hash) {
    const file = await File.findOne({
      where: {hash},
      attributes: ['title', 'fileType']
    })

    const {title, fileType} = file.dataValues

    if (file === null) {
      return res.status(404).send({success: false, msg: 'File not found'})
    }

    const options = {
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    }

    return res.download(`${process.env.UPLOAD_FOLDER}/${hash}.${fileType}`, `${title}.${fileType}`, options)
  }
}
