<?php
/*Copyright 2011 Google Inc.

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
*/
header('Content-Type: text/cache-manifest');
header('Cache-Control: no-cache');

echo "CACHE MANIFEST\n";

$black_list = array(
  './appcache.php',
  './manifest.json',
  './updater.php',
  './loremipsum.txt',
  './icons/book_cover.png'
);

$hashes = '';

echo "\nCACHE:\n";

$dir = new RecursiveDirectoryIterator('.');
foreach(new RecursiveIteratorIterator($dir) as $file) {
  if ($file->IsFile() && !in_array($file, $black_list) &&
    substr($file->getFilename(), 0, 1) != '.') {
    echo $file . "\n";
    $hashes .= md5_file($file);
  }
}

echo "\nNETWORK:\n";
echo '*' . "\n";

echo "\n# " . md5($hashes) . "\n";

// FOR TESTING. Ensures we'll get an appcache update (every minute). Comment
// this line out and the previous line will only update the manifest when
// one of the app's files changes (e.g. the content of loremipsum.txt).
echo '# ' . date("n/j/Y h:i");
?>