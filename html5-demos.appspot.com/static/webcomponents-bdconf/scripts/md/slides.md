title: Who is this guy?
id: who

<p class="avatar rounded"></p>

<p>Eric Bidelman</p>
<p>Staff Developer Programs Engineer, <img src="images/logos/google_logo.png" style="height: 30px;margin: 0;"> <img src="images/logos/chrome_logo.png" style="height:27px;margin:0;vertical-align: top;"></p>

- - -

<p>
  <a rel="author" href="http://google.com/+EricBidelman">
    <img src="http://www.google.com/images/icons/ui/gprofile_button-44.png" width="44" height="44"></a> <a rel="author" href="http://google.com/+EricBidelman">google.com/+EricBidelman</a>
</p>
<p style="margin:0;">
  <a rel="author" style="margin-left:-8px;" href="http://twitter.com/ebidel">
    <img src="images/logos/twitter_newbird_blue.png" width="58" height="58"></a> <a rel="author" href="http://twitter.com/ebidel" style="margin-left:-5px;">@ebidel</a>
</p>

- - - 

<p style="margin-top:10px;">
<img src="images/logos/h5rlogo.png" style="width: 50px;"><a href="http://html5rocks.com">html5rocks.com</a>
</p>

"[Using the HTML5 Filesystem API](http://www.amazon.com/Using-HTML5-Filesystem-Eric-Bidelman/dp/1449309453 )" - O'Reilly 

<a rel="author" href="http://www.ericbidelman.com">ericbidelman.com</a>

---
hidden: true
class: futureweb large
content_class: flexbox vcenter centered

