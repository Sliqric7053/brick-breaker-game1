export default class Ball {
  constructor(gameWidth, gameHeight) {
    this.image = document.getElementById("ball-img");
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.position = {
      x: this.gameWidth / 2,
      y: this.gameHeight / 2
    };

    this.speed = {
      x: 2,
      y: 2
    };
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.position.x, this.position.y, 28, 28);
  }

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}
