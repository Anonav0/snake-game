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

let dx = 0;
let dy = -10;

let changingDirection = false;

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
  //   if (changingDirection) return;
  //   changingDirection = true;

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
  snake.pop();
};
const main = function () {
  setTimeout(() => {
    changingDirection = false;
    clearCanvas();
    advanceSnake();

    drawSnake();

    main();
  }, 100);
};

main();
document.addEventListener("keydown", changeDirection);

// clearCanvas();
// advanceSnake();
// advanceSnake();
// advanceSnake();
// advanceSnake();
// advanceSnake();
// drawSnake();
