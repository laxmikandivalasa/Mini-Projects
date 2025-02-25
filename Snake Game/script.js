let blockSize = 25;
let total_row = 17; // Total row number
let total_col = 17; // Total column number
let board;
let context;

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let speedX = 0;  // Speed of snake in x direction
let speedY = 0;  // Speed of snake in y direction

let snakeBody = [];

let foodX;
let foodY;

let gameOver = false;
let score = 0; // Initialize score

window.onload = function () {
    // Set board height and width
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);  // Movement controls
    setInterval(update, 200); // Set snake speed
}

function update() {
    if (gameOver) return;

    // Draw background
    context.fillStyle = "blue";
    context.fillRect(0, 0, board.width, board.height);

    // Display score
    context.fillStyle = "white";
    context.font = "20px Arial";
    context.fillText("Score: " + score, 10, 20);

    // Draw food as a circle
    context.fillStyle = "yellow";
    context.beginPath();
    context.arc(foodX + blockSize / 2, foodY + blockSize / 2, blockSize / 2, 0, 2 * Math.PI);
    context.fill();

    // Check if snake eats food
    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]);
        score += 10; // Increase score
        placeFood();
    }

    // Move snake body
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    // Move snake
    snakeX += speedX * blockSize;
    snakeY += speedY * blockSize;

    // Draw snake
    context.fillStyle = "white";
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    // Check for game over (out of bounds)
    if (snakeX < 0 || snakeX >= total_col * blockSize || 
        snakeY < 0 || snakeY >= total_row * blockSize) {
        endGame();
    }

    // Check if snake collides with itself
    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            endGame();
        }
    }
}

// Handle Game Over
function endGame() {
    gameOver = true;
    alert("Game Over! Final Score: " + score);
    location.reload(); // Reload page to restart game
}

// Movement controls
function changeDirection(e) {
    if (e.code === "ArrowUp" && speedY !== 1) {
        speedX = 0;
        speedY = -1;
    }
    else if (e.code === "ArrowDown" && speedY !== -1) {
        speedX = 0;
        speedY = 1;
    }
    else if (e.code === "ArrowLeft" && speedX !== 1) {
        speedX = -1;
        speedY = 0;
    }
    else if (e.code === "ArrowRight" && speedX !== -1) {
        speedX = 1;
        speedY = 0;
    }
}

// Randomly place food
function placeFood() {
    foodX = Math.floor(Math.random() * total_col) * blockSize; 
    foodY = Math.floor(Math.random() * total_row) * blockSize; 
}
