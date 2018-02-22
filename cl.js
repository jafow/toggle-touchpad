#! /usr/bin/env node

const minimist = require('minimist')
const Toggle = require('./index')
const ttp = new Toggle()

const parseArgs = minimist(process.argv)

if (parseArgs.list || parseArgs.l) {
  ttp.list()
}

if (parseArgs.h || parseArgs.help) {
  ttp.usage()
}

if (parseArgs.disable || parseArgs.d) {
  ttp.disable()
}

if (parseArgs.enable || parseArgs.e) {
  ttp.enable()
}
