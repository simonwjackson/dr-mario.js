import ifElse from 'ramda/es/ifElse'
import pipe from 'ramda/es/pipe'
import uncurryN from 'ramda/es/uncurryN'
import pathEq from 'ramda/es/pathEq'
import swap from '../../utils/swap'

const flip = ifElse(
  pathEq([1, 1], 0),
  swap([0, 0], [1, 1]),
  pipe(
    swap([1, 1], [0, 0]),
    swap([0, 0], [1, 0])
  )
)

export default uncurryN(1, flip)