const Table = require('cli-table3')
const crypto = require('crypto')
const fs = require('fs')
const util = require('util')

const readFile = util.promisify(fs.readFile)

class ResourceNotFoundError extends Error {
  constructor () {
    super()
    this.message = 'Resource not found'
  }
}

const printAndExit = (data, exitCode = 0) => {
  console.log(data)
  process.exit(0)
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

const mainCmdbuilder = (yargs, buildedSubCmds) => {
  for (const key in buildedSubCmds) {
    if (buildedSubCmds.hasOwnProperty(key)) {
      yargs.command(buildedSubCmds[key])
    }
  }
  return yargs
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

  return {
    command: cmd.command,
    desc: cmd.desc,
    builder: (yargs) => mainCmdbuilder(yargs, buildedSubCmds),
    handler: (argv) => {}
  }
}

const normalizeResponse = (res = []) => {
  const rows = []
  const dataKey = res[0].metadata ? 'metadata' : 'dataValues'

  res.forEach(row => {
    rows.push(Object.values(row[dataKey]))
  })

  return constructTable(
    Object.keys(res[0][dataKey]),
    rows
  ).toString()
}

const handleGetEntity = async (argv, model, key) => {
  let Model = null

  if (model !== 'Assignment') {
    let models = require('blockchain-course-db').models
    Model = models[model]
  } else {
    Model = require('../db/models/custom/assignment')
  }

  let data = null

  if (argv.all || !argv.id) {
    console.log(`[*] Getting all ${key}s...`)
    data = await Model.findAll()

    if (argv._[1] === 'assignment') {
      data = data.map((item) => {
        let { description, files, type, ...rest } = item
        return { metadata: rest }
      })
    }
    console.log(`[*] Done!`)
    return normalizeResponse(data)
  }

  console.log(`[*] Getting ${key}...`)
  data = await Model.findByPk(argv.id)
  _requireResourceFound(data)
  console.log(`[*] Done!`)
  data = [data]

  return normalizeResponse(data)
}

const handleAuxGeneration = (argv, model, key) => {
  const Assignment = require('../db/models/custom/assignment')
  const assignment = Assignment.findByName(argv.assignment)
  _requireResourceFound(assignment)
  const assignmentJudge = new assignment.Judge()
  const aux = assignmentJudge.formatAux(assignmentJudge.aux(argv.user, assignment))
  return { ...aux }
}

const checkUserMiddleware = (argv) => {
  if (argv.user) {
    if (argv.user.id === undefined || argv.user.username === undefined) {
      const user = { id: 1, username: 'fake_user' }
      console.log(`[*] user.id or user.username is undefined! I am going to use: ${JSON.stringify(user)}`)
      return { ...argv, user }
    }
  }
  return argv
}

const checkAuxMiddleware = (argv) => {
  if (argv.aux) {
    if (argv.aux.public === undefined && argv.aux.private === undefined) {
      throw new Error('Aux public and private are undefined')
    }
  }
  return argv
}

const solutionMiddleware = async (argv) => {
  if (argv.solution && argv.file) {
    argv.solution = await readFile(argv.solution, 'utf8')
  }

  return argv
}

const handleJudgement = async (argv, model, key) => {
  const Assignment = require('../db/models/custom/assignment')

  const assignment = Assignment.findByName(argv.id)
  _requireResourceFound(assignment)

  const judge = new assignment.Judge(assignment.Judge, argv.user)
  const judgement = await judge.judge(argv.aux, argv.user, assignment.Judge, argv.solution)

  console.log(judgement)

  return judgement
}

const constructTable = (head, rows) => {
  const table = new Table({
    head
  })

  rows.forEach(row => table.push(row))

  return table
}

module.exports = {
  buildCommand,
  hashFile,
  handleGetEntity,
  handleAuxGeneration,
  handleJudgement,
  checkUserMiddleware,
  checkAuxMiddleware,
  solutionMiddleware,
  mainCmdbuilder,
  constructTable,
  printAndExit
}
