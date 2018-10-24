import Ball from "./ball";
import Paddle from "./paddle";
import InputHandler from "./input";
import Brick from "./brick";
import { level1, level2, level3, buildLevel } from "./levels";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.gamestate = GAMESTATE.MENU;
    this.ball = new Ball(this);
    this.paddle = new Paddle(this);
    new InputHandler(this.paddle, this);
    this.gameObjects = [];
    this.lives = 3;
    this.bricks = []
    this.currentLevel = 0;
    this.levels = [level1, level2, level3]
  }

  start() {
    // Only start game from MENU and NEWLEVEL
    if (this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.NEWLEVEL) return;

    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.ball.resetPositionAndSpeed();

    this.gameObjects = [this.ball, this.paddle];

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

    [...this.gameObjects, ...this.bricks].forEach(gameObject => {
      gameObject.update(deltaTime);
    });

    this.bricks = this.bricks.filter(brick => {
      return !brick.markedForDeletions;
    });

    if (this.bricks.length === 0) {
      if (this.levels.length < 1) return;

      this.currentLevel++;
      this.gamestate = GAMESTATE.NEWLEVEL;
      this.start();
    }
  }

  draw(ctx) {
    [...this.gameObjects, ...this.bricks].forEach(gameObject => {
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
