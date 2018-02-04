const spawn = require('child_process').spawn
const split = require('split')
const through = require('through2')

var xinput

module.exports = Toggle
function Toggle () {
  if (!this instanceof Toggle) return new Toggle()
  this.deviceId = null
}

Toggle.prototype.list = function list () {
  xinput = spawn('xinput', ['--list'])  
  xinput.stdout
    .pipe(split())
    .pipe(through(listTouchPad))
    .pipe(process.stdout)

  xinput.stderr.on('data', (err) => {
    throw new Error(`error on --list ${err.toString()}`)
    process.exit(1)
  })
}


function writeTouchPad (buf, _, next) {
  var b = buf.toString()
  var re = /touchpad/i
  if (re.test(b)) {
    var inputIdNumber = idVal(b)
    this.push(inputIdNumber + '\n')
  }
  next()
}

function idVal (str) {
  var id = /id=\d+/
  var idStr = id.exec(str)[0]
  return parseInt(idStr.replace(/id=/, ''), 10)
}

function listTouchPad (buf, _, next) {
  var b = buf.toString()
  var re = /touchpad/i
  if (re.test(b)) {
    this.push(b + '\n')
  }
  next()
}
