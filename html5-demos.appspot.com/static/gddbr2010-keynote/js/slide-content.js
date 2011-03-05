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
 
/*******************************************************************************
 * TIMELINE CLASS
 ******************************************************************************/
var TimeLine = function(slide) {
  this.ITEM_WIDTH = 120;
  this.TL_PADDING = 40;
  
  this.MIN_YEAR = 9999;
  this.MAX_YEAR = 0;
  this.MIN_TOP = 9999;
  this.MAX_TOP = 0;
  this.DOM_PARENT = slide;
  this.DOM_SLIDER = $(slide).find('.timelineSlider').get(0);
  this.DOM_CANVAS = document.createElement('canvas');
  
  this._parseTimeline();
  this._renderPoints();
  this._renderYears();
  this._alignContent();
  
  $(this.DOM_PARENT)
      .bind('click', $.proxy(this, 'step'))
      .bind('focusslide', $.proxy(this, '_alignContent'))
      .bind('queuedslide', $.proxy(this, '_alignContent'));
  
  this.step();
  this.aligned = false;
};
TimeLine.prototype._parseTimeline = function() {
  this.DOM_ENTRIES = $(this.DOM_SLIDER).find('div[year]').get();
  this.ENTRY_POINTS = [];
  
  var raw_points = [];
  for (var i = 0; i < this.DOM_ENTRIES.length; i++) {
    var entry = $(this.DOM_ENTRIES[i]);
    var entry_year = Number(entry.attr('year'));
    var entry_top = Number(entry.attr('top'));
    if (entry_year < this.MIN_YEAR) { this.MIN_YEAR = entry_year; }
    if (entry_year > this.MAX_YEAR) { this.MAX_YEAR = entry_year; }
    if (entry_top < this.MIN_TOP) { this.MIN_TOP = entry_top; }
    if (entry_top > this.MAX_TOP) { this.MAX_TOP = entry_top; }
    raw_points.push({'year': entry_year, 'top': entry_top }); 
  }
  
  for (var i = 0; i < raw_points.length; i++) {
    this.ENTRY_POINTS[i] = {
      'x': this._yearToX(raw_points[i].year),
      'y': this._topToY(raw_points[i].top)
    };
  }
  
  this.current_index = -1;
};
TimeLine.prototype._yearToX = function(year) {
  return this.TL_PADDING + (year - this.MIN_YEAR) * this.ITEM_WIDTH;
};
TimeLine.prototype._topToY = function(top) {
  return this.TL_PADDING + (top - this.MIN_TOP);
};
TimeLine.prototype._renderMarker = function(context, x, y) {
  context.beginPath();
  context.arc(x, y, 20, 0, 2 * Math.PI, false);
  context.lineWidth = 5;
  context.fillStyle = '#fff';
  context.fill();
  context.stroke();
  context.closePath();
};
TimeLine.prototype._renderPoints = function() {
  this.DOM_CANVAS.width = this._yearToX(this.MAX_YEAR) + this.TL_PADDING;
  this.DOM_CANVAS.height = this._topToY(this.MAX_TOP) + this.TL_PADDING;
  
  var prev_point = this.ENTRY_POINTS[0];
  var context = this.DOM_CANVAS.getContext('2d');
  context.beginPath();
  context.moveTo(prev_point.x, prev_point.y);
  for (var i = 1; i < this.ENTRY_POINTS.length; i++) {
    var point = this.ENTRY_POINTS[i];
    var mid_x = (point.x - prev_point.x) / 2;
    context.bezierCurveTo(
        prev_point.x + mid_x, prev_point.y,
        point.x - mid_x, point.y,
        point.x, point.y);
    prev_point = point;
  }
  context.lineWidth = 10;
  context.lineCap = 'round';
  context.stroke();
  context.closePath();
  
  for (var i = 0; i < this.ENTRY_POINTS.length; i++) {
    var point = this.ENTRY_POINTS[i];
    this._renderMarker(context, point.x, point.y);
  }
  
  var bg_css = [
     'url(', 
     this.DOM_CANVAS.toDataURL(),
     ') no-repeat top left'
  ].join('');
  
  $(this.DOM_SLIDER)
      .css('width', this.DOM_CANVAS.width + 'px')
      .css('height', this.DOM_CANVAS.height + 'px')
      .css('background', bg_css);
};
TimeLine.prototype._renderYears = function() {
  for (var i = 0; i < this.ENTRY_POINTS.length; i++) {
    
    var entry = $(this.DOM_ENTRIES[i]);
    var point = this.ENTRY_POINTS[i];
    
    var year = entry.attr('year');
    var dom_year = $('<div>' + year + '</div>');
    dom_year.addClass('timelineYear');
    entry.prepend(dom_year);
    
    var left = point.x - entry.outerWidth() / 2;
    var top = point.y - entry.outerHeight() / 2;
    entry
        .addClass('timelineContent')
        .css('left', left)
        .css('top', top);
  }
};
TimeLine.prototype._alignContent = function() {
  for (var i = 0; i < this.ENTRY_POINTS.length; i++) {
    var entry = $(this.DOM_ENTRIES[i]);
    var point = this.ENTRY_POINTS[i];
    var left = point.x - entry.outerWidth() / 2;
    var top = point.y - entry.outerHeight() / 2;
    entry
        .css('left', left)
        .css('top', top);
  }
  this.aligned = true;
};
TimeLine.prototype.step = function() {
  $(this.DOM_ENTRIES).removeClass('selected');
  var slider = $(this.DOM_SLIDER);
  this.current_index++;
  
  if (this.current_index == this.ENTRY_POINTS.length) {
    var parent = $(this.DOM_PARENT);
    var scale = parent.width() / (slider.width() + 200);
    slider
        .addClass('timelineZoomOut')
        .css('-webkit-transform', 'scale(' + scale + ')')
        .css('left', 100 * scale)
        .css('top', parent.height() / 2 - slider.height() / 2);
    this.current_index = -1;
    return;
  } else if (this.current_index == 0) {
    slider
        .removeClass('timelineZoomOut')
        .css('-webkit-transform', 'scale(1.0)');
  }
  var point = this.ENTRY_POINTS[this.current_index];
  var parent = $(this.DOM_PARENT);
  var left = -point.x + (parent.width() / 2);
  var top = -point.y + (parent.height() / 2);
  
  var dom_entry = $(this.DOM_ENTRIES[this.current_index]);
  dom_entry.addClass('selected');

  slider
      .css('left', left)
      .css('top', top);
  
  if (this.aligned == false) {
    this._alignContent();
  }
};

