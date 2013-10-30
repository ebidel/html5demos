title: about:me
id: who

<p class="avatar rounded"></p>

<p>Eric Bidelman</p>
<p>Staff Developer Programs Engineer, <img src="images/logos/google_logo.png" style="height: 30px;margin: 0;"> <img src="images/logos/chrome_logo.png" style="height:27px;margin:0;vertical-align: top;"></p>

<p class="topmargin"></p>

<i class="icon icon-google-plus"></i>
<a rel="author" href="http://google.com/+EricBidelman">google.com/+EricBidelman</a>

<i class="icon icon-twitter"></i>
<a rel="author" href="http://twitter.com/ebidel">@ebidel</a>

<i class="icon icon-bookmark"></i> 
<a rel="author" href="http://www.ericbidelman.com">ericbidelman.com</a>

<p class="topmargin">
<img src="images/logos/h5rlogo.png" style="width: 50px;"><a href="http://html5rocks.com">html5rocks.com</a>
</p>

"[Using the HTML5 Filesystem API](http://www.amazon.com/Using-HTML5-Filesystem-Eric-Bidelman/dp/1449309453 )" - O'Reilly 

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

<iframe data-src="http://html5-demos.appspot.com/gangnam" style="height:170px;border:none"></iframe>

---

hidden: true
title: Meme Generator

<pre class="prettyprint" data-lang="html" data-run-demo="http://html5-demos.appspot.com/static/webcomponents/demos/components/my-components/meme.html">
&lt;my-meme src="images/beaches.jpg">
  &lt;h1 contenteditable>Stay classy&lt;/h1>
  &lt;h2 contenteditable>Web!&lt;/h2>
&lt;/my-meme>
</pre>

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

id: tab-examples
title: Building a tab component on the web...

<div class="build flexbox vcenter centered">
<img src="images/screenshots/tabs/jquery.png">
<img src="images/screenshots/tabs/yui.png">
<img src="images/screenshots/tabs/angular.png">
<img src="images/screenshots/tabs/kendo.png">
<img src="images/screenshots/tabs/sencha.png">
<img src=""> <!-- intentional. holder to see all images together -->
</div>

---

title: Something feels very wrong here...
body_class: insane
class: nobackdrop nobackground highlight

---

title: Readable?
body_class: readable
class: nobackdrop nobackground highlight

---

title: This is how we build web apps!
body_class: howwebuildapps
class: nobackdrop nobackground highlight
#content_class: flexbox vcenter centered animatedfull

<!-- <img src="images/gifs/wtf.gif" class="rounded" style="height:550px;"> -->

---

title: Markup can be meaningful again

<pre class="prettyprint" data-lang="html" data-run-demo="https://html5-demos.appspot.com/hangouts">
&lt;hangout-module>
  &lt;hangout-chat from="Paul, Addy" profile="118075919496626375791">
    &lt;hangout-discussion>
      &lt;hangout-message from="Paul" profile="profile.png" datetime="2013-07-17T12:02">
        &lt;p>Feelin' this Web Components thing.&lt;/p>
        &lt;p>Heard of it?&lt;/p>
      &lt;/hangout-message>
      &lt;hangout-message from="Addy" datetime="2013-07-17T12:12">...&lt;/hangout-message>
      &lt;hangout-message>...&lt;/hangout-message>
      ...
    &lt;/hangout-discussion>
  &lt;/hangout-chat>
  &lt;hangout-chat>&lt;/hangout-chat>
&lt;/hangout-module>
</pre>

---

id: thumbsup
class: large
content_class: flexbox vcenter centered

<div class="build">
  <h2><i class="icon icon-thumbs-up"></i></h2>
</div>

---

class: large
content_class: flexbox vcenter centered

<h2 class="auto-fadein">Need better tools...</h2>

---

title: Web Components specs
build_lists: true
body_class: platform-bg
spec_link: https://dvcs.w3.org/hg/webcomponents/raw-file/tip/explainer/index.html

- [Shadow DOM](https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/shadow/index.html)
    - DOM &amp; style encapsulation
