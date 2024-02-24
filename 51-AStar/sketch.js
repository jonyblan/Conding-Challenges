let rows = 5;
let cols = 5;
let obstaclePercentage = 0.25;
let grid = [rows];
let start;
let end;
let optimalPath = [], optimalDistance;

var openSet = [];
var closedSet = [];

let cellWidth, cellHeight;

function distance(elem1, elem2){
	let distX = Math.abs(elem1.x - elem2.x);
	let distY = Math.abs(elem1.y - elem2.y);
	return Math.sqrt(distX * distX + distY * distY);
}

// this works by calculating the minimum ammount of steps that have to be horizontal/vertical (distance of 1)
// and assuming the rest of the steps are diagonal (the shortest)
function heuristic(elem1, elem2){
	let totalMinDistance = 0;
	let distX = Math.abs(elem1.x - elem2.x);
	let distY = Math.abs(elem1.y - elem2.y);
	if(distX > distY){
		totalMinDistance = distX - distY + Math.sqrt(distY*distY + distY*distY);
	}
	else if(distX < distY){
		totalMinDistance = distY - distX + Math.sqrt(distX*distX + distX*distX);
	}
	else{
		totalMinDistance = Math.sqrt(distX*distX + distX*distX);
	}
	return distance(elem1, elem2);
}

function setup(){
	//createCanvas(1400, 800);
	createCanvas(800, 600);

	cellWidth = width / cols, cellHeight = height / rows;

	// 2D Array of cells
	for(let i = 0; i < rows; i++){
		grid[i] = [cols];
	}
	for(let i = 0; i < rows; i++){
		for(let j = 0; j < cols; j++){
			grid[i][j] = new Cell(i, j, obstaclePercentage);
		}
	}
	for(let i = 0; i < rows; i++){
		for(let j = 0; j < cols; j++){
			grid[i][j].addNeighbours(grid);
		}
	}

	// declare start and end cells
	start = grid[0][0];
	end = grid[rows - 1][cols - 1]; 


	start.g = 0, start.wall = false, end.wall = false;
	openSet.push(start);

	//frameRate(1);
} 

function draw(){
	background(0);

	if(openSet.length > 0){
		let lowestIndex = 0;
		for(let i = 1; i < openSet.length; i++){
			if(openSet[i].f < openSet[lowestIndex].f){
				lowestIndex = i;
			}
		}

		// current is the element with the lowest f value in the open set (we stand in current)
		let current = openSet[lowestIndex];

		if(current == end){
			console.log("finished in " + optimalPath.length + " steps, with a distance of " + optimalDistance);
			/*let x = end.x, y = end.y;
			start = grid[x][y];
			openSet.splice(0, openSet.length);
			openSet.push(start);
			closedSet.splice(0, closedSet.length);
			let r1 = Math.floor(Math.random()*rows), r2 = Math.floor(Math.random()*cols);
			end = grid[r1][r2];
			grid[r1][r2].wall = false;
			for(let i = 0; i < rows; i++){
				for(let j = 0; j < cols; j++){
					grid[i][j].previousCell = undefined;
					grid[i][j].f = undefined;
					grid[i][j].g = undefined;
					grid[i][j].h = undefined;
				}
			}
			grid[x][y].g = 0;*/
		} 
		else{
			openSet.splice(lowestIndex, 1);
			closedSet.push(current);

			// we iterate through each neighbour of current
			for(let i = 0; i < current.neighbours.length; i++){
				let neighbour = current.neighbours[i]; // neighbour is the naighbour of current being evaluated
				if(!closedSet.includes(neighbour) && !neighbour.wall){ // if the neighbour wasnt previously evaluated and isnt a wall
					// the distance from the start is the previous distance + the distance between the 2 (here it'll be always one)
					// exept there was already a better score (thats why its tentative)
					let tentativeG = current.g + distance(current, neighbour); 

					// we check if there was a score
					if(openSet.includes(neighbour)){
						// we check if the score was worse. if it was better, nothing is changed
						if(tentativeG < neighbour.g){
							neighbour.g = tentativeG;
							neighbour.previousCell = current;
						}
					}
					// if there wasnt a score, we record it
					else{
						neighbour.g = tentativeG;
						neighbour.previousCell = current;
						openSet.unshift(neighbour);
						neighbour.h = heuristic(neighbour, end);
					}
					// either way, the neighbour end up in the open set
					
					neighbour.f = neighbour.g + neighbour.h;
				}
				// find the current path
				optimalPath = [], optimalDistance = 0;
				let temp = current;
				optimalPath.push(temp);
				while(temp.previousCell != undefined){
					optimalDistance += distance(temp, temp.previousCell);
					optimalPath.push(temp.previousCell);
					temp = temp.previousCell;
				}
			}
		}
	}
	else{
		console.log("There isnt a path between those 2 points");
		noLoop();
	}

	for(let i = 0; i < rows; i++){
		for(let j = 0; j < cols; j++){
			grid[i][j].show(cellWidth, cellHeight, 50);
		}
	}
	end.show(cellWidth, cellHeight, 255);

	for(let i = 0; i < closedSet.length; i++){
		closedSet[i].show(cellWidth, cellHeight, 255, 0, 0);
	}

	for(let i = 0; i < openSet.length; i++){
		openSet[i].show(cellWidth, cellHeight, 0, 0, 255);
	}

	for(let i = 0; i < optimalPath.length; i++){
		optimalPath[i].show(cellWidth, cellHeight, 0, 255, 0);
	}
}