import compose from 'ramda/es/compose'
import when from 'ramda/es/when'
import evolve from 'ramda/es/evolve'
import uncurryN from 'ramda/es/uncurryN'

import right from './right'
import left from './left'
import down from './down'
import flip from './flip'
import isLegalMove from '../isLegalMove'

const _withContext = ({ get, set }) =>
  evolve({
    left: fn => () =>
      compose(
        set(['player']),
        fn
      )(get(['arena']), get(['player'])),

    right: fn => () =>
      compose(
        set(['player']),
        fn
      )(get(['arena']), get(['player'])),

    down: fn => () =>
      compose(
        set(['player']),
        fn
      )(get(['arena']), get(['player'])),

    flip: fn => () =>
      compose(
        when(isLegalMove(get(['arena'])), set(['player'])),
        evolve({
          matrix: fn
        }),
        get
      )(['player'])
  }, {
    right,
    left,
    down,
    flip
  })

export const withContext = uncurryN(1, _withContext)
export default {
  right
}

