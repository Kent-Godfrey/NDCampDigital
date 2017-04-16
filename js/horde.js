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
//Initialize images
var skele = new Image();
skele.src = 'images/skeleGob.png';
skele.addEventListener("load", loadImage, false);
imageObj.src = 'images/tower.png';
var backdrop = new Image();
backdrop.src = 'http://i.imgur.com/PhFQkdl.png';

function loadImage(e){
	animate();
}

//horde properties 
var horde = {
	"sqrx":0,
	"rectSize":50,
	"startPos":canvasWidth,
	"shift":0,
	"frameWidth":31.5,
	"frameHeight":94,
	"totalFrames":9,
	"currentFrame":0,
}

//Animation
function animate(){
	//calc for actual position of horde
	var sqrActPos = canvasWidth- horde.sqrx+5;
	//update Squares X pos
	horde.sqrx++;
	//draws background
	ctx.drawImage(backdrop, 0, 0, canvasWidth, canvasHeight);
	//Clears canvas clean
	ctx.clearRect(0,0,canvasWidth, canvasHeight);
	
	//drawsHorde---centre of horde = sqrActPos+40
	ctx.drawImage(backdrop,0,0,canvasWidth,canvasHeight);
	ctx.drawImage(skele, horde.shift,0,horde.frameWidth,horde.frameHeight,sqrActPos,canvasHeight*0.85,horde.frameWidth,horde.frameHeight);
	ctx.drawImage(skele, horde.shift,0,horde.frameWidth,horde.frameHeight,sqrActPos+40,canvasHeight*0.85,horde.frameWidth,horde.frameHeight);
	ctx.drawImage(skele, horde.shift,0,horde.frameWidth,horde.frameHeight,sqrActPos+80,canvasHeight*0.85,horde.frameWidth,horde.frameHeight);
	ctx.drawImage(imageObj, 0, 50);
	

	//shifts through sprite sheet (animates)
	horde.shift+= horde.frameWidth +1;

	//resets spritesheet. Loops through
	if (horde.currentFrame == horde.totalFrames){

		horde.shift = 0;
		horde.currentFrame= 0;
	}
	//loops through each frame. frame properties stated in horde Object.
	horde.currentFrame++;
	
	//SPEAK TO THE TEAM ABOUT THIS.
	//requestAnimationFrame(animate);

	//Controlls speed
	setTimeout(animate,120);
	//Destroy horde then reset. Need to merge code with David.
	if(boulder.ypos == sqrActPos){
		sqrActPos = canvasWidth+5;
	}
	//canvasWidth - horde.sqrx;
	//console.log(horde.sqrx);
	console.log(horde.startPos);
	console.log(sqrActPos);
	
};




});
