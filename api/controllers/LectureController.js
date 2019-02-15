const OrderedDataController = require('./OrderedDataController')
const Downloadable = require('./Downloadable')
const { classMixin } = require('../utils/helpers')
const { Lecture, Assignment } = require('blockchain-course-db').models

module.exports = class LectureController extends classMixin(OrderedDataController, Downloadable) {
  constructor () {
    super(Lecture, 'lectures', 'lecture')
  }

  async read (req, res, name) {
    const lecture = await Lecture.findByName(name)
    const assignments = Assignment.findAllByLecture(name)

    /* throws an HTTPError if the resource is not found */
    this.requireResourceFound(lecture)

    return res.status(200).send(
      {
        success: true, lecture: [{ ...lecture.metadata, assignments }]
      }
    )
  }
}
