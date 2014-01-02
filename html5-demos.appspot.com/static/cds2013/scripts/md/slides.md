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

class: nobackdrop nobackground yum
content_class: flexbox vcenter centered

<h2 class="auto-fadein"><img src="images/polymer/polymer-p.png" style="height:90px;box-shadow:none;margin-right:10px;">Polymer</h2><br>
<!-- <h3 class="auto-fadein"><a href="http://polymer-project.org">polymer-project.org</a></h3> -->

---

hidden: true
content_class: flexbox vcenter quote

<blockquote>
  Polymer is a <span class="blue">new type of library</span> for the web, built on top of <span class="platform">Web Components</span>, and designed to leverage the <span class="core">evolving web platform</span> &#8230; on <b>modern browsers</b>.
</blockquote>

---

id: polymeroneliner
body_class: checkers
image: images/polymer/homepage_with_chrome.png
title: polymer-project.org
class: nobackdrop nobackground fill highlight

<div class="build">
  <div class="calloutbox"></div>
</div>

---

hidden: true
class: nobackdrop nobackground
content_class: flexbox vcenter centered

<img src="images/polymer/architecture-diagram.png" class="auto-fadein full">

---

id: whatispolymer
body_class: whatispolymer
title: Soooo Polymer is...
class: nobackdrop nobackground fullviewport

<div class="build">
  <h3 class="platform">Polyfills?</h3>
  <h3 class="core">A framework?</h3>
  <h3 class="elements">UI widgets?</h3>
</div>

---

body_class: googlecomhistory
class: nobackdrop nobackground fullviewport googlecomtoday

---

body_class: googlecomhistory
class: nobackdrop nobackground fullviewport googlecomyesterday do-transition

---

id: netscape
#title: Understand where we came from
class: nobackdrop nobackground
#image: images/bgs/netscape_blank.png
content_class: flexbox vcenter
body_class: netscape


<template id="formexample" style="display: none">
  <style>body{margin:0;padding:0;}</style>
  <form>
    <table class="build" border="10" cellpadding="5" cellspacing="5">
    <tr><td><label>First name:</td><td><input type="name"></td></tr>
    <tr><td><label>Last name</td><td><input type="name"></label></td></tr>
    <tr><td>T-shirt size</td><td>
      <select>
        <option>Small</option>
        <option selected>Medium</option>
        <option>Large</option>
        <option>X-large</option>
      </select>
    </td></tr>
    <tr><td><label>Gender</label></td><td>Male: <input type="radio"  name="gender"> Female: <input type="radio" name="gender"></td></tr>
    <tr><td colspan="2"><input type="submit"></td></tr>
    </table>
  </form>
</template>

<iframe id="formframe" style="width:300px;border:none;height:240px;"></iframe>

<script>
  var clone = document.querySelector('#formexample').content.cloneNode(true);
  var div = document.createElement('div');
  div.appendChild(clone);
 document.querySelector('#formframe').srcdoc = div.innerHTML;
</script>

<div class="build">
  <div class="selecty">
    <span>
      <img src="images/selecty.png">
      <q class="rectangle-speech-border"><p>It looks like you're building a web page on the internet!</p></q>
    </span>
  </div>
</div>

---

class: large
content_class: flexbox vcenter

<pre class="nohighlight">
&lt;select>
  &lt;option>Small&lt;/option>
  &lt;option>Medium&lt;/option>
  &lt;option>Large&lt;/option>
&lt;/select>
</pre>

<select class="corner top right">
  <option>Small</option>
  <option>Medium</option>
  <option>Large</option>
</select>

<div class="selecty auto-fadein">
  <span>
    <img src="images/selecty.png">
    <q class="rectangle-speech-border"><p>I give my children a default UI!</p></q>
  </span>
</div>

---

class: large
content_class: flexbox vcenter

<pre class="nohighlight">
&lt;select id="schwag">
  ...
  &lt;option <b>disabled</b>>Medium&lt;/option>
  &lt;option <b>disabled</b>>Large&lt;/option>
  &lt;option <b>selected</b>>XX-large&lt;/option>
