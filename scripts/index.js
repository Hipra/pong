var myCanvas = document.getElementById("myCanvas");
var context = myCanvas.getContext("2d");

var x = 20;
var y = 20;
var vX = 7;
var vY = 3;
var ballSize = 10;

var wallLeft = 0;
var wallRight = context.canvas.width - ballSize;

var wallTop = 0;
var wallBottom = context.canvas.height - ballSize;

var colors = ["#00B8A9", "#EB586F", "#4AA0D5", "#F8C957"];

function drawBall() {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	context.fillRect(x, y, ballSize, ballSize);
	
	if (x + vX >= wallRight) {
        handleCollisionX(wallRight);
        context.fillStyle = colors[0];
	} else if (x + vX <= wallLeft) {
        handleCollisionX(wallLeft);
        context.fillStyle = colors[1];
	} else {
		x = x + vX;
	}

	if (y + vY >= wallBottom) {
        handleCollisionY(wallBottom);
        context.fillStyle = colors[2];
	} else if (y + vY <= wallTop) {
        handleCollisionY(wallTop);
        context.fillStyle = colors[3];
	} else {
		y = y + vY;
	}
}

function handleCollisionX(wall) {
	x = wall - (x + vX - wall);
    vX = -vX;
}

function handleCollisionY(wall) {
	y = wall - (y + vY - wall);
    vY = -vY;
}

setInterval(drawBall, 1000/60);