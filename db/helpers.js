const crypto = require('crypto')
const fs = require('fs')
const should = require('chai').should()

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

const shouldFailWithMessage = async (promise, message) => {
  try {
    await promise
  } catch (error) {
    error.message.should.include(message, 'Wrong failure type')
    return
  }

  should.fail(`Expected '${message}' failure not received`)
}

const shouldRevert = async (promise) => {
  await shouldFailWithMessage(promise, 'revert')
}

const shouldThrow = async (promise) => {
  await shouldFailWithMessage(promise, 'invalid opcode')
}

const shouldBeOutOfGas = async (promise) => {
  await shouldFailWithMessage(promise, 'out of gas')
}

const expectEventInLogs = (events, eventName, eventArgs = {}) => {
  const event = Object.keys(events).find((e) => {
    if (e === eventName) {
      for (const [k, v] of Object.entries(eventArgs)) {
        events[e].returnValues[k].should.be.equal(v)
      }
      return true
    }
  })
  should.exist(event)
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
