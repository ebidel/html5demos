module("Requirements");

test('WebKitShadowRoot is required', 1, function() {
    ok(!!window.WebKitShadowRoot);
});