# Instructions

 - Install the ws websocket library for Node: [http://einaros.github.com/ws/](http://einaros.github.com/ws/)

 - Start a webserver:

        python -m SimpleHTTPServer 8000

 - Start the websocket server:

        node server.js --port=3000

 - Open your browser to [http://localhost:8000](http://localhost:8000).

 - Save the contents of `bookmarklet.js` as a bookmark. For convenience, this file contains the uncompressed source as well as a bookmarklet version. Copy and paste the latter.

 - Open another browser tab to any website and click the bookmarklet. You should start seeing the page stream from this new tab to the tab in #3. Scrolling the site should
 be reflected on the screenshot viewer.

# Issues?

- Make sure `HOST = 'localhost:8000'` in `bookmarklet.js` points to your webserver's host.
- Make sure `WS_HOST = 'localhost:3000'` in `app.js` points to the correct location.
