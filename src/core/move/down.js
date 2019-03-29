import uncurryN from 'ramda/es/uncurryN'
import pipe from 'ramda/es/pipe'
import unless from 'ramda/es/unless'
import evolve from 'ramda/es/evolve'
import dec from 'ramda/es/dec'
import inc from 'ramda/es/inc'
import isLegalMove from '../isLegalMove'

const down = arena => pipe(
  evolve({
    pos: {
      row: inc
    }
  }),
  unless(isLegalMove(arena), evolve({
    pos: {
      row: dec
    }
  }))
)

export default uncurryN(2, down)