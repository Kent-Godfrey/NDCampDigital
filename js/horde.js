$(document).ready(function(){
//var c = document.getElementById("mainCanvas");
var c = $("#mainCanvas");
//var ctx = c.getContext.("2d");
var ctx = c.get(0).getContext("2d");
ctx.imageSmoothingEnabled= false;
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
var skele = new Image();
skele.src = 'images/skeletonAnimation.png';
skele.addEventListener("load", loadImage, false);
imageObj.src = 'images/tower.png';

function loadImage(e){
	animate();
}

//horde properties 
var horde = {
	"sqrx":0,
	"rectSize":50,
	"startPos":canvasWidth,
	"shift":0,
	"frameWidth":32.1,
	"frameHeight":47,
	"totalFrames":9,
	"currentFrame":0,

}

//Animation
function animate(){
	var sqrActPos = canvasWidth- horde.sqrx;
	//update Squares X pos
	horde.sqrx++;
	//Clears canvas clean
	ctx.clearRect(0,0,canvasWidth, canvasHeight);
	//Draws Square in new Position
	//ctx.fillRect(canvasWidth- horde.sqrx,690,horde.rectSize,horde.rectSize);
	ctx.drawImage(skele, horde.shift,0,horde.frameWidth,horde.frameHeight,sqrActPos,690,horde.frameWidth,horde.frameHeight);
	ctx.drawImage(imageObj, 0, 50);
	horde.shift+= horde.frameWidth +1;

	if (horde.currentFrame == horde.totalFrames){

		horde.shift = 0;
		horde.currentFrame= 0;
	}

	horde.currentFrame++;
	//SPEAK TO THE TEAM ABOUT THIS.
	//requestAnimationFrame(animate);

	//Controlls speed
	setTimeout(animate,120);
	canvasWidth - horde.sqrx;
	//console.log(horde.sqrx);
	console.log(horde.startPos);
	console.log(sqrActPos);
	
};
animate();



});
