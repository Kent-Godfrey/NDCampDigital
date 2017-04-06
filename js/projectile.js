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

$('#fire').click(fire);

var fireBoulder;

function fire () {
  fireBoulder = setInterval(drawCircle, 33);
  resetBoulder();
}

// NOTE stopBoulder and resetBoulder may need to be merged
function stopBoulder () {
  clearInterval(fireBoulder);
}

function resetBoulder () {
  centreX = 0;
  centreY = 0;
}

// Draw circle along trajectory --------------------------------------------
var centreX = 0;
var endX = y / Math.pow(x, 2);
function drawCircle () {
  // ctx.clearRect(0, 0, x, y);
	var speed = 10;

	centreX += speed;
	var centreY = getProjectileY(centreX) * endX;

	var radius = 10;

  if (centreY <= 300 - radius) {
    ctx.clearRect(0,0, x, y);
		ctx.beginPath();
		ctx.arc(centreX, centreY, radius, 0, 2 * Math.PI);
		ctx.closePath();
		ctx.fill();
  } else {
    stopBoulder();
    // resetBoulder();
  }
}

function getProjectileY (x) {
	return Math.pow(x, 2);
}
});
