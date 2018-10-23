import Ball from "./ball";
import Paddle from "./paddle";
import InputHandler from "./input";
import Brick from "./brick";
import { level1, buildLevel } from "./levels";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.gamestate = GAMESTATE.MENU;
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    this.gameObjects = [];
    this.lives = 3;
    new InputHandler(this.paddle, this);
  }

  start() {
    // Only start game from MENU
    if (this.gamestate !== GAMESTATE.MENU) return;

    let bricks = buildLevel(this, level1);

    this.gameObjects = [this.ball, this.paddle, ...bricks];

    this.gamestate = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

    // Tell the game to Pause
    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return;

    this.gameObjects.forEach(gameObject => {
      gameObject.update(deltaTime);
    });
    this.gameObjects = this.gameObjects.filter(gameObject => {
      return !gameObject.markedForDeletions;
    });
  }

  draw(ctx) {
    this.gameObjects.forEach(gameObject => {
      gameObject.draw(ctx);
    });

    if (this.gamestate === GAMESTATE.MENU) {
      // draw background
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();

      // write text
      ctx.font = "50px Helvetica Neue";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText(
        "Hit SPACEBAR to begin",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }

    if (this.gamestate === GAMESTATE.PAUSED) {
      // draw background
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.fill();

      // write text
      ctx.font = "50px Helvetica Neue";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Game Paused", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate === GAMESTATE.GAMEOVER) {
      // draw background
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fill();

      // write text
      ctx.font = "50px Helvetica Neue";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Game Over", this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      // if Paused, then unPause the game
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      // otherwise, Pause the game
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
