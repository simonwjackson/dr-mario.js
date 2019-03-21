import * as R from 'ramda'

const block = artboard => styles => pos => type => {
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

export default R.uncurryN(4, block)