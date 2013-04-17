module('DeclarationFactory', {
    setup: function() {
        this.declarationFactory = new polyfill.DeclarationFactory();
        this.actualConsole = window.console;
        window.console = {
            error: function(message) {
                this.error = message;
            }.bind(this)
        }
        this.actualDeclaration = polyfill.Declaration;
        this.scriptTextContent = '';
        this.templateTextContent = '';
        var harness = this;
        polyfill.Declaration = function(name, tagName, constructorName) {
            this.name = name;
            this.tagName = tagName;
            this.constructorName = constructorName;
            this.element = {
                generatedConstructor: 'mockConstructor'
            }
            this.evalScript = function(scriptElement) {
                harness.scriptTextContent += scriptElement.textContent;
            }
            this.addTemplate = function(templateElement) {
                harness.templateTextContent += templateElement.textContent;
            }
            harness.declaration = this;
        }
    },
    teardown: function() {
        window.console = this.actualConsole;
        polyfill.Declaration = this.actualDeclaration;
    }
});

test('.createDeclaration must require "name" attribute', function() {
    var element = document.createElement('div');
    this.declarationFactory.createDeclaration(element);
    equal(this.error, 'name attribute is required.');
});

test('.createDeclaration must require "extends" attribute', function() {
    var element = document.createElement('div');
    element.setAttribute('name', 'foo');
    this.declarationFactory.createDeclaration(element);
    equal(this.error, 'extends attribute is required.');
});

test('.createDeclaration must create new Declaration instance', function() {
    var element = document.createElement('div');
    element.setAttribute('name', 'foo');
    element.setAttribute('extends', 'div');
    this.declaration = null;
    this.declarationFactory.createDeclaration(element);
    equal(this.declaration.constructor, polyfill.Declaration);
});

test('.createDeclaration must set generated constructor on the window object', function() {
    var element = document.createElement('div');
    element.setAttribute('name', 'foo');
    element.setAttribute('extends', 'div');
    element.setAttribute('constructor', 'Moodle');
    this.declarationFactory.createDeclaration(element);
    equal(window.Moodle, 'mockConstructor');
    delete window.Moodle;
});

test('.createDeclaration must call declaration.evalScript for each script element that is ancestor of element', function() {
    var element = document.createElement('div');
    element.setAttribute('name', 'foo');
    element.setAttribute('extends', 'div');
    element.appendChild(document.createElement('script')).textContent = 'foo';
    element.appendChild(document.createElement('div')).appendChild(document.createElement('script')).textContent = 'bar';
    this.declarationFactory.createDeclaration(element);
    equal(this.scriptTextContent, 'foobar');
});

test('.createDeclaration must call declaration.addTemplate for first template element that is ancestor of element', function() {
    var element = document.createElement('div');
    element.setAttribute('name', 'foo');
    element.setAttribute('extends', 'div');
    element.appendChild(document.createElement('template')).textContent = 'foo';
    element.appendChild(document.createElement('div')).appendChild(document.createElement('template')).textContent = 'bar';
    this.declarationFactory.createDeclaration(element);
    equal(this.templateTextContent, 'foo');
});

test('.createDeclaration must call oncreate (if specified) with Declaration as argument', function() {
    var element = document.createElement('div');
    element.setAttribute('name', 'foo');
    element.setAttribute('extends', 'div');
    var count = 0;
    this.declarationFactory.oncreate = function(declaration) {
        count++;
        equal(declaration.constructor, polyfill.Declaration);
    }
    this.declarationFactory.createDeclaration(element);
    equal(count, 1);
    delete this.declarationFactory.oncreate;
});
