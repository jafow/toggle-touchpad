const test = require('tape')
const Toggle = require('./')
const ttp = new Toggle()

test('module set up', function (t) {
  t.plan(4)
  t.ok(typeof ttp.list === 'function', 'has a list command')
  t.ok(typeof ttp.enable === 'function', 'has a enable command')
  t.ok(typeof ttp.disable === 'function', 'has a disable command')
  t.ok(typeof ttp.usage === 'function', 'has a help command')
})
