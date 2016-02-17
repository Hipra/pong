var myCanvas = document.getElementById("myCanvas");
var context = myCanvas.getContext("2d");
var points = document.getElementById("points");

//document.addEventListener('keydown', handleKeyEvent);
document.addEventListener('mousemove', handleMouseMove);

var x = 20;
var y = 20;
var vX = 7;
var vY = 3;
var ballSize = 50;

var wallLeft = 0;
var wallRight = context.canvas.width - ballSize;

var wallTop = 0;
var wallBottom = context.canvas.height - ballSize;

var clubX = 10;
var clubY = 100;
var clubWidth = 10;
var clubHeight = 180;

var arrowUp = 38;
var arrowDown = 40;

function drawBall() {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	context.fillRect(x, y, ballSize, ballSize);
	
	if (x + vX >= wallRight) {
        handleCollisionX(wallRight);
	} else if (x + vX <= wallLeft) {
        handleCollisionX(wallLeft);
    } else if (y + vY > clubY - ballSize && y + vY < clubY + clubHeight && x + vX <= clubX + clubWidth) {
    	handleCollisionX(clubX + clubWidth);
    	points.innerHTML = 4;
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

	context.fillRect(clubX, clubY, clubWidth, clubHeight);
}

function handleKeyEvent(event) {
	
	if (event.keyCode === arrowUp && clubY > 0) {
        clubY = clubY - 10;
	}

	if (event.keyCode === arrowDown && clubY < context.canvas.height - clubHeight) {
		clubY = clubY + 10;
	}
}

function handleMouseMove(event) {
	if (event.pageY > clubHeight / 2 && event.pageY < context.canvas.height - clubHeight + clubHeight / 2) {
        clubY = event.pageY - clubHeight / 2;
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