/*******************************************************************************
 * PHYSICS CLASS
 ******************************************************************************/
var PhysicsBox = function(slide) {
  this.DOM_PARENT = slide;
  this.DOM_MASK = $(slide).find('.physicsBoxMask').get();
  this.BOXES = $(slide).find('.physicsBox').get();
  this.WORLD = null;
  this.SPAWN_INTERVAL = 400;
  this.LAST_RENDER = null;
  this.MAX_TIME = 10000;
  this.DRAW_CANVAS = false;
  this.TIME_SCALE = 0.8;
  this.ACCURACY = 20;
  this.WORLD_GRAVITY = 1000;
  
  this._initCanvas();
  this._initDOM();
        
  $(this.DOM_PARENT)
      .click($.proxy(this, '_spawnBoxes'))
      .bind('queuedslide', $.proxy(this, '_alignContent'));
      
  window.setTimeout($.proxy(this, '_alignContent'), 100);
};
PhysicsBox.prototype._createWorld = function() {
  var worldAABB = new b2AABB();
  var width = $(this.DOM_PARENT).width();
  var height = $(this.DOM_PARENT).height();
  
  worldAABB.minVertex.Set(-100, -100);
  worldAABB.maxVertex.Set(width + 100, height + 100);
  
  var gravity = new b2Vec2(0, this.WORLD_GRAVITY);
  var doSleep = true;
  delete this.WORLD;
  this.WORLD = new b2World(worldAABB, gravity, doSleep);
  
  this._createBarrier(0, height + 70, width, 100); // Ground
  this._createBarrier(-20, height / 2, 50, height); // Left wall
  this._createBarrier(width + 20, height / 2, 50, height); // Right wall  
};
PhysicsBox.prototype._createBarrier = function(x, y, w, h) {
  var shape = new b2BoxDef();
  shape.extents.Set(w, h);
  shape.restitution = 0.0;
  var body = new b2BodyDef();
  body.AddShape(shape);
  body.position.Set(x, y);
  return this.WORLD.CreateBody(body);
};
PhysicsBox.prototype._getValue = function(args, param, defaultValue) {
  return args.hasOwnProperty(param) ? args[param] : defaultValue;
}
PhysicsBox.prototype._getRandVelocity = function() {
  var velocity = Math.random() * 100 + 100;
  var modifier = (Math.random() > 0.5) ? 1 : -1; //Math.round(Math.random() * 3) - 1;
  return velocity * modifier;
};
PhysicsBox.prototype._createBox = function(x, y, w, h, opt_args) {
  if (typeof(opt_args) == 'undefined') {
    opt_args = {};
  }

  var shape = new b2BoxDef();
  shape.density = this._getValue(opt_args, 'density', 100);
  shape.friction = this._getValue(opt_args, 'friction', 0.6);
  shape.restitution = this._getValue(opt_args, 'restitution', 0);
  
  shape.extents.Set(w / 2, h / 2);
  body = new b2BodyDef();
  
  var hVeloc = this._getValue(opt_args, 'hvelocity', this._getRandVelocity());
  var vVeloc = 0;
  body.linearVelocity = new b2Vec2(hVeloc, vVeloc);
  body.linearDamping = this._getValue(opt_args, 'lineardamping', 0);
  body.angularDamping = this._getValue(opt_args, 'angulardamping', 0.1);  
  body.AddShape(shape);
  body.position.Set(x, y);
  
  var box = this.WORLD.CreateBody(body);
  box.extraData = opt_args;
  return box;
};
PhysicsBox.prototype._alignContent = function() {
  $(this.BOXES).addClass('hidden');
  var mask = $(this.DOM_MASK);
  var parent = $(this.DOM_PARENT);
  var left = parent.width() / 2 - mask.outerWidth() / 2;
  var top = parent.height() / 4 - mask.outerHeight() / 2;
  
  mask.css('left', left)
      .css('top', top)
      .css('-webkit-transform', 'rotate(0deg)');
};
PhysicsBox.prototype._spawnBoxes = function() {
  if (this.WORLD != null) {
    return;
  }
  this._createWorld();
  this._alignContent();
  this.LAST_RENDER = null;
  var timer = 100;
  var parent = $(this.DOM_PARENT);
  var startX = parent.width() / 2;
  var startY = parent.height() / 4;
  for (var i = 0; i < this.BOXES.length; i++) {
    var box = $(this.BOXES[i]);
    setTimeout(function (box, x, y, func) {
      func(box.attr('id'), x, y);
    }, timer, box, startX, startY, $.proxy(this, '_bindBox'));
    timer += this.SPAWN_INTERVAL;
  }
  
  var mask = $(this.DOM_MASK);      
  setTimeout(function(func) {
    func(startX, startY, mask.outerWidth(), mask.outerHeight(), {
        'id': mask.attr('id'),
        'density': 10,
        'hvelocity': 0
    });
  }, timer + 1000, $.proxy(this, '_createBox'));

  this._step();
};
PhysicsBox.prototype._initCanvas = function() {
  this.DOM_CANVAS = document.createElement('canvas');
  this.DOM_PARENT.appendChild(this.DOM_CANVAS);
  this.DOM_CANVAS.className = "physicsCanvas";
  
  var parent = $(this.DOM_PARENT);
  this.DOM_CANVAS.width = parent.width();
  this.DOM_CANVAS.height = parent.height();
  this.CONTEXT = this.DOM_CANVAS.getContext('2d');
};
PhysicsBox.prototype._initDOM = function() {
  var prefix = Math.round(Math.random() * 100).toString(16);
  for (var i = 0; i < this.BOXES.length; i++) {
    this.BOXES[i].setAttribute('id', prefix + 'physicsBoxNo' + i);
  }
  $(this.BOXES).addClass('hidden');
  $(this.DOM_MASK).attr('id', prefix + 'physicsMask');
  this._alignContent();
};
PhysicsBox.prototype._drawWorld = function() {
  if (this.DRAW_CANVAS) {
    this.CONTEXT.clearRect(0, 0, this.DOM_CANVAS.width, this.DOM_CANVAS.height);
  }
  for (var b = this.WORLD.m_bodyList; b; b = b.m_next) {
    if (b.extraData) {
      var degRotation = 180 * b.m_rotation / Math.PI;
      var dom = $('#' + b.extraData.id);
      var domX = b.m_position0.x - (dom.outerWidth() / 2);
      var domY = b.m_position0.y - (dom.outerHeight() / 2);
      dom
        .css('-webkit-transform', 'rotate(' + degRotation + 'deg)')
        .css('left', domX)
        .css('top', domY);
      if (b.extraData.hidden == true) {
        b.extraData.hidden = false;
        dom.css('visibility', 'visible');
      }
    } 
    
    if (this.DRAW_CANVAS) {
      for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
        this._drawShape(s);
      }
    }
  } 
};
PhysicsBox.prototype._drawShape = function(shape) {
  this.CONTEXT.beginPath();
  switch (shape.m_type) {
    case b2Shape.e_polyShape:
      var poly = shape;
      var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
      this.CONTEXT.moveTo(tV.x, tV.y);
      for (var i = 0; i < poly.m_vertexCount; i++) {
        var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
        this.CONTEXT.lineTo(v.x, v.y);
      }
      this.CONTEXT.lineTo(tV.x, tV.y);
      break;
  }
  this.CONTEXT.stroke();
};
PhysicsBox.prototype._bindBox = function(id, x, y, opt_args) {
  var dom = $('#' + id);
  dom
      .css('left', x)
      .css('top', y)
      .css('-webkit-transform', 'rotate(0deg)')
      .removeClass('hidden')
      .css('visibility', 'hidden');
  
  opt_args = opt_args || {};
  opt_args['id'] = id;
  opt_args['hidden'] = true;
  
  this._createBox(x, y, dom.outerWidth(), dom.outerHeight(), opt_args);
};
PhysicsBox.prototype._step = function() {
  var time = new Date().getTime();
  if (this.LAST_RENDER == null) {
    this.LAST_RENDER = time;
    this.START_TIME = time;
  }
  var delta = (time - this.LAST_RENDER) / 1000;
  if (this.TIME_SCALE != 1) {
    delta *= this.TIME_SCALE;
  }
  this.LAST_RENDER = time;
  if (this.WORLD != null) {
    this.WORLD.Step(delta, this.ACCURACY);
    this._drawWorld();
  }
  if (time - this.START_TIME < this.MAX_TIME) {
    setTimeout($.proxy(this, '_step'), 10);
  } else {
    this.WORLD = null;
  }
};
/*******************************************************************************
 * SIMPLE DRAWING CANVAS CLASS
 ******************************************************************************/
