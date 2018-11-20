const BaseController = require('./BaseController')
const { File } = require('blockchain-course-db').models

module.exports = class Downloadable extends BaseController {
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