<h2 class="auto-fadein">I have <b class="yellow">60 min</b> to cover the <b class="green">entire</b> future web <b class="blue">platform</b> <span>:(</span></h2>

<div class="fail build">
  <h2>FAIL</h2>
</div>

---

class: nobackdrop nobackground
content_class: flexbox vcenter centered animatedfull

<img src="images/gifs/macklemore-thrift-shop.jpg" class="rounded reflect">

---

class: nobackdrop nobackground
content_class: flexbox vcenter centered animatedfull

<img src="images/gifs/hitinface.gif" class="rounded reflect">

---

class: large
content_class: flexbox vcenter centered

<h2 class="auto-fadein">Web Components?</h2>

---
content_class: flexbox vcenter centered

<iframe data-src="http://html5-demos.appspot.com/static/webcomponents/demos/components/my-components/blink/blink.html" style="height:160px;border:none"></iframe>

<span class="source"><s>[Dead](https://www.w3.org/Bugs/Public/show_bug.cgi?id=21712)</s>?</span>

---

content_class: flexbox vcenter centered

<p class="centered">
  <code class="prettyprint custom-element-snippet">&lt;gangnam-style>&lt;/gangnam-style></code>
</p>

<iframe data-src="http://html5-demos.appspot.com/static/webcomponents/demos/components/my-components/gangnam.html" style="height:170px;border:none"></iframe>

---

content_class: flexbox vcenter centered

<p class="centered">
  <code class="prettyprint custom-element-snippet">&lt;photo-booth>&lt;/photo-booth></code>
</p>

<link rel="import" href="demos/components/x-photo-booth.html">
<photo-booth class="rounded"></photo-booth>

---

content_class: flexbox vcenter centered

<p class="centered">
  <code class="prettyprint custom-element-snippet" style="font-size:35px">&lt;button is="mega-button">Mega button&lt;/button></code>
</p>

<iframe data-src="http://html5-demos.appspot.com/static/webcomponents/demos/components/my-components/mega-button/megabutton.html" style="height:380px;width:380px;border:none"></iframe>

---

title: Readable?
class: nobackdrop nobackground
content_class: flexbox vcenter centered animatedfull

<img src="images/screenshots/gmail.png">

---

content_class: flexbox vcenter centered

<img src="images/gifs/chan.jpg" class="rounded">
<h2>This is how we build web apps!</h2>

---

title: Markup can be meaningful again \m/

<pre class="prettyprint" data-lang="html" data-run-demo="demos/components/hangouts/index.html">
&lt;hangout-module>
  &lt;hangout-chat from="Paul, Addy" profile="118075919496626375791">
    &lt;hangout-discussion>
      &lt;hangout-message from="Paul" profile="profile.png" datetime="2013-07-17T12:02">
        &lt;p>Feelin' this Web Components thing.&lt;/p>
        &lt;p>Heard of it?&lt;/p>
      &lt;/hangout-message>
      ...
    &lt;/hangout-discussion>
  &lt;/hangout-chat>
  &lt;hangout-chat>&lt;/hangout-chat>
&lt;/hangout-module>
</pre>

---

class: large
content_class: flexbox vcenter centered

<h2 class="auto-fadein">Need better tools...</h2>

---

title: Building blocks of Web Components
build_lists: true

- [Shadow DOM](https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html) - *mortar/glue*
    - DOM &amp; style encapsulation
- [HTML Templates](http://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/templates/index.html) - *scaffold/blueprint*
    - inert chunks of DOM. Activated for later use.
- [Custom Elements](https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/custom/index.html) - *toolbelt*
    - <span class="green">create</span> new HTML elements. Expand HTML's existing vocabulary
    - <span class="green">extend</span> existing DOM objects with new imperative APIs
- [HTML Imports](https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/imports/index.html)

- - - 

- [MDV](www.polymer-project.org/platform/mdv.html)  - *data binding*
    - only pieces are spec'd (`Object.observe()`, `<template>`)

<p class="centered build" style="margin-top:1em;font-size:35px;font-style:italic;">
  <span class="green"><b>A collection of new API primitives in the browser</b></span>
</p>

---

class: nobackdrop nobackground yum
content_class: flexbox vcenter centered

<h2 class="auto-fadein">Custom Elements</h2>

---

title: Creating new elements in HTML
spec_link: https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/custom/index.html

<span class="blue">Methods</span>

1. Define an `<element>` definition
2. In JavaScript with `document.register()`

- - - 

Element definition registers the new tag with the browser:

<pre style="font-size:25px;" data-lang="html">
<b alt="Mechanism to bundle HTML, CSS, and JS
into reusable, encapsulated components" data-tooltip="Mechanism to bundle HTML, CSS, and JS
into reusable, encapsulated components">&lt;element</b> <b class="red" alt="Custom tag's name. Must contain a '-'." data-tooltip="Custom tag's name. Must contain a '-'.">name</b>="x-foo" <b class="red" alt="DOM element's constructor.
(goes on global scope)." data-tooltip="DOM element's constructor.
(goes on global scope).">constructor</b>="XFoo">
 ...
<b>&lt;/element></b>
</pre>

---

title: Lifecycle callbacks
build_lists: true

By defining special methods, gain insight to element's life:

  - <b>`createdCallback`</b>
  - `enteredDocumentCallback`
  - `leftDocumentCallback`
  - `attributeChangedCallback(attrName, oldVal, newVal)`

---

title: Basic element definition
spec_link: https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/custom/index.html

<aside class="note">
  <section>
    <p><b>Note:</b> The declarative syntax on this page is still being discussed!</p>
  </section>
</aside>

<!-- <pre data-url="demos/components/x-foo.html" class="prettyprint" data-lang="x-foo.html">
</pre>
 -->

<pre class="prettyprint" data-lang="x-foo.html">
<b>&lt;element name="x-foo" constructor="XFoo"></b>
&lt;section>I'm an x-foo!&lt;/section>
&lt;script>
  var section = this.querySelector('section');
  this.register({
    prototype: {
      <b>createdCallback: function() {
        this.textContent = section.textContent; // this == &lt;x-foo>
      },</b>
      <b>foo: function() { alert('foo() called'); }</b>
    }
  });
&lt;/script>
<b>&lt;/element></b>
</pre>

<link rel="import" href="demos/components/x-foo.html">
<div class="component-demo">
  <x-foo></x-foo>
</div>

---

title: Using a custom element

After registration, use it like any standard DOM element

<div class="build">
<div>
  <p><b>Declare</b> it</p>
<pre class="prettyprint" data-lang="HTML">
&lt;x-foo>&lt;/x-foo>
</pre>
</div>
<div>
  <p><b>Create DOM</b> in JS</p>
<pre class="prettyprint" data-lang="JS">
var elem = document.createElement('x-foo');
elem.addEventListener('click', function(e) {
  <b>e.target.foo();</b> // alert 'foo() called'.
});
</pre>
</div>
<div>
<p><b>Use <code>new</code></b> (if the <code>constructor</code> attribute was defined)</p>
<pre class="prettyprint" data-lang="JS">
document.body.appendChild(<b>new XFoo()</b>);
</pre>
</div>

</div>

---

title: Extending existing HTML elements
subtitle: declarative version
build_lists: true

In an `<element>` definition, use the `extends` attribute:

<!-- <pre class="prettyprint" data-lang="HTML">
&lt;element name="mega-button" <b>extends="button"</b> constructor="MegaButton">
  ...
  &lt;script>
  Element.extend('mega-button', {
    createdCallback: {
      value: function() { ... }
    },
    ...
  });
  &lt;/script>
&lt;/element>
</pre> -->

<pre class="prettyprint" data-lang="mega-button.html">
&lt;element name="mega-button" <b>extends="button"</b>
         constructor="MegaButton">
  ...
&lt;/element>
</pre>

---

hidden: true
title: Extending existing HTML elements
subtitle: imperative version

Rock the `prototype` you want to inherit from:

<pre class="prettyprint" data-lang="JS">
var MegaButtonProto = Object.create(<b>HTMLButtonElement.prototype</b>);
...
var MegaButton = document.<a data-tooltip-property="register" data-tooltip-support='["webkit"]' data-tooltip-js>register</a>('mega-button', {prototype: MegaButtonProto});
</pre>

<div class="build">
<div>
<p>An instance is called a <span class="blue">type extension custom element</span></p>
<pre class="prettyprint" data-lang="JS">
// &lt;button is="mega-button">
var megaButton = <b>document.createElement('button', 'mega-button')</b>;

// megaButton instanceof MegaButton === true
</pre>
</div>
</div>

---

title: Registering elements in JS
subtitle: going the imperative route
spec_link: https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/custom/index.html#registering-custom-elements

- `document.register()` takes the tag name and description `prototype`: 

<pre class="prettyprint" data-lang="JS">
var XFooProto = <b>Object.create(HTMLElement.prototype)</b>;

// Setup optional lifecycle callbacks: created, entered, left, attributeChanged.
XFooProto.createdCallback = function() {
  this.textContent = "I'm an x-foo!";
};

// Define its properties/methods API.
XFooProto.foo = function() { alert('foo() called'); };
XFooProto.bar = 5;

<b>var XFoo = document.<a data-tooltip-property="register" data-tooltip-support='["webkit"]' data-tooltip-js>register</a>('x-foo', {prototype: XFooProto});</b>
//var xFoo = new XFoo();
//var xFoo = document.createElement('x-foo');
</pre>

---

title: Custom Elements
subtitle: browser support
class: nobackdrop nobackground browser-support
content_class: flexbox vcenter

<aside class="note">
  <section>
    <p>Support:</p>
    <p>Chrome 27 contains <code>document.register()</code> - <b>Enable Experimental WebKit features</b> in <code>about:flags</code>.</p>
  </section>
</aside>

<div class="browser-support-row">
  <div><img src="images/logos/browsers/safari_logo.png"></div>
  <div class="supported partial"><img src="images/logos/browsers/ff_nightly.png"></div>
  <div class="supported partial"><img src="images/logos/chrome_logo.png"></div>
  <div class="supported partial"><img src="images/logos/browsers/opera_logo.png"></div>
  <div><img src="images/logos/browsers/ie10_logo.png"></div>
</div>

---

title: Building blocks of Web Components
class: checkbox

<span class="auto-fadein"><img src="images/icons/checkcircle.svg" class="checkbox"></span> Custom Elements

<span class="spacer">HTML Templates</span>

<span class="spacer">Shadow DOM</span>

<span class="spacer">HTML Imports</span>


---

class: nobackdrop nobackground yum
content_class: flexbox vcenter centered

<h2 class="auto-fadein" style="font-size:100px">HTML Templates</h2>

---

title: Declaring a template
subtitle: DOM-based templating
spec_link: http://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/templates/index.html
build_lists: true

Chunks of inert markup for later use:

<pre class="prettyprint" data-lang="html">
<b>&lt;template id="mytemplate"></b>
  &lt;img src=""> &lt;!-- can be dynamically populated at runtime -->
  &lt;div class="comment">&lt;/div>
<b>&lt;/template></b>
</pre>

1. <label class="good"></label> Working directly w/ DOM
- <label class="good"></label> Parsed; not rendered
    - `<script>` not run, stylesheets/images not loaded, media not played
- <label class="good"></label> Hidden from document. Cannot traverse into its DOM
    - e.g. `document.querySelector('#mytemplate .comment') == null`

---

title: Using template content

Two ways to access the guts:

1. `template.content` (a document fragment)
- `template.innerHTML`

<p class="centered blue topmargin">Clone <code>.content</code> &rarr; stamp it out &rarr; goes "live"</p>

<!-- <pre class="prettyprint" data-lang="html">
&lt;template id="mytemplate">
  &lt;img src="">
  &lt;div class="comment">&lt;/div>
&lt;/template>
&lt;script>
  var t = document.querySelector('#mytemplate');
  <b>t.content.querySelector('img').src = 'logo.png';</b> // Populate the src at runtime.
  document.body.appendChild(<b>t.content.cloneNode(true)</b>);
&lt;/script>
</pre> -->

---

id: template-demo
title: Example
content_class: code-example html

<pre class="prettyprint" data-lang="html" data-run-demo>
<b>&lt;template></b>
  &lt;span>Instance: &lt;b>0&lt;/b>&lt;/span>
  &lt;script>alert('kthxbai!')&lt;/script>
<b>&lt;/template></b>
&lt;button onlclick="useIt()">Stamp&lt;/button>
&lt;script>
  function useIt() {
    <b>var content = document.querySelector('template').content;</b> // 1. Get guts.

    var b = <b>content.querySelector('b')</b>;
    b.textContent = parseInt(b.textContent) + 1; // 2. Modify template's DOM at runtime.

    document.body.appendChild(<b>content.cloneNode(true)</b>); // 3. Clone to stamp it out.
  }
&lt;/script>
</pre>

<template>
  <div>Instance: <b>0</b></div>
  <script>
  // Don't want browsers that don't support template to run this.
  // Also, FF seems to run <script> even though it's supposed to be inert until use.
  if ('HTMLTemplateElement' in window) {
    if (!navigator.userAgent.match('Firefox')) {
      alert('kthxbai!');
    }
  }
  </script>
</template>
<output></output>

---

#subtitle: Putting it together
#class: nobackdrop nobackground yum
content_class: flexbox vcenter centered

<h2 class="auto-fadein">Putting things together</h2><br>
<img src="images/gifs/sprinklecheese.gif" class="rounded reflect">
<h2 class="auto-fadein">Sprinkle in some <code><span class="green">&lt;template></span></code></h2>

---

title: Using <code>&lt;template></code> in an element

Wrapping markup in a `<template>` makes it inert until an instance is created:

<pre class="prettyprint" data-lang="html">
&lt;element name="x-foo">
  <b>&lt;template></b>
    &lt;link rel="stylesheet" href="element.css">
    &lt;img src="profile.png">
    &lt;div class="comment">&lt;/div>
  <b>&lt;/template></b>
  &lt;script>...&lt;/script>
&lt;/element>
</pre>

---

title: HTML Templates
subtitle: browser support
class: nobackdrop nobackground browser-support
content_class: flexbox vcenter

<div class="browser-support-row">
  <div><img src="images/logos/browsers/safari_logo.png"></div>
  <div class="mobile supported"><img src="images/logos/browsers/ff_nightly.png"></div>
  <div class="mobile supported"><img src="images/logos/chrome_logo.png"></div>
  <div class="mobile supported"><img src="images/logos/browsers/opera_logo.png"></div>
  <div><img src="images/logos/browsers/ie10_logo.png"></div>
</div>

---

title: Building blocks of Web Components
class: checkbox

<span><img src="images/icons/checkcircle.svg" class="checkbox"></span> Custom Elements

<span class="auto-fadein"><img src="images/icons/checkcircle.svg" class="checkbox"></span> HTML Templates

<span class="spacer">Shadow DOM</span>

<span class="spacer">HTML Imports</span>

---

class: nobackdrop nobackground yum shadow
content_class: flexbox vcenter centered

<h2 class="auto-fadein"><img src="images/logos/incognito.jpg" height="90" width="90" class="rounded" alt="Shadow DOM Dude" title="Shadow DOM Dude"> DOM</h2>

---

class: nobackground highlight fill
image: images/bgs/shadowdom-car-front.jpg

---

content_class: flexbox vcenter quote

<div>
<img src="images/logos/incognito.jpg" height="140" width="140" class="rounded" style="box-shadow:1px 3px 7px #aaa;float:right;" alt="Shadow DOM Dude" title="Shadow DOM Dude">
<blockquote>
  Shadow DOM gives us <span class="green">markup encapsulation</span>, <span class="red">style boundaries</span>, and exposes (to web developers) the same <span class="blue">mechanics browsers vendors have been using</span> to implement their internal UI.
</blockquote>
</div>

<div class="author">
  <span>-<a href="http://google.com/+EricBidelman">me</a></span>
</div>

---

hidden: true
id: web-has-encapsulation
title: The web has encapsulation...
class: large
content_class: flexbox vcenter centered

<h2 class="build" style="margin-top:-1em;"><code>&lt;iframe&gt;</code></h2>

<div class="fail build">
  <h2>Bloated</h2>
</div>

---

title: There's more lurking in the shadows...
build_lists: true

- <span class="green"><em>Truth #1</em></span>: Elements can "host" hidden DOM
- <span class="green"><em>Truth #2</em></span>: It can't be accessed from outside JS

<p class="build centered" style="zoom:2">
<input type="date" /> <input type="time">
</p>
<p class="build centered" style="font-size:35px;margin-top:-20px">
  <code>&lt;input type="date"&gt;</code> <code>&lt;input type="time"&gt;</code>
</p>

- Other examples: <code>&lt;video&gt;</code> <code>&lt;textarea&gt;</code> <code>&lt;details&gt;</code>

<p class="topmargin centered build" style="font-size:35px;font-style:italic;"><span class="bold">Shadow DOM <b class="red">hides implementation details</b></span></p>

---

id: shadow-dom-creating
title: Using Shadow DOM
subtitle: encapsulate the guts of an element
spec_link: http://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#extensions-to-element
h5r_link: http://www.html5rocks.com/tutorials/webcomponents/shadowdom/
content_class: smaller

<aside class="note">
  <section>
    <img src="images/shadow/shadow-rendering.svg" style="width: 100%;">
  </section>
</aside>

<pre class="prettyprint" data-lang="Host element">
&lt;my-element>...&lt;/my-element>
&lt;script>
var shadow = document.querySelector('my-element')<b>.<a data-tooltip-property="createShadowRoot" data-tooltip-support='["webkit"]' data-tooltip-js>createShadowRoot</a>();</b>
<b>shadow.innerHTML = '&lt;h2>Shadow DOMing!&lt;/h2>' +
                   '&lt;div&gt;awesome content&lt;/div&gt;';</b>
&lt;/script>
</pre>

<pre class="prettyprint" data-lang="Composed tree">
&lt;my-element>
  <span style="opacity:0.5">#document-fragment</span>
    &lt;h2>Shadow DOMing!&lt;/h2>
    &lt;div>awesome content&lt;/div>
&lt;/my-element>
</pre>

<!-- 
<pre class="prettyprint" data-lang="js" style="clear:both">
var shadow = document.querySelector('my-element')<b>.<a data-tooltip-property="createShadowRoot" data-tooltip-support='["webkit"]' data-tooltip-js>createShadowRoot</a>();</b>
<b>shadow.innerHTML = '&lt;h2>Shadow DOMing!&lt;/h2>' +
                   '&lt;div>awesome content&lt;/div>';</b>
</pre> -->

<div class="host"></div>

<script>
(function() {
var shadow = document.querySelector('#shadow-dom-creating .host').createShadowRoot();
shadow.innerHTML = '<h2>Shadow DOMing!</h2>' +
                   '<div>awesome content</div>';
})();
</script>

---

id: insertion-point-api
title: Define an internal structure with insertion points

<pre class="prettyprint" data-lang="my-tabs.html">
<b>&lt;element name="my-tabs"></b>
  &lt;template>
    &lt;style>...&lt;/style>
    <b>&lt;content select="h2">&lt;/content></b>
    <b>&lt;content select="section">&lt;/content></b>
  &lt;/template>
<b>&lt;/element></b>
</pre>

<pre class="prettyprint" data-lang="html">
<b>&lt;my-tabs></b>
  &lt;h2>Title&lt;/h2>
  &lt;section>content&lt;/section>
  &lt;h2>Title 2&lt;/h2>
  ...
<b>&lt;/my-tabs></b>
</pre>

<div class="build" style="position: absolute;bottom:70px;
right: 190px;">
<img src="images/screenshots/tabs.png" style="height: 300px;
width: auto;
box-shadow: 0 0 5px #999;">
</div>

---

title: Demo: Meme Generator

<pre class="prettyprint" data-lang="html" data-run-demo="http://html5-demos.appspot.com/static/webcomponents/demos/components/my-components/meme.html">
&lt;my-meme src="images/beaches.jpg">
  &lt;h1 contenteditable>Stay classy&lt;/h1>
  &lt;h2 contenteditable>Web!&lt;/h2>
&lt;/my-meme>
</pre>

---

id: shadow-style-control
title: Style encapsulation for free
h5r_link: http://www.html5rocks.com/tutorials/webcomponents/shadowdom-201/#toc-style-scoped

<aside class="note">
  <section>
    <img src="images/shadow/shadow-rendering.svg" style="width: 100%;">
  </section>
</aside>

- Styles defined in Shadow DOM are scoped by default
- Page styles don't bleed across the shadow boundary (unless we let them)

<pre class="prettyprint" data-lang="js">
var shadow = document.querySelector('my-element').<a data-tooltip-property="createShadowRoot" data-tooltip-support='["webkit"]' data-tooltip-js>createShadowRoot</a>();
shadow.innerHTML = '<b>&lt;style>h2 { color: red; }&lt;/style></b>' + 
                   '&lt;h2>Shadow DOMing!&lt;/h2>' + 
                   '&lt;div>awesome content&lt;/div>';
<b data-action-resetstyleinheritance title="click me">// shadow.resetStyleInheritance = true;</b> // click me
<b data-action-applyauthorstyles title="click me">// shadow.applyAuthorStyles = true;</b> // click me
</pre>

<div class="host" style="margin-bottom:1em;">
  <h1>My Title</h1>
  <h2>My Subtitle</h2>
  <div>...other content...</div>
</div>

<span class="source">Article on styling: [www.polymer-project.org/articles/styling-elements.html](http://www.polymer-project.org/articles/styling-elements.html)</span>

<script>
(function() {
var shadow = document.querySelector('#shadow-style-control .host').createShadowRoot();
// See crbug.com/162517 - !important needed for some reason.
shadow.innerHTML = '<style>h2 { color: red; }</style>' + 
                   '<h2>Shadow DOMing!</h2>' + 
                   '<div>awesome content</div>';

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
title: Self-styling elements
spec_link: http://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html#host-at-rule
h5r_link: http://www.html5rocks.com/tutorials/webcomponents/shadowdom-201/#toc-style-host

- Rules in an `@host` block target your element.
- Default styles or reacting to different states:

<pre class="prettyprint" data-lang="Shadow DOM CSS">
&lt;style>
  <b>@host</b> {
    :scope { display: inline-block; <a data-tooltip-property="transition" data-tooltip-support='["webkit", "moz", "ms", "o", "unprefixed"]'>transition</a>: background 200ms ease-in-out; }
    :scope:hover { color: white; background-color: black; }
    :scope:active { top: 2px; left: 2px; position: relative; }
  }
&lt;/style>
</pre>

<div class="host"></div>

<script>
(function() {
var shadow = document.querySelector('#shadow-host-at .host').createShadowRoot();
shadow.innerHTML = '<style>' + 
'@host {\
  :scope {\
    display: inline-block;\
    -webkit-transition: all 200ms ease-in-out;\
    transition: background-color 400ms ease-in-out;\
    cursor: pointer;\
    padding: 10px;\
    border-radius: 5px;\
  }\
  :scope:hover {\
    background-color: black;\
    color: white;\
  }\
  :scope:active {\
    position: relative; \
    top: 2px;\
    left: 2px; \
  }\
}</style>' + 
'<h2>Shadow DOMing!</h2>' + 
'<div>awesome content</div>';

})();
</script>

---

#class: nobackdrop nobackground yum
content_class: flexbox vcenter centered

<h2 class="auto-fadein">Putting it together</h2><br>
<img src="images/gifs/sprinkler.gif" class="rounded reflect">
<h2 class="auto-fadein" style="font-size:50px">Sprinkle in some <span class="green">Shadow DOM</span></h2>

---

title: Using Shadow DOM in an element
subtitle: encapsulate the details
content_class: smaller

Create Shadow DOM from `<template>` content:

<!-- <pre data-url="demos/components/x-foo-shadow.html" class="prettyprint" data-lang="x-foo-shadow.html">
</pre> -->

<pre class="prettyprint" data-lang="x-foo-shadow.html">
&lt;element name="x-foo-shadow">
  <b>&lt;template></b>
    <b>&lt;style>@host { :scope { background: #ffcc00; ... } }&lt;/style></b>
    &lt;section>I'm an x-foo-shadow. Gots me some Shadow DOM!&lt;/section>
  <b>&lt;/template></b>
  &lt;script>
    var template = this.querySelector('template');
    this.register({ prototype: {
      createdCallback: function() {
        <b>this.<a data-tooltip-property="createShadowRoot" data-tooltip-support='["webkit"]' data-tooltip-js>createShadowRoot</a>().appendChild(template.content.cloneNode(true));</b>
      }
    }});
  &lt;/script>
&lt;/element>
</pre>

<link rel="import" href="demos/components/x-foo-shadow.html">
<div class="component-demo">
  <x-foo-shadow></x-foo-shadow>
</div>

---

title: Shadow DOM
subtitle: browser support
class: nobackdrop nobackground browser-support
content_class: flexbox vcenter

<div class="browser-support-row">
  <div><img src="images/logos/browsers/safari_logo.png"></div>
  <div><img src="images/logos/browsers/ff_logo.png"></div>
  <div class="mobile supported"><img src="images/logos/chrome_logo.png"></div>
  <div class="mobile supported"><img src="images/logos/browsers/opera_logo.png"></div>
  <div><img src="images/logos/browsers/ie10_logo.png"></div>
</div>

---

title: Building blocks of Web Components
class: checkbox

<span><img src="images/icons/checkcircle.svg" class="checkbox"></span> Custom Elements

<span><img src="images/icons/checkcircle.svg" class="checkbox"></span> HTML Templates

<span class="auto-fadein"><img src="images/icons/checkcircle.svg" class="checkbox"></span> Shadow DOM

<span class="spacer">HTML Imports</span>

---

class: nobackdrop nobackground yum
content_class: flexbox vcenter centered

<h2 class="auto-fadein">HTML Imports</h2>

---

title: HTML Imports
subtitle: Package. Distribute. Share. Reuse.
spec_link: https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/imports/index.html

<pre class="prettyprint" data-lang="HTML">
&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    <b>&lt;link rel=&quot;import&quot; href=&quot;x-foo.html&quot;&gt;</b>
  &lt;/head&gt;
  &lt;body&gt;
    <b>&lt;x-foo&gt;&lt;/x-foo&gt;</b> &lt;!-- Element definition is in x-foo.html --&gt;
  &lt;/body&gt;
&lt;/html&gt;
</pre>

---

title: Reusing other components

<pre class="prettyprint" data-lang="awesome-menu.html">
<b>&lt;link rel="import" href="x-toolbar.html">
&lt;link rel="import" href="menu-item.html"></b>

&lt;element name="awesome-menu">
  &lt;template>
    <b>&lt;x-toolbar responsive="true">
      &lt;menu-item src="images/do.png" selected>Do&lt;/menu-item>
      &lt;menu-item src="images/re.png">Re&lt;/menu-item>
      &lt;menu-item src="images/mi.png">Mi&lt;/menu-item>
    &lt;x-toolbar></b>
  &lt;/template>
  ...
&lt;/element>
</pre>

<pre class="prettyprint" data-lang="app.html">
&lt;link rel="import" href="awesome-menu.html">
&lt;awesome-menu>&lt;/awesome-menu>
</pre>

---

title: HTML Imports
subtitle: browser support
class: nobackdrop nobackground browser-support
content_class: flexbox vcenter

<div class="browser-support-row">
  <div><img src="images/logos/browsers/safari_logo.png"></div>
  <div><img src="images/logos/browsers/ff_logo.png"></div>
  <div><img src="images/logos/chrome_logo.png"></div>
  <div><img src="images/logos/browsers/opera_logo.png"></div>
  <div><img src="images/logos/browsers/ie10_logo.png"></div>
</div>

---

title: Building blocks of Web Components
class: checkbox

<img src="images/icons/checkcircle.svg" class="checkbox"> HTML Templates

<img src="images/icons/checkcircle.svg" class="checkbox"> Shadow DOM

<img src="images/icons/checkcircle.svg" class="checkbox"> Custom Elements

<span class="auto-fadein"><img src="images/icons/checkcircle.svg" class="checkbox"></span> HTML Imports

---

class: nobackdrop nobackground
content_class: flexbox vcenter centered animatedfull

<img src="images/gifs/slowmowaterballoon.gif" class="rounded reflect">

---

class: nobackdrop nobackground yum
content_class: flexbox vcenter centered

<h2 class="auto-fadein"><img src="images/logos/toolkit_logo.svg" style="height:90px;box-shadow:none">Polymer</h2><br>
<h3 class="auto-fadein"><a href="http://polymer-project.org">polymer-project.org</a></h3>

---

title: What is it?
build_lists: true

- New type of library for the evolving web (**~35KB**)
    - goal: [support](http://www.polymer-project.org/compatibility.html) latest version of modern browsers
- Set of polyfill libraries 
    - Shadow DOM, Custom Elements, MDV, ...
- Sugaring layer
    - expresses opinionated way use these new APIs together
- Comprehensive set of UI Components (in progress)

---

title: Architecture stack
class: nobackdrop nobackground
content_class: flexbox vcenter centered animatedfull

<img src="images/polymer/architecture-diagram.png">


---
title: Philosophy 

- Love <span class="blue bold">HTML/DOM</span>!
    - Custom Elements are its core
    - everything is a custom element
- <span class="green bold">Evolve with the web</span> platform
- <span class="blue bold">Minimize boilerplate</span> code
    - remove tediousness of building web apps
- Be <span class="green bold">feedback loop</span> to web platform standards
- Salt to taste - entire stack is designed to be <span class="blue bold">a la carte</span>

<div class="build centered" style="margin-top:50px;"><p>Leverages <span class="red bold">Web Components</span> and <span class="red bold">gets better</span> as the web platform evolves.</p></div>

---

title: Polymer features
subtitle: create super-charged custom elements

- Less boilerplate
- Simplified element registration
- Declarative data-binding using MDV
- Declarative event mappings
- Published attributes
- Change watchers
- Automatic node finding (`this.$.nameInput.value = 5`)

---

title: Remember custom elements w/o Polymer...

<pre class="prettyprint" data-lang="my-input.html">
&lt;element name="my-input" constructor="MyInput">
  &lt;template>
    ...
  &lt;/template>
  &lt;script>
    var template = this.querySelector('template');
    this.register({
      prototype: {
        <b>created function() {
          this.<a data-tooltip-property="createShadowRoot" data-tooltip-support='["webkit"]' data-tooltip-js>createShadowRoot</a>().appendChild(
                template.content.cloneNode(true));
        }</b>
      }
    });
  &lt;/script>
&lt;/element>
</pre>

---

title: Polymer element

Look ma, no script!

<pre>
&lt;polymer-element name="my-input" constructor="MyInput" noscript>
  &lt;template>
    ...
  &lt;/template>
&lt;/polymer-element>
</pre>

<pre>
<b>&lt;script src="polymer.min.js">&lt;/script></b>
&lt;my-input&gt;&lt;/my-input&gt;
</pre>

---

title: More complex elements

Define properties/methods:

<pre>
&lt;polymer-element name="my-input" <b>attributes="type"</b>>
  &lt;template>...&lt;/template>
  &lt;script>
    <b>Polymer('my-input', {
      createdCallback: function() { ... },
      type: 'mytype'
    });</b>
  &lt;/script>
&lt;/polymer-element>
</pre>

De-coupling script:

<pre>
&lt;polymer-element name="my-input">
  &lt;template>...&lt;/template>
  <b>&lt;script src="path/to/myinput-element.js">&lt;/script></b> &lt;!-- Calls Polymer() -->
&lt;/polymer-element>
</pre>

---

title: Use the sugaring

<pre data-run-demo="http://jsbin.com/okukun/6/edit">
&lt;polymer-element name="my-input" <b>attributes="color type"</b>>
  &lt;template>
    &lt;input type="<b>{{type}}</b>" style="<b>color:{{color}}</b>" <b>on-click="onClick"</b>>
  &lt;/template>
  &lt;script>
    <b>Polymer('my-input', {
      type: 'text',
      color: 'red',
      colorChanged: function() { console.log('New color: ' + this.color); },
      onClick: function(e) { alert(e); }
    });</b>
  &lt;/script>
&lt;/polymer-element>

&lt;my-input type="text"&gt;&lt;/my-input&gt;
</pre>

---

class: nobackdrop nobackground
content_class: flexbox vcenter centered animatedfull

<img src="images/gifs/awwwyeah.gif" class="rounded reflect">

---

title: Try it today? Yes!

- Use Chrome Canary, turn on:
  - **Enable Experimental Web Platform features** in `about:flags`
  - **Enable experimental JavaScript** in `about:flags`
  - Enable **Show Shadow DOM** in DevTools

- - -

- Watch [Cr-Blink-WebComponents](https://code.google.com/p/chromium/issues/list?q=label:Cr-Blink-WebComponents) bug hotlist
- Try [Polymer](http://polymer-project.org)!
