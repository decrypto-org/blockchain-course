const OrderedDataController = require('./OrderedDataController')
const Downloadable = require('./Downloadable')
const { classMixin } = require('../utils/helpers')
const { Lecture, File } = require('blockchain-course-db').models

module.exports = class LectureController extends classMixin(OrderedDataController, Downloadable) {
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
}
