(function() {
  var HOST = 'localhost:8000';

  var s = document.createElement('script');
  s.type = 'text/javascript';
  s.defer = true;
  s.src = 'http://' + HOST + '/screencapture.js'

  var s2 = document.createElement('script');
  s2.type = 'text/javascript';
  s2.defer = true;
  s2.src = 'http://' + HOST + '/app.js'
  s2.onload = function(e) {
    connect();
    send();
  };

  var scripts = document.getElementsByTagName('script')[0];
  scripts.parentNode.insertBefore(s, scripts);
  scripts.parentNode.insertBefore(s2, scripts);
})();

/* Bookmarklet version. Create a bookmark and save this as its URL:
javascript:(function(){var b=document.createElement("script");b.type="text/javascript";b.defer=!0;b.src="http://localhost:8000/screencapture.js";var a=document.createElement("script");a.type="text/javascript";a.defer=!0;a.src="http://localhost:8000/app.js";a.onload=function(){connect();send()};var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c);c.parentNode.insertBefore(a,c)})();
*/