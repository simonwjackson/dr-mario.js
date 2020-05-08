import * as Draw from './browser/canvas/draw'
import * as Move from './core/move'

import create from './browser/canvas/draw/create'
import createContext from './core/context'
import defaults from './core/defaults'

/**
 * @todo Reorder imports in alphabetical order
 * @body Makes things a little cleaner.
 */
import {
  apply,
  __,
  call,
  when,
  pipe,
  compose,
  equals,
  juxt,
  partial,
  prop,
  tap,
} from 'ramda'

import event from './utils/event'
import startIntervalWith from './utils/startIntervalWith'
import controls from './browser/controls'

import {
  withContext as initCore
} from './core/init'

const context = createContext(defaults, {})
const { canvas, artboard } = create(context.get(['arena', 'resolution']))

const draw = Draw.withContext(context, artboard)
const move = Move.withContext(context)

// Move to withContext fn
draw.all = juxt([
  draw.clear,
  draw.arena,
  draw.player
])

const handleKeyDown = pipe(
  prop('code'),
  controls(move),
  tap(draw.all)
)

const copyToBoard = () => {}

// TODO: Move into separate file
const tick = ({ get }) => {
  const isStuck = compose(
    apply(equals),
    juxt([
      partial(get, [ ['player'] ]),
      call(__)
    ])
  )

  return juxt([
    when(isStuck, copyToBoard),
    draw.all,
  ])(move.down)
}

const initView = pipe(
  () => event('keydown', handleKeyDown),
  () => document.body.appendChild(canvas),
  tap(draw.all)
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
