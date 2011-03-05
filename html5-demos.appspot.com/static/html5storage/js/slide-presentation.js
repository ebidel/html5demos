/**
 * Copyright 2010 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Original HTML5 slides:
 *   Marcin Wichary (mwichary)
 *
 * Modifications:
 *   Ernest Delgado (ernestd)
 *   Alex Russell (slightlyoff)
 *   Arne Roomann-Kurrik (kurrik)
 * Eric Bidelman (ericbidelman)
 */
var Util = function() {
  this.ctr_ = 0;
  this.spaces_ = /\s+/;
  this.a1_ = [''];

  this.ua = navigator.userAgent;
  this.isFF = parseFloat(this.ua.split("Firefox/")[1]) || undefined;
  this.isWK = parseFloat(this.ua.split("WebKit/")[1]) || undefined;
  this.isOpera = parseFloat(this.ua.split("Opera/")[1]) || undefined;
}

Util.prototype = {
  toArray: function(list) {
    return Array.prototype.slice.call(list || [], 0);
  },

  byId: function(id) {
    if (typeof id == "string") { return document.getElementById(id); }
    return id;
  },

  query: function(query, root) {
    if (!query) { return []; }
    if (typeof query != "string") { return this.toArray(query); }
    if (typeof root == "string"){
      root = this.byId(root);
      if(!root){ return []; }
    }

    root = root||document;
    var rootIsDoc = (root.nodeType == 9);
    var doc = rootIsDoc ? root : (root.ownerDocument||document);

    // rewrite the query to be ID rooted
    if (!rootIsDoc || (">~+".indexOf(query.charAt(0)) >= 0)) {
      root.id = root.id||("qUnique"+(this.ctr_++));
      query = "#"+root.id+" "+query;
    }
    // don't choke on something like ".yada.yada >"
    if (">~+".indexOf(query.slice(-1)) >= 0) {
      query += " *";
    }

    return this.toArray(doc.querySelectorAll(query));
  },

  strToArray: function(s) {
    if (typeof s == "string" || s instanceof String) {
      if (s.indexOf(" ") < 0) {
        this.a1_[0] = s;
        return this.a1_;
      } else {
        return s.split(this.spaces_);
      }
    }
    return s;
  },

  // TODO(ericbidelman): Most browsers support Strim.trim(). iPad does not.
  trim: function(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  },

  // TODO:(ericbidelman): Use Element.classList.add() instead.
  addClass: function(node, classStr) {
    classStr = this.strToArray(classStr);
    var cls = " " + node.className + " ";
    for (var i = 0, len = classStr.length, c; i < len; ++i) {
      c = classStr[i];
      if (c && cls.indexOf(" " + c + " ") < 0) {
        cls += c + " ";
      }
    }
    node.className = this.trim(cls);
  },

  // TODO:(ericbidelman): Use Element.classList.remove() instead.
  removeClass: function(node, classStr) {
    var cls;
    if (classStr !== undefined) {
      classStr = this.strToArray(classStr);
      cls = " " + node.className + " ";
      for (var i = 0, len = classStr.length; i < len; ++i) {
        cls = cls.replace(" " + classStr[i] + " ", " ");
      }
      cls = this.trim(cls);
    } else {
      cls = "";
    }
    if (node.className != cls) {
      node.className = cls;
    }
  },

  // TODO:(ericbidelman): Use Element.classList.toggle() instead.
  toggleClass: function(node, classStr) {
    var cls = " " + node.className + " ";
    if (cls.indexOf(" " + this.trim(classStr) + " ") >= 0) {
      this.removeClass(node, classStr);
    } else {
      this.addClass(node, classStr);
    }
  }
};

var util = new Util();



