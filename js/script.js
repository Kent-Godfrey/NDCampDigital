// TODO list
/* Line 17: "TODO Figure this out - 100vh height adds scrollbars on both axes"
*  Line 150: "TODO Determine scale factor - maybe this should be global?"
*  Line 172: "TODO Fix this reset!"
*  Line 190: "TODO Change this to location of where the horde WILL be (refer to Trello notes for method)"
*/

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
  //var canvasWidth = c.width();
  //var canvasHeight = c.height();

	// Initialise images ---------------------------------------------------------
	var skele = new Image();
	skele.src = 'images/both.png';
	var tower = new Image();
	tower.src = 'images/tower.png';
	//var backdrop = new Image(); // NOTE Maybe this could be a CSS background instead? So that the background doesn't have to be redrawn each frame?
	//backdrop.src = 'http://i.imgur.com/PhFQkdl.png';
  var fireBall = new Image();
  fireBall.src = 'images/fireballv2.png';
  var flames = new Image();
  flames.src = 'images/flames.png';


	// Draws background ----------------------------------------------------------
	//ctx.drawImage(backdrop, 0, 0, canvasWidth, canvasHeight);

  // Initialise JSON objects ---------------------------------------------------
  var scene = {
   "width": c.width(),
   "height": c.height(),
   "originNum": 826
  }

  scene.scaleFactor = scene.height / scene.originNum ; // This is declared outside of the original scene initialisation because it uses keys that aren't acessible before this time

  var boulder = {
    // All boulder properties are given here to prevent having to look elsewhere in the code if any changes are required
    // JSON objects found here: https://www.w3schools.com/js/js_json_objects.asp
    "xOrigin": 100,
    "yOrigin": 0,
    "xPos": 0,
    "yPos": 0,
    "yOffset": scene.height * 0.25,
		"radius": 10,
		"velocity": 10,
    "landingPos": scene.height / Math.pow(scene.width, 2), // Refers to the x-coordinate at which the boulder lands
    "landingPosCalculated": false,
    "animate": false,
    "shift": 0,
    "frameWidth": 67,
    "frameHeight": 59,
    "totalFrames": 6,
    "currentFrame": 0
  }

  var horde = {
  	"sqrx": 0,
    "hordeY": scene.height * 0.85,
  	"rectSize": 50,
  	"startPos": scene.width,
  	"shift": 0,
  	"frameWidth": 32.1,
  	"frameHeight": 94,
  	"totalFrames": 9,
  	"currentFrame": 0,
    "speed": 1 // This prevents the horde from animating for x number of frames. In this case: 5
  }

  var explosion = {
    "shift": 0,
    "frameWidth": 106,
    "frameHeight": 96,
    "totalFrames": 9,
    "currentFrame": 0,
    "refresh": 3,
  }



  var boulderAnimation;

  $('#mainCanvas').click(function () { // When the fire button is clicked the fire function is called
    boulder.animate = true;
  });

  function fire () {
    stopBoulder();
    resetBoulder();
    boulderAnimation = requestAnimationFrame(fireBoulder);
    // requestAnimationFrame found here: https://css-tricks.com/using-requestanimationframe/
  }

  function stopBoulder () {
    cancelAnimationFrame(boulderAnimation);
    // cancelAnimationFrame found here: https://css-tricks.com/using-requestanimationframe/
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

  // Draw boulder --------------------------------------------------------------
  function drawCircle () {
    ctx.drawImage(fireBall, boulder.shift, 0, boulder.frameWidth, boulder.frameHeight, boulder.xPos, boulder.yPos, boulder.frameWidth * scene.scaleFactor, boulder.frameHeight * scene.scaleFactor);
    //shifts through sprite sheet (animates)
    boulder.shift += boulder.frameWidth + 1;

    //resets spritesheet. Loops through
    if (boulder.currentFrame == boulder.totalFrames){
       boulder.shift = 0;
       boulder.currentFrame= 0;
    }
    //loops through each frame. frame properties stated in boulder Object.
    boulder.currentFrame++;
  }

  // Return the y position for the boulder -------------------------------------
  function getBoulderY (x) {
  	return Math.pow(x, 2) * boulder.landingPos + boulder.yOffset;
  }

  // Animate the scene ---------------------------------------------------------
  var countdown = horde.speed;
  var cycle = explosion.refresh;
  var sqrActPos = scene.width - horde.sqrx + 5;

  var countUp = 0;

  function animate () {
    ctx.clearRect(0, 0, scene.width, scene.height); // Clears the canvas from the previous frame

    ctx.drawImage(tower, 0, 100, 297 * scene.scaleFactor, 900 * scene.scaleFactor); // Draws the tower


    countdown--;
    if (countdown == 0) { // This controls the speed of the horde by only running every 5th time the animate function runs
      countdown = horde.speed;
      //calc for actual position of horde
    	sqrActPos = scene.width - horde.sqrx + 5;

      //update Squares X pos
    	horde.sqrx++;
      //shifts through sprite sheet (animates)
      horde.shift += horde.frameWidth + 1;

      //resets spritesheet. Loops through
      if (horde.currentFrame == horde.totalFrames) {

      	horde.shift = 0;
      	horde.currentFrame= 0;
      }
      //loops through each frame. frame properties stated in horde Object.
      horde.currentFrame++;
    }

    ctx.drawImage(skele, horde.shift, 0, horde.frameWidth, horde.frameHeight, sqrActPos, horde.hordeY, horde.frameWidth *scene.scaleFactor, horde.frameHeight *scene.scaleFactor);
    ctx.drawImage(skele, horde.shift, 0, horde.frameWidth, horde.frameHeight, sqrActPos + 40, horde.hordeY, horde.frameWidth *scene.scaleFactor, horde.frameHeight *scene.scaleFactor);
    ctx.drawImage(skele, horde.shift, 0, horde.frameWidth, horde.frameHeight, sqrActPos + 80, horde.hordeY, horde.frameWidth *scene.scaleFactor, horde.frameHeight *scene.scaleFactor);

    // Animate boulder ---------------------------------------------------------
    if (boulder.animate) { // If the boulder animation property is true, the boulder will animate

      if (boulder.landingPosCalculated == false) { // Sets the x position for the boulder to land to the x pos of the horde IF it hasn't been calculated
        boulder.landingPosCalculated = true;

        boulder.landingPos = scene.height / Math.pow(sqrActPos + boulder.yOffset, 2); // Refers to the x-coordinate at which the boulder lands;

        // boulder.landingPos = scene.height / Math.pow((sqrActPos - boulder.yOffset), 2); // Refers to the x-coordinate at which the boulder lands;

      }
      // TODO Change this to location of where the horde WILL be (refer to Trello notes for method)

      drawCircle(boulder.xPos, boulder.yPos);

      boulder.xPos += boulder.velocity; // This updates the boulders x position
      boulder.yPos = getBoulderY(boulder.xPos); // This updates the boulders y position relative to the x position (y=x^2)

      countUp ++;
    }

    // Horde resets & explosion animation --------------------------------------
    // Soft reset --------------------------------------------------------------
    if (boulder.yPos + boulder.radius >= horde.hordeY) {
      cycle--;
      console.log(cycle);
      if (cycle == 0) {
        cycle = explosion.refresh;

        explosion.shift += explosion.frameWidth + 1;
        //resets spritesheet. Loops through
        if (explosion.currentFrame == explosion.totalFrames) {
          explosion.shift = 0;
          explosion.currentFrame = 0;
        }
        explosion.currentFrame++;
      }
      ctx.drawImage(flames, explosion.shift, 0, explosion.frameWidth, explosion.frameHeight, boulder.xPos, boulder.yPos, explosion.frameWidth, explosion.frameHeight);
      horde.sqrx = 0;

      boulder.animate = false;
      boulder.landingPosCalculated = false;
      resetBoulder();
      console.log(countUp);
      console.log(sqrActPos);
    }

    // Hard reset --------------------------------------------------------------
    if (horde.sqrx == scene.width - 297 * scene.scaleFactor) { // Resets the horde if they reach the tower
      horde.sqrx = 0;

      boulder.animate = false;
      boulder.landingPosCalculated = false;
      resetBoulder();
    }


    requestAnimationFrame(animate);
  }

  animate();
});
