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
    '<script src="' + TOOLKITCHEN_PATH + '/toolkit.min.js"></script>' +
    '<link rel="import" href="wc-documentation.html">');

  // document.addEventListener('WebComponentsReady', function(e) {
  //   document.querySelector('wc-documentation').config(CONFIG);
  // });

  // Only record for demo purposes.
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-22014378-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
}
