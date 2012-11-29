title: Problems
build_lists: true

- An OWP feature has no milestone.
- Many APIs.
- OWP doesn't belong to anyone. It belongs to everyone :)
    *  No SDK
- Teams spread across 4 offices, 3 regions:
    * Japan (1), Sydney (1), MTV (1), Seattle (1), London (2/3)
---

title: Why focus on features?
build_lists: true

- OWP is the *fundamental bedrock* of all other projects on Chrome DevRel.
- Improvements to the web platform are *core* to Chrome's mission: drive the web forward.
- It's our duty to *help developers learn* these new additions

---

title: Case Study #1
subtitle: Web Audio API
class: segue dark nobackground

---

title: Web Audio API Timeline
subtitle: 2010

<p class="build">
  <q>Bro! Special builds of WebKit have the Web Audio API</q>
  <div class="author">- Paul Irish, late Q4 2010</div>
</p>

<p class="build" style="margin-top:3em;"><b>We download</b></p>

---

title: Web Audio API Timeline
subtitle: 2011
build_lists: true

- 1/31: <label class="chromerelease">10</label> crogers posts to `public-xg-audio` [announcing](http://lists.w3.org/Archives/Public/public-xg-audio/2011Feb/0000.html) availability. <label class="flag yes">flag</label>

<p class="centered">
<a href="http://lists.w3.org/Archives/Public/public-xg-audio/2011Feb/0000.html" style="border:none;"><img src="images/wapi_announce.png" class="border" style="max-height:200px"></a>
</p>

- 3/28: [Chrome DevRel unplugged 2011](https://sites.google.com/a/google.com/chrome-devrel/chrome-devrel-unplugged-2011) - team learns about API from crogers.

- 4/11: <label class="chromerelease">12</label> hits dev channel. ([all platforms supported](http://peter.sh/2011/04/web-audio-api-script-de-obfuscation-an-updated-ui-and-the-contentsettings-api/))

- 4/14: <label class="feature">feature</label> Offline rendering pipeline lands.

---

title: Web Audio API Timeline
subtitle: 2011
build_lists: true

- 5/11: [htmlfivewow.com](http://www.htmlfivewow.com/) @ Google I/O 2011

- 6/27: [CONTRA IN HTML5 + WEB AUDIO API](http://updates.html5rocks.com/2011/06/Contra-in-HTML5-Web-Audio-API)

- 7/15: [MULTIPLAYER AUDIO FUN](http://updates.html5rocks.com/2011/07/Multiplayer-Audio-Fun) (DinahMoe demo)

- 9/16: <label class="chromerelease">14</label> stable [released](http://chrome.blogspot.com/2011/09/new-stable-release-of-chrome-expanding.html) <label class="flag no">no flag</label>

- 10/14: Boris writes [GETTING STARTED WITH WEB AUDIO API](http://www.html5rocks.com/tutorials/webaudio/intro/)

---

title: Web Audio API Timeline
subtitle: 2012
build_lists: true

<p class="centered" style="font-style:italic;font-size:smaller">( Team <a href="http://goo.gl/LssgU">focuses</a> on media APIs in Q1 )</p>

- 1/10: Boris posts [Web Audio API FAQ](http://updates.html5rocks.com/2012/01/Web-Audio-FAQ)

- 2/2: [crbug.com/112367](http://crbug.com/112367) filed (`getUserMedia()` integration):

<p class="centered">
<a href="http://crbug.com/112367" style="border:none;"><img src="images/crbug-live-input.png" class="border"></a>
</p>

---

title: Web Audio API Timeline
subtitle: 2012
build_lists: true

- 2/3: <label class="feature">feature</label> `<audio>` as source lands. Eric posts [update](http://updates.html5rocks.com/2012/02/HTML5-audio-and-the-Web-Audio-API-are-BFFs) and [demo](http://html5-demos.appspot.com/static/webaudio/createMediaSourceElement.html).

- 2/12: Borish publishes [DEVELOPING GAME AUDIO WITH THE WEB AUDIO API](http://www.html5rocks.com/en/tutorials/webaudio/games/).

- 2/16: Ilmari writes [MIXING POSITIONAL AUDIO AND WEBGL](http://www.html5rocks.com/en/tutorials/webaudio/positional_audio/)

- 2/27: Irish launches [technitone.com](http://www.technitone.com/) with [case study](http://www.html5rocks.com/en/tutorials/casestudies/technitone/
)

- 2/28: Binary WebSockets land. Eiji plays with [binary streaming](https://github.com/agektmr/AudioStreamer).

- 4/24: [CASE STUDY: A TALE OF AN HTML5 GAME WITH WEB AUDIO](http://www.html5rocks.com/en/tutorials/webaudio/fieldrunners/)

- 6/29: Chris gives [Turning the Web Up to 11](http://webaudio-io2012.appspot.com/) @ Google I/O 2012

- 7/3: Mozilla files [tracking bug](https://bugzilla.mozilla.org/show_bug.cgi?id=779297) to implement.

---

title: Web Audio API Timeline
subtitle: 2012
build_lists: true

- 9/18: <label class="feature">feature</label> Microphone input lands in Canary <label class="chromerelease">23</label> => Dreams of <b>658</b> people, answered.

<p class="centered">
<a href="http://code.google.com/p/chromium/issues/detail?id=112367#c71" style="border:none;"><img src="images/crbug-live-input2.png" class="border"></a>
</p>

- 9/19: iOS6 releases with support. Boris updates his h5r articles.

- 9/19: Chris posts [Live Web Audio Input](http://updates.html5rocks.com/2012/09/Live-Web-Audio-Input-Enabled). Updates [demos](http://webaudiodemos.appspot.com/Vocoder/index.html).

- 10/8: <label class="feature">feature</label> Windows mic support lands

---

title: What do the trends say?
content_class: flexbox vcenter

<iframe style="width:900px;height:330px;" data-src="http://www.google.com/trends/fetchComponent?hl=en-US&q=web+audio+api&cmpt=q&content=1&cid=TIMESERIES_GRAPH_0&export=5&w=900&h=330" style="border: none;"></iframe>

<!-- [Trends](http://www.google.com/trends/fetchComponent?hl=en-US&q=web+audio+api&cmpt=q&content=1&cid=TIMESERIES_GRAPH_0&export=5&w=900&h=330)
 -->
<p class="build" style="margin-top:1em;"><b>Hockey stickz!</b></p>

---

title: Reasons for success

<ul class="build">
<li>Contributions from 4 different team members
<li>Team member interest in music.
<li>Worked <em>very</em> closely with crogers (eng) from beginning
<li>Continuous stream of new features/changes for 2 years.
<li>API touched many different platform areas (HTML5 media, canvas/webgl, games, device input via <code>getUserMedia()</code>)
<li>Promise moving forward: vendor support, mobile story
<li>Final owner (cwilso)
</ul>

---

title: Case Study #2
subtitle: IndexedDB
class: segue dark nobackground

---

title: <span class="white">What went wrong?</span>
class: nobackground fill
image: images/bgs/disaster.jpg

<footer class="source black">http://www.flickr.com/photos/historyinanhour/4775644390/</footer>

---

title: What went wrong?
build_lists: true

<b class="build">Everything!!</b>

- Changed eng hands several times in last 2 years -> slow moving (until now)
- Weren't engaged with eng
- Too many spec changes to keep up with.
- Complex API that no one understands.
- Lack of browser support for many moons
- No clear owner on DevRel to make updates to tutorials, samples, docs.

---

title: Feature Evolution

<div class="chromechannels"></div>

---

title: DevRel Evolution

- Discovery: learn about API
- Inspire: talks, tutorials, demos
- Document/Educate/Iterate: reference, dev guides
- Advocate: work with partners, broader top-tier adoption

---

title: Discovery
subtitle: learn about the API == full time job!
build_lists: true

- RSS: [peter.sh](http://peter.sh), [WebExposed]( 
https://bugs.webkit.org/buglist.cgi?field-1-0-0=keywords&keywords=WebExposed&query_format=advanced&remaction=&type-1-0-0=anywords&value-1-0-0=WebExposed&title=Bug%20List&ctype=rss) label, [Adobe Web Platform Team Blog](http://blogs.adobe.com/webplatform/), [Mozilla Hacks](https://hacks.mozilla.org/), JavaScript/HTML5 Weekly newsletters, [HTML5Bookmarks](  
http://html5bookmarks.com/feed/rss2.xml), EchoJS, HTML5 Snippets, Planet HTML5, Codrops, Facebook HTML5 Blog, Chromium blob, Chrome releases,...
- Follow relevant peeps/orgs: , @paulrouget, @devongovett, @mrdoob, @miketaylr, @ryanseddon, @FirefoxNightly, @AdobeWebPlatfrm, @w3c, @webdevlinks, @IE, @bocoup, @WebPlatform, @html5, @yeoman,...
- Follow G+ pages and peeps (remind me to share my HTML5/web circle)
- Subscribe to webkit bugs, crbugs, FF bugs, moooooar bugz!
- Meeting summaries sent to chrome-team@
- Mailing lists. Some good, but noisy.

---

title: Inspire
build_lists: true

Triple "T": talks, tutorials, terrific demos

- Announce on updates.html5rocks.com
- Gain experience
    - play with layout tests, write demo(s)
- Write articles
    - <img src="http://www.html5rocks.com/static/images/site_title.png" style="height: 60px;vertical-align:middle;">
  <img src="http://www.webplatform.org/logo/wplogo_transparent_xlg.png" style="height:60px;vertical-align:middle;">
  <img src="https://developer.mozilla.org/media/img/mdn-logo.png" style="height: 60px;vertical-align:middle;"> ( Peter/Scott's session tomorrow )
- Assign initial owners to track feature closely...

---

title: Inspire
subtitle: Eric's CSS Filters Playground
content_class: flexbox vcenter centered

<a href="http://html5-demos.appspot.com/static/css/filters/index.html"><img src="images/cssfilterplayground.png" class="contain"></a>

---
title: Inspire
subtitle: Eiji's Web Audio Metronome
content_class: flexbox vcenter centered

<a href="http://demo.agektmr.com/metronome/"><img src="images/metronome.png" class="contain"></a>

---

title: Being an Owner
build_lists: true

- Track bugs, commits, etc.
- Establish relationship with eng working on feature
- Update [chromestatus.com](http://chromestatus.com)
- Add regular updates to our team meetings ([go/html5projects](http://go/html5projects))
- Aware of community efforts ("heartbeat"): libs, demos, 
    - share awesomeness on G+, Twitter
- record GDL mini videos

---

title: Document/Educate/Iterate/Improve
subtitle: scale the feature
build_lists: true

Once we have a bunch of material:

- Produce MDN/WPD.org reference docs
- Understand painpoints
    - better guides than initial tutorials
    - libraries to streamline complexities (...looking at you WebRTC)
    - prioritize dev feedback with engineering

---

title: Educate/Improve

<img src="images/tut.png" class="contain">

---

title: Educate/Improve

<img src="images/tut2.png" class="contain">

---

title: Educate/Improve

<img src="images/tut3.png" class="contain">

---

title: Educate/Improve

<img src="images/tut4.png" class="contain">

---

title: Educate/Improve

<img src="images/tut5.png" class="contain">

---

title: Advocate
subtitle: work with partners, broader top-tier adoption
build_lists: true

<p class="centered" style="font-style:italic;font-size:smaller">( Sam and Boris's session on Wed )</p>

- More than just demo-ware
- Real-world adoption with partners.
- Showcase apps (Cirque, Who Am I?, Chrome Jam)
- Chrome apps, frameworks, tools
- Traction on mobile

---

title: Open Questions

- Need to subscribe to  *everything* to stay up to date with API. How to fix?
- Too many APIs. How do we prioritize?
- Do we align more with Chrome releases?
    - End goal: "Chrome 24 for developers" [like Firefox](https://developer.mozilla.org/en-US/docs/Firefox_16_for_developers).
- When do we "move on"? How to chose owners?
- Do we only support/care about features that have dedicated eng?
- Engineer is booked and a bug/feature doesn't get worked on (AppCache, WebRTC mic integration). Now what?
- Can we do more with the other subteams (Apps, Dart, games)?
- Spread across 3 regions...too much?