var DrawingCanvas = function(slide) {
  this.DOM_PARENT = slide;
  this.DOM_CANVAS = $(slide).find('.workerCanvas').get(0);
  this.CONTEXT = this.DOM_CANVAS.getContext('2d');
  this.COLOR_FILL = '#36b';
  this.DRAWING = false;
  this.LAST_POINT = null;
  this.DEFAULT_SIZE = 15;
  this.INTERPOLATE = false;
  
  $(this.DOM_PARENT)
      .bind('focusslide', $.proxy(this, '_startListening'))
      .bind('blurslide', $.proxy(this, '_stopListening'));
};
DrawingCanvas.prototype._paintPixel = function(x, y, size) {
  if (size == null) {
    size = this.DEFAULT_SIZE;
  }
  var block_x = Math.floor(x / size);
  var block_y = Math.floor(y / size);
  var draw_x = Math.round(block_x * size);
  var draw_y = Math.round(block_y * size);
  this.CONTEXT.fillStyle = this.COLOR_FILL;
  this.CONTEXT.fillRect(draw_x, draw_y, size, size);
};
DrawingCanvas.prototype._paintLine = function(x1, y1, x2, y2) {
 var slope = (x2 == x1) ? null : (y2 - y1) / (x2 - x1);
  var x = 0;
  var y = 0;
  
  if (x2 == x1) {
    if (y2 < y1) {
      y1 ^= y2;
      y2 ^= y1;
      y1 ^= y2;
    }
    for (var y = y1; y <= y2; y++) {
      this._paintPixel(x1, y);
    }
  } else if (y2 == y1) {
    if (x2 < x1) {
      x1 ^= x2;
      x2 ^= x1;
      x1 ^= x2;
    }
    for (var x = x1; x <= x2; x++) {
      this._paintPixel(x, y1);
    }
  } else if (Math.abs(slope) < 1) {
    if (x2 < x1) {
      x1 ^= x2;
      x2 ^= x1;
      x1 ^= x2;
      y1 ^= y2;
      y2 ^= y1;
      y1 ^= y2;
      slope = (x2 == x1) ? null : (y2 - y1) / (x2 - x1);
    }
    var c = y1 - (slope * x1);
    for (var x = x1; x <= x2; x += 1) {
      y = slope * x + c;
      this._paintPixel(x, y);
    }
  } else {
    if (y2 < y1) {
      y1 ^= y2;
      y2 ^= y1;
      y1 ^= y2;
      x1 ^= x2;
      x2 ^= x1;
      x1 ^= x2;
      slope = (x2 == x1) ? null : (y2 - y1) / (x2 - x1);
    }
    var c = y1 - (slope * x1);
    for (var y = y1; y <= y2; y += 1) {
      x = (y - c) / slope;
      this._paintPixel(x, y);
    }
  }
}
DrawingCanvas.prototype._onMouseDown = function(evt) {
  this.DRAWING = true;
  this._onMouseMove(evt);
};
DrawingCanvas.prototype._onMouseUp = function(evt) {
  this.DRAWING = false;
  this.LAST_POINT = null;
};
DrawingCanvas.prototype._onMouseMove = function(evt) {
  var x = evt.offsetX || evt.pageX - this.DOM_CANVAS.offsetLeft;
  var y = evt.offsetY || evt.pageY - this.DOM_CANVAS.offsetTop;
  if (this.DRAWING) {
    if (this.INTERPOLATE && this.LAST_POINT) {
      this._paintLine(this.LAST_POINT.x, this.LAST_POINT.y, x, y);
    }
    this._paintPixel(x, y);
    this.LAST_POINT = {
      'x' : x,
      'y' : y
    };
  }
};
DrawingCanvas.prototype._startListening = function() {
  this.OLD_SELECTSTART = document.onselectstart;
  document.onselectstart = function () { return false; };
  this.MOVE_LISTENER = $.proxy(this, '_onMouseMove');
  this.DOWN_LISTENER = $.proxy(this, '_onMouseDown');
  this.UP_LISTENER = $.proxy(this, '_onMouseUp');
  
  $(this.DOM_CANVAS)
      .bind('mousedown', this.DOWN_LISTENER)
      .bind('mousemove', this.MOVE_LISTENER);
  $(window)
      .bind('mouseup', this.UP_LISTENER);
};
DrawingCanvas.prototype._stopListening = function() {
  document.onselectstart = this.OLD_SELECTSTART;
  this.OLD_SELECTSTART = null;
  
  $(this.DOM_CANVAS)
      .unbind('mousedown', this.DOWN_LISTENER)
      .unbind('mousemove', this.MOVE_LISTENER);
  $(window)
      .unbind('mouseup', this.UP_LISTENER);
  
  this.MOVE_LISTENER = null;
  this.DOWN_LISTENER = null;
  this.UP_LISTENER = null;
};
DrawingCanvas.prototype.clear = function() {
  this.CONTEXT.clearRect(0, 0, this.DOM_CANVAS.width, this.DOM_CANVAS.height);
};
DrawingCanvas.prototype.setColor = function(color) {
  this.COLOR_FILL = color;
};
/*******************************************************************************
 * DIFF SCHEDULER
 ******************************************************************************/
