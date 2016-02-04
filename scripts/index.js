var myCanvas = document.getElementById("myCanvas");
var context = myCanvas.getContext("2d");

var x = 20;
var y = 20;
var vX = 7;
var vY = 3;
var ballSize = 50;

var wallLeft = 0;
var wallRight = context.canvas.width - ballSize;

var wallTop = 0;
var wallBottom = context.canvas.height - ballSize;

function drawBall() {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	context.fillRect(x, y, ballSize, ballSize);
	
	if (x + vX >= wallRight) {
        handleCollisionX(wallRight);
	} else if (x + vX <= wallLeft) {
        handleCollisionX(wallLeft);
	} else {
		x = x + vX;
	}

	if (y + vY >= wallBottom) {
        handleCollisionY(wallBottom);
	} else if (y + vY <= wallTop) {
        handleCollisionY(wallTop);
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