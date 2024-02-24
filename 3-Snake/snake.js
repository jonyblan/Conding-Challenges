// Variable to represent the snake
var s;
// Scale for the size of each "cell" in the grid
var scl = 20;

// Snake constructor function
function Snake() {
    // Initial position and speed of the snake
    this.x = 0;
    this.y = 0;
    this.xspeed = 1;
    this.yspeed = 0;
    // Total length of the snake
    this.total = 0;
    // Array to store the snake's tail segments
    this.tail = [];

    // Method to check if the snake eats the food
    this.eat = function(pos) {
        // Calculate distance between snake head and food
        var d = dist(this.x, this.y, pos.x, pos.y);
        if (d < 1) {
            this.total++;
            return true;
        } else {
            return false;
        }
    }

    // Method to change the snake's direction
    this.dir = function(x, y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    // Method to check for collision with itself
    this.death = function() {
        // Loop through each tail segment
        for (var i = 0; i < this.tail.length; i++) {
            var pos = this.tail[i];
            var d = dist(this.x, this.y, pos.x, pos.y);
            // If the distance is less than 1, the snake collided with itself
            if (d < 1) {
                console.log('starting over');
                this.total = 0;
                this.tail = [];
            }
        }
    }

    // Method to update the snake's position
    this.update = function() {
        // Move the tail segments
        for (var i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }
        // Add a new tail segment if the snake has eaten food
        if (this.total >= 1) {
            this.tail[this.total - 1] = createVector(this.x, this.y);
        }

        // Move the snake's head
        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;

        // Constrain the snake's position within the canvas boundaries
        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);
    }

    // Method to display the snake
    this.show = function() {
        fill(255);
        // Draw each tail segment
        for (var i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        // Draw the snake's head
        rect(this.x, this.y, scl, scl);
    }
}
