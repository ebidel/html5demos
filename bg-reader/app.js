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
var BG_WIN_URL = 'background.html#0';
var BG_WIN_NAME = 'bgNotifier';

window.openBackgroundWindow = function() {
  window.open(BG_WIN_URL, BG_WIN_NAME, 'background');
};

window.closeBackgroundWindow = function() {
  var w = window.open(BG_WIN_URL, BG_WIN_NAME, 'background');
  w.close();
};

window.toggleBgContentUpdating = function(el) {
  if (el.checked) {
    window.openBackgroundWindow();
  } else {
    window.closeBackgroundWindow();
  }
  window.localStorage.setItem('updateSiteInBg', el.checked);
};

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
    }
  }
} else {
  document.getElementById('unsupported').className = '';
}

// Refreshes the page if a new manifest is available. Handles the case where user
// doesn't have app installed.
window.applicationCache.addEventListener('updateready', function(e) {
  if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
    window.location.reload();
  }
}, false);

var COL_WIDTH = 450;
var pages = document.getElementById('pages');
var leftArrow = document.querySelector('.nav.left');
var rightArrow = document.querySelector('.nav.right');
var leftPageNum = document.getElementById('leftPageNum');
var rightPageNum = document.getElementById('rightPageNum');
var audio = document.getElementsByTagName('audio')[0];

function flipPage(direction) {
  pages.classList.add('turning');

  if (direction < 0) {
    pages.scrollLeft -= COL_WIDTH;
  } else {
    pages.scrollLeft += COL_WIDTH;
  }

  var colNum = Math.floor(pages.scrollLeft / COL_WIDTH);
  leftPageNum.textContent = colNum >= 1 ? colNum + 1 : '';
  rightPageNum.textContent = colNum + 2;
}

function didTurn() {
  pages.classList.remove('turning');
  audio.load();
  //audio.volume = 0.75;
  audio.play();
}

leftArrow.addEventListener('mousedown', function(e) {
  e.preventDefault();
  flipPage(-1);
}, false);

rightArrow.addEventListener('mousedown', function(e) {
  e.preventDefault();
  flipPage(1);
}, false);

leftArrow.addEventListener('mouseup', didTurn, false);
rightArrow.addEventListener('mouseup', didTurn, false);

window.addEventListener('keydown', function(e) {
  if (e.keyCode == 32 || e.keyCode == 39) { // space OR right arrow
    e.preventDefault();
    flipPage(1);
  } else if (e.keyCode == 37) { // left arrow
    e.preventDefault();
    flipPage(-1);
  }
}, false);

window.addEventListener('keyup', function(e) {
  if ([32, 39, 37].indexOf(e.keyCode) != -1) { // space, left, or right arrow
    didTurn();
  }
}, false);

/*
// Use to load content dynamically.
function loadBook(url) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function(e) {
    if (this.status == 200) {
      pages.innerHTML = this.responseText;
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
}

loadBook('loremipsum.txt');
*/
})();
