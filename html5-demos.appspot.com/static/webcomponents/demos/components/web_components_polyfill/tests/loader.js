module("Loader");

test('.start must find all link[rel=components] instances in the document', 3, function() {
    var fixture = document.querySelector('#qunit-fixture');
    var createComponentsLink = function(url) {
        var link = fixture.appendChild(document.createElement('link'));
        link.rel = 'components';
        link.href = url;
    }

    var urls = [ 'http://monkey/', 'http://bear/', 'http://fish/' ];
    urls.forEach(createComponentsLink);

    var loader = new polyfill.Loader();
    var counter = 0;
    var loadMethodOverride = function(url)
    {
        equal(url, urls[counter++]);
    }
    loader.load = loadMethodOverride;
    loader.start();
});

test('.start must supply pre-resolved urls', 3, function() {
    var fixture = document.querySelector('#qunit-fixture');
    var createComponentsLink = function(url) {
        var link = fixture.appendChild(document.createElement('link'));
        link.rel = 'components';
        link.href = url;
    }

    var urls = [ 'monkey', '', 'https://fish' ];
    urls.forEach(createComponentsLink);

    var a = document.createElement('a');
    var resolvedUrls = urls.map(function(url) {
        a.href = url;
        return a.href;
    });

    var loader = new polyfill.Loader();
    var counter = 0;
    var loadMethodOverride = function(url)
    {
        equal(url, resolvedUrls[counter++]);
    }
    loader.load = loadMethodOverride;
    loader.start();
});

asyncTest('.load must fetch contents of a file and invoke .onload', 1, function() {
    var a = document.createElement('a');
    a.href = 'resources/char.txt';
    var url = a.href;

    var loader = new polyfill.Loader();
    loader.onload = function(contents)
    {
        equal(contents, 'A');
        start();
    }
    loader.load(url);
});

asyncTest('.load must fail gracefully on file load and invoke .onerror', 1, function(){
    var a = document.createElement('a');
    a.href = 'cant/find.me';
    var url = a.href;

    var loader = new polyfill.Loader();
    loader.onerror = function(status, xhr)
    {
        equal(status, 404);
        start();
    }
    loader.load(url);
});

asyncTest('end-to-end test', 1, function() {
    var fixture = document.querySelector('#qunit-fixture');
    var createComponentsLink = function(url) {
        var link = fixture.appendChild(document.createElement('link'));
        link.rel = 'components';
        link.href = url;
    }

    createComponentsLink('resources/char.txt')

    var loader = new polyfill.Loader();
    loader.onload = function(contents)
    {
        equal(contents, 'A');
        start();
    }
    loader.start();
});