var DiffScheduler = function(slide, drawCanvas, diffCanvas) {
  this.DOM_PARENT = slide;
  this.USE_WORKER = false;
  this.RUN = false;
  this.DOM_DRAW_CANVAS = drawCanvas;
  this.DOM_DIFF_CANVAS = diffCanvas;
  this.DRAW_CONTEXT = drawCanvas.getContext('2d');
  this.DIFF_CONTEXT = diffCanvas.getContext('2d');
  this.DIFF_ID = this.DIFF_CONTEXT.createImageData(
      this.DOM_DIFF_CANVAS.width, 
      this.DOM_DIFF_CANVAS.height);
  this.IMAGE_DIFFER = new ImageDiffer();
  
  $(this.DOM_PARENT)
      .bind('focusslide', $.proxy(this, 'start'))
      .bind('blurslide', $.proxy(this, 'stop'));
      
};
DiffScheduler.prototype.setUseWorker = function(val) {
  if (val == true) {
    if (this.WORKER == null) {
      this.WORKER = new Worker('static/js/worker.js');
      this.WORKER.addEventListener('message', $.proxy(this, '_workerOnDiff'), false);
    }
  }
  this.USE_WORKER = val;
};
DiffScheduler.prototype.start = function() {
  this.RUN = true;
  this._scheduleDiff();
};
DiffScheduler.prototype.stop = function() {
  this.RUN = false;
  if (this.WORKER != null) {
    this.WORKER.terminate();
    this.WORKER = null;
  }
}
DiffScheduler.prototype._scheduleDiff = function() {
  if (this.RUN == false) {
    return;
  }
  if (this.USE_WORKER) {
    var timeout = 1;
    var func = $.proxy(this, '_workerGetDiff');
  } else {
    var timeout = 100;
    var func = $.proxy(this, '_normalGetDiff');
  }
  window.setTimeout(func, timeout);
};
DiffScheduler.prototype._renderDiffArray = function(diff) {
  this.DIFF_CONTEXT.putImageData(diff, 0, 0);
  this._scheduleDiff();
};
DiffScheduler.prototype._normalGetDiff = function() {
  var currData = this.DRAW_CONTEXT.getImageData(
      0, 
      0, 
      this.DOM_DRAW_CANVAS.width, 
      this.DOM_DRAW_CANVAS.height);
  this._renderDiffArray(this.IMAGE_DIFFER.diff(currData, this.DIFF_ID));
};
DiffScheduler.prototype._workerGetDiff = function() {
  var currData = this.DRAW_CONTEXT.getImageData(
      0, 
      0, 
      this.DOM_DRAW_CANVAS.width, 
      this.DOM_DRAW_CANVAS.height);
  this.WORKER.postMessage({'imageData': currData, 'diffData': this.DIFF_ID});
};
DiffScheduler.prototype._workerOnDiff = function(evt) {
  this._renderDiffArray(evt.data);
};

