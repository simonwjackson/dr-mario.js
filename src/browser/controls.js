import {
  pipe,
  cond,
  equals,
  uncurryN
} from 'ramda'

const controls = movement => pipe(
  cond([
    [equals('ArrowLeft'), movement.left],
    [equals('ArrowRight'), movement.right],
    [equals('ArrowDown'), movement.down],
    [equals('Space'), movement.flip]
  ])
)

export default uncurryN(2, controls)