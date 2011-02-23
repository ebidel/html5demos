<!DOCTYPE html>
<!--
Copyright 2011 Google Inc.

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
-->
<html manifest="appcache.php">
<head>
  <title>Book of the Day</title>
  <link href='http://fonts.googleapis.com/css?family=Droid+Sans:regular,bold%7CDroid+Sans+Mono|Goudy+Bookletter+1911' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" media="all" href="styles.css">
</head>
<body>

<audio src="page-flip.wav" type="audio/wav" preload="auto" class="hidden"></audio>

<div id="container">
  <hgroup>
    <h1>Book of the Day</h1>
    <h4>Downloaded: <?php echo date("n/j/Y h:i:s"); ?></h4>
  </hgroup>
  <article>
  <div id="cover" class="drop-shadow lifted">
    <div class="nav left"></div>
    <div id="pages"><div class="loading">loading book...</div>
    </div>
    <span id="leftPageNum" class="pagenum"></span><span id="rightPageNum" class="pagenum">2</span>
    <div class="nav right"></div>
  </div>
  </article>
  <p id="unsupported" class="hidden">
    You are not using Google Chrome 10+ or have not installed this web app as a Chrome Web Store application.
  </p>
  <p id="supported" class="hidden">
    <input type="checkbox" id="update-checkbox" onclick="toggleBgContentUpdating(this)" checked /> <label for="update-checkbox" style="cursor:pointer">Periodically refresh the content of this site when my browser is not running.</label>
  </p>
</div>
<script src="app.js"></script>
</body>
</html>