&lt;/select>
</pre>

<select id="schwag" class="corner top right">
  <option disabled>Small</option>
  <option disabled>Medium</option>
  <option disabled>Large</option>
  <option selected>XX-large</option>
</select>

<div class="selecty auto-fadein">
  <span>
    <img src="images/selecty.png">
    <q class="rectangle-speech-border"><p>Elements are configured using attributes, not script.</p></q>
  </span>
</div>

---

class: large
content_class: flexbox vcenter

<pre class="nohighlight">
&lt;select <b>size="4"</b> <b>multiple</b>>
  &lt;option>Do&lt;/option>
  &lt;option>Re&lt;/option>
  &lt;option>Mi&lt;/option>
  ...
&lt;/select>
</pre>

<select size="4" multiple class="corner top right">
  <option>Do</option>
  <option>Re</option>
  <option>Mi</option>
  <option>Fa</option>
  <option>So</option>
  <option>La</option>
  <option>Ti</option>
  <option>Do</option>
</select>

<div class="selecty auto-fadein">
  <span>
    <img src="images/selecty.png">
    <q class="rectangle-speech-border"><p>Attributes even change how users interact with me</p></q>
  </span>
</div>

---

class: large
content_class: flexbox vcenter

<pre class="nohighlight">
&lt;select>
  &lt;optgroup label="German Cars">
    &lt;option>Mercedes&lt;/option>
    &lt;option>Audi&lt;/option>
  &lt;/optgroup>
  ...
&lt;/select>
</pre>

<select class="corner top right">
  <optgroup label="German Cars">
    <option value="mercedes">Mercedes</option>
    <option value="audi">Audi</option>
  </optgroup>
  <optgroup label="American cars">
    <option value="ford">Ford</option>
    <option value="gm">GM</option>
  </optgroup>
</select>

<div class="selecty auto-fadein">
  <span>
    <img src="images/selecty.png">
    <q class="rectangle-speech-border"><p>Attributes can effect my UI.</p></q>
  </span>
</div>

---

class: large
content_class: flexbox vcenter


<pre class="nohighlight">
&lt;select>
  &lt;option>Small&lt;/option>
  <s>&lt;li>Medium&lt;/li></s>
  &lt;option>Large&lt;/option>
&lt;/select>
</pre>

<select class="corner top right">
  <option>Small</option>
  <li>Medium</li>
  <option>Large</option>
</select>

<div class="selecty auto-fadein">
  <span>
    <img src="images/selecty.png">
    <q class="rectangle-speech-border"><p> I'm picky! I only <s>allow</s> accept certain elements as children.</p></q>
  </span>
</div>

---

class: large
content_class: flexbox vcenter

<pre class="nohighlight">
<b>&lt;form></b>
  &lt;select name="size">
    &lt;option value="s">Small&lt;/option>
    &lt;option value="m">Medium&lt;/option>
    &lt;option value="l">Large&lt;/option>
  &lt;/select>
<b>&lt;/form></b>
</pre>

<div class="selecty auto-fadein">
  <span>
    <img src="images/selecty.png">
    <q class="rectangle-speech-border"><p>In other contexts, I take on additional responsibilities.</p></q>
  </span>
</div>

---

class: large
content_class: flexbox vcenter

<img src="images/screenshots/HTMLSelectElement.png" class="full">

<div class="selecty auto-fadein">
  <span>
    <img src="images/selecty.png">
    <q class="rectangle-speech-border"><p>My DOM exposes <b>properties/methods</b> to JS that don't make sense as markup. I also fire <b>events</b> when interesting things happen.</p></q>
  </span>
</div>

---

title: Where are we today?
body_class: b2tf
#subtitle: where are we today?
class: nobackdrop nobackground highlight

---

hidden: true
content_class: flexbox vcenter centered

<iframe data-src="http://html5-demos.appspot.com/static/webcomponents/demos/components/my-components/blink/blink.html" style="height:160px;border:none"></iframe>

