import uncurryN from 'ramda/es/uncurryN'
import compose from 'ramda/es/compose'
import unless from 'ramda/es/unless'
import evolve from 'ramda/es/evolve'
import dec from 'ramda/es/dec'
import inc from 'ramda/es/inc'
import isLegalMove from '../isLegalMove'

const left = arena => player =>
  compose(
    unless(isLegalMove(arena), evolve({
      pos: {
        column: inc
      }
    })),
    evolve({
      pos: {
        column: dec
      }
    })
  )(player)

export default uncurryN(2, left)