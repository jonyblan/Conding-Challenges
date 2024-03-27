let rows = 10, cols = 10;

let cantMines = 10;

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

function checkSpot(i, j){
	if(!grid[i][j].revealed){
		grid[i][j].reveal();
		for(let a = -1; a <= 1; a++){
			for(let b = -1; b <= 1; b++){
				if(validIndex(i + a, j + b, rows, cols)){
					grid[i + a][j + b].hiddenNeighbours--;
				}
			}
		}
		grid[i][j].hiddenNeighbours++;
		newMove = true;
	}
}

function putFlag(i, j){
	if(!grid[i][j].revealed){
		if(addMine(i, j)){
			grid[i][j].revealed = true;
			for(let a = -1; a <= 1; a++){
				for(let b = -1; b <= 1; b++){
					if(validIndex(i + a, j + b, rows, cols)){
						grid[i + a][j + b].hiddenNeighbours--;
					}
				}
			}
			grid[i][j].hiddenNeighbours++;
			newMove = true;
		}
	}
}

function sameAroundHidden(i, j){
	for(let a = -1; a <= 1; a++){
		for(let b = -1; b <= 1; b++){
			if(validIndex(i + a, j + b, rows, cols)){
				putFlag(i + a, j + b);
			}
		}
	}
}

function getCantNeighboursHidden(i, j){
	let cantNeighboursHidden = grid[i][j].cantNeighbours;
	for(let a = -1; a <= 1; a++){
		for(let b = -1; b <= 1; b++){
			if(validIndex(i + a, j + b, rows, cols)){
				if(grid[i + a][j + b].revealed == true){
					if(grid[i + a][j + b].mine == true){
						cantNeighboursHidden--;
					}
				}
			}
		}
	}
	return cantNeighboursHidden;
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
	if(grid[i][j].hiddenNeighbours == 0){
		return ;
	}
	if(grid[i][j].mine){
		return ;
	}

	// same mines arround as hidden cells arround
	let cantNeighboursHidden = getCantNeighboursHidden(i, j);
	if(cantNeighboursHidden == grid[i][j].hiddenNeighbours){
		sameAroundHidden(i, j);
	}

	// same non mines arround as hidden cells arround
	if(cantNeighboursHidden == 0 && grid[i][j].hiddenNeighbours != 0){
		for(let a = -1; a <= 1; a++){
			for(let b = -1; b <= 1; b++){
				if(validIndex(i + a, j + b, rows, cols)){
					checkSpot(i + a, j + b);
				}
			}
		}
	}
}

function draw(){
	background(0);
	newMove = false;
	let shownMines = 0;
	for(let i = 0; i < rows; i++){
		for(let j = 0; j < cols; j++){
			computerMove(i, j);
			grid[i][j].show(i, j, cellWidth, cellHeight);
			if(grid[i][j].mine && grid[i][j].revealed){
				shownMines++;
			}
		}
	}
	if(shownMines > mines.length){
		noLoop();
	}
	for(let i = 0; i < mines.length; i++){
		if(grid[mines[i][0]][mines[i][1]].mine == false){
			console.log("Wrong mine at: [" + mines[i][0] + " , " + mines[i][1] + "]");
			noLoop();
		}
		fill(0, 0, 255);
		ellipse(mines[i][0]*cellWidth + cellWidth/2, mines[i][1]*cellHeight + cellHeight / 2, cellWidth / 2, cellHeight / 2);
	}
	if(newMove == false){
		let n = Math.floor(random(rows)), m = Math.floor(random(cols));
		grid[n][m].reveal(grid, rows, cols);
	}
	if(mines.length >= cantMines){
		noLoop();
		console.log(mines.length);
	}
}