(function() {
  "use strict";

  var canvas;
  var originX;
  var originY;
  var ctx;
  var numArcs = 24;

  var counter = 1;
  var ticksCount = 0;
  var ticksPerCounter = 4;

  var config = require('./blipconfig').config();

  exports.init = function() {

    canvas = createCanvas();

    if (!canvas) { //Canvas could not be created
      return;
    }

    originX = canvas.width/2;
    originY = canvas.height/2;

    ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-over';


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

  function draw() {
    updateCounter();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    var time = new Date();

    ctx.translate(originX, originY);
    ctx.rotate(
      ((2*Math.PI)/60) * time.getSeconds() +
      ((2*Math.PI)/60000) * time.getMilliseconds()
    );
    ctx.translate(-originX, -originY);

    drawArcs();

    ctx.restore();
    window.requestAnimationFrame(draw);
  }

  function drawArcs() {
    var radius = Math.min(canvas.width/2, canvas.height/2);
    var outerMargin = radius*0.1;
    var innerMargin = radius*0.2;
    var arcDegree = Math.PI/numArcs;

    var outerRadius = radius - outerMargin;
    var innerRadius = radius - innerMargin;

    for(var i = 1; i <= numArcs; i++) {
      var active = i <= counter;
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

  function updateCounter() {
    ticksCount += 1;
    if (ticksCount > ticksPerCounter) {
      ticksCount = 0;
      counter += 1;
      if (counter > numArcs) {
        counter = 1;
      }
    }
  }

})();
