var myCanvas = document.getElementById("myCanvas");
var context = myCanvas.getContext("2d");
var points = document.getElementById("points");

document.addEventListener('keydown', handleKeyEvent);
document.addEventListener('mousemove', handleMouseMove);

var randomStartX = Math.floor((Math.random() * context.canvas.width));
var randomStartY = Math.floor((Math.random() * context.canvas.height));

var x = randomStartX;
var y = randomStartY;
var vX = 8;
var vY = 4;
var ballSize = 20;

var wallLeft = 0;
var wallRight = context.canvas.width - ballSize;

var wallTop = 0;
var wallBottom = context.canvas.height - ballSize;

var clubAX = 10;
var clubAY = 200;
var clubBX = 780;
var clubBY = 200;
var clubWidth = 10;
var clubHeight = 180;

var arrowUp = 38;
var arrowDown = 40;

var counter = 0;

function drawBall() {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	context.fillRect(x, y, ballSize, ballSize);
	
	if (x + vX >= wallRight) {
        handleCollisionX(wallRight);
	} else if (x + vX <= wallLeft) {
        handleCollisionX(wallLeft);
    } else if (y + vY > clubAY - ballSize && y + vY < clubAY + clubHeight && x + vX <= clubAX + clubWidth) {
    	handleCollisionX(clubAX + clubWidth);
    	points.innerHTML = add();
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

	context.fillRect(clubAX, clubAY, clubWidth, clubHeight);
	context.fillRect(clubBX, clubBY, clubWidth, clubHeight);
}

function handleMouseMove(event) {
	if (event.pageY > clubHeight / 2 && event.pageY < context.canvas.height - clubHeight + clubHeight / 2) {
        clubAY = event.pageY - clubHeight / 2;
	}
}

function handleKeyEvent(event) {
	
	if (event.keyCode === arrowUp && clubBY > 0) {
        clubBY = clubBY - 10;
	}

	if (event.keyCode === arrowDown && clubBY < context.canvas.height - clubHeight) {
		clubBY = clubBY + 10;
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

function add() {
	return counter += 1;
}

setInterval(drawBall, 1000/60);