<span class="source"><s>[Dead](https://www.w3.org/Bugs/Public/show_bug.cgi?id=21712)</s>?</span>

---

hidden: true
content_class: flexbox vcenter centered

<p class="centered">
  <code class="prettyprint custom-element-snippet">&lt;gangnam-style>&lt;/gangnam-style></code>
</p>

<iframe data-src="http://html5-demos.appspot.com/gangnam" style="height:170px;border:none"></iframe>

---

hidden: true
content_class: flexbox vcenter centered

<p class="centered">
  <code class="prettyprint custom-element-snippet">&lt;photo-booth>&lt;/photo-booth></code>
</p>

<!-- <link rel="import" href="demos/components/x-photo-booth.html"> -->
<photo-booth class="rounded"></photo-booth>

---

hidden: true
content_class: flexbox vcenter centered

<p class="centered">
  <code class="prettyprint custom-element-snippet" style="font-size:35px">&lt;button is="mega-button">Mega button&lt;/button></code>
</p>

<iframe data-src="http://html5-demos.appspot.com/static/webcomponents/demos/components/my-components/mega-button/megabutton.html" style="height:380px;width:380px;border:none"></iframe>

---

id: tab-examples
title: Gut check: building a tab component on the web...

<div class="build flexbox vcenter centered">
<img src="images/screenshots/tabs/jquery.png">
<img src="images/screenshots/tabs/kendo.png">
<img src="images/screenshots/tabs/yui.png">
<img src="images/screenshots/tabs/angular.png">
<img src="images/screenshots/tabs/sencha.png">
<img src=""> <!-- intentional. holder to see all images together -->
</div>

---

title: Pile on loads of JS
body_class: insane
class: nobackdrop nobackground highlight

---

title: Our markup is atrocious
body_class: readable
class: nobackdrop nobackground highlight

---

title: What a nightmare!
body_class: freddykrueger
class: nobackdrop nobackground highlight

---

title: This is how we build web apps!
body_class: howwebuildapps
class: nobackdrop nobackground highlight
#content_class: flexbox vcenter centered

---

class: nobackdrop nobackground fullviewport
content_class: flexbox vcenter 

<h2>We're far away from where we started</h2>

<img src="images/slides/balloon_scene.png" style="margin-top:2em;width:100%;">

---

id: hangoutsexample
title: Markup can be meaningful again

<pre class="prettyprint" data-lang="html" data-run-demo2>
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

<link rel="import" href="demos/components/hangouts/elements/hangouts.html">

<div>
  <button>New chat</button>
</div>

<div class="example">
  <!-- <hangout-module from="Paul Irish" profile="118075919496626375791"></hangout-module> -->
</div>

---

id: spacevideo
body_class: black
class: nobackdrop nobackground fullviewport do-transition
content_class: flexbox vcenter centered

<video data-src="videos/universe.webm" class="fullviewport"></video>
<audio data-src="audio/Stellardrone-Glittering.ogg" loop></audio>

---

class: nobackdrop nobackground yum
content_class: flexbox vcenter centered

<h2><img src="images/polymer/polymer-p.png" style="height:90px;box-shadow:none;margin-right:10px;">Polymer</h2><br>
<!-- <h3 class="auto-fadein"><a href="http://polymer-project.org">polymer-project.org</a></h3> -->

---

id: spoiler
image: images/slides/standardsonbottom.png
#body_class: platform-bg
class: nobackdrop nobackground cubespin do-transition
content_class: flexbox vcenter

<h2>Spoiler <br> alert<img src="images/icons/alarm.png"></h2>
<!-- <h3>standards on the bottom</h3> -->

---

class: nobackdrop nobackground browser-support
content_class: flexbox vcenter

<div class="flexbox">
  <h2>Templates</h2>
  <div class="browser-support-row">
    <div class="supported"><img src="images/logos/browsers/safari_logo.png"></div>
    <div class="supported"><img src="images/logos/browsers/ff_logo.png"></div>
    <div class="supported"><img src="images/logos/chrome_logo.png"></div>
    <div class="supported"><img src="images/logos/browsers/opera_logo.png"></div>
    <div><img src="images/logos/browsers/ie10_logo.png"></div>
  </div>
</div>

<div class="flexbox">
  <h2>HTML Imports</h2>
  <div class="browser-support-row">
    <div><img src="images/logos/browsers/safari_logo.png"></div>
    <div><img src="images/logos/browsers/ff_logo.png"></div>
    <div class="supported partial"><img src="images/logos/chrome_logo.png"></div>
    <div><img src="images/logos/browsers/opera_logo.png"></div>
    <div><img src="images/logos/browsers/ie10_logo.png"></div>
  </div>
</div>

<div class="flexbox">
  <h2>Custom Elements</h2>
  <div class="browser-support-row">
    <div><img src="images/logos/browsers/safari_logo.png"></div>
    <div class="supported partial"><img src="images/logos/browsers/ff_logo.png"></div>
    <div class="supported partial"><img src="images/logos/chrome_logo.png"></div>
    <div><img src="images/logos/browsers/opera_logo.png"></div>
    <div><img src="images/logos/browsers/ie10_logo.png"></div>
  </div>
</div>

<div class="flexbox">
  <h2>Shadow DOM</h2>
  <div class="browser-support-row">
    <div><img src="images/logos/browsers/safari_logo.png"></div>
    <div><img src="images/logos/browsers/ff_logo.png"></div>
    <div class="supported"><img src="images/logos/chrome_logo.png"></div>
    <div class="supported"><img src="images/logos/browsers/opera_logo.png"></div>
    <div><img src="images/logos/browsers/ie10_logo.png"></div>
  </div>
</div>

---

title: What is it?

<span class="pull-right auto-fadein"><img src="images/polymer/architecture-diagram.png" style="height:450px"></span>

<div class="build">
  <div>
    <div class="platform bold">Polyfill libraries</div>
    <br>
    <p>Shadow DOM, Custom Elements, HTML Imports, Pointer Events...</p>
  </div>
  <div class="topmargin">
    <div class="core bold">Sugaring layer</div>
    <br>
    <p>expresses opinionated way to use web component concepts together</p>
  </div>
  <div class="topmargin">
    <div class="elements bold">UI Components</div>
    <br>
    <p>comprehensive set (in progress)</p>
  </div>
</div>

---

id: philosophy
title: Philosophy &amp; Goals
build_lists: true
class: large
#content_class: flexbox vcenter

<div class="build topmargin">
<div>
<h3>Everything as an <b class="elements">element</b></h3>
<p>HTML is cool. DOM feels good.</p>
<br>
</div>
<div>
<h3><b class="core">Eliminate boilerplate</b></h3>
<p>Remove tediousness of building web component-based apps</p>
</div>
<div>
  <h3>Utilize the modern web <b class="platform">platform</b></h3>
  <p>Support modern browsers</p>
  <br>
</div>
</div>

---

hidden: true
title: Polymer <label class="platform">platform <i class="icon-cogs platform"></i></label>
class: nobackdrop nobackground segue platform
#content_class: flexbox vcenter
keep_content: true

<div class="overlay top"></div>
<div class="overlay bottom"></div>

---

hidden: true
class: platform nobackdrop nobackground
content_class: flexbox vcenter quote

<blockquote>Utilize the <b>modern</b> web platform.</blockquote>

---

hidden: true
class: large
content_class: flexbox vcenter centered

<h2 class="auto-fadein">1st-class support for spec features...</h2>

---

hidden: true
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

hidden: true
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

hidden: true
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

title: Polymer <label class="elements">elements <i class="icon-puzzle-piece elements"></i></label>
subtitle: <a href="http://www.polymer-project.org/docs/elements/" class="nounderline">polymer-project.org/docs/elements/</a>
class: nobackdrop nobackground segue elements
#content_class: flexbox vcenter
keep_content: true

<div class="overlay top"></div>
<div class="overlay bottom"></div>

---

class: nobackdrop nobackground
content_class: flexbox vcenter quote

<blockquote class="large">Everything is an element.</blockquote>

---

id: polymer-ajax-demo
title: Everything is an element
subtitle: AJAX...using DOM
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
  console.log(JSON.parse(<b>this.response</b>).feed.entry);
});
<b>ajax.go();</b>
</pre>

