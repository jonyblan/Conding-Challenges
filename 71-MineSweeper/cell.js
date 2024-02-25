class Cell{
	constructor(i, j, width, height){
		this.i = i;
		this.j = j;
		this.x = i*width;
		this.y = j*height;
		this.width = width;
		this.height = height;
		this.mine = false;
		this.revealed = false;
		this.cantNeighbours = 0;
		this.hiddenNeighbours = 0;
	}

	pickColour(){
		if(this.revealed){
			return(200);
		}
		else{
			return(100);
		}
	}

	showMine(){
		fill(255, 0, 0);
		ellipse(this.x + this.width/2, this.y + this.height / 2, this.width / 2, this.height / 2);
	}

	showCantMines(){
		fill(0, 255, 0);
		textSize(Math.min(this.width, this.height)/2);
		text(this.cantNeighbours, this.x + (this.width/8)*3, this.y + (this.height / 4)*3);
	}

	show(){
		fill(this.pickColour());
		noStroke();
		rect(this.x + 1, this.y + 1, this.width - 1, this.height - 1);
		if(!this.revealed){
			return 1;
		}
		if(this.mine){
			this.showMine();
			return 0;
		}
		else if(this.cantNeighbours != 0){
			this.showCantMines();
			return 1;
		}
		return 1;
	}
	
	validIndex(i, j, rows, cols){
		return (i + this.i < rows && 
				i + this.i >= 0 &&
				j + this.j < cols &&
				j + this.j >= 0 &&
				(i != 0 || j != 0));
	}

	analizeReveal(grid, i, j, rows, cols){
		if(!this.validIndex(i, j, rows, cols)){
			return ;
		}
		if(grid[this.i + i][this.j + j].revealed == true){
			return ;
		}
		grid[this.i + i][this.j + j].reveal(grid, rows, cols);
	}

	reveal(grid, rows, cols){
		this.revealed = true;
		for(let i = -1; i <= 1; i++){
			for(let j = -1; j <= 1; j++){
				if(this.validIndex(i, j, rows, cols)){
					grid[this.i + i][this.j + j].hiddenNeighbours--;
				}
			}
		}
		if(this.cantNeighbours != 0){
			return ;
		}
		for(let i = -1; i <= 1; i++){
			for(let j = -1; j <= 1; j++){
				this.analizeReveal(grid, i, j, rows, cols);
			}
		}
	}

	contains(mouseX, mouseY){
		return(	mouseX > this.x && 
				mouseX < this.x + this.width && 
				mouseY > this.y && 
				mouseY < this.y + this.height);
	}

	analizeCount(grid, i, j, cols, rows){
		if(!this.validIndex(i, j, rows, cols)){
			return ;
		}
		if(i != 0 || j != 0){
			this.hiddenNeighbours++;
		}
		if(!grid[this.i + i][this.j + j].mine){
			return ;
		}
		this.cantNeighbours++;
	}

	countNeighbours(grid, rows, cols){
		if(this.mine){
			this.cantNeighbours = -1;
			return ;
		}
		for(let i = -1; i <= 1; i++){
			for(let j = -1; j <= 1; j++){
				this.analizeCount(grid, i, j, rows, cols);
			}
		}
	}
}