var test = require('tape')
var encdown = require('..')
var memdown = require('memdown')
var Buffer = require('safe-buffer').Buffer
var noop = function () {}

test('opens and closes the underlying db', function (t) {
  var _db = {
    open: function (opts, cb) {
      t.pass('open called')
      setImmediate(cb)
    },
    close: function (cb) {
      t.pass('close called')
      setImmediate(cb)
    }
  }
  var db = encdown(_db)
  db.open(function (err) {
    t.error(err, 'no error')
    db.close(function (err) {
      t.error(err, 'no error')
      t.end()
    })
  })
})

test('encodings default to utf8', function (t) {
  var db = encdown(memdown())
  t.ok(db.db, '.db should be set')
  t.ok(db.codec, '.codec should be set')
  t.deepEqual(db.codec.opts, {
    keyEncoding: 'utf8',
    valueEncoding: 'utf8'
  }, 'correct defaults')
  t.end()
})

test('default utf8 encoding stringifies numbers', function (t) {
  t.plan(3)

  var db = encdown({
    put: function (key, value, callback) {
      t.is(key, '1')
      t.is(value, '2')
    },
    batch: function (ops, options, callback) {
      t.same(ops, [ { type: 'put', key: '3', value: '4' } ])
    }
  })

  db.put(1, 2, noop)
  db.batch([{ type: 'put', key: 3, value: 4 }], noop)
})

test('test safe decode in get', function (t) {
  var memdb = memdown()
  var db = encdown(memdb, { valueEncoding: 'utf8' })
  db.put('foo', 'this {} is [] not : json', function (err) {
    t.error(err, 'no error')
    var db2 = encdown(memdb, { valueEncoding: 'json' })
    db2.get('foo', function (err, value) {
      t.equals('EncodingError', err.name)
      memdb.close(t.end.bind(t))
    })
  })
})

test('can decode from string to json', function (t) {
  var memdb = memdown()
  var db = encdown(memdb, { valueEncoding: 'utf8' })
  var data = { thisis: 'json' }
  db.put('foo', JSON.stringify(data), function (err) {
    t.error(err, 'no error')
    var db2 = encdown(memdb, { valueEncoding: 'json' })
    db2.get('foo', function (err, value) {
      t.error(err, 'no error')
      t.deepEqual(value, data, 'JSON.parse')
      memdb.close(t.end.bind(t))
    })
  })
})

test('can decode from json to string', function (t) {
  var memdb = memdown()
  var db = encdown(memdb, { valueEncoding: 'json' })
  var data = { thisis: 'json' }
  db.put('foo', data, function (err) {
    t.error(err, 'no error')
    var db2 = encdown(memdb, { valueEncoding: 'utf8' })
    db2.get('foo', function (err, value) {
      t.error(err, 'no error')
      t.deepEqual(value, JSON.stringify(data), 'JSON.stringify')
      memdb.close(t.end.bind(t))
    })
  })
})

test('binary encoding, using batch', function (t) {
  var data = [
    {
      type: 'put',
      key: Buffer.from([1, 2, 3]),
      value: Buffer.from([4, 5, 6])
    },
    {
      type: 'put',
      key: Buffer.from([7, 8, 9]),
      value: Buffer.from([10, 11, 12])
    }
  ]
  var db = encdown(memdown(), {
    keyEncoding: 'binary',
    valueEncoding: 'binary'
  })
  db.batch(data, function (err) {
    t.error(err, 'no error')
    db.get(data[0].key, function (err, value) {
      t.error(err, 'no error')
      t.deepEqual(value, data[0].value)
      db.get(data[1].key, function (err, value) {
        t.error(err, 'no error')
        t.deepEqual(value, data[1].value)
        db.close(t.end.bind(t))
      })
    })
  })
})

test('default encoding retrieves a string from underlying store', function (t) {
  t.plan(1)

  var down = {
    get: function (key, options, cb) {
      t.is(options.asBuffer, false, '.asBuffer is false')
    }
  }

  var db = encdown(down)

  db.get('key', noop)
})

test('custom value encoding that retrieves a string from underlying store', function (t) {
  t.plan(1)

  var down = {
    get: function (key, options, cb) {
      t.is(options.asBuffer, false, '.asBuffer is false')
    }
  }

  var db = encdown(down, {
    valueEncoding: {
      buffer: false
    }
  })

  db.get('key', noop)
})

test('get() forwards error from underlying store', function (t) {
  t.plan(1)

  var down = {
    get: function (key, options, cb) {
      process.nextTick(cb, new Error('error from store'))
    }
  }

  encdown(down).get('key', function (err) {
    t.is(err.message, 'error from store')
  })
})

