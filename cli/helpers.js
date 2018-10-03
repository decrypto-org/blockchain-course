const { sequelize } = require('blockchain-course-db').models
const crypto = require('crypto')
const fs = require('fs')
const _ = require('lodash')

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
    desc: cmd.command,
    builder: mainCmdbuilder,
    handler: (argv) => {}
  }
}

const handleGetEntity = async (argv, Model, key) => {
  let data = null

  if (argv.all || !argv.id) {
    console.log(`[*] Getting all ${key}s...`)
    data = await Model.findAll({ limit: 10, raw: true })
    console.log(`[*] Done!`)
    return data
  }

  console.log(`[*] Getting ${key}...`)
  data = await Model.findById(argv.id, { raw: true })
  console.log(`[*] Done!`)

  return data
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
    model.fileType = 'pdf' // TODO: Read file type from file
  }

  const data = await model.save()

  console.log(`[*] Done!`)

  return data.dataValues || data
}

module.exports = {
  buildCommand,
  handleGetEntity,
  hashFile,
  handleAddEntity
}
