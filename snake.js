let snake = [
  { x: 150, y: 150 },
  { x: 140, y: 150 },
  { x: 130, y: 150 },
  { x: 120, y: 150 },
  { x: 110, y: 150 },
];
const CANVAS_BG_COLOR = "white";
const CANVAS_BORDER_COLOR = "black";
const canvas = document.querySelector("#gameCanvas");
const ctx = canvas.getContext("2d");

let dx = 10;
let dy = 0;

let changingDirection = false;

// Food x-coordinate
let foodX;
// Food y-coordinate
let foodY;

let score = 0;

const clearCanvas = () => {
  ctx.fillStyle = CANVAS_BG_COLOR;
  ctx.strokestyle = CANVAS_BORDER_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
};

const drawSnakePart = (snakePart) => {
  ctx.fillStyle = "lightgreen";
  ctx.strokestyle = "darkgreen";

  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
};

function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;
  /**
   * Prevent the snake from reversing
   * Example scenario:
   * Snake is moving to the right. User presses down and immediately left
   * and the snake immediately changes direction without taking a step down first
   */
  if (changingDirection) return;
  changingDirection = true;

  const keyPressed = event.keyCode;

  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

const drawSnake = () => {
  snake.forEach(drawSnakePart);
};

const advanceSnake = () => {
  const head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy,
  };

  snake.unshift(head);

  const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
  if (didEatFood) {
    score += 10;
    document.getElementById("score").innerHTML = score;
    createFood();
  } else {
    snake.pop();
  }
};

const didGameEnd = () => {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
  }

  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > gameCanvas.width - 10;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > gameCanvas.height - 10;

  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
};

const createFood = () => {
  foodX = randomTen(0, canvas.width - 10);
  foodY = randomTen(0, gameCanvas.height - 10);

  snake.forEach(function isFoodOnSnake(part) {
    const foodIsOnSnake = part.x == foodX && part.y == foodY;
    if (foodIsOnSnake) createFood();
  });
};

const drawFood = () => {
  ctx.fillStyle = "red";
  ctx.strokestyle = "darkred";
  ctx.fillRect(foodX, foodY, 10, 10);
  ctx.strokeRect(foodX, foodY, 10, 10);
};
const main = function () {
  if (didGameEnd()) return;
  setTimeout(() => {
    changingDirection = false;
    clearCanvas();
    drawFood();
    advanceSnake();

    drawSnake();

    main();
  }, 100);
};

const randomTen = function (min, max) {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
};

createFood();
main();
document.addEventListener("keydown", changeDirection);
