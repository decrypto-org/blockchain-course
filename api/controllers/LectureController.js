const OrderedDataController = require('./OrderedDataController')
const { Lecture, File } = require('blockchain-course-db').models

module.exports = class LectureController extends OrderedDataController {
  constructor () {
    super(Lecture, 'lectures', 'lecture')
  }

  async read (req, res, id) {
    const lecture = await Lecture.findById(id)

    /* throws an HTTPError if the resource is not found */
    this.requireResourceFound(lecture)

    const files = await File.findAll({
      where: {
        type: 'lecture',
        objId: id
      }
    })

    return res.status(200).send(
      {
        success: true, lecture: [{ ...lecture.dataValues, files }]
      }
    )
  }

  async download (req, res, id, hash) {
    const file = await File.findOne({
      where: { hash },
      attributes: ['title', 'fileType']
    })

    /* throws an HTTPError if the resource is not found */
    this.requireResourceFound(file)

    const { title, fileType } = file.dataValues

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
