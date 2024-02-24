// This code is the same as Daniel's.
// I will probably change it if something occurs to me

let counter = [];

class Star {

	constructor() {
		let r = Math.random() * 2 - 1;
		let bell = Math.exp(Math.E, Math.exp(r, -2));
		this.x = width * bell;
		r = Math.random() * 2 - 1;
		bell = Math.exp(Math.E, Math.exp(r, -2));
		this.y = height * bell;
		this.z = random(width);
		this.pz = this.z;
		counter[this.x%10]++;
		if(counter[this.x%10] == 1){
			console.log(this.x%10);
		}
	}
  
	update() {
		this.z = this.z - speed;
		if (this.z < 1) {
			this.z = width;
			let r = Math.random() * 2 - 1;
			let bell = Math.exp(Math.E, Math.exp(r, -2));
			console.log(Math.exp(4, Math.exp(r, -2)));
			this.x = width * bell;
			r = Math.random() * 2 - 1;
			bell = Math.exp(Math.E, Math.exp(r, -2));
			this.y = height * bell;
			this.pz = this.z;
		}
	}
  
	show() {
		fill(255);
		noStroke();
	
		let sx = map(this.x / this.z, 0, 1, 0, width);
		let sy = map(this.y / this.z, 0, 1, 0, height);
	
		let r = map(this.z, 0, width, 4, 0);
		//ellipse(sx, sy, r, r);
	
		let px = map(this.x / this.pz, 0, 1, 0, width);
		let py = map(this.y / this.pz, 0, 1, 0, height);
	
		this.pz = this.z;
	
		stroke(255);
		strokeWeight(r);
		line(px, py, sx, sy);
  
	}
  }