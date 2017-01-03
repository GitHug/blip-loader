(function() {
  "use strict";

  var canvas; // The canvas to render in
  var originX; // The origin of the circle
  var originY;
  var ctx; // The context for the canvas
  var numArcs = 20; // The number of arcs that the circle should contain

  var counter = 1; // Counter for animating the loader
  var ticksCount = 0; // Counter for the number of ticks before a new animation should occur
  var ticksPerCounter = 4; // The number of ticks before a new counter increment should occur
  var currentColor = 0; // Index for the current color being used

  var config = require('./blipconfig').config();

  /**
   * Initailizes the loader
   */
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

  /**
   * Finds an element with id 'blipLoader'. If no such container exists then it
   * is not possible to render the loader. Otherwise a canvas will be created in
   * the container that will be used to render the loader.
   *
   * @return {HTMLElement} The created HTML canvas element
   */
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

  /**
   * Draws the content in the canvas. Tasked with clearing the canvas and rotating
   * the arcs to create animation.
   */
  function draw() {
    updateCounter();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();

    var time = new Date();

    ctx.translate(originX, originY);
    ctx.rotate(
      ((2*Math.PI)/30) * time.getSeconds() +
      ((2*Math.PI)/30000) * time.getMilliseconds()
    );
    ctx.translate(-originX, -originY);

    drawArcs();

    ctx.restore();
    window.requestAnimationFrame(draw);
  }

  /**
   * Draws the arcs that are used for loader animation
   */
  function drawArcs() {
    var radius = Math.min(canvas.width/2, canvas.height/2);
    var outerMargin = radius*0.1;
    var innerMargin = radius*0.3;
    var arcDegree = Math.PI/numArcs;

    var outerRadius = radius - outerMargin;
    var innerRadius = radius - innerMargin;

    for(var i = 1; i <= numArcs; i++) {
      drawPath(outerRadius, innerRadius, arcDegree, i);
    }
  };

  /**
   * Draws one arc in the circle
   * @param {Number} outerRadius - The radius for the outer part of the circle.
   * @param {Number} innerRadius - The radius for the inner part of the circle.
   * @param {Number} arcDegree - Decides the position of the arc in the circle.
   * @param {Number} i - Is used to decide in what iteration the arc is being drawn.
   */
  function drawPath(outerRadius, innerRadius, arcDegree, i) {
    var startDegree = (Math.PI*1.5 - arcDegree/2);

    var offset = arcDegree;
    var startAngle = startDegree + (arcDegree + offset) * i;
    var endAngle = startAngle + arcDegree;

    var active = i <= counter;

    var colorOn = config.colors[currentColor];
    var colorOff = config.colors[(currentColor - 1).mod(config.colors.length)];

    ctx.beginPath();
    ctx.arc(originX, originY, outerRadius, startAngle, endAngle);
    ctx.arc(originX, originY, innerRadius, endAngle, startAngle, true);
    ctx.closePath();
    ctx.fillStyle = active ? colorOn : colorOff;
    ctx.fill();
  };

  /**
   * Updates the animation counters and also manages the current color index
   * as decided by the variable 'currentColor'
   */
  function updateCounter() {
    ticksCount += 1;
    if (ticksCount > ticksPerCounter) {
      ticksCount = 0;
      counter += 1;
      if (counter > numArcs) {
        counter = 1;
        currentColor = (currentColor += 1) % config.colors.length;
      }
    }
  }

})();
