export default class InputHanlder {
  constructor(paddle) {
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
          paddle.moveLeft();
          break;

        case 39:
          paddle.moveRight();
          break;
      }
    });

    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        //   move left
        case 37:
          if (paddle.speed < 0) paddle.stop();
          break;

        //  move right
        case 39:
          if (paddle.speed > 0) paddle.stop();
          break;
      }
    });
  }
}
