$(document).ready(function(){
  //var c = document.getElementById("mainCanvas");
  var c = $("#mainCanvas");
  //var ctx = c.getContext.("2d");
  var ctx = c.get(0).getContext("2d");
  // Sets width of canvas to the width&height of browser window. get(0). Only works with CSS reset.
  c.attr("width", $(window).get(0).innerWidth); c.attr("height", $(window).get(0).innerHeight);
  //Uses JQuery Resize function to allow the canvas dimensions to be dynamically changed and updated.
  $(window).resize(resizeCanvas);
    function resizeCanvas() {
      c.attr("width", $('.canvas-container').width());
      c.attr("height", $('.canvas-container').height());
      //Placeholder rectangle.
      // ctx.fillRect(0, 0, c.width(), c.height());
    }
  resizeCanvas();

  // NOTE Resizing the window causes canvas to clear unless functions are inside the resize function
  var x = c.width();
  var y = c.height();

  // Draw curve on canvas for boulder trajectory -----------------------------
  // (function drawCurve() {
  // 	var endX = y / Math.pow(x, 2);
  //
  // 	ctx.beginPath();
  // 	for (var i = 0; i <= x; i++) {
  // 		var h = getProjectileY(i);
  // 		var d = h * endX;
  // 		ctx.lineTo(i, d);
  // 	}
  // 	// ctx.strokeStyle = 'white';
  // 	ctx.stroke();
  // })()

  var boulderAnimation;

  var boulder = {
    "xpos":0,
    "ypos":0
  }

  $('#fire').click(fire);

  var fireBoulder;

  function fire () {
    stopBoulder();
    resetBoulder();
    boulderAnimation = requestAnimationFrame(drawCircle);
  }

  // NOTE stopBoulder and resetBoulder may need to be merged
  function stopBoulder () {
    cancelAnimationFrame(boulderAnimation);
  }

  function resetBoulder () {
    boulder.xpos = 0;
    boulder.ypos = 0;
  }

  // Draw circle along trajectory --------------------------------------------
  var centreX = boulder.xpos;
  var endX = y / Math.pow(x, 2);
  function drawCircle () {
  	var speed = 10;

  	boulder.xpos += speed;
  	boulder.ypos = getProjectileY(boulder.xpos) * endX;
  	var radius = 10;

    if (boulder.ypos <= y - radius) {
      ctx.clearRect(0,0, x, y);
  		ctx.beginPath();
  		ctx.arc(boulder.xpos, boulder.ypos, radius, 0, 2 * Math.PI);
  		ctx.closePath();
  		ctx.fill();


      requestAnimationFrame(drawCircle);
    } else {
      stopBoulder();
    }

  }

  function getProjectileY (x) {
  	return Math.pow(x, 2);
  }
});