<div class="component-demo">
<link rel="import" href="polymer-all/polymer-elements/polymer-ajax/polymer-ajax.html">
<output><div>Hit run...</div></output>
</div>

---

hidden: true
title: Real-world examples of polymer-ajax
class: nobackdrop
content_class: flexbox vcenter centered
body_class: elements-bg

<h2 style="margin-top:-100px;"><a href="http://www.chromestatus.com/features">chromestatus.com/features</a></h2>

<h2 style="margin-top:50px;"><a href="http://www.polymer-project.org/build/">polymer-project.org/build/</a></h2>


---

hidden: true
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
<!-- <link rel="import" href="polymer-all/polymer-elements/polymer-file/polymer-file.html"> -->
<output><div>Hit run...</div></output>
</div>

---

id: polymer-flex-demo
title: Everything is an element
subtitle: flexbox...using DOM
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

<div class="build centered bold"><span><b class="green">Reusability</b>...the non-visual polymer-elements are used to implement these!</span></div>

---

hidden: true
class: nobackdrop nobackground
content_class: flexbox vcenter quote

<blockquote class="large">Everything is an element.</blockquote>

---

id: spacevideo2
body_class: black
class: nobackdrop nobackground fullviewport
content_class: flexbox vcenter centered

<video data-src="videos/universe2.webm" style="height: 100%;width:initial !important;"></video>
<audio data-src="audio/Stellardrone-Glittering.ogg" loop></audio>

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

