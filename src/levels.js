import Brick from "./brick";

export const level1 = [
  [1, 1, 0, 1, 0, 0, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

export function buildLevel(game, level) {
  let bricks = [];

  level.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      let position = {
        x: 80 * brickIndex,
        y: 80 + 24 * rowIndex
      };
      if (brick === 1) {
        bricks.push(new Brick(game, position));
      }
    });
  });

  return bricks;
}