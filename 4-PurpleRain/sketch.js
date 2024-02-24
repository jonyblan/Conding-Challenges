let cantDrops = 200;
let drops = [];

function setup() {
	createCanvas(640, 360);
	for (let i = 0; i < cantDrops; i++) {
		drops[i] = new Drop();
	}
}

function draw() {
	background(230, 230, 250);
	background(0);
	for (let i = 0; i < drops.length; i++) {
		drops[i].fall();
		drops[i].show();
	}
}