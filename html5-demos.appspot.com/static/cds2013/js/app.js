(function() {

var rafId = null;
var PREFIXES = {
  'webkit': 'WebKit',
  'moz': 'Moz',
  'ms': 'MS',
  'o': 'O'
};

var transEndEventNames = {
  'WebkitTransition': 'webkitTransitionEnd',
  'MozTransition': 'transitionend',
  'OTransition': 'oTransitionEnd',
  'msTransition': 'MSTransitionEnd',
  'transition': 'transitionend'
};

window.requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame || window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame;

window.cancelAnimationFrame = window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame ||
    window.msCancelAnimationFrame || window.oCancelAnimationFrame;

// Find the correct transitionEnd vendor prefix.
window.transEndEventName = transEndEventNames[Modernizr.prefixed('transition')];

window.$ = function(selector, opt_scope) {
  var scope = opt_scope || document;
  return scope.querySelector(selector);
};

window.$$ = function(selector, opt_scope) {
  var scope = opt_scope || document;
  return Array.prototype.slice.call(scope.querySelectorAll(selector) || []);
};

HTMLElement.prototype.$ = function(selector) {
  return $(selector, this);
};

HTMLElement.prototype.$$ = function(selector) {
console.log($, $$)
  return $$(selector, this);
};

HTMLElement.prototype.listen = HTMLElement.prototype.addEventListener;
document.listen = document.addEventListener;

// If DOM is ready, run our setup. Otherwise wait for it to finish.
if (document.readyState === 'complete') {
  initContent();
} else {
  document.listen('readystatechange', function() {
    if (document.readyState === 'complete') {
      initContent();
    }
  });
}


function addVendorPrefixes() {
  $$('[data-tooltip-property]').forEach(function(tip, i) {
    var property  = tip.dataset.tooltipProperty;

    var support = Object.keys(PREFIXES); // Default to all prefixes if support array is missing.
    var includeUnprefixedVersion = false;
    if (tip.dataset.tooltipSupport) {
      support = JSON.parse(tip.dataset.tooltipSupport);
      // A 'unprefix' in the array indicates not to include unprefixed property.
      var idx = support.indexOf('unprefixed');
      if (idx != -1) {
        includeUnprefixedVersion = true;
        support.splice(idx, 1);
      }
    }

    var str = ['/* Requires vendor prefixes. */'];

    if ('tooltipJs' in tip.dataset) {
      tip.href = 'http://caniuse.com/#search=' + property;

      support.forEach(function(prefix, i) {
        // Capitalized Properties should remain so, unless explicitly called out.
        if (property[0] == property[0].toUpperCase() &&
            !('tooltipLowercase' in tip.dataset)) {
          var val = PREFIXES[prefix] + property;
        } else {
          var upperCasedProperty = property[0].toUpperCase() + property.substring(1);
          var val = prefix + upperCasedProperty;
        }
        if (!('tooltipJsProperty' in tip.dataset)) {
          val += '(...);';
        }
        str.push(val);
      });

      if (includeUnprefixedVersion) {
        str.push(property + '(...);');
      }

    } else {
      tip.href = 'http://sass-lang.com/docs/yardoc/file.SASS_REFERENCE.html#including_a_mixin';

      support.forEach(function(prefix, i) {
        str.push('-' + prefix + '-' + property);// + ': ...');

      });
      
      str.push(property);// + ': ...'); // Include unprefixed property by default for CSS.
    }

    tip.dataset.tooltip = str.join('\n');
    tip.role = 'tooltip';
    tip.innerHTML = '<span class="property">' +
                    //(!('tooltipJs' in tip.dataset) ? '+' : '') + property +
                    property +
                    '</span>';
    tip.dataset.tooltipActive = '';
  });
}

function fetchAndInjectSamples() {

  var pres = $$('pre[data-url]');

  pres.forEach(function(pre, i) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', pre.dataset.url);

    xhr.onloadend = function(e) {
      if (e.target.status == 200) {
        pre.textContent = e.target.response + pre.textContent;
        if (i == pres.length - 1) {
          prettyPrint();
        }
      }
    };

    xhr.send();
  });
}

function setupSnippetDemos() {

  var pres = $$('pre[data-run-demo]');

  pres.forEach(function(pre, i) {
    var a = document.createElement('a');
    a.href = pre.dataset.runDemo;
    //a.textContent = 'RUN DEMO';
    a.classList.add('snippet-demo');
    pre.appendChild(a);
  });
}


// DOM Ready business.
function initContent(e) {
  var currentSlide = slidedeck.slides[slidedeck.curSlide_];
  if (currentSlide.classList.contains('nobackdrop')) {
    document.body.classList.add('nobackdrop');
  }
  if (currentSlide.dataset.bodyClass) {
    document.body.classList.add(currentSlide.dataset.bodyClass);
  }

  slidedeck.container.listen('slideenter', function(e) {
    var slide = e.target;
    if (slide.classList.contains('nobackdrop')) {
      document.body.classList.add('nobackdrop');
    } 
    if (slide.dataset.bodyClass) {
      document.body.classList.add(slide.dataset.bodyClass);
    }

  });

  slidedeck.container.listen('slideleave', function(e) {
    var slide = e.target;
    if (slide.classList.contains('nobackdrop')) {
      document.body.classList.remove('nobackdrop');
    }
    if (slide.dataset.bodyClass) {
      document.body.classList.remove(slide.dataset.bodyClass);
    }

    // // Reset polyfill support on browser support slides.
    // if (slide.classList.contains('browser-support')) {
    //   slide.$('h3').innerHTML = 'browser support';
    //   slide.$('.browser-support-row').classList.remove('polyfill-status');
    // }
  });

  // // When browser support slide is clicked, show polyfill information.
  // slidedeck.container.listen('click', function(e) {
  //   // Ignore clicks on links.
  //   if (e.target.tagName == 'A') {
  //     return;
  //   }
  //   var currentSlide = slidedeck.slides[slidedeck.curSlide_];
  //   if (currentSlide.classList.contains('browser-support')) {
  //     var browsSupportRow = currentSlide.$('.browser-support-row');
  //     if (browsSupportRow.classList.contains('polyfill-status')) {
  //       currentSlide.$('h3').innerHTML = 'browser support';
  //       browsSupportRow.classList.remove('polyfill-status');
  //     } else {
  //       currentSlide.$('h3').innerHTML = '<a href="https://github.com/polymer/platform">polyfill</a> support';
  //       browsSupportRow.classList.add('polyfill-status');
  //     }
  //   }
  // });

  document.listen('keydown', function(e) {
    switch (e.keyCode) {
      case 80: // P
        document.body.classList.toggle('with-devtools');
        break;
      default:
        break;
    }
  }, false);

  // Writing in markdown leaves off the .prettyprint class. Find those that
  // don't have the class and get em colored.
  $$('pre:not(.prettyprint)').forEach(function(pre, i) {
    pre.classList.add('prettyprint');
  });

  fetchAndInjectSamples(); // pulls custom element samples files into pre tags.

  addVendorPrefixes(); // adds vendor prefix tooltips

  setupSnippetDemos();

  prettyPrint();

  initDemos();
}

})();


