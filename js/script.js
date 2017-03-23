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
		c.attr("height", $('.canvas-container').height() - 20); // TODO Figure this out - 100vh height adds scrollbars on both axes 
		//Placeholder rectangle.
		ctx.fillRect(0, 0, c.width(), c.height());
	};

resizeCanvas();
