
let stars = [];
let cantStars = 200;
let speed = 50;

function setup() {
	createCanvas(1366, 771);
	for (var i = 0; i < cantStars; i++) {
		stars[i] = new Star();
	}
}

function draw() {
	//speed = map(mouseX, 0, width, 0, 50);
	background(0);
	translate(width / 2, height / 2);
	for (let i = 0; i < stars.length; i++) {
		stars[i].update();
		stars[i].show();
	}
}