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
      c.attr("height", $('.canvas-container').height()); // TODO Figure this out - 100vh height adds scrollbars on both axes
    }

  resizeCanvas();

  // Set variables for canvas width and height ---------------------------------

  var canvasWidth = c.width();
  var canvasHeight = c.height();

	// Initialise images ---------------------------------------------------------
	var skele = new Image();
	skele.src = 'images/skeleGob.png';
	// skele.addEventListener("load", loadImage, false);
	var tower = new Image();
	tower.src = 'images/tower.png';
	var backdrop = new Image(); // NOTE Maybe this could be a CSS background instead? So that the background doesn't have to be redrawn each frame?
	backdrop.src = 'http://i.imgur.com/PhFQkdl.png';

	// Draws background ----------------------------------------------------------
	ctx.drawImage(backdrop, 0, 0, canvasWidth, canvasHeight);

  // Initialise JSON objects ---------------------------------------------------

  var boulder = {
    "xOrigin": 0,
    "yOrigin": 0,
    "xPos": 0,
    "yPos": 0,
		"radius": 10,
		"velocity": 10,
    "landingPos": canvasHeight / Math.pow(canvasWidth, 2), // Refers to the x-coordinate at which the bould lands
    "landingPosCalculated": false,
    "animate": false
  }

  var horde = {
  	"sqrx": 0,
  	"rectSize": 50,
  	"startPos": canvasWidth,
  	"shift": 0,
  	"frameWidth": 31.5,
  	"frameHeight": 94,
  	"totalFrames": 9,
  	"currentFrame": 0,
  }

  var boulderAnimation;

  $('#fire').click(function () {
    boulder.animate = true;
  }); // When the fire button is clicked the fire function is called

  function fire () {
    stopBoulder();
    resetBoulder();
    boulderAnimation = requestAnimationFrame(fireBoulder);
  }

  function stopBoulder () {
    cancelAnimationFrame(boulderAnimation);
  }

  function resetBoulder () {
    boulder.xPos = boulder.xOrigin;
    boulder.yPos = boulder.yOrigin;
  }

  // Fire boulder along trajectory ---------------------------------------------
  // function fireBoulder () {
  //   // ctx.clearRect(0, 0, canvasWidth, canvasHeight); // This clears the canvas to draw the projectile
  //   drawCircle(boulder.xPos, boulder.yPos);
  //
  //   boulder.xPos += boulder.velocity; // This updates the boulders x position
  //   boulder.yPos = getBoulderY(boulder.xPos); // This updates the boulders y position relative to the x position (y=x^2)
  //
  //   if (boulder.yPos <= canvasHeight - boulder.radius) {
  //     requestAnimationFrame(fireBoulder);
  //   } else {
  //     stopBoulder();
  //   }
  // }

  // Draw circle ---------------------------------------------------------------
  function drawCircle (centreX, centreY) {
    ctx.beginPath();
    ctx.arc(centreX, centreY, boulder.radius, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
  }

  // Return the y position for the boulder -------------------------------------
  function getBoulderY (x) {
  	return Math.pow(x, 2) * boulder.landingPos;
  }

  // Animate the scene ---------------------------------------------------------
  function animate () {
    //calc for actual position of horde
  	var sqrActPos = canvasWidth - horde.sqrx + 5;
  	//update Squares X pos
  	horde.sqrx++;
  	//draws background
  	ctx.drawImage(backdrop, 0, 0, canvasWidth, canvasHeight);
  	//Clears canvas clean
  	ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  	//drawsHorde---centre of horde = sqrActPos+40
  	ctx.drawImage(backdrop, 0, 0, canvasWidth, canvasHeight);
  	ctx.drawImage(skele, horde.shift, 0, horde.frameWidth, horde.frameHeight, sqrActPos, canvasHeight * 0.85, horde.frameWidth, horde.frameHeight);
  	ctx.drawImage(skele, horde.shift, 0, horde.frameWidth, horde.frameHeight, sqrActPos + 40, canvasHeight * 0.85, horde.frameWidth, horde.frameHeight);
  	ctx.drawImage(skele, horde.shift, 0, horde.frameWidth, horde.frameHeight, sqrActPos + 80, canvasHeight * 0.85, horde.frameWidth, horde.frameHeight);
  	ctx.drawImage(tower, 0, 50);


  	//shifts through sprite sheet (animates)
  	horde.shift += horde.frameWidth + 1;

  	//resets spritesheet. Loops through
  	if (horde.currentFrame == horde.totalFrames){

  		horde.shift = 0;
  		horde.currentFrame= 0;
  	}
  	//loops through each frame. frame properties stated in horde Object.
  	horde.currentFrame++;

  	//SPEAK TO THE TEAM ABOUT THIS.
  	//requestAnimationFrame(animate);

  	// //Controlls speed
  	// setTimeout(animate, 120);
  	//Destroy horde then reset. Need to merge code with David.
  	if(boulder.yPos >= sqrActPos){
  		sqrActPos = canvasWidth + 5;
  	}
  	//canvasWidth - horde.sqrx;
  	//console.log(horde.sqrx);
  	// console.log(horde.startPos);
  	// console.log(sqrActPos);

    // Animate boulder ---------------------------------------------------------
    if (boulder.animate) { // If the boulder animation property is true, the boulder will animate

      // if (boulder.landingPosCalculated == false) { // Sets the x position for the boulder to land to the x pos of the horde IF it hasn't been calculated
      //   boulder.landingPosCalculated = true;
      //   boulder.landingPos = sqrActPos;
      //   console.log(sqrActPos);
      //   console.log(boulder.landingPos);
      //   console.log(boulder.landingPosCalculated);
      // }
      // TODO Change this to location of where the horde WILL be (refer to Trello notes for method)
      // TODO Figure out why this IF statement doesn't work

      drawCircle(boulder.xPos, boulder.yPos);

      boulder.xPos += boulder.velocity; // This updates the boulders x position
      boulder.yPos = getBoulderY(boulder.xPos); // This updates the boulders y position relative to the x position (y=x^2)

      if (boulder.yPos >= canvasHeight - boulder.radius) {
        boulder.animate = false;
        boulder.landingPosCalculated = false;
        resetBoulder();
      }
    }

    requestAnimationFrame(animate); // TODO Figure method to slow down movement of skeletons
  }

  animate();
});
