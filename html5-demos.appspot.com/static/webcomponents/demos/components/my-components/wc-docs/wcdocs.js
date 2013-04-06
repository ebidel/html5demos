// Show docs if we're not loaded directly as a component.
// TODO: this === window no longer works with the polyfill. find better check
// that doesn't rely on Toolkit.
if (!!!window.Toolkit) { //if (this === window) {
  var TOOLKITCHEN_PATH = '/static/libs/toolkit';
  // var CONFIG = {
  //   name: "wc-documentation",
  //   version: "0.0.1",
  //   github: "github.com/toolkitchen/toolkit",
  //   home: "toolkitchen.github.com"
  // }

  document.write(
    '<script src="' + TOOLKITCHEN_PATH + '/platform/platform.js"></script>' +
    '<script src="' + TOOLKITCHEN_PATH + '/toolkit.js"></script>' +
    '<link rel="import" href="wc-documentation.html">');

  // document.addEventListener('WebComponentsReady', function(e) {
  //   document.querySelector('wc-documentation').config(CONFIG);
  // });
}
