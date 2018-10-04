[![CircleCI](https://circleci.com/gh/SignedBlock/blockchain-course.svg?style=svg&circle-token=fb8a1e182558aa8a1998d4c36d9b74c8531f43f9)](https://circleci.com/gh/SignedBlock/blockchain-course)

# Introduction to Blockchains

This repository contains the material for our [Introduction to
Blockchains](https://blockchain-course.org) course.

You can take the course online at
[blockchain-course.org](https://blockchain-course.org/).

## Installation

- `cd db && yarn install && yarn link`
- Copy `.env-template` to `.env` and modify the variables
- `cd cli && yarn install && yarn link blockchain-course-db`
- `cd api && yarn install && yarn link blockchain-course-db`
- Copy `.env-template` to `.env` and modify the variables
- `cd app && yarn install`
- Copy `.env-template` to `.env.local` and modify the variables

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
