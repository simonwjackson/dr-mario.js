import * as R from 'ramda'
import * as Draw from './draw'
import create from './draw/create'
import createContext from './context'
import defaults from './defaults'
import init from './core/init'

const context = createContext(defaults, {})
const { canvas, artboard } = create(context.state.arena.resolution)
const draw = Draw.withContext(context, artboard)

document.body.appendChild(canvas)

const tick = state => {
  state.player.pos.row++

  draw.clear()
  draw.arena()
  draw.player()
}

const initAll = R.compose(
  init.viruses(context.state.level),
  init.arena(context.state.arena.wide)
)(context.state.arena.tall)

context.state.arena.matrix = initAll
context.state.interval = setInterval(
  () => tick(context.state),
  1000 / context.state.fps
)