test('_del() encodes key', function (t) {
  t.plan(1)

  var down = {
    del: function (key, options, cb) {
      t.is(key, '2')
    }
  }

  encdown(down).del(2, noop)
})

test('chainedBatch.put() encodes key and value', function (t) {
  t.plan(2)

  var down = {
    batch: function () {
      return {
        put: function (key, value) {
          t.is(key, '1')
          t.is(value, '2')
        }
      }
    }
  }

  encdown(down).batch().put(1, 2)
})

test('chainedBatch.del() encodes key', function (t) {
  t.plan(1)

  var down = {
    batch: function () {
      return {
        del: function (key) {
          t.is(key, '1')
        }
      }
    }
  }

  encdown(down).batch().del(1)
})

test('chainedBatch.clear() is forwarded to underlying store', function (t) {
  t.plan(1)

  var down = {
    batch: function () {
      return {
        clear: function () {
          t.pass('called')
        }
      }
    }
  }

  encdown(down).batch().clear()
})

test('chainedBatch.write() is forwarded to underlying store', function (t) {
  t.plan(1)

  var down = {
    batch: function () {
      return {
        write: function () {
          t.pass('called')
        }
      }
    }
  }

  encdown(down).batch().write(noop)
})

test('custom value encoding that retrieves a buffer from underlying store', function (t) {
  t.plan(1)

  var down = {
    get: function (key, options, cb) {
      t.is(options.asBuffer, true, '.asBuffer is true')
    }
  }

  var db = encdown(down, {
    valueEncoding: {
      buffer: true
    }
  })

  db.get('key', noop)
})

test('.keyAsBuffer and .valueAsBuffer defaults to false', function (t) {
  t.plan(2)

  var down = {
    iterator: function (options) {
      t.is(options.keyAsBuffer, false)
      t.is(options.valueAsBuffer, false)
    }
  }

  encdown(down).iterator()
})

test('.keyAsBuffer and .valueAsBuffer as buffers if encoding says so', function (t) {
  t.plan(2)

  var down = {
    iterator: function (options) {
      t.is(options.keyAsBuffer, true)
      t.is(options.valueAsBuffer, true)
    }
  }

  var db = encdown(down, {
    keyEncoding: {
      buffer: true
    },
    valueEncoding: {
      buffer: true
    }
  })

  db.iterator()
})

test('.keyAsBuffer and .valueAsBuffer as strings if encoding says so', function (t) {
  t.plan(2)

  var down = {
    iterator: function (options) {
      t.is(options.keyAsBuffer, false)
      t.is(options.valueAsBuffer, false)
    }
  }

  var db = encdown(down, {
    keyEncoding: {
      buffer: false
    },
    valueEncoding: {
      buffer: false
    }
  })

  db.iterator()
})

test('iterator options.keys and options.values default to true', function (t) {
  t.plan(2)

  var down = {
    iterator: function (options) {
      t.is(options.keys, true)
      t.is(options.values, true)
    }
  }

  encdown(down).iterator()
})

test('iterator skips keys if options.keys is false', function (t) {
  t.plan(4)

  var down = {
    iterator: function (options) {
      t.is(options.keys, false)

      return {
        next: function (callback) {
          callback(null, '', 'value')
        }
      }
    }
  }

  var keyEncoding = {
    decode: function (key) {
      t.fail('should not be called')
    }
  }

  var db = encdown(down, { keyEncoding: keyEncoding })
  var it = db.iterator({ keys: false })

  it.next(function (err, key, value) {
    t.ifError(err, 'no next error')
    t.is(key, undefined, 'normalized key to undefined')
    t.is(value, 'value', 'got value')
  })
})

test('iterator skips values if options.values is false', function (t) {
  t.plan(4)

  var down = {
    iterator: function (options) {
      t.is(options.values, false)

      return {
        next: function (callback) {
          callback(null, 'key', '')
        }
      }
    }
  }

  var valueEncoding = {
    decode: function (value) {
      t.fail('should not be called')
    }
  }

  var db = encdown(down, { valueEncoding: valueEncoding })
  var it = db.iterator({ values: false })

  it.next(function (err, key, value) {
    t.ifError(err, 'no next error')
    t.is(key, 'key', 'got key')
    t.is(value, undefined, 'normalized value to undefined')
  })
})

