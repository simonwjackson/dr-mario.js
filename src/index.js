import * as R from "ramda";
import * as Draw from "./draw";
import { mapIndexed } from "./utils";
import createContext from './context'
 
if (module.hot) {
  module.hot.dispose(() => {
    window.location.reload();
    throw "whatever";
  });
}

const defaults = {
  level: 1,
  arena: {
    wide: 10,
    tall: 16,
    matrix: undefined,
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

const context = createContext(defaults, {})

const createCanvas = ({width, height}) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  return canvas;
};

const canvas = createCanvas(context.state.arena.resolution);
const artboard = canvas.getContext("2d");
document.body.appendChild(canvas);

const draw = Draw.withContext(context)(artboard)

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
  
  draw.clear();
  draw.arena()
  draw.player()
};

const initAll = R.compose(
  initViruses(context.state.level),
  initArena(context.state.arena.wide)
)(context.state.arena.tall);

context.state.arena.matrix = initAll
context.state.interval = setInterval(() => tick(context.state), 1000 / context.state.fps);
