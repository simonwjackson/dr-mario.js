import uncurryN from 'ramda/es/uncurryN'
import set from 'ramda/es/set'
import compose from 'ramda/es/compose'
import lensPath from 'ramda/es/lensPath'
import view from 'ramda/es/view'
import hasPath from 'ramda/es/hasPath'
import flip from 'ramda/es/flip'
import both from 'ramda/es/both'
import unless from 'ramda/es/unless'

const swap = a => b => list => {
  const lensPathA = lensPath(a)
  const lensPathB = lensPath(b)
  const valueA = view(lensPathA, list)
  const valueB = view(lensPathB, list)
  const noPath = flip(hasPath)

  const outOfBounds = both(noPath(a), noPath(a))
  const makeSwap = compose(
    set(lensPathB, valueA),
    set(lensPathA, valueB)
  )

  return unless(
    outOfBounds,
    makeSwap
  )(list)
}

export default uncurryN(3, swap)