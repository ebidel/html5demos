var USE_TRANSFERRABLE = true;
var SIZE = 1024 * 1024 * 32; // 32MB
var arrayBuffer = null;
var uInt8View = null;
var originalLength = null;


function setupArray() {
  arrayBuffer = new ArrayBuffer(SIZE);
  uInt8View = new Uint8Array(arrayBuffer);
  originalLength = uInt8View.length;

  for (var i = 0; i < originalLength; ++i) {
    uInt8View[i] = i;
  }

  log(source() + 'filled ' + toMB(originalLength) + ' MB buffer');
}

function time() {
  var now = new Date();
  var time = /(\d+:\d+:\d+)/.exec(now)[0] + ':';
  for (var ms = String(now.getMilliseconds()), i = ms.length - 3; i < 0; ++i) {
    time += '0';
  }
  return time + ms;
}

function source(s) {
  if (self.importScripts) {
    return '<span style="color:red;">worker:</span> ';
  } else {
    return '<span style="color:green;">thread:</span> ';
  }
}

function seconds(since) {
  return (new Date() - since) / 1000.0;
}

function toMB(bytes) {
  return Math.round(bytes / 1024 / 1024);
}