/*******************************************************************************
 * CANVAS DEMOS
 ******************************************************************************/
var CanvasDemo = function(canvas) {
  this.DOM_CANVAS = canvas;
  this.CONTEXT = canvas.getContext('2d');
};
CanvasDemo.prototype.drawLine = function() {
  var random = Math.random() * (this.DOM_CANVAS.width - 80);
  var x1 = 40 + random;
  var y1 = 40;
  var x2 = this.DOM_CANVAS.width - 40 - random;
  var y2 = this.DOM_CANVAS.height - 40;
  
  this.CONTEXT.beginPath();
  this.CONTEXT.moveTo(x1, y1);
  this.CONTEXT.lineTo(x2, y2);
  this.CONTEXT.lineWidth = 20;
  this.CONTEXT.lineCap = "round";
  this.CONTEXT.strokeStyle = "rgba(255, 0, 0, 0.7)";
  this.CONTEXT.stroke();
  this.CONTEXT.closePath();
};
CanvasDemo.prototype.drawCircle = function() {
  var randomx = Math.random() * (this.DOM_CANVAS.width - 160);
  var randomy = Math.random() * (this.DOM_CANVAS.height - 160);
  var x = randomx + 80;
  var y = randomy + 80;
  var radius = 80;
  var starta = Math.PI * -0.4;
  var enda = Math.PI * 1.4;
  
  this.CONTEXT.beginPath();
  this.CONTEXT.arc(x, y, radius, starta, enda, false);
  this.CONTEXT.lineWidth = 30;
  this.CONTEXT.lineCap = "round";
  this.CONTEXT.strokeStyle = "rgba(0, 255, 0, 0.7)";
  this.CONTEXT.stroke();
  this.CONTEXT.closePath();
};
CanvasDemo.prototype.drawPixels = function() {
  var id_old = this.CONTEXT.getImageData(0, 0, 
      this.DOM_CANVAS.width, 
      this.DOM_CANVAS.height);
  var id_new = this.CONTEXT.createImageData(
      this.DOM_CANVAS.width, 
      this.DOM_CANVAS.height);
  var myself = this;
  
  function setPixel(img, x, y, data) {
    var i = (y * myself.DOM_CANVAS.width + x) * 4;
    for (var j = 0; j < 4; j++) {
      img.data[i + j] = data[j];
    }
  };
  
  function getPixel(img, x, y) {
    var i = (y * myself.DOM_CANVAS.width + x) * 4;
    var pixel = [img.data[i], img.data[i+1], img.data[i+2], img.data[i+3]];
    return pixel;
  };
  
  for (var x = 0; x < this.DOM_CANVAS.width; x++) {
    var y_mod = Math.round(Math.sin(x / 10.0) * 20);
    for (var y = 0; y < this.DOM_CANVAS.height; y++) {
      var pixel = getPixel(id_old, x, y);
      var new_y = y + y_mod;
      if (new_y >= 0 && new_y < this.DOM_CANVAS.height) {
        setPixel(id_new, x, new_y, pixel);
      }
    }
  }
  this.CONTEXT.putImageData(id_new, 0, 0);
};
CanvasDemo.prototype.clear = function() {
  this.CONTEXT.clearRect(0, 0, this.DOM_CANVAS.width, this.DOM_CANVAS.height);
};

/*******************************************************************************
 * DRAG AND DROP
 ******************************************************************************/
var DragManager = function() {
  this._current = null;
  this._inchild = false;
};
DragManager.prototype._onDragStart = function(evt) {
  this._current = evt.target;
};
DragManager.prototype._onDragEnd = function(evt) {
  this._current = null;
};
DragManager.prototype._onDragEnter = function(evt) {
  evt.preventDefault();
  if ($(evt.target.parentNode).hasClass('hover')) {
    this._inchild = true;
  } else {
    $(evt.target).addClass('hover');
    this._inchild = false;
  }
};
DragManager.prototype._onDragOver = function(evt) {
  evt.preventDefault();
};
DragManager.prototype._onDragLeave = function(evt) {
  if (this._inchild == false) {
    $(evt.target).removeClass('hover');
  }
};
DragManager.prototype._onDrop = function(evt) {
  var node = this._inchild ? evt.target.parentNode : evt.target;
  if (this._current && this._current.parentNode != node) {
    $(node).append(this._current);
  }
  $(node).removeClass('hover');
};
DragManager.prototype.addDragElements = function(elems) {
  for (var i = 0; i < elems.length; i++) {
    elems[i].setAttribute('draggable', 'true');
    elems[i].addEventListener('dragstart', $.proxy(this, '_onDragStart'), false);
    elems[i].addEventListener('dragend', $.proxy(this, '_onDragEnd'), false);
  }
};
DragManager.prototype.addDropElements = function(elems) {
  for (var i = 0; i < elems.length; i++) {
    elems[i].addEventListener('dragleave', $.proxy(this, '_onDragLeave'), false);
    elems[i].addEventListener('dragenter', $.proxy(this, '_onDragEnter'), true);
    elems[i].addEventListener('dragover', $.proxy(this, '_onDragOver'), false);
    elems[i].addEventListener('drop', $.proxy(this, '_onDrop'), false);
  }  
};
/*******************************************************************************
 * NOTIFICATIONS
 ******************************************************************************/
