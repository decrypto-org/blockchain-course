[![CircleCI](https://circleci.com/gh/decrypto-org/blockchain-course.svg?style=svg)](https://circleci.com/gh/decrypto-org/blockchain-course)

# Introduction to Blockchains

This repository contains the material for our [Introduction to
Blockchains](https://blockchain-course.org) course.

You can take the course online at
[blockchain-course.org](https://blockchain-course.org/).

## Installation

- `git submodule init && git submodule update`
- `cd db && yarn install && yarn link`
-  Inside `db` folder copy `.env-template` to `.env` and modify the variables accordingly
- `cd db && ./node_modules/.bin/run.env ./node_modules/.bin/sequelize db:migrate`
- `cd cli && yarn install && yarn link blockchain-course-db`
- `cd api && yarn install && yarn link blockchain-course-db`
- Inside `api` folder copy `.env-template` to `.env` and modify the variables accordingly
- `cd app && yarn install`
- Inside `app` folder copy `.env-template` to `.env.local` and modify the variables accordingly


## Assignments

Assignments by default are assumed to be inside `db/assignments`. You can change the location of the assignment folder by setting the environment variable `ASSIGNMENT_FOLDER`.

Each assignment should extend the `BaseJudge` class or the `SolidityJudge` class in the case of the smart contract. The assignments are parameterized for each user and each user has a public and a private aux. Both the public and the private aux are created once (See `db/models/parameterizedassignment.js`).

Each assignment has to implement `judge (aux, user, assignment, solution)` and `aux (user, assignment)` functions. `judge` function takes as input an `aux`, a `user`, an `assignment` and a `solution`, and returns `1` in case of success and `0` otherwise. The `aux` function takes as input the `user` and the `assignment` and return an aux `{ private: 'privateAux', public: 'publicAux' }` where `private` and `public` can be of any type and can be omitted.

### Example

```
const BaseJudge = require('../judge/BaseJudge')
const { sha256 } = require('../helpers')

const PREIMAGE_PREFIX = 'blockchain-course.org:'
const POW_TARGET = 5

class ProofOfWorkAssignmentJudge extends BaseJudge {
  aux (user, assignment) {
    return {
      public: user.id
    }
  }

  async judge (aux, user, assignment, solution) {
    const nonce = solution
    if (sha256(PREIMAGE_PREFIX + aux.public + nonce).substr(0, POW_TARGET) === '0'.repeat(POW_TARGET)) {
      return 1
    }
    return 0
  }
}

ProofOfWorkAssignmentJudge.metadata = {
  lecture: 'cryptographic-primitives',
  name: 'proof-of-work',
  title: 'Performing Proof-of-Work',
  description: `Find a nonce such that the hexadecimal digest of SHA256("${PREIMAGE_PREFIX}" || "%s" || <nonce>) starts with ${POW_TARGET} zero characters`,
  type: BaseJudge.type.TEXT
}

module.exports = ProofOfWorkAssignmentJudge

```


## Development

- `cd api && yarn start`
- `cd app && yarn start`

## Build APP

- `cd app && yarn build`

## Serve API

- `cd api && yarn serve`

## CLI Usage

```
node cli.js <command>

Commands:
  cli.js add <command>     Add an entity <group|lecture|file>
  cli.js delete <command>  Delete an entity <group|lecture|file>
  cli.js get <command>     Get an entity <group|lecture|file>
  cli.js update <command>  Update an entity <group|lecture|file>

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```
