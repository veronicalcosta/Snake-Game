const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gridSize = 20; // Size of each cell in the grid
let snake = [{ x: gridSize * 5, y: gridSize * 5 }]; // Starting position of the snake
let food = { x: gridSize * 10, y: gridSize * 10 }; // Starting position of the food
let dx = gridSize; // Snake movement in the x direction
let dy = 0; // Snake movement in the y direction
let score = 0;
let isGameOver = false;

// Game loop
function gameLoop() {
  if (isGameOver) return;
  
  update();
  draw();
  
  setTimeout(gameLoop, 100); // Controls the speed of the snake
}

// Update the game state
function update() {
  // Move the snake
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  
  // Check if the snake eats the food
  if (head.x === food.x && head.y === food.y) {
    score += 1;
    document.getElementById("score").textContent = score;
    generateFood();
  } else {
    snake.pop(); // Remove the tail
  }

  // Check for collisions
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || checkCollision(head)) {
    gameOver();
  }
}

// Draw the game state
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw the snake
  ctx.fillStyle = "green";
  snake.forEach(part => ctx.fillRect(part.x, part.y, gridSize, gridSize));
  
  // Draw the food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Check if the snake collides with itself
function checkCollision(head) {
  return snake.some((part, index) => index !== 0 && part.x === head.x && part.y === head.y);
}

// Generate a new food position
function generateFood() {
  food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
  food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
}

// Handle keyboard input
document.addEventListener("keydown", e => {
  if (isGameOver && e.key === "Enter") {
    restartGame();
    return;
  }
  
  if (e.key === "ArrowUp" && dy === 0) {
    dx = 0;
    dy = -gridSize;
  } else if (e.key === "ArrowDown" && dy === 0) {
    dx = 0;
    dy = gridSize;
  } else if (e.key === "ArrowLeft" && dx === 0) {
    dx = -gridSize;
    dy = 0;
  } else if (e.key === "ArrowRight" && dx === 0) {
    dx = gridSize;
    dy = 0;
  }
});

// Game over logic
function gameOver() {
  isGameOver = true;
  document.getElementById("game-over-message").classList.remove("hidden");
}

// Restart the game
function restartGame() {
  snake = [{ x: gridSize * 5, y: gridSize * 5 }];
  dx = gridSize;
  dy = 0;
  score = 0;
  document.getElementById("score").textContent = score;
  isGameOver = false;
  document.getElementById("game-over-message").classList.add("hidden");
  generateFood();
  gameLoop();
}

// Start the game
generateFood();
gameLoop();