// Inline slide examples -------------------------------------------------------

function initDemos() {

  // var pres = $$('pre[data-code-cycle]');

  // pres.forEach(function(pre, i) {
  //   var a = document.createElement('a');
  //   a.href = '';
  //   a.classList.add('code-cycler');
  //   pre.appendChild(a);
  // });

  function initCodeSnippetCycler(slide) {
    var pre = slide.querySelector('[data-code-cycle]');
    pre.innerHTML = encodeHTMLEntities(slide.querySelector('textarea[selected]').value);

    var textareas = slide.querySelectorAll('textarea');
    pre.dataset.lang = '1/' + textareas.length;

    prettyPrint();

    pre.listen('click', function(e) {
      if (!e.metaKey) {
        cycleToCodeSnippet(slide, textareas, e.shiftKey);
      }
    });
  }

  function cycleToCodeSnippet(slide, textareas, backwards) {
    var selectedTextarea = slide.querySelector('textarea[selected]');

    var idx = -1;
    [].forEach.call(textareas, function(textarea, i) {
      textarea.removeAttribute('selected');
      if (textarea == selectedTextarea) {
        idx = i;
      }
    });

    idx += (backwards ? -1 : 1);
    idx %= textareas.length;
    if (idx < 0) {
      idx = textareas.length - 1;
    }
    textareas[idx].setAttribute('selected', '');

    var pre = slide.querySelector('[data-code-cycle]');
    pre.innerHTML = encodeHTMLEntities(textareas[idx].value);

    pre.dataset.lang = (idx + 1) + '/' + textareas.length;

    prettyPrint();
  }

(function() {
  var slide = $('#polymeroneliner');
  
  slide.listen('click', function(e) {
    this.classList.toggle('active');
  });

  slide.listen('slideleave', function(e) {
    this.classList.remove('active');
  });
})();


(function() {
  var slide = $('#hangoutsexample');
  var output = slide.$('.example');
  var count = 0;

  // slide.querySelector('.snippet-demo').listen('click', function(e) {
  //   e.preventDefault();
  // });

  slide.querySelector('button').addEventListener('click', function(e) {

    if (count) {
      var hangout = document.createElement('hangout-module');
      hangout.from = 'Larry Page';
      hangout.profile = '118075919496626375791';

      hangout.messages = [{
        profile: '106189723444098348646',
        datetime: new Date().toISOString(),
        isother: true,
        msg: ['Hola']
      }];

      output.appendChild(hangout);
    } else {
      var hangout = document.createElement('hangout-module');
      hangout.from = 'Paul Irish';
      hangout.profile = '118075919496626375791';

      hangout.messages = [{
        profile: '113127438179392830442',
        datetime: '2013-06-24T12:02',
        isother: true,
        msg: ["Feelin' this Web Components thing.", 'Heard anything about it?']
      }, {
        profile: '118075919496626375791',
        datetime: '2013-06-24T12:03',
        msg: ['Totes amazing']
      }, {
        profile: '118075919496626375791',
        datetime: '2013-06-24T12:05',
        msg: ['Have you tried Polymer yet?']
      }, {
        profile: '113127438179392830442',
        datetime: '2013-06-24T12:06',
        isother: true,
        msg: ['Naw Bro', "I'll give it a spin"]
      }];

      output.appendChild(hangout);
    }

    count++;
  
  });

})();

(function() {
  var demo = $('#polymer-ajax-demo');
  var output = demo.querySelector('output');

  demo.querySelector('.snippet-demo').listen('click', function(e) {
    e.preventDefault();

    output.innerHTML = '';

    var ajax = document.createElement('polymer-ajax');
    ajax.url = 'http://gdata.youtube.com/feeds/api/videos/';
    ajax.params = {
      alt: 'json',
      q: 'chrome'
    };
    ajax.handleAs = 'json';
    ajax.addEventListener('polymer-response', function(e) {
      var entries = e.target.response.feed.entry;
      entries.forEach(function(entry) {
        output.innerHTML += '<li>' + entry.title.$t + '</li>';
      });
    });
    ajax.go();
  });
})();

(function() {
  var demo = $('#polymer-file-demo');
  var output = demo.querySelector('output');

  demo.querySelector('.snippet-demo').listen('click', function(e) {
    e.preventDefault();

    output.innerHTML = '';

    var file = document.createElement('polymer-file');
    file.auto = true;
    file.readas = 'dataurl';
    file.blob = new Blob(['abc'], {type: 'text/plain'});
    file.addEventListener('polymer-result', function(e) {
      output.innerHTML = this.result.link(this.result);
    });
  });
})();

(function() {
  var demo = $('#polymer-flex-demo');
  var output = demo.querySelector('output');

  var flexLayout = output.querySelector('polymer-flex-layout');
  var flexDiv = flexLayout.querySelector('div[flex]');

  flexLayout.listen('click', function(e) {
    var div = document.createElement('div');
    div.textContent = 'new div!';
    this.appendChild(div);
  });

  demo.querySelector('[data-action="vertical"]').listen('click', function(e) {
    flexLayout.vertical = !flexLayout.vertical;
    e.target.classList.toggle('inactive');
  });

  demo.querySelector('[data-action="flex"]').listen('click', function(e) {
    var flexing = flexDiv.getAttribute('flex') != undefined;
    if (flexing) {
      flexDiv.removeAttribute('flex');
    } else {
      flexDiv.setAttribute('flex');
    }
    e.target.classList.toggle('inactive');
  });

})();

(function() {
  var slide = $('#more-complex-elements');
  initCodeSnippetCycler(slide);
})();

(function() {
  var slide = $('#published-properties');
  initCodeSnippetCycler(slide);
})();

(function() {
  var slides = $$('slide.googlecomtoday');

  var onTransEnd_ = function(e) {
    if (!this.classList.contains('current')) {
      return;
    }
    if (e.propertyName == '-webkit-transform' ||
        e.propertyName == '-moz-transform' ||
        e.propertyName == '-ms-transform' ||
        e.propertyName == 'transform') {
      slidedeck.nextSlide();
      this.classList.remove('active');
    }
  };

  slides.forEach(function(slide, i) {
    slide.listen('click', function() {
      this.classList.add('active');
    });

    slide.listen(transEndEventName, onTransEnd_.bind(slide));
  });

})();

(function() {
  var slide = $('#title-slide');
  var video = slide.$('video');
  var audio = slide.$('audio');

  var PLAYBACKRATE = 2;

  video.listen('ended', function(e) {
    video.load(); // video.currentTime = 0; doesn't work.
    video.playbackRate = PLAYBACKRATE; // screenflow captured at 30fps. get us to 60.
    video.play();
  });

  slide.listen('slideenter', function(e) {
    if (video.currentTime >= video.duration) {
      video.load();
    }
    video.playbackRate = PLAYBACKRATE;
    video.play();
    audio.play();
  });

  slide.listen('slideleave', function() {
    video.pause();
    audio.pause();
  });

  // If this slide is current on pageload, start playing video.
  if (slidedeck.slides[slidedeck.curSlide_] == slide) {
    video.playbackRate = PLAYBACKRATE;
    video.play();
    audio.play();
  }
})();


(function() {
  var slide = $('#spacevideo');
  var video = slide.$('video');
  var audio = slide.$('audio');

  var PLAYBACKRATE = 2;

  video.listen('ended', function(e) {
    video.load(); // video.currentTime = 0; doesn't work.
    video.playbackRate = PLAYBACKRATE; // screenflow captured at 30fps. get us to 60.
    video.play();
  });

  slide.listen('slideenter', function(e) {
    if (video.currentTime >= video.duration) {
      video.load();
    }
    video.playbackRate = PLAYBACKRATE;
    video.play();
    audio.play();
  });

  slide.listen('slideleave', function() {
    video.pause();
    audio.pause();
  });

  // If this slide is current on pageload, start playing video.
  if (slidedeck.slides[slidedeck.curSlide_] == slide) {
    video.playbackRate = PLAYBACKRATE;
    video.play();
    audio.play();
  }
})();

(function() {
  var slide = $('#spacevideo2');
  var video = slide.$('video');
  var audio = slide.$('audio');

  var PLAYBACKRATE = 1;

  video.listen('ended', function(e) {
    video.load(); // video.currentTime = 0; doesn't work.
    video.playbackRate = PLAYBACKRATE; // screenflow captured at 30fps. get us to 60.
    video.play();
  });

  slide.listen('click', function() {
    video.playbackRate = PLAYBACKRATE; // screenflow captured at 30fps. get us to 60.
    video.paused ? video.play() : video.pause();
    audio.paused ? audio.play() : audio.pause();
  });

  slide.listen('slideleave', function() {
    video.pause();
    audio.pause();
  });

  // // If this slide is current on pageload, start playing video.
  // if (slidedeck.slides[slidedeck.curSlide_] == slide) {
  //   video.playbackRate = PLAYBACKRATE;
  //   video.play();
  //   audio.play();
  // }
})();

}


// function toggleElementProperty(el) {
//   var prop = el.textContent;
//   var currentSlide = slidedeck.slides[slidedeck.curSlide_];
//   //currentSlide.querySelector('.component-demo output')
// }

function encodeHTMLEntities(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') ;
}

// function toggleReplacementMarkup(el) {

//   if (el.dataset.using && el.dataset.using == 'replacement') {
//     var markup = el.dataset.original;
//     el.dataset.using = 'original';
//   } else {
//     var markup = encodeHTMLEntities(el.dataset.replacement);
//     el.dataset.using = 'replacement';
//   }

//   el.innerHTML = markup;
//   prettyPrint();
// }

