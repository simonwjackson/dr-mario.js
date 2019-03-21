import { mapIndexed } from "./utils";
import * as R from 'ramda'

export const clear = artboard => (width, height) =>
  artboard.clearRect(0, 0, width, height);

export const block = artboard => styles => pos => type => {
  const {size, colors} = styles.block
  const {column, row} = pos

  artboard.strokeStyle = "#ffffff";
  artboard.lineWidth = 2;

  if (type === 0) artboard.fillStyle = "#ffffff00";
  if (type === 1) artboard.fillStyle = colors[0];
  if (type === 2) artboard.fillStyle = colors[1];
  if (type === 3) artboard.fillStyle = colors[2];

  const args = [size * column, size * row, size, size];

  artboard.fillRect(...args);
  artboard.strokeRect(...args);
};

export const arena = artboard => styles => rows => {
  mapIndexed((columns, row) => {
    mapIndexed((type, column) => {
      block(artboard)(styles)({ row, column })(type);
    }, columns);
  }, rows);
};

export const player = artboard => styles => player => {
  block(artboard)(styles)({
    row: player.pos.row,
    column: player.pos.column
  })(player.matrix[0][0]);

  block(artboard)(styles)({
    row: player.pos.row + 1,
    column: player.pos.column
  })( player.matrix[0][1]);

  block(artboard)(styles)({
    row: player.pos.row,
    column: player.pos.column + 1
  })(player.matrix[1][0]);

  block(artboard)(styles)({
    row: player.pos.row + 1,
    column: player.pos.column + 1
  })(player.matrix[1][1]);
};

export default artboard => R.evolve({
  player: R.applyTo(artboard),
  arena: R.applyTo(artboard),
  block: R.applyTo(artboard),
  clear: R.applyTo(artboard),
}, {
  player,
  arena,
  block,
  clear
})