title: Polymer features
subtitle: declarative web components
body_class: core-bg
build_lists: true

- Declarative element registration: `<polymer-element>`
- Declarative inheritance: `<polymer-element extends="...">`
- Declarative two-way data-binding: `<input id="input" value="{{foo}}">`
- Declarative event handlers: `<button on-click="{{handleClick}}">`
- Published properties: `xFoo.bar = 5 <-> <x-foo bar="5">`
- Property change watchers: `barChanged: function() {...}`
- Automatic node finding: `this.$.input.value = 5`
- PointerEvents / PointerGestures by default

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
          this.createShadowRoot().appendChild(document.importNode(t.content, true));
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

hidden: true
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
title: Define an API
subtitle: complex elements require more juice...
body_class: core-bg

<pre data-code-cycle class="prettyprint" data-lang="HTML" style="font-size:25px;line-height: 1.4;">
</pre>

<textarea selected>
<polymer-element name="my-input" noscript>
  <template>
    <input type="text" id="in" style="color: orange;">
  </template>
</polymer-element>
</textarea>
<textarea>
<polymer-element name="my-input">
  <template>
    <input type="text" id="in" style="color: orange;">
  </template>
  <script>Polymer('my-input');</script>
</polymer-element>
</textarea>
<textarea>
<polymer-element name="my-input">
  <template>
    <input type="text" id="in" style="color: orange;">
  </template>
  <script>
    Polymer('my-input', {
      get length() { return this.$.in.value.length; },
      ready: function() { ... }
    });
  </script>
</polymer-element>
</textarea>
<textarea>
&lt;polymer-element name="my-input">
  &lt;template>
    &lt;link rel="stylesheet" href="styles.css">
    &lt;input id="in" type="text">
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

2. **Inside** the element &rarr; use data-binding
2. **Outside** the element &rarr; users configure us using attributes

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
<polymer-element name="my-input">
  <template>
    <input type="{{type}}" style="color: {{color}};" value="{{val}}">
    <polymer-localstorage name="myInputStorage" value="{{val}}"></polymer-localstorage>
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
    <input type="{{type}}" style="color: {{color}};" value="{{val}}">
    <polymer-localstorage name="myInputStorage" value="{{val}}"></polymer-localstorage>
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

<!--
- User overrides `color` but `type` remains its default ("text")
- Since `val` isn't published, can't use it as a bindable attribute.
-->

---

hidden: true
title: Expressions
body_class: core-bg
polymer_link: http://www.polymer-project.org/docs/polymer/expressions.html

Expressions can go anywhere `{{}}` live:

    <div>Jill has {{ daughter.children.length + son.children.length }} grandchildren</div>

