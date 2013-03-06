importScripts('shared.js');

var ready = false;

self.onmessage = function(e) {
  if (!ready) {
    initComplete();
    return;
  }

  // Presumably, this worker would create its own Uint8Array or alter the
  // ArrayBuffer (e.data) in some way. For this example, just send back the data
  // we were sent.
  var uInt8View = new Uint8Array(e.data);

  if (USE_TRANSFERRABLE) {
    self.postMessage(uInt8View.buffer, [uInt8View.buffer]);
  } else {
    self.postMessage(e.data);
  }
};

self.onerror = function(message) {
  log('worker error');
};

function log(msg) {
  var object = {
    type: 'debug',
    msg: source() + msg + ' [' + time() + ']'
  };
  self.postMessage(object);
}

function initComplete() {
  ready = true;
  log('READY!');
}

//setupArray();