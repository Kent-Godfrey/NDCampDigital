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
	};
resizeCanvas();

//Vars created to easily access the canvas W & H
var canvasWidth = c.width();
var canvasHeight= c.height();

//Vars to allow buttons to work for reset functionality
var playAnimation= true;
var startButton = $("#startAnimation");
var stopButton = $("#stopAnimation");
//Start position of Square
var sqrx = 1410;
//hides stop button on load
stopButton.hide();
//Animation timer
function animate(){
	//update Squares X pos
	sqrx--;
	//Clears canvas clean
	ctx.clearRect(0,0,canvasWidth, canvasHeight);
	//Draws Square in new Position
	ctx.fillRect(sqrx,700,40,50);
	setTimeout(animate,33);
	//save state when the cavnas is first drawn.
	ctx.save();
};
animate();

//Start button logic *In Progress*

startButton.click(function(){
	$(this).hide();
	stopButton.show();

	playAnimation = true;
	if(playAnimation){
	setTimeout(animate,33);
};
	animate();
});
//Stop button logic *In Progress*
stopButton.click(function(){

	$(this).hide();
	startButton.show();

	playAnimation = false;
	if(playAnimation){
	setTimeout(animate,33);
	};
});

/*if(playAnimation){
	setTimeout(animate,33);
}; */

});
