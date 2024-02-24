var food;

function setup() {
    // Set up the canvas
    createCanvas(windowWidth-100, windowHeight-100);
    background(0);
    // Create a new Snake object
    s = new Snake();
    frameRate(10);
    // Place the initial food
    pickLocation();
}

function pickLocation() {
    // Randomly pick a location for the food
    var cols = floor(width / scl);
    var rows = floor(height / scl);
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
}

function mousePressed() {
    // Increment the snake's length when mouse is pressed
    s.total++;
}

function draw() {
    // Refresh the canvas
    background(0);

    // Check if the snake has eaten the food
    if (s.eat(food)) {
        // Pick a new location for the food
        pickLocation();
    }
    // Check for game over
    s.death();
    // Update and display the snake
    s.update();
    s.show();

    // Draw the food
    fill(255, 0, 100);
    rect(food.x, food.y, scl, scl);
}

function keyPressed() {
    // Change the snake's direction based on arrow key input
    if (keyCode === UP_ARROW) {
        s.dir(0, -1);
    } else if (keyCode === DOWN_ARROW) {
        s.dir(0, 1);
    } else if (keyCode === RIGHT_ARROW) {
        s.dir(1, 0);
    } else if (keyCode === LEFT_ARROW) {
        s.dir(-1, 0);
    }
}
