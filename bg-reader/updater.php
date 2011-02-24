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
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$REFRESH = 2 * 60; // send SSE message (refresh appcache) every 2min.

/**
 * Constructs the SSE data format and flushes that data to the client.
 *
 * @param string $id Timestamp/id of this connection.
 * @param string $msg Line of text that should be transmitted.
 */
function sendMsg($id , $msg) {
  echo "id: $id" . PHP_EOL;
  echo "data: $msg" . PHP_EOL;
  echo PHP_EOL;
  flush();
}

$startedAt = time();
sendMsg($startedAt , '');

do {
  // Send message every $REFRESH.
  if ((time() - $startedAt) > $REFRESH) {
    sendMsg($startedAt , time());
    die();
  }
} while(true);
?>