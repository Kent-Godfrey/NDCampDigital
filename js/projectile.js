$(document).ready(function(){
//var c = document.getElementById("mainCanvas");
var c = $("#mainCanvas");
//var ctx = c.getContext.("2d");
var ctx = c.get(0).getContext("2d");
//Sets width of canvas to the width&height of browser window. get(0). Only works with CSS reset.
c.attr("width", $(window).get(0).innerWidth); c.attr("height", $(window).get(0).innerHeight);
//Uses JQuery Resize function to allow the canvas dimensions to be dynamically changed and updated.
$(window).resize(resizeCanvas);
  function resizeCanvas() {
    c.attr("width", $(window).get(0).innerWidth);
    c.attr("height", $(window).get(0).innerHeight);
    //Placeholder rectangle.
    ctx.fillRect(0, 0, c.width(), c.height());
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

// Draw circle along trajectory --------------------------------------------
var centreX = 0;
var endX = y / Math.pow(x, 2);
function drawCircle () {
	var speed = 10;

	centreX += speed;
	var centreY = getProjectileY(centreX) * endX;

	var radius = 10;

	ctx.beginPath();
	ctx.arc(centreX, centreY, radius, 0, 2 * Math.PI);
	ctx.closePath();
	ctx.fill();
}

function getProjectileY(x) {
	return Math.pow(x, 2);
}

setInterval(drawCircle, 33);
});