var NotificationManager = function(slide) {
  this.DOM_SLIDE = slide;
  this.DISPLAY_BOX = slide.getElementsByClassName('displayBox')[0];
  this.SHOW_BUTTON = slide.getElementsByClassName('showButton')[0];
  this.PERM_BUTTON = slide.getElementsByClassName('requestButton')[0];
  
  this.SHOW_BUTTON.addEventListener('click', $.proxy(this, 'show'), false);
  this.PERM_BUTTON.addEventListener('click', $.proxy(this, 'request'), false);
  this.displayState();
};
NotificationManager.prototype.displayState = function() {
  if (!window.hasOwnProperty('webkitNotifications')) { 
    this.DISPLAY_BOX.innerHTML = 'does not support requesting';
    this.SHOW_BUTTON.style.display = 'none';
    this.PERM_BUTTON.style.display = 'none';
    return; 
  }
  var perm = window.webkitNotifications.checkPermission();
  if (perm == 0) {
    this.DISPLAY_BOX.innerHTML = 'has';
    this.SHOW_BUTTON.style.display = 'inline';
    this.PERM_BUTTON.innerText = 'Ask again';
  } else {
    this.DISPLAY_BOX.innerHTML = 'does not have';
    this.SHOW_BUTTON.style.display = 'none';
    this.PERM_BUTTON.innerText = 'Request permission';
  }
};
NotificationManager.prototype.request = function() {
  if (!window.hasOwnProperty('webkitNotifications')) { return; }
  window.webkitNotifications.requestPermission($.proxy(this, 'displayState'));
};
NotificationManager.prototype.show = function() {
  if (!window.hasOwnProperty('webkitNotifications')) { return; }
  if (window.webkitNotifications.checkPermission() == 0) {
    window.webkitNotifications.createNotification(
      'static/images/chrome-icon.png', 
      'Hello Developers!', 
      'I am a notification').show();
  } else {
    this.request();
  }
};
/*******************************************************************************
 * VIDEO
 ******************************************************************************/
var VideoController = function(slide) {
  this.DOM_SLIDE = slide;
  this.DOM_VIDEO = slide.getElementsByTagName('video')[0];
  this.DOM_BUTTON_PLAY = slide.getElementsByClassName('playButton')[0];
  this.DOM_BUTTON_STOP = slide.getElementsByClassName('stopButton')[0];
  this.DOM_BUTTON_CSS = slide.getElementsByClassName('cssButton')[0];
  this.DOM_BUTTON_EFFECT = slide.getElementsByClassName('effectButton')[0];

  this.OFFSETS = [];
  this.INERTIA = [];
  this.SLICES = 10;
  this.OUT_PADDING = 100;
  this.INTERVAL = null;

  var inertia = -2.0;
  for (var i = 0; i < this.SLICES; i++) {
    this.OFFSETS[i] = 0;
    this.INERTIA[i] = inertia;
    inertia += 0.4;
  }
  
  $([this.DOM_BUTTON_PLAY,
     this.DOM_BUTTON_CSS, 
     this.DOM_BUTTON_EFFECT,
     this.DOM_BUTTON_STOP]).addClass('hidden');
  
  if (this.DOM_VIDEO.readyState == this.DOM_VIDEO.HAVE_FUTURE_DATA) {
    this.onVideoLoaded();
  } else {   
    this.DOM_VIDEO.addEventListener('canplay', $.proxy(this, 'onVideoLoaded'));    
    this.DOM_VIDEO.addEventListener('ended', $.proxy(this, 'onStopClicked'));   
    this.DOM_VIDEO.addEventListener('play', $.proxy(this, 'onPlayClicked'));    
  }
};
VideoController.prototype.onVideoLoaded = function() {
  console.log('onVideoLoaded');
  $(this.DOM_BUTTON_PLAY).removeClass('hidden');
  
  this.WIDTH = this.DOM_VIDEO.videoWidth;
  this.HEIGHT = this.DOM_VIDEO.videoHeight;
  
  this.DOM_COPY = $('<canvas></canvas>').get(0);
  this.DOM_COPY.width = this.WIDTH;
  this.DOM_COPY.height = this.HEIGHT;
  this.DOM_DRAW = $('<canvas class="hidden"></canvas>').get(0);
  this.DOM_DRAW.width = this.WIDTH;
  this.DOM_DRAW.height = this.HEIGHT + this.OUT_PADDING * 2;
  this.DOM_VIDEO.parentNode.insertBefore(this.DOM_DRAW, this.DOM_VIDEO);
  
  this.CONTEXT_COPY = this.DOM_COPY.getContext('2d');
  this.CONTEXT_DRAW = this.DOM_DRAW.getContext('2d');
   
  this.DOM_BUTTON_PLAY.addEventListener('click', $.proxy(this, 'onPlayClicked'));
  this.DOM_BUTTON_STOP.addEventListener('click', $.proxy(this, 'onStopClicked'));
  this.DOM_BUTTON_CSS.addEventListener('click', $.proxy(this, 'onCssClicked'));
  this.DOM_BUTTON_EFFECT.addEventListener('click', $.proxy(this, 'onEffectClicked'));
};
VideoController.prototype.onPlayClicked = function() {
  this.DOM_VIDEO.play();
  $(this.DOM_BUTTON_PLAY).addClass('hidden');
  $([
    this.DOM_BUTTON_STOP,
    this.DOM_BUTTON_CSS
  ]).removeClass('hidden');
  $(this.DOM_VIDEO).removeClass('fancyVideo');
  $(this.DOM_VIDEO).removeClass('hidden');
  $(this.DOM_DRAW).addClass('hidden');
},
VideoController.prototype.onStopClicked = function() {
  $(this.DOM_BUTTON_PLAY).removeClass('hidden');
  $([
    this.DOM_BUTTON_STOP,
    this.DOM_BUTTON_CSS,
    this.DOM_BUTTON_EFFECT
  ]).addClass('hidden');
  $(this.DOM_VIDEO).removeClass('fancyVideo');
  $(this.DOM_VIDEO).removeClass('hidden');
  $(this.DOM_DRAW).addClass('hidden');

  window.clearInterval(this.INTERVAL);
  this.INTERVAL = null;
  var src = this.DOM_VIDEO.src;
  this.DOM_VIDEO.src = src;
};
VideoController.prototype.onCssClicked = function() {
  $(this.DOM_VIDEO).addClass('fancyVideo');
  $(this.DOM_VIDEO).removeClass('hidden');
  $(this.DOM_BUTTON_CSS).addClass('hidden');
  $(this.DOM_BUTTON_EFFECT).removeClass('hidden');
  $(this.DOM_DRAW).addClass('hidden');
};
VideoController.prototype.onEffectClicked = function() {
  $(this.DOM_VIDEO).addClass('hidden');
  $(this.DOM_DRAW).removeClass('hidden');
  $(this.DOM_BUTTON_EFFECT).addClass('hidden');
  $(this.DOM_BUTTON_CSS).removeClass('hidden');
  this.processEffectFrame();
  if (this.INTERVAL == null) {
    this.INTERVAL = window.setInterval($.proxy(this, 'processEffectFrame'), 33);
  }
};
VideoController.prototype.processEffectFrame = function() {
  var slice_width = this.WIDTH / this.SLICES;
  this.CONTEXT_COPY.drawImage(this.DOM_VIDEO, 0 ,0);
  this.CONTEXT_DRAW.clearRect(0, 0, this.DOM_DRAW.width, this.DOM_DRAW.height);
  for (var i = 0; i < this.SLICES; i++) {
    var sx = i * slice_width;
    var sy = 0;
    var sw = slice_width;
    var sh = this.HEIGHT;
    var dx = sx;
    var dy = this.OFFSETS[i] + sy + this.OUT_PADDING;
    var dw = sw;
    var dh = sh;
    this.CONTEXT_DRAW.drawImage(this.DOM_COPY, sx, sy, sw, sh, dx, dy, dw, dh);
    if (Math.abs(this.OFFSETS[i] + this.INERTIA[i]) < this.OUT_PADDING) {
      this.OFFSETS[i] += this.INERTIA[i];
    } else {
      this.INERTIA[i] = -this.INERTIA[i];
    }
  }
  if (!this.DOM_VIDEO.ended) {
   
  }
};

