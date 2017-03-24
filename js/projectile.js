
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
