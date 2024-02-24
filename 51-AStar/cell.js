class Cell{
	constructor(x, y, obstaclePercentage){
		this.x = x;
		this.y = y;
		this.f = undefined; // f is just the sum of the 2, we want to pick the cell with the lowest h possibl
		this.g = undefined; // g is the distance between the cell and the start cell
		this.h = undefined; // h is the minimum distance between the cell and the end cell
		this.neighbours = [];
		this.previousCell = undefined;
		this.wall = false;

		if(Math.random() < obstaclePercentage){
			this.wall = true;
		}
	}

	// rgb/grey colour
	show(w, h, r, g = null, b = null){
		if(this.wall){
			fill(0);
		}
		else if(g === null && b === null){
			fill(r);
		}
		else{
			fill(r, g, b);
		}
		noStroke();
		rect(this.x*w, this.y*h, w - 1, h - 1);
		/*if((this.f != undefined)){
			fill(255);
			textAlign(CENTER);
			textSize((w-1)/2);
			let aux = this.f;
			aux = Math.trunc(aux);
			text(aux, this.x * w + w / 2, this.y * h + h / 2);
		}*/
	}

	addNeighbours(grid){
		let x = this.x, y = this.y;
		if(x < rows - 1){
			if(y < cols - 1){
				this.neighbours.push(grid[x + 1][y + 1]);
			}
			if(y > 0){
				this.neighbours.push(grid[x + 1][y - 1]);
			}
			this.neighbours.push(grid[x + 1][y]);
		}
		if(x > 0){
			if(y < cols - 1){
				this.neighbours.push(grid[x - 1][y + 1]);
			}
			if(y > 0){
				this.neighbours.push(grid[x - 1][y - 1]);
			}
			this.neighbours.push(grid[x - 1][y]);
		}
		if(y < cols - 1){
			this.neighbours.push(grid[x][y + 1]);
		}
		if(y > 0){
			this.neighbours.push(grid[x][y - 1]);
		}
	}
}