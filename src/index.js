import * as R from "ramda";
import * as Draw from "./draw";
import create from "./draw/create";
import { mapIndexed, getRandomInt } from "./utils";
import createContext from './context'
import defaults from './defaults'
 
const context = createContext(defaults, {})

const { canvas, artboard } = create(context.state.arena.resolution)
const draw = Draw.withContext(context, artboard)
document.body.appendChild(canvas);

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
