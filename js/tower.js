var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");
var imageObj = new Image();

imageObj.onload = function() {
  ctx.drawImage(imageObj, 0, 100);
};

imageObj.src = "images/tower.png";