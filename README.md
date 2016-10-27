# Signaling

## Installation

```bash
npm install signaling-js --save
```

## Usage

```javascript
var signal = new signaling.Signal()
var context = {
  receiver: function () {
    console.log.apply(console, arguments)
  }
}
var disconnect = signal.connect(receiver, context)

signal.emit('any', 'arbitrary', 'argument') // outputs: any arbitrary argument
disconnect()
```
