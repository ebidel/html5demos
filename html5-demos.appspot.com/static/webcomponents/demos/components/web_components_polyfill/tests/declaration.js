module('Declaration');

test('.generateConstructor must create a swizzled-prototype, HTMLElement-derived object', function() {
    var mockElement = function() {}
    var count = 0;
    var result = new (polyfill.Declaration.prototype.generateConstructor.call({
        element: {
            extendsTagName: 'div'
        },
		created: function() {
			count = 0;
		},
        elementPrototype: mockElement.prototype
    }));
    equal(result.__proto__.constructor, mockElement);
    equal(result.__proto__.__proto__, HTMLDivElement.prototype);
});


test('.evalScript must attempt to evaluate script, wrapped in a shim', function() {
	var context = {element: {ok: false}};
    polyfill.Declaration.prototype.evalScript.call(context, {
        textContent: 'this.ok = true;'
    });
    ok(context.element.ok);
});

test('.addTemplate must set the this.template value', function() {
    var mockDeclaration = {};
    polyfill.Declaration.prototype.addTemplate.call(mockDeclaration, 'foo');
    equal(mockDeclaration.template, 'foo');
});

test('.morph must swizzle prototype of an existing object', 4, function() {
    var mockElementPrototype = document.createElement('div');
    var element = document.createElement('div');
    var shadowRootCreated = false;
    polyfill.Declaration.prototype.morph.call({
        element: {
            generatedConstructor: function() {},
            extendsTagName: 'div'
        },
        createShadowRoot: function(e) {
            equal(e.tagName, 'DIV');
            strictEqual(e, element);
            return 'foo';
        },
        created: function(shadowRoot) {
            strictEqual(this, element);
            equal(shadowRoot, 'foo');
        }
    }, element);
});

test('.createShadowRoot must exit early if there is no this.template', function() {
    var result = polyfill.Declaration.prototype.createShadowRoot.call({});
    ok(!result);
});

test('.createShadowRoot must create a WebKitShadowRoot instance', function() {
    var host = document.createElement('div');
    var result = polyfill.Declaration.prototype.createShadowRoot.call({
        template: { childNodes: [] }
    }, host);
    equal(result.__proto__.constructor, WebKitShadowRoot);
	// FIXME: why test all these keys? They don't seem to match the current ShadowRoot instance properties.
	/*
    deepEqual(Object.keys(result), [ 'nextSibling', 'childNodes', 'nodeType', 'host', 'prefix', 'parentElement', 'nodeName',
        'activeElement', 'textContent', 'namespaceURI', 'firstChild', 'innerHTML', 'localName', 'lastChild', 'baseURI',
        'previousSibling', 'ownerDocument', 'nodeValue', 'parentNode', 'attributes' ]);
	*/
});

test('.createShadowRoot must clone template child nodes into the newly created WebKitShadowRoot instance', function() {
    var host = document.createElement('div');
    var span = host.appendChild(document.createElement('span'));
    var b = host.appendChild(document.createElement('b'));
    equal(host.childNodes.length, 2);
    var result = polyfill.Declaration.prototype.createShadowRoot.call({
        template: { childNodes: [ span, b ] }
    }, host);
    equal(result.firstChild.tagName, 'SPAN');
    equal(result.lastChild.tagName, 'B');
    equal(host.childNodes.length, 2);
});

test('.prototypeFromTagName must return correct HTML element prototype', function() {
    equal(polyfill.Declaration.prototype.prototypeFromTagName.call({}, 'div'), HTMLDivElement.prototype);
    equal(polyfill.Declaration.prototype.prototypeFromTagName.call({}, 'span'), HTMLSpanElement.prototype);
    equal(polyfill.Declaration.prototype.prototypeFromTagName.call({}, 'table'), HTMLTableElement.prototype);
});

test('constructor must correctly initialize instance members', function() {
    var declaration = new polyfill.Declaration('scones', 'div');
    equal(declaration.elementPrototype.__proto__, HTMLDivElement.prototype);
    equal(declaration.element.name, 'scones');
    equal(declaration.element.extendsTagName, 'div');
    //strictEqual(declaration.element.declaration, declaration);
    ok(!!declaration.element.generatedConstructor);
});