/*******************************************************************************
 * VIDEO TILES
 ******************************************************************************/
function VideoTile(src, dest, width, height, x, y) {
  this._src = src;
  this._dest = dest;
  this.width = width;
  this.height = height;
  this._hW = width / 2;
  this._hH = height / 2;
  this._srcX = x;
  this._srcY = y;
  this.x = (dest.width / 2) - (src.width / 2) + x + this._hW;
  this.y = dest.height - (src.width / 2) + y + this._hH;
  this.r = 0;
};

VideoTile.prototype.draw = function() {
  var context = this._dest.getContext('2d');
  context.save();
  context.translate(this.x + this._hW, this.y + this._hH);
  context.rotate(this.r);
  context.drawImage(this._src, this._srcX, this._srcY, this.width, 
      this.height, -this._hW, -this._hH, this.width, this.height);
  context.restore();
};

function PhysicsSimulation(width, height) {
  this.ACCURACY = 20;
  
  var padding = 100;
  var aabb = new b2AABB();
  aabb.minVertex.Set(-padding, -padding);
  aabb.maxVertex.Set(width + padding, height + padding);
  
  var gravity = new b2Vec2(0, 100);
  var sleep = false;
  this._world = new b2World(aabb, gravity, sleep);
  console.log(this._world);
  
  this._createBarrier(0, -50, width, 50);                  // Ceiling
  this._createBarrier(0, height + 50, width, 50);          // Ground
  this._createBarrier(-50, height / 2, 50, height);        // Left wall
  this._createBarrier(width + 50, height / 2, 50, height); // Right wall
};

PhysicsSimulation.prototype.setGravity = function(x, y) {
  var gravity = new b2Vec2(x, y);
  this._world.m_gravity = gravity;
};

PhysicsSimulation.prototype._createBarrier = function(x, y, w, h) {
  var shape = new b2BoxDef();
  shape.extents.Set(w, h);
  shape.restitution = 0.0;
  shape.friction = 10;
  
  var body = new b2BodyDef();
  body.AddShape(shape);
  body.position.Set(x, y);
  
  return this._world.CreateBody(body);
};

PhysicsSimulation.prototype.drawWireFrame = function(canvas) {
  var context = canvas.getContext('2d');
  for (var b = this._world.m_bodyList; b; b = b.m_next) {
    for (var s = b.GetShapeList(); s != null; s = s.GetNext()) {
      this._drawShape(s, context);
    }
  }
};

PhysicsSimulation.prototype._drawShape = function(shape, context) {
  context.beginPath();
  switch (shape.m_type) {
    case b2Shape.e_polyShape:
      var poly = shape;
      var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
      context.moveTo(tV.x, tV.y);
      for (var i = 0; i < poly.m_vertexCount; i++) {
        var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
        context.lineTo(v.x, v.y);
      }
      context.lineTo(tV.x, tV.y);
      break;
  }
  context.stroke();
};

