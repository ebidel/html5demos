module('HTMLElementElement');

test('constructor must initialize instance members.', function() {
    var htmlElementElement = new polyfill.HTMLElementElement('foo', 'bar', {});
    equal(htmlElementElement.name, 'foo');
    equal(htmlElementElement.extendsTagName, 'bar');
});

test('constructor must bind lifecycle method to declaration.', function() {
    var mockDeclaration = {};
    var htmlElementElement = new polyfill.HTMLElementElement('foo', 'bar', mockDeclaration);
    htmlElementElement.lifecycle({ created: 'baz'});
    equal(mockDeclaration.created, 'baz');
    //check inserted life cycle event.
    htmlElementElement.lifecycle({ inserted: 'foo'});
    equal(mockDeclaration.inserted, 'foo');
});
