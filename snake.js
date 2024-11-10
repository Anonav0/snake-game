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

ctx.fillStyle = CANVAS_BG_COLOR;
ctx.strokestyle = CANVAS_BORDER_COLOR;
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeRect(0, 0, canvas.width, canvas.height);

const drawSnakePart = (snakePart) => {
  ctx.fillStyle = "lightgreen";
  ctx.strokestyle = "darkgreen";

  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
};

const drawSnake = () => {
  snake.forEach(drawSnakePart);
};

drawSnake();
