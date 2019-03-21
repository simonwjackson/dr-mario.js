import * as R from "ramda";
import Draw from "./draw";
import { mapIndexed } from "./utils";
 
if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload();
    throw "whatever";
  });
}

const DELETEblockSize = 25;
const blocksWide = 10;
const blocksTall = 16;
const width = blocksWide * DELETEblockSize;
const height = blocksTall * DELETEblockSize;



const defaults = {
  level: 1,
  arena: {
    wide: 10,
    tall: 16,
    resolution: {
      width: undefined,
      height: undefined
    }
  },
  styles: {
    block: {
      colors: ["#ff0000", "#00ff00", "#0000ff"],
      size: 25, 
    }
  },
  player: {
    pos: {
      row: 0,
      column: 4
    },
    matrix: [[0, 0], [3, 2]]
  },
  fps: 1
};

const state = R.compose(
  R.mergeDeepRight(defaults),
  R.applySpec({
    arena: {
      resolution: {
        width: R.multiply(defaults.arena.wide),
        height: R.multiply(defaults.arena.tall)
      } 
    }
  })
)(defaults.styles.block.size)

const createCanvas = (width, height) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  return canvas;
};

const canvas = createCanvas(state.arena.resolution.width, state.arena.resolution.height);
const artboard = canvas.getContext("2d");
document.body.appendChild(canvas);

const draw = Draw(artboard)

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const initArena = width => height =>
  R.compose(
    R.applyTo(height),
    R.repeat,
    R.repeat(0)
  )(width);

const initViruses = level => rows => {
  const randomPills = R.map(() => getRandomInt(0, 3));
  
  return R.compose(
    R.reverse,
    mapIndexed((row, i) => R.when(() => i <= level, randomPills, row)),
    R.reverse
  )(rows);
};

const tick = state => {
  state.player.pos.row++;
  
  draw.clear(width, height);
  draw.arena(state.styles)(state.arena)
  draw.player(state.styles)(state.player)
};

const initAll = R.compose(
  initViruses(state.level),
  initArena(state.arena.wide)
)(state.arena.tall);



state.arena = initAll
state.interval = setInterval(() => tick(state), 1000 / state.fps);
