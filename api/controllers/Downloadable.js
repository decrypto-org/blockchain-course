const BaseController = require('./BaseController')

module.exports = class Downloadable extends BaseController {
  async download (req, res, name, hash) {
    const resource = await this.model.findByName(name)

    /* throws an HTTPError if the resource is not found */
    this.requireResourceFound(resource)

    const file = resource.getFileByHash(hash)

    this.requireResourceFound(file)

    const { title, fileType } = file

    const options = {
      dotfiles: 'deny',
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    }

    return res.download(`${resource.getResourceFolderPath()}/${hash}.${fileType}`, `${title}.${fileType}`, options)
  }
}
