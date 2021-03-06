// Enemies our player must avoid
var Enemy = function (paramX, paramY, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    //Initial enemy's parameters
    this.x = paramX;
    this.y = paramY;
    //Initial speed
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //if enemy is off screen, reset the enemy's location and speed
    if (this.x > 505) {
        this.x = -50;
        this.speed = 20 * Math.floor((Math.random() + 1) * 10);
    }
    this.checkCollision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.x = 202;
    this.y = 400;
    this.sprite = 'images/char-horn-girl.png';
};

//handling collision
Enemy.prototype.checkCollision = function () {
    if (player.y + 121 >= this.y + 83 && player.y + 83 <= this.y + 121 &&
        player.x + 30 <= this.x + 80 && player.x + 80 >= this.x + 30) {
        //reset player's position
        player.x = 202;
        player.y = 400;
    }

};

//set alert when wimming game and reset player position
Player.prototype.winGame = function () {
    window.alert("You won!!! Congratulations!!! \nPress OK if you want to play again!");
    this.x = 202;
    this.y = 400;
    win = false;
};

Player.prototype.update = function () {
    if (win) {
        this.winGame();
    }
};

// Draw the player on the screen
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var win = false;
//I thought about using 4 if loop, but i guess switch case loop is more effective
Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'up':
            //if player reaches water he wins game
            if (this.y < 0) {
                win = true;
                console.log(win);
            } else {
                this.y -= 82;
            }
            break;
            //checking if player reached down wall
        case 'down':
            if (this.y < 400) {
                this.y += 82;
            }
            break;
        case 'right':
            //checking if player reached right wall
            if (this.x < 380) {
                this.x += 101;
            }
            break;
        case 'left':
            //checking if player reached left wall
            if (this.x > 0) {
                this.x -= 101;
            }
            break;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
//Enemies position 60, 140, 220
//set random speed, Math.random returns number [0,1)
var allEnemies = [];
var enemySpeed = 20 * Math.floor((Math.random() + 1) * 10)

for (var i = 0; i < 3; i++) {
    allEnemies.push(new Enemy(-50, 60 + (85 * i), enemySpeed))
}

// Place the player object in a variable called player
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
