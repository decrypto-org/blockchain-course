const _ = require('lodash')

class FileContainer {
  getFileByHash(hash)  {
    return this.metadata.files ? this.metadata.files.filter(file => file.hash === hash)[0] : []
  }
}

FileContainer.hidden = true;

module.exports = FileContainer
