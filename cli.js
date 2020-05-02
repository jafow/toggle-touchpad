#! /usr/bin/env node

const minimist = require('minimist')
const Toggle = require('./index')
const ttp = new Toggle()

const parseArgs = minimist(process.argv)

function main () {
  if (parseArgs.list || parseArgs.l) {
    return ttp.list()
  }

  if (parseArgs.h || parseArgs.help) {
    return ttp.usage()
  }

  if (parseArgs.disable || parseArgs.d) {
    return ttp.disable()
  }

  if (parseArgs.enable || parseArgs.e) {
    return ttp.enable()
  } else {
    ttp.usage()
    process.exit(1)
  }
}

main()