Conditional attributes:

    <input type="checkbox" checked?="{{activate}}">

Dynamic classes:

    <div class="{{ {active: user.selected, big: user.type == 'super'} | tokenList }}"> 
    <!-- <div class="active big"> -->

---

hidden: true
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

hidden: true
title: Features in action 
subtitle: data-binding / published properties
body_class: core-bg

<pre class="corner prettyprint">
&lt;script src="<span alt="bower install polymer" data-tooltip="bower install polymer">polymer.min.js</span>">&lt;/script>
&lt;link rel="import" href="<span alt="bower install polymer-elements" data-tooltip="bower install polymer-elements">polymer-ajax.html</span>">
</pre>

<pre class="prettyprint" data-lang="html">
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
      ready: function() { <b>this.params = {alt: 'json', q: this.query};</b> }
    });
  &lt;/script>
&lt;/polymer-element>
</pre>

<pre>
&lt;youtube-videos query="cats">&lt;/youtube-videos>
</pre>

---

title: Features in action
subtitle: responsive design...using DOM
body_class: core-bg
#content_class: smaller 

<pre class="corner prettyprint">
&lt;script src="<span alt="bower install polymer" data-tooltip="bower install polymer">polymer.min.js</span>">&lt;/script>
&lt;link rel="import" href="<span alt="bower install polymer-elements" data-tooltip="bower install polymer-elements">polymer-media-query.html</span>">
</pre>

<pre class="prettyprint" data-lang="html">
&lt;polymer-element name="responsive-layout" attributes="responsive">
  &lt;template>
    <b>&lt;polymer-media-query query="max-width:640px" queryMatches="{{isPhone}}">&lt;/...</b>
    &lt;template if="{{isPhone && responsive}}"> &lt;!-- Phone markup -->
      &lt;content>&lt;/content>
    &lt;/template>
    &lt;template if="{{!responsive}}"> &lt;!-- Non-responsive case -->
     ...
    &lt;/template>
  &lt;/template>
  &lt;script>Polymer('responsive-layout', {responsive: false});&lt;/script>
&lt;/polymer-element>
</pre>

<pre class="prettyprint" data-lang="User's HTML">
&lt;responsive-layout <b>responsive</b>>
  &lt;div>...&lt;/div>
&lt;/responsive-layout>
</pre>

---

hidden: true
title: Features in action
subtitle: $ referencing / changed watchers / declarative events
body_class: core-bg

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

hidden: true
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

title: Polymer is many things!
class: nobackdrop nobackground
content_class: flexbox vcenter centered

<img src="images/polymer/architecture-diagram.png" class="auto-fadein full">

---

id: polymerurl
class: nobackdrop nobackground yum do-transition
content_class: flexbox vcenter centered

<div class="build">
<h2><a href="http://polymer-project.org"><span class="elements">polymer</span><span class="hide">-</span><span class="core">project</span><span class="hide">.</span><span class="platform">org</span></a></h2>
</div>

---

hidden: true
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

class: do-transition large
content_class: flexbox vcenter quote

<blockquote>
  A Polymer is a large molecule composed of many repeated subunits, known as monomers.
</blockquote>

<span class="source"><a href="http://en.wikipedia.org/wiki/Polymer">wikipedia.org/wiki/Polymer</a></span>

---

class: do-transition large
content_class: flexbox vcenter quote

<blockquote>
  A <b>Polymer</b> is a large <b>molecule</b> composed of many <b>repeated subunits</b>, known as <b>monomers</b>.
</blockquote>

<span class="source"><a href="http://en.wikipedia.org/wiki/Polymer">wikipedia.org/wiki/Polymer</a></span>

---

content_class: flexbox vcenter quote

<blockquote>
  A <b class="blue">web app</b> is a large <b class="blue">collection of web components</b> composed of many <b class="blue">subelements</b>, known as <b class="blue">custom elements</b>.
</blockquote>

<span class="source">-me</span>

---

id: thumbsup
class: large
content_class: flexbox vcenter centered

<div class="build">
  <h2><i class="icon icon-thumbs-up"></i></h2>
</div>
