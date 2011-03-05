/**
 * Copyright 2010 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
function Presentation(parent) {
  this.DOM_PARENT = parent;
  this.DOM_COUNTER = $('<div>loading...</div>').addClass('presentationCounter').get(0);
  $(parent).prepend($(this.DOM_COUNTER));
  
  this.slides = this.DOM_PARENT.getElementsByClassName('slide');
  
  //$(this.slides).bind('contextmenu', $.proxy(this, 'onSlideClick'));
  
  var onHashChange = jQuery.proxy(this, 'onHashChange');
  window.addEventListener('hashchange', onHashChange, false);
  
  var onKeyDown = jQuery.proxy(this, 'onKeyDown');
  window.addEventListener('keydown', onKeyDown, false);
  
  var myself = this;
  this.ONHASHCHANGE_INIT = true;
  this.ONHASHCHANGE_SUPPORTED = true;
  this.ONHASHCHANGE_TIMEOUT = window.setTimeout(function() {
    myself.ONHASHCHANGE_SUPPORTED = false;
    myself.onHashChange();
  }, 1000);
  if (!window.location.hash) {
    window.location.hash = "start";
  }
};

Presentation.prototype.onSlideClick = function(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  this.nextSlide();
  if (this.ONHASHCHANGE_SUPPORTED == false) { this.onHashChange(); }
  return false;
};

Presentation.prototype.onHashChange = function(evt) {
  if (this.ONHASHCHANGE_INIT == true) {
    window.clearTimeout(this.ONHASHCHANGE_TIMEOUT);
    this.ONHASHCHANGE_INIT = false;
  }
  this.currentSlideNumber = 1;
  if (window.location.hash != "") {
    var slideNumber = parseInt(window.location.hash.replace('#slide', ''));
    if (slideNumber > 0 && slideNumber <= this.slides.length) {
      this.currentSlideNumber = slideNumber;
    }
  }
  this.updateSlideClasses();
};

Presentation.prototype.onKeyDown = function(evt) {
  switch (evt.keyCode) {
    case 37: // left arrow
      this.prevSlide();
      if (this.ONHASHCHANGE_SUPPORTED == false) { this.onHashChange(); }
      break;
    case 39: // right arrow
      this.nextSlide();
      if (this.ONHASHCHANGE_SUPPORTED == false) { this.onHashChange(); }
      break;
  }
};

Presentation.prototype.updateSlideClasses = function() {
  var num = this.currentSlideNumber;
  $('.slides').show();
  this.DOM_COUNTER.innerText = num;
  window.location.hash = "slide" + num;
  for (var i = 1; i <= this.slides.length; i++) {
    switch (i) {
      case (num - 2):
        this.changeSlideClass(i, 'far-past');
        break;
      case (num - 1):
        this.changeSlideClass(i, 'past');
        break;
      case (num):
        this.changeSlideClass(i, 'current');
        break;
      case (num + 1):
        this.changeSlideClass(i, 'future');
        break;
      case (num + 2):
        this.changeSlideClass(i, 'far-future');
        break;
      default:
        if (i < num) {
          this.changeSlideClass(i, 'far-far-past');  
        } else {
          this.changeSlideClass(i, 'far-far-future');  
        }
        break;
    }
  }
};

Presentation.prototype._gainingClass = function(elem, newClass, checkClass) {
  return (newClass == checkClass && !elem.hasClass(newClass));
};

Presentation.prototype._losingClass = function(elem, newClass, checkClass) {
  return (newClass != checkClass && elem.hasClass(checkClass));
};

Presentation.prototype.changeSlideClass = function(index, className) {
  var slide = this.getSlide(index);
  if (slide) {
    slide = jQuery(slide);
    if (this._losingClass(slide, className, 'current')) {
      window.setTimeout(function() {
        slide.trigger('blurslide');
      }, 10);      
    } else if (this._gainingClass(slide, className, 'current')) {
      window.setTimeout(function() {
        slide.trigger('focusslide');
      }, 300);
    } else if (this._gainingClass(slide, className, 'past') ||
               this._gainingClass(slide, className, 'future')) {
      window.setTimeout(function() {
        slide.trigger('queuedslide');
      }, 300);
    }
    var classes = 'far-far-past far-past past current future far-future far-far-future';
    slide
      .addClass('hidden')
      .removeClass(classes)
      .addClass(className)
      .removeClass('hidden');
  }
};

Presentation.prototype.getSlide = function(number) {
  if (number > 0 && number <= this.slides.length) {
    return this.slides[number - 1];
  } else {
    return null;
  }
};

Presentation.prototype.nextSlide = function() {
  if (this.currentSlideNumber < this.slides.length) {
    this.currentSlideNumber++;
    window.location.hash = "slide" + this.currentSlideNumber;
  }
};

Presentation.prototype.prevSlide = function() {
  if (this.currentSlideNumber > 1) {
    this.currentSlideNumber--;
    window.location.hash = "slide" + this.currentSlideNumber;
  }
};

jQuery().ready(function() {
  var container = $('.presentation').get(0);
  var presentation = new Presentation(container);
});
