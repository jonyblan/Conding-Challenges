let rows = 10, cols = 10;

let cantMines = 5;

let cellWidth, cellHeight;

let grid = [];

let openSet = [];
let closedSet = [];
let lastMove = [];

let mines = [];

let newMove;

function mousePressed(){
	for(let i = 0; i < rows; i++){
		for(let j = 0; j < cols; j++){
			grid[i][j].revealed = true;
			grid[i][j].show(i, j, cellWidth, cellHeight);
		}
	}
	for(let i = 0; i < mines.length; i++){
		fill(0, 0, 255);
		ellipse(mines[i][0]*cellWidth + cellWidth/2, mines[i][1]*cellHeight + cellHeight / 2, cellWidth / 2, cellHeight / 2);
	}
}

function setup(){
	createCanvas(601, 601);

	cellWidth = Math.floor(width / rows);
	cellHeight = Math.floor(height / cols);

	for(let i = 0; i < rows; i++){
		grid[i] = [];
	}
	for(let i = 0; i < rows; i++){
		for(let j = 0; j < cols; j++){
			grid[i][j] = new Cell(i, j, cellWidth, cellHeight);
		}
	}
	let n = 0;
	while(n < cantMines){
		let i = Math.floor(random(rows));
		let j = Math.floor(random(cols));
		if(!grid[i][j].mine){
			grid[i][j].mine = true;
			n++;
		}
	}

	for(let i = 0; i < rows; i++){
		for(let j = 0; j < cols; j++){
			grid[i][j].countNeighbours(grid, rows, cols);
		}
	}
}
	
function validIndex(i, j, rows, cols){
	return (i < rows && 
			i >= 0 &&
			j < cols &&
			j >= 0);
}

function addMine(i, j){
	for(let n = 0; n < mines.length; n++){
		if(mines[n][0] == i && mines[n][1] == j){
			return 0;
		}
	}
	mines.push([i, j]);
	return 1;
}

function computerMove(i, j){
	if(lastMove.length == 0){
		let n = Math.floor(random(rows)), m = Math.floor(random(cols));
		grid[n][m].reveal(grid, rows, cols);
		lastMove[0] = n, lastMove[1] = m;
		openSet.push(lastMove);
		return ;
	}
	if(!grid[i][j].revealed){
		return ;
	}
	// same mines arround as hidden cells arround
	if(grid[i][j].cantNeighbours == grid[i][j].hiddenNeighbours){
		for(let a = -1; a <= 1; a++){
			for(let b = -1; b <= 1; b++){
				if(validIndex(i + a, j + b, rows, cols)){
					if(!grid[i + a][j + b].revealed){
						if(addMine(i + a, j + b)){
							grid[i + a][j + b].revealed = true;
							newMove = true;
						}
					}
				}
			}
		}
	}
	else{
		// 0 mines arround
		let mineCount = 0;
		for(let a = -1; a <= 1; a++){
			for(let b = -1; b <= 1; b++){
				if(validIndex(i + a, j + b, rows, cols)){
					if(grid[i + a][j + b].revealed){
						if(grid[i + a][j + b].mine){
							mineCount++;
						}
					}
				}
			}
		}
		if(mineCount == 0 || grid[i][j].hiddenNeighbours == 0){
			return ;
		}
		if(grid[i][j].cantNeighbours == mineCount){
			//console.log(i + " - " + j + " - " + mineCount);
			for(let a = -1; a <= 1; a++){
				for(let b = -1; b <= 1; b++){
					if(validIndex(i + a, j + b, rows, cols)){
						grid[i + a][j + b].reveal(grid, rows, cols);
					}
				}
			}
			newMove = true;
		}
	}
}

function draw(){
	background(0);
	newMove = false;
	for(let i = 0; i < rows; i++){
		for(let j = 0; j < cols; j++){
			computerMove(i, j);
			grid[i][j].show(i, j, cellWidth, cellHeight);
		}
	}
	for(let i = 0; i < mines.length; i++){
		fill(0, 0, 255);
		ellipse(mines[i][0]*cellWidth + cellWidth/2, mines[i][1]*cellHeight + cellHeight / 2, cellWidth / 2, cellHeight / 2);
	}
	if(!newMove){
		noLoop();
	}
}