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

window.news = window.news || {};

news.FEEDS = {
  'tc': 'http://feeds.feedburner.com/TechCrunch',
  'cnn': 'http://rss.cnn.com/rss/cnn_topstories.rss',
  'bbc': 'http://feeds.bbci.co.uk/news/rss.xml',
  'google': 'http://news.google.com/news?output=rss',
  'nyt': 'http://feeds.nytimes.com/nyt/rss/World',
  'yahoo': 'http://rss.news.yahoo.com/rss/yahoonewsroom',
  'huffington': 'http://feeds.huffingtonpost.com/huffingtonpost/raw_feed',
  //'abc': 'http://feeds.abcnews.com/abcnews/2020headlines',
  'npr': 'http://www.npr.org/rss/rss.php?id=1001'
};

news.NUM_FEEDS = Object.keys(news.FEEDS).length;
news.processedFeeds = 0;
news.MAX_NUM_ARTICLES = 20; // Max number of articles to return from each feed.


news.onError = function(tx, e) {
  console.log('Something unexpected happened: ' + e.message);
};

news.onSuccess = function(tx, r) {
  // NOOP
};

news.init = function() {
  var dbSize = 5 * 1024 * 1024; // 5MB
  news.db = window.openDatabase('News', '1.0', 'news articles', dbSize);
  news.fetchNews();
};

news.reset = function() {
  var d = document;
  if (window.opener) {
    d = window.opener.document;
  }
  var feeds = d.getElementById('feeds');
  if (feeds) {
    feeds.innerHTML = '';
  }

  var droppedTables = 0;

  news.dropAll(function() {
    droppedTables++;
    if (droppedTables == news.NUM_FEEDS) {
      news.fetchNews();
    }
  });
};

news.fetchNews = function() {
  for (var table in news.FEEDS) {
    news.createArticleTable(table);

    (function(table) {
      news.getAllNews(table, function(tx, result, table) {
        if (result.rows.length) {  // Results in db. Render data from there.
          news.renderNewsArticles(tx, result, table);
        } else { // Fetch data from RSS feeds.

          var script = document.createElement('script');
          script.src = ['http://ajax.googleapis.com/ajax/services/feed/load',
              '?v=1.0&num=', news.MAX_NUM_ARTICLES, '&q=', news.FEEDS[table],
              '&callback=processFeedResponse&context=', table].join('');

          // If script already existing on DOM (with same src), remove it.
          var preExistingScript =
              document.body.querySelector('script[src="' + script.src + '"]');
          if (preExistingScript) {
            document.body.removeChild(preExistingScript);
          }

          document.documentElement.lastChild.appendChild(script);
        }
      });
    })(table);
  }
};

news.createArticleTable = function(table) {
  news.db.transaction(function(tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS ' + 
        table + '(id INTEGER PRIMARY KEY ASC, ' +
        'content TEXT, snippet TEXT, title STRING UNIQUE, link varchar(200), ' +
        'publishedDate DATETIME, addedOn DATETIME, feed STRING, read BOOLEAN DEFAULT 0)',
        []);
  });
};

news.updateReadState = function(table, id, callback) {
  news.db.transaction(function(tx) {
    tx.executeSql('UPDATE ' + table + " SET read=1 WHERE id=" + id, [],
                  null, news.onError);
  });
};

news.dropAll = function(opt_callback) {
  var callback = opt_callback || news.onSuccess;

  news.db.transaction(function(tx) {
    for (var key in news.FEEDS) {
      tx.executeSql('DROP TABLE ' + key, [], callback, news.onError);
    }
  });
};

news.getAllNews = function(table, renderFunc) {
  news.db.readTransaction(function(tx) {
    tx.executeSql('SELECT * FROM ' + table, [], function(tx, result) {
      renderFunc(tx, result, table);
    }, news.onError);
  });
};

news.articleHTML = function(entry) {
  var date = new Date(entry.publishedDate);

  var formattedDateStr = date.getMonth() + 1 + '/' + date.getDate() + ' ' +
                         news.formatTimeString(date.toLocaleTimeString());

  return ['<li onclick="onArticleOpen(this)" data-id="', entry.id,
          '" class="', entry.read ? 'read' : '', '">',
          '<h4>', entry.title, '<a href="', entry.link, '" target="_new">open</a>',
          '<span class="date">', formattedDateStr, '</span></h4>',
          '<div class="snippet"><span>', entry.snippet, '</span></div>',
          '</li>'].join('');
};

news.formatTimeString = function(timeStr) {
  var time = timeStr.split(':');

  var d = new Date();
  d.setHours(parseInt(time[0], 10), parseInt(time[1], 10));

  var hours = d.getHours();
  var minStr = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
  if (hours > 12) {
    return [hours - 12, ':', minStr, ' PM'].join('');
  } else {
    var amPm = ' AM';
    if (hours == 12) {
      amPm = ' PM';
    }
    return [hours, ':', minStr, amPm].join('');
  }
};

news.renderNewsArticles = function(tx, results, table) {
  var d = document;
  if (window.opener) {
    d = window.opener.document;
  }

  var container = d.getElementById('feeds');

  if (container) {
    container.insertAdjacentHTML(
        'beforeEnd', '<div class="feed" data-table="' + table + '"></div>');

    container = container.querySelector("div[class='feed']:last-of-type");

    if (!results.rows.length) {
      container.insertAdjacentHTML(
        'beforeEnd', '<li>No results.</li>');
      return;
    }

    var html = [];
    for (var i = 0; i < results.rows.length; ++i) {
      html.push(news.articleHTML(results.rows.item(i)));
    }

    container.insertAdjacentHTML(
        'beforeEnd', '<ul>' + html.join('') + '</ul>');

    container.insertAdjacentHTML(
        'afterBegin', '<h2>' + results.rows.item(0).feed + '</h2>');
  }
};

news.addArticle = function(table, article, callback) {
  news.db.transaction(function(tx) {

    var pubDate = new Date(article.publishedDate);

    tx.executeSql('INSERT INTO ' + table + '(content, snippet, title, link, ' +
                  'publishedDate, addedOn, feed) VALUES (?,?,?,?,?,?,?)',
                  [article.content, article.snippet, article.title,
                  article.link, pubDate, new Date(), article.feed],
                  callback, news.onError);
  });
};

window.processFeedResponse = function(table, result, status, details, unused) {

  news.processedFeeds++;

  var callback = function(tx, r) {
    if (news.processedFeeds == news.NUM_FEEDS) {
      news.processedFeeds = 0;
      news.fetchNews();
    }
  };

  for (var i = 0, entry; entry = result.feed.entries[i]; ++i) {
    news.addArticle(table, {
      title: entry.title,
      link: entry.link,
      publishedDate: new Date(entry.publishedDate),
      content: entry.content,
      snippet: entry.contentSnippet,
      feed: result.feed.title
    }, callback);
  }

};
