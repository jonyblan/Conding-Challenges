const cantDrops = 3000;
let drops = [];
const maxZ = 20;
const maxDroppedPerDrop = 2;
const xSpeedDropped = 0.5;
const ySpeedDropped = 4;
// higher Z, maxDroppedPerDrop, ySpeedDropped and mostly cantDrops will lower
// the framerate. Its not consistant so the lower the frame rate, the more
// consistant the animation will be
const frames = 60;
let lowestFrameRate = 60;

function setup() {
	createCanvas(1366, 771);
	for (let i = 0; i < cantDrops; i++) {
		drops[i] = new Drop(maxZ);
	}
	frameRate(frames);
}

function draw() {
	background(230, 230, 250);
	background(0);
	for (let i = 0; i < drops.length; i++) {
		drops[i].fall(maxZ, maxDroppedPerDrop, xSpeedDropped, ySpeedDropped);
		drops[i].show(maxZ);
	}
}