var Signal = signaling.Signal

describe('Signal', function () {
  var signal
  var receiver
  var context
  var disconnect

  beforeEach(function () {
    signal = new Signal()
    receiver = sinon.spy(function () {})
    context = {}
  })

  it('should connect', function () {
    disconnect = signal.connect(receiver, context)
    var binding = signal.bindings['1']
    expect(binding.receiver).to.equal(receiver)
    expect(binding.context).to.equal(context)
    expect(disconnect).to.be.a.function
  })

  it('should emit', function () {
    signal.connect(receiver, context)
    signal.emit(0, 1, 2)
    expect(receiver.calledOnce).to.be.true
    expect(receiver.calledOn(context)).to.be.true
    expect(receiver.calledWithExactly(0, 1, 2)).to.be.true
  })

  it('should pipe', function () {
    var anotherSignal = new Signal()
    var spy = sinon.spy(anotherSignal, 'emit')
    signal.pipe(anotherSignal)
    signal.emit(0, 1, 2)
    expect(spy.calledOnce).to.be.true
    expect(spy.calledOn(anotherSignal)).to.be.true
    expect(spy.calledWithExactly(0, 1, 2)).to.be.true
  })

  it('should disconnect', function () {
    disconnect = signal.connect(receiver, context)
    disconnect()
    signal.emit()
    expect(receiver.notCalled).to.be.true
  })
})
