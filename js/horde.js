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
		c.attr("width", $('.canvas-container').width());
      c.attr("height", $('.canvas-container').height());
		//Placeholder rectangle.
		ctx.fillRect(0, 0, c.width(), c.height());
	};
resizeCanvas();

//Vars created to easily access the canvas W & H
var canvasWidth = c.width();
var canvasHeight= c.height();

//horde properties 
var horde = {
	"sqrx":0,
	"rectSize":50,
	"startPos":canvasWidth,
}

//Animation
function animate(){
	var sqrActPos = canvasWidth- horde.sqrx;
	//update Squares X pos
	horde.sqrx++;
	//Clears canvas clean
	ctx.clearRect(0,0,canvasWidth, canvasHeight);
	//Draws Square in new Position
	ctx.fillRect(canvasWidth- horde.sqrx,690,horde.rectSize,horde.rectSize);
	//Controlls speed
	setTimeout(animate,120);
	canvasWidth - horde.sqrx;
	//console.log(horde.sqrx);
	console.log(horde.startPos);
	console.log(sqrActPos);
	if(sqrActPos = 0){

	}
};
animate();



});
