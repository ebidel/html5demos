FEATURES =====

class: nobackdrop nobackground

adds these classes to the slide (e.g <slide class="nobackdrop nobackground">)

---

image: myimage.png

will put myimage.png as the slides bg images

----

body_class: myclass

applies body.myclass on slideenter and removes it on slideleave

---
title: My title
subtitle: My subtitle

----

build_lists: true

Builds li lists.

---

content_class:flexbox vcenter centered animatedfull

adds these classes to the slide's main content (e.g. <article class="flexbox vcenter centered animatedfull">)

---
id:

define a unique id for the slide
---

Lazy load iframes:
<iframe data-src="http://html5-demos.appspot.com/static/shadowdom-visualizer/index.html#body"></iframe>

---

.previewframe iframe will load the live page but make it unselectable. Makes
it look like an image, but a live preview of a site.

<div class="previewframe">
  <iframe data-src="http://chromestatus.com"></iframe>
</div>


---

<b alt="bower install polymer-elements" data-tooltip="bower install polymer-elements">polymer-ajax.html</b>

Creates a tooltip that displays "bower install polymer-elements" on hover

---

content_class: code-example html

Adds "HTML" label to pre blocks on the page


content_class: code-example js

Adds "JS" label to pre blocks on the page

--

<pre data-run-demo="http://www.polymer-project.org/polymer-all/polymer-elements/polymer-ajax/index.html">

Adds a "Run" button to the code snippet and opens the URL when clicked.

--

keep_content: true

Some slide classes prevent certain sections from being output. keep_content: true includes the slide content no matter what type of slide it is. 

---

In slides:

<pre data-code-cycle class="prettyprint" data-lang="HTML">
</pre>

<textarea selected>
blah
</textarea>
<textarea>
blah2
</textarea>
<textarea>
blah3
</textarea>

On clicking the pre, the .innerHTML of the selected textarea is loaded. The contnet
is cycled through the textareas of the slide and loops.

Shift+click will go in reverst

cmd+click prevents advance (useful for highlighting text)