test('iterator does not strip nullish range options', function (t) {
  t.plan(12)

  encdown({
    iterator: function (options) {
      t.is(options.gt, null)
      t.is(options.gte, null)
      t.is(options.lt, null)
      t.is(options.lte, null)
    }
  }).iterator({
    gt: null,
    gte: null,
    lt: null,
    lte: null
  })

  encdown({
    iterator: function (options) {
      t.ok(options.hasOwnProperty('gt'))
      t.ok(options.hasOwnProperty('gte'))
      t.ok(options.hasOwnProperty('lt'))
      t.ok(options.hasOwnProperty('lte'))

      t.is(options.gt, undefined)
      t.is(options.gte, undefined)
      t.is(options.lt, undefined)
      t.is(options.lte, undefined)
    }
  }).iterator({
    gt: undefined,
    gte: undefined,
    lt: undefined,
    lte: undefined
  })
})

test('iterator does not add nullish range options', function (t) {
  t.plan(4)

  encdown({
    iterator: function (options) {
      t.notOk(options.hasOwnProperty('gt'))
      t.notOk(options.hasOwnProperty('gte'))
      t.notOk(options.hasOwnProperty('lt'))
      t.notOk(options.hasOwnProperty('lte'))
    }
  }).iterator({})
})

test('iterator forwards next() error from underlying iterator', function (t) {
  t.plan(1)

  var down = {
    iterator: function () {
      return {
        next: function (callback) {
          process.nextTick(callback, new Error('from underlying iterator'))
        }
      }
    }
  }

  var db = encdown(down)
  var it = db.iterator()

  it.next(function (err, key, value) {
    t.is(err.message, 'from underlying iterator')
  })
})

test('iterator forwards end() to underlying iterator', function (t) {
  t.plan(2)

  var down = {
    iterator: function () {
      return {
        end: function (callback) {
          t.pass('called')
          process.nextTick(callback)
        }
      }
    }
  }

  var db = encdown(down)
  var it = db.iterator()

  it.end(function () {
    t.pass('called')
  })
})

test('iterator catches decoding error from keyEncoding', function (t) {
  t.plan(5)

  var down = {
    iterator: function () {
      return {
        next: function (callback) {
          process.nextTick(callback, null, 'key', 'value')
        }
      }
    }
  }

  var db = encdown(down, {
    keyEncoding: {
      decode: function (key) {
        t.is(key, 'key')
        throw new Error('from codec')
      }
    }
  })

  db.iterator().next(function (err, key, value) {
    t.is(err.message, 'from codec')
    t.is(err.name, 'EncodingError')
    t.is(key, undefined)
    t.is(value, undefined)
  })
})

test('iterator catches decoding error from valueEncoding', function (t) {
  t.plan(5)

  var down = {
    iterator: function () {
      return {
        next: function (callback) {
          process.nextTick(callback, null, 'key', 'value')
        }
      }
    }
  }

  var db = encdown(down, {
    valueEncoding: {
      decode: function (value) {
        t.is(value, 'value')
        throw new Error('from codec')
      }
    }
  })

  db.iterator().next(function (err, key, value) {
    t.is(err.message, 'from codec')
    t.is(err.name, 'EncodingError')
    t.is(key, undefined)
    t.is(value, undefined)
  })
})

test('approximateSize() encodes start and end', function (t) {
  t.plan(2)

  var down = {
    approximateSize: function (start, end) {
      t.is(start, '1')
      t.is(end, '2')
    }
  }

  encdown(down).approximateSize(1, 2, noop)
})

test('encodes seek target', function (t) {
  t.plan(1)

  var db = encdown({
    iterator: function () {
      return {
        seek: function (target) {
          t.is(target, '123', 'encoded number')
        }
      }
    }
  }, { keyEncoding: 'json' })

  db.iterator().seek(123)
})

test('encodes seek target with custom encoding', function (t) {
  t.plan(1)

  var targets = []
  var db = encdown({
    iterator: function () {
      return {
        seek: function (target) {
          targets.push(target)
        }
      }
    }
  })

  db.iterator().seek('a')
  db.iterator({ keyEncoding: 'json' }).seek('a')

  t.same(targets, ['a', '"a"'], 'encoded targets')
})

test('encodes nullish seek target', function (t) {
  t.plan(1)

  var targets = []
  var db = encdown({
    iterator: function () {
      return {
        seek: function (target) {
          targets.push(target)
        }
      }
    }
  }, { keyEncoding: { encode: String } })

  // Unlike keys, nullish targets should not be rejected;
  // assume that the encoding gives these types meaning.
  db.iterator().seek(null)
  db.iterator().seek(undefined)

  t.same(targets, ['null', 'undefined'], 'encoded')
})
