'use strict'

var test = require('tape')
var packager = require('.')

test('Level constructor has access to levelup errors', function (t) {
  function Down () {}
  t.ok(packager(Down).errors, '.errors property set on constructor')
  t.end()
})

test('Level constructor relays .destroy and .repair if they exist', function (t) {
  t.plan(8)

  test('destroy')
  test('repair')

  function test (method) {
    function Down () {}

    Down[method] = function () {
      t.same([].slice.call(arguments), args, 'supports variadic arguments')
    }

    var level = packager(Down)
    var args = []

    for (var i = 0; i < 4; i++) {
      args.push(i)
      level[method].apply(level, args)
    }
  }
})

test('Level constructor with default options', function (t) {
  t.plan(3)
  function Down (location) {
    t.is(location, 'location', 'location is correct')
    return {
      open: function (opts, cb) {}
    }
  }
  var levelup = packager(Down)('location')
  t.is(levelup.options.keyEncoding, 'utf8')
  t.is(levelup.options.valueEncoding, 'utf8')
})

test('Level constructor with callback', function (t) {
  t.plan(4)
  function Down (location) {
    t.is(location, 'location', 'location is correct')
    return {
      open: function (opts, cb) {
        t.pass('open called')
        process.nextTick(cb)
      }
    }
  }
  packager(Down)('location', function (err, db) {
    t.error(err)
    t.ok(db, 'db set in callback')
  })
})

test('Level constructor with custom options', function (t) {
  t.plan(3)
  var Down = function (location) {
    t.is(location, 'location', 'location is correct')
    return {
      open: function (opts, cb) {}
    }
  }
  var levelup = packager(Down)('location', {
    keyEncoding: 'binary',
    valueEncoding: 'binary'
  })
  t.is(levelup.options.keyEncoding, 'binary')
  t.is(levelup.options.valueEncoding, 'binary')
})
