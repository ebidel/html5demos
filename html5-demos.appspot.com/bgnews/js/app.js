/*Copyright 2011 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Author: Eric Bidelman (ericbidelman@chromium.org)
*/
const BG_WIN_URL = 'background.html#0';
const BG_WIN_NAME = 'bgNotifier';

function initSettingsPanel() {
  /*var feedNames = [];
  var feeds = document.querySelectorAll('.feed');

  for (var i = 0, feed; feed = feeds[i]; ++i) {
    feedNames.push(feed.dataset('table'));
  }*/

  var html = [];
  for (var table in news.FEEDS) {
    var id = 'feed-name-' + table;
    html.push('<li><input type="checkbox" id="', id,
              '" checked disabled onchange="toggleFeedVisibility(\'', id,
              '\')"> <label for="feed-name-', table, '">',
              news.FEEDS[table].replace('http://', ''), '</label></li>');
  }
  document.querySelector('#feed-list').innerHTML =  '<ul>' + html.join('') + '</ul>';

  var refreshRate = window.localStorage.getItem('refreshRate');
  if (!refreshRate) {
    refreshRate = 30;
    window.localStorage.setItem('refreshRate', refreshRate);
  }
  document.querySelector('#refresh-rate').value =  window.localStorage.getItem('refreshRate');
  document.querySelector('#num-feeds').textContent = news.NUM_FEEDS;
}

function onArticleOpen(el) {
  var isShowing = el.classList.contains('on');

  // Hide article if one is showing.
  var active = document.querySelector('.feed .on');
  if (active) {
    active.classList.remove('on');
  }

  if (!isShowing) {
    el.classList.add('on');
    el.classList.add('read');

    news.updateReadState($(el).closest('.feed').data('table'), el.dataset['id']);

    // Insert content iframe if it's not already present.
    if (!el.querySelector('iframe')) {
      var table = el.parentNode.parentNode.dataset['table'];
      var id = el.dataset['id'];

      news.db.readTransaction(function(tx) {
        tx.executeSql('SELECT content FROM ' + table + ' WHERE id=' + id, [],
          function(tx, r) {
            var iframe = [
              '<iframe src="data:text/html,',
              encodeURIComponent(r.rows.item(0).content), '"></iframe>'
              ].join('');

            el.querySelector('.snippet').insertAdjacentHTML('beforeEnd', iframe);

          }, news.onError);
      });
    }
  }

}

function onScroll(e) {
  var overlays = document.querySelectorAll('.overlay');
  for (var i = 0, overlay; overlay = overlays[i]; ++i) {
    overlay.style.visibility = 'visible'; // Prevent flicker at page load.
    overlay.classList.add('show');
  }
  window.removeEventListener('scroll', onScroll, false);
}

window.openBackgroundWindow = function() {
  window.bgWindow = window.open(BG_WIN_URL, BG_WIN_NAME, 'background');
};

window.closeBackgroundWindow = function() {
  var w = window.open(BG_WIN_URL, BG_WIN_NAME, 'background');
  w.close();
};

window.toggleBgContentUpdating = function(el) {
  if (el.checked) {
    window.openBackgroundWindow();
    $('#refresh-rate-container').show();
  } else {
    window.closeBackgroundWindow();
    $('#refresh-rate-container').hide();
  }
  window.localStorage.setItem('updateSiteInBg', el.checked);
};

function toggleHelp() {
  document.querySelector('.help').classList.toggle('hidden');
  document.body.classList.toggle('dim');
  window.focus();
}

function toggleFeedVisibility(id) {
  document.querySelector('#' + id).classList.toggle('hidden');
}

window.addEventListener('scroll', onScroll, false);

window.addEventListener('keydown', function(e) {

  if ([27, 32, 72, 74, 75, 66, 84, 85].indexOf(e.keyCode) != -1) {

    e.preventDefault();
    e.stopPropagation();

    switch (e.keyCode) {
      case 27: // ESC
        // First hide help shadow box. Second esc hides any open articles.
        document.querySelector('.help').classList.add('hidden');
        if (document.body.classList.contains('dim')) {
          document.body.classList.remove('dim');
        } else {
          $('.feed li.on').click();
        }
        return;
        break;
      case 32: // space
        var li = $('.feed li:not(.read):first');
        break;
      case 72: // h
        toggleHelp();
        return;
        break;
      case 74: // j
        var li = $('.feed li.on').next('li');
        break;
      case 75: // k
        var li = $('.feed li.on').prev('li');
        break;
      case 66: // b
        var li = $('.feed li:last');
        break;
      case 84: // t
      case 85: // u
        var li = $('.feed li:first');
        break;
    }

    if (li.length && !document.body.classList.contains('dim')) {
      li.click();
      news.updateReadState(li.closest('.feed').data('table'), li.data('id'));
    }
  }

}, false);

// Refreshes the page if a new manifest is available. Handles the case where
// user doesn't have app installed.
window.applicationCache.addEventListener('updateready', function(e) {
  if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
    if(confirm('A new version of this app is available. Load it?')) {
      window.location.reload();
    }
  }
}, false);

document.querySelector('#feeds').addEventListener('webkitTransitionEnd', function(e) {
  if (e.propertyName == 'height' && e.target.nodeName == 'LI' &&
      e.target.classList.contains('on')) {
    $.scrollTo($(e.target), 800, {offset: {top:-40, left:0}});
    //currentArticle.table = $(e.target).closest('.feed').data('table');
  }
}, false);

document.querySelector('#refresh-rate').addEventListener('change', function(e) {
  this.value = this.value || 30;

  var MIN_POLL = 3;
  if (this.value < MIN_POLL) {
    if (!confirm('Refreshing articles more than once every ' + MIN_POLL +
                 ' minutes is not adviced.')) {
      this.value = window.localStorage.getItem('refreshRate');
      return;
    }
  }

  window.localStorage.setItem('refreshRate', this.value);
  if (window.bgWindow) {
    window.bgWindow.setupPolling();
  }
}, false);


(function() {
// Check for support
if (window.chrome && window.chrome.app && window.chrome.app.isInstalled) {
  var CHROME_VERSION = parseFloat(navigator.userAgent.split('Chrome')[1].split(' ')[0].substring(1));
  var MIN_CHROME_VER = 10;
  if (CHROME_VERSION >= MIN_CHROME_VER) {
    document.getElementById('supported').className = '';

    var updateSiteInBg = JSON.parse(window.localStorage.getItem('updateSiteInBg'));
    if (updateSiteInBg == undefined) {
      updateSiteInBg = true;
    }
    document.getElementById('update-checkbox').checked = updateSiteInBg;
    if (updateSiteInBg) {
      window.openBackgroundWindow();
      $('#refresh-rate-container').show();
    }
  }
} else {
  document.getElementById('unsupported').className = '';
}

news.init();
initSettingsPanel();
})();
