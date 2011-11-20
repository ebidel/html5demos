/*

    #cClock {
      position: fixed;
      top: 0px;
      left: 0px;
      opacity: 0.25;
      z-index: 1000;
    }
    
    #cClock:hover {
      opacity: 1.0;
    }

*/

var PresentationTimer = function(minutes, startImmediately) {
  var startTime;
  var length, warnAt;
  var stopTime;
  
  if (minutes) {
    length = minutes;
    warnAt = 1;
  } else {
    length = timerConfig.settings.minutes;
    startTime = timerConfig.settings.date;
    warnAt = timerConfig.settings.warnAt;
  }
      
  this.start = function() {
    if (!startTime) {
      startTime = new Date();
    }
    stopTime = new Date((startTime.getTime() + (length * 60 * 1000))); 
    insertElement();
    //console.log("starting timer", length, startTime, stopTime);
    setTimeout(timerTick, 1000);
  } 
  
  var insertElement = function() {
    var body = document.getElementsByTagName("body")[0];
    body.insertAdjacentHTML("afterbegin", '<canvas id="cClock" width="30" height="30"></canvas>');  
  }
  
  var timerTick = function() {
    var currentTime = new Date();
    var tickLength = 1000;
    var minLeft;
    if (currentTime < startTime) {
      //console.log("before");
      minLeft = (startTime.getTime() - currentTime.getTime()) / 1000 / 60;
      if (minLeft < 60) {
        drawClock(Math.ceil(minLeft), "#000");
      } else {
        tickLength = 60000;
      }
      setTimeout(timerTick, tickLength);
    } else if (currentTime > stopTime) {
      //console.log("after");
      var minOver = (currentTime.getTime() - stopTime.getTime()) / 1000 / 60;
      if (minOver <= 10) {
        drawClock(Math.ceil(minOver), "#f00");
        setTimeout(timerTick, 15000);
      } else {
        showClock(false);
      }
    } else {
      //console.log("during");
      minLeft = (stopTime.getTime() - currentTime.getTime()) / 1000 / 60;
      var textColor = "#000";
      if (minLeft < warnAt) {
        textColor = "#900";
      }
      drawClock(Math.ceil(minLeft), textColor);
      setTimeout(timerTick, tickLength);
    }
  }
  
  var drawClock = function(min, color) {
    var canvas = document.getElementById("cClock");
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,30,30);
    ctx.lineWidth = 3;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(15, 15, 10, toRadians(-90), toRadians((((min-60)/60)*360)-90), true);
    ctx.stroke();
    ctx.fillStyle = color;
    ctx.font="10px sans-serif"
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(min, 15, 15);
  }
  
  var showClock = function(visible) {
    var canvas = document.getElementById("cClock");
    if (visible) {
      canvas.classList.remove("hidden");  
    } else {
      canvas.classList.add("hidden");
    }
  }
  
  var toRadians = function(val) {
    return (Math.PI / 180) * val;
  }
  
  if (startImmediately) {
    startTime = new Date();
    start();
  }
  
  return this;
}