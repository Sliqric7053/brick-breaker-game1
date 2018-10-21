import Paddle from "./paddle";
import InputHandler from "./input";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d"); // gives a rendering context for drawing onto the canvas

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);

new InputHandler(paddle);

let lastTime = 0;
// game loop - runs every frame, updates all objects, redraws them into their new position, move to next frame
function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  paddle.update(deltaTime);
  paddle.draw(ctx);
  requestAnimationFrame(gameLoop);
}

window.requestAnimationFrame(gameLoop);
