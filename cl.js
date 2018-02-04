#! /usr/bin/env node

const minimist = require('minimist')
const Toggle = require('./index')
const tog = new Toggle()

const parseArgs = minimist(process.argv)

if (parseArgs.list || parseArgs.l) {
  tog.list()
}

if (parseArgs.h || parseArgs.help) {
  tog.usage()
}
