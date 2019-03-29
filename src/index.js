import * as Draw from './draw'
import * as Move from './core/move'

import create from './draw/create'
import createContext from './context'
import defaults from './defaults'
import {
  pipe,
  compose,
  evolve,
  inc,
  juxt,
  partial,
  prop,
  tap,
} from 'ramda'

import event from './utils/event'
import isLegalMove from './core/isLegalMove'
import startIntervalWith from './utils/startIntervalWith'
import controls from './browser/controls'

import { withContext as initCore } from './core/init'

const context = createContext(defaults, {})
const {
  canvas,
  artboard
} = create(context.get(['arena', 'resolution']))

const draw = Draw.withContext(context, artboard)
const move = Move.withContext(context)

const drawAll = juxt([
  draw.clear,
  draw.arena,
  draw.player
])

const handleKeyDown = pipe(
  prop('code'),
  controls(move),
  tap(drawAll)
)

const tick = ({
  get,
  set
}) => {
  const legal = isLegalMove(
    get(['arena']),
    evolve({
      pos: {
        row: inc
      }
    })(get(['player']))
  )

  if (legal) move.down()
  else console.log('copy onto board')

  drawAll()
}

const initView = compose(
  tap(drawAll),
  () => document.body.appendChild(canvas),
  () => event('keydown', handleKeyDown)
)

const initAll = compose(
  initView,
  initCore
)

// eslint-disable-next-line fp/no-unused-expression
context.set(['interval'], startIntervalWith(
  partial(initAll, [context]),
  1000 / context.get(['fps']),
  () => tick(context)
))