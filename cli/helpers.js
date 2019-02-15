const { sequelize } = require('blockchain-course-db').models
const crypto = require('crypto')
const fs = require('fs')
const path = require('path')

class ResourceNotFoundError extends Error {
  constructor () {
    super()
    this.message = 'Resource not found'
  }
}

const slugify = (string) => {
  return string
    .toString()
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}

const printAndExit = (data, exitCode = 0) => {
  console.log(data)
  sequelize.close()
}

const hashFile = (filePath) => {
  return new Promise((resolve, reject) => {
    const frs = fs.createReadStream(filePath)
    const hash = crypto.createHash('sha256')

    frs.on('error', reject)
    frs.on('data', chunk => hash.update(chunk))
    frs.on('end', () => resolve(hash.digest('hex')))
  })
}

const _buildHandler = (key, Model, handlerFunc) => {
  return async (argv) => {
    const data = await handlerFunc(argv, Model, key)
    printAndExit(data)
  }
}

const _requireResourceFound = (resource) => {
  if (resource === null) {
    throw new ResourceNotFoundError()
  }

  return resource
}

const buildCommand = (cmd, subCmds = {}) => {
  const buildedSubCmds = {}

  for (let key in subCmds.entries) {
    if (subCmds.entries.hasOwnProperty(key)) {
      buildedSubCmds[key] = {}
      const [Model, options, entityHandler] = subCmds.entries[key]

      buildedSubCmds[key].command = subCmds.options.cmd.replace(':key', key)
      buildedSubCmds[key].desc = subCmds.options.desc.replace(':key', key)
      buildedSubCmds[key].builder = { ...options }
      buildedSubCmds[key].handler = _buildHandler(key, Model, entityHandler)
    }
  }

  const mainCmdbuilder = (yargs) => {
    for (const key in buildedSubCmds) {
      if (buildedSubCmds.hasOwnProperty(key)) {
        yargs.command(buildedSubCmds[key])
      }
    }
    return yargs
  }

  return {
    command: cmd.command,
    desc: cmd.desc,
    builder: mainCmdbuilder,
    handler: (argv) => {}
  }
}

const handleGetEntity = async (argv, Model, key) => {
  let data = null

  if (argv.all || !argv.id) {
    console.log(`[*] Getting all ${key}s...`)
    data = await Model.findAll()
    console.log(`[*] Done!`)
    return data
  }

  console.log(`[*] Getting ${key}...`)
  data = await Model.findById(argv.id)
  _requireResourceFound(data)
  console.log(`[*] Done!`)

  return data.metadata
}

const handleAddEntity = async (argv, Model, key) => {
  console.log(`[*] Adding ${key}...`)

  const model = Model.build({ ...argv })
  const { _: cmds } = argv

  if (cmds[1] === 'group') {
    model.name = slugify(model.title)
  }

  if (cmds[1] === 'file') {
    model.hash = await hashFile(argv.file)
    model.fileType = path.extname(path.basename(argv.file)).substr(1)
  }

  const data = await model.save()

  console.log(`[*] Done!`)

  return data.dataValues || data
}

const handleUpdateEntity = async (argv, Model, key) => {
  console.log(`[*] Updating ${key}...`)

  const model = await Model.findById(argv.id)
  const { _: cmds } = argv

  if (cmds[1] === 'group' && argv.title) {
    argv.name = slugify(argv.title)
  }

  if (cmds[1] === 'file' && argv.file) {
    argv.hash = await hashFile(argv.file)
    argv.fileType = path.extname(path.basename(argv.file)).substr(1)
  }

  const data = await model.update({ ...argv })
  console.log(`[*] Done!`)

  return data.dataValues || data
}

const handleDeleteEntity = async (argv, Model, key) => {
  console.log(`[*] Deleting ${key}...`)
  const model = await Model.findById(argv.id)

  _requireResourceFound(model)

  const data = await model.destroy()
  console.log(`[*] Done!`)
  return data.dataValues || data
}

const checkAuxMiddleware = (argv) => {
  if (argv.aux) {
    if (argv.aux.public === undefined && argv.aux.private === undefined) {
      throw new Error('Aux public and private are undefined')
    }
  }
  return argv
}

module.exports = {
  buildCommand,
  hashFile,
  handleGetEntity,
  handleAddEntity,
  handleUpdateEntity,
  handleDeleteEntity
  checkAuxMiddleware
}
