(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return (root.signaling = factory())
    })
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory()
  } else {
    root.signaling = factory()
  }
}(this, function () {
  'use strict'

  var exports = {}

  function createId () {
    var lastId = this._lastId || 0
    this._lastId = lastId + 1
    return this._lastId
  }

  function Binding (receiver, context) {
    this.id = createId.call(Binding)
    this.receiver = receiver
    this.context = context
  }

  function Signal () {
    this.bindings = {}
  }

  Signal.prototype.connect = function (receiver, context) {
    var bindings = this.bindings
    var binding = new Binding(receiver, context)
    var id = binding.id
    bindings[id] = binding
    return function () {
      delete bindings[id]
    }
  }

  Signal.prototype.pipe = function (signal) {
    return this.connect(signal.emit, signal)
  }

  Signal.prototype.emit = function () {
    var bindings = this.bindings
    var binding

    for (var bindingId in bindings) {
      binding = bindings[bindingId]
      binding.receiver.apply(binding.context, arguments)
    }
  }

  exports.Signal = Signal

  return exports
}))
