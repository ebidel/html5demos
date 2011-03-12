/*
@name HTML 5 dataset Support
@version 0.0.2
@home http://code.eligrey.com/html5/dataset/
@author Elijah Grey - eligrey.com
@license http://www.gnu.org/licenses/lgpl.html
*/
Element.prototype.setDataAttribute = function(name, value) {
  if ( value !== undefined ) return this.setAttribute('data-'+name, value);
  else return this.removeDataAttribute(name);
};
Element.prototype.removeDataAttribute = function(name) {
  return this.removeAttribute('data-'+name);
};
Element.prototype.setDataAttributes = function(items) {
  if ( items instanceof Object ) {
    for (attr in items) if ( items.hasOwnProperty(attr) ) this.setDataAttribute(attr, items[attr]);
  }
};
if ( !Element.prototype.__lookupGetter__("dataset") ) {
  Element.prototype.__defineGetter__("dataset", function() {
    try { // simulate DOMStringMap w/accessor support
      var getter_test = {};
      getter_test.__defineGetter__("test", function(){}); // test setting accessor on normal object
      delete getter_test;
      var HTML5_DOMStringMap = {};
    } catch(e) { var HTML5_DOMStringMap = document.createElement("div") } // use a DOM object for IE8
    function lambda(o) { return function(){return o} };
    function dataSetterFunc(ref_el, attrName) { return function(val){ return ref_el.setDataAttribute(attrName, val) } };
    for ( attr in this.attributes ) {
    if ( this.attributes.hasOwnProperty(attr) && this.attributes[attr].name && /^data-[a-z_\-\d]*$/i.test(this.attributes[attr].name) ) {
      var attrName = this.attributes[attr].name.substr(5), attrVal = this.attributes[attr].value;
      try {
        HTML5_DOMStringMap.__defineGetter__(attrName, lambda(attrVal || '') );
        HTML5_DOMStringMap.__defineSetter__(attrName, dataSetterFunc(this, attrName) );
      }
      catch (e) { HTML5_DOMStringMap[attrName] = attrVal } // if accessors are not working
    }
    }
    return HTML5_DOMStringMap;
  });
}
