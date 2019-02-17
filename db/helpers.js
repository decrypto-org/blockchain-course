const crypto = require('crypto')
const fs = require('fs')
const should = require('chai').should()
const _ = require('lodash')

const isString = (str) => {
  return Object.prototype.toString.call(str) === '[object String]'
}

const mapJSFiles = (dirname, mapFn, exclude = []) => {
  fs
    .readdirSync(dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && !exclude.includes(file) && (file.slice(-3) === '.js')
    })
    .forEach(mapFn)
}

const sha256 = (data) => {
  const hash = crypto.createHash('sha256')
  hash.update(data)
  return hash.digest('hex')
}

// https://github.com/OpenZeppelin/openzeppelin-solidity/blob/master/test/helpers/shouldFail.js

const shouldFailWithMessage = async (promise, message, errorMessage) => {
  try {
    await promise
  } catch (error) {
    error.message.should.include(message, 'Wrong failure type')
    return
  }

  should.fail(errorMessage)
}

const shouldRevert = async (promise, errorMessage) => {
  await shouldFailWithMessage(promise, 'revert', errorMessage)
}

const shouldThrow = async (promise, errorMessage) => {
  await shouldFailWithMessage(promise, 'invalid opcode', errorMessage)
}

const shouldBeOutOfGas = async (promise, errorMessage) => {
  await shouldFailWithMessage(promise, 'out of gas', errorMessage)
}

const expectEventInLogs = (events, eventName, eventArgs = {}) => {
  const event = Object.keys(events).find((e) => {
    if (e === eventName) {
      for (const [k, v] of Object.entries(eventArgs)) {
        if (_.isEmpty(events[e])) {
          return false
        }
        events[e].returnValues[k].should.be.equal(v, 'Event did not emmited')
      }
      return true
    }
  })
  should.exist(event, 'Event did not emmited')
  return event
}

module.exports = {
  isString,
  mapJSFiles,
  sha256,
  shouldRevert,
  shouldThrow,
  shouldBeOutOfGas,
  expectEventInLogs
}
