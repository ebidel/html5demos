id: feature-detect
title: To view the demos in this presentation

1. Use Chrome Canary
2. Enable yourself:
	- **Enable experimental WebKit features** in `about:flags`
	- **Enable experimental JavaScript** in `about:flags`
	- **Enable Show Shadow DOM** in DevTools

<p id="need-shadow" class="topmargin"><label></label><span>You don't have Shadow DOM enabled</span></p>
<p id="need-objectobserve"><label></label><span>You don't have Object.observe()</span></p>
<p id="need-mo"><label></label><span>You don't have MutationObservers</span></p>


<script>
(function() {
var needShadow = document.querySelector('#need-shadow');
var needObjectObserve = document.querySelector('#need-objectobserve');
var needMo = document.querySelector('#need-mo');

if (!!!('createShadowRoot' in document.createElement('div'))) {
	needShadow.classList.add('red');
	needShadow.firstElementChild.classList.add('bad');
	needShadow.lastElementChild.textContent = "You don't have Shadow DOM enabled";
	
	// Hide live demos.
	document.addEventListener('DOMContentLoaded', function(e) {
		[].forEach.call(document.querySelectorAll('.host'), function(el) {
			el.hidden = true;
		});
	});
} else {
	needShadow.classList.add('green');
	needShadow.firstElementChild.classList.add('good');
	needShadow.lastElementChild.textContent = 'Shadow DOM enabled';
}

if (!!!Object.observe) {
  needObjectObserve.classList.add('red');
	needObjectObserve.firstElementChild.classList.add('bad');
	needObjectObserve.lastElementChild.textContent = "You don't have Object.observe()";
} else {
	needObjectObserve.classList.add('green');
	needObjectObserve.firstElementChild.classList.add('good');
	needObjectObserve.lastElementChild.textContent = "Object.observe() available";
}

if (!!!(window.WebKitMutationObserver || window.MutationObserver)) {
  needMo.classList.add('red');
	needMo.firstElementChild.classList.add('bad');
	needMo.lastElementChild.textContent = "You don't have MutationObservers";
} else {
	needMo.classList.add('green');
	needMo.firstElementChild.classList.add('good');
	needMo.lastElementChild.textContent = "MutationObservers available";
}
})();
</script>

---

title: Who is this guy?
id: who

<span class="build"><p class="avatar rounded"></p></span>

<p>Eric Bidelman - <img src="images/logos/google_logo.png" style="height: 30px;margin: 0;"> <img src="images/logos/chrome_logo.png" style="height:27px;margin:0;vertical-align: top;"> Team</p>

<p style="margin-top:2em;">
  <a rel="author" href="http://plus.ericbidelman.com">
    <img src="http://www.google.com/images/icons/ui/gprofile_button-44.png" width="44" height="44"></a> <a rel="author" href="http://plus.ericbidelman.com">plus.ericbidelman.com</a>
</p>
<p>
  <a rel="author" style="margin-left:-8px;" href="http://twitter.com/ebidel">
    <img src="images/logos/twitter_newbird_blue.png" width="58" height="58"></a> <a rel="author" href="http://twitter.com/ebidel" style="margin-left:-5px;">@ebidel</a>
</p>

<a rel="author" href="http://www.ericbidelman.com">ericbidelman.com</a>