PhysicsSimulation.prototype.createBox = function(x, y, w, h) {
  var shape = new b2BoxDef();
  shape.density = 1000;
  shape.friction = 0.1;
  shape.restitution = 0;
  shape.extents.Set(w / 2.0, h / 2.0);
  
  body = new b2BodyDef();
  body.linearVelocity = new b2Vec2(0, 0);
  body.linearDamping = 0;
  body.angularDamping = 0;
  body.AddShape(shape);
  body.position.Set(x, y);
  
  var box = this._world.CreateBody(body);
  return box;
};

PhysicsSimulation.prototype.step = function() {
  var time = new Date().getTime();
  var delta = 0;
  if (this._lastRender == null) {
    this._lastRender = time;
    this._startTime = time;
  } else {
    delta = (time - this._lastRender) / 1000;
    this._lastRender = time;
  }
  this._world.Step(delta, this.ACCURACY);
};

function VideoPhysicsController(parent, video, width, height) {
  this._video = video; 
  this._proxyVideoCanPlay = $.proxy(this, '_onVideoLoaded');
  this._proxyVideoEnded = $.proxy(this, '_onVideoEnded');
  this._video.addEventListener('canplay', this._proxyVideoCanPlay, false);
  this._video.addEventListener('ended', this._proxyVideoEnded, false);  
  this._video.src = 'chrome.webm';
  this._video.style.display = 'none';
  
  this._buffer = document.createElement('canvas');
  this._output = document.createElement('canvas');
  
  this._output.width = width;
  this._output.height = height;
  parent.appendChild(this._output);
  
  this._physics = new PhysicsSimulation(width, height);
  this._proxyTilt = $.proxy(this, '_onTilt'); 
  window.addEventListener('deviceorientation', this._proxyTilt, false);
    
  this._tiles = [];
};

VideoPhysicsController.prototype._onVideoEnded = function() {
  console.log('ended');
  this.stop();
};

VideoPhysicsController.prototype._onTilt = function(evt) {
  var x = Math.abs(evt.gamma) > 5 ? 200 * evt.gamma : 0;
  var y = Math.abs(evt.beta) > 10 ? 700 - (200 * -evt.beta) : 700;
  this._physics.setGravity(x, y);
};

VideoPhysicsController.prototype._onVideoLoaded = function() {
  console.log('video loaded');
  this._buffer.width = this._video.videoWidth;
  this._buffer.height = this._video.videoHeight;
  
  var tile_size_x = 64;
  var tile_size_y = 64;
  var tiles_x = Math.floor(this._video.videoWidth / tile_size_x);
  var tiles_y = Math.floor(this._video.videoHeight / tile_size_y);
  
  for (var x = 0; x < tiles_x; x++) {
    for (var y = 0; y < tiles_y; y++) {
      var tile = new VideoTile(this._buffer, this._output, tile_size_x, 
          tile_size_y, x * tile_size_x, y * tile_size_y);
      var mass = this._physics.createBox(tile.x, tile.y, tile.width, 
          tile.height);
      this._tiles.push({tile: tile, mass: mass});
    }
  }
  
  this._video.play();
  
  if (!this._interval) {
    this._interval = window.setInterval($.proxy(this, '_processFrame'), 20);
  }
};

VideoPhysicsController.prototype.stop = function() {
  window.clearInterval(this._interval);  
  this._interval = null;
  this._video.pause();
  this._video.removeEventListener('canplay', this._proxyVideoCanPlay, false);
  this._video.removeEventListener('ended', this._proxyVideoEnded, false);  

  window.removeEventListener('deviceorientation', this._proxyTilt, false);
  delete this._video;
  delete this._physics;
};

VideoPhysicsController.prototype._processFrame = function() {
  if (this._video.duration - this._video.currentTime < 0.5) {
    this.stop();
    return;
  }
  var bufferContext = this._buffer.getContext('2d');
  bufferContext.drawImage(this._video, 0, 0);
  var outputContext = this._output.getContext('2d');
  outputContext.clearRect(0, 0, this._output.width, this._output.height);
  this._physics.step();
  
  //this._physics.drawWireFrame(this._output);
  
  for (var i = 0; i < this._tiles.length; i++) {
    var mass = this._tiles[i].mass;
    var tile = this._tiles[i].tile;
    tile.x = mass.m_position0.x - (tile.width / 2);
    tile.y = mass.m_position0.y - (tile.height / 2);
    tile.r = mass.m_rotation;
    tile.draw();
  }
};

/*******************************************************************************
 * ORIENTATION
 ******************************************************************************/
function OrientationSlide(slide) {
  this._slide = $(slide);
  this._lastBeta = 0;
  this._lastGamma = 0;
  
  var orientHandler = $.proxy(this, 'onOrient');
  $(this._slide).bind('focusslide', function(evt){
    $(window).bind('deviceorientation', orientHandler);
  }).bind('blurslide', function(evt) {
    $(window).unbind('deviceorientation', orientHandler);
  });
};

OrientationSlide.prototype.onOrient = function(evt) {
  evt = evt.originalEvent;
  var overThreshold = Math.abs(evt.gamma) > 4 || Math.abs(evt.beta) > 4;
  var gamma = overThreshold ? evt.gamma : 0; 
  var beta = overThreshold ? evt.beta : 0;
  
  if (this._lastGamma != gamma || this._lastBeta != beta) {
    var zindex = 0;
    $('.layer').each(function(index, elem) {
      zindex++;
      var x = Math.round(1.5 * gamma * zindex);
      var y = Math.round(1.5 * beta * zindex);
      $(elem).css('left', x.toString() + 'px')
             .css('top', y.toString() + 'px')
             .css('-webkit-transform', 'rotateY(' + -2.0 * gamma + 'deg) rotateX(' + -2.0 * beta + 'deg)');

    });
    this._lastGamma = gamma;
    this._lastBeta = beta;
  }
};