const solc = require('solc')
const Web3 = require('web3')
const BaseJudge = require('./BaseJudge')
const _ = require('lodash')

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
    this.message = compilerErrors.reduce((previous, current) => `${previous} \n ${current}`, `Contract compilation error!:`)
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

    this.web3 = new Web3(new Web3.providers.WebsocketProvider(provider))
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

    const compiled = solc.compile(source, 1)

    if (compiled.errors && compiled.errors.length > 0) {
      throw new CompilationError(compiled.errors)
    }

    const formattedName = ':' + name

    if (compiled.contracts[formattedName] === undefined) {
      throw new CompilationError([`Contract name should be ${name}`])
    }

    const ABI = JSON.parse(compiled.contracts[formattedName].interface)
    const bytecode = compiled.contracts[formattedName].bytecode
    const contract = new this.web3.eth.Contract(ABI)

    if (!this.contractHas(contract.methods, props.methods)) {
      throw new FunctionalityError(`Contract methods are missing!. Expecting: ${JSON.stringify(props.methods)}`)
    }

    if (!this.contractHas(contract.events, props.events)) {
      throw new FunctionalityError(`Contract events are missing!. Expecting: ${JSON.stringify(props.events)}`)
    }

    const accounts = await this.web3.eth.getAccounts()

    const instance = await contract
      .deploy({ data: bytecode, arguments: props.args })
      .send({ from: accounts[0], gas: 1000000 })

    this.contractInstance = instance

    return instance
  }

  async getAccounts () {
    const accounts = await this.web3.eth.getAccounts()
    return accounts
  }

  contractHas (type, values) {
    return _.difference(
      values,
      Object.keys(type)
    )
      .length === 0
  }

  // https://github.com/OpenZeppelin/openzeppelin-solidity

  async balanceDifferenceOfAction (account, promise, args) {
    const balanceBefore = await this.web3.eth.getBalance(account)
    const tx = await promise({ ...args })
    const balanceAfter = await this.web3.eth.getBalance(account)
    const diff = this.getDiff(balanceBefore, balanceAfter)
    return { diff, tx }
  }

  getDiff (a, b) {
    return (new this.web3.utils.BN(a)).sub(new this.web3.utils.BN(b))
  }

  async txWithoutGas (ammount, gas) {
    const gasPrice = await this.web3.eth.getGasPrice()
    return ammount.sub(this.toBN(gas * gasPrice)).abs()
  }

  sendEther (from, to, value) {
    return this.web3.eth.sendTransaction({
      from: from,
      to: to,
      value: value,
      gasPrice: 0
    })
  }

  ether (n) {
    return new this.web3.utils.BN(this.web3.utils.toWei(n.toString(), 'ether'))
  }

  toBN (num) {
    return this.web3.utils.toBN(num)
  }

  hash (...args) {
    return this.web3.utils.soliditySha3(...args)
  }
}

module.exports = SolidityJudge