[html5rocks.com](http://html5rocks.com)

O'Reilly book - "[Using the HTML5 Filesystem API](http://www.amazon.com/Using-HTML5-Filesystem-Eric-Bidelman/dp/1449309453)"

---
content_class: flexbox vcenter centered

<h2 class="auto-fadein">Web components?</h2>

---

title: Embedded widgets
class: nobackground fill highlight
image: images/bgs/plus-widget.jpg

---

title: Reusable libraries / frameworks
class: nobackground fill highlight
image: images/bgs/widget-library.jpg

---

id: b2tf
title: We're going "Back to the Future"
class: nobackground fill
content_class: flexbox vcenter centered auto-fadein
image: images/bgs/b2tf.jpg
build_lists: true

<div class="build">
<p>A <b>tectonic shift</b> for web development</p>

<p>Important <b>new constructs</b> for building complex web apps</p>

<p><em>"Declarative Renaissance"</em></p>
</div>

---

title: Once upon a time...
subtitle: HTML5 had to define it's identity

Not everyone <s>agrees</s> agreed.

- [jeffcroft.com/blog/2010/aug/02/term-html5/](http://jeffcroft.com/blog/2010/aug/02/term-html5/)
    - [paulirish.com/html5istherightname.html](http://paulirish.com/html5istherightname.html)
- [isgeolocationpartofhtml5.com](http://isgeolocationpartofhtml5.com)

<p class="centered topmargin">Web Components have the same identity crisis.</p>

---

title: Defining Web Components
subtitle: key players
build_lists: true

- <code>&lt;template></code> - *Scaffold/Blueprint*
    - inert chunks of clonable DOM. Can be activated for later use (e.g MDV)
- Custom elements - *Toolbelt*
    - create new HTML elements - expand HTML's existing vocabulary.
    - extend existing DOM objects with new imperative APIs
- Shadow DOM - *Mortar/glue*
    - building blocks for encapsulation &amp; boundaries inside of DOM

---

title: Defining Web Components
subtitle: supporting cast
build_lists: true

- Style encapsulation
- Knowledge into app's state
    - DOM changes: `MutationObserver`
    - Model changes: `Object.observer()`
- CSS variables, `calc()`

<p class="centered topmargin build">
  <span><em>A collection new capabilities in the browser</em></span>
</p>

---

title: Get
subtitle: ready!
class: nobackground funnyimage
image: images/animated/dog.gif

---

id: template-segue
title: Templates
subtitle: scaffold / blueprint
class: segue nobackground highlight fill
image: images/bgs/drinksblueprint.jpg

---

title: Templates...
subtitle: not<br> a new concept
class: nobackground funnyimage notnewconcept
image: images/animated/shock.gif

---

title: <img src="images/icons/calendar.png"> The templates of today
build_lists: true

*Method #1*: "offscreen" DOM using `[hidden]` or `display:none`

<pre class="prettyprint" data-lang="html">
&lt;div id="mytemplate" hidden>
  &lt;img src="logo.png">
  &lt;div class="comment">&lt;/div>
&lt;/div>
</pre>

1. <label class="good"></label> We're working directly w/ DOM. 
- <label class="bad"></label> Resources are still loaded (e.g. that `<img>`)
- <label class="bad"></label> Other side-effects like URLs not being fully composed yet.
- <label class="bad"></label> Style and theming is painful.
    - embedding page must scope all its CSS to `#mytemplate`.
    - no guarantees on future naming collisions.

---

title: <img src="images/icons/calendar.png" alt="Today" title="Today"> The templates of today

*Method #2*: manipulating markup as string. Overload `<script>`:

<pre class="prettyprint" data-lang="js">
&lt;script id="mytemplate" <b>type="text/x-handlebars-template"</b>>
  &lt;img src="logo.png">
  &lt;div class="comment">&lt;/div>
&lt;/script>
</pre>

1. <label class="bad"></label> encourages run-time string parsing (via `.innerHTML`)
    - may include user-supplied data &rarr; XSS attacks.

<p class="topmargin"></p>

Examples: [handlebars.js](http://handlebarsjs.com/), John Resig's [micro-template script](http://ejohn.org/blog/javascript-micro-templating/)


---

title: <img src="images/icons/clock.png" alt="Tomorrow" title="Tomorrow"> Templating of the near future
subtitle:  <code>&lt;template&gt;</code>
spec_link: http://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/templates/index.html
bug_link: https://bugs.webkit.org/show_bug.cgi?id=86031

Contains inert markup intended to be used later:

<pre class="prettyprint" data-lang="html">
&lt;template id="mytemplate">
  &lt;img src="">
  &lt;div class="comment">&lt;/div>
&lt;/template>
</pre>

1. <label class="good"></label> We're working directly w/ DOM again. 
- <label class="good"></label> Parsed, not rendered
    - `<script>`s don't run, images aren't loaded, media doesn't play, etc.

---

title: <img src="images/icons/clock.png"> Templating of the near future

- Appending inert DOM to a node makes it go "live":

<pre class="prettyprint" data-lang="js">
var t = document.querySelector('#mytemplate');
t.querySelector('img').src = 'http://...';
document.body.appendChild(<b>t.content.cloneNode()</b>);
</pre>

<div class="build">

<div>
<code>.content</code> provides access to the <code>&lt;template&gt;</code>'s guts:</p>

<pre class="prettyprint" data-lang="interface">
interface HTMLTemplateElement : HTMLElement {
  attribute DocumentFragment content;
}
</pre>
</div>
</div>

---

content_class: flexbox vcenter centered

<h2 class="auto-fadein">Templates</h2>
<h3 class="auto-fadein">baked into the web platform...</h3>

---

subtitle: $$$
class: nobackground dirty-sexy funnyimage
image: images/animated/dirty-sexy-money.gif


---

id: shadow-dom-segue
title: Shadow DOM
subtitle: mortar / glue
class: segue nobackground highlight fill
image: images/bgs/blocks.jpg

---

title: Encapsulation...
subtitle: not<br> a new concept
class: nobackground funnyimage notnewconcept
image: images/animated/shock.gif

---

title: Encapsulation
build_lists: true

<div class="build">

<p><label class="good"></label> Fundamental foundation of OOP</p>

<p><label class="good"></label> Separates code <em>you</em> wrote from the code that will <em>consume</em> it</p>

<p><label class="bad"></label> We don't have it on the web!</p>

<p><label class="sortof"></label> Well, sort of:</p>

<h2 class="centered"><code>&lt;iframe&gt;</code></h2>

<p class="topmargin"><label class="bad"></label> <code>&lt;iframe&gt;</code> are heavy and restrictive</p>

</div>

---

title: Shadow DOM
spec_link: http://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html

Is complex! Let's cover the basics:

- Concept of Shadow DOM
- Creating Shadow DOM
- Insertion Points
- Styling
    - encapsulated styles & shadow boundaries
    - styling hooks: custom pseudo elements
    - `@host` at-rule

---

title: Turns out...
build_lists: true

- DOM nodes can already "host" hidden DOM.
- It can't be accessed traversing the DOM.

<div class="build shadowvideo">
<video controls height="300" src="http://www.ioncannon.net/examples/vp8-webm/big_buck_bunny_480p.webm"></video>
<p style="float:left;margin-left: 1em;">
<input type="date" style="zoom:2"><br>
<input type="time" style="zoom:2">
</p>
</div>

<p class="centered build" style="font-size:40px;"><span>So...browser vendor's have been holding out on us!</span></p>

---

content_class: flexbox vcenter centered defintion

<h2 class="auto-fadein">Shadow DOM</h2>
<h3 class="auto-fadein">exposes the same internals browser
vendors have been using to implement their native controls, to us</h3>

---

id: shadow-dom-host
title: Attaching Shadow DOM to a host
spec_link: http://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html
content_class: flexbox vcenter centered

<img src="images/shadow/shadow-trees.svg" style="height: 100%;">

---

id: shadow-dom-render
title: Shadow tree is rendered instead
spec_link: http://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html
content_class: flexbox vcenter centered

<img src="images/shadow/shadow-rendering.svg" style="height:100%;">

<div class="devtools" title="click me" alt="click me"></div>

---

id: shadow-dom-creating
title: Creating Shadow DOM
spec_link: http://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#extensions-to-element

<aside class="note">
  <section>
    <img src="images/shadow/shadow-rendering.svg" style="width: 100%;">
  </section>
</aside>

<pre class="prettyprint" data-lang="html">
&lt;div id="host">
  &lt;h1>My Title&lt;/h1>
  &lt;h2>My Subtitle&lt;/h2>
  &lt;div>...other content...&lt;/div>
&lt;/div>
</pre>

<pre class="prettyprint" data-lang="js">
var host = document.querySelector('#host');
<b>var shadow = host.createShadowRoot();</b>
<b>shadow.innerHTML = '&lt;h2>Yo, you got replaced!&lt;/h2>' +
                   '&lt;div>by my awesome content&lt;/div>';</b>
</pre>
<!-- <b>var shadow = new <a data-tooltip-property="ShadowRoot" data-tooltip-support='["webkit"]' data-tooltip-js>ShadowRoot</a>(host);</b> -->

<div class="host">
  <h1>My Title</h1>
  <h2>My Subtitle</h2>
  <div>...other content...</div>
</div>

<script>
(function() {
var shadow = document.querySelector('#shadow-dom-creating .host').createShadowRoot();
shadow.innerHTML = '<h2>Yo, you got replaced!</h2>' +
                   '<div>by my awesome content</div>';
})();
</script>

---

content_class: flexbox vcenter centered unstyled

<h2 class="auto-fadein">So....<br>unstyled markup is not sexy</h2>

---

id: shadow-dom-style-encapsulation
title: Style encapsulation

<aside class="note">
  <section>
    <img src="images/shadow/shadow-rendering.svg" style="width: 100%;">
  </section>
</aside>

<code>&lt;style></code>s defined in `ShadowRoot` are scoped.

<pre class="prettyprint" data-lang="js">
var shadow = document.querySelector('#host').createShadowRoot();
shadow.innerHTML = '<b>&lt;style>h2 { color: red; }&lt;/style></b>' + 
                   '&lt;h2>Yo, you got replaced!&lt;/h2>' + 
                   '&lt;div>by my awesome content&lt;/div>';
</pre>

<div class="host">
  <h1>My Title</h1>
  <h2>My Subtitle</h2>
  <div>...other content...</div>
</div>

<script>
(function() {
var shadow = document.querySelector('#shadow-dom-style-encapsulation .host').createShadowRoot();
shadow.innerHTML = '<style>h2 { color: red;}</style>' + 
                   '<h2>Yo, you got replaced!</h2>' + 
                   '<div>by my awesome content</div>';

})();
</script>

---

id: shadow-style-control
title: Protection from pesky outside styles
content_class: smaller

<aside class="note">
  <section>
    <img src="images/shadow/shadow-rendering.svg" style="width: 100%;">
  </section>
</aside>

Author's styles don't cross shadow boundary by default, but have full control.

<pre class="prettyprint" data-lang="js">
var shadow = document.querySelector('#host').createShadowRoot();
shadow.innerHTML = '&lt;style>h2 { color: red; }&lt;/style>' + 
                   '&lt;h2>Yo, you got replaced!&lt;/h2>' + 
                   '&lt;div>by my awesome content&lt;/div>';

<b data-action-resetstyleinheritance title="click me">// shadow.resetStyleInheritance = true;</b> // click me
<b data-action-applyauthorstyles title="click me">// shadow.applyAuthorStyles = true;</b> // click me
</pre>

<div class="host" style="margin-bottom:1em;">
  <h1>My Title</h1>
  <h2>My Subtitle</h2>
  <div>...other content...</div>
</div>

- `.resetStyleInheritance`
    - `false` - (default) inheritable CSS properties continue to inherit.
    - `true` - resets properties to `initial` at the shadow boundary.
- `.applyAuthorStyles`
    - `true` to allow author's styles to "bleed" across shadow boundary. Default is `false`.

<script>
(function() {
var shadow = document.querySelector('#shadow-style-control .host').createShadowRoot();
// See crbug.com/162517 - !important needed for some reason.
shadow.innerHTML = '<style>h2 { color: red !important;}</style>' + 
                   '<h2>Yo, you got replaced!</h2>' + 
                   '<div>by my awesome content</div>';

var resetStyles = document.querySelector('#shadow-style-control [data-action-resetstyleinheritance]');
resetStyles.addEventListener('click', function(e) {
  shadow.resetStyleInheritance = !shadow.resetStyleInheritance;
  this.textContent = 'shadow.resetStyleInheritance = ' + shadow.resetStyleInheritance.toString() + ';';
});
var applyAuthorStyles = document.querySelector('#shadow-style-control [data-action-applyauthorstyles]');
applyAuthorStyles.addEventListener('click', function(e) {
  shadow.applyAuthorStyles = !shadow.applyAuthorStyles;
  this.textContent = 'shadow.applyAuthorStyles = ' + shadow.applyAuthorStyles.toString() + ';';
});

})();
</script>

---

id: shadow-host-at
title: Styling the host element (<code>@host</code> at-rule)
spec_link: http://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#host-at-rule
content_class: smaller

- `@host` selects the shadow host element.
- Allows reacting to different states:

<pre class="prettyprint" data-lang="css">
&lt;style>
<b>@host</b> {
  /* Gotcha: higher specificity than any selector,
     lower specificity than declarations from a &lt;style&gt; attribute. */
  * {
    opacity: 0.2;
    <a data-tooltip-property="transition" data-tooltip-support='["webkit", "moz", "ms", "o", "unprefixed"]'>transition</a>: opacity 400ms ease-in-out;
  }
  *:hover {
    opacity: 1;
  }
}
&lt;/style>
</pre>

<div class="host">
  <h1>My Title</h1>
  <h2>My Subtitle</h2>
  <div>...other content...</div>
</div>

<script>
(function() {
var shadow = document.querySelector('#shadow-host-at .host').createShadowRoot();
shadow.innerHTML = '<style>h2 { color: red;}' +
'@host {\
  * {\
    opacity: 0.2;\
    -webkit-transition: opacity 400ms ease-in-out;\
  }\
  *:hover {\
    opacity: 1;\
  }\
}</style>' + 
'<h2>Yo, you got replaced!</h2>' + 
'<div>by my awesome content</div>';

})();
</script>

---

id: pseduo-element-styling
title: Custom pseudo elements
spec_link: https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#custom-pseudo-elements

<aside class="note notnewconcept funnyimage">
  <section>
    <h2>Custom pseudo elements...</h3>
    <img src="images/animated/shock.gif" style="width: 100%;">
    <h3>Not<br>a new concept</h3>
  </section>
</aside>

<p class="input-list centered">
<input type="range">
</p>

<div class="build">
<pre class="prettyprint" data-lang="css">
input[type=range].custom {
  -webkit-appearance: none;
  background-color: red;
}
input[type=range].custom<b>::-webkit-slider-thumb</b> {
  -webkit-appearance: none;
  background-color: blue;
  width: 10px;
  height: 40px;
}
</pre>
 
<p class="build input-list centered">
<span><input type="range" class="custom"></span>
<span><input type="range" class="custom bling"></span>
</p>
</div>

List of pseudo elements: [WebKit](http://trac.webkit.org/browser/trunk/Source/WebCore/css/html.css?format=txt), [FF](https://developer.mozilla.org/en-US/docs/CSS/CSS_Reference/Mozilla_Extensions#Pseudo-elements_and_pseudo-classes)

---

title: Style hooks with custom pseudo elements

Widget author can designate certain elements be styleable by outsiders.

<pre class="prettyprint" data-lang="html">
&lt;style>
  #host<b>::x-slider-thumb</b> {
    background-color: blue;
  }
&lt;/style>
&lt;div id="host">&lt;/div>
&lt;script>
document.querySelector('#host').createShadowRoot().innerHTML = '&lt;div>' +
  '&lt;div <b>pseudo="x-slider-thumb"</b>>&lt;/div>' + 
'&lt;/div>';
&lt;/script>
</pre>

- *Note*: name needs to be prefixed with "`x-`"
    - string name creates association with element in shadow tree
- Can't access these elements from outside JS, but can style them!

---

title: Style hooks using CSS Variables
subtitle: theming
spec_link: http://dev.w3.org/csswg/css-variables/

Widget **author** includes variable placeholders:

<pre class="prettyprint" data-lang="shadow dom css">
button {
  color: <a data-tooltip-property="var" data-tooltip-support='["webkit", "unprefixed"]'>var</a>(button-text-color);
  font: <a data-tooltip-property="var" data-tooltip-support='["webkit", "unprefixed"]'>var</a>(button-font);
}
</pre>

Widget **embedder** applies styles to the element:

<pre class="prettyprint" data-lang="css">
#host {
  <b><a data-tooltip-property="var" data-tooltip-support='["webkit", "unprefixed"]'>var</a>-button-text-color</b>: green;
  <b><a data-tooltip-property="var" data-tooltip-support='["webkit", "unprefixed"]'>var</a>-button-font</b>: "Comic Sans MS", "Comic Sans", cursive;
}
</pre>

<p class="centered">
<a href="demos/page.html" class="demo">DEMO</a>
</p>

---

title: Remember our host node

<pre class="prettyprint" data-lang="html">
&lt;div id="host">
  &lt;h1>My Title&lt;/h1>
  &lt;h2>My Subtitle&lt;/h2>
  &lt;div>...other content...&lt;/div>
&lt;/div>
</pre>

that guy rendered as:

<pre class="prettyprint" data-lang="html">
&lt;div id="host">
  <span style="opacity:0.5">#shadow-root</span>
    &lt;style>h2 {color: red;}&lt;/style>
    &lt;h2>Yo, you got replaced!&lt;/h2>
    &lt;div>by my awesome content&lt;/div>
&lt;/div>
</pre>

...everything was replaced when we attached the shadow DOM <label class="bad"></label>

---

id: insertion-points2
title: Shadow DOM insertion points
subtitle: funnels for host's children
content_class: flexbox vcenter centered build
build_lists: true

<div class="auto-fadein"></div>

---

id: shadow-dom-insertion-pts-example
title: Shadow DOM insertion points
subtitle: funnels for host's children
content_class: smaller

- `<content>` elements are insertion points.
- `select` attribute uses CSS selectors to specify where children are funneled.
- `content.getDistributedNodes()` returns list of element distributed in the insertion point.

<div class="columns-2">
<pre class="prettyprint" data-lang="host">
&lt;div id="host"&gt;
  &lt;h1&gt;My Title&lt;/h1&gt;
  &lt;h2&gt;My Subtitle&lt;/h2&gt;
  &lt;div&gt;...other content...&lt;/div&gt;
&lt;/div&gt;
</pre>

<pre class="prettyprint" data-lang="Shadow DOM" style="-webkit-column-break-before: always;">
&lt;style>
  h2 {color: red;}
&lt;/style>
&lt;hgroup>
  <b>&lt;content select="h2">&lt;/content&gt;</b>
  &lt;div&gt;You got enhanced&lt;/div&gt;
  <b>&lt;content select="h1:first-child">&lt;/content&gt;</b>
&lt;/hgroup>
<b>&lt;content select="*">&lt;/content&gt;</b>
</pre>
</div>

<div class="host">
  <h1>My Title</h1>
  <h2>My Subtitle</h2>
  <div>...other content...</div>
</div>

<script>
(function() {
var shadow = document.querySelector('#shadow-dom-insertion-pts-example .host').createShadowRoot();
shadow.innerHTML = '<style>\
h2 { color: red;}\
</style>\
<hgroup>\
  <content select="h2"></content>\
  <div>You got enhanced</div>\
  <content select="h1:first-child"></content>\
</hgroup>\
<content select="*"></content>';
})();
</script>

---

content_class: flexbox vcenter centered defintion

<h2 class="auto-fadein">Insertion Points</h2>
<h3 class="auto-fadein">allow us to define a declarative API</h3>

---

content_class: flexbox vcenter centered

<h2 class="auto-fadein">Encapsulation / Boundaries / Re-usability</h2>
<h3 class="auto-fadein">baked into the web platform...</h3>

---

title: Cha-
subtitle: ching!
class: nobackground funnyimage
image: images/animated/irish-flick.gif

---

id: mutation-segue
title: Observing Changes
subtitle: Mutation Observers / Object.observe()
class: segue nobackground highlight fill
image: images/bgs/mutation.jpg

---

title: Mutation Observers
subtitle: watch for changes in the DOM
spec_link: http://www.w3.org/TR/domcore/#mutation-observers
build_lists: true

- Defined in [DOM4](http://www.w3.org/TR/domcore/#mutation-observers) ( Yep. We're on DOM4! )
- Observers, not listeners
    - triggered by DOM changes rather than events (e.g. `oninput`, `click`)
- Callback triggered at the end of DOM modifications.
    - provided a list of all changes (`MutationRecord`s)
- Replacement for `MutationEvent` performance / stability bottlenecks.
- Availability: Chrome, Safari, FF
- *Who?* JS Framework authors, extension developers

---

title: Example
subtitle: observe child node insertion/deletions

<pre class="prettyprint" data-lang="js">
var observer = new <b><a data-tooltip-property="MutationObserver" data-tooltip-support='["unprefixed", "webkit"]' data-tooltip-js>MutationObserver</a></b>(function(mutations, observer) {
  mutations.forEach(function(record) {
    for (var i = 0, node; node = <b>record.addedNodes</b>[i]; i++) {
      console.log(node);
    }
  });
});

<b>observer.observe(el, {</b>
  <b>childList: true,</b>      // include childNode insertion/removals
  //subtree: true,        // observe the subtree root at el
  //characterData: true, // include textContent changes
  //attribute: true      // include changes to attributes within the subtree
<b>});</b>

// observer.disconnect() // Stop observations
</pre>

---

title: Mutation Observers vs. Mutation Events
build_lists: true

**`MutationEvent`**

- Deprecated in [DOM Events spec](http://www.w3.org/TR/DOM-Level-3-Events/#events-mutationevents)
- Adding listeners [degrades app performance](http://www.oxymoronical.com/blog/2008/10/How-extensions-can-slow-down-Firefox-my-dirty-little-secret) by 1.5-7x!
    - slow because of event propagation and synchronous nature
    - fire too often: every single change
    - removing listener(s) doesn't reverse the damage
- [Inconsistencies](http://help.dottoro.com/ljfvvdnm.php#additionalEvents) with browser implementations.

<p class="red centered build topmargin" style="font-size:50px;"><span>Don't use Mutation Events!</span></p> 

---

title: Comparison Example
subtitle: Inserting a DOM node
content_class: smaller

<pre class="prettyprint" data-lang="js">
// MutationEvent
document.addEventListener('DOMNodeInserted', function(e) {
  console.log(e.target);
}, false);
</pre>

<pre class="prettyprint" data-lang="js">
// MutationObserver
var observer = new <a data-tooltip-property="MutationObserver" data-tooltip-support='["unprefixed", "webkit"]' data-tooltip-js>MutationObserver</a>(function(mutations, observer) {
  mutations.forEach(function(record) {
    for (var i = 0, node; node = <b>record.addedNodes</b>[i]; i++) {
      console.log(node);
    }
  });
}).observe(document, {childList: true});
</pre>

<p class="centered topmargin">
<a href="demos/mutation-summary/examples/shuffle_compare/shuffle.html" class="demo">DEMO</a>
</p>

---

title: <code>Object.observe()</code>
subtitle: watch changes to JS objects
spec_link: http://wiki.ecmascript.org/doku.php?id=harmony:observe
content_class: smaller
build_lists: true

<p class="centered" style="font-size:25px">
  <span><code>Object.observe</code> : JS objects :: <code>MutationObserver</code> : DOM</span>
</p>
<pre class="prettyprint" data-lang="js">
function observeChanges(changes) {
  console.log('== Callback ==');
  changes.forEach(function(change) {
    console.log('What Changed?', change.name);
    console.log('How did it change?', change.type);
    console.log('What was the old value?', change.oldValue );
    console.log('What is the present value?', change.object[change.name]);
  });
}

var o = {};
<b>Object.observe</b>(o, observeChanges);
// Object.unobserve(o, observeChanges); // Stop watching.
</pre>

- Get notified when a property is added, deleted, or its value changes.
- Get notified when properties are reconfigured (e.g. `Object.freeze`)
- Landing in Chrome Canary. Turn on **Experimental JavaScript APIs** in `about:flags`.

See [Bocoup's writeup](http://weblog.bocoup.com/javascript-object-observe/).

---

id: obj-observe-binding
title: Benefit: improved data binding
build_lists: true

The <img src="images/logos/angular.png" style="height:35px;vertical-align: middle;"> [AngularJS](http://angularjs.org) team experimented with a prototype build of Chromium:

<p class="fleft">
  <img src="images/angularspeedup.png">
</p>
<p class="fleft build"><span>20-40x faster!</span></p>

---

title: <img src="images/icons/clock.png" title="Soon" alt="Soon"> End game: Model Driven Views (MDV)
spec_link: http://mdv.googlecode.com/git/docs/design_intro.html

<pre class="prettyprint" data-lang="html">
&lt;div id="example">
&lt;ul>
  <b>&lt;template iterate>
    &lt;li>{{ name }}
      &lt;ul>&lt;template iterate="skills">&lt;li>...&lt;/li>&lt;/template>&lt;/ul>
    &lt;/li>
  &lt;/template></b>
&lt;/ul>
&lt;/div>
&lt;script>
document.querySelector('#example')<b>.model</b> = [
  {name: 'Sally', skills: ['carpentry']}, 
  {name: 'Helen', skills: ['weaving', 'omnipotence']}
];
&lt;/script>
</pre>

Play with it today: [code.google.com/p/mdv/](https://code.google.com/p/mdv/)

---

title: <img src="images/icons/calendar.png" alt="Today" title="Today"> Templating in <img src="images/logos/angular.png"> AngularJS
content_class: smaller

A (close-ish) taste of the future:

<pre class="prettyprint" data-lang="html">
&lt;div <b>ng-controller="AppController"</b>>
  &lt;ul>
    &lt;li <b>ng-repeat="person in model"</b>>{{ person.name }}
    &lt;ul>&lt;li <b>ng-repeat="skill in person.skills"</b>>{{skill}}&lt;/li>&lt;/ul>
  &lt;/ul>
&lt;/div>
&lt;script>
function AppController($scope) {
  $scope.model = [{name: 'Sally', skills: ['carpentry']},
                  {name: 'Helen', skills: ['weaving', 'omnipotence']}];
}
&lt;/script>
</pre>


<div ng-app ng-controller="AppController" class="angular-template-example">
<ol>
  <li ng-repeat="person in model">{{ person.name }}
  <ul><li ng-repeat="skill in person.skills">{{skill}}</li></ul>
</ol>
</div>
<script>
function AppController($scope) {
  $scope.model = [
    {name: 'Sally', skills: ['carpentry']},
    {name: 'Helen', skills: ['weaving', 'omnipotence']}
  ];
}
</script>

---

content_class: flexbox vcenter centered

<h2 class="auto-fadein">Observing changes to DOM and JS</h2>
<h3 class="auto-fadein">baked into the web platform...</h3>

---

subtitle: $$$
class: nobackground dirty-sexy funnyimage
image: images/animated/dirty-sexy-money.gif

---

title: Custom Elements
subtitle: Putting it all together
class: segue nobackground highlight fill
image: images/bgs/istock-lasanga.jpg

<!-- <footer class="source black">http://www.flickr.com/photos/historyinanhour/4775644390/</footer> -->

---

title: <img src="images/icons/calendar.png" alt="Today" title="Today"> Creating a basic tab control (YUI 3)
content_class: smaller

<div class="columns-2">
<pre class="prettyprint" data-lang="html" class="columns-2">
&lt;div id=&quot;demo&quot;&gt;
  &lt;ul&gt;
    &lt;li&gt;&lt;a href=&quot;#foo&quot;&gt;foo&lt;/a&gt;&lt;/li&gt;
    &lt;li&gt;&lt;a href=&quot;#bar&quot;&gt;bar&lt;/a&gt;&lt;/li&gt;
  &lt;/ul&gt;
  &lt;div&gt;
    &lt;div id=&quot;foo&quot;&gt;&lt;p&gt;foo content&lt;/p&gt;&lt;/div&gt;
    &lt;div id=&quot;bar&quot;&gt;&lt;p&gt;bar content&lt;/p&gt;&lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
</pre>
<pre class="prettyprint" data-lang="js">
YUI().use('tabview', function(Y) {
  var tabview = new Y.TabView({srcNode: '#demo'});
  tabview.render();
});
</pre>
<img src="images/screenshots/yui_tab.png">
</div>

<footer class="source"><a href="http://yuilibrary.com/yui/docs/tabview/tabview-basic.html">YUI documentation</a></footer>

---

id: customels-tab-devtools
title: But...there's nothing "basic" about it!
class: nobackground
content_class: flexbox vcenter centered

<p onclick="this.classList.toggle('active')" title="click me" alt="click me"></p>

---

title: Insanity!!!
class: nobackground highlight fill
image: images/bgs/disaster.jpg

---

title: Do we have all the pieces to build components?
build_lists: true

1. Templates (`<template>`)
- Shadow DOM (`@host`, custom pseudo elements, styling hooks)
- Mutation Observers, `Object.observe()`

<p class="centered build topmargin blue"><span style="font-size:50px;">WE DO :)</span></p>

---

title: Creating custom elements
spec_link: http://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/custom/index.html#declaring-custom-elements

Define a *declarative* "API" using insertion points:

<pre class="prettyprint" data-lang="x-tabs.html">
<b>&lt;element name="x-tabs"></b>
  &lt;template>
    &lt;style>...&lt;/style>
    &lt;content select="hgroup:first-child">&lt;/content>
  &lt;/template>
<b>&lt;/element></b>
</pre>

Include and use it:

<pre class="prettyprint" data-lang="yourapp.html">
&lt;link <b>rel="components"</b> href="x-tabs.html"&gt;
&lt;x-tabs>
  &lt;hgroup>
    &lt;h2>Title&lt;/h2>
    ...
  &lt;/hgroup>
&lt;/x-tabs>
</pre>

---

title: Define an API
spec_link: http://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/custom/index.html#declaring-custom-elements
content_class: smaller

Define an *imperative* API:

<pre class="prettyprint" data-lang="x-tabs.html">
&lt;element name="x-tabs" <b>constructor="TabsController"></b>
  &lt;template>...&lt;/template>
  <b>&lt;script&gt;
    TabsController.prototype = {
      doSomething: function() { ... }
    };
  &lt;/script&gt;</b>
&lt;/element>
</pre>

Declared `constructor` goes on global scope:

<pre class="prettyprint" data-lang="yourapp.html">
&lt;link rel="components" href="x-tabs.html"&gt;
&lt;script&gt;
<b>var tabs = new TabsController();</b>
tabs.addEventListener('click', function(e) { <b>e.target.doSomething();</b>});
document.body.appendChild(tabs);
&lt;/script&gt;
</pre>

---

title: Or, extend existing [custom] elements
#content_class: smaller

<pre class="prettyprint" data-lang="x-megabutton.html">
&lt;element name="x-megabutton" <b>extends="button"</b> <b>constructor="MegaButton"</b>>
  &lt;template>
    &lt;button>&lt;content>&lt;/content>&lt;/button>
  &lt;/template>
  &lt;script>
    MegaButton.prototype = {
      megaClick: function(e) {
        alert('BOOM!');
      }
    };
  &lt;/script>
&lt;/element>
</pre>

Use it:

<pre class="prettyprint" data-lang="yourapp.html">
&lt;link rel="components" href="x-megabutton.html">
&lt;x-megabutton>Mega button&lt;/x-megabutton>
</pre>

---

title: Demo: Mega Button

<link rel="components" href="demos/components/x-megabutton.html"/>

<p class="centered">
  <code class="prettyprint">&lt;x-megabutton>Mega button&lt;/x-megabutton></code>
</p>

<p class="centered topmargin">
<!--
Note: <x-megabutton>Better buttonz</x-megabutton> is what the current
webapp mailing list is agreeing on, but the polyfill uses [is="x-megabutton"]
-->
<button is="x-megabutton">Mega button</button>
</p>

<footer class="source">[ <a href="view-source:http://html5-demos.appspot.com/demos/components/x-megabutton.html">view source</a> ]</footer>

---

id: tab-component-example
title: Example: tab component

<div class="columns-2">
<h3>Web Components <img src="images/logos/webcomponents.png"></h3>
<pre class="prettyprint" data-lang="html">
&lt;x-tab&gt;
  &lt;h2&gt;One&lt;/h2&gt;
  &lt;section&gt;
    Code to instantiate this component:
    &lt;pre&gt;&lt;/pre&gt;
  &lt;/section&gt;
  &lt;h2&gt;Two is bigger than three&lt;/h2&gt;
  &lt;section&gt;
    Second panel hotness
  &lt;/section&gt;
&lt;/x-tab&gt;
</pre>

<h3 style="-webkit-column-break-before: always;"><img src="images/logos/angular.png"> AngularJS</h3>
<pre class="prettyprint" data-lang="html">
&lt;tabs ng-app=&quot;tabs&quot;&gt;
  &lt;pane title=&quot;One&quot;&gt;
    Code to instantiate this component:
    &lt;pre&gt;&lt;/pre&gt;
  &lt;/pane&gt;
  &lt;pane title=&quot;Two is bigger than three&quot;&gt;
    Second panel hotness.
  &lt;/pane&gt;
&lt;/tabs&gt;
</pre>
</div>

<p class="centered"><a href="demos/components/tabs/index.html" class="demo">DEMO</a></p>

---

content_class: flexbox vcenter centered

<h2 class="auto-fadein">Defining / extending HTML elements</h2>
<h3 class="auto-fadein">baked into the web platform...</h3>

---

title: Love
subtitle: it!
class: nobackground funnyimage
image: images/animated/dog.gif

<!-- 
#---

title: The Declarative Renaissance
build_lists: true

- Guardrails, not etiquette
- Interoperable widget libraries
- Multiple authors on a page without stepping on one another's toes
- Many use cases fully declarative
- Declarative is faster
- Rise in shared semantics
 -->

---

title: Don't forget to enable yourself

1. Use Chrome Canary
2. Enable yourself:
	- **Enable experimental WebKit features** in `about:flags`
	- **Enable experimental JavaScript** in `about:flags`
	- **Enable Show Shadow DOM** in DevTools

Polyfills:

- [Web-Components-Polyfill](http://github.com/dglazkov/Web-Components-Polyfill)
- Mozilla's [x-tags Custom Elements Polyfill](https://github.com/mozilla/x-tag) (works on all browsers)
- MDV - [code.google.com/p/mdv/](https://code.google.com/p/mdv/)

---
title: Resources
content_class: smaller

Web Components / Custom Elements

- [Web Components Explainer](http://dvcs.w3.org/hg/webcomponents/raw-file/tip/explainer/index.html) explainer doc
- [Custom Elements spec](http://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/custom/index.html)
- Follow +[Web Components](https://plus.google.com/103330502635338602217/) ★ [@dglazkov](https://twitter.com/dglazkov) ★ +[Dimitri Glazkov](https://plus.google.com/111648463906387632236/)
- [Public WebApps mailing list](http://lists.w3.org/Archives/Public/public-webapps/)

Shadow DOM

- [What the Heck is Shadow DOM?](http://glazkov.com/2011/01/14/what-the-heck-is-shadow-dom/)
- [Shadow DOM spec](http://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html)
- Conformance test - [demo.unipro.ru/shadow/](http://demo.unipro.ru/shadow/)

Mutation Observers / <code>Object.observe</code>

- [DOM Mutation Observers & The Mutation Summary Library video](http://www.youtube.com/watch?v=eRZ4pO0gVWw)
- [JavaScript Object.observe proposal & ChangeSummary library video](http://www.youtube.com/watch?v=VO--VXFJnmE)
- Bocoup's [JavaScript: Object.observe](http://weblog.bocoup.com/javascript-object-observe/) writeup
- Follow +[Rafael Weinstein](https://plus.google.com/111386188573471152118/)