- [HTML Templates](http://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/templates/index.html)
    - inert chunks of DOM activated when needed
- [Custom Elements](https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/custom/index.html)
    - <span class="bold">create</span> new HTML elements, <span class="bold">extend</span> existing DOM objects
- [HTML Imports](https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/imports/index.html)
    -  bundle and distribute common HTML/CSS/JS (e.g. components)

- - - 

- [Data-binding](http://www.polymer-project.org/docs/polymer/databinding.html)  - pieces are spec'd (`Object.observe()`, `<template>`, Mutation Observers)

<p class="centered build" style="margin-top:1em;font-size:35px;font-style:italic;">
  <span class="green"><b>A collection of new API primitives in the browser</b></span>
</p>

---

class: nobackdrop nobackground yum
content_class: flexbox vcenter centered

<h2 class="auto-fadein"><img src="images/polymer/polymer-p.png" style="height:90px;box-shadow:none;margin-right:10px;">Polymer</h2><br>
<h3 class="auto-fadein"><a href="http://polymer-project.org">polymer-project.org</a></h3>

---

content_class: flexbox vcenter quote

<blockquote>
  Polymer is a <span class="blue">new type of library</span> for the web, built on top of <span class="platform">Web Components</span>, and designed to leverage the <span class="core">evolving web platform</span> &#8230; on <b>modern browsers</b>.
</blockquote>

---

title: What is it?
build_lists: true

<span class="pull-right auto-fadein"><img src="images/polymer/architecture-diagram.png" style="height:400px"></span>

- New type of library for the evolving web (**~48KB**)
    - goal: [support](http://www.polymer-project.org/compatibility.html) latest version of modern browsers
- Set of <span class="platform">polyfill libraries</span> for the specs
    - Shadow DOM, Custom Elements, HTML Imports, Pointer Events...
- <span class="core">Sugaring layer</span>
    - expresses opinionated way to use web component concepts together
- Comprehensive set of <span class="elements">UI Components</span> (in progress)

---
title: Philosophy / Goals
build_lists: true

**Philosophy**

1. Utilize the modern web <b class="platform">platform</b>.
- Embrace DOM. Everything as an <b class="elements">element</b>.
- <b class="core">Eliminate boilerplate</b>. Remove tediousness of building web apps.

**Goals**

1. Provide <span class="blue bold">opinionated guidance</span> on building web component-based apps.
- Salt to taste - entire stack is designed to be <span class="blue bold">a la carte</span>
- <span class="blue bold">Evolve</span> with the web
- Constant <span class="blue bold">feedback loop</span> to web standards

---

title: Polymer <label class="elements">elements <i class="icon-puzzle-piece elements"></i></label>
subtitle: <a href="http://www.polymer-project.org/docs/elements/" class="nounderline">polymer-project.org/docs/elements/</a>
class: nobackdrop nobackground segue elements
#content_class: flexbox vcenter
keep_content: true

<div class="overlay top"></div>
<div class="overlay bottom"></div>

---

content_class: flexbox vcenter quote
class: nobackdrop nobackground

<blockquote class="large">Embrace DOM.<br>Everything as an element.</blockquote>

---

id: polymer-ajax-demo
title: Everything is an element
subtitle: perform AJAX...using DOM
body_class: elements-bg

<pre class="corner prettyprint">
&lt;script src="<span alt="bower install polymer" data-tooltip="bower install polymer">polymer.min.js</span>">&lt;/script>
&lt;link rel="import" href="<span alt="bower install polymer-elements" data-tooltip="bower install polymer-elements">polymer-ajax.html</span>">
</pre>

<pre class="prettyprint" style="font-size:25px;">
<b>&lt;polymer-ajax url="http://gdata.youtube.com/feeds/api/videos/"
              params='{"alt":"json"}'>&lt;/polymer-ajax></b>
</pre>

<pre class="prettyprint" data-lang="JS" data-run-demo>
var ajax = document.querySelector('polymer-ajax');
ajax.addEventListener(<b>'polymer-response'</b>, function(e) {
  var response = JSON.parse(<b>this.response</b>);
  console.log(response.feed.entry);
});
...
<b>ajax.go();</b>
</pre>

<div class="component-demo">
<link rel="import" href="polymer-all/polymer-elements/polymer-ajax/polymer-ajax.html">
<output><div>Hit run...</div></output>
</div>

---

title: Real-world examples of polymer-ajax
class: nobackdrop
content_class: flexbox vcenter centered
body_class: elements-bg

<h2 style="margin-top:-100px;"><a href="http://www.chromestatus.com/features">chromestatus.com/features</a></h2>

<h2 style="margin-top:50px;"><a href="http://www.polymer-project.org/build/">polymer-project.org/build/</a></h2>


---

id: polymer-file-demo
title: Everything is an element
subtitle: read files...using DOM
body_class: elements-bg

<pre class="corner prettyprint">
&lt;script src="<span alt="bower install polymer" data-tooltip="bower install polymer">polymer.min.js</span>">&lt;/script>
&lt;link rel="import" href="<span alt="bower install polymer-elements" data-tooltip="bower install polymer-elements">polymer-file.html</span>">
</pre>

<pre class="prettyprint centered" style="font-size:25px;">
&lt;polymer-file <b data-tooltip="'dataurl', 'arraybuffer', 'binarystring', 'text'">readas</b><b>="dataurl"</b>>&lt;/polymer-file>
</pre>

<pre class="prettyprint" data-lang="JS" data-run-demo>
var pFile = document.querySelector('polymer-file');

pFile.addEventListener(<b>'polymer-result'</b>, function(e) {
  console.log(<b>this.result</b>);
});

<b>pFile.blob = new Blob(['abc'], {type: 'text/plain'});</b> // Set the file to read

<b>pFile.read();</b>
</pre>

<div class="component-demo">
<link rel="import" href="polymer-all/polymer-elements/polymer-file/polymer-file.html">
<output><div>Hit run...</div></output>
</div>

---

id: polymer-flex-demo
title: Everything is an element
subtitle: flexbox layout...using DOM
body_class: elements-bg

<pre class="corner prettyprint">
&lt;script src="<span alt="bower install polymer" data-tooltip="bower install polymer">polymer.min.js</span>">&lt;/script>
&lt;link rel="import" href="<span alt="bower install polymer-elements" data-tooltip="bower install polymer-elements">polymer-flex-layout.html</span>">
</pre>

<pre class="prettyprint" data-lang="HTML">
&lt;polymer-flex-layout <b data-action="vertical">vertical</b> <b>iscontainer</b>>
  &lt;div>Header&lt;/div>
  &lt;div <b data-action="flex">flex</b>>Body&lt;/div>
  &lt;div>Footer&lt;/div>
&lt;/polymer-flex-layout>
</pre>


<div class="component-demo" style="height:100%">
<link rel="import" href="polymer-all/polymer-elements/polymer-flex-layout/polymer-flex-layout.html">
<output>
  <polymer-flex-layout vertical iscontainer title="Click me to add children">
    <div>Header</div>
    <div flex>Body</div>
    <div>Footer</div>
  </polymer-flex-layout>
</output>

</div>

---

title: Polymer elements
subtitle: non-visual utility elements
body_class: elements-bg
content_class: columns-2

<span class="bold blue">Layout</span>

`<polymer-layout>`

`<polymer-flex-layout>`

`<polymer-grid-layout>`

<span class="bold blue">View</span>

`<polymer-media-query>`

`<polymer-page>`

<span class="bold blue">Services / libs</span>

`<polymer-shared-lib>`

`<polymer-google-jsapi>`

<span class="bold blue">Data</span>

`<polymer-localstorage>`

`<polymer-xhr>`

`<polymer-jsonp>`

`<polymer-file>`

`<polymer-meta>` 

<span class="bold blue">Behavior / interaction</span>

`<polymer-signals>`

`<polymer-selector>`

---

id: polymer-ui-elements
title: Polymer UI elements
subtitle: visual elements
body_class: elements-bg

<div class="pull-right flexbox vcenter" style="width: 40%;margin-top:-100px;">
  <img src="images/polymer/uielements/polymer-ui-tabs.png" style="width:100%">
  <div class="flexbox vcenter" style="height:auto;">
  <img src="images/polymer/uielements/sidebarmenu.png">
  <img src="images/polymer/uielements/polymer-ui-toggle-button.png" style="margin-left:20px;">
  </div>
  <img src="images/polymer/uielements/toolbar.png" style="width:100%">
</div>

`<polymer-ui-accordion>`

`<polymer-ui-animated-pages>`

`<polymer-ui-overlay>`

`<polymer-ui-card>` [demo](http://www.polymer-project.org/polymer-all/polymer-ui-elements/polymer-ui-card/index.html)

`<polymer-ui-sidebar-menu>` [demo](http://www.polymer-project.org/polymer-all/polymer-ui-elements/polymer-ui-sidebar-menu/index.html)

`<polymer-ui-tabs>` [demo](http://www.polymer-project.org/polymer-all/polymer-ui-elements/polymer-ui-tabs/index.html)

`<polymer-ui-toggle-button>` [demo](http://www.polymer-project.org/polymer-all/polymer-ui-elements/polymer-ui-toggle-button/index.html)

`<polymer-ui-theme-aware>`

...

<div class="build centered bold"><span><b class="green">Reusablilty</b>...the non-visual polymer-elements are used to implement these!</span></div>

---

title: Polymer <label class="core">core <i class="icon-beaker core"></i></label>
subtitle: <a href="http://www.polymer-project.org/polymer.html" class="nounderline">polymer-project.org/polymer.html</a>
class: nobackdrop nobackground segue core
#content_class: flexbox vcenter
keep_content: true

<div class="overlay top"></div>
<div class="overlay bottom"></div>

---

class: nobackdrop nobackground
content_class: flexbox vcenter quote

<blockquote class="large">Eliminate boilerplate.</blockquote>

---

title: Polymer's core sugaring features
subtitle: declarative web components in seconds
body_class: core-bg
build_lists: true

- Declarative element registration: `<polymer-element>`
- Declarative inheritance: `<polymer-element extends="...">`
- Declarative two-way data-binding: `<input id="input" value="{{foo}}">`
- Declarative event handlers: `<button on-click="{{handClick}}">`
- Published properties: `xFoo.bar = 5 <-> <x-foo bar="5">`
- Property change watchers: `barChanged: function() {...}`
- Automatic node finding: `this.$.input.value = 5`

<div class="build centered bold topmargin blue">
<span style="font-size:50px;">Be declarative. Write less code.</span>
</div>

---

title: Custom elements without Polymer :(
body_class: platform-bg

    <template id="template">
      <style>input { color: orange; }</style>
      <input type="text">
    </template>

    <script>
    var proto = Object.create(HTMLElement.prototype, {
      createdCallback: {
        value: function() {
          var t = document.querySelector('#template');
          this.createShadowRoot().appendChild(t.content.cloneNode(true));
        }
      }
    });

    var MyInput = document.register('my-input', {prototype: proto});
    </script>

---

title: Custom elements with Polymer :)
subtitle: declarative custom elements
body_class: core-bg

<pre class="corner prettyprint">
&lt;script src="<span alt="bower install polymer" data-tooltip="bower install polymer">polymer.min.js</span>">&lt;/script>
</pre>

1. Create an element definition

    <pre class="prettyprint" data-lang="HTML">
    &lt;polymer-element <b>name="my-input"</b> <b>constructor="MyInput"</b> <b data-tooltip="Simple elements that don't call Polymer()">noscript</b>>
      &lt;!-- Note: Polymer creates Shadow DOM from the first &lt;template>. -->
      <b>&lt;template>
        &lt;style>input { color: orange; }&lt;/style>
        &lt;input type="text">
      &lt;/template></b>
    &lt;/polymer-element>
    </pre>

- Instantiate - **declare** it, **create DOM**, or **use `new`** in JS

        <my-input></my-input>
        // var myInput = document.createElement('my-input');
        // var myInput = new MyInput();

---

title: Default attributes
body_class: core-bg
polymer_link: http://www.polymer-project.org/polymer.html#defaultattrs

User-defined attributes are included on each instance of the element:

<pre class="prettyprint" data-lang="HTML">
&lt;polymer-element name="my-input" <b>customattr</b> <b>class="active"</b>>
  &lt;template>...&lt;/template>
&lt;/polymer-element>

&lt;my-input>&lt;/my-input>
</pre>

Instances include your attributes: 

<pre class="prettyprint centered" style="font-size:25px">
  &lt;my-input customattr class="active">&lt;/my-input>
</pre>

---

id: more-complex-elements
title: Complex elements require more juice...
subtitle: define an API
body_class: core-bg

<pre data-code-cycle class="prettyprint" data-lang="HTML" style="font-size:25px;line-height: 1.4;">
</pre>

<textarea selected>
<polymer-element name="my-input" noscript>
  <template>
    <style>input { color: orange; }</style>
    <input type="text">
  </template>
</polymer-element>
</textarea>
<textarea>
<polymer-element name="my-input">
  <template>
    <style>input { color: orange; }</style>
    <input type="text">
  </template>
  <script>Polymer('my-input');</script>
</polymer-element>
</textarea>
<textarea>
<polymer-element name="my-input">
  <template>
    <style>input { color: orange; }</style>
    <input type="text">
  </template>
  <script>
    Polymer('my-input', {
      type: 'text', 
      color: 'orange', 
      ready: function() {
        ...
      }
    });
  </script>
</polymer-element>
</textarea>
<textarea>
&lt;polymer-element name="my-input">
  &lt;template>
    &lt;link rel="stylesheet" href="styles.css">
    &lt;input type="text">
  &lt;/template>
  &lt;script src="path/to/elements/myinput.js">&lt;/script>
&lt;/polymer-element>
</textarea>

- Properties/methods are added to `prototype`
- `this` refers to the element itself (e.g. `this.localName == "my-input"`)
- Can reference external scripts/stylesheets (e.g. CSP friendly)

<!-- <pre class="prettyprint" data-lang="HTML">
&lt;polymer-element name="my-input" constructor="MyInput">
  &lt;template>
    <b>&lt;link rel="stylesheet" href="styles.css"></b>
    &lt;input type="text">
  &lt;/template>
  <b>&lt;script src="path/to/elements/myinput.js">&lt;/script></b>
&lt;/polymer-element>
</pre> -->

---

id: published-properties
title: Publishing properties & data-binding
body_class: core-bg
polymer_link: http://www.polymer-project.org/polymer.html#published-properties

2. **Inside** the element &rarr; data-binding via the attribute
2. From **outside** world &rarr; users can initialization the property via its attribute

<pre data-code-cycle class="prettyprint" data-lang="HTML">
</pre>

<textarea selected>
<polymer-element name="my-input">
  <template>
    <input type="text" style="color: orange;">
  </template>
  <script>
    Polymer('my-input', {
      type: 'text', 
      color: 'orange'
    });
  </script>
</polymer-element>
</textarea>
<textarea>
<polymer-element name="my-input">
  <template>
    <input type="{{type}}" style="color: {{color}};">
  </template>
  <script>
    Polymer('my-input', {
      type: 'text', 
      color: 'orange'
    });
  </script>
</polymer-element>
</textarea>
<textarea>
<polymer-element name="my-input" attributes="type color">
  <template>
    <input type="{{type}}" style="color: {{color}};">
  </template>
  <script>
    Polymer('my-input', {
      type: 'text', 
      color: 'orange'
    });
  </script>
</polymer-element>
<my-input color="red"></my-input>
</textarea>
<textarea>
<polymer-element name="my-input" attributes="type color">
  <template>
    <input type="{{type}}" style="color: {{color}};" value="{{val}}">
    &lt;textarea value="{{val}}">&lt;/textarea>
  </template>
  <script>
    Polymer('my-input', {
      type: 'text', 
      color: 'orange'
    });
  </script>
</polymer-element>
<my-input color="red"></my-input>
</textarea>

- User overrides `color` but `type` remains its default ("text")
- Since `val` isn't published, can't use it as a bindable attribute.

---

title: Features in action
subtitle: data-binding / published properties
body_class: core-bg
content_class: smaller

Using `<polymer-ajax>` in another element:

<pre class="corner prettyprint">
&lt;script src="<span alt="bower install polymer" data-tooltip="bower install polymer">polymer.min.js</span>">&lt;/script>
&lt;link rel="import" href="<span alt="bower install polymer-elements" data-tooltip="bower install polymer-elements">polymer-ajax.html</span>">
</pre>

<pre style="font-size:16px;" class="prettyprint" data-lang="html">
&lt;polymer-element name="youtube-videos" attributes="query">
  &lt;template>
    &lt;polymer-ajax url="http://gdata.youtube.com/feeds/api/videos/" params="<b>{{params}}</b>"
                  <b>handleAs="json"</b> <b>response="{{response}}"</b> <b>auto</b>>&lt;/polymer-ajax>
    &lt;ul>
      <b>&lt;template repeat="{{entry in response.feed.entry}}">
        &lt;li>{{entry.title.$t}}&lt;/li>
     &lt;/template></b>
    &lt;/ul>
  &lt;/template>
  &lt;script>
    Polymer('youtube-videos', {
      ready: function() {
        <b>this.params = {alt: 'json', q: this.query};</b>
      }
    });
  &lt;/script>
&lt;/polymer-element>

&lt;youtube-videos query="cats">&lt;/youtube-videos>
</pre>

---

title: Features in action
subtitle: $ node finding / changed watchers / declarative event handlers
body_class: core-bg
content_class: smaller 

Using `<polymer-file>` in another element:

<pre class="corner prettyprint">
&lt;script src="<span alt="bower install polymer" data-tooltip="bower install polymer">polymer.min.js</span>">&lt;/script>
&lt;link rel="import" href="<span alt="bower install polymer-elements" data-tooltip="bower install polymer-elements">polymer-file.html</span>">
</pre>

<pre class="prettyprint" data-lang="html">
&lt;polymer-element name="read-me" <b>on-click="{{onClick}}"</b>>
  &lt;template>
    &lt;polymer-file <b>id="file"</b> readas="arraybuffer" <b>result="{{result}}"</b>>&lt;/polymer-file>
  &lt;/template>
  &lt;script>
    Polymer('read-me', {
      <b>resultChanged: function() {</b>
       console.log(this.result);
      <b>},</b>
      <b>onClick: function(e, detail, sender) {
       this.$.file.read();
     }</b>
    });
  &lt;/script>
&lt;/polymer-element>
</pre>

<pre class="prettyprint" data-lang="User's JS">
var el = document.createElement('read-me');
<b>el.blob = new Blob(['abc'], {type: 'text/plain'});</b>
</pre>

---

title: Expressions
body_class: core-bg
polymer_link: http://www.polymer-project.org/docs/polymer/expressions.html

Expressions can go anywhere `{{}}` live:

    <div>Jill has {{ daughter.children.length + son.children.length }} grandchildren</div>

Dynamic classes:

    <div class="{{ {active: user.selected, big: user.type == 'super'} | tokenList }}"> 
    <!-- <div class="active big"> -->

Conditional attributes:

    <input type="checkbox" checked?="{{activate}}">

---

title: Dynamic markup
subtitle: additional magic for HTML <code>&lt;template></code>
body_class: core-bg
polymer_link: http://www.polymer-project.org/platform/template.html

Conditionals:

    <template if="{{ isActive }}">
      <!-- shown if isActive property is true -->
    </template>

    <template if="{{ showDefault || users.length < 10 }}">
      ...
    </template>

Iteration:

    <template repeat="{{ user in users }}">
      <template repeat="{{ file in user.files }}">
        {{ user.name }} owners {{ file.name }}
      </template>
    </template>

---

title: Features in action
subtitle: responsive design...using DOM
body_class: core-bg
content_class: smaller 

<pre class="corner prettyprint">
&lt;script src="<span alt="bower install polymer" data-tooltip="bower install polymer">polymer.min.js</span>">&lt;/script>
&lt;link rel="import" href="<span alt="bower install polymer-elements" data-tooltip="bower install polymer-elements">polymer-media-query.html</span>">
</pre>

<pre class="prettyprint" data-lang="html">
&lt;polymer-element name="responsive-element" attributes="responsive">
  &lt;template>
    <b>&lt;polymer-media-query query="max-width:640px"
          queryMatches="{{isPhone}}">&lt;/polymer-media-query></b>
    <b>&lt;polymer-media-query query="max-width:1024px"
          queryMatches="{{isTablet}}">&lt;/polymer-media-query></b>

    &lt;template if="{{isPhone && responsive}}">
     &lt;!-- Phone markup. -->
    &lt;/template>
    &lt;template if="{{isTablet && responsive}}">
     &lt;!-- Tablet markup. -->
    &lt;/template>
    &lt;template if="{{!responsive}}">
     &lt;!-- Default markup for non-responsive case. -->
    &lt;/template>

  &lt;/template>
  &lt;script>Polymer('responsive-element', {responsive: false});&lt;/script>
&lt;/polymer-element>

&lt;responsive-element <b>responsive</b>>&lt;/&lt;responsive-element>
</pre>

---

title: FOUC prevention
body_class: core-bg

Initially hide elements using `polymer-veiled` class or manage a list in JS:

1. Add `polymer-veiled` class:

        <x-foo class="polymer-veiled">If you see me, elements are upgraded!</x-foo>
        <div class="polymer-veiled"></div>

2. `Polymer.veiledElements = ['x-foo', 'div'];`

- - - -

- `polymer-unveiled` swapped in at `WebComponentsReady` event &rarr; elements fade-in.
- **Note:** `polymer-veiled` is added to `<body>` by default.

---

class: nobackdrop
content_class: flexbox vcenter centered

<h2>Polymer Sandbox</h2>
<h3 style="margin-top:15px;"><a href="http://www.polymer-project.org/tools/sandbox/">polymer-project.org/tools/sandbox/</a></h3>

---

title: Polymer <label class="platform">platform <i class="icon-cogs platform"></i></label>
class: nobackdrop nobackground segue platform
#content_class: flexbox vcenter
keep_content: true

<div class="overlay top"></div>
<div class="overlay bottom"></div>

---

class: platform nobackdrop nobackground
content_class: flexbox vcenter quote

<blockquote>Utilize the <b>modern</b> web platform.</blockquote>

---

class: large
content_class: flexbox vcenter centered

<h2 class="auto-fadein">1st-class support for spec features...</h2>

---

title: Lifecycle callbacks <label class="spec">Custom Elements</label>
body_class: platform-bg
polymer_link: http://www.polymer-project.org/polymer.html#lifecyclemethods

Support for the [lifecycle methods](http://www.polymer-project.org/polymer.html#lifecyclemethods)...but shorter names!

<pre class="prettyprint" data-lang="HTML">
Polymer('my-input', {
  ready: function() { ... }, // Polymer addition for when element is fully initialized.
  <b>created: function() { ... },</b>
  <b>enteredView: function() { ... },</b>
  <b>leftView: function() { ... },</b>
  <b>attributeChanged: function(attrName, oldVal, newVal) { ... }</b>
});
</pre>

Use cases:

- perform setup/teardown work
- notification when element is inserted/removed from page

---

id: insertion-point-api
title: Insertion points <label class="spec">Shadow DOM</label>
subtitle: define an internal structure
body_class: platform-bg

<pre class="prettyprint" data-lang="my-tabs.html">
&lt;polymer-element name="my-tabs" noscript>
  &lt;template>
    &lt;style>...&lt;/style>
    &lt;header>
      <b>&lt;content select="h2">&lt;/content></b>
    &lt;/header>
    <b>&lt;content select="section">&lt;/content></b>
  &lt;/template>
&lt;/polymer-element>
</pre>

<pre class="prettyprint" data-lang="html" data-run-demo="http://ebidel.github.io/polymer-experiments/polymer-and-angular/together/">
&lt;link rel="import" href="my-tabs.html">
<b>&lt;my-tabs></b>
  &lt;h2>Title&lt;/h2>
  &lt;section>content&lt;/section>
  &lt;h2>Title 2&lt;/h2>
  ...
<b>&lt;/my-tabs></b>
</pre>

<div class="build" style="position: absolute;bottom:20px;right:160px;">
<img src="images/screenshots/tabs.png" style="height: 300px;
width: auto;
box-shadow: 0 0 5px #999;">
</div>

---

title: Scoped styling <label class="spec">Shadow DOM</label>
body_class: platform-bg
polymer_link: http://www.polymer-project.org/articles/styling-elements.html

Support for styling features (scoped styles, `applyAuthorStyles`, etc.)

<pre class="prettyprint" data-lang="HTML">
&lt;polymer-element name="my-element">
  &lt;template>
    &lt;style>...&lt;/style> &lt;!-- Styles are scoped to the element -->
  &lt;/template>
  &lt;script>
    Polymer('my-element', {
      <b>applyAuthorStyles: true,</b>
      <b>resetStyleInheritance: false</b>
    });
  &lt;/script>
&lt;/polymer-element>
</pre>

- Polymer attempts to polyfill most Shadow DOM style features

---

hidden: true
class: nobackdrop nobackground yum
content_class: flexbox vcenter centered

<h2 class="auto-fadein">Custom Elements</h2>

---

hidden: true
title: Register new elements in HTML
spec_link: https://dvcs.w3.org/hg/webcomponents/raw-file/tip/spec/custom/index.html
h5r_link: http://www.html5rocks.com/en/tutorials/webcomponents/customelements/

<aside class="note">
  <section>
    <ul>
      <li>By default, custom elements inherit from <code>HTMLElement</code></li>
    </ul>
  </section>
</aside>

<pre class="prettyprint centered" data-lang="JS" style="font-size:28px;">
document.register('x-foo');
</pre>

- 1st arg: tag name must contain a "="
- 2nd arg: _optional_ object containing a `prototype`

<pre class="prettyprint" data-lang="JS">
// Equivalent to document.register('x-foo').
var XFoo = document.register('x-foo', {
  prototype: Object.create(HTMLElement.prototype)
});
</pre>

---

hidden: true
title: Instantiate a custom element

Once registered, use it like any standard DOM element:

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
var xFoo = document.createElement('x-foo');
xFoo.addEventListener('click', function(e) {
  alert('Thanks!');
});
</pre>
</div>
<div>
<p><b>Use <code>new</code></b></p>
<pre class="prettyprint" data-lang="JS">
var xFoo = <b>new XFoo()</b>;
document.body.appendChild(xFoo);
</pre>
</div>

</div>

---

hidden: true
title: Define an API
subtitle: add properties and methods

<pre class="prettyprint" data-lang="JS">
var proto = Object.create(HTMLElement.prototype);

<b>Object.defineProperty(proto, 'name', {value: 'Eric'});</b>

<b>proto.hello = function() {
  alert('Hiiiiii ' + this.name);
};</b>

var XFoo = document.register('x-foo', {prototype: proto});
</pre>

<pre class="prettyprint" data-lang="JS">
var el = document.createElement('x-foo');
// el.name == 'Eric'
// el.hello();
</pre>

---

hidden: true
title: Lifecycle callbacks
subtitle: hook into an element's voyage
build_lists: true

Four special methods (optional):

<pre class="prettyprint" data-lang="JS">
var proto = Object.create(HTMLElement.prototype);

<b>proto.createdCallback = function() {
  this.textContent = "I'm an x-foo!";
};</b>
proto.enteredViewCallback = function() { ... };
proto.leftViewCallback = function() { ... };
proto.attributeChangedCallback = function(attrName, oldVal, newVal) { ... };
</pre>

Use cases:

- perform setup/teardown work
- notified when element is inserted/removed from document

---

hidden: true
title: Demo

<!-- <pre data-url="demos/components/x-foo.html" class="prettyprint" data-lang="JS">
</pre> -->

<pre class="prettyprint" data-lang="HTML">
&lt;x-foo>&lt;/x-foo>

&lt;script>
var proto = Object.create(HTMLElement.prototype);
<b>proto.hello = function() {
  alert('Hiiii ' + this.name);
};</b>
...
document.register('x-foo', {prototype: proto});

document.querySelector('x-foo').addEventListener('click', function(e) {
  <b>e.target.hello();</b>
});
&lt;/script>
</pre>

<link rel="import" href="demos/components/x-foo.html">
<div class="component-demo">
  <x-foo></x-foo>
</div>

---

hidden: true
title: Extending native HTML elements

Inherit from the `prototype` of the element:

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

title: Bundle &amp; deliver CSS/HTML/JS <label class="spec">HTML Imports</label>
body_class: platform-bg

Reuse others' components:

<pre class="prettyprint" data-lang="awesome-menu.html">
<b>&lt;link rel="import" href="x-toolbar.html">
&lt;link rel="import" href="menu-item.html"></b>

&lt;polymer-element name="awesome-menu">
  &lt;template>
    <b>&lt;x-toolbar responsive>
      &lt;menu-item src="images/do.png" selected>Do&lt;/menu-item>
      &lt;menu-item src="images/re.png">Re&lt;/menu-item>
      &lt;menu-item src="images/mi.png">Mi&lt;/menu-item>
    &lt;x-toolbar></b>
  &lt;/template>
  ...
&lt;/polymer-element>
</pre>

<pre class="prettyprint" data-lang="User's page">
&lt;link rel="import" href="awesome-menu.html">
&lt;awesome-menu>&lt;/awesome-menu>
</pre>

---

hidden: true
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

hidden: true
title: Building blocks of Web Components
class: checkbox

<i class="icon icon-check-sign good"></i> Custom Elements

<i class="icon icon-check-sign good"></i> HTML Templates

<i class="icon icon-check-sign good"></i> Shadow DOM

<span class="auto-fadein"><i class="icon icon-check-sign good"></i></span> HTML Imports

---

title: Polymer is many things!
class: nobackdrop nobackground
content_class: flexbox vcenter centered animatedfull

<img src="images/polymer/architecture-diagram.png" class="auto-fadein" style="height:600px">

---

id: polymer-site
title: polymer-project.org
class: nobackdrop nobackground fill highlight
#image: images/polymer/homepage.png
body_class: site

---

title: Learn more about the primitives
body_class: platform-bg
content_class: flexbox vleft

<h3 style="margin-top:-100px;"><a href="http://ebidel.github.io/webcomponents/">ebidel.github.io/webcomponents/</a></h3>
<h3 style="margin-top:2em;"><a href="http://webcomponentsshift.com">webcomponentsshift.com</a></h3>
<h3 style="margin-top:2em;"><a href="http://www.html5rocks.com/en/search?q=web+components">html5rocks.com/en/search?q=web+components</a></h3>

---

title: Why <i>you</i> should be excited
build_lists: true

- Developer <span class="red"><b>productivity</b></span>
    - It's <b>DOM</b>. It's <b>JS</b>. It's <b>CSS</b> &rarr; no new APIs to learn!
    - say what you mean &rarr; readability
- <b><span class="green">Re-usability</span></b> at last
    - don't reinvent the wheel
    - easy interop with other frameworks
- Foster good software engineering <span class="blue"><b>paradigms</b></span> on web (OOP)

---

hidden: true
title: Try it today!

- Use Chrome Canary, turn on:
  - **Enable Experimental Web Platform features** in `about:flags`
  - **Enable experimental JavaScript** in `about:flags`
  - Enable **Show Shadow DOM** in DevTools

- - -

- Watch [Cr-Blink-WebComponents](https://code.google.com/p/chromium/issues/list?q=label:Cr-Blink-WebComponents) bug hotlist
- Blink's implementation of the specs: [chromium.org/blink/web-components](http://www.chromium.org/blink/web-components)

---

hidden: true
title: Building blocks of Web Components
class: checkbox

<span class="auto-fadein"><i class="icon icon-check-sign good"></i></span> Custom Elements

<span class="spacer">HTML Templates</span>

<span class="spacer">Shadow DOM</span>

<span class="spacer">HTML Imports</span>

---

hidden: true
title: HTML Templates
subtitle: browser support
class: nobackdrop nobackground browser-support
content_class: flexbox vcenter

<div class="browser-support-row">
  <div><img src="images/logos/browsers/safari_logo.png"></div>
  <div class="mobile supported"><img src="images/logos/browsers/ff_nightly.png"></div>
  <div class="mobile supported"><img src="images/logos/chrome_logo.png"></div>
  <div class="mobile"><img src="images/logos/browsers/opera_logo.png"></div>
  <div><img src="images/logos/browsers/ie10_logo.png"></div>
</div>

---

hidden: true
title: Shadow DOM
subtitle: browser support
class: nobackdrop nobackground browser-support
content_class: flexbox vcenter

<div class="browser-support-row">
  <div><img src="images/logos/browsers/safari_logo.png"></div>
  <div><img src="images/logos/browsers/ff_logo.png"></div>
  <div class="mobile supported"><img src="images/logos/chrome_logo.png"></div>
  <div class="mobile"><img src="images/logos/browsers/opera_logo.png"></div>
  <div><img src="images/logos/browsers/ie10_logo.png"></div>
</div>

---

hidden: true
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
  <div><img src="images/logos/browsers/opera_logo.png"></div>
  <div><img src="images/logos/browsers/ie10_logo.png"></div>
</div>
