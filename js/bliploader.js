(function() {
  "use strict";

  var ctx;
  var originX;
  var originY;
  var canvas;

  var config = require('./blipconfig').config();

  exports.init = function() {

    canvas = createCanvas();

    if (!canvas) { //Canvas could not be created
      return;
    }

    originX = canvas.width/2;
    originY = canvas.height/2;


    window.requestAnimationFrame(draw);

  }

  function createCanvas() {
    //Bliploader container
    var container = document.getElementById('blipLoader')

    if(!container) {
      console.warn('Missing container with id #blipLoader')
      return;
    }

    var createdCanvas = document.createElement('canvas');

    if(!('getContext' in createdCanvas)) {
      console.warn('Sorry, blip-loader doesn\'t work because your browser does'
        + ' not support Canvas! Time to upgrade!');
      return;
    }

    //Append to container
    container.appendChild(createdCanvas);

    return createdCanvas;
  }

  exports.start = function() {
    drawBlipClock();
    var runEverySecond = function() {
      drawBlipClock();
    };
    window.setInterval(runEverySecond, 1000);

    return canvas;
  };

  function draw() {
    ctx = canvas.getContext('2d');

    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    var time = new Date();

    ctx.translate(originX, originY);
    ctx.rotate( ((2*Math.PI)/60)*time.getSeconds() + ((2*Math.PI)/60000)*time.getMilliseconds());
    ctx.translate(-originX, -originY);

    drawArcs();

    ctx.restore();
    window.requestAnimationFrame(draw);
//    drawMinutes(minutes, canvas);
  //  drawSeconds(seconds, canvas);
  }

  function drawArcs() {
    var radius = Math.min(canvas.width/2, canvas.height/2);
    var outerMargin = radius*0.1;
    var innerMargin = radius*0.2;
    var arcDegree = Math.PI/24.0;

    var outerRadius = radius - outerMargin;
    var innerRadius = radius - innerMargin;

    for(var i = 1; i <= 24; i++) {
      var active = i % 2;
      drawPath(outerRadius, innerRadius, arcDegree, active, i);
    }
  };

  function drawPath(outerRadius, innerRadius, arcDegree, active, i) {
    var startDegree = (Math.PI*1.5 - arcDegree/2);

    var offset = arcDegree;
    var startAngle = startDegree + (arcDegree + offset) * i;
    var endAngle = startAngle + arcDegree;

    ctx.beginPath();
    ctx.arc(originX, originY, outerRadius, startAngle, endAngle);
    ctx.arc(originX, originY, innerRadius, endAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = active ? config.colorOn : config.colorOff;
    ctx.fill();
  };

})();
