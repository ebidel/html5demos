window.URL = window.URL || window.webkitURL;

var WS_HOST = 'localhost:3000';
var ws = null;
var REFRESH_EVERY = 1000; // ms

function connect() {
  ws = new WebSocket('ws://' + WS_HOST, ['dumby-protocol']);
  ws.binaryType = 'blob';

  ws.onopen = function(e) {
    console.log('WebSocket connection OPEN');
  };

  ws.onclose = function(e) {
    console.log('WebSocket connection CLOSED');
  };

  ws.onerror = function(e) {
    console.log('WebSocket connection ERROR', e);
  };

  return ws;
}

function send() {
  setInterval(function() {
    if (ws.bufferedAmount == 0) {
      ws.send(screenshotPage());
    }
  }, REFRESH_EVERY);
}
