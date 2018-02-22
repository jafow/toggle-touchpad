const fs = require('fs')
const os = require('os')
const spawn = require('child_process').spawn
const split = require('split')
const through = require('through2')

var xinput

const commands = {
  list: 'Usage: \t -l, --list list touchpad xinput devices',
  disable: '\t -d --disable  disable touchpad',
  enable: '\t -e --enable  enable touchpad',
  help: '\t -h, --help show this message'
}

module.exports = Toggle

function Toggle () {
  if (!(this instanceof Toggle)) return new Toggle()
  this.tmpId = `${os.tmpdir()}/toggletouchpad-id`
}

Toggle.prototype.list = function list () {
  xinput = spawn('xinput', ['--list'])
  xinput.stdout
    .pipe(split())
    .pipe(through(listTouchPad))
    .pipe(process.stdout)

  xinput.stderr.on('data', (err) => {
    throw new Error(`error on --list ${err.toString()}`)
  })
}

Toggle.prototype.usage = function usage () {
  console.log(`toggle-touchpad: Enable/disable xinput touchpad devices`)

  for (let key in commands) {
    if (commands.hasOwnProperty(key)) {
      console.log(commands[key])
    }
  }
}

Toggle.prototype.disable = function disable () {
  var stream = fs.createWriteStream(this.tmpId)

  xinput = spawn('xinput', ['--list'])
  xinput.stdout
    .pipe(split())
    .pipe(through(writeTouchPad))
    .pipe(stream)

  xinput.on('close', () => {
    fs.readFile(this.tmpId, disableDeviceId)
  })
}

Toggle.prototype.enable = function enable () {
  var stream = fs.createWriteStream(this.tmpId)

  xinput = spawn('xinput', ['--list'])
  xinput.stdout
    .pipe(split())
    .pipe(through(writeTouchPad))
    .pipe(stream)

  xinput.on('close', () => {
    fs.readFile(this.tmpId, enableDeviceId)
  })
}

function disableDeviceId (err, data) {
  if (err) {
    console.error('Cant find device id', err)
    return err
  }
  var id = parseInt(data.toString(), 10)
  var spawnDisable = spawn('xinput', ['disable', `${id}`])
  spawnDisable.stdout.pipe(process.stdout)
  spawnDisable.stderr.pipe(process.stdout)
}

function enableDeviceId (err, data) {
  if (err) {
    console.error('Cant find device id', err)
    return err
  }
  var id = parseInt(data.toString(), 10)
  var spawnEnable = spawn('xinput', ['enable', `${id}`])
  spawnEnable.stdout.pipe(process.stdout)
  spawnEnable.stderr.pipe(process.stdout)
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
