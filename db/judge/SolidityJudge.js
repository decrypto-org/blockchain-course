const solc = require('solc')
const _ = require('lodash')
const Web3 = require('web3')
const BaseJudge = require('./BaseJudge')

const PROVIDER = process.env.PROVIDER || 'ws://localhost:7545'
const TESTNET_PROVIDER = `wss://ropsten.infura.io/ws`
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
const EMPTY_UINT = '0x0000000000000000000000000000000000000000000000000000000000000000'

class BlockchainConnectionError extends Error {
  constructor (...params) {
    super(...params)
    this.message = 'Could not connect to an Ethereum client.'
  }
}

class CompilationError extends Error {
  constructor (compilerErrors) {
    super()
    this.message = compilerErrors.reduce((previous, current) => `${previous} ${current.formattedMessage}`, `Contract compilation error!:`)
  }
}

class FunctionalityError extends Error {
  constructor (msg) {
    super(msg)
    this.message = msg
  }
}

class SolidityJudge extends BaseJudge {
  constructor (assignment, user, testnet = false) {
    super(assignment, user)

    let provider = testnet ? TESTNET_PROVIDER : PROVIDER

    this.web3 = new Web3(new Web3.providers.WebsocketProvider(provider), null, { transactionConfirmationBlocks: 1 })
  }

  static get ZERO_ADDRESS () {
    return ZERO_ADDRESS
  }

  static get EMPTY_UINT () {
    return EMPTY_UINT
  }

  async deploy (name, source, props) {
    try {
      await this.web3.eth.net.isListening()
    } catch (e) {
      throw new BlockchainConnectionError()
    }

    const input = {
      language: 'Solidity',
      sources: {
        [`${name}.sol`]: {
          content: source
        }
      },
      settings: {
        outputSelection: {
          '*': {
            '*': [ '*' ]
          }
        }
      }
    }

    let compiled = solc.compile(JSON.stringify(input))
    compiled = JSON.parse(compiled)

    if (compiled.errors && compiled.errors.length > 0) {
      throw new CompilationError(compiled.errors)
    }

    if (Object.keys(compiled.contracts[`${name}.sol`])[0] !== name) {
      throw new CompilationError([{ formattedMessage: `Contract name should be ${name}` }])
    }

    const compiledContract = compiled.contracts[`${name}.sol`][name]
    const contractMethods = _.chain(compiledContract.abi).filter({ type: 'function' }).map('name').value()
    const contractEvents = _.chain(compiledContract.abi).filter({ type: 'event' }).map('name').value()

    props.methods = props.methods || []

    if (!this.contractHas(contractMethods, props.methods)) {
      throw new FunctionalityError(`Contract methods are missing!. Expecting: ${JSON.stringify(props.methods)}`)
    }

    props.events = props.events || []

    if (!this.contractHas(contractEvents, props.events)) {
      throw new FunctionalityError(`Contract events are missing!. Expecting: ${JSON.stringify(props.events)}`)
    }

    const ABI = compiledContract.abi
    const bytecode = compiledContract.evm.bytecode.object
    const contract = new this.web3.eth.Contract(ABI)

    const accounts = await this.web3.eth.getAccounts()

    const instance = await this._deploy(contract, ABI, bytecode, accounts[0], props.args)
    this.contractInstance = instance
    return instance
  }

  _deploy (contract, ABI, data, from, args) {
    return new Promise(async (resolve, reject) => {
      contract
        .deploy({ data, arguments: args })
        .send({ from, gas: 2000000 })
        .on('receipt', (receipt) => {
          const instance = new this.web3.eth.Contract(ABI, receipt.contractAddress)
          resolve(instance)
        })
        .on('error', reject)
    })
  }

  async getAccounts () {
    const accounts = await this.web3.eth.getAccounts()
    return accounts
  }

  contractHas (type, values) {
    return values.every(item => type.includes(item))
  }

  // https://github.com/OpenZeppelin/openzeppelin-solidity

  async balanceDifferenceOfAction (account, promise) {
    const balanceBefore = await this.web3.eth.getBalance(account)
    const tx = await promise
    const balanceAfter = await this.web3.eth.getBalance(account)
    const diff = this.getDiff(balanceBefore, balanceAfter)
    return { diff, tx }
  }

  getDiff (a, b) {
    return (this.toBN(a)).sub(this.toBN(b))
  }

  async txWithoutGas (ammount, gas) {
    const gasPrice = await this.web3.eth.getGasPrice()
    return ammount.sub(this.toBN(gas * gasPrice)).abs()
  }

  sendEther (from, to, value) {
    return this.ensureConfirmed(this.web3.eth.sendTransaction, {
      from: from,
      to: to,
      value: value,
      gasPrice: 0
    })
  }

  ether (n) {
    return this.toBN(this.web3.utils.toWei(n.toString(), 'ether'))
  }

  toBN (num) {
    return this.web3.utils.toBN(num)
  }

  hash (...args) {
    return this.web3.utils.soliditySha3(...args)
  }

  ensureConfirmed (tx, args, times = 1) {
    return new Promise((resolve, reject) => {
      tx({ ...args })
        .on('confirmation', (confNumber, receipt) => {
          if (confNumber >= times) {
            resolve(receipt)
          }
        })
        .on('error', (err) => {
          reject(err)
        })
    })
  }

  send (method, methodArgs = [], txArgs = {}) {
    if (!_.isFunction(this.contractInstance.methods[method])) {
      throw new Error(`${method}: Method is not defined!`)
    }

    return this.contractInstance.methods[method](...methodArgs).send({ ...txArgs })
  }

  call (method, methodArgs = [], txArgs = {}) {
    if (!_.isFunction(this.contractInstance.methods[method])) {
      throw new Error(`${method}: Method is not defined!`)
    }

    return this.contractInstance.methods[method](...methodArgs).call({ ...txArgs })
  }

  toBytes32 (value) {
    return this.web3.utils.padRight(this.web3.utils.utf8ToHex(value), 64)
  }

  fromBytes32 (value) {
    return this.web3.utils.hexToUtf8(value)
  }
}

SolidityJudge.isAsync = true

module.exports = SolidityJudge