(function() {
  // bail in IE
  var doc = document;
  if (doc.all) { return; }

  var disableBuilds = false;
  var disableCodeHighlights = false;
  var disableNotes = false;
  var disableCustomLoadEvents= false;

  var canTransition = (function() {
    var ver = parseFloat(util.ua.split("Version/")[1]) || undefined;
    // test to determine if this browser can handle CSS transitions.
    var cachedCanTransition = 
      (util.isWK || (util.isFF && util.isFF > 3.6 ) || (util.isOpera && ver >= 10.5));
    return function() { return cachedCanTransition; }
  })();

  util.addClass(document.body, (util.isWK ? "composited" : "generic"));

  //
  // Slide class
  //
  var Slide = function(node, idx, slides) {
    this._node = node;
    if (idx >= 0) {
      this._count = idx+1;
    }
    if (this._node) {
      util.addClass(this._node, "slide far-far-future");
    }
    this._makeCustomType();
    this._makeCounter(slides);
    this._makeBuildList();
  };

  Slide.prototype = {
    _node: null,
    _count: 0,
    _buildList: [],
    _visited: false,
    _currentState: "",
    _states: ['far-far-past', 'far-past', 'past', 'current', 'future',
              'far-future', 'far-far-future'],
    setState: function(state) {
      if (typeof state != "string") {
        state = this._states[state];
      }
      if (state == "current" && !this._visited) {
        this._visited = true;
        this._makeBuildList();
      } else if (state == 'current') {
        if (!disableCodeHighlights) {
          // Restore full opacity on code snippets for this current slide.
          var pres = this._node.querySelectorAll('pre');
          for (var i = 0, pre; pre = pres[i]; ++i) {
            util.removeClass(pre, 'highlight');
          }
        }
      }
      util.removeClass(this._node, this._states);
      util.addClass(this._node, state);
      this._currentState = state;

      // Delay first auto run. Really wish this were in CSS.
      var _t = this;
      setTimeout(function(){ _t._runAutos(); } , 400);

      // Run slide custom onload/unload events.
      if (!disableCustomLoadEvents) {
        if (state == 'current') {
          this._onLoad();
        } else {
          this._onUnload();
        }
      }
    },

    _onLoad: function() {
      this._fireEvent('onload');
      this._showFrames();
    },

    _onUnload: function() {
      this._fireEvent('onunload');
      this._hideFrames();
    },

    _fireEvent: function(name) {
      var eventSrc = this._node.getAttribute(name);
      if (eventSrc) {
        eventSrc = '(function() { ' + eventSrc + ' })';
        var fn = eval(eventSrc);
        fn.call(this._node);
      }
    },

    _showFrames: function() {
      var frames = util.query('iframe', this._node);
      function show() {
        frames.forEach(function(el) {
          var _src = el.getAttribute('data-src');
          if (_src && _src.length) {
            el.src = _src;
          }
        });
      }
      setTimeout(show, 0);
    },

    _hideFrames: function() {
      var frames = util.query('iframe', this._node);
      function hide() {
        frames.forEach(function(el) {
          var _src = el.getAttribute('data-src');
          if (_src && _src.length) {
            el.src = '';
          }
        });
      }
      setTimeout(hide, 250);
    },

    _makeCustomType: function() {
      var img = this._node.getAttribute("data-image");
      if (img) {
        this._node.style.background = "url(" + img + ") center no-repeat";
      }
    },

    _makeCounter: function(slides) {
      if(!this._count || !this._node) { return; }
      var c = doc.createElement("span");
      c.innerHTML = this._count + " / " + slides.length;
      c.className = "counter";
      this._node.appendChild(c);
    },

    _makeBuildList: function() {
      this._buildList = [];
      if (disableBuilds) { return; }
      if (this._node) {
        this._buildList = util.query("[data-build] > *", this._node);
      }
      this._buildList.forEach(function(el) {
        util.addClass(el, "to-build");
      });
    },

    _runAutos: function() {
      if (this._currentState != "current") {
        return;
      }
      // find the next auto, slice it out of the list, and run it
      var idx = -1;

      this._buildList.some(function(n, i) {
        if (n.hasAttribute("data-auto")) {
          idx = i;
          return true;
        }
        return false;
      });

      if (idx >= 0) {
        var elem = this._buildList.splice(idx, 1)[0];
        var transitionEnd = util.isWK ? "webkitTransitionEnd" : (util.isFF ? "mozTransitionEnd" : "oTransitionEnd");
        var _t = this;
        if (canTransition()) {
          var l = function(evt) {
            elem.parentNode.removeEventListener(transitionEnd, l, false);
            _t._runAutos();
          };
          elem.parentNode.addEventListener(transitionEnd, l, false);
          util.removeClass(elem, "to-build");
        } else {
          setTimeout(function() {
            util.removeClass(elem, "to-build");
            _t._runAutos();
          }, 400);
        }
      }
    },

    buildNext: function() {
      if (!this._buildList.length) {
        return false;
      }
      util.removeClass(this._buildList.shift(), "to-build");
      return true;
    },

  };

  //
  // SlideShow class
  //
  var SlideShow = function(slides) {
    this._slides = (slides||[]).map(function(el, idx, arr) {
      return new Slide(el, idx, arr);
    });

    var h = window.location.hash;
    try {
      this.current = parseInt(h.split('#slide')[1], 10);
    } catch (e) { /* squelch */ }
    this.current = isNaN(this.current) ? 1 : this.current;
    var _t = this;
    doc.addEventListener('keydown', 
        function(e) { _t.handleKeys(e); }, false);
    doc.addEventListener('mousewheel', 
        function(e) { _t.handleWheel(e); }, false);
    doc.addEventListener('DOMMouseScroll', 
        function(e) { _t.handleWheel(e); }, false);
    doc.addEventListener('touchstart', 
        function(e) { _t.handleTouchStart(e); }, false);
    doc.addEventListener('touchend', 
        function(e) { _t.handleTouchEnd(e); }, false);
    window.addEventListener('popstate', 
        function(e) { if (e.state) { _t.go(e.state); } }, false);
    this._update(); 
  };

  SlideShow.prototype = {
    _presentationCounter: util.query('.presentationCounter')[0],
    _slides: [],
    _update: function(dontPush) {
      if (history.pushState) {
        if (!dontPush) {
          history.pushState(this.current, "Slide " + this.current, "#slide" + this.current);
        }
      } else {
        window.location.hash = "slide" + this.current;
      }
      for (var x = this.current-1; x < this.current+7; x++) {
        if (this._slides[x-4]) {
          this._slides[x-4].setState(Math.max(0, x-this.current));
        }
      }
      this._presentationCounter.textContent = this.current;
    },

    current: 0,
    next: function() {
      if (!this._slides[this.current-1].buildNext()) {
        this.current = Math.min(this.current+1, this._slides.length);
        this._update();
      }
    },
    prev: function() {
      this.current = Math.max(this.current-1, 1);
      this._update();
    },
    go: function(num) {
      if (history.pushState && this.current != num) {
        history.replaceState(this.current, "Slide " + this.current, "#slide" + this.current);
      }
      this.current = num;
      this._update(true);
    },

    _notesOn: false,
    showNotes: function() {
      if (disableNotes) { return; }

      if (document.body.className.indexOf('with-notes') == -1) {
        util.addClass(document.body, 'with-notes');
      } else {
        util.removeClass(document.body, 'with-notes');
      }
    },
    highlightImportantCode: function() {
      if (disableCodeHighlights) { return; }
      util.query('.current pre').forEach(function(pre) {
        util.toggleClass(pre, 'highlight');
      });
    },
    switch3D: function() {
      util.toggleClass(document.body, "three-d");
    },
    handleWheel: function(e) {
      if (/^(iframe)$/i.test(e.target.nodeName)) {
        return;
      }

      var delta = 0;
      if (e.wheelDelta) {
        delta = e.wheelDelta/120;
        if (util.isOpera) {
          delta = -delta; 
        }
      } else if (e.detail) { 
        delta = -e.detail/3;
      }

      if (delta > 0 ) {
        this.prev();
        return;
      }
      if (delta < 0 ) {
        this.next();
        return;
      }
    },
    handleKeys: function(e) {
      if (/^(input|textarea)$/i.test(e.target.nodeName) ||
          e.target.isContentEditable) {
        return;
      }
      /*
      var activeElement = document.activeElement;
      if (activeElement.tagName == 'INPUT' || activeElement.tagName == 'TEXTAREA' ||
          document.activeElement.contentEditable == 'true') {
        return;
      }*/
      switch (e.keyCode) {
        case 37: // left arrow
          this.prev();
          break;
        case 39: // right arrow
        case 32: // space
          this.next();
          break;
        case 78: // N
          this.showNotes();
          break;
        case 51: // 3
          this.switch3D();
          break;
        case 72: // H
          this.highlightImportantCode();
          break;
      }
    },
    _touchStartX: 0,
    handleTouchStart: function(e) {
      this._touchStartX = e.touches[0].pageX;
    },
    handleTouchEnd: function(e) {
      var delta = this._touchStartX - e.changedTouches[0].pageX;
      var SWIPE_SIZE = 150;
      if (delta > SWIPE_SIZE) {
        this.next();
      } else if (delta< -SWIPE_SIZE) {
        this.prev();
      }
    },
  };

  // Initialize
  var slideshow = new SlideShow(util.query(".slide"));
  util.query('.slides')[0].style.display = 'block';

  if (disableCustomLoadEvents) {
    util.query('iframe').forEach(function(el) {
      el.src = el.getAttribute('data-src');
    });
  }

  util.query('pre').forEach(function(el) {
    util.addClass(el, 'prettyprint');
  });
  prettyPrint();
})();
