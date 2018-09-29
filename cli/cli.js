#!/usr/bin/env node

const yargs = require('yargs')

yargs // eslint-disable-line no-unused-expressions
  .commandDir('cmds')
  .showHelpOnFail(true)
  .demandCommand(1, '')
  .help()
  .argv
