class Dropped{
	constructor(dropsIn, x, z){
		this.x = x;
		this.xSpeed = random(-0.5, 0.5);
		this.y = height - 1;
		this.ySpeed = random(-0.5, -2);
		this.z = z;
		this.dropsIn = dropsIn;
	}

	droppedFall(grav){
		this.x += this.xSpeed;
		this.y += this.ySpeed;
		this.ySpeed += grav;
		if(this.y > height || this.y < 0 || this.x > width || this.x < 0){
			return 1;
		}
		return 0;
	}

	show(){
		push();
		translate(this.x, this.y);
		let angleRadians = getRadians(this.xSpeed, this.ySpeed);
		rotate(angleRadians);
		rectMode(CENTER);
		noStroke();
		fill(138, 43, 226);
		rect(0, 0, 5, 1);
		pop();
	}
}

class Drop{
	constructor(){
		this.x = random(width);
		this.y = -10;
		this.z = random(0, 20);
		this.len = map(this.z, 0, 20, 10, 20);
		this.ySpeed = map(this.z, 0, 20, 1, 20);
		this.grav = map(this.z, 0, 20, 0.05, 0.2);
		this.dropped = [];
		
	}

	dropFall(){
		this.y = this.y + this.ySpeed;
		this.ySpeed = this.ySpeed + this.grav;
	}

	createDropped(){
		this.y = -100;
		let cantDrops = random(1, 4);
		for(let i = 0; i < cantDrops; i++){
			this.dropped[i] = new Dropped(0, this.x, this.z);
		}
	}

	fallDropped(){
		for(let i = this.dropped.length - 1; i >= 0; i--){
			if(this.dropped[i].droppedFall(this.grav) == 1){
				this.dropped.splice(i, 1);
			}
		}
		if(this.dropped.length == 0){
			this.y = random(-200, -100);
			this.ySpeed = map(this.z, 0, 20, 4, 10);
		}
	}	

	fall(){
		if (this.y > height) {
			this.createDropped();
			console.log("a");
		}
		else if(this.dropped.length == 0){
			this.dropFall();
			console.log("b");
		}
		else{
			this.fallDropped();
			console.log(this.dropped.length);
		}
	}
  
	show() {
		if(this.dropped.length == 0){
			let thick = map(this.z, 0, 20, 1, 3);
			strokeWeight(thick);
			stroke(138, 43, 226);
			line(this.x, this.y, this.x, this.y + this.len);
		}
		else{
			console.log("AAAAAA");
			for(let i = 0; i < this.dropped.length; i++){
				this.dropped[i].show();
			}
		}
	}
}

function getRadians(vx, vy){
	let vecEnd = Math.sqrt(vx*vx+vy*vy);
	let angleRadians = Math.acos(vx/vecEnd);
	if((vx < 0 && vy < 0) || (vx > 0 && vy < 0)){
		angleRadians *= -1;
	}
	return angleRadians;
}