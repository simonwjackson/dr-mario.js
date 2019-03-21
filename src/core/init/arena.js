import uncurryN from 'ramda/es/uncurryN'
import compose from 'ramda/es/compose'
import applyTo from 'ramda/es/applyTo'
import repeat from 'ramda/es/repeat'

const initArena = width => height =>
  compose(
    applyTo(height),
    repeat,
    repeat(0)
  )(width)

export default uncurryN(2, initArena)
