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

    // Reset polyfill support on browser support slides.
    if (slide.classList.contains('browser-support')) {
      slide.$('h3').innerHTML = 'browser support';
      slide.$('.browser-support-row').classList.remove('polyfill-status');
    }
  });

  // When browser support slide is clicked, show polyfill information.
  slidedeck.container.listen('click', function(e) {
    // Ignore clicks on links.
    if (e.target.tagName == 'A') {
      return;
    }
    var currentSlide = slidedeck.slides[slidedeck.curSlide_];
    if (currentSlide.classList.contains('browser-support')) {
      var browsSupportRow = currentSlide.$('.browser-support-row');
      if (browsSupportRow.classList.contains('polyfill-status')) {
        currentSlide.$('h3').innerHTML = 'browser support';
        browsSupportRow.classList.remove('polyfill-status');
      } else {
        currentSlide.$('h3').innerHTML = '<a href="https://github.com/Polymer">polyfill</a> support';
        browsSupportRow.classList.add('polyfill-status');
      }
    }
  });

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


(function() {
  var demo = $('#template-demo');

  var content = demo.querySelector('template').content;

  demo.querySelector('.snippet-demo').listen('click', function(e) {
    // Update something in the template DOM.
    var b = content.querySelector('b');
    b.textContent = parseInt(b.textContent) + 1;
    demo.querySelector('output').appendChild(content.cloneNode(true));

    e.preventDefault();
  });
})();

}
